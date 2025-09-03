import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function createTestSurvey() {
  try {
    console.log('테스트 설문 생성 시작...');

    // 기본 템플릿 찾기
    const defaultTemplate = await prisma.surveyTemplate.findFirst({
      where: { isDefault: true }
    });

    if (!defaultTemplate) {
      console.error('기본 템플릿을 찾을 수 없습니다.');
      return;
    }

    // 테스트 판매자 찾기
    const seller = await prisma.user.findFirst({
      where: { 
        email: 'testseller@example.com',
        role: 'SELLER'
      }
    });

    if (!seller) {
      console.error('테스트 판매자를 찾을 수 없습니다.');
      return;
    }

    // 테스트 설문 생성
    const survey = await prisma.survey.create({
      data: {
        title: '테스트 상품 상세페이지 평가',
        description: '새로운 5단계 설문 시스템 테스트를 위한 설문입니다.',
        url: 'https://www.apple.com/iphone-15/',
        sellerId: seller.id,
        templateId: defaultTemplate.id,
        targetAgeMin: 20,
        targetAgeMax: 40,
        targetGender: 'ALL',
        reward: 5000,
        status: 'APPROVED', // 테스트를 위해 바로 승인 상태로 설정
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30일 후
      },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        template: {
          include: {
            steps: {
              include: {
                questions: {
                  include: {
                    options: true
                  },
                  orderBy: { questionNumber: 'asc' }
                }
              },
              orderBy: { stepNumber: 'asc' }
            }
          }
        }
      }
    });

    console.log('테스트 설문 생성 완료!');
    console.log(`설문 ID: ${survey.id}`);
    console.log(`설문 제목: ${survey.title}`);
    console.log(`상품 URL: ${survey.url}`);
    console.log(`리워드: ${survey.reward}원`);
    console.log(`템플릿: ${survey.template.name}`);
    console.log(`단계 수: ${survey.template.steps.length}`);
    
    let totalQuestions = 0;
    survey.template.steps.forEach(step => {
      totalQuestions += step.questions.length;
      console.log(`- ${step.title}: ${step.questions.length}개 질문`);
    });
    console.log(`총 질문 수: ${totalQuestions}개`);

  } catch (error) {
    console.error('오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestSurvey();