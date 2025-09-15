const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyMigration() {
  console.log('🔍 마이그레이션 검증 시작...\n');

  try {
    // 1. consumer_id 컬럼 NULL 허용 여부 확인
    console.log('1️⃣ consumer_id 컬럼 구조 확인...');
    
    const { data: columnInfo, error: columnError } = await supabase
      .from('survey_responses')
      .select('consumer_id')
      .limit(1);

    if (columnError) {
      console.log('   ❌ 테이블 접근 실패:', columnError.message);
    } else {
      console.log('   ✅ survey_responses 테이블 접근 가능');
    }

    // 2. 익명 응답 테스트 (NULL consumer_id 삽입 시도)
    console.log('\n2️⃣ 익명 응답 테스트...');
    
    const testResponse = {
      survey_id: 'test-survey-id',
      consumer_id: null,
      responses: { test: 'anonymous response test' }
    };

    const { data: insertData, error: insertError } = await supabase
      .from('survey_responses')
      .insert(testResponse)
      .select();

    if (insertError) {
      if (insertError.message.includes('null value in column "consumer_id"')) {
        console.log('   ❌ consumer_id가 아직 NULL을 허용하지 않습니다.');
        console.log('   📋 마이그레이션 SQL을 Supabase Dashboard에서 실행해주세요.');
      } else {
        console.log('   ⚠️ 다른 오류:', insertError.message);
      }
    } else {
      console.log('   ✅ 익명 응답 삽입 성공!');
      
      // 테스트 데이터 정리
      if (insertData && insertData[0]) {
        await supabase
          .from('survey_responses')
          .delete()
          .eq('id', insertData[0].id);
        console.log('   🧹 테스트 데이터 정리 완료');
      }
    }

    // 3. 로그인 사용자 중복 방지 테스트
    console.log('\n3️⃣ 로그인 사용자 중복 방지 테스트...');
    
    const loggedUserResponse = {
      survey_id: 'test-survey-id',
      consumer_id: 'test-user-id',
      responses: { test: 'logged user response test' }
    };

    // 첫 번째 응답 삽입
    const { data: firstResponse, error: firstError } = await supabase
      .from('survey_responses')
      .insert(loggedUserResponse)
      .select();

    if (firstError) {
      console.log('   ⚠️ 첫 번째 응답 삽입 실패:', firstError.message);
    } else {
      console.log('   ✅ 첫 번째 응답 삽입 성공');

      // 동일 사용자 중복 응답 시도
      const { data: duplicateResponse, error: duplicateError } = await supabase
        .from('survey_responses')
        .insert(loggedUserResponse)
        .select();

      if (duplicateError) {
        if (duplicateError.message.includes('duplicate') || duplicateError.message.includes('unique')) {
          console.log('   ✅ 중복 응답 방지 작동 중!');
        } else {
          console.log('   ⚠️ 예상과 다른 오류:', duplicateError.message);
        }
      } else {
        console.log('   ❌ 중복 응답이 허용되었습니다. 인덱스 확인 필요');
      }

      // 테스트 데이터 정리
      if (firstResponse && firstResponse[0]) {
        await supabase
          .from('survey_responses')
          .delete()
          .eq('id', firstResponse[0].id);
        console.log('   🧹 테스트 데이터 정리 완료');
      }
    }

    console.log('\n📊 검증 완료!');
    
    // 4. 실제 데이터 현황 확인
    console.log('\n4️⃣ 현재 데이터 현황...');
    
    const { data: stats, error: statsError } = await supabase
      .from('survey_responses')
      .select('consumer_id', { count: 'exact', head: true });

    if (!statsError) {
      console.log(`   📈 총 응답 수: ${stats || 0}`);
    }

    const { data: nullResponses, error: nullError } = await supabase
      .from('survey_responses')
      .select('consumer_id', { count: 'exact', head: true })
      .is('consumer_id', null);

    if (!nullError) {
      console.log(`   👤 익명 응답 수: ${nullResponses || 0}`);
    }

  } catch (error) {
    console.error('❌ 검증 중 오류 발생:', error.message);
  }
}

// 스크립트 실행
if (require.main === module) {
  verifyMigration()
    .then(() => {
      console.log('\n✨ 검증 완료');
      process.exit(0);
    })
    .catch((error) => {
      console.error('스크립트 실행 오류:', error);
      process.exit(1);
    });
}

module.exports = { verifyMigration };