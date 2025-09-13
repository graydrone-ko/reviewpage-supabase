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
      rewards: {
        total: stats.totalRewards,
        pending: 0, // 임시값
        paid: stats.totalRewards
      },
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

    res.json({
      users: users || [],
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
    const { status, userId, page = 1, limit = 10 } = req.query;
    
    // 간소화된 리워드 조회
    let query = db.from('rewards').select('*');
    
    if (status) query = query.eq('status', status);
    if (userId) query = query.eq('user_id', userId);
    
    const { data: rewards, error } = await query.limit(Number(limit));
    
    if (error) throw error;

    res.json({
      rewards: rewards || [],
      totalCount: rewards?.length || 0,
      page: Number(page),
      limit: Number(limit)
    });

  } catch (error) {
    console.error('Admin get rewards error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 리워드 지급 승인
export const approveReward = async (req: AdminRequest, res: Response) => {
  res.status(501).json({ error: 'Not implemented yet' });
};

// 출금 요청 관리
export const getWithdrawalRequests = async (req: AdminRequest, res: Response) => {
  res.status(501).json({ error: 'Not implemented yet' });
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
  res.status(501).json({ error: 'Not implemented yet' });
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