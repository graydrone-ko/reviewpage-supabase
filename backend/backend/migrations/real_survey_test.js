const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function realSurveyTest() {
  console.log('=== 실제 Survey ID를 사용한 익명 응답 테스트 ===\n');

  try {
    // 1. 실제 존재하는 survey_id 찾기
    console.log('1. 실제 존재하는 survey 찾기...');
    const { data: existingSurveys, error: surveyError } = await supabase
      .from('surveys')
      .select('id, title')
      .limit(1);

    if (surveyError || !existingSurveys || existingSurveys.length === 0) {
      console.log('⚠️ 기존 설문이 없습니다. 새로 생성해야 합니다.');
      console.log('대신 마이그레이션 SQL만 제공합니다.');
    } else {
      const realSurveyId = existingSurveys[0].id;
      console.log('✅ 실제 Survey 발견:', existingSurveys[0].title, '(ID:', realSurveyId, ')');

      // 2. 실제 survey_id로 익명 응답 테스트
      console.log('\n2. 실제 survey_id로 익명 응답 테스트...');
      const testResponse = {
        survey_id: realSurveyId,
        consumer_id: null,  // 핵심: NULL 값
        responses: []
      };

      const { data: insertData, error: insertError } = await supabase
        .from('survey_responses')
        .insert(testResponse)
        .select();

      if (insertError) {
        console.error('❌ 익명 응답 삽입 실패:', insertError);
        console.log('\n🔍 오류 코드 분석:');
        
        if (insertError.code === '23502') {
          console.log('✅ 확진: consumer_id NOT NULL 제약조건 위반!');
          console.log('➡️  마이그레이션이 반드시 필요합니다!');
        } else if (insertError.code === '23505') {
          console.log('✅ 중복 제약조건 위반 (이미 응답 존재)');
          console.log('➡️  이 경우 consumer_id는 이미 NULL을 허용할 수 있습니다.');
        } else {
          console.log('기타 오류:', insertError.code, insertError.message);
        }
      } else {
        console.log('✅ 성공: 익명 응답 삽입 완료!');
        console.log('➡️  consumer_id가 이미 NULL을 허용합니다!');
        console.log('삽입된 ID:', insertData[0].id);
        
        // 테스트 데이터 정리
        console.log('\n3. 테스트 데이터 정리...');
        const { error: deleteError } = await supabase
          .from('survey_responses')
          .delete()
          .eq('id', insertData[0].id);
        
        if (!deleteError) {
          console.log('✅ 테스트 데이터 정리 완료');
        }
      }
    }

  } catch (error) {
    console.error('\n❌ 테스트 실행 중 오류:', error);
  }

  // 마이그레이션 SQL (최종 버전)
  console.log('\n' + '='.repeat(60));
  console.log('🎯 SUPABASE 마이그레이션 실행 가이드');
  console.log('='.repeat(60));
  console.log('\n📍 URL: https://supabase.com/dashboard/project/ytrgyuxqryzfbfnjkwqr/sql');
  console.log('\n🔥 중요: 각 단계를 순서대로 실행하고 결과를 확인하세요!\n');

  const sqlSteps = [
    {
      step: 1,
      title: '현재 consumer_id 컬럼 상태 확인',
      sql: `SELECT column_name, is_nullable, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'survey_responses' 
AND column_name = 'consumer_id';`
    },
    {
      step: 2,
      title: 'consumer_id를 NULL 허용으로 변경 ⚡핵심⚡',
      sql: `ALTER TABLE public.survey_responses 
ALTER COLUMN consumer_id DROP NOT NULL;`
    },
    {
      step: 3,
      title: '변경사항 확인 (is_nullable = YES 확인)',
      sql: `SELECT column_name, is_nullable, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'survey_responses' 
AND column_name = 'consumer_id';`
    },
    {
      step: 4,
      title: '조건부 UNIQUE 인덱스 생성',
      sql: `CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_logged_user_response 
ON public.survey_responses (survey_id, consumer_id) 
WHERE consumer_id IS NOT NULL;`
    },
    {
      step: 5,
      title: '테스트: 익명 응답 삽입 (실제 survey_id 필요)',
      sql: `-- 실제 survey_id를 사용하세요
-- INSERT INTO public.survey_responses (survey_id, consumer_id, responses)
-- VALUES ('실제-survey-id', NULL, '[]');`
    }
  ];

  sqlSteps.forEach(step => {
    console.log(`-- 📋 STEP ${step.step}: ${step.title}`);
    console.log(step.sql);
    console.log('');
  });

  console.log('🎯 핵심 확인사항:');
  console.log('✅ STEP 3에서 is_nullable이 "YES"로 변경되었는지 확인');
  console.log('✅ STEP 5에서 consumer_id=NULL 삽입이 성공하는지 확인');
  console.log('\n🚀 마이그레이션 완료 후 익명 사용자 응답이 가능해집니다!');
}

if (require.main === module) {
  realSurveyTest()
    .then(() => {
      console.log('\n✨ 마이그레이션 가이드 생성 완료');
      process.exit(0);
    })
    .catch((error) => {
      console.error('테스트 오류:', error);
      process.exit(1);
    });
}