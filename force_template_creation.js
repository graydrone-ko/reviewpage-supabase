// Railway 환경에서 직접 템플릿 생성을 위한 스크립트
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTemplateDirectly() {
  console.log('🚀 Railway에서 직접 템플릿 생성 시작...');
  
  try {
    // 1. 데이터베이스 연결 확인
    console.log('1. 데이터베이스 연결 테스트...');
    const testQuery = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ 데이터베이스 연결 성공:', testQuery);

    // 2. 기존 템플릿 확인
    console.log('2. 기존 템플릿 확인...');
    const existingTemplates = await prisma.surveyTemplate.findMany({
      select: {
        id: true,
        name: true,
        isDefault: true
      }
    });
    console.log(`현재 템플릿 개수: ${existingTemplates.length}`);
    
    if (existingTemplates.length > 0) {
      console.log('✅ 기존 템플릿 있음, 생성 중단');
      existingTemplates.forEach(t => console.log(`- ${t.name} (기본: ${t.isDefault})`));
      return;
    }

    // 3. 기본 템플릿 직접 생성
    console.log('3. 기본 5단계 21질문 템플릿 생성...');
    
    const template = await prisma.surveyTemplate.create({
      data: {
        name: "기본 상품 상세페이지 평가 템플릿",
        description: "5단계로 구성된 상품 상세페이지 평가를 위한 기본 템플릿",
        isDefault: true,
        steps: {
          create: [
            {
              stepNumber: 1,
              title: "첫인상 및 관심도",
              description: "상세페이지의 첫인상과 관심 유발 정도를 평가합니다",
              questions: {
                create: [
                  {
                    questionNumber: 1,
                    text: "상세페이지의 첫인상은 어떠셨나요?",
                    type: "MULTIPLE_CHOICE",
                    required: true,
                    options: {
                      create: [
                        { optionNumber: 1, text: "매우 좋음" },
                        { optionNumber: 2, text: "좋음" },
                        { optionNumber: 3, text: "보통" },
                        { optionNumber: 4, text: "나쁨" },
                        { optionNumber: 5, text: "매우 나쁨" }
                      ]
                    }
                  },
                  {
                    questionNumber: 2,
                    text: "이 상품에 대한 관심도는? (1-10점)",
                    type: "SCORE",
                    required: true
                  },
                  {
                    questionNumber: 3,
                    text: "페이지를 보고 가장 먼저 눈에 들어온 것은?",
                    type: "TEXT",
                    required: true
                  }
                ]
              }
            },
            {
              stepNumber: 2,
              title: "상품 정보 이해도",
              description: "상품 정보의 명확성과 이해 용이성을 평가합니다",
              questions: {
                create: [
                  {
                    questionNumber: 4,
                    text: "상품의 주요 특징을 명확히 이해할 수 있었나요?",
                    type: "YES_NO",
                    required: true
                  },
                  {
                    questionNumber: 5,
                    text: "상품 정보가 충분히 제공되었나요?",
                    type: "MULTIPLE_CHOICE",
                    required: true,
                    options: {
                      create: [
                        { optionNumber: 1, text: "매우 충분함" },
                        { optionNumber: 2, text: "충분함" },
                        { optionNumber: 3, text: "보통" },
                        { optionNumber: 4, text: "부족함" },
                        { optionNumber: 5, text: "매우 부족함" }
                      ]
                    }
                  }
                ]
              }
            },
            {
              stepNumber: 3,
              title: "구매 의향 및 종합 평가",
              description: "최종 구매 의향과 종합적인 평가를 합니다",
              questions: {
                create: [
                  {
                    questionNumber: 6,
                    text: "이 페이지를 본 후 구매 의향이 생기셨나요?",
                    type: "YES_NO",
                    required: true
                  },
                  {
                    questionNumber: 7,
                    text: "전체적인 상세페이지 만족도는? (1-10점)",
                    type: "SCORE",
                    required: true
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
                options: {
                  orderBy: { optionNumber: 'asc' }
                }
              },
              orderBy: { questionNumber: 'asc' }
            }
          },
          orderBy: { stepNumber: 'asc' }
        }
      }
    });

    console.log('✅ 템플릿 생성 성공!');
    console.log(`- ID: ${template.id}`);
    console.log(`- 이름: ${template.name}`);
    console.log(`- 단계 수: ${template.steps.length}`);
    
    const totalQuestions = template.steps.reduce((total, step) => total + step.questions.length, 0);
    console.log(`- 총 질문 수: ${totalQuestions}`);

    // 4. 최종 확인
    console.log('4. 생성 결과 최종 확인...');
    const finalCheck = await prisma.surveyTemplate.findMany({
      select: { id: true, name: true, isDefault: true }
    });
    console.log(`최종 템플릿 개수: ${finalCheck.length}`);

    console.log('🎉 템플릿 생성 완료!');

  } catch (error) {
    console.error('❌ 템플릿 생성 실패:', error);
    if (error.message.includes('Unknown column')) {
      console.error('→ 스키마 마이그레이션이 필요할 수 있습니다');
    }
    if (error.message.includes('Connection')) {
      console.error('→ 데이터베이스 연결 설정을 확인하세요');
    }
  } finally {
    await prisma.$disconnect();
  }
}

createTemplateDirectly();