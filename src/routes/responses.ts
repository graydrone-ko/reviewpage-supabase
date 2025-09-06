import { Router } from 'express';
import { 
  submitResponse, 
  getMyResponses, 
  submitResponseValidation 
} from '../controllers/responseController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Submit survey response (consumers only)
router.post('/', requireRole(['CONSUMER']), submitResponseValidation, submitResponse);

// Get my responses (consumers only)
router.get('/my', requireRole(['CONSUMER']), getMyResponses);

export default router;