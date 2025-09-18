import { Request, Response } from 'express';
import { dbUtils, db } from '../utils/database';
import { AuthRequest } from '../middleware/auth';

// 통합 거래 내역 인터페이스
interface TransactionRecord {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL';
  subType: 'SURVEY_PAYMENT' | 'REFUND' | 'REWARD_EARNED' | 'REWARD_WITHDRAWAL';
  amount: number;
  createdAt: string;
  processedAt?: string | null;
  status?: string;
  description?: string;
  relatedId?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    phoneNumber?: string | null;
    bankCode?: string | null;
    accountNumber?: string | null;
  };
  metadata?: {
    surveyTitle?: string;
    description?: string;
  };
}

interface DateRange {
  start?: Date;
  end?: Date;
}

const parseNumber = (value: any): number => {
  if (typeof value === 'number') return value;
  const converted = Number(value);
  return Number.isNaN(converted) ? 0 : converted;
};

const getDateRange = (period: string, startDate?: string, endDate?: string): DateRange => {
  if (startDate && endDate) {
    return {
      start: new Date(startDate),
      end: new Date(`${endDate}T23:59:59.999Z`)
    };
  }

  const now = new Date();
  let start: Date | undefined;
  let end: Date | undefined;

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
      end = new Date(now.getFullYear(), now.getMonth(), 0);
      break;
    case 'all':
    default:
      return {};
  }

  return { start, end };
};

const matchesRange = (dateValue: string | null | undefined, range: DateRange): boolean => {
  if (!range.start && !range.end) {
    return true;
  }

  if (!dateValue) {
    return false;
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return false;
  }

  if (range.start && date < range.start) {
    return false;
  }

  if (range.end && date > range.end) {
    return false;
  }

  return true;
};

