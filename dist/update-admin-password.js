"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/generated/prisma");
const auth_1 = require("./utils/auth");

const prisma = new prisma_1.PrismaClient();

async function updateAdminPassword() {
    try {
        // 관리자 계정 비밀번호 업데이트
        const adminHashedPassword = await (0, auth_1.hashPassword)('7300gray');
        
        const admin = await prisma.user.update({
            where: { email: 'graydrone@naver.com' },
            data: {
                password: adminHashedPassword,
                role: 'ADMIN'
            }
        });

        console.log('관리자 계정 비밀번호 업데이트 완료:');
        console.log('이메일:', admin.email);
        console.log('역할:', admin.role);
        console.log('새 비밀번호: 7300gray');
    }
    catch (error) {
        console.error('오류:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}

updateAdminPassword();