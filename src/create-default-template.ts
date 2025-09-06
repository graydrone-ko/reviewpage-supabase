import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

const defaultSurveyTemplate = {
  name: '상품 상세페이지 기본 설문',
  description: '상품 상세페이지 평가를 위한 5단계 기본 설문 템플릿',
  isDefault: true,
  steps: [
    {
      stepNumber: 1,
      title: '첫인상 평가',
      description: '상품 페이지의 첫인상을 평가해주세요',
      questions: [
        {
          questionNumber: 1,
          text: '첫 화면을 봤을 때 어떤 느낌이 드나요?',
          type: 'MULTIPLE_CHOICE',
          required: true,
          options: [
            { optionNumber: 1, text: '신뢰할 수 있어 보임' },
            { optionNumber: 2, text: '평범함' },
            { optionNumber: 3, text: '퀄리티가 낮음' },
            { optionNumber: 4, text: '믿음이 가지 않음' },
            { optionNumber: 5, text: '기타(작성)' }
          ]
        },
        {
          questionNumber: 2,
          text: '이 상품이 어떤 상품인지 5초 안에 이해되나요?',
          type: 'YES_NO',
          required: true,
          options: []
        },
        {
          questionNumber: 3,
          text: '상세페이지를 전체적으로 보고나서 기억나는 문장은 무엇인가요?',
          type: 'TEXT',
          required: true,
          options: []
        },
        {
          questionNumber: 4,
          text: '전체적인 페이지 디자인 점수는?',
          type: 'SCORE',
          required: true,
          options: []
        }
      ]
    },
    {
      stepNumber: 2,
      title: '콘텐츠 이해도',
      description: '상품 설명과 콘텐츠의 이해도를 평가해주세요',
      questions: [
        {
          questionNumber: 1,
          text: '상품 설명이 이해하기 쉽고 가치있게 다가왔나요?',
          type: 'SCORE',
          required: true,
          options: []
        },
        {
          questionNumber: 2,
          text: '상세페이지 어떤 부분에서 가장 기대가 됐나요?',
          type: 'TEXT',
          required: true,
          options: []
        },
        {
          questionNumber: 3,
          text: '상세페이지 어떤 부분에서 부정적인 생각이나 의심이 들었나요?',
          type: 'TEXT',
          required: true,
          options: []
        },
        {
          questionNumber: 4,
          text: '이 상품의 핵심 장점이 명확히 전달되나요?',
          type: 'YES_NO',
          required: true,
          options: []
        },
        {
          questionNumber: 5,
          text: '경쟁 상품 대비 차별점을 찾을 수 있나요?',
          type: 'YES_NO',
          required: true,
          options: []
        }
      ]
    },
    {
      stepNumber: 3,
      title: '구매 동기 분석',
      description: '구매 의향과 동기를 분석해주세요',
      questions: [
        {
          questionNumber: 1,
          text: '현재 상태에서 구매 의향은?',
          type: 'SCORE',
          required: true,
          options: []
        },
        {
          questionNumber: 2,
          text: '구매를 망설이게 하는 가장 큰 요인은?',
          type: 'MULTIPLE_CHOICE',
          required: true,
          options: [
            { optionNumber: 1, text: '가격' },
            { optionNumber: 2, text: '신뢰도 부족' },
            { optionNumber: 3, text: '정보 부족' },
            { optionNumber: 4, text: '필요성 못 느낌' }
          ]
        },
        {
          questionNumber: 3,
          text: '구매 결정에 가장 결정적이었던 부분은 상세페이지의 어떤 내용이었나요?',
          type: 'TEXT',
          required: true,
          options: []
        },
        {
          questionNumber: 4,
          text: '어떤 부분이 개선되면 구매 확률이 높아질까요?',
          type: 'TEXT',
          required: true,
          options: []
        }
      ]
    },
    {
      stepNumber: 4,
      title: '페이지 구조 평가',
      description: '페이지의 구조와 사용성을 평가해주세요',
      questions: [
        {
          questionNumber: 1,
          text: '상세페이지의 전체적인 흐름이 설득이나 정보를 파악하는데 어땠나요?',
          type: 'TEXT',
          required: true,
          options: []
        },
        {
          questionNumber: 2,
          text: '스크롤하면서 지루하거나 불편한 구간이 있나요?',
          type: 'TEXT',
          required: true,
          options: []
        },
        {
          questionNumber: 3,
          text: '모바일 화면으로 보았을 때 글자를 읽기 편했나요?',
          type: 'TEXT',
          required: true,
          options: []
        },
        {
          questionNumber: 4,
          text: '실제 구매를 위해 이 상품의 상세페이지를 보았다면 어떤 부분까지 보았을까요?',
          type: 'TEXT',
          required: true,
          options: []
        }
      ]
    },
    {
      stepNumber: 5,
      title: '감정 및 행동 의도',
      description: '페이지에 대한 감정과 행동 의도를 평가해주세요',
      questions: [
        {
          questionNumber: 1,
          text: '이 페이지를 보고 난 후 감정 상태는?',
          type: 'MULTIPLE_CHOICE',
          required: true,
          options: [
            { optionNumber: 1, text: '흥미로움' },
            { optionNumber: 2, text: '신뢰감' },
            { optionNumber: 3, text: '의구심' },
            { optionNumber: 4, text: '무관심' },
            { optionNumber: 5, text: '짜증' }
          ]
        },
        {
          questionNumber: 2,
          text: '지인에게 추천하고 싶은 정도는?',
          type: 'SCORE',
          required: true,
          options: []
        },
        {
          questionNumber: 3,
          text: '실제 구매한다면 언제 하시겠어요?',
          type: 'MULTIPLE_CHOICE',
          required: true,
          options: [
            { optionNumber: 1, text: '지금 즉시' },
            { optionNumber: 2, text: '더 알아본 후' },
            { optionNumber: 3, text: '할인할 때' },
            { optionNumber: 4, text: '구매 안 함' }
          ]
        },
        {
          questionNumber: 4,
          text: '한 줄로 이 페이지를 평가한다면?',
          type: 'TEXT',
          required: true,
          options: []
        }
      ]
    }
  ]
};

