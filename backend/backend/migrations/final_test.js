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

async function finalTest() {
  console.log('=== 최종 익명 응답 테스트 ===\n');

  try {
    // 올바른 스키마로 테스트
    console.log('실제 테이블 구조에 맞춰 익명 응답 테스트 진행...');
    
    const testResponse = {
      survey_id: 'test-anonymous-' + Date.now(),
      consumer_id: null,  // 이 부분이 문제
      responses: []
    };

    console.log('테스트 데이터:', testResponse);

    const { data: insertData, error: insertError } = await supabase
      .from('survey_responses')
      .insert(testResponse)
      .select();

    if (insertError) {
      console.error('❌ 익명 응답 삽입 실패:', insertError);
      console.log('\n🔍 오류 분석:');
      console.log('Code:', insertError.code);
      console.log('Message:', insertError.message);
      
      if (insertError.code === '23502') {
        console.log('\n✅ 확진: consumer_id에 NOT NULL 제약조건이 있습니다!');
        console.log('➡️  반드시 마이그레이션을 실행해야 합니다.');
      }
    } else {
      console.log('✅ 성공: 익명 응답 삽입 완료!');
      console.log('이미 consumer_id가 NULL을 허용합니다.');
      console.log('삽입된 데이터:', insertData);
      
      // 정리
      await supabase
        .from('survey_responses')
        .delete()
        .eq('survey_id', testResponse.survey_id);
      console.log('✅ 테스트 데이터 정리 완료');
    }

  } catch (error) {
    console.error('\n❌ 테스트 실행 중 오류:', error);
  }

  console.log('\n=== 📋 실행 지침 ===');
  console.log('1. https://supabase.com/dashboard/project/ytrgyuxqryzfbfnjkwqr 접속');
  console.log('2. 좌측 메뉴에서 "SQL Editor" 클릭');
  console.log('3. 아래 SQL을 순서대로 실행:');
  console.log('');
  console.log('-- 🔍 STEP 1: 현재 상태 확인');
  console.log('SELECT column_name, is_nullable, data_type');
  console.log('FROM information_schema.columns');
  console.log("WHERE table_name = 'survey_responses'"); 
  console.log("AND column_name = 'consumer_id';");
  console.log('');
  console.log('-- ⚡ STEP 2: NULL 허용으로 변경 (핵심)');
  console.log('ALTER TABLE public.survey_responses');
  console.log('ALTER COLUMN consumer_id DROP NOT NULL;');
  console.log('');
  console.log('-- ✅ STEP 3: 변경 확인 (is_nullable = YES 되어야 함)');
  console.log('SELECT column_name, is_nullable, data_type');
  console.log('FROM information_schema.columns');
  console.log("WHERE table_name = 'survey_responses'"); 
  console.log("AND column_name = 'consumer_id';");
  console.log('');
  console.log('-- 🛡️ STEP 4: 조건부 인덱스 (로그인 유저만 중복 방지)');
  console.log('CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_logged_user_response');
  console.log('ON public.survey_responses (survey_id, consumer_id)');
  console.log('WHERE consumer_id IS NOT NULL;');
  console.log('');
  console.log('-- 🧪 STEP 5: 테스트 (익명 응답 삽입)');
  console.log("INSERT INTO public.survey_responses (survey_id, consumer_id, responses)");
  console.log("VALUES ('test-anonymous-verification', NULL, '[]');");
  console.log('');
  console.log('-- 🗑️ STEP 6: 테스트 데이터 정리');
  console.log("DELETE FROM public.survey_responses WHERE survey_id = 'test-anonymous-verification';");
  console.log('');
  console.log('✨ STEP 2 실행 후 is_nullable이 "YES"로 변경되었는지 반드시 확인하세요!');
}

if (require.main === module) {
  finalTest()
    .then(() => {
      console.log('\n테스트 완료');
      process.exit(0);
    })
    .catch((error) => {
      console.error('테스트 오류:', error);
      process.exit(1);
    });
}