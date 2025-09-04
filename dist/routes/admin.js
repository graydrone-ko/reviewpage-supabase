"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuth_1 = require("../middleware/adminAuth");
const adminController_1 = require("../controllers/adminController");
const finance_1 = __importDefault(require("./finance"));
const router = express_1.default.Router();
// 모든 admin 라우트에 adminAuth 미들웨어 적용
router.use(adminAuth_1.adminAuth);
// 대시보드 통계
router.get('/dashboard/stats', adminController_1.getDashboardStats);
// 사용자 관리
router.get('/users', adminController_1.getUsers);
// 설문 관리
router.get('/surveys', adminController_1.getAllSurveys); // 향상된 기능: 모든 설문 조회
router.get('/surveys/pending', adminController_1.getPendingSurveys); // 기존 기능 유지
router.patch('/surveys/:surveyId/status', adminController_1.updateSurveyStatus);
router.get('/surveys/:surveyId/responses', adminController_1.getSurveyResponses);
// 리워드 관리
router.get('/rewards', adminController_1.getRewards);
router.patch('/rewards/:rewardId/status', adminController_1.updateRewardStatus);
// 중단요청 관리
router.get('/cancellation-requests', adminController_1.getCancellationRequests);
router.get('/cancellation-requests/stats', adminController_1.getCancellationRequestStats);
router.get('/cancellation-requests/recent', adminController_1.getRecentCancellationRequests);
router.patch('/cancellation-requests/:surveyId/process', adminController_1.processCancellationRequest);
// 출금요청 관리
router.get('/withdrawal-requests', adminController_1.getWithdrawalRequests);
router.get('/withdrawal-requests/recent', adminController_1.getRecentWithdrawalRequests);
router.patch('/withdrawal-requests/:id/process', adminController_1.processWithdrawalRequest);
// 재무 관리
router.use('/finance', finance_1.default);
exports.default = router;
//# sourceMappingURL=admin.js.map