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

async function testCurrentState() {
  console.log('=== Supabase 테이블 상태 확인 ===\n');

  try {
    // 1. 테이블 존재 및 접근 가능성 확인
    console.log('1. survey_responses 테이블 접근 테스트');
    const { data: testData, error: testError } = await supabase
      .from('survey_responses')
      .select('consumer_id')
      .limit(1);

    if (testError) {
      console.error('테이블 접근 오류:', testError);
      return;
    }
    console.log('✅ 테이블 접근 성공');

    // 2. 현재 NULL 값이 있는지 확인
    console.log('\n2. 현재 consumer_id가 NULL인 레코드 확인');
    const { data: nullRecords, error: nullError } = await supabase
      .from('survey_responses')
      .select('id, consumer_id, created_at')
      .is('consumer_id', null);

    if (nullError) {
      console.error('NULL 레코드 조회 오류:', nullError);
    } else {
      console.log(`현재 consumer_id가 NULL인 레코드 수: ${nullRecords.length}`);
      if (nullRecords.length > 0) {
        console.log('✅ 이미 NULL 값이 허용되어 있습니다!');
        console.log('샘플 NULL 레코드:', nullRecords.slice(0, 3));
      } else {
        console.log('NULL 레코드가 없습니다. 아직 NULL이 허용되지 않을 수 있습니다.');
      }
    }

    // 3. 익명 응답 삽입 테스트
    console.log('\n3. 익명 응답 삽입 테스트');
    const testResponse = {
      survey_id: 'test-survey-id-' + Date.now(),
      consumer_id: null,
      responses: { test: true },
      completed: false,
      created_at: new Date().toISOString()
    };

    const { data: insertData, error: insertError } = await supabase
      .from('survey_responses')
      .insert(testResponse)
      .select();

    if (insertError) {
      console.error('❌ 익명 응답 삽입 실패:', insertError);
      console.log('\n이 오류가 발생하는 이유:');
      console.log('- consumer_id 컬럼에 NOT NULL 제약조건이 있을 가능성');
      console.log('- 다른 제약조건이나 트리거가 있을 가능성');
      
      // 구체적인 오류 코드 확인
      if (insertError.code === '23502') {
        console.log('\n확인: PostgreSQL 23502 오류 = NOT NULL 제약조건 위반');
        console.log('➡️  consumer_id를 NULL 허용으로 변경해야 합니다.');
      }
    } else {
      console.log('✅ 익명 응답 삽입 성공!');
      console.log('삽입된 데이터:', insertData);
      
      // 테스트 데이터 정리
      console.log('\n4. 테스트 데이터 정리');
      const { error: deleteError } = await supabase
        .from('survey_responses')
        .delete()
        .eq('survey_id', testResponse.survey_id);
      
      if (deleteError) {
        console.log('테스트 데이터 삭제 오류:', deleteError);
      } else {
        console.log('✅ 테스트 데이터 정리 완료');
      }
    }

    // 4. 실행해야 할 SQL 출력
    console.log('\n=== 실행해야 할 SQL ===');
    console.log('Supabase SQL Editor에서 다음 SQL을 실행하세요:');
    console.log('');
    console.log('-- 1. 현재 상태 확인');
    console.log(`SELECT column_name, is_nullable, data_type 
FROM information_schema.columns 
WHERE table_name = 'survey_responses' 
AND column_name = 'consumer_id';`);
    console.log('');
    console.log('-- 2. consumer_id를 NULL 허용으로 변경');
    console.log('ALTER TABLE public.survey_responses ALTER COLUMN consumer_id DROP NOT NULL;');
    console.log('');
    console.log('-- 3. 변경사항 확인');
    console.log(`SELECT column_name, is_nullable, data_type 
FROM information_schema.columns 
WHERE table_name = 'survey_responses' 
AND column_name = 'consumer_id';`);
    console.log('');
    console.log('-- 4. 조건부 UNIQUE 인덱스 생성 (로그인 사용자만 중복 방지)');
    console.log(`CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_logged_user_response 
ON public.survey_responses (survey_id, consumer_id) 
WHERE consumer_id IS NOT NULL;`);

  } catch (error) {
    console.error('\n❌ 테스트 실행 중 오류 발생:', error);
  }
}

// 스크립트 실행
if (require.main === module) {
  testCurrentState()
    .then(() => {
      console.log('\n테스트 완료');
      process.exit(0);
    })
    .catch((error) => {
      console.error('테스트 오류:', error);
      process.exit(1);
    });
}

module.exports = { testCurrentState };