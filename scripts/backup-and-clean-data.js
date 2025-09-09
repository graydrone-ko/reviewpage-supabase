const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function backupAndCleanData() {
  try {
    console.log('🔄 배포 전 데이터 정리 시작...\n');

    // 1. 현재 데이터 현황 확인
    console.log('📊 현재 데이터 현황 확인:');
    
    const userCount = await prisma.user.count();
    const surveyCount = await prisma.survey.count();
    const responseCount = await prisma.surveyResponse.count();
    const rewardCount = await prisma.reward.count();
    const withdrawalCount = await prisma.withdrawalRequest.count();
    const templateCount = await prisma.surveyTemplate.count();
    
    console.log(`   👥 사용자: ${userCount}명`);
    console.log(`   📝 설문: ${surveyCount}개`);
    console.log(`   📋 응답: ${responseCount}개`);
    console.log(`   💰 리워드: ${rewardCount}개`);
    console.log(`   🏦 출금요청: ${withdrawalCount}개`);
    console.log(`   📄 템플릿: ${templateCount}개\n`);

    // 2. 보존할 사용자 확인
    const preserveUsers = await prisma.user.findMany({
      where: {
        OR: [
          { email: 'graydrone@naver.com' },
          { email: 'testseller@example.com' },
          { email: 'testconsumer@example.com' }
        ]
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });

    console.log('🔒 보존할 사용자 계정:');
    preserveUsers.forEach(user => {
      console.log(`   ✅ ${user.name} (${user.email}) - ${user.role}`);
    });
    console.log();

    if (preserveUsers.length !== 3) {
      console.log('⚠️  경고: 예상 사용자 계정이 누락되었습니다.');
      return;
    }

    // 3. 보존할 사용자 ID 배열
    const preserveUserIds = preserveUsers.map(user => user.id);

    // 4. 삭제할 데이터 확인
    console.log('🗑️  삭제 예정 데이터:');
    
    const surveysToDelete = await prisma.survey.count();
    const responsesToDelete = await prisma.surveyResponse.count();
    const rewardsToDelete = await prisma.reward.count();
    const withdrawalsToDelete = await prisma.withdrawalRequest.count();
    const cancellationsToDelete = await prisma.survey.count({
      where: {
        cancellationRequestedAt: { not: null }
      }
    });

    console.log(`   📝 삭제할 설문: ${surveysToDelete}개`);
    console.log(`   📋 삭제할 응답: ${responsesToDelete}개`);
    console.log(`   💰 삭제할 리워드: ${rewardsToDelete}개`);
    console.log(`   🏦 삭제할 출금요청: ${withdrawalsToDelete}개`);
    console.log(`   ❌ 삭제할 중단요청: ${cancellationsToDelete}개\n`);

    // 사용자 확인 대기
    console.log('⚠️  위 데이터를 모두 삭제하시겠습니까?');
    console.log('계속하려면 이 스크립트를 다시 실행하면서 CONFIRM=true 환경변수를 설정하세요.');
    console.log('예: CONFIRM=true node scripts/backup-and-clean-data.js\n');

    if (process.env.CONFIRM !== 'true') {
      console.log('🛑 안전을 위해 작업을 중단합니다. 확인 후 다시 실행하세요.');
      return;
    }

    console.log('🚀 데이터 정리 시작...\n');

    // 5. 안전한 순서로 데이터 삭제
    console.log('1️⃣ Survey Response 삭제 중...');
    const deletedResponses = await prisma.surveyResponse.deleteMany({});
    console.log(`   ✅ ${deletedResponses.count}개 응답 삭제 완료`);

    console.log('2️⃣ Survey 삭제 중...');
    const deletedSurveys = await prisma.survey.deleteMany({});
    console.log(`   ✅ ${deletedSurveys.count}개 설문 삭제 완료`);

    console.log('3️⃣ Withdrawal Request 삭제 중...');
    const deletedWithdrawals = await prisma.withdrawalRequest.deleteMany({});
    console.log(`   ✅ ${deletedWithdrawals.count}개 출금요청 삭제 완료`);

    console.log('4️⃣ Reward 삭제 중...');
    const deletedRewards = await prisma.reward.deleteMany({});
    console.log(`   ✅ ${deletedRewards.count}개 리워드 삭제 완료`);

    // 6. 최종 상태 확인
    console.log('\n📊 정리 후 데이터 현황:');
    
    const finalUserCount = await prisma.user.count();
    const finalSurveyCount = await prisma.survey.count();
    const finalResponseCount = await prisma.surveyResponse.count();
    const finalRewardCount = await prisma.reward.count();
    const finalWithdrawalCount = await prisma.withdrawalRequest.count();
    const finalTemplateCount = await prisma.surveyTemplate.count();
    
    console.log(`   👥 사용자: ${finalUserCount}명 (보존됨)`);
    console.log(`   📝 설문: ${finalSurveyCount}개 (초기화됨)`);
    console.log(`   📋 응답: ${finalResponseCount}개 (초기화됨)`);
    console.log(`   💰 리워드: ${finalRewardCount}개 (초기화됨)`);
    console.log(`   🏦 출금요청: ${finalWithdrawalCount}개 (초기화됨)`);
    console.log(`   📄 템플릿: ${finalTemplateCount}개 (보존됨)\n`);

    // 7. 보존된 사용자 재확인
    console.log('🔒 보존된 사용자 계정:');
    const finalUsers = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        role: true
      },
      orderBy: { email: 'asc' }
    });

    finalUsers.forEach(user => {
      console.log(`   ✅ ${user.name} (${user.email}) - ${user.role}`);
    });

    console.log('\n🎉 데이터 정리 완료! 배포 준비 상태입니다.');
    console.log('🚀 이제 Railway에 안전하게 배포할 수 있습니다.\n');

    // 8. 다음 단계 안내
    console.log('📋 배포 전 체크리스트:');
    console.log('   □ 환경변수 프로덕션 설정 확인');
    console.log('   □ CORS 설정 프로덕션 도메인 확인');
    console.log('   □ JWT_SECRET 프로덕션용 교체');
    console.log('   □ Railway 배포 실행');
    console.log('   □ 배포 후 기본 기능 테스트');

  } catch (error) {
    console.error('❌ 오류 발생:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 스크립트 실행 조건 확인
if (require.main === module) {
  backupAndCleanData();
}

module.exports = { backupAndCleanData };