"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const financeController_1 = require("../controllers/financeController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// All routes require admin authentication
router.use(auth_1.authenticateToken);
router.use((0, auth_1.requireRole)(['ADMIN']));
// Finance statistics
router.get('/stats', financeController_1.getFinanceStats);
// Unified transaction records
router.get('/transactions', financeController_1.getTransactions);
// Legacy payment records (for backwards compatibility)
router.get('/payments', financeController_1.getPayments);
// Legacy withdrawal records (for backwards compatibility)
router.get('/withdrawals', financeController_1.getWithdrawals);
// Withdrawal management
router.post('/withdrawal/approve', financeController_1.approveWithdrawal);
router.post('/withdrawal/reject', financeController_1.rejectWithdrawal);
// Export data
router.get('/export', financeController_1.exportFinanceData);
exports.default = router;
//# sourceMappingURL=finance.js.map