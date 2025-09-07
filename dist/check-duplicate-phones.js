"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./generated/prisma");
const prisma = new prisma_1.PrismaClient();
async function checkDuplicatePhones() {
    try {
        // 중복된 전화번호 찾기
        const duplicates = await prisma.$queryRaw `
      SELECT "phoneNumber", COUNT(*) as count
      FROM "users" 
      WHERE "phoneNumber" IS NOT NULL 
      GROUP BY "phoneNumber" 
      HAVING COUNT(*) > 1
    `;
        // 중복된 전화번호 검사
        if (Array.isArray(duplicates) && duplicates.length > 0) {
            // 중복 전화번호 발견
            duplicates.forEach((item) => {
                // 중복 전화번호 정보
            });
            // 중복된 전화번호의 사용자들 상세 조회
            for (const duplicate of duplicates) {
                const users = await prisma.user.findMany({
                    where: { phoneNumber: duplicate.phoneNumber },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        phoneNumber: true,
                        createdAt: true
                    }
                });
                // 중복 전화번호 사용자 정보 출력
            }
        }
        else {
            // 중복 전화번호 없음
        }
    }
    catch (error) {
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
checkDuplicatePhones();
//# sourceMappingURL=check-duplicate-phones.js.map