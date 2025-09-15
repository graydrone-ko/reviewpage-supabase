-- Survey Responses Consumer ID 마이그레이션
-- 목적: consumer_id를 NULL 허용으로 변경하여 익명 응답 지원
-- 실행 위치: Supabase Dashboard > SQL Editor
-- 작성일: 2025-09-15

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
-- consumer_id가 NULL이 아닌 경우에만 UNIQUE 제약 적용
-- 이를 통해 로그인 사용자는 한 설문에 한 번만 응답하고, 익명 사용자는 여러 번 응답 가능
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_logged_user_response 
ON public.survey_responses (survey_id, consumer_id) 
WHERE consumer_id IS NOT NULL;

-- 4. 변경사항 확인
SELECT 
    column_name, 
    data_type, 
    is_nullable 
FROM information_schema.columns 
WHERE table_name = 'survey_responses' 
  AND table_schema = 'public' 
  AND column_name = 'consumer_id';

-- 5. 인덱스 확인
SELECT 
    indexname, 
    indexdef 
FROM pg_indexes 
WHERE tablename = 'survey_responses'
  AND indexname = 'idx_unique_logged_user_response';

-- 마이그레이션 완료 후 예상 결과:
-- 1. consumer_id 컬럼이 NULL 허용으로 변경됨
-- 2. 로그인 사용자 중복 응답 방지 인덱스 생성됨
-- 3. 익명 사용자는 consumer_id가 NULL로 여러 응답 가능