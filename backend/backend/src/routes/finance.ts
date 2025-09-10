import { Router } from 'express';
import { 
  getSellerTransactions,
  getConsumerTransactions,
  getSellerBalance,
  getConsumerBalance,
  getAllTransactions
} from '../controllers/financeController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();

// All routes require admin authentication
router.use(authenticateToken);
router.use(requireRole(['ADMIN']));

// Transaction records
router.get('/transactions', getAllTransactions);
router.get('/seller-transactions', getSellerTransactions);
router.get('/consumer-transactions', getConsumerTransactions);

// Balance information
router.get('/seller-balance', getSellerBalance);
router.get('/consumer-balance', getConsumerBalance);

export default router;