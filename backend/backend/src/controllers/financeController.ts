import { Request, Response } from 'express';
import { dbUtils, db } from '../utils/database';
import { AuthRequest } from '../middleware/auth';

// 통합 거래 내역 인터페이스
interface TransactionRecord {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL';
  subType: 'SURVEY_PAYMENT' | 'REFUND' | 'REWARD';
  amount: number;
  description: string;
  createdAt: Date;
  relatedId?: string;
}

// 판매자 거래 내역 조회
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
        amount: survey.total_budget || 0,
        description: `설문 "${survey.title}" 비용`,
        createdAt: new Date(survey.created_at),
        relatedId: survey.id
      });
    });

    // 날짜 순 정렬
    transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

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
        subType: 'REWARD',
        amount: reward.amount,
        description: `설문 참여 리워드`,
        createdAt: new Date(reward.created_at),
        relatedId: reward.id
      });
    });

    // 날짜 순 정렬
    transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

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