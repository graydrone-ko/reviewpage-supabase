const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function debugNetProfit() {
  try {
    console.log('🔍 순수익 계산 디버깅 시작...\n');

    // 1. 모든 SurveyResponse 조회
    console.log('📋 1단계: 모든 설문 응답 조회');
    const allResponses = await prisma.surveyResponse.findMany({
      include: {
        survey: {
          select: {
            id: true,
            title: true,
            reward: true,
            status: true,
            sellerId: true
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

    console.log(`전체 응답 수: ${allResponses.length}건\n`);

    // 2. 응답별 상세 정보
    console.log('📊 2단계: 응답별 상세 분석');
    let totalCommissionDebug = 0;
    
    allResponses.forEach((response, index) => {
      const reward = response.survey.reward;
      const commission = reward * 0.1;
      
      console.log(`\n응답 ${index + 1}:`);
      console.log(`  - 소비자: ${response.consumer.name} (${response.consumer.email})`);
      console.log(`  - 설문: ${response.survey.title}`);
      console.log(`  - 설문 상태: ${response.survey.status}`);
      console.log(`  - 리워드: ₩${reward.toLocaleString()}`);
      console.log(`  - 수수료: ₩${reward} × 10% = ₩${commission.toLocaleString()}`);
      
      // 승인된 설문의 경우에만 수수료 누적
      if (response.survey.status === 'APPROVED') {
        totalCommissionDebug += commission;
        console.log(`  ✅ 승인된 설문 - 수수료 포함`);
      } else {
        console.log(`  ❌ 미승인 설문 - 수수료 제외`);
      }
    });

    console.log(`\n💰 디버그 계산 총 순수익: ₩${totalCommissionDebug.toLocaleString()}\n`);

    // 3. 현재 financeController 로직과 동일한 방식으로 계산
    console.log('🔄 3단계: 현재 financeController 로직 시뮬레이션');
    
    const completedResponses = await prisma.surveyResponse.findMany({
      include: {
        survey: {
          select: {
            reward: true,
            status: true
          }
        }
      }
    });

    let controllerLogicTotal = 0;
    completedResponses.forEach(response => {
      if (response.survey.status === 'APPROVED') {
        const commission = response.survey.reward * 0.1;
        controllerLogicTotal += commission;
      }
    });

    console.log(`Controller 로직 계산 결과: ₩${controllerLogicTotal.toLocaleString()}`);

    // 4. 설문별 그룹핑 분석
    console.log('\n📈 4단계: 설문별 그룹핑 분석');
    const surveyGroups = {};
    
    allResponses.forEach(response => {
      const surveyId = response.survey.id;
      const surveyTitle = response.survey.title;
      const status = response.survey.status;
      const reward = response.survey.reward;
      
      if (!surveyGroups[surveyId]) {
        surveyGroups[surveyId] = {
          title: surveyTitle,
          status: status,
          reward: reward,
          responseCount: 0,
          totalCommission: 0
        };
      }
      
      surveyGroups[surveyId].responseCount += 1;
      if (status === 'APPROVED') {
        surveyGroups[surveyId].totalCommission += reward * 0.1;
      }
    });

    Object.entries(surveyGroups).forEach(([surveyId, group]) => {
      console.log(`\n📄 ${group.title}`);
      console.log(`   상태: ${group.status}`);
      console.log(`   리워드: ₩${group.reward.toLocaleString()}`);
      console.log(`   완료된 응답: ${group.responseCount}건`);
      console.log(`   이 설문의 수수료: ₩${group.totalCommission.toLocaleString()}`);
    });

    // 5. API 호출 결과와 비교
    console.log('\n🔗 5단계: 실제 API 결과 확인');
    
    try {
      const response = await fetch('http://localhost:3001/api/admin/finance/stats?period=all', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZjBwNHE5MTAwMDA4ejl1azJ1ZHg1cnQiLCJlbWFpbCI6ImFkbWluQHJldmlld3BhZ2UuY29tIiwicm9sZSI6IkFETUlOIiwiYmlydGhEYXRlIjoiMTk5MC0wMS0wMSIsImdlbmRlciI6Ik1BTEUiLCJpYXQiOjE3NTY4MDUyNzUsImV4cCI6MTc1NzQxMDA3NX0.a66Mt4xoQUkT-xDaIvDSnt3aC2vPlsaIQ8mKcJOduDE'
        }
      });
      
      if (response.ok) {
        const apiResult = await response.json();
        console.log(`API 결과: ₩${apiResult.netProfit.toLocaleString()}`);
        
        if (apiResult.netProfit !== controllerLogicTotal) {
          console.log('⚠️  API 결과와 시뮬레이션 결과가 다릅니다!');
        } else {
          console.log('✅ API 결과와 시뮬레이션 결과 일치');
        }
      }
    } catch (error) {
      console.log('API 호출 실패:', error.message);
    }

  } catch (error) {
    console.error('❌ 디버깅 오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugNetProfit();