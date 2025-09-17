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

// Dashboard endpoint for admin finance page
router.get('/dashboard', async (req, res) => {
  try {
    // 재무 대시보드 데이터 조회
    // 추후 실제 재무 데이터가 구축되면 수정
    res.json({
      totalRevenue: 0,
      totalRewards: 0,
      pendingPayments: 0,
      monthlyRevenue: 0,
      revenueGrowth: 0,
      transactions: []
    });
  } catch (error) {
    console.error('Finance dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;