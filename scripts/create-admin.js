const { PrismaClient } = require('./src/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // 기존 관리자 계정 확인
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      console.log('관리자 계정이 이미 존재합니다:', existingAdmin.email);
      return;
    }

    // 관리자 계정 생성
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@reviewpage.com',
        password: hashedPassword,
        name: '관리자',
        role: 'ADMIN',
        gender: 'MALE',
        birthDate: '1990-01-01',
        phoneNumber: '010-0000-0000',
        accountNumber: '000000000000',
        bankCode: '001'
      }
    });

    console.log('관리자 계정이 생성되었습니다:');
    console.log('이메일:', admin.email);
    console.log('비밀번호: admin123');

  } catch (error) {
    console.error('관리자 계정 생성 중 오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();