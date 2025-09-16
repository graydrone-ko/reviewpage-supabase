#!/usr/bin/env node

/**
 * 익명 응답을 위한 마이그레이션 스크립트
 * consumer_id 컬럼을 NULL 허용으로 변경하고 조건부 UNIQUE 인덱스 생성
 */

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

async function executeMigration() {
  console.log('🚀 익명 응답 마이그레이션 시작...\n');

  try {
    // 1. 현재 제약조건 확인을 위한 테스트 삽입
    console.log('1. 현재 상태 확인:');
    
    const testInsert = {
      survey_id: '00000000-0000-0000-0000-000000000000', // 존재하지 않는 ID
      consumer_id: null,
      responses: { test: 'test' }
    };

    const { error: preTestError } = await supabase
      .from('survey_responses')
      .insert(testInsert);

    if (preTestError && preTestError.code === '23502') {
      console.log('✅ 확인됨: consumer_id가 NOT NULL 제약조건을 가지고 있음');
      console.log('📝 마이그레이션이 필요합니다.\n');
    } else if (preTestError && preTestError.code === '23503') {
      console.log('❌ 예상치 못한 상황: consumer_id는 NULL 허용이지만 외래키 제약조건 오류');
      console.log('📝 이미 마이그레이션이 완료되었을 수 있습니다.\n');
    } else {
      console.log('⚠️  예상치 못한 응답:', preTestError);
    }

    // 2. 마이그레이션 실행
    console.log('2. 마이그레이션 실행:');
    
    // Step 1: consumer_id 컬럼을 NULL 허용으로 변경
    console.log('   Step 1: consumer_id 컬럼 NOT NULL 제약조건 제거...');
    
    // Supabase에서는 직접 SQL 실행이 제한적이므로, 
    // Supabase Dashboard나 CLI를 통해 실행해야 함
    console.log(`
    🔧 다음 SQL을 Supabase Dashboard의 SQL Editor에서 실행하세요:
    
    -- Step 1: consumer_id 컬럼을 NULL 허용으로 변경
    ALTER TABLE public.survey_responses 
    ALTER COLUMN consumer_id DROP NOT NULL;
    
    -- Step 2: 기존 UNIQUE 제약조건이 있다면 제거
    -- (먼저 확인 후 실행)
    -- DROP INDEX IF EXISTS survey_responses_survey_id_consumer_id_key;
    
    -- Step 3: 조건부 UNIQUE 인덱스 생성 (로그인 사용자만 중복 방지)
    CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_logged_user_response 
    ON public.survey_responses (survey_id, consumer_id) 
    WHERE consumer_id IS NOT NULL;
    
    ✅ 마이그레이션 SQL 준비됨
    `);

    // 3. 마이그레이션 검증 스크립트 안내
    console.log('\n3. 마이그레이션 완료 후 검증:');
    console.log('   마이그레이션 실행 후 다음 스크립트로 검증하세요:');
    console.log('   node scripts/test-anonymous-response.js');

  } catch (error) {
    console.error('❌ 마이그레이션 준비 실패:', error);
  }
}

// 직접 실행 시에만 executeMigration 호출
if (require.main === module) {
  executeMigration()
    .then(() => {
      console.log('\n✅ 마이그레이션 스크립트 완료');
      console.log('📋 위의 SQL을 Supabase Dashboard에서 실행하세요.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ 스크립트 실행 실패:', error);
      process.exit(1);
    });
}

module.exports = { executeMigration };