"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const duplicateCheckController_1 = require("../controllers/duplicateCheckController");
const router = (0, express_1.Router)();
router.post('/register', authController_1.registerValidation, authController_1.register);
router.post('/login', authController_1.loginValidation, authController_1.login);
router.post('/check-duplicate', duplicateCheckController_1.checkDuplicateValidation, duplicateCheckController_1.checkDuplicate);
exports.default = router;
//# sourceMappingURL=auth.js.map