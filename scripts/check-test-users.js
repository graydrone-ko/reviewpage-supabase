const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function checkTestUsers() {
  try {
    console.log('👥 테스트 사용자 계정 확인...\n');

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: 'test' } },
          { email: { contains: 'consumer' } },
          { name: { contains: '테스트' } },
          { name: { contains: '소비자' } }
        ]
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`발견된 테스트 사용자: ${users.length}명\n`);

    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.role})`);
      console.log(`   이메일: ${user.email}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   가입일: ${user.createdAt.toLocaleDateString('ko-KR')}\n`);
    });

    // 소비자의 리워드 현황도 확인
    const consumerUsers = users.filter(user => user.role === 'CONSUMER');
    
    for (const consumer of consumerUsers) {
      const rewards = await prisma.reward.findMany({
        where: { userId: consumer.id }
      });
      
      const totalEarned = rewards.reduce((sum, reward) => sum + reward.amount, 0);
      const totalPaid = rewards.filter(r => r.status === 'PAID').reduce((sum, reward) => sum + reward.amount, 0);
      const totalPending = totalEarned - totalPaid;
      
      console.log(`💰 ${consumer.name}의 리워드 현황:`);
      console.log(`   총 적립: ₩${totalEarned.toLocaleString()}`);
      console.log(`   출금 완료: ₩${totalPaid.toLocaleString()}`);
      console.log(`   출금 가능: ₩${totalPending.toLocaleString()}`);
      console.log(`   리워드 건수: ${rewards.length}건\n`);
    }

  } catch (error) {
    console.error('❌ 오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTestUsers();