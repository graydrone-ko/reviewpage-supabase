const { PrismaClient } = require('./src/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUsers() {
  try {
    // 판매자 계정 확인 및 생성
    const existingSeller = await prisma.user.findUnique({
      where: { email: 'seller@test.com' }
    });

    if (!existingSeller) {
      const sellerPassword = await bcrypt.hash('password123', 10);
      
      const seller = await prisma.user.create({
        data: {
          email: 'seller@test.com',
          password: sellerPassword,
          name: '판매자 테스트',
          role: 'SELLER',
          gender: 'MALE',
          birthDate: '1985-05-15',
          phoneNumber: '010-1111-2222',
          accountNumber: '123-456-789012',
          bankCode: '004'
        }
      });

      console.log('판매자 계정이 생성되었습니다:');
      console.log('이메일:', seller.email);
      console.log('비밀번호: password123');
    } else {
      console.log('판매자 계정이 이미 존재합니다:', existingSeller.email);
    }

    // 소비자 계정 확인 및 생성
    const existingConsumer = await prisma.user.findUnique({
      where: { email: 'consumer@test.com' }
    });

    if (!existingConsumer) {
      const consumerPassword = await bcrypt.hash('consumer123', 10);
      
      const consumer = await prisma.user.create({
        data: {
          email: 'consumer@test.com',
          password: consumerPassword,
          name: '소비자 테스트',
          role: 'CONSUMER',
          gender: 'FEMALE',
          birthDate: '1992-08-20',
          phoneNumber: '010-3333-4444',
          accountNumber: '987-654-321012',
          bankCode: '020'
        }
      });

      console.log('소비자 계정이 생성되었습니다:');
      console.log('이메일:', consumer.email);
      console.log('비밀번호: consumer123');
    } else {
      console.log('소비자 계정이 이미 존재합니다:', existingConsumer.email);
    }

    // 추가 테스트 소비자 계정들 생성 (설문 응답 테스트용)
    const additionalConsumers = [
      {
        email: 'consumer1@test.com',
        password: 'consumer123',
        name: '소비자1',
        phone: '010-5555-6666'
      },
      {
        email: 'consumer2@test.com',
        password: 'consumer123',
        name: '소비자2',
        phone: '010-7777-8888'
      }
    ];

    for (const consumerData of additionalConsumers) {
      const existing = await prisma.user.findUnique({
        where: { email: consumerData.email }
      });

      if (!existing) {
        const hashedPassword = await bcrypt.hash(consumerData.password, 10);
        
        await prisma.user.create({
          data: {
            email: consumerData.email,
            password: hashedPassword,
            name: consumerData.name,
            role: 'CONSUMER',
            gender: 'MALE',
            birthDate: '1990-01-01',
            phoneNumber: consumerData.phone,
            accountNumber: `${Math.floor(Math.random() * 1000000000000)}`,
            bankCode: '011'
          }
        });

        console.log(`추가 소비자 계정 생성: ${consumerData.email}`);
      }
    }

    console.log('\n=== 테스트 계정 정보 ===');
    console.log('관리자: admin@reviewpage.com / admin123');
    console.log('판매자: seller@test.com / password123');
    console.log('소비자: consumer@test.com / consumer123');
    console.log('추가 소비자1: consumer1@test.com / consumer123');
    console.log('추가 소비자2: consumer2@test.com / consumer123');

  } catch (error) {
    console.error('테스트 사용자 생성 중 오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUsers();