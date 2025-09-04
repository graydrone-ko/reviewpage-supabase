"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDuplicate = exports.checkDuplicateValidation = void 0;
const express_validator_1 = require("express-validator");
const database_1 = require("../utils/database");
exports.checkDuplicateValidation = [
    (0, express_validator_1.body)('type').isIn(['email', 'phone']).withMessage('검사 타입은 email 또는 phone이어야 합니다'),
    (0, express_validator_1.body)('value').notEmpty().withMessage('검사할 값이 필요합니다')
];
const checkDuplicate = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { type, value } = req.body;
        let existingUser = null;
        let normalizedValue = value;
        switch (type) {
            case 'email':
                existingUser = await database_1.prisma.user.findUnique({
                    where: { email: value }
                });
                break;
            case 'phone':
                // 전화번호 정규화 (하이픈 제거)
                normalizedValue = value.replace(/\D/g, '');
                // 11자리 한국 휴대폰 번호 검증
                if (!/^010\d{8}$/.test(normalizedValue)) {
                    return res.status(400).json({
                        error: '올바른 휴대폰 번호 형식이 아닙니다 (010-XXXX-XXXX)'
                    });
                }
                existingUser = await database_1.prisma.user.findUnique({
                    where: { phoneNumber: normalizedValue }
                });
                break;
            default:
                return res.status(400).json({
                    error: '잘못된 검사 타입입니다'
                });
        }
        const exists = !!existingUser;
        const fieldName = type === 'email' ? '이메일' : '전화번호';
        res.json({
            exists,
            message: exists
                ? `이미 사용 중인 ${fieldName}입니다`
                : `사용 가능한 ${fieldName}입니다`,
            value: type === 'phone' ? normalizedValue : value
        });
    }
    catch (error) {
        console.error('중복 검사 오류:', error);
        res.status(500).json({
            error: '중복 검사 중 오류가 발생했습니다'
        });
    }
};
exports.checkDuplicate = checkDuplicate;
//# sourceMappingURL=duplicateCheckController.js.map