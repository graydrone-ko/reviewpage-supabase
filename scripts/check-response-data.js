const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function checkResponseData() {
  try {
    console.log('기존 응답 데이터 확인 중...');
    
    // 설문 응답 조회
    const responses = await prisma.surveyResponse.findMany({
      include: {
        survey: {
          include: {
            template: {
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
            }
          }
        }
      },
      take: 3 // 최근 3개만 확인
    });

    console.log(`총 ${responses.length}개 응답 확인:`);
    
    responses.forEach((response, index) => {
      console.log(`\n=== 응답 ${index + 1} ===`);
      console.log(`설문 ID: ${response.surveyId}`);
      console.log(`응답자 ID: ${response.consumerId}`);
      
      const responseData = response.responses;
      console.log(`응답 데이터:`, JSON.stringify(responseData, null, 2));
      
      // 객관식 답변 확인
      responseData.forEach((stepResponse, stepIndex) => {
        console.log(`\n단계 ${stepIndex + 1}:`);
        stepResponse.answers.forEach((answer, answerIndex) => {
          const question = response.survey.template.steps[stepIndex]?.questions[answerIndex];
          console.log(`  질문 ${answerIndex + 1} (${question?.type}): ${answer.value}`);
          
          if (question?.type === 'MULTIPLE_CHOICE') {
            console.log(`    선택지들:`, question.options.map(opt => `${opt.optionNumber}. ${opt.text} (ID: ${opt.id})`));
            
            // 현재 답변이 ID인지 번호인지 확인
            const isId = typeof answer.value === 'string' && answer.value.startsWith('cmf');
            console.log(`    답변 형태: ${isId ? 'ID' : 'NUMBER/TEXT'} - "${answer.value}"`);
          }
        });
      });
    });

  } catch (error) {
    console.error('응답 데이터 확인 중 오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkResponseData();