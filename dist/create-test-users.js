"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/generated/prisma");
const auth_1 = require("./utils/auth");
const prisma = new prisma_1.PrismaClient();
async function createTestUsers() {
    try {
        // 관리자 계정 암호화된 비밀번호 생성
        const adminHashedPassword = await (0, auth_1.hashPassword)('7300gray');
        // 관리자 계정 생성/업데이트
        const admin = await prisma.user.upsert({
            where: { email: 'graydorne@naver.com' },
            update: {
                password: adminHashedPassword,
                name: '관리자',
                role: 'ADMIN',
                birthDate: '800101', // 1980년 1월 1일
                gender: 'MALE',
                phoneNumber: '01000000000',
                bankCode: 'KB',
                accountNumber: '000000000000'
            },
            create: {
                email: 'graydrone@naver.com',
                password: adminHashedPassword,
                name: '관리자',
                role: 'ADMIN',
                birthDate: '800101', // 1980년 1월 1일
                gender: 'MALE',
                phoneNumber: '01000000000',
                bankCode: 'KB',
                accountNumber: '000000000000'
            }
        });

        // 판매자 계정 암호화된 비밀번호 생성
        const sellerHashedPassword = await (0, auth_1.hashPassword)('test123');
        // 판매자 계정 생성/업데이트
        const seller = await prisma.user.upsert({
            where: { email: 'seller@test.com' },
            update: {
                password: sellerHashedPassword,
                name: '김판매자',
                role: 'SELLER',
                birthDate: '880523', // 1988년 5월 23일
                gender: 'MALE',
                phoneNumber: '01098765432',
                bankCode: 'NH',
                accountNumber: '352-1234-5678-90'
            },
            create: {
                email: 'seller@test.com',
                password: sellerHashedPassword,
                name: '김판매자',
                role: 'SELLER',
                birthDate: '880523', // 1988년 5월 23일
                gender: 'MALE',
                phoneNumber: '01098765432',
                bankCode: 'NH',
                accountNumber: '352-1234-5678-90'
            }
        });

        // 소비자 계정 암호화된 비밀번호 생성
        const consumerHashedPassword = await (0, auth_1.hashPassword)('test123');
        // 소비자 계정 생성/업데이트
        const consumer = await prisma.user.upsert({
            where: { email: 'cunsumer@test.com' },
            update: {
                password: consumerHashedPassword,
                name: '이설문자',
                role: 'CONSUMER',
                birthDate: '920815', // 1992년 8월 15일
                gender: 'FEMALE',
                phoneNumber: '01055556666',
                bankCode: 'KB',
                accountNumber: '123-456-789012'
            },
            create: {
                email: 'cunsumer@test.com',
                password: consumerHashedPassword,
                name: '이설문자',
                role: 'CONSUMER',
                birthDate: '920815', // 1992년 8월 15일
                gender: 'FEMALE',
                phoneNumber: '01055556666',
                bankCode: 'KB',
                accountNumber: '123-456-789012'
            }
        });

        console.log('계정 생성/업데이트 완료:');
        console.log('관리자:', admin.email, '/ 비밀번호: 7300gray');
        console.log('판매자:', seller.email, '/ 비밀번호: test123');
        console.log('소비자:', consumer.email, '/ 비밀번호: test123');
    }
    catch (error) {
        console.error('오류:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
createTestUsers();
//# sourceMappingURL=create-test-users.js.map