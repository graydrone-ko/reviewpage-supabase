import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function createDefaultTemplate() {
  try {
    // 기본 템플릿 생성
    const template = await prisma.surveyTemplate.create({
      data: {
        name: '기본 리뷰 설문',
        description: '상품 구매 후 리뷰 작성을 위한 기본 설문 템플릿',
        isDefault: true,
        steps: {
          create: [
            {
              stepNumber: 1,
              title: '구매 확인',
              description: '상품 구매를 확인하는 단계입니다.',
              questions: {
                create: [
                  {
                    questionNumber: 1,
                    text: '해당 상품을 실제로 구매하셨나요?',
                    type: 'YES_NO',
                    required: true
                  }
                ]
              }
            },
            {
              stepNumber: 2,
              title: '상품 만족도',
              description: '구매하신 상품에 대한 만족도를 평가해주세요.',
              questions: {
                create: [
                  {
                    questionNumber: 1,
                    text: '상품의 전반적인 만족도는 어떠신가요?',
                    type: 'SCORE',
                    required: true
                  },
                  {
                    questionNumber: 2,
                    text: '상품 품질은 어떠셨나요?',
                    type: 'MULTIPLE_CHOICE',
                    required: true,
                    options: {
                      create: [
                        { optionNumber: 1, text: '매우 만족' },
                        { optionNumber: 2, text: '만족' },
                        { optionNumber: 3, text: '보통' },
                        { optionNumber: 4, text: '불만족' },
                        { optionNumber: 5, text: '매우 불만족' }
                      ]
                    }
                  }
                ]
              }
            },
            {
              stepNumber: 3,
              title: '리뷰 작성',
              description: '상품에 대한 자세한 리뷰를 작성해주세요.',
              questions: {
                create: [
                  {
                    questionNumber: 1,
                    text: '상품 사용 후기를 자세히 작성해주세요.',
                    type: 'TEXT',
                    required: true,
                    minLength: 10,
                    maxLength: 500,
                    placeholder: '상품의 장점, 단점, 사용 경험 등을 자세히 작성해주세요.'
                  },
                  {
                    questionNumber: 2,
                    text: '다른 분들에게 이 상품을 추천하시겠나요?',
                    type: 'YES_NO',
                    required: true
                  }
                ]
              }
            }
          ]
        }
      }
    });

    console.log('✅ 기본 템플릿이 성공적으로 생성되었습니다:', template.id);
    
  } catch (error) {
    console.error('❌ 템플릿 생성 중 오류 발생:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createDefaultTemplate();