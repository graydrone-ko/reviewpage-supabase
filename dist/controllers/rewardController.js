"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRewardStats = exports.requestWithdrawal = exports.getMyRewards = void 0;
const database_1 = require("../utils/database");
const getMyRewards = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        // 리워드와 해당 시점의 설문 응답 정보를 함께 조회
        const rewards = await database_1.prisma.reward.findMany({
            where: {
                userId: req.user.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        // 사용자의 모든 설문 응답을 가져와서 시간대별로 매칭
        const surveyResponses = await database_1.prisma.surveyResponse.findMany({
            where: {
                consumerId: req.user.id
            },
            include: {
                survey: {
                    select: {
                        title: true,
                        storeName: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        // 리워드와 설문 응답을 시간 기준으로 매칭
        const enrichedRewards = rewards.map(reward => {
            let matchedSurveyResponse = null;
            if (reward.type === 'SURVEY_COMPLETION') {
                // 리워드 생성 시간과 가장 가까운 설문 응답을 찾음 (±5분 이내)
                const rewardTime = reward.createdAt.getTime();
                matchedSurveyResponse = surveyResponses.find(response => {
                    const responseTime = response.createdAt.getTime();
                    const timeDiff = Math.abs(rewardTime - responseTime);
                    return timeDiff <= 5 * 60 * 1000; // 5분 이내
                });
            }
            return {
                ...reward,
                surveyTitle: matchedSurveyResponse?.survey?.title || '설문 정보 없음',
                storeName: matchedSurveyResponse?.survey?.storeName || '-'
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
    }
    catch (error) {
        console.error('Get rewards error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getMyRewards = getMyRewards;
const requestWithdrawal = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const { amount } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'Valid amount is required' });
        }
        // Calculate available balance
        const rewards = await database_1.prisma.reward.findMany({
            where: {
                userId: req.user.id,
                status: 'PENDING'
            }
        });
        const availableBalance = rewards.reduce((sum, reward) => sum + reward.amount, 0);
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
        const withdrawalRequest = await database_1.prisma.withdrawalRequest.create({
            data: {
                userId: req.user.id,
                amount: amount,
                status: 'PENDING'
            }
        });
        console.log(`💰 출금 요청 생성됨: ${req.user.name || 'Unknown'} (${req.user.email}) - ₩${amount.toLocaleString()}`);
        res.json({
            message: '출금 신청이 완료되었습니다. 관리자 승인 후 처리됩니다.',
            amount,
            requestId: withdrawalRequest.id,
            note: '2-3 영업일 내에 관리자가 승인 후 지급됩니다.'
        });
    }
    catch (error) {
        console.error('Withdrawal request error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.requestWithdrawal = requestWithdrawal;
const getRewardStats = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Admin access required' });
        }
        const totalRewards = await database_1.prisma.reward.aggregate({
            _sum: {
                amount: true
            }
        });
        const paidRewards = await database_1.prisma.reward.aggregate({
            where: {
                status: 'PAID'
            },
            _sum: {
                amount: true
            }
        });
        const pendingRewards = await database_1.prisma.reward.aggregate({
            where: {
                status: 'PENDING'
            },
            _sum: {
                amount: true
            }
        });
        const userCount = await database_1.prisma.user.count({
            where: {
                role: 'CONSUMER'
            }
        });
        const responseCount = await database_1.prisma.surveyResponse.count();
        res.json({
            totalRewards: totalRewards._sum.amount || 0,
            paidRewards: paidRewards._sum.amount || 0,
            pendingRewards: pendingRewards._sum.amount || 0,
            userCount,
            responseCount
        });
    }
    catch (error) {
        console.error('Get reward stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getRewardStats = getRewardStats;
//# sourceMappingURL=rewardController.js.map