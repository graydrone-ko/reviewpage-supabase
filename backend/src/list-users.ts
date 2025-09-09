import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

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
    
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

listUsers();