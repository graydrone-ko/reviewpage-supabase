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
        pendingWithdrawals: 0, // 임시값
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
    const mappedUsers = (users || []).map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      birthDate: user.birth_date, // birth_date -> birthDate
      phoneNumber: user.phone_number, // phone_number -> phoneNumber
      gender: user.gender,
      createdAt: user.created_at, // created_at -> createdAt
      updatedAt: user.updated_at, // updated_at -> updatedAt
      bankCode: user.bank_code,
      accountNumber: user.account_number,
      // 활동 사항 추가 (추후 실제 활동 데이터 연결)
      activitySummary: {
        totalSurveys: 0, // 참여한 설문 수
        totalRewards: 0, // 받은 리워드 총액
        lastActivity: user.updated_at // 마지막 활동
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

// 출금 요청 관리
export const getWithdrawalRequests = async (req: AdminRequest, res: Response) => {
  try {
    // 현재 시스템에는 출금 요청 기능이 없으므로 빈 배열 반환
    // 추후 출금 요청 테이블이 생성되면 실제 데이터를 조회하도록 수정
    res.json({ 
      requests: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
      }
    });
  } catch (error) {
    console.error('Get withdrawal requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 출금 요청 승인
export const approveWithdrawal = async (req: AdminRequest, res: Response) => {
  res.status(501).json({ error: 'Not implemented yet' });
};

// 출금 요청 거부
export const rejectWithdrawal = async (req: AdminRequest, res: Response) => {
  res.status(501).json({ error: 'Not implemented yet' });
};

// 중단 요청 관리
export const getCancellationRequests = async (req: AdminRequest, res: Response) => {
  try {
    // 중단 요청 테이블이 없거나 구조가 다를 수 있으므로 빈 데이터 반환
    // 추후 실제 중단 요청 테이블 구조가 확정되면 수정
    res.json({ 
      requests: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
      }
    });
  } catch (error) {
    console.error('Get cancellation requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 최근 중단 요청 수 조회
export const getRecentCancellationRequests = async (req: AdminRequest, res: Response) => {
  try {
    // 임시값 반환 - 실제 구현 필요시 데이터베이스 조회 로직 추가
    res.json({ count: 0 });
  } catch (error) {
    console.error('Recent cancellation requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 중단 요청 승인
export const approveCancellationRequest = async (req: AdminRequest, res: Response) => {
  res.status(501).json({ error: 'Not implemented yet' });
};

// 중단 요청 거부
export const rejectCancellationRequest = async (req: AdminRequest, res: Response) => {
  res.status(501).json({ error: 'Not implemented yet' });
};
