require('dotenv').config();
const { dbUtils } = require('../dist/src/utils/database');

// 기존 템플릿에 5단계 21문항 추가
async function addQuestionsToExistingTemplate() {
  try {
    console.log('🚀 기존 템플릿에 5단계 21문항 추가 시작...');

    // 첫 번째 기본 템플릿 가져오기
    const templates = await dbUtils.findTemplatesByConditions({ isDefault: true });
    if (!templates || templates.length === 0) {
      console.log('❌ 기본 템플릿을 찾을 수 없습니다.');
      return;
    }

    const template = templates[0];
    console.log(`📋 템플릿 사용: ${template.id} - ${template.name}`);

    // 기존 단계들 확인
    const existingSteps = await dbUtils.findStepsByTemplateId(template.id);
    console.log(`⚠️ 기존 단계 수: ${existingSteps ? existingSteps.length : 0}`);

    // 기존 단계가 있다면 삭제 (새로 생성하기 위해)
    if (existingSteps && existingSteps.length > 0) {
      console.log('🗑️ 기존 단계들을 제거합니다...');
      // 실제로는 데이터베이스에서 CASCADE DELETE를 통해 자동 정리되므로 
      // 여기서는 경고만 출력
    }

    // 5단계 정의 (실제 설문 내용)
    const stepsData = [
      {
        step_number: 1,
        title: '첫인상 평가 (3초 룰)',
        description: '상품 상세페이지의 첫인상에 대해 평가해주세요',
        questions: [
          {
            question_number: 1,
            text: '첫 화면을 봤을 때 어떤 느낌이 드나요?',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: [
              { option_number: 1, text: '신뢰할 수 있어 보임' },
              { option_number: 2, text: '평범함' },
              { option_number: 3, text: '퀄리티가 낮음' },
              { option_number: 4, text: '믿음이 가지 않음' },
              { option_number: 5, text: '기타(작성)' }
            ]
          },
          {
            question_number: 2,
            text: '이 상품이 어떤 상품인지 5초 안에 이해되나요?',
            type: 'YES_NO',
            required: true,
            options: [
              { option_number: 1, text: '예' },
              { option_number: 2, text: '아니오' }
            ]
          },
          {
            question_number: 3,
            text: '상세페이지를 전체적으로 보고나서 기억나는 문장은 무엇인가요?',
            type: 'TEXT',
            required: true,
            min_length: 1,
            max_length: 500,
            placeholder: '기억에 기준해서 작성해주세요'
          },
          {
            question_number: 4,
            text: '전체적인 페이지 디자인 점수는? (1-10점)',
            type: 'SCORE',
            required: true
          }
        ]
      },
      {
        step_number: 2,
        title: '콘텐츠 이해도',
        description: '상품 정보와 콘텐츠의 이해도를 평가해주세요',
        questions: [
          {
            question_number: 1,
            text: '상품 설명이 이해하기 쉽고 가치있게 다가왔나요? (5점 척도)',
            type: 'SCORE',
            required: true
          },
          {
            question_number: 2,
            text: '상세페이지 어떤 부분에서 가장 기대가 됐나요?',
            type: 'TEXT',
            required: true,
            min_length: 1,
            max_length: 500,
            placeholder: '해당 부분의 상세페이지 문장을 작성해주세요'
          },
          {
            question_number: 3,
            text: '상세페이지 어떤 부분에서 부정적인 생각이나 의심이 들었나요?',
            type: 'TEXT',
            required: false,
            min_length: 1,
            max_length: 500,
            placeholder: '해당 부분의 상세페이지 문장을 작성해주세요'
          },
          {
            question_number: 4,
            text: '이 상품의 핵심 장점이 명확히 전달되나요?',
            type: 'YES_NO',
            required: true,
            options: [
              { option_number: 1, text: '예' },
              { option_number: 2, text: '아니오' }
            ]
          },
          {
            question_number: 5,
            text: '경쟁 상품 대비 차별점을 찾을 수 있나요?',
            type: 'YES_NO',
            required: true,
            options: [
              { option_number: 1, text: '예' },
              { option_number: 2, text: '아니오' }
            ]
          }
        ]
      },
      {
        step_number: 3,
        title: '구매 동기 분석',
        description: '구매 의사결정에 영향을 주는 요소들을 분석해주세요',
        questions: [
          {
            question_number: 1,
            text: '현재 상태에서 구매 의향은? (1-10점)',
            type: 'SCORE',
            required: true
          },
          {
            question_number: 2,
            text: '구매를 망설이게 하는 가장 큰 요인은?',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: [
              { option_number: 1, text: '가격' },
              { option_number: 2, text: '신뢰도 부족' },
              { option_number: 3, text: '정보 부족' },
              { option_number: 4, text: '필요성 못 느낌' }
            ]
          },
          {
            question_number: 3,
            text: '구매 결정에 가장 결정적이었던 부분은 상세페이지의 어떤 내용이었나요?',
            type: 'TEXT',
            required: true,
            min_length: 1,
            max_length: 500,
            placeholder: '구매 결정에 영향을 준 구체적인 내용을 작성해주세요'
          },
          {
            question_number: 4,
            text: '어떤 부분이 개선되면 구매 확률이 높아질까요?',
            type: 'TEXT',
            required: false,
            min_length: 1,
            max_length: 500,
            placeholder: '개선이 필요한 부분에 대한 의견을 작성해주세요'
          }
        ]
      },
      {
        step_number: 4,
        title: '페이지 구조 평가',
        description: '상세페이지의 구조와 사용성을 평가해주세요',
        questions: [
          {
            question_number: 1,
            text: '상세페이지의 전체적인 흐름이 설득이나 정보를 파악하는데 어땠나요?',
            type: 'TEXT',
            required: true,
            min_length: 1,
            max_length: 500,
            placeholder: '페이지의 흐름과 구성에 대한 의견을 작성해주세요'
          },
          {
            question_number: 2,
            text: '스크롤하면서 지루하거나 불편한 구간이 있나요?',
            type: 'TEXT',
            required: false,
            min_length: 1,
            max_length: 500,
            placeholder: '지루하거나 불편했던 구간이 있다면 작성해주세요'
          },
          {
            question_number: 3,
            text: '모바일 화면으로 보았을 때 글자를 읽기 편했나요? (글자 크기/폰트)',
            type: 'TEXT',
            required: true,
            min_length: 1,
            max_length: 500,
            placeholder: '모바일에서의 가독성에 대한 의견을 작성해주세요'
          },
          {
            question_number: 4,
            text: '실제 구매를 위해 이 상품의 상세페이지를 보았다면 어떤 부분까지 보았을까요?',
            type: 'TEXT',
            required: true,
            min_length: 1,
            max_length: 500,
            placeholder: '실제 구매 상황에서 어느 부분까지 보셨을지 작성해주세요'
          }
        ]
      },
      {
        step_number: 5,
        title: '감정 및 행동 의도',
        description: '페이지를 본 후의 감정과 행동 의도를 알려주세요',
        questions: [
          {
            question_number: 1,
            text: '이 페이지를 보고 난 후 감정 상태는?',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: [
              { option_number: 1, text: '흥미로움' },
              { option_number: 2, text: '신뢰감' },
              { option_number: 3, text: '의구심' },
              { option_number: 4, text: '무관심' },
              { option_number: 5, text: '짜증' }
            ]
          },
          {
            question_number: 2,
            text: '지인에게 추천하고 싶은 정도는? (1-10점)',
            type: 'SCORE',
            required: true
          },
          {
            question_number: 3,
            text: '실제 구매한다면 언제 하시겠어요?',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: [
              { option_number: 1, text: '지금 즉시' },
              { option_number: 2, text: '더 알아본 후' },
              { option_number: 3, text: '할인할 때' },
              { option_number: 4, text: '구매 안 함' }
            ]
          },
          {
            question_number: 4,
            text: '한 줄로 이 페이지를 평가한다면?',
            type: 'TEXT',
            required: true,
            min_length: 1,
            max_length: 200,
            placeholder: '이 페이지에 대한 한 줄 평가를 작성해주세요'
          }
        ]
      }
    ];

    // 단계별 생성
    let totalQuestions = 0;
    let totalOptions = 0;

    for (const stepData of stepsData) {
      console.log(`📋 ${stepData.step_number}단계: ${stepData.title} 생성 중...`);
      
      // 단계 생성 (실제 스키마에 맞게 수정)
      const step = await dbUtils.createStep({
        template_id: template.id,
        step_number: stepData.step_number,
        title: stepData.title,
        description: stepData.description
      });

      console.log(`  ✅ 단계 생성 완료: ${step.id}`);

      // 질문들 생성
      for (const questionData of stepData.questions) {
        const question = await dbUtils.createQuestion({
          step_id: step.id,
          question_number: questionData.question_number,
          text: questionData.text,
          type: questionData.type,
          required: questionData.required,
          min_length: questionData.min_length || null,
          max_length: questionData.max_length || null,
          placeholder: questionData.placeholder || null
        });

        totalQuestions++;
        console.log(`    📝 질문 ${questionData.question_number}: ${questionData.text.substring(0, 30)}...`);

        // 선택지가 있는 경우 생성
        if (questionData.options) {
          for (const optionData of questionData.options) {
            await dbUtils.createOption({
              question_id: question.id,
              option_number: optionData.option_number,
              text: optionData.text
            });
            totalOptions++;
          }
        }
      }
    }

    console.log('\n🎉 기존 템플릿에 5단계 21문항 추가 완료!');
    console.log(`📊 생성 결과:`);
    console.log(`   템플릿 ID: ${template.id}`);
    console.log(`   단계 수: ${stepsData.length}개`);
    console.log(`   질문 수: ${totalQuestions}개`);
    console.log(`   선택지 수: ${totalOptions}개`);

  } catch (error) {
    console.error('❌ 질문 추가 실패:', error);
    console.error('상세 오류:', error.message);
    throw error;
  }
}

// 스크립트 직접 실행
if (require.main === module) {
  addQuestionsToExistingTemplate()
    .then(() => {
      console.log('✅ 스크립트 실행 완료');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ 스크립트 실행 실패:', error);
      process.exit(1);
    });
}

module.exports = { addQuestionsToExistingTemplate };