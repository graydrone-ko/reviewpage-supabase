const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function createCorrectTemplate() {
  try {
    console.log('기존 템플릿 삭제 중...');
    
    // 기존 템플릿 모두 삭제 (CASCADE로 관련 데이터도 삭제됨)
    await prisma.surveyTemplate.deleteMany();
    
    console.log('올바른 5단계 21문항 템플릿 생성 중...');
    
    // 5단계 21문항 템플릿 생성
    const template = await prisma.surveyTemplate.create({
      data: {
        name: '상품 상세페이지 리뷰 설문',
        description: '상품 상세페이지의 완성도를 평가하는 포괄적인 설문조사',
        isDefault: true,
        steps: {
          create: [
            // 1단계: 첫인상 및 디자인 (5문항)
            {
              stepNumber: 1,
              title: '첫인상 및 디자인',
              description: '상품 페이지의 첫인상과 디자인에 대해 평가해주세요',
              questions: {
                create: [
                  {
                    questionNumber: 1,
                    text: '상품 페이지의 전반적인 첫인상은 어떠신가요?',
                    type: 'SCORE',
                    required: true
                  },
                  {
                    questionNumber: 2,
                    text: '페이지의 디자인이 깔끔하고 보기 좋다고 생각하시나요?',
                    type: 'SCORE',
                    required: true
                  },
                  {
                    questionNumber: 3,
                    text: '색상과 레이아웃이 조화롭다고 느끼시나요?',
                    type: 'SCORE',
                    required: true
                  },
                  {
                    questionNumber: 4,
                    text: '페이지가 전문적이고 신뢰할 만하다는 인상을 받으셨나요?',
                    type: 'SCORE',
                    required: true
                  },
                  {
                    questionNumber: 5,
                    text: '첫인상과 디자인에 대한 추가 의견이 있으시다면 자유롭게 작성해주세요.',
                    type: 'TEXT',
                    required: false,
                    minLength: 10,
                    maxLength: 500,
                    placeholder: '디자인의 장점이나 개선점을 구체적으로 알려주세요'
                  }
                ]
              }
            },
            // 2단계: 사용성 및 편의성 (4문항)
            {
              stepNumber: 2,
              title: '사용성 및 편의성',
              description: '페이지의 사용 편의성과 기능성을 평가해주세요',
              questions: {
                create: [
                  {
                    questionNumber: 1,
                    text: '원하는 정보를 쉽게 찾을 수 있었나요?',
                    type: 'SCORE',
                    required: true
                  },
                  {
                    questionNumber: 2,
                    text: '페이지 내 버튼들의 위치와 기능이 직관적이었나요?',
                    type: 'SCORE',
                    required: true
                  },
                  {
                    questionNumber: 3,
                    text: '모바일에서도 사용하기 편리하다고 생각하시나요?',
                    type: 'SCORE',
                    required: true
                  },
                  {
                    questionNumber: 4,
                    text: '사용성이나 편의성 측면에서 개선이 필요한 부분이 있다면 알려주세요.',
                    type: 'TEXT',
                    required: false,
                    minLength: 10,
                    maxLength: 500,
                    placeholder: '사용 중 불편했던 점이나 개선 제안사항을 작성해주세요'
                  }
                ]
              }
            },
            // 3단계: 상품 정보 및 내용 (5문항)
            {
              stepNumber: 3,
              title: '상품 정보 및 내용',
              description: '상품 정보의 충실성과 품질을 평가해주세요',
              questions: {
                create: [
                  {
                    questionNumber: 1,
                    text: '상품 설명이 충분히 상세하다고 생각하시나요?',
                    type: 'SCORE',
                    required: true
                  },
                  {
                    questionNumber: 2,
                    text: '제품 이미지의 품질과 개수가 적절한가요?',
                    type: 'SCORE',
                    required: true
                  },
                  {
                    questionNumber: 3,
                    text: '가격 정보가 명확하게 표시되어 있나요?',
                    type: 'SCORE',
                    required: true
                  },
                  {
                    questionNumber: 4,
                    text: '배송이나 교환/환불 정보가 충분히 안내되어 있나요?',
                    type: 'SCORE',
                    required: true
                  },
                  {
                    questionNumber: 5,
                    text: '상품 정보 중 부족하다고 느낀 부분이나 추가로 알고 싶은 정보가 있나요?',
                    type: 'TEXT',
                    required: false,
                    minLength: 10,
                    maxLength: 500,
                    placeholder: '더 자세히 알고 싶은 상품 정보나 개선사항을 알려주세요'
                  }
                ]
              }
            },
            // 4단계: 구매 의사결정 (4문항)
            {
              stepNumber: 4,
              title: '구매 의사결정',
              description: '구매 결정에 도움이 되는 요소들을 평가해주세요',
              questions: {
                create: [
                  {
                    questionNumber: 1,
                    text: '이 페이지를 보고 상품을 구매하고 싶은 마음이 생겼나요?',
                    type: 'SCORE',
                    required: true
                  },
                  {
                    questionNumber: 2,
                    text: '가격이 상품의 가치에 비해 적절하다고 생각하시나요?',
                    type: 'SCORE',
                    required: true
                  },
                  {
                    questionNumber: 3,
                    text: '다른 사람에게 이 상품을 추천하시겠습니까?',
                    type: 'SCORE',
                    required: true
                  },
                  {
                    questionNumber: 4,
                    text: '구매 결정에 가장 큰 영향을 준 요소는 무엇인가요?',
                    type: 'MULTIPLE_CHOICE',
                    required: true,
                    options: {
                      create: [
                        { optionNumber: 1, text: '상품 디자인/외관' },
                        { optionNumber: 2, text: '가격의 합리성' },
                        { optionNumber: 3, text: '상품 설명의 충실성' },
                        { optionNumber: 4, text: '이미지의 품질과 다양성' },
                        { optionNumber: 5, text: '브랜드 신뢰도' },
                        { optionNumber: 6, text: '리뷰나 평점' },
                        { optionNumber: 7, text: '배송 조건' },
                        { optionNumber: 8, text: '기타' }
                      ]
                    }
                  }
                ]
              }
            },
            // 5단계: 종합 평가 및 개선사항 (3문항)
            {
              stepNumber: 5,
              title: '종합 평가 및 개선사항',
              description: '전반적인 평가와 개선 의견을 알려주세요',
              questions: {
                create: [
                  {
                    questionNumber: 1,
                    text: '이 상품 페이지에 대한 전반적인 만족도는 어느 정도인가요?',
                    type: 'SCORE',
                    required: true
                  },
                  {
                    questionNumber: 2,
                    text: '이 페이지에서 가장 마음에 들었던 부분은 무엇인가요?',
                    type: 'TEXT',
                    required: true,
                    minLength: 10,
                    maxLength: 300,
                    placeholder: '가장 인상적이거나 만족스러웠던 부분을 구체적으로 작성해주세요'
                  },
                  {
                    questionNumber: 3,
                    text: '이 페이지를 더욱 개선하기 위한 제안사항이나 아쉬웠던 점이 있다면 자유롭게 작성해주세요.',
                    type: 'TEXT',
                    required: false,
                    minLength: 10,
                    maxLength: 500,
                    placeholder: '페이지 개선을 위한 구체적인 제안사항이나 아쉬웠던 점을 알려주세요'
                  }
                ]
              }
            }
          ]
        }
      },
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

    console.log('✅ 5단계 21문항 템플릿 생성 완료!');
    console.log(`템플릿 ID: ${template.id}`);
    console.log(`템플릿 이름: ${template.name}`);
    console.log(`총 단계 수: ${template.steps.length}`);
    
    let totalQuestions = 0;
    template.steps.forEach(step => {
      console.log(`단계 ${step.stepNumber}: ${step.title} (${step.questions.length}개 질문)`);
      totalQuestions += step.questions.length;
    });
    
    console.log(`총 질문 수: ${totalQuestions}`);

  } catch (error) {
    console.error('템플릿 생성 중 오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createCorrectTemplate();