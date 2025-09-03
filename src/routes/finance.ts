import { Router } from 'express';
import { 
  getFinanceStats, 
  getPayments, 
  getWithdrawals, 
  getTransactions,
  approveWithdrawal,
  rejectWithdrawal,
  exportFinanceData
} from '../controllers/financeController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();

// All routes require admin authentication
router.use(authenticateToken);
router.use(requireRole(['ADMIN']));

// Finance statistics
router.get('/stats', getFinanceStats);

// Unified transaction records
router.get('/transactions', getTransactions);

// Legacy payment records (for backwards compatibility)
router.get('/payments', getPayments);

// Legacy withdrawal records (for backwards compatibility)
router.get('/withdrawals', getWithdrawals);

// Withdrawal management
router.post('/withdrawal/approve', approveWithdrawal);
router.post('/withdrawal/reject', rejectWithdrawal);

// Export data
router.get('/export', exportFinanceData);

export default router;