import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function checkDuplicatePhones() {
  try {
    // 중복된 전화번호 찾기
    const duplicates = await prisma.$queryRaw`
      SELECT "phoneNumber", COUNT(*) as count
      FROM "users" 
      WHERE "phoneNumber" IS NOT NULL 
      GROUP BY "phoneNumber" 
      HAVING COUNT(*) > 1
    `;

    console.log('중복된 전화번호 검사 결과:');
    console.log('===========================');
    
    if (Array.isArray(duplicates) && duplicates.length > 0) {
      console.log(`⚠️  중복된 전화번호 ${duplicates.length}개 발견:`);
      duplicates.forEach((item: any) => {
        console.log(`  - ${item.phoneNumber}: ${item.count}명 사용 중`);
      });
      
      // 중복된 전화번호의 사용자들 상세 조회
      for (const duplicate of duplicates as any[]) {
        const users = await prisma.user.findMany({
          where: { phoneNumber: duplicate.phoneNumber },
          select: { 
            id: true, 
            email: true, 
            name: true, 
            phoneNumber: true,
            createdAt: true 
          }
        });
        
        console.log(`\n📞 전화번호 ${duplicate.phoneNumber} 사용자들:`);
        users.forEach((user, index) => {
          console.log(`  ${index + 1}. ${user.name} (${user.email}) - 가입일: ${user.createdAt.toLocaleDateString('ko-KR')}`);
        });
      }
    } else {
      console.log('✅ 중복된 전화번호가 없습니다.');
    }

  } catch (error) {
    console.error('중복 전화번호 검사 중 오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDuplicatePhones();