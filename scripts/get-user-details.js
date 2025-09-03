const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function getUserDetails() {
  try {
    console.log('👤 사용자 상세 정보 확인...\n');

    const user = await prisma.user.findFirst({
      where: {
        email: 'testconsumer@example.com'
      }
    });

    if (!user) {
      console.log('❌ 사용자를 찾을 수 없습니다.');
      return;
    }

    console.log('📋 사용자 정보:');
    console.log(`   이름: ${user.name}`);
    console.log(`   이메일: ${user.email}`);
    console.log(`   역할: ${user.role}`);
    console.log(`   ID: ${user.id}`);
    console.log(`   가입일: ${user.createdAt}`);
    console.log(`   비밀번호 해시: ${user.password.substring(0, 20)}...`);

    // 일반적인 테스트 비밀번호들로 시도해보기
    const testPasswords = ['password123', 'test123', 'consumer123', '123456', 'password'];
    
    console.log('\n🔐 비밀번호 테스트 중...');
    for (const testPassword of testPasswords) {
      const isValid = await bcrypt.compare(testPassword, user.password);
      if (isValid) {
        console.log(`✅ 올바른 비밀번호: ${testPassword}`);
        return testPassword;
      }
    }
    
    console.log('❌ 테스트 비밀번호 중 일치하는 것이 없습니다.');

  } catch (error) {
    console.error('❌ 오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

getUserDetails();