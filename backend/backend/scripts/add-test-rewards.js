const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function addTestRewards() {
  try {
    console.log('💰 테스트 소비자에게 리워드 추가 중...\n');

    // 테스트 소비자 계정 찾기
    const testConsumer = await prisma.user.findFirst({
      where: {
        email: 'testconsumer@example.com',
        role: 'CONSUMER'
      }
    });

    if (!testConsumer) {
      console.log('❌ 테스트 소비자 계정을 찾을 수 없습니다.');
      return;
    }

    console.log(`👤 테스트 소비자: ${testConsumer.name} (${testConsumer.email})`);

    // 현재 리워드 상황 확인
    const currentRewards = await prisma.reward.findMany({
      where: { userId: testConsumer.id }
    });

    const currentTotal = currentRewards.reduce((sum, reward) => sum + reward.amount, 0);
    console.log(`📊 현재 총 적립: ₩${currentTotal.toLocaleString()}`);

    // 10,000원 이상이 되도록 추가 리워드 생성
    const targetAmount = 15000; // 15,000원 목표
    const neededAmount = Math.max(0, targetAmount - currentTotal);

    if (neededAmount > 0) {
      // 여러 개의 리워드로 나눠서 추가 (현실적으로 보이게)
      const rewardsToAdd = [
        { amount: 1000, type: 'SURVEY_COMPLETION' },
        { amount: 1000, type: 'SURVEY_COMPLETION' },
        { amount: 2000, type: 'SURVEY_COMPLETION' },
        { amount: 1500, type: 'SURVEY_COMPLETION' },
        { amount: 1000, type: 'SURVEY_COMPLETION' },
        { amount: 1500, type: 'SURVEY_COMPLETION' },
        { amount: 1000, type: 'BONUS' },
        { amount: 3000, type: 'SURVEY_COMPLETION' }
      ];

      let addedAmount = 0;
      for (const rewardData of rewardsToAdd) {
        if (addedAmount >= neededAmount) break;

        await prisma.reward.create({
          data: {
            userId: testConsumer.id,
            amount: rewardData.amount,
            type: rewardData.type,
            status: 'EARNED'
          }
        });

        addedAmount += rewardData.amount;
        console.log(`✅ ${rewardData.type === 'SURVEY_COMPLETION' ? '설문 참여' : '보너스'} 리워드 ₩${rewardData.amount.toLocaleString()} 추가`);
      }

      console.log(`\n💵 총 ₩${addedAmount.toLocaleString()} 리워드 추가됨`);
    }

    // 최종 결과 확인
    const finalRewards = await prisma.reward.findMany({
      where: { userId: testConsumer.id }
    });

    const finalTotal = finalRewards.reduce((sum, reward) => sum + reward.amount, 0);
    const finalAccrued = finalRewards
      .filter(r => r.status === 'EARNED')
      .reduce((sum, reward) => sum + reward.amount, 0);

    console.log(`\n📈 최종 결과:`);
    console.log(`   총 적립: ₩${finalTotal.toLocaleString()}`);
    console.log(`   출금 가능: ₩${finalAccrued.toLocaleString()}`);
    console.log(`   리워드 건수: ${finalRewards.length}건`);
    
    if (finalAccrued >= 10000) {
      console.log(`\n✅ 출금 테스트 가능 (최소 ₩10,000 이상 보유)`);
    } else {
      console.log(`\n⚠️  출금 테스트 불가 (₩10,000 미만)`);
    }

  } catch (error) {
    console.error('❌ 오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addTestRewards();
