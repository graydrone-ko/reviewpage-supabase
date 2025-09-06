import { Response } from 'express';
import { prisma } from '../utils/database';
import { AdminRequest } from '../middleware/adminAuth';
import { AuthRequest } from '../middleware/auth';

// 관리자 대시보드 통계 현황
export const getDashboardStats = async (req: AdminRequest, res: Response) => {
  try {
    // 전체 사용자 수
    const totalUsers = await prisma.user.count();
    const totalConsumers = await prisma.user.count({
      where: { role: 'CONSUMER' }
    });
    const totalSellers = await prisma.user.count({
      where: { role: 'SELLER' }
    });

    // 설문 통계
    const totalSurveys = await prisma.survey.count();
    const pendingSurveys = await prisma.survey.count({
      where: { status: 'PENDING' }
    });
    const approvedSurveys = await prisma.survey.count({
      where: { status: 'APPROVED' }
    });
    const completedSurveys = await prisma.survey.count({
      where: { status: 'COMPLETED' }
    });

    // 응답 통계
    const totalResponses = await prisma.surveyResponse.count();

    // 리워드 통계
    const totalRewards = await prisma.reward.aggregate({
      _sum: {
        amount: true
      }
    });
    const pendingRewards = await prisma.reward.aggregate({
      _sum: {
        amount: true
      },
      where: {
        status: 'PENDING'
      }
    });
    const paidRewards = await prisma.reward.aggregate({
      _sum: {
        amount: true
      },
      where: {
        status: 'PAID'
      }
    });

    // 최근 가입자 (최근 7일)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    });

    // 출금 요청 통계
    const pendingWithdrawalRequests = await prisma.withdrawalRequest.count({
      where: { status: 'PENDING' }
    });

    // 중단 요청 통계
    const pendingCancellationRequests = await prisma.survey.count({
      where: {
        cancellationStatus: 'PENDING',
        cancellationRequestedAt: { not: null }
      }
    });

    res.json({
      users: {
        total: totalUsers,
        consumers: totalConsumers,
        sellers: totalSellers,
        recent: recentUsers
      },
      surveys: {
        total: totalSurveys,
        pending: pendingSurveys,
        approved: approvedSurveys,
        completed: completedSurveys
      },
      responses: {
        total: totalResponses
      },
      rewards: {
        total: totalRewards._sum.amount || 0,
        pending: pendingRewards._sum.amount || 0,
        paid: paidRewards._sum.amount || 0
      },
      notifications: {
        pendingWithdrawals: pendingWithdrawalRequests,
        pendingCancellations: pendingCancellationRequests
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 모든 사용자 조회 (페이징)
export const getUsers = async (req: AdminRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const role = req.query.role as string;
    
    const where = role ? { role: role as 'ADMIN' | 'SELLER' | 'CONSUMER' } : {};
    
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        birthDate: true,
        gender: true,
        phoneNumber: true,
        createdAt: true,
        _count: {
          select: {
            surveys: true,
            responses: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.user.count({ where });

    res.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 설문 상태 업데이트 (향상된 기능 - 더 많은 상태 지원)
export const updateSurveyStatus = async (req: AdminRequest, res: Response) => {
  try {
    const { surveyId } = req.params;
    const { status, reason } = req.body;

    if (!['APPROVED', 'CANCELLED', 'SUSPENDED', 'COMPLETED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updateData: any = { status };
    
    // 승인 시간 기록
    if (status === 'APPROVED') {
      updateData.approvedAt = new Date();
    }
    // 완료 시간 기록
    if (status === 'COMPLETED') {
      updateData.completedAt = new Date();
    }
    // 거부 사유 기록
    if (reason) {
      updateData.rejectionReason = reason;
    }

    const survey = await prisma.survey.update({
      where: { id: surveyId },
      data: updateData,
      include: {
        seller: {
          select: {
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            responses: true
          }
        }
      }
    });

    const statusLabels = {
      APPROVED: 'approved',
      CANCELLED: 'cancelled',
      SUSPENDED: 'suspended',
      COMPLETED: 'completed'
    };

    res.json({
      message: `Survey ${statusLabels[status as keyof typeof statusLabels]} successfully`,
      survey
    });

  } catch (error) {
    console.error('Update survey status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 모든 설문 목록 조회 (향상된 관리자 기능)
export const getAllSurveys = async (req: AdminRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50; // 더 많은 항목 표시
    const status = req.query.status as string;
    const search = req.query.search as string;
    
    // 필터 조건 구성
    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { seller: { name: { contains: search, mode: 'insensitive' } } },
        { seller: { email: { contains: search, mode: 'insensitive' } } }
      ];
    }
    
    const surveys = await prisma.survey.findMany({
      where,
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        template: {
          include: {
            steps: {
              include: {
                questions: {
                  include: {
                    options: true
                  }
                }
              }
            }
          }
        },
        _count: {
          select: {
            responses: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.survey.count({ where });

    res.json({
      surveys,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get all surveys error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 승인 대기 중인 설문 목록 (기존 기능 유지)
export const getPendingSurveys = async (req: AdminRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    
    const surveys = await prisma.survey.findMany({
      where: { status: 'PENDING' },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            responses: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.survey.count({
      where: { status: 'PENDING' }
    });

    res.json({
      surveys,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get pending surveys error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 리워드 관리
export const getRewards = async (req: AdminRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;

    const where = status ? { status: status as 'PENDING' | 'PAID' } : {};

    const rewards = await prisma.reward.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            phoneNumber: true,
            bankCode: true,
            accountNumber: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.reward.count({ where });

    res.json({
      rewards,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get rewards error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 리워드 상태 업데이트
export const updateRewardStatus = async (req: AdminRequest, res: Response) => {
  try {
    const { rewardId } = req.params;
    const { status } = req.body;

    if (!['PENDING', 'PAID'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const reward = await prisma.reward.update({
      where: { id: rewardId },
      data: { status },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    res.json({
      message: `Reward status updated to ${status}`,
      reward
    });

  } catch (error) {
    console.error('Update reward status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 설문 응답 조회 (검토용)
export const getSurveyResponses = async (req: AdminRequest, res: Response) => {
  try {
    const { surveyId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const survey = await prisma.survey.findUnique({
      where: { id: surveyId },
      include: {
        seller: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    const responses = await prisma.surveyResponse.findMany({
      where: { surveyId },
      include: {
        consumer: {
          select: {
            id: true,
            name: true,
            email: true,
            birthDate: true,
            gender: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.surveyResponse.count({
      where: { surveyId }
    });

    res.json({
      survey,
      responses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get survey responses error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 중단요청 목록 조회
export const getCancellationRequests = async (req: AdminRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;

    const where: any = {};
    if (status && status !== 'ALL') {
      where.cancellationStatus = status;
    }

    const cancellationRequests = await prisma.survey.findMany({
      where: {
        ...where,
        cancellationRequestedAt: { not: null }
      },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            bankCode: true,
            accountNumber: true
          }
        },
        _count: {
          select: {
            responses: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { cancellationRequestedAt: 'desc' }
    });

    const total = await prisma.survey.count({
      where: {
        ...where,
        cancellationRequestedAt: { not: null }
      }
    });

    res.json({
      cancellationRequests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get cancellation requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 중단요청 통계
export const getCancellationRequestStats = async (req: AdminRequest, res: Response) => {
  try {
    const totalRequests = await prisma.survey.count({
      where: { cancellationRequestedAt: { not: null } }
    });

    const pendingRequests = await prisma.survey.count({
      where: { 
        cancellationRequestedAt: { not: null },
        cancellationStatus: 'PENDING'
      }
    });

    const approvedRequests = await prisma.survey.count({
      where: { 
        cancellationRequestedAt: { not: null },
        cancellationStatus: 'APPROVED'
      }
    });

    const rejectedRequests = await prisma.survey.count({
      where: { 
        cancellationRequestedAt: { not: null },
        cancellationStatus: 'REJECTED'
      }
    });

    // 환불 예정 금액 계산 (승인 대기 중인 요청들 - 예상 환불 금액)
    const pendingSurveys = await prisma.survey.findMany({
      where: { 
        cancellationRequestedAt: { not: null },
        cancellationStatus: 'PENDING'
      },
      include: {
        responses: true
      }
    });

    let pendingRefundAmount = 0;
    for (const survey of pendingSurveys) {
      const rewardPerResponse = survey.reward || 0;
      const completedResponses = survey.responses.length;
      // maxParticipants를 totalBudget에서 역산
      const maxParticipants = Math.round((survey.totalBudget || 0) / (rewardPerResponse * 1.1));
      
      // 올바른 환불 계산: 미진행분 리워드 + 해당 수수료
      const remainingSlots = maxParticipants - completedResponses;
      const refundRewards = remainingSlots * rewardPerResponse;
      const refundFee = refundRewards * 0.1; // 미진행분에 대한 10% 수수료
      const refundAmount = Math.max(0, refundRewards + refundFee);
      
      pendingRefundAmount += refundAmount;
    }

    // 환불 완료 금액 계산 (실제 기록된 환불 금액)
    const approvedRefundAmount = await prisma.surveyCancellationRequest.aggregate({
      where: { 
        status: 'APPROVED'
      },
      _sum: {
        refundAmount: true
      }
    });

    res.json({
      total: totalRequests,
      pending: pendingRequests,
      approved: approvedRequests,
      rejected: rejectedRequests,
      refunds: {
        pending: pendingRefundAmount,
        approved: approvedRefundAmount._sum.refundAmount || 0
      }
    });

  } catch (error) {
    console.error('Get cancellation request stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 중단요청 처리 (승인/거절)
export const processCancellationRequest = async (req: AdminRequest, res: Response) => {
  try {
    const { surveyId } = req.params;
    const { action, reason } = req.body;

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ error: 'Invalid action. Must be approve or reject.' });
    }

    const survey = await prisma.survey.findUnique({
      where: { id: surveyId },
      include: {
        seller: {
          select: {
            name: true,
            email: true
          }
        },
        responses: true
      }
    });

    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    if (!survey.cancellationRequestedAt) {
      return res.status(400).json({ error: 'No cancellation request found for this survey' });
    }

    if (survey.cancellationStatus !== 'PENDING') {
      return res.status(400).json({ error: 'Cancellation request already processed' });
    }

    let refundAmount = 0;
    
    if (action === 'approve') {
      // 올바른 환불 계산 로직 (미진행분 리워드 + 해당 수수료)
      const rewardPerResponse = survey.reward || 0;
      const completedResponses = survey.responses.length;
      const totalBudget = survey.totalBudget || 0;
      
      // maxParticipants를 totalBudget에서 역산 (totalBudget = maxParticipants * reward * 1.1)
      const maxParticipants = Math.round(totalBudget / (rewardPerResponse * 1.1));
      
      // 미진행분 계산
      const remainingSlots = maxParticipants - completedResponses;
      const refundRewards = remainingSlots * rewardPerResponse;
      const refundFee = refundRewards * 0.1; // 미진행분에 대한 10% 수수료
      
      refundAmount = Math.max(0, refundRewards + refundFee);
    }

    const updateData: any = {
      cancellationStatus: action === 'approve' ? 'APPROVED' : 'REJECTED'
    };

    if (reason) {
      updateData.rejectionReason = reason;
    }

    if (action === 'approve') {
      updateData.status = 'CANCELLED';
    }

    // SurveyCancellationRequest 테이블에 환불 금액 기록
    if (action === 'approve') {
      await prisma.surveyCancellationRequest.upsert({
        where: { surveyId },
        create: {
          surveyId,
          reason: reason || '관리자 승인',
          refundAmount,
          status: 'APPROVED',
          processedAt: new Date(),
          processedBy: req.admin?.id
        },
        update: {
          refundAmount,
          status: 'APPROVED',
          processedAt: new Date(),
          processedBy: req.admin?.id
        }
      });

      // 환불 트랜잭션 기록을 위한 리워드 생성 (음수 금액으로 환불 표시)
      if (refundAmount > 0) {
        await prisma.reward.create({
          data: {
            userId: survey.sellerId,
            amount: -refundAmount, // 음수로 환불을 표시
            type: 'REFUND', // 환불 타입 사용
            status: 'PAID' // 환불은 즉시 처리됨
          }
        });
      }
    }

    const updatedSurvey = await prisma.survey.update({
      where: { id: surveyId },
      data: updateData,
      include: {
        seller: {
          select: {
            name: true,
            email: true
          }
        },
        responses: true
      }
    });

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

// 최근 중단요청 목록 (알림용)
export const getRecentCancellationRequests = async (req: AdminRequest, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;

    const recentRequests = await prisma.survey.findMany({
      where: {
        cancellationRequestedAt: { not: null },
        cancellationStatus: 'PENDING'
      },
      include: {
        seller: {
          select: {
            name: true,
            email: true
          }
        }
      },
      take: limit,
      orderBy: { cancellationRequestedAt: 'desc' }
    });

    res.json({
      requests: recentRequests,
      count: recentRequests.length
    });

  } catch (error) {
    console.error('Get recent cancellation requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 출금 요청 목록 조회
export const getWithdrawalRequests = async (req: AdminRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;

    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const [withdrawalRequests, total] = await Promise.all([
      prisma.withdrawalRequest.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              phoneNumber: true,
              bankCode: true,
              accountNumber: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { requestedAt: 'desc' }
      }),
      prisma.withdrawalRequest.count({ where })
    ]);

    const pages = Math.ceil(total / limit);

    res.json({
      requests: withdrawalRequests,
      pagination: {
        page,
        limit,
        total,
        pages
      }
    });

  } catch (error) {
    console.error('Get withdrawal requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 출금 요청 처리 (승인/거절)
export const processWithdrawalRequest = async (req: AdminRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { action, note } = req.body; // action: 'approve' | 'reject'

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ error: 'Invalid action. Must be approve or reject' });
    }

    const withdrawalRequest = await prisma.withdrawalRequest.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!withdrawalRequest) {
      return res.status(404).json({ error: '출금 요청을 찾을 수 없습니다' });
    }

    if (withdrawalRequest.status !== 'PENDING') {
      return res.status(400).json({ error: '이미 처리된 출금 요청입니다' });
    }

    if (action === 'approve') {
      // 승인 시 해당 금액만큼의 PENDING 리워드를 PAID로 변경
      const userRewards = await prisma.reward.findMany({
        where: {
          userId: withdrawalRequest.userId,
          status: 'PENDING'
        },
        orderBy: { createdAt: 'asc' }
      });

      let remainingAmount = withdrawalRequest.amount;
      const rewardsToUpdate = [];

      for (const reward of userRewards) {
        if (remainingAmount <= 0) break;
        
        if (reward.amount <= remainingAmount) {
          rewardsToUpdate.push(reward.id);
          remainingAmount -= reward.amount;
        }
      }

      // 선택된 리워드들을 PAID로 업데이트
      if (rewardsToUpdate.length > 0) {
        await prisma.reward.updateMany({
          where: {
            id: {
              in: rewardsToUpdate
            }
          },
          data: {
            status: 'PAID',
            updatedAt: new Date()
          }
        });
      }
    }

    // 출금 요청 상태 업데이트
    const updatedRequest = await prisma.withdrawalRequest.update({
      where: { id },
      data: {
        status: action === 'approve' ? 'APPROVED' : 'REJECTED',
        processedAt: new Date(),
        processedBy: req.admin?.id,
        note: note || null
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    const actionLabel = action === 'approve' ? '승인' : '거절';
    console.log(`💰 출금 요청 ${actionLabel}: ${updatedRequest.user.name} (${updatedRequest.user.email}) - ₩${updatedRequest.amount.toLocaleString()}`);

    res.json({
      message: `출금 요청이 ${actionLabel}되었습니다`,
      request: updatedRequest
    });

  } catch (error) {
    console.error('Process withdrawal request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 최근 출금 요청 목록 (알림용)
export const getRecentWithdrawalRequests = async (req: AdminRequest, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;

    const recentRequests = await prisma.withdrawalRequest.findMany({
      where: {
        status: 'PENDING'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      take: limit,
      orderBy: { requestedAt: 'desc' }
    });

    res.json({
      requests: recentRequests,
      count: recentRequests.length
    });

  } catch (error) {
    console.error('Get recent withdrawal requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};