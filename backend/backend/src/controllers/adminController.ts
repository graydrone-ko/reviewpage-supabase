import { Response } from 'express';
import { dbUtils, db } from '../utils/database';
import { AdminRequest } from '../middleware/adminAuth';
import { AuthRequest } from '../middleware/auth';

// 관리자 대시보드 통계 현황
export const getDashboardStats = async (req: AdminRequest, res: Response) => {
  try {
    // 기본 통계 조회 (간소화)
    const stats = await dbUtils.getStats();

    res.json({
      users: {
        total: stats.totalUsers,
        consumers: Math.floor(stats.totalUsers * 0.8), // 임시 추정값
        sellers: Math.floor(stats.totalUsers * 0.2), // 임시 추정값
        recent: 0 // 임시값 - 최근 7일 가입자
      },
      surveys: {
        total: stats.totalSurveys,
        pending: 0, // 임시값
        approved: stats.totalSurveys,
        completed: 0 // 임시값
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
        pendingCancellations: 0 // 임시값
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
    const { role, page = 1, limit = 10 } = req.query;
    
    // 간소화된 사용자 목록 조회
    const { data: users, error } = await db
      .from('users')
      .select('*')
      .eq(role ? 'role' : 'id', role || '')
      .limit(Number(limit));

    if (error) throw error;

    res.json({
      users: users || [],
      totalCount: users?.length || 0,
      page: Number(page),
      limit: Number(limit)
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