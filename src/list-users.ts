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

    console.log(`총 ${users.length}명의 사용자가 있습니다:`);
    console.log('==========================================');
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email})`);
      console.log(`   역할: ${user.role}`);
      console.log(`   생성일: ${user.createdAt.toLocaleString('ko-KR')}`);
      console.log('---');
    });
    
  } catch (error) {
    console.error('사용자 목록 조회 중 오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listUsers();