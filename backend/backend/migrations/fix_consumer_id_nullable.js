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

async function runMigration() {
  console.log('=== Supabase 마이그레이션 시작: consumer_id NULL 허용 ===\n');

  try {
    // 1단계: 현재 상태 확인
    console.log('1단계: 현재 consumer_id 컬럼 상태 확인');
    const { data: currentState, error: currentError } = await supabase
      .rpc('execute_sql', {
        query: `
          SELECT column_name, is_nullable, data_type 
          FROM information_schema.columns 
          WHERE table_name = 'survey_responses' 
          AND column_name = 'consumer_id';
        `
      });

    if (currentError) {
      console.error('현재 상태 확인 중 오류:', currentError);
      // 직접 쿼리 시도
      const { data: directQuery, error: directError } = await supabase
        .from('survey_responses')
        .select('*')
        .limit(0);
      
      if (directError) {
        throw new Error(`테이블 접근 실패: ${directError.message}`);
      }
      console.log('테이블은 존재하지만 컬럼 정보 조회 실패. 직접 ALTER 시도합니다.');
    } else {
      console.log('현재 상태:', currentState);
    }

    // 2단계: consumer_id를 NULL 허용으로 변경
    console.log('\n2단계: consumer_id를 NULL 허용으로 변경');
    const { data: alterResult, error: alterError } = await supabase
      .rpc('execute_sql', {
        query: 'ALTER TABLE public.survey_responses ALTER COLUMN consumer_id DROP NOT NULL;'
      });

    if (alterError) {
      console.error('ALTER 쿼리 실행 중 오류:', alterError);
      throw alterError;
    }
    console.log('✅ consumer_id 컬럼을 NULL 허용으로 변경 완료');

    // 3단계: 변경사항 확인
    console.log('\n3단계: 변경사항 확인');
    const { data: verifyState, error: verifyError } = await supabase
      .rpc('execute_sql', {
        query: `
          SELECT column_name, is_nullable, data_type 
          FROM information_schema.columns 
          WHERE table_name = 'survey_responses' 
          AND column_name = 'consumer_id';
        `
      });

    if (verifyError) {
      console.error('변경사항 확인 중 오류:', verifyError);
    } else {
      console.log('변경 후 상태:', verifyState);
      const isNullable = verifyState?.[0]?.is_nullable;
      if (isNullable === 'YES') {
        console.log('✅ 성공: consumer_id가 NULL 허용으로 변경되었습니다!');
      } else {
        console.log('⚠️  확인 필요: is_nullable 값이 예상과 다릅니다:', isNullable);
      }
    }

    // 4단계: 조건부 UNIQUE 인덱스 생성
    console.log('\n4단계: 조건부 UNIQUE 인덱스 생성 (로그인 사용자만 중복 방지)');
    const { data: indexResult, error: indexError } = await supabase
      .rpc('execute_sql', {
        query: `
          CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_logged_user_response 
          ON public.survey_responses (survey_id, consumer_id) 
          WHERE consumer_id IS NOT NULL;
        `
      });

    if (indexError) {
      console.error('인덱스 생성 중 오류:', indexError);
      console.log('⚠️  인덱스 생성은 실패했지만 주요 마이그레이션은 완료되었습니다.');
    } else {
      console.log('✅ 조건부 UNIQUE 인덱스 생성 완료');
    }

    console.log('\n=== 마이그레이션 완료 ===');
    console.log('이제 익명 사용자도 survey_responses에 응답을 저장할 수 있습니다.');

  } catch (error) {
    console.error('\n❌ 마이그레이션 실행 중 오류 발생:', error);
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  runMigration()
    .then(() => {
      console.log('\n마이그레이션 스크립트 완료');
      process.exit(0);
    })
    .catch((error) => {
      console.error('마이그레이션 스크립트 오류:', error);
      process.exit(1);
    });
}

module.exports = { runMigration };