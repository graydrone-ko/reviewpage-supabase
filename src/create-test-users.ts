import { PrismaClient } from './generated/prisma';
import { hashPassword } from './utils/auth';

const prisma = new PrismaClient();

async function createTestUsers() {
  try {
    // 실제 암호화된 비밀번호 생성
    const hashedPassword = await hashPassword('testpass123');

    // 기존 소비자 업데이트 또는 생성
    const consumer = await prisma.user.upsert({
      where: { email: 'testconsumer@example.com' },
      update: {
        password: hashedPassword,
        name: '테스트 소비자',
        role: 'CONSUMER',
        birthDate: '900115', // 1990년 1월 15일
        gender: 'MALE',
        phoneNumber: '01012345678',
        bankCode: 'KB',
        accountNumber: '123456789012'
      },
      create: {
        email: 'testconsumer@example.com',
        password: hashedPassword,
        name: '테스트 소비자',
        role: 'CONSUMER',
        birthDate: '900115', // 1990년 1월 15일
        gender: 'MALE',
        phoneNumber: '01012345678',
        bankCode: 'KB',
        accountNumber: '123456789012'
      }
    });

    // 기존 판매자 업데이트 또는 생성
    const seller = await prisma.user.upsert({
      where: { email: 'testseller@example.com' },
      update: {
        password: hashedPassword,
        name: '테스트 판매자',
        role: 'SELLER',
        birthDate: '850310', // 1985년 3월 10일
        gender: 'FEMALE',
        phoneNumber: '01087654321',
        bankCode: 'SH',
        accountNumber: '987654321098'
      },
      create: {
        email: 'testseller@example.com',
        password: hashedPassword,
        name: '테스트 판매자',
        role: 'SELLER',
        birthDate: '850310', // 1985년 3월 10일
        gender: 'FEMALE',
        phoneNumber: '01087654321',
        bankCode: 'SH',
        accountNumber: '987654321098'
      }
    });

    // 관리자 계정 암호화된 비밀번호 생성
    const adminHashedPassword = await hashPassword('7300gray');

    // 관리자 계정 생성
    const admin = await prisma.user.upsert({
      where: { email: 'graydrone@naver.com' },
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

    console.log('테스트 계정 생성/업데이트 완료:');
    console.log('소비자:', consumer.email, '/ 비밀번호: testpass123');
    console.log('판매자:', seller.email, '/ 비밀번호: testpass123');
    console.log('관리자:', admin.email, '/ 비밀번호: 7300gray');

  } catch (error) {
    console.error('오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUsers();