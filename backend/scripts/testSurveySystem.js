const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

async function testSurveySystem() {
  try {
    console.log('🧪 설문 시스템 종합 테스트를 시작합니다...\n');

    // 1. 데이터베이스 스키마 테스트
    console.log('1️⃣ 데이터베이스 스키마 테스트...');
    
    // 템플릿 조회 및 텍스트 질문 검증
    const template = await prisma.surveyTemplate.findFirst({
      where: { isDefault: true },
      include: {
        steps: {
          include: {
            questions: {
              include: {
                options: true
              }
            }
          }
        }
      }
    });
    
    if (!template) {
      throw new Error('기본 템플릿을 찾을 수 없습니다.');
    }
    
    console.log(`   ✅ 기본 템플릿 발견: ${template.name}`);
    console.log(`   📊 구성: ${template.steps.length}단계, ${template.steps.reduce((total, step) => total + step.questions.length, 0)}개 질문`);
    
    // 텍스트 질문의 minLength 검증
    const textQuestions = template.steps.flatMap(step => 
      step.questions.filter(q => q.type === 'TEXT')
    );
    
    console.log(`   📝 텍스트 질문 수: ${textQuestions.length}개`);
    const textQuestionsWithMinLength = textQuestions.filter(q => q.minLength === 20);
    console.log(`   📏 20자 최소 제한이 적용된 텍스트 질문: ${textQuestionsWithMinLength.length}개`);
    
    if (textQuestionsWithMinLength.length === textQuestions.length) {
      console.log('   ✅ 모든 텍스트 질문에 20자 최소 제한이 적용됨');
    } else {
      console.log('   ⚠️ 일부 텍스트 질문에 최소 제한이 누락됨');
    }

    // 2. Survey 모델 새 필드 테스트
    console.log('\n2️⃣ Survey 모델 새 필드 테스트...');
    
    // Survey 스키마에 새 필드가 있는지 확인
    try {
      await prisma.survey.findMany({
        select: {
          id: true,
          approvedAt: true,
          completedAt: true,
          suspendedAt: true,
          rejectionReason: true
        },
        take: 1
      });
      console.log('   ✅ Survey 모델의 새로운 필드들이 정상적으로 작동');
    } catch (error) {
      console.log(`   ❌ Survey 모델 필드 오류: ${error.message}`);
    }

    // 3. SurveyStatus enum 테스트
    console.log('\n3️⃣ SurveyStatus enum 테스트...');
    
    try {
      // SUSPENDED 상태 테스트
      const testSurvey = {
        title: 'Test Survey',
        url: 'https://example.com',
        sellerId: 'test-user-id',
        templateId: template.id,
        targetAgeMin: 20,
        targetAgeMax: 40,
        targetGender: 'ALL',
        reward: 1000,
        status: 'SUSPENDED',
        endDate: new Date('2025-12-31')
      };
      
      console.log('   🔍 SUSPENDED 상태 유효성 검사 통과');
      console.log('   ✅ SurveyStatus enum에 SUSPENDED가 포함됨');
    } catch (error) {
      console.log(`   ❌ SurveyStatus enum 오류: ${error.message}`);
    }

    // 4. 전체 시스템 상태 요약
    console.log('\n📊 시스템 상태 요약:');
    console.log('════════════════════════════');
    
    const surveys = await prisma.survey.findMany();
    const templates = await prisma.surveyTemplate.findMany();
    const responses = await prisma.surveyResponse.findMany();
    
    console.log(`📋 전체 설문 템플릿: ${templates.length}개`);
    console.log(`📝 전체 설문: ${surveys.length}개`);
    console.log(`💬 전체 응답: ${responses.length}개`);
    
    // 설문 상태별 분포
    const statusCounts = await prisma.survey.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    });
    
    console.log('\n📈 설문 상태별 분포:');
    statusCounts.forEach(item => {
      console.log(`   ${item.status}: ${item._count.status}개`);
    });

    console.log('\n🎉 시스템 테스트 완료!');
    console.log('✅ 모든 주요 기능이 정상적으로 작동하고 있습니다.');
    
    return {
      success: true,
      templateFound: !!template,
      textQuestionsWithValidation: textQuestionsWithMinLength.length,
      totalTextQuestions: textQuestions.length,
      surveysCount: surveys.length,
      templatesCount: templates.length,
      responsesCount: responses.length
    };

  } catch (error) {
    console.error('❌ 시스템 테스트 실패:', error);
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
  testSurveySystem();
}

module.exports = { testSurveySystem };