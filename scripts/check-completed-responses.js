const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function checkCompletedResponses() {
  try {
    console.log('📊 완료된 설문 응답 현황 확인...\n');

    // 모든 설문 응답 조회
    const allResponses = await prisma.surveyResponse.findMany({
      include: {
        survey: {
          select: {
            id: true,
            title: true,
            reward: true,
            status: true
          }
        },
        consumer: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`🔍 전체 설문 응답: ${allResponses.length}건\n`);

    // 승인된 설문의 응답만 필터링
    const approvedSurveyResponses = allResponses.filter(response => 
      response.survey.status === 'APPROVED'
    );

    console.log(`✅ 승인된 설문의 응답: ${approvedSurveyResponses.length}건\n`);

    // 설문별 응답 수 및 수수료 계산
    const surveyStats = {};
    let totalCommission = 0;

    approvedSurveyResponses.forEach(response => {
      const surveyId = response.survey.id;
      const reward = response.survey.reward;
      const commission = reward * 0.1;

      if (!surveyStats[surveyId]) {
        surveyStats[surveyId] = {
          title: response.survey.title,
          reward: reward,
          responses: 0,
          totalCommission: 0
        };
      }

      surveyStats[surveyId].responses += 1;
      surveyStats[surveyId].totalCommission += commission;
      totalCommission += commission;
    });

    console.log('📋 설문별 상세 정보:');
    Object.entries(surveyStats).forEach(([surveyId, stats]) => {
      console.log(`\n📄 ${stats.title}`);
      console.log(`   - 설문 ID: ${surveyId}`);
      console.log(`   - 개당 리워드: ₩${stats.reward.toLocaleString()}`);
      console.log(`   - 완료된 응답: ${stats.responses}건`);
      console.log(`   - 이 설문의 총 수수료: ₩${stats.totalCommission.toLocaleString()}`);
    });

    console.log(`\n💰 총 순수익(수수료): ₩${totalCommission.toLocaleString()}`);

    // 계산 검증
    console.log('\n🔍 계산 검증:');
    approvedSurveyResponses.forEach(response => {
      console.log(`   - ${response.consumer.name}: ₩${response.survey.reward} × 10% = ₩${response.survey.reward * 0.1}`);
    });

  } catch (error) {
    console.error('❌ 오류 발생:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCompletedResponses();