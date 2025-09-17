-- 리워드 상태에 EARNED 상태 추가
-- Migration: Add EARNED status to reward_status_enum

-- 기존 enum 타입에 EARNED 값 추가
ALTER TYPE public.reward_status_enum ADD VALUE 'EARNED';

-- 신규 리워드 기본값을 EARNED로 설정
ALTER TABLE public.rewards ALTER COLUMN status SET DEFAULT 'EARNED';

-- 현재 PENDING 상태인 설문 완료 리워드를 EARNED로 변경
-- (설문 완료로 받은 리워드는 바로 적립 상태로 설정)
UPDATE public.rewards 
SET status = 'EARNED', updated_at = NOW()
WHERE type = 'SURVEY_COMPLETION' AND status = 'PENDING';

-- 변경사항 확인을 위한 SELECT 문 (주석 해제하여 확인 가능)
-- SELECT status, count(*) FROM public.rewards GROUP BY status;
