import express from 'express';
import { adminAuth } from '../middleware/adminAuth';
import { 
  getDashboardStats, 
  getUsers, 
  getSurveys,
  approveSurvey,
  rejectSurvey,
  getRewards,
  approveReward,
  getResponses,
  getWithdrawalRequests,
  approveWithdrawal,
  rejectWithdrawal
} from '../controllers/adminController';
import financeRoutes from './finance';

const router = express.Router();

// 모든 admin 라우트에 adminAuth 미들웨어 적용
router.use(adminAuth);

// 대시보드 통계
router.get('/dashboard/stats', getDashboardStats);

// 사용자 관리
router.get('/users', getUsers);

// 설문 관리
router.get('/surveys', getSurveys);
router.patch('/surveys/:surveyId/approve', approveSurvey);
router.patch('/surveys/:surveyId/reject', rejectSurvey);
router.get('/surveys/:surveyId/responses', getResponses);

// 리워드 관리
router.get('/rewards', getRewards);
router.patch('/rewards/:rewardId/approve', approveReward);

// 출금요청 관리
router.get('/withdrawal-requests', getWithdrawalRequests);
router.patch('/withdrawal-requests/:id/approve', approveWithdrawal);
router.patch('/withdrawal-requests/:id/reject', rejectWithdrawal);

// 재무 관리
router.use('/finance', financeRoutes);

export default router;