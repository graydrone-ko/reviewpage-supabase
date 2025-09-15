-- 익명 사용자 응답 허용을 위한 스키마 수정
-- 2025-09-15: survey_responses 테이블 수정

-- 1. 기존 UNIQUE 제약조건 제거
ALTER TABLE public.survey_responses DROP CONSTRAINT IF EXISTS survey_responses_survey_id_consumer_id_key;

-- 2. consumer_id 컬럼을 NULL 허용으로 변경
ALTER TABLE public.survey_responses ALTER COLUMN consumer_id DROP NOT NULL;

-- 3. 로그인한 사용자만 중복 응답 방지하는 조건부 UNIQUE 인덱스 생성
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_logged_user_response 
ON public.survey_responses (survey_id, consumer_id) 
WHERE consumer_id IS NOT NULL;

-- 4. 기존 인덱스가 있다면 업데이트
DROP INDEX IF EXISTS idx_survey_responses_consumer_id;
CREATE INDEX idx_survey_responses_consumer_id ON public.survey_responses(consumer_id) WHERE consumer_id IS NOT NULL;