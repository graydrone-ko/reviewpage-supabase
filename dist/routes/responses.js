"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const responseController_1 = require("../controllers/responseController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_1.authenticateToken);
// Submit survey response (consumers only)
router.post('/', (0, auth_1.requireRole)(['CONSUMER']), responseController_1.submitResponseValidation, responseController_1.submitResponse);
// Get my responses (consumers only)
router.get('/my', (0, auth_1.requireRole)(['CONSUMER']), responseController_1.getMyResponses);
exports.default = router;
//# sourceMappingURL=responses.js.map