import { Response } from 'express';
import { dbUtils, db } from '../utils/database';
import { AdminRequest } from '../middleware/adminAuth';
import { AuthRequest } from '../middleware/auth';

// 관리자 대시보드 통계 현황
export const getDashboardStats = async (req: AdminRequest, res: Response) => {
  try {
    // 기본 통계 조회 (간소화)
    const stats = await dbUtils.getStats();

    // 사용자 역할별 통계
    const { data: userStats } = await db
      .from('users')
      .select('role')
      .in('role', ['CONSUMER', 'SELLER']);
    
    const consumers = userStats?.filter(u => u.role === 'CONSUMER').length || 0;
    const sellers = userStats?.filter(u => u.role === 'SELLER').length || 0;

    // 설문 상태별 통계
    const { data: surveyStats } = await db
      .from('surveys')
      .select('status');
    
    const pendingSurveys = surveyStats?.filter(s => s.status === 'PENDING').length || 0;
    const approvedSurveys = surveyStats?.filter(s => s.status === 'APPROVED').length || 0;
    const completedSurveys = surveyStats?.filter(s => s.status === 'COMPLETED').length || 0;

    // 중단 요청 통계
    const { data: cancellationRequests } = await db
      .from('survey_cancellation_requests')
      .select('status')
      .eq('status', 'PENDING');
    
    const pendingCancellations = cancellationRequests?.length || 0;

    const { data: rewardStats, error: rewardStatsError } = await db
      .from('rewards')
      .select('status, amount');

    if (rewardStatsError) throw rewardStatsError;

    const rewardTotals = (rewardStats || []).reduce(
      (acc, reward) => {
        const amount = Number(reward.amount) || 0;
        acc.total += amount;
        if (reward.status === 'EARNED') {
          acc.earned += amount;
        } else if (reward.status === 'PENDING') {
          acc.pending += amount;
        } else if (reward.status === 'PAID') {
          acc.paid += amount;
        }
        return acc;
      },
      { total: 0, earned: 0, pending: 0, paid: 0 }
    );

    const { count: pendingWithdrawalCount, error: pendingWithdrawalError } = await db
      .from('withdrawal_requests')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'PENDING');

    if (pendingWithdrawalError) throw pendingWithdrawalError;

    res.json({
      users: {
        total: stats.totalUsers,
        consumers: consumers,
        sellers: sellers,
        recent: 0 // 임시값 - 최근 7일 가입자
      },
      surveys: {
        total: stats.totalSurveys,
        pending: pendingSurveys,
        approved: approvedSurveys,
        completed: completedSurveys
      },
      responses: {
        total: stats.totalResponses
      },
      rewards: rewardTotals,
      notifications: {
        pendingWithdrawals: pendingWithdrawalCount || 0,
        pendingCancellations: pendingCancellations
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 설문 관리
export const getSurveys = async (req: AdminRequest, res: Response) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const where: any = {};
    
    if (status) {
      where.status = status;
    }

    const surveys = await dbUtils.findSurveysByConditions(where);

    // 프론트엔드가 기대하는 구조로 데이터 변환
    const formattedSurveys = (surveys || []).map((survey: any) => ({
      ...survey,
      createdAt: survey.created_at,
      endDate: survey.end_date,
      maxParticipants: survey.max_participants,
      totalBudget: survey.total_budget,
      _count: {
        responses: survey.responses?.length || 0
      }
    }));

    res.json({
      surveys: formattedSurveys,
      totalCount: formattedSurveys.length,
      page: Number(page),
      limit: Number(limit)
    });

  } catch (error) {
    console.error('Admin get surveys error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 설문 승인
export const approveSurvey = async (req: AdminRequest, res: Response) => {
  try {
    const { surveyId } = req.params;
    const updatedSurvey = await dbUtils.updateSurvey(surveyId, { status: 'APPROVED' });

    res.json({
      message: 'Survey approved successfully',
      survey: updatedSurvey
    });

  } catch (error) {
    console.error('Approve survey error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 설문 거부
export const rejectSurvey = async (req: AdminRequest, res: Response) => {
  try {
    const { surveyId } = req.params;
    const { reason } = req.body;
    
    const updatedSurvey = await dbUtils.updateSurvey(surveyId, { 
      status: 'REJECTED',
      rejection_reason: reason 
    });

    res.json({
      message: 'Survey rejected successfully',
      survey: updatedSurvey
    });

  } catch (error) {
    console.error('Reject survey error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 사용자 관리
export const getUsers = async (req: AdminRequest, res: Response) => {
  try {
    const { role, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    
    // 전체 사용자 수 조회
    let countQuery = db.from('users').select('id', { count: 'exact', head: true });
    if (role) {
      countQuery = countQuery.eq('role', role);
    }
    const { count: totalCount } = await countQuery;

    // 사용자 목록 조회
    let query = db.from('users').select('*').range(offset, offset + Number(limit) - 1);
    if (role) {
      query = query.eq('role', role);
    }
    
    const { data: users, error } = await query;

    if (error) throw error;

    // 프론트엔드가 기대하는 필드명으로 매핑
    const userIds = (users || []).map((user: any) => user.id);

    let surveyCountsMap: Record<string, number> = {};
    let responseCountsMap: Record<string, number> = {};

    if (userIds.length > 0) {
      const [surveysResult, responsesResult] = await Promise.all([
        db
          .from('surveys')
          .select('id, seller_id')
          .in('seller_id', userIds)
          .not('seller_id', 'is', null),
        db
          .from('survey_responses')
          .select('id, consumer_id')
          .in('consumer_id', userIds)
          .not('consumer_id', 'is', null)
      ]);

      if (surveysResult.error) throw surveysResult.error;
      if (responsesResult.error) throw responsesResult.error;

      surveyCountsMap = (surveysResult.data || []).reduce((acc: Record<string, number>, item: any) => {
        if (item.seller_id) {
          acc[item.seller_id] = (acc[item.seller_id] || 0) + 1;
        }
        return acc;
      }, {});

      responseCountsMap = (responsesResult.data || []).reduce((acc: Record<string, number>, item: any) => {
        if (item.consumer_id) {
          acc[item.consumer_id] = (acc[item.consumer_id] || 0) + 1;
        }
        return acc;
      }, {});
    }

    const mappedUsers = (users || []).map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      birthDate: user.birth_date,
      phoneNumber: user.phone_number,
      gender: user.gender,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      bankCode: user.bank_code,
      accountNumber: user.account_number,
      _count: {
        surveys: surveyCountsMap[user.id] || 0,
        responses: responseCountsMap[user.id] || 0
      }
    }));

    res.json({
      users: mappedUsers,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalCount || 0,
        pages: Math.ceil((totalCount || 0) / Number(limit))
      }
    });

  } catch (error) {
    console.error('Admin get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 응답 관리
export const getResponses = async (req: AdminRequest, res: Response) => {
  try {
    const { surveyId, page = 1, limit = 10 } = req.query;
    
    let responses = [];
    if (surveyId) {
      responses = await dbUtils.findResponsesByUserId(surveyId as string);
    }

    res.json({
      responses: responses || [],
      totalCount: responses.length,
      page: Number(page),
      limit: Number(limit)
    });

  } catch (error) {
    console.error('Admin get responses error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 리워드 관리
export const getRewards = async (req: AdminRequest, res: Response) => {
  try {
    const { status, userId, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    
    // 전체 리워드 수 조회
    let countQuery = db.from('rewards').select('id', { count: 'exact', head: true });
    if (status) countQuery = countQuery.eq('status', status);
    if (userId) countQuery = countQuery.eq('user_id', userId);
    const { count: totalCount } = await countQuery;

    // 사용자 정보와 함께 리워드 조회
    let query = db.from('rewards')
      .select(`
        *,
        user:users!rewards_user_id_fkey(
          id,
          name,
          email,
          role
        )
      `)
      .range(offset, offset + Number(limit) - 1)
      .order('created_at', { ascending: false });
    
    if (status) query = query.eq('status', status);
    if (userId) query = query.eq('user_id', userId);
    
    const { data: rewards, error } = await query;
    
    if (error) throw error;

    // 사용자별 누계 리워드 금액 계산
    const userTotals: { [key: string]: { earned: number, pending: number, paid: number } } = {};
    
    for (const reward of rewards || []) {
      const userId = reward.user_id;
      if (!userTotals[userId]) {
        userTotals[userId] = { earned: 0, pending: 0, paid: 0 };
      }
      
      if (reward.status === 'EARNED') {
        userTotals[userId].earned += reward.amount;
      } else if (reward.status === 'PENDING') {
        userTotals[userId].pending += reward.amount;
      } else if (reward.status === 'PAID') {
        userTotals[userId].paid += reward.amount;
      }
    }

    // 프론트엔드가 기대하는 필드명으로 매핑
    const mappedRewards = (rewards || []).map((reward: any) => {
      const totals = userTotals[reward.user_id] || { earned: 0, pending: 0, paid: 0 };
      const totalAmount = totals.earned + totals.pending + totals.paid;

      return {
      id: reward.id,
      userId: reward.user_id,        // user_id -> userId
      type: reward.type,
      amount: reward.amount,
      status: reward.status,
      description: reward.description,
      surveyId: reward.survey_id,    // survey_id -> surveyId (있는 경우)
      createdAt: reward.created_at,  // created_at -> createdAt
      updatedAt: reward.updated_at,  // updated_at -> updatedAt
      // 사용자 정보 추가
      user: reward.user ? {
        id: reward.user.id,
        name: reward.user.name,
        email: reward.user.email,
        role: reward.user.role
      } : null,
      // 사용자별 누계 금액 추가
      userTotals: totals,
      userTotalAmount: totalAmount,
      userAccruedAmount: totals.earned,
      // 액션 버튼 활성화 조건 (PENDING 상태만 지급 완료 처리 가능)
      canMarkAsPaid: reward.status === 'PENDING'
    };
    });

    res.json({
      rewards: mappedRewards,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalCount || 0,
        pages: Math.ceil((totalCount || 0) / Number(limit))
      }
    });

  } catch (error) {
    console.error('Admin get rewards error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 리워드 지급 승인 (PENDING -> PAID 상태 변경)
export const approveReward = async (req: AdminRequest, res: Response) => {
  try {
    const { rewardId } = req.params;
    
    // 해당 리워드 조회
    const { data: reward, error: rewardError } = await db
      .from('rewards')
      .select('*')
      .eq('id', rewardId)
      .single();
      
    if (rewardError) throw rewardError;
    
    if (!reward) {
      return res.status(404).json({ error: 'Reward not found' });
    }
    
    // PENDING 상태인 리워드만 PAID로 변경 가능
    if (reward.status !== 'PENDING') {
      return res.status(400).json({ 
        error: `리워드 상태가 '지급 대기'가 아닙니다. 현재 상태: ${reward.status}` 
      });
    }
    
    // 리워드 상태를 PAID로 업데이트
    const { data: updatedReward, error: updateError } = await db
      .from('rewards')
      .update({ 
        status: 'PAID',
        updated_at: new Date().toISOString()
      })
      .eq('id', rewardId)
      .select()
      .single();
      
    if (updateError) throw updateError;
    
    console.log(`💰 리워드 지급 완료: ID ${rewardId}, 금액: ₩${reward.amount}`);
    
    res.json({
      message: '리워드 지급이 완료되었습니다.',
      reward: updatedReward
    });
    
  } catch (error) {
    console.error('Approve reward error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 출금 요청 목록 조회
export const getWithdrawalRequests = async (req: AdminRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const status = (req.query.status as string) || undefined;
    const offset = (page - 1) * limit;

    let query = db
      .from('withdrawal_requests')
      .select(
        `
          id,
          user_id,
          amount,
          status,
          requested_at,
          processed_at,
          processed_by,
          note,
          user:users!withdrawal_requests_user_id_fkey(
            id,
            name,
            email,
            role,
            phone_number,
            bank_code,
            account_number
          )
        `,
        { count: 'exact' }
      )
      .order('requested_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    const total = count || 0;
    const requests = (data || []).map((record: any) => {
      const userInfo = Array.isArray(record.user) ? record.user[0] : record.user;

      return {
        id: record.id,
        userId: record.user_id,
        amount: Number(record.amount) || 0,
        status: record.status,
        requestedAt: record.requested_at,
        processedAt: record.processed_at,
        processedBy: record.processed_by,
        note: record.note,
        user: {
          id: userInfo?.id || '',
          name: userInfo?.name || '',
          email: userInfo?.email || '',
          role: userInfo?.role || 'CONSUMER',
          phoneNumber: userInfo?.phone_number || '',
          bankCode: userInfo?.bank_code || '',
          accountNumber: userInfo?.account_number || ''
        }
      };
    });

    res.json({
      requests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get withdrawal requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 출금 요청 승인/거절 처리
export const processWithdrawalRequest = async (req: AdminRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { action, note } = req.body as { action?: 'approve' | 'reject'; note?: string };

    if (!action || !['approve', 'reject'].includes(action)) {
      return res.status(400).json({ error: 'Invalid action. Must be approve or reject' });
    }

    const { data: withdrawal, error: withdrawalError } = await db
      .from('withdrawal_requests')
      .select('id, user_id, amount, status')
      .eq('id', id)
      .single();

    if (withdrawalError) {
      if (withdrawalError.code === 'PGRST116') {
        return res.status(404).json({ error: '출금 요청을 찾을 수 없습니다.' });
      }
      throw withdrawalError;
    }

    if (!withdrawal) {
      return res.status(404).json({ error: '출금 요청을 찾을 수 없습니다.' });
    }

    if (withdrawal.status !== 'PENDING') {
      return res.status(400).json({ error: '이미 처리된 출금 요청입니다.' });
    }

    const processedAt = new Date().toISOString();

    if (action === 'approve') {
      const { error: rewardUpdateError } = await db
        .from('rewards')
        .update({ status: 'PAID', updated_at: processedAt })
        .eq('user_id', withdrawal.user_id)
        .eq('status', 'PENDING');

      if (rewardUpdateError) throw rewardUpdateError;
    } else {
      const { error: rewardRevertError } = await db
        .from('rewards')
        .update({ status: 'EARNED', updated_at: processedAt })
        .eq('user_id', withdrawal.user_id)
        .eq('status', 'PENDING');

      if (rewardRevertError) throw rewardRevertError;
    }

    const { data: updatedRequest, error: updateError } = await db
      .from('withdrawal_requests')
      .update({
        status: action === 'approve' ? 'APPROVED' : 'REJECTED',
        processed_at: processedAt,
        processed_by: req.admin?.id || null,
        note: note || null
      })
      .eq('id', id)
      .select(
        `
          id,
          user_id,
          amount,
          status,
          requested_at,
          processed_at,
          processed_by,
          note,
          user:users!withdrawal_requests_user_id_fkey(
            id,
            name,
            email,
            role,
            phone_number,
            bank_code,
            account_number
          )
        `
      )
      .single();

    if (updateError) throw updateError;

    const actionLabel = action === 'approve' ? '승인' : '거절';
    const updatedUser = updatedRequest ? (Array.isArray(updatedRequest.user) ? updatedRequest.user[0] : updatedRequest.user) : null;
    console.log(`💰 출금 요청 ${actionLabel}: ${updatedUser?.name || withdrawal.user_id} - ₩${Number(withdrawal.amount).toLocaleString()}`);

    let formattedRequest;
    if (updatedRequest) {
      const userInfo = Array.isArray(updatedRequest.user) ? updatedRequest.user[0] : updatedRequest.user;
      formattedRequest = {
        id: updatedRequest.id,
        userId: updatedRequest.user_id,
        amount: Number(updatedRequest.amount) || 0,
        status: updatedRequest.status,
        requestedAt: updatedRequest.requested_at,
        processedAt: updatedRequest.processed_at,
        processedBy: updatedRequest.processed_by,
        note: updatedRequest.note,
        user: {
          id: userInfo?.id || '',
          name: userInfo?.name || '',
          email: userInfo?.email || '',
          role: userInfo?.role || 'CONSUMER',
          phoneNumber: userInfo?.phone_number || '',
          bankCode: userInfo?.bank_code || '',
          accountNumber: userInfo?.account_number || ''
        }
      };
    }

    res.json({
      message: `출금 요청이 ${actionLabel}되었습니다.`,
      request: formattedRequest
    });
  } catch (error) {
    console.error('Process withdrawal request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 중단 요청 관리
export const getCancellationRequests = async (req: AdminRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const status = req.query.status as string | undefined;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = db
      .from('surveys')
      .select(
        `
          id,
          title,
          store_name,
          total_budget,
          reward,
          cancellation_status,
          cancellation_requested_at,
          seller:users!surveys_seller_id_fkey(
            id,
            name,
            email,
            phone_number,
            bank_code,
            account_number
          ),
          survey_responses(count)
        `,
        { count: 'exact' }
      )
      .not('cancellation_requested_at', 'is', null)
      .order('cancellation_requested_at', { ascending: false })
      .range(from, to);

    if (status && status !== 'ALL') {
      query = query.eq('cancellation_status', status);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    const cancellationRequests = (data || []).map((item: any) => ({
      id: item.id,
      title: item.title,
      storeName: item.store_name,
      totalBudget: item.total_budget,
      reward: item.reward,
      cancellationStatus: item.cancellation_status || 'PENDING',
      cancellationRequestedAt: item.cancellation_requested_at,
      seller: {
        id: item.seller?.id,
        name: item.seller?.name,
        email: item.seller?.email,
        phoneNumber: item.seller?.phone_number,
        bankCode: item.seller?.bank_code,
        accountNumber: item.seller?.account_number
      },
      _count: {
        responses: item.survey_responses?.[0]?.count ?? 0
      }
    }));

    res.json({
      cancellationRequests,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit)
      }
    });
  } catch (error) {
    console.error('Get cancellation requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCancellationRequestStats = async (req: AdminRequest, res: Response) => {
  try {
    const { data, error } = await db
      .from('surveys')
      .select(`
        id,
        reward,
        total_budget,
        cancellation_status,
        cancellation_requested_at,
        survey_responses(count)
      `)
      .not('cancellation_requested_at', 'is', null);

    if (error) throw error;

    const requests = data || [];
    const total = requests.length;

    const normalizeStatus = (status: string | null) => status || 'PENDING';

    const pendingRequests = requests.filter(req => normalizeStatus(req.cancellation_status) === 'PENDING');
    const approvedRequests = requests.filter(req => normalizeStatus(req.cancellation_status) === 'APPROVED');
    const rejectedRequests = requests.filter(req => normalizeStatus(req.cancellation_status) === 'REJECTED');

    const calculateRefund = (survey: any) => {
      const rewardPerResponse = Number(survey.reward) || 0;
      const completedResponses = survey.survey_responses?.[0]?.count ?? 0;
      const totalBudget = Number(survey.total_budget) || 0;

      if (!rewardPerResponse) {
        return 0;
      }

      const maxParticipants = Math.round(totalBudget / (rewardPerResponse * 1.1));
      const remainingSlots = Math.max(0, maxParticipants - completedResponses);
      const refundRewards = remainingSlots * rewardPerResponse;
      const refundFee = refundRewards * 0.1;
      return Math.max(0, refundRewards + refundFee);
    };

    const pendingRefundAmount = pendingRequests.reduce((sum, survey) => sum + calculateRefund(survey), 0);

    const { data: approvedRefunds, error: approvedRefundsError } = await db
      .from('survey_cancellation_requests')
      .select('refund_amount')
      .eq('status', 'APPROVED');

    if (approvedRefundsError) throw approvedRefundsError;

    const approvedRefundAmount = (approvedRefunds || []).reduce((sum, record: any) => {
      return sum + Number(record.refund_amount || 0);
    }, 0);

    res.json({
      total,
      pending: pendingRequests.length,
      approved: approvedRequests.length,
      rejected: rejectedRequests.length,
      refunds: {
        pending: pendingRefundAmount,
        approved: approvedRefundAmount
      }
    });
  } catch (error) {
    console.error('Get cancellation request stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRecentCancellationRequests = async (req: AdminRequest, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 5;

    const { data, error } = await db
      .from('surveys')
      .select(
        `
          id,
          title,
          cancellation_requested_at,
          seller:users!surveys_seller_id_fkey(id, name, email)
        `
      )
      .not('cancellation_requested_at', 'is', null)
      .eq('cancellation_status', 'PENDING')
      .order('cancellation_requested_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    res.json({ recentRequests: data || [] });
  } catch (error) {
    console.error('Recent cancellation requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const processCancellationRequest = async (req: AdminRequest, res: Response) => {
  try {
    const { surveyId } = req.params;
    const { action, reason } = req.body;

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ error: 'Invalid action. Must be approve or reject.' });
    }

    const { data: survey, error: surveyError } = await db
      .from('surveys')
      .select(`
        *,
        seller:users!surveys_seller_id_fkey(id, name, email, account_number, bank_code),
        responses:survey_responses(id)
      `)
      .eq('id', surveyId)
      .single();

    if (surveyError) {
      if (surveyError.code === 'PGRST116') {
        return res.status(404).json({ error: 'Survey not found' });
      }
      throw surveyError;
    }

    if (!survey?.cancellation_requested_at) {
      return res.status(400).json({ error: 'No cancellation request found for this survey' });
    }

    const currentStatus = survey.cancellation_status || 'PENDING';
    if (currentStatus !== 'PENDING') {
      return res.status(400).json({ error: 'Cancellation request already processed' });
    }

    let refundAmount = 0;

    if (action === 'approve') {
      const rewardPerResponse = Number(survey.reward) || 0;
      const completedResponses = (survey.responses || []).length;
      const totalBudget = Number(survey.total_budget) || 0;

      if (rewardPerResponse > 0) {
        const maxParticipants = Math.round(totalBudget / (rewardPerResponse * 1.1));
        const remainingSlots = Math.max(0, maxParticipants - completedResponses);
        const refundRewards = remainingSlots * rewardPerResponse;
        const refundFee = refundRewards * 0.1;
        refundAmount = Math.max(0, refundRewards + refundFee);
      }
    }

    const updatePayload: Record<string, any> = {
      cancellation_status: action === 'approve' ? 'APPROVED' : 'REJECTED'
    };

    if (reason) {
      updatePayload.rejection_reason = reason;
    }

    if (action === 'approve') {
      updatePayload.status = 'CANCELLED';
    }

    const { data: updatedSurvey, error: updateError } = await db
      .from('surveys')
      .update(updatePayload)
      .eq('id', surveyId)
      .select(`
        *,
        seller:users!surveys_seller_id_fkey(id, name, email),
        responses:survey_responses(id)
      `)
      .single();

    if (updateError) throw updateError;

    if (action === 'approve') {
      const upsertPayload = {
        survey_id: surveyId,
        reason: reason || '관리자 승인',
        refund_amount: refundAmount,
        status: 'APPROVED',
        processed_at: new Date().toISOString(),
        processed_by: req.admin?.id || null
      };

      const { error: upsertError } = await db
        .from('survey_cancellation_requests')
        .upsert(upsertPayload, { onConflict: 'survey_id' });

      if (upsertError) throw upsertError;

      if (refundAmount > 0) {
        const { error: rewardInsertError } = await db
          .from('rewards')
          .insert({
            user_id: survey.seller_id,
            amount: -refundAmount,
            type: 'REFUND',
            status: 'PAID'
          });

        if (rewardInsertError) throw rewardInsertError;
      }
    }

    const actionLabel = action === 'approve' ? '승인' : '거절';

    res.json({
      message: `중단요청이 ${actionLabel}되었습니다`,
      survey: updatedSurvey,
      refundAmount: action === 'approve' ? refundAmount : null
    });
  } catch (error) {
    console.error('Process cancellation request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
