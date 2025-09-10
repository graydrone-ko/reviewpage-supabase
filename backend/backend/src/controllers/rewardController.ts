import { Request, Response } from 'express';
import { dbUtils, db } from '../utils/database';
import { AuthRequest } from '../middleware/auth';

export const getMyRewards = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // 리워드와 해당 시점의 설문 응답 정보를 함께 조회
    const rewards = await dbUtils.findRewardsByUserId(req.user.id);

    // 사용자의 모든 설문 응답을 가져와서 시간대별로 매칭
    const surveyResponses = await dbUtils.findResponsesByUserId(req.user.id);

    // 리워드와 설문 응답을 시간 기준으로 매칭
    const enrichedRewards = rewards.map(reward => {
      let matchedSurveyResponse = null;
      
      if (reward.type === 'SURVEY_COMPLETION') {
        // 리워드 생성 시간과 가장 가까운 설문 응답을 찾음 (±5분 이내)
        const rewardTime = new Date(reward.created_at).getTime();
        matchedSurveyResponse = surveyResponses.find(response => {
          const responseTime = new Date(response.created_at).getTime();
          const timeDiff = Math.abs(rewardTime - responseTime);
          return timeDiff <= 5 * 60 * 1000; // 5분 이내
        });
      }

      return {
        ...reward,
        surveyTitle: matchedSurveyResponse?.surveys?.title || '설문 정보 없음',
        storeName: matchedSurveyResponse?.surveys?.store_name || '-'
      };
    });

    const totalEarned = rewards.reduce((sum, reward) => sum + reward.amount, 0);
    const totalPaid = rewards
      .filter(reward => reward.status === 'PAID')
      .reduce((sum, reward) => sum + reward.amount, 0);
    const totalPending = totalEarned - totalPaid;

    res.json({
      rewards: enrichedRewards,
      summary: {
        totalEarned,
        totalPaid,
        totalPending
      }
    });

  } catch (error) {
    console.error('Get rewards error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const requestWithdrawal = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required' });
    }

    // Calculate available balance
    const { data: rewards, error: rewardsError } = await db
      .from('rewards')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('status', 'PENDING');
    
    if (rewardsError) throw rewardsError;

    const availableBalance = (rewards || []).reduce((sum, reward) => sum + reward.amount, 0);

    // Check if available balance is less than minimum withdrawal amount
    if (availableBalance < 10000) {
      return res.status(400).json({ error: '출금 가능 금액이 최소 출금 가능 10,000원보다 작습니다.' });
    }

    // Minimum withdrawal amount check
    if (amount < 10000) {
      return res.status(400).json({ error: '최소 출금 금액은 10,000원입니다.' });
    }

    if (amount > availableBalance) {
      return res.status(400).json({ error: '출금 요청 금액이 사용 가능한 잔액을 초과합니다.' });
    }

    // 출금 요청을 데이터베이스에 저장
    const { data: withdrawalRequest, error: withdrawalError } = await db
      .from('withdrawal_requests')
      .insert({
        user_id: req.user.id,
        amount: amount,
        status: 'PENDING'
      })
      .select()
      .single();
    
    if (withdrawalError) throw withdrawalError;

    console.log(`💰 출금 요청 생성됨: ${req.user.name || 'Unknown'} (${req.user.email}) - ₩${amount.toLocaleString()}`);
    
    res.json({
      message: '출금 신청이 완료되었습니다. 관리자 승인 후 처리됩니다.',
      amount,
      requestId: withdrawalRequest.id,
      note: '2-3 영업일 내에 관리자가 승인 후 지급됩니다.'
    });

  } catch (error) {
    console.error('Withdrawal request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRewardStats = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // 리워드 통계 조회
    const { data: allRewards, error: allRewardsError } = await db
      .from('rewards')
      .select('amount');
    
    if (allRewardsError) throw allRewardsError;

    const { data: paidRewardsData, error: paidRewardsError } = await db
      .from('rewards')
      .select('amount')
      .eq('status', 'PAID');
    
    if (paidRewardsError) throw paidRewardsError;

    const { data: pendingRewardsData, error: pendingRewardsError } = await db
      .from('rewards')
      .select('amount')
      .eq('status', 'PENDING');
    
    if (pendingRewardsError) throw pendingRewardsError;

    const { count: userCount, error: userCountError } = await db
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'CONSUMER');
    
    if (userCountError) throw userCountError;

    const { count: responseCount, error: responseCountError } = await db
      .from('survey_responses')
      .select('*', { count: 'exact', head: true });
    
    if (responseCountError) throw responseCountError;

    const totalRewardsAmount = (allRewards || []).reduce((sum, reward) => sum + reward.amount, 0);
    const paidRewardsAmount = (paidRewardsData || []).reduce((sum, reward) => sum + reward.amount, 0);
    const pendingRewardsAmount = (pendingRewardsData || []).reduce((sum, reward) => sum + reward.amount, 0);

    res.json({
      totalRewards: totalRewardsAmount,
      paidRewards: paidRewardsAmount,
      pendingRewards: pendingRewardsAmount,
      userCount: userCount || 0,
      responseCount: responseCount || 0
    });

  } catch (error) {
    console.error('Get reward stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};