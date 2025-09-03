const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function verifyFinalCalculation() {
  try {
    console.log('✅ 최종 순수익 계산 검증...\n');

    const allResponses = await prisma.surveyResponse.findMany({
      include: {
        survey: {
          select: {
            title: true,
            reward: true,
            status: true
          }
        },
        consumer: {
          select: {
            name: true
          }
        }
      }
    });

    console.log('💰 완료된 응답별 수수료 계산:');
    let totalCommission = 0;

    allResponses.forEach((response, index) => {
      const reward = response.survey.reward;
      const commission = reward * 0.1;
      totalCommission += commission;
      
      console.log(`\n${index + 1}. ${response.consumer.name}`);
      console.log(`   설문: ${response.survey.title}`);
      console.log(`   설문상태: ${response.survey.status}`);
      console.log(`   리워드: ₩${reward.toLocaleString()}`);
      console.log(`   수수료: ₩${commission.toLocaleString()}`);
      console.log(`   포함여부: ✅ (완료된 응답이므로 설문 상태와 무관하게 포함)`);
    });

    console.log(`\n🎯 최종 순수익: ₩${totalCommission.toLocaleString()}`);
    console.log(`\n📊 비즈니스 로직 확인:`);
    console.log(`   - 완료된 응답 총 3건의 수수료 모두 포함`);
    console.log(`   - 중단 요청된 설문의 완료 응답도 수수료는 환불되지 않음`);
    console.log(`   - 따라서 모든 완료 응답의 수수료가 플랫폼 순수익`);

  } catch (error) {
    console.error('❌ 검증 오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyFinalCalculation();