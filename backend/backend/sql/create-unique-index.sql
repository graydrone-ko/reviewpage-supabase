-- 로그인 사용자의 중복 응답 방지를 위한 UNIQUE 인덱스 생성
-- 2025-09-15: 로그인한 사용자가 동일한 설문에 중복 응답하는 것을 데이터베이스 레벨에서 차단

-- UNIQUE 인덱스 생성 (consumer_id가 NULL이 아닌 경우만)
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_logged_user_response 
ON public.survey_responses (survey_id, consumer_id) 
WHERE consumer_id IS NOT NULL;

-- 인덱스 생성 완료 메시지
SELECT 'idx_unique_logged_user_response 인덱스가 성공적으로 생성되었습니다.' as result;

-- 생성된 인덱스 확인
SELECT 
    indexname,
    indexdef 
FROM pg_indexes 
WHERE tablename = 'survey_responses' 
  AND indexname = 'idx_unique_logged_user_response';

-- 테이블의 모든 인덱스 확인
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'survey_responses' 
ORDER BY indexname;

-- 테이블 제약조건 확인
SELECT constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'survey_responses'
AND table_schema = 'public';