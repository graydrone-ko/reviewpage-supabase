"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./generated/prisma");
const prisma = new prisma_1.PrismaClient();
async function listUsers() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true
            },
            orderBy: { createdAt: 'desc' }
        });
        // 사용자 목록 출력
        users.forEach((user, index) => {
            // 사용자 정보 출력
        });
    }
    catch (error) {
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
listUsers();
//# sourceMappingURL=list-users.js.map