-- Survey Responses 테이블 스키마 수정
-- 익명 사용자 응답 허용을 위한 변경

-- 1. 기존 UNIQUE 제약조건 확인 및 제거
-- (survey_id, consumer_id) 조합의 UNIQUE 제약조건이 있다면 제거)
DO $$
BEGIN
    -- 제약조건 이름을 동적으로 찾아서 제거
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

-- 3. 로그인한 사용자만 중복 응답 방지하는 조건부 UNIQUE 인덱스 생성
-- (consumer_id가 NULL이 아닌 경우에만 중복 방지)
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_logged_user_response 
ON public.survey_responses (survey_id, consumer_id) 
WHERE consumer_id IS NOT NULL;

-- 4. 변경사항 확인을 위한 쿼리
-- 실행 후 결과를 확인하세요
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
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
    AND schemaname = 'public'
    AND indexname LIKE '%unique%';

-- 6. 테스트를 위한 임시 데이터 (선택사항)
-- 익명 응답이 정상적으로 삽입되는지 확인
-- INSERT INTO public.survey_responses (survey_id, consumer_id, responses)
-- VALUES (
--     (SELECT id FROM public.surveys LIMIT 1),
--     NULL,
--     '[{"stepId": "test", "answers": [{"value": "익명 테스트", "questionId": "test"}]}]'::jsonb
-- );

-- 위 INSERT 문은 주석 처리되어 있습니다. 
-- 필요시 주석을 해제하고 실행하여 테스트하세요.