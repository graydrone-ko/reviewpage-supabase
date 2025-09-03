import express from 'express';
import { adminAuth } from '../middleware/adminAuth';
import { 
  getDashboardStats, 
  getUsers, 
  updateSurveyStatus, 
  getAllSurveys,
  getPendingSurveys,
  getRewards,
  updateRewardStatus,
  getSurveyResponses,
  getCancellationRequests,
  getCancellationRequestStats,
  processCancellationRequest,
  getRecentCancellationRequests,
  getWithdrawalRequests,
  processWithdrawalRequest,
  getRecentWithdrawalRequests
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
router.get('/surveys', getAllSurveys); // 향상된 기능: 모든 설문 조회
router.get('/surveys/pending', getPendingSurveys); // 기존 기능 유지
router.patch('/surveys/:surveyId/status', updateSurveyStatus);
router.get('/surveys/:surveyId/responses', getSurveyResponses);

// 리워드 관리
router.get('/rewards', getRewards);
router.patch('/rewards/:rewardId/status', updateRewardStatus);

// 중단요청 관리
router.get('/cancellation-requests', getCancellationRequests);
router.get('/cancellation-requests/stats', getCancellationRequestStats);
router.get('/cancellation-requests/recent', getRecentCancellationRequests);
router.patch('/cancellation-requests/:surveyId/process', processCancellationRequest);

// 출금요청 관리
router.get('/withdrawal-requests', getWithdrawalRequests);
router.get('/withdrawal-requests/recent', getRecentWithdrawalRequests);
router.patch('/withdrawal-requests/:id/process', processWithdrawalRequest);

// 재무 관리
router.use('/finance', financeRoutes);

export default router;