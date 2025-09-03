const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetTestUserPassword() {
  try {
    console.log('🔐 테스트 사용자 비밀번호 재설정 중...\n');

    const testPassword = 'test123';
    const hashedPassword = await bcrypt.hash(testPassword, 12);

    // 테스트 소비자 비밀번호 재설정
    const updatedUser = await prisma.user.update({
      where: {
        email: 'testconsumer@example.com'
      },
      data: {
        password: hashedPassword
      }
    });

    console.log(`✅ ${updatedUser.name}의 비밀번호가 '${testPassword}'로 재설정되었습니다.`);
    console.log(`📧 이메일: ${updatedUser.email}`);
    console.log(`🔑 새 비밀번호: ${testPassword}`);

  } catch (error) {
    console.error('❌ 오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetTestUserPassword();