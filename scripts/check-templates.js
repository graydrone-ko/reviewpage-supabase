const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function checkTemplates() {
  try {
    console.log('현재 데이터베이스의 템플릿들:');
    
    const templates = await prisma.surveyTemplate.findMany({
      include: {
        steps: {
          include: {
            questions: {
              include: {
                options: true
              }
            }
          },
          orderBy: { stepNumber: 'asc' }
        }
      }
    });

    templates.forEach(template => {
      console.log(`\n템플릿: ${template.name} (ID: ${template.id})`);
      console.log(`기본 템플릿: ${template.isDefault}`);
      console.log(`단계 수: ${template.steps.length}`);
      
      let totalQuestions = 0;
      template.steps.forEach(step => {
        console.log(`  단계 ${step.stepNumber}: ${step.title} (${step.questions.length}개 질문)`);
        totalQuestions += step.questions.length;
      });
      
      console.log(`총 질문 수: ${totalQuestions}`);
    });

  } catch (error) {
    console.error('템플릿 확인 중 오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTemplates();