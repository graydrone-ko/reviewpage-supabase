const { supabaseAdmin } = require('../src/lib/supabase.ts');

async function applySchemaChanges() {
  console.log('=== Supabase 스키마 변경 적용 ===');

  // Supabase에서 직접 SQL을 실행할 수 있는 방법들
  const sqlCommands = [
    // 1. consumer_id의 NOT NULL 제약조건 제거
    "ALTER TABLE public.survey_responses ALTER COLUMN consumer_id DROP NOT NULL;",
    
    // 2. 기존 UNIQUE 제약조건 제거 (있다면)
    "ALTER TABLE public.survey_responses DROP CONSTRAINT IF EXISTS survey_responses_survey_id_consumer_id_key;",
    
    // 3. 조건부 UNIQUE 인덱스 생성
    `CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_logged_user_response 
     ON public.survey_responses (survey_id, consumer_id) 
     WHERE consumer_id IS NOT NULL;`
  ];

  console.log('\n다음 SQL 명령들을 Supabase SQL Editor에서 실행해야 합니다:');
  console.log('(https://supabase.com/dashboard/project/ytrgyuxqryzfbfnjkwqr/sql/new)');
  console.log('\n--- 실행할 SQL 명령들 ---\n');

  sqlCommands.forEach((sql, index) => {
    console.log(`-- ${index + 1}. ${getCommandDescription(index)}`);
    console.log(sql);
    console.log('');
  });

  console.log('--- 검증 쿼리 ---');
  console.log('-- 변경사항 확인');
  console.log(`SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'survey_responses' 
    AND table_schema = 'public'
    AND column_name = 'consumer_id';`);

  console.log('\n-- 인덱스 확인');
  console.log(`SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'survey_responses' 
    AND schemaname = 'public';`);

  // 자동으로 변경사항을 적용하는 방법을 시도
  console.log('\n=== 자동 적용 시도 ===');
  
  try {
    // REST API를 통한 직접 SQL 실행은 제한이 있으므로
    // HTTP 요청으로 시도해보지만 성공할 가능성은 낮음
    console.log('Supabase REST API를 통한 스키마 변경은 보안상 제한되어 있습니다.');
    console.log('Supabase 대시보드의 SQL Editor를 사용해주세요.');
    
    return false;
  } catch (error) {
    console.error('자동 적용 실패:', error);
    return false;
  }
}

function getCommandDescription(index) {
  const descriptions = [
    'consumer_id 컬럼을 NULL 허용으로 변경',
    '기존 UNIQUE 제약조건 제거',
    '조건부 UNIQUE 인덱스 생성 (로그인 사용자만 중복 방지)'
  ];
  return descriptions[index] || '';
}

// 실행 후 테스트
async function testAfterChanges() {
  console.log('\n=== 변경 후 테스트 ===');
  
  try {
    // 익명 응답 테스트
    const { data: surveys } = await supabaseAdmin
      .from('surveys')
      .select('id')
      .limit(1);

    if (surveys && surveys.length > 0) {
      const testSurveyId = surveys[0].id;
      
      const anonymousResponse = {
        survey_id: testSurveyId,
        consumer_id: null, // 익명
        responses: [{ 
          stepId: 'test-step', 
          answers: [{ 
            value: '익명 응답 테스트', 
            questionId: 'test-question' 
          }] 
        }]
      };

      const { data, error } = await supabaseAdmin
        .from('survey_responses')
        .insert(anonymousResponse)
        .select();

      if (error) {
        console.error('❌ 익명 응답 테스트 실패:', error.message);
        return false;
      } else {
        console.log('✅ 익명 응답 테스트 성공');
        
        // 테스트 데이터 정리
        if (data && data.length > 0) {
          await supabaseAdmin
            .from('survey_responses')
            .delete()
            .eq('id', data[0].id);
          console.log('테스트 데이터 정리 완료');
        }
        return true;
      }
    }
  } catch (error) {
    console.error('테스트 중 오류:', error);
    return false;
  }
}

// 실행
if (require.main === module) {
  applySchemaChanges()
    .then(() => {
      console.log('\n📋 다음 단계:');
      console.log('1. Supabase 대시보드 로그인');
      console.log('2. SQL Editor에서 위의 SQL 명령들 실행');
      console.log('3. 스크립트 재실행으로 테스트: node scripts/check-schema-status.js');
      process.exit(0);
    })
    .catch((error) => {
      console.error('스크립트 실행 실패:', error);
      process.exit(1);
    });
}

module.exports = { applySchemaChanges, testAfterChanges };