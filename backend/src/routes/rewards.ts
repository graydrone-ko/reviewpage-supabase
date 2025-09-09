import { Router } from 'express';
import { 
  getMyRewards, 
  requestWithdrawal, 
  getRewardStats 
} from '../controllers/rewardController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Get my rewards (consumers only)
router.get('/my', requireRole(['CONSUMER']), getMyRewards);

// Request withdrawal (consumers only)
router.post('/withdraw', requireRole(['CONSUMER']), requestWithdrawal);

// Get reward statistics (admins only)
router.get('/stats', requireRole(['ADMIN']), getRewardStats);

export default router;