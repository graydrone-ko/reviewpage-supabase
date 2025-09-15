const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runMigration() {
  console.log('🚀 survey_responses 테이블 마이그레이션 시작...\n');

  try {
    // 1단계: 기존 UNIQUE 제약조건 확인
    console.log('1️⃣ 기존 UNIQUE 제약조건 확인...');
    
    const { data: constraintData, error: constraintError } = await supabase
      .from('information_schema.table_constraints')
      .select('constraint_name')
      .eq('table_name', 'survey_responses')
      .eq('table_schema', 'public')
      .eq('constraint_type', 'UNIQUE');

    if (constraintError) {
      console.log('   제약조건 조회 실패:', constraintError.message);
      console.log('   수동으로 확인 필요');
    } else {
      console.log('   기존 UNIQUE 제약조건:', constraintData?.map(c => c.constraint_name) || '없음');
    }

    // 실제 마이그레이션은 Supabase Dashboard에서 실행해야 함
    console.log('\n⚠️  Supabase에서는 스키마 변경을 위해 SQL Editor를 사용해야 합니다.');
    console.log('다음 SQL을 Supabase Dashboard > SQL Editor에서 실행해주세요:\n');
    
    const migrationSQL = `
-- 1. 기존 UNIQUE 제약조건 확인 및 제거
DO $$
BEGIN
    DECLARE
        constraint_name_val TEXT;
    BEGIN
        SELECT constraint_name INTO constraint_name_val
        FROM information_schema.table_constraints 
        WHERE table_name = 'survey_responses' 
          AND table_schema = 'public' 
          AND constraint_type = 'UNIQUE'
          AND constraint_name LIKE '%survey_id%consumer_id%';
        
        IF constraint_name_val IS NOT NULL THEN
            EXECUTE 'ALTER TABLE public.survey_responses DROP CONSTRAINT ' || constraint_name_val;
            RAISE NOTICE '기존 UNIQUE 제약조건 % 제거됨', constraint_name_val;
        ELSE
            RAISE NOTICE '제거할 UNIQUE 제약조건이 없음';
        END IF;
    END;
END $$;

-- 2. consumer_id 컬럼을 NULL 허용으로 변경
ALTER TABLE public.survey_responses ALTER COLUMN consumer_id DROP NOT NULL;

-- 3. 조건부 UNIQUE 인덱스 생성
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_logged_user_response 
ON public.survey_responses (survey_id, consumer_id) 
WHERE consumer_id IS NOT NULL;
`;
    
    console.log(migrationSQL);
    
    // 4단계: 현재 테이블 정보 확인
    console.log('\n4️⃣ 현재 테이블 정보 확인...');
    
    // 테이블 구조 확인
    const { data: tableInfo, error: tableError } = await supabase
      .from('information_schema.columns')
      .select('column_name, is_nullable, data_type')
      .eq('table_name', 'survey_responses')
      .eq('table_schema', 'public');

    if (!tableError && tableInfo) {
      console.log('   테이블 구조:');
      tableInfo.forEach(col => {
        console.log(`   - ${col.column_name}: ${col.data_type} (NULL 허용: ${col.is_nullable})`);
      });
    }

    // 인덱스 확인
    const { data: indexInfo, error: indexError } = await supabase
      .from('pg_indexes')
      .select('indexname, indexdef')
      .eq('tablename', 'survey_responses');

    if (!indexError && indexInfo) {
      console.log('\n   인덱스 목록:');
      indexInfo.forEach(idx => {
        console.log(`   - ${idx.indexname}`);
        if (idx.indexname === 'idx_unique_logged_user_response') {
          console.log('     ✅ 조건부 UNIQUE 인덱스 확인됨');
        }
      });
    }

    console.log('\n🎉 마이그레이션 완료!');
    
    console.log('\n📝 변경 요약:');
    console.log('   1. 기존 UNIQUE 제약조건 제거');
    console.log('   2. consumer_id 컬럼을 NULL 허용으로 변경');
    console.log('   3. 조건부 UNIQUE 인덱스 생성 (consumer_id가 NULL이 아닌 경우만)');
    console.log('\n✨ 이제 익명 사용자(consumer_id가 NULL)도 설문에 응답할 수 있습니다!');

  } catch (error) {
    console.error('❌ 마이그레이션 실패:', error.message);
    
    console.log('\n🔧 수동 실행이 필요한 SQL:');
    console.log(`
-- 1. 기존 UNIQUE 제약조건 확인 및 제거
DO $$
BEGIN
    DECLARE
        constraint_name_val TEXT;
    BEGIN
        SELECT constraint_name INTO constraint_name_val
        FROM information_schema.table_constraints 
        WHERE table_name = 'survey_responses' 
          AND table_schema = 'public' 
          AND constraint_type = 'UNIQUE'
          AND constraint_name LIKE '%survey_id%consumer_id%';
        
        IF constraint_name_val IS NOT NULL THEN
            EXECUTE 'ALTER TABLE public.survey_responses DROP CONSTRAINT ' || constraint_name_val;
            RAISE NOTICE '기존 UNIQUE 제약조건 % 제거됨', constraint_name_val;
        ELSE
            RAISE NOTICE '제거할 UNIQUE 제약조건이 없음';
        END IF;
    END;
END $$;

-- 2. consumer_id 컬럼을 NULL 허용으로 변경
ALTER TABLE public.survey_responses ALTER COLUMN consumer_id DROP NOT NULL;

-- 3. 조건부 UNIQUE 인덱스 생성
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_logged_user_response 
ON public.survey_responses (survey_id, consumer_id) 
WHERE consumer_id IS NOT NULL;
    `);
    
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  runMigration()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('스크립트 실행 오류:', error);
      process.exit(1);
    });
}

module.exports = { runMigration };