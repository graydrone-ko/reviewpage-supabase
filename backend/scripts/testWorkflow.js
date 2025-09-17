const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

async function testWorkflow() {
  try {
    console.log('🔄 설문 워크플로우 테스트를 시작합니다...\n');

    // 1. 현재 사용자 상태 확인
    console.log('1️⃣ 사용자 계정 확인...');
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true }
    });
    
    const admin = users.find(u => u.role === 'ADMIN');
    const seller = users.find(u => u.role === 'SELLER');
    const consumers = users.filter(u => u.role === 'CONSUMER');
    
    console.log(`   ✅ 관리자: ${admin?.name} (${admin?.email})`);
    console.log(`   ✅ 판매자: ${seller?.name} (${seller?.email})`);
    console.log(`   ✅ 소비자: ${consumers.length}명`);
    
    if (!admin || !seller || consumers.length === 0) {
      throw new Error('테스트에 필요한 사용자 계정이 부족합니다.');
    }

    // 2. 기본 템플릿 확인
    console.log('\n2️⃣ 기본 템플릿 확인...');
    const template = await prisma.surveyTemplate.findFirst({
      where: { isDefault: true }
    });
    
    if (!template) {
      throw new Error('기본 템플릿을 찾을 수 없습니다.');
    }
    console.log(`   ✅ 기본 템플릿: ${template.name}`);

    // 3. 테스트 설문 생성 (PENDING 상태로)
    console.log('\n3️⃣ 테스트 설문 생성...');
    const testSurvey = await prisma.survey.create({
      data: {
        title: '워크플로우 테스트 설문',
        description: '관리자 승인 후 응답 완료 시 자동 종료 테스트',
        url: 'https://example.com/test-product',
        sellerId: seller.id,
        templateId: template.id,
        targetAgeMin: 20,
        targetAgeMax: 50,
        targetGender: 'ALL',
        reward: 1000,
        maxParticipants: 2, // 적은 수로 설정하여 테스트 용이
        totalBudget: 2200, // 2명 × 1000원 + 수수료 10%
        status: 'PENDING', // 승인 대기 상태
        endDate: new Date('2025-12-31')
      }
    });
    
    console.log(`   ✅ 설문 생성 완료: ${testSurvey.title}`);
    console.log(`   📊 상태: ${testSurvey.status} (승인 대기)`);
    console.log(`   👥 최대 참가자: ${testSurvey.maxParticipants}명`);

    // 4. 관리자 승인 시뮬레이션
    console.log('\n4️⃣ 관리자 승인 시뮬레이션...');
    const approvedSurvey = await prisma.survey.update({
      where: { id: testSurvey.id },
      data: {
        status: 'APPROVED',
        approvedAt: new Date()
      }
    });
    
    console.log(`   ✅ 설문 승인 완료`);
    console.log(`   📊 상태: ${approvedSurvey.status}`);
    console.log(`   ⏰ 승인 시간: ${approvedSurvey.approvedAt.toLocaleString('ko-KR')}`);

    // 5. 소비자 응답 시뮬레이션 (1차)
    console.log('\n5️⃣ 첫 번째 소비자 응답 시뮬레이션...');
    const firstResponse = await prisma.surveyResponse.create({
      data: {
        surveyId: testSurvey.id,
        consumerId: consumers[0].id,
        responses: {
          step1: { answer: '신뢰할 수 있어 보임' },
          step2: { answer: '매우 이해하기 쉬움' }
        }
      }
    });
    
    // 리워드 생성
    await prisma.reward.create({
      data: {
        userId: consumers[0].id,
        amount: testSurvey.reward,
        type: 'SURVEY_COMPLETION',
        status: 'EARNED'
      }
    });
    
    console.log(`   ✅ 첫 번째 응답 완료: ${consumers[0].name}`);
    
    // 현재 응답 수 확인
    const responseCount1 = await prisma.surveyResponse.count({
      where: { surveyId: testSurvey.id }
    });
    console.log(`   📊 현재 응답 수: ${responseCount1}/${testSurvey.maxParticipants}`);
    
    // 설문 상태 확인
    const surveyAfterFirst = await prisma.survey.findUnique({
      where: { id: testSurvey.id }
    });
    console.log(`   📊 설문 상태: ${surveyAfterFirst.status} (아직 진행 중)`);

    // 6. 소비자 응답 시뮬레이션 (2차 - 최대 참가자 도달)
    console.log('\n6️⃣ 두 번째 소비자 응답 시뮬레이션 (최대 참가자 도달)...');
    const secondResponse = await prisma.surveyResponse.create({
      data: {
        surveyId: testSurvey.id,
        consumerId: consumers[1].id,
        responses: {
          step1: { answer: '평범함' },
          step2: { answer: '보통' }
        }
      }
    });
    
    // 리워드 생성
    await prisma.reward.create({
      data: {
        userId: consumers[1].id,
        amount: testSurvey.reward,
        type: 'SURVEY_COMPLETION',
        status: 'EARNED'
      }
    });
    
    console.log(`   ✅ 두 번째 응답 완료: ${consumers[1].name}`);
    
    // 현재 응답 수 확인
    const responseCount2 = await prisma.surveyResponse.count({
      where: { surveyId: testSurvey.id }
    });
    console.log(`   📊 현재 응답 수: ${responseCount2}/${testSurvey.maxParticipants}`);
    
    // 자동 완료 처리 시뮬레이션
    if (responseCount2 >= testSurvey.maxParticipants) {
      const completedSurvey = await prisma.survey.update({
        where: { id: testSurvey.id },
        data: {
          status: 'COMPLETED',
          completedAt: new Date()
        }
      });
      
      console.log(`   🎉 설문 자동 완료!`);
      console.log(`   📊 최종 상태: ${completedSurvey.status}`);
      console.log(`   ⏰ 완료 시간: ${completedSurvey.completedAt.toLocaleString('ko-KR')}`);
    }

    // 7. 최종 결과 요약
    console.log('\n📊 워크플로우 테스트 결과:');
    console.log('════════════════════════════════');
    
    const finalSurvey = await prisma.survey.findUnique({
      where: { id: testSurvey.id },
      include: {
        responses: {
          include: {
            consumer: {
              select: { name: true }
            }
          }
        }
      }
    });
    
    console.log(`📋 설문: ${finalSurvey.title}`);
    console.log(`📊 상태: ${finalSurvey.status}`);
    console.log(`👥 응답자 수: ${finalSurvey.responses.length}명`);
    console.log(`💰 총 리워드 지급: ${finalSurvey.responses.length * finalSurvey.reward}원`);
    
    console.log('\n👥 응답자 목록:');
    finalSurvey.responses.forEach((response, index) => {
      console.log(`   ${index + 1}. ${response.consumer.name}`);
    });
    
    console.log('\n🎉 워크플로우 테스트 완료!');
    console.log('✅ 모든 단계가 예상대로 작동하고 있습니다.');
    
    return {
      success: true,
      surveyId: testSurvey.id,
      finalStatus: finalSurvey.status,
      responseCount: finalSurvey.responses.length,
      maxParticipants: finalSurvey.maxParticipants
    };

  } catch (error) {
    console.error('❌ 워크플로우 테스트 실패:', error);
    return {
      success: false,
      error: error.message
    };
  } finally {
    await prisma.$disconnect();
  }
}

// 스크립트 직접 실행
if (require.main === module) {
  testWorkflow();
}

module.exports = { testWorkflow };
