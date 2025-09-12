require('dotenv').config();
const { dbUtils } = require('../dist/src/utils/database');

// Supabase용 5단계 21문항 기본 템플릿 생성 스크립트
async function createDefaultTemplate() {
  try {
    console.log('🚀 Supabase 기본 설문 템플릿 생성 시작...');

    // 1. 기본 템플릿 생성 (Supabase snake_case 사용)
    const templateData = {
      name: '상품 상세페이지 리뷰 설문',
      description: '상품 상세페이지의 완성도를 평가하는 포괄적인 설문조사 (5단계 21문항)',
      is_default: true
    };

    console.log('📝 템플릿 기본 정보 생성 중...');
    const template = await dbUtils.createTemplate(templateData);
    console.log(`✅ 템플릿 생성 완료: ${template.id}`);

    // 2. 5단계 생성
    const steps = [
      {
        step_number: 1,
        title: '첫인상 평가',
        description: '상품 상세페이지의 첫인상에 대해 평가해주세요',
        template_id: template.id
      },
      {
        step_number: 2,
        title: '콘텐츠 이해도',
        description: '상품 정보와 콘텐츠의 이해도를 평가해주세요',
        template_id: template.id
      },
      {
        step_number: 3,
        title: '구매 동기 분석',
        description: '구매 의사결정에 영향을 주는 요소들을 분석해주세요',
        template_id: template.id
      },
      {
        step_number: 4,
        title: '페이지 구조 평가',
        description: '상세페이지의 구조와 사용성을 평가해주세요',
        template_id: template.id
      },
      {
        step_number: 5,
        title: '감정 및 행동 의도',
        description: '페이지를 본 후의 감정과 행동 의도를 알려주세요',
        template_id: template.id
      }
    ];

    console.log('📋 5단계 생성 중...');
    const createdSteps = [];
    for (const stepData of steps) {
      const step = await dbUtils.createStep(stepData);
      createdSteps.push(step);
      console.log(`  ✅ ${step.step_number}단계: ${step.title}`);
    }

    // 3. 각 단계별 질문 생성
    const questionsData = [
      // 1단계 질문들 (4문항)
      [
        {
          question_number: 1,
          text: '첫 화면을 봤을 때 어떤 느낌이 드나요?',
          type: 'MULTIPLE_CHOICE',
          required: true,
          step_id: createdSteps[0].id
        },
        {
          question_number: 2,
          text: '이 상품이 어떤 상품인지 5초 안에 이해되나요?',
          type: 'YES_NO',
          required: true,
          step_id: createdSteps[0].id
        },
        {
          question_number: 3,
          text: '상세페이지를 전체적으로 보고나서 기억나는 문장은 무엇인가요?',
          type: 'TEXT',
          required: true,
          min_length: 1,
          max_length: 500,
          placeholder: '기억에 남는 문장이나 문구를 작성해주세요',
          step_id: createdSteps[0].id
        },
        {
          question_number: 4,
          text: '전체적인 페이지 디자인 점수는?',
          type: 'SCORE',
          required: true,
          step_id: createdSteps[0].id
        }
      ],
      // 2단계 질문들 (5문항)
      [
        {
          question_number: 1,
          text: '상품 설명이 이해하기 쉽고 가치있게 다가왔나요?',
          type: 'SCORE',
          required: true,
          step_id: createdSteps[1].id
        },
        {
          question_number: 2,
          text: '상세페이지 어떤 부분에서 가장 기대가 됐나요?',
          type: 'TEXT',
          required: true,
          min_length: 1,
          max_length: 500,
          placeholder: '가장 기대되거나 인상적이었던 부분을 작성해주세요',
          step_id: createdSteps[1].id
        },
        {
          question_number: 3,
          text: '상세페이지 어떤 부분에서 부정적인 생각이나 의심이 들었나요?',
          type: 'TEXT',
          required: false,
          min_length: 1,
          max_length: 500,
          placeholder: '의심스럽거나 부정적으로 느낀 부분을 작성해주세요 (선택사항)',
          step_id: createdSteps[1].id
        },
        {
          question_number: 4,
          text: '이 상품의 핵심 장점이 명확히 전달되나요?',
          type: 'YES_NO',
          required: true,
          step_id: createdSteps[1].id
        },
        {
          question_number: 5,
          text: '경쟁 상품 대비 차별점을 찾을 수 있나요?',
          type: 'YES_NO',
          required: true,
          step_id: createdSteps[1].id
        }
      ],
      // 3단계 질문들 (4문항)
      [
        {
          question_number: 1,
          text: '현재 상태에서 구매 의향은?',
          type: 'SCORE',
          required: true,
          step_id: createdSteps[2].id
        },
        {
          question_number: 2,
          text: '구매를 망설이게 하는 가장 큰 요인은?',
          type: 'MULTIPLE_CHOICE',
          required: true,
          step_id: createdSteps[2].id
        },
        {
          question_number: 3,
          text: '구매 결정에 가장 결정적이었던 부분은 상세페이지의 어떤 내용이었나요?',
          type: 'TEXT',
          required: true,
          min_length: 1,
          max_length: 500,
          placeholder: '구매 결정에 영향을 준 구체적인 내용을 작성해주세요',
          step_id: createdSteps[2].id
        },
        {
          question_number: 4,
          text: '어떤 부분이 개선되면 구매 확률이 높아질까요?',
          type: 'TEXT',
          required: false,
          min_length: 1,
          max_length: 500,
          placeholder: '개선이 필요한 부분에 대한 의견을 작성해주세요 (선택사항)',
          step_id: createdSteps[2].id
        }
      ],
      // 4단계 질문들 (4문항)
      [
        {
          question_number: 1,
          text: '상세페이지의 전체적인 흐름이 설득이나 정보를 파악하는데 어땠나요?',
          type: 'TEXT',
          required: true,
          min_length: 1,
          max_length: 500,
          placeholder: '페이지의 흐름과 구성에 대한 의견을 작성해주세요',
          step_id: createdSteps[3].id
        },
        {
          question_number: 2,
          text: '스크롤하면서 지루하거나 불편한 구간이 있나요?',
          type: 'TEXT',
          required: false,
          min_length: 1,
          max_length: 500,
          placeholder: '지루하거나 불편했던 구간이 있다면 작성해주세요 (선택사항)',
          step_id: createdSteps[3].id
        },
        {
          question_number: 3,
          text: '모바일 화면으로 보았을 때 글자를 읽기 편했나요?',
          type: 'TEXT',
          required: true,
          min_length: 1,
          max_length: 500,
          placeholder: '모바일에서의 가독성에 대한 의견을 작성해주세요',
          step_id: createdSteps[3].id
        },
        {
          question_number: 4,
          text: '실제 구매를 위해 이 상품의 상세페이지를 보았다면 어떤 부분까지 보았을까요?',
          type: 'TEXT',
          required: true,
          min_length: 1,
          max_length: 500,
          placeholder: '실제 구매 상황에서 어느 부분까지 보셨을지 작성해주세요',
          step_id: createdSteps[3].id
        }
      ],
      // 5단계 질문들 (4문항)
      [
        {
          question_number: 1,
          text: '이 페이지를 보고 난 후 감정 상태는?',
          type: 'MULTIPLE_CHOICE',
          required: true,
          step_id: createdSteps[4].id
        },
        {
          question_number: 2,
          text: '지인에게 추천하고 싶은 정도는?',
          type: 'SCORE',
          required: true,
          step_id: createdSteps[4].id
        },
        {
          question_number: 3,
          text: '실제 구매한다면 언제 하시겠어요?',
          type: 'MULTIPLE_CHOICE',
          required: true,
          step_id: createdSteps[4].id
        },
        {
          question_number: 4,
          text: '한 줄로 이 페이지를 평가한다면?',
          type: 'TEXT',
          required: true,
          min_length: 1,
          max_length: 200,
          placeholder: '이 페이지에 대한 한 줄 평가를 작성해주세요',
          step_id: createdSteps[4].id
        }
      ]
    ];

    // 4. 질문 생성
    console.log('❓ 21개 질문 생성 중...');
    let totalQuestions = 0;
    const createdQuestions = [];

    for (let stepIndex = 0; stepIndex < questionsData.length; stepIndex++) {
      const stepQuestions = questionsData[stepIndex];
      console.log(`  📝 ${stepIndex + 1}단계 질문 생성 중... (${stepQuestions.length}개)`);
      
      for (const questionData of stepQuestions) {
        const question = await dbUtils.createQuestion(questionData);
        createdQuestions.push(question);
        totalQuestions++;
        console.log(`    ✅ ${question.question_number}. ${question.text.substring(0, 30)}...`);
      }
    }

    // 5. 선택지 생성 (객관식 질문들)
    console.log('🔘 선택지 생성 중...');
    const optionsData = [
      // 1단계 1번 질문 선택지
      {
        questionIndex: 0, // 첫 번째 질문
        options: [
          { option_number: 1, text: '신뢰할 수 있어 보임' },
          { option_number: 2, text: '평범함' },
          { option_number: 3, text: '퀄리티가 낮음' },
          { option_number: 4, text: '믿음이 가지 않음' },
          { option_number: 5, text: '기타(작성)' }
        ]
      },
      // 1단계 2번 질문 선택지
      {
        questionIndex: 1,
        options: [
          { option_number: 1, text: '예' },
          { option_number: 2, text: '아니오' }
        ]
      },
      // 2단계 4번 질문 선택지
      {
        questionIndex: 7,
        options: [
          { option_number: 1, text: '예' },
          { option_number: 2, text: '아니오' }
        ]
      },
      // 2단계 5번 질문 선택지
      {
        questionIndex: 8,
        options: [
          { option_number: 1, text: '예' },
          { option_number: 2, text: '아니오' }
        ]
      },
      // 3단계 2번 질문 선택지
      {
        questionIndex: 10,
        options: [
          { option_number: 1, text: '가격' },
          { option_number: 2, text: '신뢰도 부족' },
          { option_number: 3, text: '정보 부족' },
          { option_number: 4, text: '필요성 못 느낌' }
        ]
      },
      // 5단계 1번 질문 선택지
      {
        questionIndex: 17,
        options: [
          { option_number: 1, text: '흥미로움' },
          { option_number: 2, text: '신뢰감' },
          { option_number: 3, text: '의구심' },
          { option_number: 4, text: '무관심' },
          { option_number: 5, text: '짜증' }
        ]
      },
      // 5단계 3번 질문 선택지
      {
        questionIndex: 19,
        options: [
          { option_number: 1, text: '지금 즉시' },
          { option_number: 2, text: '더 알아본 후' },
          { option_number: 3, text: '할인할 때' },
          { option_number: 4, text: '구매 안 함' }
        ]
      }
    ];

    for (const optionGroup of optionsData) {
      const question = createdQuestions[optionGroup.questionIndex];
      console.log(`  🔘 질문 "${question.text.substring(0, 20)}..." 선택지 생성 중...`);
      
      for (const optionData of optionGroup.options) {
        const option = await dbUtils.createOption({
          ...optionData,
          question_id: question.id
        });
        console.log(`    ✅ ${option.option_number}. ${option.text}`);
      }
    }

    console.log('\n🎉 5단계 21문항 기본 템플릿 생성 완료!');
    console.log(`📋 템플릿 ID: ${template.id}`);
    console.log(`📝 템플릿 이름: ${template.name}`);
    console.log(`📊 총 단계 수: ${createdSteps.length}`);
    console.log(`❓ 총 질문 수: ${totalQuestions}`);
    console.log(`🔘 총 선택지 수: ${optionsData.reduce((acc, group) => acc + group.options.length, 0)}`);

    return template;

  } catch (error) {
    console.error('❌ 기본 템플릿 생성 실패:', error);
    console.error('상세 오류:', error.message);
    throw error;
  }
}

// 스크립트 직접 실행
if (require.main === module) {
  createDefaultTemplate()
    .then(() => {
      console.log('✅ 스크립트 실행 완료');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ 스크립트 실행 실패:', error);
      process.exit(1);
    });
}

module.exports = { createDefaultTemplate };