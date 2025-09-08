import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function updateMissingNames() {
  try {
    // 모든 사용자를 가져와서 이름이 없거나 빈 문자열인 사용자들 필터링
    const allUsers = await prisma.user.findMany();
    
    const usersWithoutNames = allUsers.filter(user => 
      !user.name || user.name.trim() === ''
    );

    // 이름이 없는 사용자 수만큼 반복

    // 각 사용자에게 기본 이름 설정
    for (const user of usersWithoutNames) {
      let defaultName = '사용자';
      
      // 역할에 따라 기본 이름 설정
      if (user.role === 'ADMIN') {
        defaultName = '관리자';
      } else if (user.role === 'SELLER') {
        defaultName = '판매자';
      } else if (user.role === 'CONSUMER') {
        defaultName = '소비자';
      }

      // 이메일의 @ 앞부분을 이름으로 사용하거나 기본값 사용
      const emailPrefix = user.email.split('@')[0];
      const finalName = emailPrefix.length > 2 ? emailPrefix : defaultName;

      await prisma.user.update({
        where: { id: user.id },
        data: { 
          name: finalName
        }
      });

      // 사용자 이름 업데이트 완료
    }

    // 모든 사용자 이름 업데이트 완료
    
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

updateMissingNames();