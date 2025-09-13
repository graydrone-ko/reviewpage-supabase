import { Router } from 'express';
import { 
  submitResponse, 
  getMyResponses, 
  submitResponseValidation 
} from '../controllers/responseController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();

// 공개 라우트 (인증 불필요) - 설문 응답 제출
router.post('/', submitResponseValidation, submitResponse);

// 인증이 필요한 라우트
router.use(authenticateToken);

// Get my responses (consumers only)
router.get('/my', requireRole(['CONSUMER']), getMyResponses);

export default router;