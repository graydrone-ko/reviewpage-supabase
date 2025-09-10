-- Supabase 데이터베이스 스키마
-- ReviewPage Platform - 상품 상세페이지 설문 플랫폼

-- Enums 생성
CREATE TYPE public.role_enum AS ENUM ('SELLER', 'CONSUMER', 'ADMIN');
CREATE TYPE public.gender_enum AS ENUM ('MALE', 'FEMALE', 'ALL');
CREATE TYPE public.survey_status_enum AS ENUM ('PENDING', 'APPROVED', 'COMPLETED', 'CANCELLED', 'SUSPENDED');
CREATE TYPE public.cancellation_status_enum AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE public.reward_type_enum AS ENUM ('SURVEY_COMPLETION', 'BONUS', 'REFUND');
CREATE TYPE public.reward_status_enum AS ENUM ('PENDING', 'PAID');
CREATE TYPE public.question_type_enum AS ENUM ('MULTIPLE_CHOICE', 'TEXT', 'SCORE', 'YES_NO');
CREATE TYPE public.withdrawal_status_enum AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- Users 테이블
CREATE TABLE public.users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role role_enum DEFAULT 'CONSUMER' NOT NULL,
    gender gender_enum NOT NULL,
    account_number TEXT NOT NULL,
    bank_code TEXT NOT NULL,
    birth_date TEXT NOT NULL,
    phone_number TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Survey Templates 테이블
CREATE TABLE public.survey_templates (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    name TEXT NOT NULL,
    description TEXT,
    is_default BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Survey Steps 테이블
CREATE TABLE public.survey_steps (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    template_id TEXT NOT NULL,
    step_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    FOREIGN KEY (template_id) REFERENCES public.survey_templates(id) ON DELETE CASCADE,
    UNIQUE(template_id, step_number)
);

-- Survey Questions 테이블
CREATE TABLE public.survey_questions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    step_id TEXT NOT NULL,
    question_number INTEGER NOT NULL,
    text TEXT NOT NULL,
    type question_type_enum NOT NULL,
    required BOOLEAN DEFAULT TRUE NOT NULL,
    max_length INTEGER,
    min_length INTEGER,
    placeholder TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    FOREIGN KEY (step_id) REFERENCES public.survey_steps(id) ON DELETE CASCADE,
    UNIQUE(step_id, question_number)
);

-- Question Options 테이블
CREATE TABLE public.question_options (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    question_id TEXT NOT NULL,
    option_number INTEGER NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    FOREIGN KEY (question_id) REFERENCES public.survey_questions(id) ON DELETE CASCADE,
    UNIQUE(question_id, option_number)
);

-- Surveys 테이블
CREATE TABLE public.surveys (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    title TEXT NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    seller_id TEXT NOT NULL,
    template_id TEXT NOT NULL,
    target_age_min INTEGER NOT NULL,
    target_age_max INTEGER NOT NULL,
    target_gender gender_enum NOT NULL,
    reward NUMERIC NOT NULL,
    max_participants INTEGER DEFAULT 50 NOT NULL,
    total_budget NUMERIC,
    status survey_status_enum DEFAULT 'PENDING' NOT NULL,
    custom_steps JSONB,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    cancellation_requested_at TIMESTAMP WITH TIME ZONE,
    cancellation_status cancellation_status_enum,
    completed_at TIMESTAMP WITH TIME ZONE,
    extension_count INTEGER DEFAULT 0 NOT NULL,
    extension_history JSONB,
    rejection_reason TEXT,
    store_name TEXT DEFAULT '' NOT NULL,
    suspended_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES public.users(id),
    FOREIGN KEY (template_id) REFERENCES public.survey_templates(id)
);

-- Survey Responses 테이블
CREATE TABLE public.survey_responses (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    survey_id TEXT NOT NULL,
    consumer_id TEXT NOT NULL,
    responses JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    FOREIGN KEY (survey_id) REFERENCES public.surveys(id),
    FOREIGN KEY (consumer_id) REFERENCES public.users(id),
    UNIQUE(survey_id, consumer_id)
);