// 판매자 거래 내역 조회
export const getFinanceStats = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const period = (req.query.period as string) || 'month';
    const startDate = req.query.startDate as string | undefined;
    const endDate = req.query.endDate as string | undefined;
    const range = getDateRange(period, startDate, endDate);

    const { data: surveyRows, error: surveyError } = await db
      .from('surveys')
      .select('id, reward, max_participants, total_budget, status, approved_at, created_at');

    if (surveyError) throw surveyError;

    const approvedSurveys = (surveyRows || []).filter((survey: any) => (
      survey.status === 'APPROVED' && matchesRange(survey.approved_at || survey.created_at, range)
    ));

    const totalRevenue = approvedSurveys.reduce((sum: number, survey: any) => {
      const reward = parseNumber(survey.reward);
      const participants = parseNumber(survey.max_participants);
      const baseAmount = reward * participants;
      const feeAmount = baseAmount * 0.1;
      return sum + baseAmount + feeAmount;
    }, 0);

    const { data: rewardRows, error: rewardError } = await db
      .from('rewards')
      .select('amount, status, type, created_at, updated_at');

    if (rewardError) throw rewardError;

    const paidRewards = (rewardRows || []).filter((reward: any) => (
      reward.status === 'PAID' && matchesRange(reward.updated_at || reward.created_at, range)
    ));

    const totalWithdrawn = paidRewards.reduce((sum: number, reward: any) => sum + parseNumber(reward.amount), 0);

    const pendingRewards = (rewardRows || []).filter((reward: any) => (
      reward.status === 'PENDING' && matchesRange(reward.updated_at || reward.created_at, range)
    ));

    const pendingWithdrawals = pendingRewards.reduce((sum: number, reward: any) => sum + parseNumber(reward.amount), 0);

    // 순수익(수수료)은 적립된 리워드의 10%로 계산한다.
    const revenueRewardStatuses = ['EARNED', 'PENDING', 'PAID'];
    const accruedRewards = (rewardRows || []).filter((reward: any) => (
      revenueRewardStatuses.includes(reward.status) &&
      reward.type !== 'REFUND' &&
      matchesRange(reward.updated_at || reward.created_at, range)
    ));

    const accruedRewardTotal = accruedRewards.reduce((sum: number, reward: any) => (
      sum + parseNumber(reward.amount)
    ), 0);

    const netProfit = accruedRewardTotal * 0.1;

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
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const period = (req.query.period as string) || 'month';
    const status = (req.query.status as string) || 'all';
    const startDate = req.query.startDate as string | undefined;
    const endDate = req.query.endDate as string | undefined;
    const range = getDateRange(period, startDate, endDate);

    const { data, error } = await db
      .from('surveys')
      .select(`
        id,
        title,
        reward,
        max_participants,
        total_budget,
        status,
        approved_at,
        created_at,
        seller:users!surveys_seller_id_fkey(id, name, email)
      `);

    if (error) throw error;

    const normalizeSurveyStatus = (surveyStatus: string | null): string => surveyStatus || 'PENDING';

    const matchesStatusFilter = (survey: any) => {
      if (status === 'all') return true;
      const normalized = normalizeSurveyStatus(survey.status);
      if (status === 'PENDING') return normalized === 'PENDING';
      if (status === 'APPROVED' || status === 'COMPLETED') {
        return normalized === 'APPROVED' || normalized === 'COMPLETED';
      }
      if (status === 'REJECTED') {
        return normalized === 'REJECTED' || normalized === 'CANCELLED';
      }
      return true;
    };

    const payments = (data || [])
      .filter((survey: any) => matchesRange(survey.approved_at || survey.created_at, range))
      .filter(matchesStatusFilter)
      .map((survey: any) => {
        const reward = parseNumber(survey.reward);
        const participants = parseNumber(survey.max_participants);
        const baseAmount = reward * participants;
        const feeAmount = baseAmount * 0.1;
        const totalAmount = baseAmount + feeAmount;

        const normalizedStatus = normalizeSurveyStatus(survey.status);

        return {
          id: survey.id,
          surveyId: survey.id,
          surveyTitle: survey.title,
          sellerName: survey.seller?.name || '',
          sellerEmail: survey.seller?.email || '',
          totalAmount,
          feeAmount,
          baseAmount,
          status: normalizedStatus === 'APPROVED' || normalizedStatus === 'COMPLETED' ? 'COMPLETED' : 'PENDING',
          createdAt: survey.approved_at || survey.created_at
        };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({ payments });

  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getWithdrawals = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const period = (req.query.period as string) || 'month';
    const status = (req.query.status as string) || 'all';
    const startDate = req.query.startDate as string | undefined;
    const endDate = req.query.endDate as string | undefined;
    const range = getDateRange(period, startDate, endDate);

    const { data, error } = await db
      .from('withdrawal_requests')
      .select(`
        id,
        user_id,
        amount,
        status,
        requested_at,
        processed_at,
        note,
        user:users!withdrawal_requests_user_id_fkey(
          id,
          name,
          email,
          phone_number,
          bank_code,
          account_number
        )
      `);

    if (error) throw error;

    const convertStatus = (rawStatus: string | null): string => {
      if (!rawStatus) return 'PENDING';
      if (rawStatus === 'APPROVED') return 'COMPLETED';
      return rawStatus;
    };

    const withdrawals = (data || [])
      .filter((record: any) => matchesRange(record.requested_at, range))
      .filter((record: any) => {
        if (status === 'all') return true;
        if (status === 'COMPLETED') return record.status === 'APPROVED';
        return record.status === status;
      })
      .map((record: any) => ({
        id: record.id,
        userId: record.user_id,
        userName: record.user?.name || '',
        userEmail: record.user?.email || '',
        amount: parseNumber(record.amount),
        bankCode: record.user?.bank_code || '',
        accountNumber: record.user?.account_number || '',
        status: convertStatus(record.status),
        requestedAt: record.requested_at,
        completedAt: record.status === 'APPROVED' ? record.processed_at : null,
        type: 'REWARD_WITHDRAWAL'
      }))
      .sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());

    res.json({ withdrawals });

  } catch (error) {
    console.error('Get withdrawals error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTransactions = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const period = (req.query.period as string) || 'month';
    const statusFilter = (req.query.status as string) || 'all';
    const typeFilter = (req.query.type as string) || 'all';
    const startDate = req.query.startDate as string | undefined;
    const endDate = req.query.endDate as string | undefined;
    const range = getDateRange(period, startDate, endDate);

    const matchesStatusFilter = (status: string) => {
      if (statusFilter === 'all') return true;
      return status === statusFilter;
    };

    const matchesTypeFilter = (type: 'DEPOSIT' | 'WITHDRAWAL') => {
      if (typeFilter === 'all') return true;
      return type === typeFilter;
    };

    const transactions: TransactionRecord[] = [];

    const { data: surveyRows, error: surveyError } = await db
      .from('surveys')
      .select(`
        id,
        title,
        reward,
        max_participants,
        total_budget,
        status,
        approved_at,
        created_at,
        seller:users!surveys_seller_id_fkey(
          id,
          name,
          email,
          role,
          phone_number,
          bank_code,
          account_number
        )
      `);

    if (surveyError) throw surveyError;

    (surveyRows || []).forEach((survey: any) => {
      if (!matchesRange(survey.approved_at || survey.created_at, range)) {
        return;
      }

      const reward = parseNumber(survey.reward);
      const participants = parseNumber(survey.max_participants);
      const baseAmount = reward * participants;
      const feeAmount = baseAmount * 0.1;
      const totalAmount = baseAmount + feeAmount;

      const status = (survey.status === 'APPROVED' || survey.status === 'COMPLETED') ? 'COMPLETED' : 'PENDING';

      if (!matchesStatusFilter(status) || !matchesTypeFilter('DEPOSIT')) {
        return;
      }

      transactions.push({
        id: `deposit_${survey.id}`,
        type: 'DEPOSIT',
        subType: 'SURVEY_PAYMENT',
        amount: totalAmount,
        createdAt: survey.approved_at || survey.created_at,
        processedAt: survey.approved_at || null,
        status,
        user: survey.seller ? {
          id: survey.seller.id,
          name: survey.seller.name,
          email: survey.seller.email,
          role: survey.seller.role || 'SELLER',
          phoneNumber: survey.seller.phone_number,
          bankCode: survey.seller.bank_code,
          accountNumber: survey.seller.account_number
        } : undefined,
        metadata: {
          surveyTitle: survey.title,
          description: `설문 승인 - ${survey.title}`
        }
      });
    });

    const { data: rewardRows, error: rewardError } = await db
      .from('rewards')
      .select(`
        id,
        amount,
        status,
        type,
        created_at,
        updated_at,
        user:users!rewards_user_id_fkey(
          id,
          name,
          email,
          role,
          phone_number,
          bank_code,
          account_number
        )
      `);

    if (rewardError) throw rewardError;

    (rewardRows || []).forEach((reward: any) => {
      if (!matchesRange(reward.updated_at || reward.created_at, range)) {
        return;
      }

      const amount = Math.abs(parseNumber(reward.amount));
      const userPayload = reward.user
        ? {
            id: reward.user.id,
            name: reward.user.name,
            email: reward.user.email,
            role: reward.user.role || 'CONSUMER',
            phoneNumber: reward.user.phone_number,
            bankCode: reward.user.bank_code,
            accountNumber: reward.user.account_number
          }
        : undefined;

      if (reward.type === 'REFUND') {
        const statusLabel = reward.status === 'PAID' ? 'COMPLETED' : reward.status === 'PENDING' ? 'PENDING' : reward.status;
        if (!matchesStatusFilter(statusLabel) || !matchesTypeFilter('WITHDRAWAL')) {
          return;
        }

        transactions.push({
          id: `reward_refund_${reward.id}`,
          type: 'WITHDRAWAL',
          subType: 'REFUND',
          amount,
          createdAt: reward.created_at,
          processedAt: reward.updated_at,
          status: statusLabel,
          user: userPayload,
          metadata: { description: '환불 처리' }
        } as TransactionRecord);
        return;
      }

      if (reward.status === 'EARNED') {
        const statusLabel = 'COMPLETED';
        if (!matchesStatusFilter(statusLabel) || !matchesTypeFilter('DEPOSIT')) {
          return;
        }

        transactions.push({
          id: `reward_earned_${reward.id}`,
          type: 'DEPOSIT',
          subType: 'REWARD_EARNED',
          amount,
          createdAt: reward.created_at,
          processedAt: reward.created_at,
          status: statusLabel,
          user: userPayload,
          metadata: { description: '리워드 적립' }
        } as TransactionRecord);
        return;
      }

      if (reward.status === 'PENDING' || reward.status === 'PAID') {
        const statusLabel = reward.status === 'PAID' ? 'COMPLETED' : 'PENDING';
        if (!matchesStatusFilter(statusLabel) || !matchesTypeFilter('WITHDRAWAL')) {
          return;
        }

        transactions.push({
          id: `reward_withdrawal_${reward.id}`,
          type: 'WITHDRAWAL',
          subType: 'REWARD_WITHDRAWAL',
          amount,
          createdAt: reward.created_at,
          processedAt: reward.updated_at,
          status: statusLabel,
          user: userPayload,
          metadata: { description: statusLabel === 'COMPLETED' ? '리워드 출금' : '리워드 출금 대기' }
        } as TransactionRecord);
        return;
      }
    });

    transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({ transactions });

  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const approveWithdrawal = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { withdrawalId } = req.body;

    if (!withdrawalId) {
      return res.status(400).json({ error: 'Withdrawal ID is required' });
    }

    const processedAt = new Date().toISOString();

    const { data: updated, error } = await db
      .from('withdrawal_requests')
      .update({
        status: 'APPROVED',
        processed_at: processedAt,
        processed_by: req.user.id
      })
      .eq('id', withdrawalId)
      .select('user_id')
      .single();

    if (error) throw error;

    if (updated?.user_id) {
      await db
        .from('rewards')
        .update({ status: 'PAID', updated_at: processedAt })
        .eq('user_id', updated.user_id)
        .eq('status', 'PENDING');
    }

    res.json({ message: 'Withdrawal approved successfully' });

  } catch (error) {
    console.error('Approve withdrawal error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const rejectWithdrawal = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { withdrawalId } = req.body;

    if (!withdrawalId) {
      return res.status(400).json({ error: 'Withdrawal ID is required' });
    }

    const processedAt = new Date().toISOString();

    const { data: requestRow, error: requestError } = await db
      .from('withdrawal_requests')
      .select('user_id')
      .eq('id', withdrawalId)
      .single();

    if (requestError) throw requestError;

    const { error } = await db
      .from('withdrawal_requests')
      .update({
        status: 'REJECTED',
        processed_at: processedAt,
        processed_by: req.user.id
      })
      .eq('id', withdrawalId);

    if (error) throw error;

    if (requestRow?.user_id) {
      const { error: revertError } = await db
        .from('rewards')
        .update({ status: 'EARNED', updated_at: processedAt })
        .eq('user_id', requestRow.user_id)
        .eq('status', 'PENDING');

      if (revertError) throw revertError;
    }

    res.json({ message: 'Withdrawal rejected successfully' });

  } catch (error) {
    console.error('Reject withdrawal error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSellerTransactions = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'SELLER') {
      return res.status(403).json({ error: 'Only sellers can view seller transactions' });
    }

    // 간소화된 거래 내역 (실제로는 여러 테이블에서 조합)
    const transactions: TransactionRecord[] = [];

    // 설문 비용 조회
    const surveys = await dbUtils.findSurveysByConditions({ seller_id: req.user.id });
    
    surveys.forEach((survey: any) => {
      transactions.push({
        id: survey.id,
        type: 'WITHDRAWAL',
        subType: 'SURVEY_PAYMENT',
        amount: parseNumber(survey.total_budget),
        description: `설문 "${survey.title}" 비용`,
        createdAt: survey.created_at,
        relatedId: survey.id
      });
    });

    transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({
      transactions,
      totalCount: transactions.length
    });

  } catch (error) {
    console.error('Get seller transactions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 소비자 거래 내역 조회
export const getConsumerTransactions = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'CONSUMER') {
      return res.status(403).json({ error: 'Only consumers can view consumer transactions' });
    }

    const transactions: TransactionRecord[] = [];

    // 리워드 조회
    const rewards = await dbUtils.findRewardsByUserId(req.user.id);
    
    rewards.forEach((reward: any) => {
      transactions.push({
        id: reward.id,
        type: 'DEPOSIT',
        subType: 'REWARD_EARNED',
        amount: parseNumber(reward.amount),
        description: '리워드 적립',
        createdAt: reward.created_at,
        relatedId: reward.id
      });
    });

    transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({
      transactions,
      totalCount: transactions.length
    });

  } catch (error) {
    console.error('Get consumer transactions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 판매자 잔액 조회
export const getSellerBalance = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'SELLER') {
      return res.status(403).json({ error: 'Only sellers can view seller balance' });
    }

    // 간소화된 잔액 계산 (실제로는 복잡한 계산 필요)
    const surveys = await dbUtils.findSurveysByConditions({ seller_id: req.user.id });
    const totalSpent = surveys.reduce((sum: number, survey: any) => sum + (survey.total_budget || 0), 0);

    res.json({
      availableBalance: Math.max(0, 100000 - totalSpent), // 임시 계산
      totalSpent,
      pendingAmount: 0 // 임시값
    });

  } catch (error) {
    console.error('Get seller balance error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 소비자 잔액 조회
export const getConsumerBalance = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'CONSUMER') {
      return res.status(403).json({ error: 'Only consumers can view consumer balance' });
    }

    // 리워드 잔액 계산
    const rewards = await dbUtils.findRewardsByUserId(req.user.id);
    const totalEarned = rewards.reduce((sum: number, reward: any) => sum + reward.amount, 0);
    const totalPaid = rewards
      .filter((reward: any) => reward.status === 'PAID')
      .reduce((sum: number, reward: any) => sum + reward.amount, 0);

    res.json({
      availableBalance: totalEarned - totalPaid,
      totalEarned,
      totalPaid,
      pendingAmount: totalEarned - totalPaid
    });

  } catch (error) {
    console.error('Get consumer balance error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 관리자용 전체 거래 내역 조회
export const getAllTransactions = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // 간소화된 전체 거래 내역
    const stats = await dbUtils.getStats();

    res.json({
      totalTransactions: 0, // 임시값
      totalVolume: stats.totalRewards,
      pendingTransactions: 0, // 임시값
      recentTransactions: [] // 임시값
    });

  } catch (error) {
    console.error('Get all transactions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
