const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function createTestUsers() {
  try {
    console.log('👥 테스트 사용자 계정을 생성합니다...\n');

    // 기존 사용자들 확인
    const existingUsers = await prisma.user.findMany({
      select: { email: true, role: true, name: true }
    });
    
    if (existingUsers.length > 0) {
      console.log('📋 기존 사용자 현황:');
      existingUsers.forEach(user => {
        console.log(`   - ${user.name} (${user.email}) - ${user.role}`);
      });
      console.log('');
    }

    // 패스워드 해시화
    const hashedPassword = await bcrypt.hash('password123', 10);

    // 1. 관리자 계정 생성
    console.log('🔧 관리자 계정 생성 중...');
    try {
      const admin = await prisma.user.upsert({
        where: { email: 'admin@reviewpage.com' },
        update: {},
        create: {
          email: 'admin@reviewpage.com',
          password: hashedPassword,
          name: '시스템 관리자',
          role: 'ADMIN',
          gender: 'MALE',
          birthDate: '1990-01-01',
          phoneNumber: '010-0000-0001',
          accountNumber: '123456789001',
          bankCode: '004'
        }
      });
      console.log(`   ✅ 관리자 생성 완료: ${admin.name} (${admin.email})`);
    } catch (error) {
      if (error.code === 'P2002') {
        console.log('   ℹ️ 관리자 계정이 이미 존재합니다.');
      } else {
        throw error;
      }
    }

    // 2. 테스트 판매자 계정 생성
    console.log('\n💼 테스트 판매자 계정 생성 중...');
    try {
      const seller = await prisma.user.upsert({
        where: { email: 'seller@test.com' },
        update: {},
        create: {
          email: 'seller@test.com',
          password: hashedPassword,
          name: '테스트 판매자',
          role: 'SELLER',
          gender: 'FEMALE',
          birthDate: '1985-06-15',
          phoneNumber: '010-1111-1111',
          accountNumber: '987654321001',
          bankCode: '020'
        }
      });
      console.log(`   ✅ 판매자 생성 완료: ${seller.name} (${seller.email})`);
    } catch (error) {
      if (error.code === 'P2002') {
        console.log('   ℹ️ 테스트 판매자 계정이 이미 존재합니다.');
      } else {
        throw error;
      }
    }

    // 3. 테스트 소비자 계정들 생성
    console.log('\n🛒 테스트 소비자 계정들 생성 중...');
    
    const consumers = [
      {
        email: 'consumer1@test.com',
        name: '테스트 소비자1',
        gender: 'MALE',
        birthDate: '1995-03-20',
        phoneNumber: '010-2222-2222',
        accountNumber: '111111111001',
        bankCode: '011'
      },
      {
        email: 'consumer2@test.com',
        name: '테스트 소비자2',
        gender: 'FEMALE',
        birthDate: '1992-08-10',
        phoneNumber: '010-3333-3333',
        accountNumber: '222222222001',
        bankCode: '081'
      },
      {
        email: 'consumer3@test.com',
        name: '테스트 소비자3',
        gender: 'MALE',
        birthDate: '1988-12-05',
        phoneNumber: '010-4444-4444',
        accountNumber: '333333333001',
        bankCode: '088'
      }
    ];

    for (const consumerData of consumers) {
      try {
        const consumer = await prisma.user.upsert({
          where: { email: consumerData.email },
          update: {},
          create: {
            ...consumerData,
            password: hashedPassword,
            role: 'CONSUMER'
          }
        });
        console.log(`   ✅ 소비자 생성 완료: ${consumer.name} (${consumer.email})`);
      } catch (error) {
        if (error.code === 'P2002') {
          console.log(`   ℹ️ ${consumerData.name} 계정이 이미 존재합니다.`);
        } else {
          throw error;
        }
      }
    }

    // 4. 최종 사용자 현황 출력
    console.log('\n📊 최종 사용자 현황:');
    const allUsers = await prisma.user.findMany({
      select: { 
        name: true, 
        email: true, 
        role: true, 
        createdAt: true 
      },
      orderBy: { role: 'asc' }
    });

    const usersByRole = {
      ADMIN: allUsers.filter(u => u.role === 'ADMIN'),
      SELLER: allUsers.filter(u => u.role === 'SELLER'),
      CONSUMER: allUsers.filter(u => u.role === 'CONSUMER')
    };

    Object.entries(usersByRole).forEach(([role, users]) => {
      console.log(`\n${role} (${users.length}명):`);
      users.forEach(user => {
        console.log(`   - ${user.name} (${user.email})`);
      });
    });

    console.log('\n🔑 로그인 정보:');
    console.log('═══════════════════════════════════');
    console.log('모든 계정의 비밀번호: password123');
    console.log('');
    console.log('🔧 관리자: admin@reviewpage.com');
    console.log('💼 판매자: seller@test.com');
    console.log('🛒 소비자: consumer1@test.com, consumer2@test.com, consumer3@test.com');
    console.log('');
    console.log('💡 팁: 로그인 후 각 역할별 기능을 테스트해보세요!');

    return {
      success: true,
      totalUsers: allUsers.length,
      adminCount: usersByRole.ADMIN.length,
      sellerCount: usersByRole.SELLER.length,
      consumerCount: usersByRole.CONSUMER.length
    };

  } catch (error) {
    console.error('❌ 테스트 사용자 생성 실패:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 스크립트 직접 실행
if (require.main === module) {
  createTestUsers();
}

module.exports = { createTestUsers };