-- Rewards 테이블
CREATE TABLE public.rewards (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    type reward_type_enum NOT NULL,
    status reward_status_enum DEFAULT 'PENDING' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Survey Cancellation Requests 테이블
CREATE TABLE public.survey_cancellation_requests (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    survey_id TEXT UNIQUE NOT NULL,
    reason TEXT NOT NULL,
    refund_amount NUMERIC NOT NULL,
    status cancellation_status_enum DEFAULT 'PENDING' NOT NULL,
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE,
    processed_by TEXT,
    FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE
);

-- Withdrawal Requests 테이블
CREATE TABLE public.withdrawal_requests (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    status withdrawal_status_enum DEFAULT 'PENDING' NOT NULL,
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE,
    processed_by TEXT,
    note TEXT,
    FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- 인덱스 생성
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_phone_number ON public.users(phone_number);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_surveys_seller_id ON public.surveys(seller_id);
CREATE INDEX idx_surveys_status ON public.surveys(status);
CREATE INDEX idx_surveys_created_at ON public.surveys(created_at);
CREATE INDEX idx_survey_responses_survey_id ON public.survey_responses(survey_id);
CREATE INDEX idx_survey_responses_consumer_id ON public.survey_responses(consumer_id);
CREATE INDEX idx_rewards_user_id ON public.rewards(user_id);
CREATE INDEX idx_rewards_status ON public.rewards(status);
CREATE INDEX idx_withdrawal_requests_user_id ON public.withdrawal_requests(user_id);
CREATE INDEX idx_withdrawal_requests_status ON public.withdrawal_requests(status);

-- Row Level Security (RLS) 활성화
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawal_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_cancellation_requests ENABLE ROW LEVEL SECURITY;

-- RLS 정책 생성
-- 사용자는 자신의 데이터만 조회/수정 가능
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid()::TEXT = id OR 
                     EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid()::TEXT AND role = 'ADMIN'));

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid()::TEXT = id);

-- 설문 관련 정책
CREATE POLICY "Sellers can manage own surveys" ON public.surveys
    FOR ALL USING (seller_id = auth.uid()::TEXT OR
                   EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid()::TEXT AND role = 'ADMIN'));

CREATE POLICY "Consumers can view approved surveys" ON public.surveys
    FOR SELECT USING (status = 'APPROVED' OR seller_id = auth.uid()::TEXT OR
                     EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid()::TEXT AND role = 'ADMIN'));

-- 응답 관련 정책
CREATE POLICY "Consumers can manage own responses" ON public.survey_responses
    FOR ALL USING (consumer_id = auth.uid()::TEXT OR
                   EXISTS (SELECT 1 FROM public.surveys s WHERE s.id = survey_id AND s.seller_id = auth.uid()::TEXT) OR
                   EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid()::TEXT AND role = 'ADMIN'));

-- 리워드 관련 정책
CREATE POLICY "Users can view own rewards" ON public.rewards
    FOR SELECT USING (user_id = auth.uid()::TEXT OR
                     EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid()::TEXT AND role = 'ADMIN'));

-- 관리자 함수
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid()::TEXT AND role = 'ADMIN'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 트리거 생성
CREATE TRIGGER handle_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_survey_templates_updated_at BEFORE UPDATE ON public.survey_templates FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_survey_steps_updated_at BEFORE UPDATE ON public.survey_steps FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_survey_questions_updated_at BEFORE UPDATE ON public.survey_questions FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_question_options_updated_at BEFORE UPDATE ON public.question_options FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_surveys_updated_at BEFORE UPDATE ON public.surveys FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_survey_responses_updated_at BEFORE UPDATE ON public.survey_responses FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_rewards_updated_at BEFORE UPDATE ON public.rewards FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();