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

async function checkSchema() {
  console.log('=== survey_responses 테이블 스키마 확인 ===\n');

  try {
    // 1. 실제 데이터 확인
    console.log('1. 테이블 데이터 샘플 확인');
    const { data: sampleData, error: sampleError } = await supabase
      .from('survey_responses')
      .select('*')
      .limit(1);

    if (sampleError) {
      console.error('샘플 데이터 조회 오류:', sampleError);
    } else {
      console.log('샘플 데이터 (구조 확인용):');
      if (sampleData.length > 0) {
        console.log('컬럼들:', Object.keys(sampleData[0]));
        console.log('첫 번째 레코드:', sampleData[0]);
      } else {
        console.log('테이블에 데이터가 없습니다.');
      }
    }

    // 2. 최소한의 테스트 삽입
    console.log('\n2. 최소한의 익명 응답 테스트');
    const testResponse = {
      survey_id: 'test-' + Date.now(),
      consumer_id: null,
      step_responses: {}
    };

    const { data: insertData, error: insertError } = await supabase
      .from('survey_responses')
      .insert(testResponse)
      .select();

    if (insertError) {
      console.error('❌ 익명 응답 삽입 실패:', insertError);
      
      // 오류 코드별 분석
      if (insertError.code === '23502') {
        console.log('\n✅ 확인: consumer_id NOT NULL 제약조건 위반');
        console.log('➡️  마이그레이션이 필요합니다!');
      } else if (insertError.message.includes('Could not find')) {
        console.log('\n테이블 스키마가 예상과 다릅니다.');
        console.log('실제 컬럼명을 확인해야 합니다.');
      }
    } else {
      console.log('✅ 익명 응답 삽입 성공! (이미 NULL 허용됨)');
      console.log('삽입된 데이터:', insertData);
      
      // 테스트 데이터 정리
      const { error: deleteError } = await supabase
        .from('survey_responses')
        .delete()
        .eq('survey_id', testResponse.survey_id);
      
      if (!deleteError) {
        console.log('✅ 테스트 데이터 정리 완료');
      }
    }

  } catch (error) {
    console.error('\n❌ 스키마 확인 중 오류 발생:', error);
  }

  // 실행할 SQL 다시 출력
  console.log('\n=== Supabase SQL Editor에서 실행할 명령어 ===');
  console.log('https://supabase.com/dashboard 에서 SQL Editor를 열고 다음을 실행하세요:\n');
  
  console.log('-- STEP 1: 현재 consumer_id 컬럼 상태 확인');
  console.log(`SELECT column_name, is_nullable, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'survey_responses' 
AND column_name = 'consumer_id';`);
  
  console.log('\n-- STEP 2: consumer_id를 NULL 허용으로 변경');
  console.log('ALTER TABLE public.survey_responses ALTER COLUMN consumer_id DROP NOT NULL;');
  
  console.log('\n-- STEP 3: 변경 후 상태 확인');
  console.log(`SELECT column_name, is_nullable, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'survey_responses' 
AND column_name = 'consumer_id';`);
  
  console.log('\n-- STEP 4: 조건부 UNIQUE 인덱스 생성');
  console.log(`CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_logged_user_response 
ON public.survey_responses (survey_id, consumer_id) 
WHERE consumer_id IS NOT NULL;`);

  console.log('\n-- STEP 5: 테스트 삽입으로 검증');
  console.log(`INSERT INTO public.survey_responses (survey_id, consumer_id, step_responses) 
VALUES ('test-anonymous-' || extract(epoch from now()), NULL, '{}');`);
  
  console.log('\n-- STEP 6: 테스트 데이터 확인 및 정리');
  console.log(`SELECT * FROM public.survey_responses WHERE survey_id LIKE 'test-anonymous-%';`);
  console.log(`DELETE FROM public.survey_responses WHERE survey_id LIKE 'test-anonymous-%';`);
}

if (require.main === module) {
  checkSchema()
    .then(() => {
      console.log('\n스키마 확인 완료');
      process.exit(0);
    })
    .catch((error) => {
      console.error('스키마 확인 오류:', error);
      process.exit(1);
    });
}