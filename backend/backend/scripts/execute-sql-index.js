#!/usr/bin/env node

// 환경 변수 로드
require('dotenv').config();

const { supabaseAdmin } = require('../dist/src/lib/supabase');

async function executeSQLQueries() {
  console.log('=== SQL 인덱스 생성 및 확인 실행 ===\n');
  
  try {
    // 1. 로그인 사용자 중복 응답 방지 UNIQUE 인덱스 생성
    console.log('1. 로그인 사용자 중복 응답 방지 인덱스 생성 중...');
    const createIndexSQL = `
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_logged_user_response
ON public.survey_responses (survey_id, consumer_id)
WHERE consumer_id IS NOT NULL;
    `;

    const { error: indexError } = await supabaseAdmin.rpc('exec_sql', {
      sql: createIndexSQL.trim()
    });

    if (indexError) {
      console.error('❌ 인덱스 생성 실패 (RPC 방식):', indexError.message);
      console.log('\n=== Supabase SQL Editor에서 직접 실행하세요 ===');
      console.log(createIndexSQL.trim());
      console.log('====================================================\n');
    } else {
      console.log('✅ 인덱스 생성 성공\n');
    }

    // 2. 인덱스 생성 확인
    console.log('2. 인덱스 생성 확인...');
    const checkIndexSQL = `
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'survey_responses' 
AND indexname = 'idx_unique_logged_user_response';
    `;

    const { data: indexData, error: checkError } = await supabaseAdmin.rpc('exec_sql', {
      sql: checkIndexSQL.trim()
    });

    if (checkError) {
      console.error('❌ 인덱스 확인 실패 (RPC 방식):', checkError.message);
      console.log('\n=== 확인 SQL을 Supabase SQL Editor에서 직접 실행하세요 ===');
      console.log(checkIndexSQL.trim());
      console.log('====================================================\n');
    } else {
      console.log('✅ 인덱스 확인 결과:');
      console.log(JSON.stringify(indexData, null, 2));
      console.log('');
    }

    // 3. 모든 survey_responses 인덱스 확인
    console.log('3. 모든 survey_responses 인덱스 확인...');
    const allIndexesSQL = `
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'survey_responses' 
ORDER BY indexname;
    `;

    const { data: allIndexesData, error: allIndexesError } = await supabaseAdmin.rpc('exec_sql', {
      sql: allIndexesSQL.trim()
    });

    if (allIndexesError) {
      console.error('❌ 전체 인덱스 확인 실패 (RPC 방식):', allIndexesError.message);
      console.log('\n=== 전체 인덱스 확인 SQL을 Supabase SQL Editor에서 직접 실행하세요 ===');
      console.log(allIndexesSQL.trim());
      console.log('====================================================\n');
    } else {
      console.log('✅ 모든 survey_responses 인덱스:');
      console.log(JSON.stringify(allIndexesData, null, 2));
      console.log('');
    }

    // 4. 제약조건 확인
    console.log('4. 제약조건 확인...');
    const constraintsSQL = `
SELECT constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'survey_responses'
AND table_schema = 'public';
    `;

    const { data: constraintsData, error: constraintsError } = await supabaseAdmin.rpc('exec_sql', {
      sql: constraintsSQL.trim()
    });

    if (constraintsError) {
      console.error('❌ 제약조건 확인 실패 (RPC 방식):', constraintsError.message);
      console.log('\n=== 제약조건 확인 SQL을 Supabase SQL Editor에서 직접 실행하세요 ===');
      console.log(constraintsSQL.trim());
      console.log('====================================================\n');
    } else {
      console.log('✅ 제약조건 확인 결과:');
      console.log(JSON.stringify(constraintsData, null, 2));
      console.log('');
    }

    console.log('=== 실행 완료 ===');
    
    // RPC가 실패할 경우를 대비한 전체 SQL 안내
    if (indexError || checkError || allIndexesError || constraintsError) {
      console.log('\n' + '='.repeat(60));
      console.log('RPC 실행에 실패한 SQL이 있습니다.');
      console.log('다음 SQL을 Supabase SQL Editor에서 순서대로 실행하세요:');
      console.log('='.repeat(60));
      
      console.log('\n-- 1. 인덱스 생성');
      console.log(createIndexSQL.trim());
      
      console.log('\n-- 2. 인덱스 생성 확인');
      console.log(checkIndexSQL.trim());
      
      console.log('\n-- 3. 모든 인덱스 확인');
      console.log(allIndexesSQL.trim());
      
      console.log('\n-- 4. 제약조건 확인');
      console.log(constraintsSQL.trim());
      
      console.log('\n' + '='.repeat(60));
    }
    
  } catch (err) {
    console.error('❌ 스크립트 실행 중 오류 발생:', err.message);
    console.log('\n=== 수동 실행용 SQL ===');
    console.log(`
-- 인덱스 생성
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_logged_user_response
ON public.survey_responses (survey_id, consumer_id)
WHERE consumer_id IS NOT NULL;

-- 인덱스 확인
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'survey_responses' 
AND indexname = 'idx_unique_logged_user_response';

-- 모든 인덱스 확인
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'survey_responses' 
ORDER BY indexname;

-- 제약조건 확인
SELECT constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'survey_responses'
AND table_schema = 'public';
    `.trim());
    console.log('=====================');
  }
}

// 메인 실행
if (require.main === module) {
  executeSQLQueries().then(() => {
    console.log('\n✅ 스크립트 실행 완료');
    process.exit(0);
  }).catch((err) => {
    console.error('❌ 스크립트 실행 실패:', err);
    process.exit(1);
  });
}

module.exports = { executeSQLQueries };