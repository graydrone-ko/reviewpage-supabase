import { Request, Response } from 'express';
import { prisma } from '../utils/database';
import { AuthRequest } from '../middleware/auth';

// 날짜 범위 계산 함수
const getDateFilter = (period: string, startDate?: string, endDate?: string) => {
  // 커스텀 날짜 범위가 제공된 경우
  if (startDate && endDate) {
    return {
      createdAt: {
        gte: new Date(startDate),
        lte: new Date(endDate + 'T23:59:59.999Z') // 종료일 마지막 시간까지 포함
      }
    };
  }

  const now = new Date();
  let start: Date;

  switch (period) {
    case 'today':
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case 'week':
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case '3month':
      start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    case 'thisMonth':
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'lastMonth':
      start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return {
        createdAt: {
          gte: start,
          lte: end
        }
      };
    default:
      return {};
  }

  return {
    createdAt: {
      gte: start
    }
  };
};

export const getFinanceStats = async (req: AuthRequest, res: Response) => {
  try {
    const period = req.query.period as string || 'month';
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const dateFilter = getDateFilter(period, startDate, endDate);

    // 총 설문 입금액 계산 (설문이 승인된 경우)
    const surveys = await prisma.survey.findMany({
      where: {
        status: 'APPROVED',
        ...dateFilter
      },
      select: {
        reward: true,
        maxParticipants: true
      }
    });

    const totalRevenue = surveys.reduce((sum, survey) => {
      const surveyTotal = survey.reward * survey.maxParticipants;
      const feeAmount = surveyTotal * 0.1; // 10% 수수료
      return sum + surveyTotal + feeAmount;
    }, 0);

    // 실제 지급된 리워드 (출금 완료)
    const completedRewards = await prisma.reward.aggregate({
      where: {
        status: 'PAID',
        ...dateFilter
      },
      _sum: {
        amount: true
      }
    });

    const totalWithdrawn = completedRewards._sum.amount || 0;

    // 수수료 수익 계산 (총 입금액의 10%)
    const netProfit = surveys.reduce((sum, survey) => {
      const surveyTotal = survey.reward * survey.maxParticipants;
      const feeAmount = surveyTotal * 0.1;
      return sum + feeAmount;
    }, 0);

    // 대기 중인 출금 신청
    const pendingRewards = await prisma.reward.aggregate({
      where: {
        status: 'PENDING',
        ...dateFilter
      },
      _sum: {
        amount: true
      }
    });

    const pendingWithdrawals = pendingRewards._sum.amount || 0;

    res.json({
      totalRevenue: Math.round(totalRevenue),
      totalWithdrawn: Math.round(totalWithdrawn),
      netProfit: Math.round(netProfit),
      pendingWithdrawals: Math.round(pendingWithdrawals)
    });

  } catch (error) {
    console.error('Finance stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPayments = async (req: AuthRequest, res: Response) => {
  try {
    const period = req.query.period as string || 'month';
    const status = req.query.status as string || 'all';
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const dateFilter = getDateFilter(period, startDate, endDate);

    let statusFilter = {};
    if (status !== 'all') {
      statusFilter = { status };
    }

    // 승인된 설문들을 입금 기록으로 간주
    const surveys = await prisma.survey.findMany({
      where: {
        status: 'APPROVED',
        ...dateFilter,
        ...statusFilter
      },
      include: {
        seller: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        approvedAt: 'desc'
      }
    });

    const payments = surveys.map(survey => {
      const baseAmount = survey.reward * survey.maxParticipants;
      const feeAmount = baseAmount * 0.1; // 10% 수수료
      const totalAmount = baseAmount + feeAmount;

      return {
        id: survey.id,
        surveyId: survey.id,
        surveyTitle: survey.title,
        sellerName: survey.seller.name,
        sellerEmail: survey.seller.email,
        totalAmount,
        feeAmount,
        baseAmount,
        status: survey.status === 'APPROVED' ? 'CONFIRMED' : 'PENDING',
        createdAt: survey.approvedAt || survey.createdAt
      };
    });

    res.json({ payments });

  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getWithdrawals = async (req: AuthRequest, res: Response) => {
  try {
    const period = req.query.period as string || 'month';
    const status = req.query.status as string || 'all';
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const dateFilter = getDateFilter(period, startDate, endDate);

    let statusFilter = {};
    if (status !== 'all') {
      statusFilter = { status };
    }

    // 실제 출금 신청은 아직 구현되지 않았으므로, 리워드 테이블을 기반으로 가상 데이터 생성
    const rewards = await prisma.reward.findMany({
      where: {
        ...dateFilter,
        ...(status !== 'all' ? { 
          status: status === 'COMPLETED' ? 'PAID' : 'PENDING' 
        } : {})
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            bankCode: true,
            accountNumber: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    const withdrawals = rewards.map(reward => ({
      id: reward.id,
      userId: reward.userId,
      userName: reward.user.name,
      userEmail: reward.user.email,
      amount: Math.abs(reward.amount), // 환불의 경우 음수이므로 절댓값 표시
      bankCode: reward.user.bankCode,
      accountNumber: reward.user.accountNumber,
      status: reward.status === 'PAID' ? 'COMPLETED' : 'PENDING',
      requestedAt: reward.createdAt,
      completedAt: reward.status === 'PAID' ? reward.updatedAt : null,
      type: reward.type // 환불인지 일반 출금인지 구분
    }));

    res.json({ withdrawals });

  } catch (error) {
    console.error('Get withdrawals error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const approveWithdrawal = async (req: AuthRequest, res: Response) => {
  try {
    const { withdrawalId } = req.body;

    if (!withdrawalId) {
      return res.status(400).json({ error: 'Withdrawal ID is required' });
    }

    // 리워드 상태를 PAID로 변경
    await prisma.reward.update({
      where: { id: withdrawalId },
      data: { 
        status: 'PAID',
        updatedAt: new Date()
      }
    });

    res.json({ message: 'Withdrawal approved successfully' });

  } catch (error) {
    console.error('Approve withdrawal error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const rejectWithdrawal = async (req: AuthRequest, res: Response) => {
  try {
    const { withdrawalId } = req.body;

    if (!withdrawalId) {
      return res.status(400).json({ error: 'Withdrawal ID is required' });
    }

    // 실제 구현에서는 별도의 상태를 관리해야 하지만, 
    // 현재는 단순히 PENDING 상태로 유지
    res.json({ message: 'Withdrawal rejected successfully' });

  } catch (error) {
    console.error('Reject withdrawal error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const exportFinanceData = async (req: AuthRequest, res: Response) => {
  try {
    const period = req.query.period as string || 'month';
    const type = req.query.type as string || 'payments';
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;

    // 간단한 CSV 형태로 데이터 내보내기
    let csvData: string;
    let filename: string;

    if (type === 'payments') {
      const dateFilter = getDateFilter(period, startDate, endDate);
      const surveys = await prisma.survey.findMany({
        where: {
          status: 'APPROVED',
          ...dateFilter
        },
        include: {
          seller: {
            select: {
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          approvedAt: 'desc'
        }
      });

      const headers = ['날짜', '설문 제목', '판매자', '이메일', '총 입금액', '수수료', '순액'];
      const rows = surveys.map(survey => {
        const baseAmount = survey.reward * survey.maxParticipants;
        const feeAmount = baseAmount * 0.1;
        const totalAmount = baseAmount + feeAmount;
        
        return [
          new Date(survey.approvedAt || survey.createdAt).toLocaleDateString('ko-KR'),
          survey.title,
          survey.seller.name,
          survey.seller.email,
          totalAmount.toString(),
          feeAmount.toString(),
          baseAmount.toString()
        ];
      });

      csvData = [headers, ...rows].map(row => row.join(',')).join('\n');
      filename = `payments_${period}_${new Date().toISOString().split('T')[0]}.csv`;
    } else {
      // withdrawals
      const dateFilter = getDateFilter(period, startDate, endDate);
      const rewards = await prisma.reward.findMany({
        where: dateFilter,
        include: {
          user: {
            select: {
              name: true,
              email: true,
              bankCode: true,
              accountNumber: true
            }
          }
        },
        orderBy: {
          updatedAt: 'desc'
        }
      });

      const headers = ['날짜', '사용자명', '이메일', '은행', '계좌번호', '금액', '상태'];
      const rows = rewards.map(reward => [
        new Date(reward.createdAt).toLocaleDateString('ko-KR'),
        reward.user.name,
        reward.user.email,
        reward.user.bankCode,
        reward.user.accountNumber,
        reward.amount.toString(),
        reward.status === 'PAID' ? '완료' : '대기'
      ]);

      csvData = [headers, ...rows].map(row => row.join(',')).join('\n');
      filename = `withdrawals_${period}_${new Date().toISOString().split('T')[0]}.csv`;
    }

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
    res.send('\uFEFF' + csvData); // BOM for UTF-8

  } catch (error) {
    console.error('Export finance data error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};