async function createDefaultTemplate() {
  try {
    console.log('기본 설문 템플릿 생성 시작...');

    const template = await prisma.surveyTemplate.create({
      data: {
        name: defaultSurveyTemplate.name,
        description: defaultSurveyTemplate.description,
        isDefault: defaultSurveyTemplate.isDefault
      }
    });

    console.log(`템플릿 생성 완료: ${template.id}`);

    for (const stepData of defaultSurveyTemplate.steps) {
      const step = await prisma.surveyStep.create({
        data: {
          templateId: template.id,
          stepNumber: stepData.stepNumber,
          title: stepData.title,
          description: stepData.description
        }
      });

      console.log(`단계 ${stepData.stepNumber} 생성 완료: ${step.id}`);

      for (const questionData of stepData.questions) {
        const question = await prisma.surveyQuestion.create({
          data: {
            stepId: step.id,
            questionNumber: questionData.questionNumber,
            text: questionData.text,
            type: questionData.type as any,
            required: questionData.required
          }
        });

        console.log(`질문 ${stepData.stepNumber}-${questionData.questionNumber} 생성 완료: ${question.id}`);

        if (questionData.options && questionData.options.length > 0) {
          for (const optionData of questionData.options) {
            const option = await prisma.questionOption.create({
              data: {
                questionId: question.id,
                optionNumber: optionData.optionNumber,
                text: optionData.text
              }
            });

            console.log(`선택지 ${stepData.stepNumber}-${questionData.questionNumber}-${optionData.optionNumber} 생성 완료: ${option.id}`);
          }
        }
      }
    }

    console.log('기본 설문 템플릿 생성 완료!');

  } catch (error) {
    console.error('오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createDefaultTemplate();