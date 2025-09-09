"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rewardController_1 = require("../controllers/rewardController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_1.authenticateToken);
// Get my rewards (consumers only)
router.get('/my', (0, auth_1.requireRole)(['CONSUMER']), rewardController_1.getMyRewards);
// Request withdrawal (consumers only)
router.post('/withdraw', (0, auth_1.requireRole)(['CONSUMER']), rewardController_1.requestWithdrawal);
// Get reward statistics (admins only)
router.get('/stats', (0, auth_1.requireRole)(['ADMIN']), rewardController_1.getRewardStats);
exports.default = router;
//# sourceMappingURL=rewards.js.map