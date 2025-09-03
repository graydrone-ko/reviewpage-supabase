const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

async function cleanupOldTemplates() {
  try {
    console.log('🗑️ 기존 구식 템플릿 정리를 시작합니다...');

    // 1. 현재 템플릿 상황 확인
    const allTemplates = await prisma.surveyTemplate.findMany({
      include: {
        _count: {
          select: {
            surveys: true
          }
        }
      }
    });

    console.log('📋 현재 템플릿 현황:');
    allTemplates.forEach(template => {
      const isDefault = template.isDefault ? ' [기본]' : '';
      console.log(`   - ${template.name}${isDefault}: ${template._count.surveys}개 설문에서 사용 중`);
    });

    // 2. 새로운 5단계 21질문 템플릿 확인
    const newTemplate = await prisma.surveyTemplate.findFirst({
      where: { 
        name: '상품 상세페이지 평가 설문',
        isDefault: true
      },
      include: {
        steps: {
          include: {
            questions: true
          }
        }
      }
    });

    if (!newTemplate) {
      throw new Error('새로운 5단계 템플릿을 찾을 수 없습니다.');
    }

    const totalQuestions = newTemplate.steps.reduce(
      (total, step) => total + step.questions.length, 
      0
    );

    console.log(`✅ 유지할 템플릿 확인: ${newTemplate.name} (${newTemplate.steps.length}단계, ${totalQuestions}개 질문)`);

    // 3. 삭제할 구식 템플릿들 식별
    const templatesToDelete = allTemplates.filter(template => 
      template.id !== newTemplate.id && (
        template.name === '빠른 상품 평가 설문' ||
        template.name === '상품 상세페이지 기본 설문'
      )
    );

    console.log('\n🎯 삭제할 구식 템플릿들:');
    templatesToDelete.forEach(template => {
      console.log(`   - ${template.name}: ${template._count.surveys}개 설문에서 사용 중`);
    });

    // 4. 사용 중인 설문이 있는지 확인
    const templatesInUse = templatesToDelete.filter(template => template._count.surveys > 0);
    
    if (templatesInUse.length > 0) {
      console.log('\n⚠️ 다음 템플릿들은 현재 사용 중인 설문이 있어 삭제하지 않습니다:');
      templatesInUse.forEach(template => {
        console.log(`   - ${template.name}: ${template._count.surveys}개 설문에서 사용 중`);
      });
    }

    // 5. 사용되지 않는 구식 템플릿들만 삭제
    const templatesNotInUse = templatesToDelete.filter(template => template._count.surveys === 0);
    
    if (templatesNotInUse.length === 0) {
      console.log('\n✨ 삭제할 수 있는 미사용 구식 템플릿이 없습니다.');
      return;
    }

    console.log('\n🗑️ 미사용 구식 템플릿 삭제를 진행합니다:');
    
    for (const template of templatesNotInUse) {
      console.log(`   삭제 중: ${template.name}...`);
      
      // 템플릿과 관련된 모든 데이터 삭제 (cascade)
      await prisma.surveyTemplate.delete({
        where: { id: template.id }
      });
      
      console.log(`   ✅ 삭제 완료: ${template.name}`);
    }

    // 6. 최종 상황 확인
    const remainingTemplates = await prisma.surveyTemplate.findMany({
      include: {
        _count: {
          select: {
            surveys: true
          }
        }
      }
    });

    console.log('\n📋 정리 후 템플릿 현황:');
    remainingTemplates.forEach(template => {
      const isDefault = template.isDefault ? ' [기본]' : '';
      console.log(`   - ${template.name}${isDefault}: ${template._count.surveys}개 설문에서 사용 중`);
    });

    console.log('\n✅ 구식 템플릿 정리가 완료되었습니다!');
    console.log(`📊 정리 결과:`);
    console.log(`   - 삭제된 템플릿: ${templatesNotInUse.length}개`);
    console.log(`   - 보존된 템플릿: ${templatesInUse.length + 1}개 (사용 중이거나 새 템플릿)`);
    console.log(`   - 현재 활성 템플릿: ${remainingTemplates.length}개`);

    return {
      deleted: templatesNotInUse.length,
      preserved: templatesInUse.length + 1,
      remaining: remainingTemplates.length
    };

  } catch (error) {
    console.error('❌ 템플릿 정리 실패:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 템플릿 정리 상태 확인
async function checkTemplateStatus() {
  try {
    console.log('🔍 현재 템플릿 상태를 확인합니다...\n');

    const templates = await prisma.surveyTemplate.findMany({
      include: {
        _count: {
          select: { surveys: true }
        },
        steps: {
          include: {
            _count: {
              select: { questions: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log('📋 전체 템플릿 현황:');
    templates.forEach((template, index) => {
      const isDefault = template.isDefault ? ' [기본 템플릿]' : '';
      const totalQuestions = template.steps.reduce(
        (total, step) => total + step._count.questions, 
        0
      );
      
      console.log(`\n${index + 1}. ${template.name}${isDefault}`);
      console.log(`   📊 구성: ${template.steps.length}단계, ${totalQuestions}개 질문`);
      console.log(`   🔗 사용 중인 설문: ${template._count.surveys}개`);
      console.log(`   📅 생성일: ${new Date(template.createdAt).toLocaleString('ko-KR')}`);
    });

    if (templates.length === 0) {
      console.log('   ❌ 템플릿이 없습니다.');
    } else {
      const defaultTemplate = templates.find(t => t.isDefault);
      if (defaultTemplate) {
        console.log(`\n✅ 기본 템플릿: ${defaultTemplate.name}`);
      } else {
        console.log(`\n⚠️ 기본 템플릿이 설정되지 않았습니다.`);
      }
    }

    return templates;

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
    checkTemplateStatus();
  } else {
    cleanupOldTemplates();
  }
}

module.exports = { cleanupOldTemplates, checkTemplateStatus };