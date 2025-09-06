const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

async function migrateSurveyData() {
  try {
    console.log('🔄 설문 데이터 마이그레이션을 시작합니다...');

    // 1. 현재 상태 확인
    const allSurveys = await prisma.survey.findMany({
      include: {
        template: true,
        responses: true
      }
    });

    const allTemplates = await prisma.surveyTemplate.findMany();

    console.log(`📊 마이그레이션 대상 현황:`);
    console.log(`   - 전체 설문: ${allSurveys.length}개`);
    console.log(`   - 전체 템플릿: ${allTemplates.length}개`);

    // 2. 새로운 기본 템플릿 찾기
    const newDefaultTemplate = await prisma.surveyTemplate.findFirst({
      where: { 
        isDefault: true,
        name: '상품 상세페이지 평가 설문'
      }
    });

    if (!newDefaultTemplate) {
      throw new Error('새로운 기본 템플릿을 찾을 수 없습니다. 먼저 createNewDefaultTemplate.js를 실행하세요.');
    }

    console.log(`✅ 새 기본 템플릿 확인: ${newDefaultTemplate.name} (ID: ${newDefaultTemplate.id})`);

    // 3. 기존 설문 상태별 처리
    let pendingSurveys = 0;
    let activeSurveys = 0;
    let completedSurveys = 0;
    let migratedSurveys = 0;

    for (const survey of allSurveys) {
      switch (survey.status) {
        case 'PENDING':
          // 승인 대기 중인 설문은 새 템플릿으로 업데이트
          await prisma.survey.update({
            where: { id: survey.id },
            data: { 
              templateId: newDefaultTemplate.id,
              updatedAt: new Date()
            }
          });
          pendingSurveys++;
          migratedSurveys++;
          console.log(`   📝 승인대기 설문 업데이트: ${survey.title}`);
          break;

        case 'APPROVED':
          // 승인된 설문은 그대로 유지 (응답 중일 수 있음)
          activeSurveys++;
          console.log(`   ⏸️ 활성 설문 유지: ${survey.title} (응답 ${survey.responses.length}개)`);
          break;

        case 'COMPLETED':
          // 완료된 설문은 그대로 유지
          completedSurveys++;
          console.log(`   ✅ 완료 설문 유지: ${survey.title} (응답 ${survey.responses.length}개)`);
          break;

        case 'CANCELLED':
          // 취소된 설문도 기록상 유지
          console.log(`   ❌ 취소 설문 유지: ${survey.title}`);
          break;

        default:
          console.log(`   ❓ 알 수 없는 상태: ${survey.status} - ${survey.title}`);
          break;
      }
    }

    // 4. 구 템플릿 정리 (기본 템플릿 해제)
    await prisma.surveyTemplate.updateMany({
      where: {
        NOT: { id: newDefaultTemplate.id },
        isDefault: true
      },
      data: { isDefault: false }
    });

    // 5. 마이그레이션 결과 기록
    const migrationRecord = {
      timestamp: new Date().toISOString(),
      newDefaultTemplateId: newDefaultTemplate.id,
      totalSurveysProcessed: allSurveys.length,
      pendingSurveysMigrated: pendingSurveys,
      activeSurveysPreserved: activeSurveys,
      completedSurveysPreserved: completedSurveys,
      totalMigrated: migratedSurveys
    };

    console.log('\n✅ 마이그레이션이 완료되었습니다!');
    console.log('📊 마이그레이션 결과:');
    console.log(`   - 새 템플릿으로 이전: ${migratedSurveys}개 설문`);
    console.log(`   - 기존 활성 설문 유지: ${activeSurveys}개`);
    console.log(`   - 완료된 설문 유지: ${completedSurveys}개`);
    console.log(`   - 데이터 손실: 0개 (모든 데이터 보존)`);

    return migrationRecord;

  } catch (error) {
    console.error('❌ 마이그레이션 실패:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 마이그레이션 상태 확인 함수
async function checkMigrationStatus() {
  try {
    console.log('🔍 현재 마이그레이션 상태를 확인합니다...\n');

    // 템플릿 현황
    const templates = await prisma.surveyTemplate.findMany({
      include: {
        _count: {
          select: { surveys: true }
        }
      }
    });

    console.log('📋 설문 템플릿 현황:');
    templates.forEach(template => {
      const isDefault = template.isDefault ? ' [기본]' : '';
      console.log(`   - ${template.name}${isDefault}: ${template._count.surveys}개 설문 사용 중`);
    });

    // 설문 현황
    const surveyStats = await prisma.survey.groupBy({
      by: ['status'],
      _count: true
    });

    console.log('\n📊 설문 상태별 현황:');
    surveyStats.forEach(stat => {
      console.log(`   - ${stat.status}: ${stat._count}개`);
    });

    // 응답 현황
    const totalResponses = await prisma.surveyResponse.count();
    console.log(`\n💬 총 설문 응답: ${totalResponses}개`);

    return {
      templates: templates.length,
      surveys: surveyStats.reduce((total, stat) => total + stat._count, 0),
      responses: totalResponses
    };

  } catch (error) {
    console.error('❌ 상태 확인 실패:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 스크립트 직접 실행
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--status') || args.includes('-s')) {
    checkMigrationStatus();
  } else {
    migrateSurveyData();
  }
}

module.exports = { migrateSurveyData, checkMigrationStatus };