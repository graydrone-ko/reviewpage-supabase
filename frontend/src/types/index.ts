export interface User {
  id: string;
  email: string;
  name: string;
  role: 'seller' | 'consumer' | 'admin';
  age?: number;
  gender?: 'male' | 'female' | 'other';
  createdAt: Date;
}

export interface QuestionOption {
  id: string;
  optionNumber: number;
  text: string;
}

export interface SurveyQuestion {
  id: string;
  questionNumber: number;
  text: string;
  type: 'MULTIPLE_CHOICE' | 'TEXT' | 'SCORE' | 'YES_NO';
  required: boolean;
  options: QuestionOption[];
}

export interface SurveyStep {
  id: string;
  stepNumber: number;
  title: string;
  description?: string;
  questions: SurveyQuestion[];
}

export interface SurveyTemplate {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  steps: SurveyStep[];
  createdAt: string;
  updatedAt: string;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  url: string;
  sellerId: string;
  templateId: string;
  template?: SurveyTemplate;
  // camelCase 필드 (이전 호환성)
  targetAgeMin?: number;
  targetAgeMax?: number;
  targetGender?: 'MALE' | 'FEMALE' | 'ALL';
  // snake_case 필드 (Supabase DB)
  target_age_min?: number;
  target_age_max?: number;
  target_gender?: 'MALE' | 'FEMALE' | 'ALL';
  reward: number;
  maxParticipants: number;
  totalBudget?: number;
  responseCount?: number;
  status: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  endDate: string;
  seller?: {
    id: string;
    name: string;
    email?: string;
  };
}

export interface QuestionAnswer {
  questionId: string;
  value: string | number | boolean | null;
}

export interface StepResponse {
  stepId: string;
  answers: QuestionAnswer[];
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  consumerId: string;
  responses: StepResponse[];
  createdAt: Date;
}

export interface Reward {
  id: string;
  userId: string;
  amount: number;
  type: 'survey_completion' | 'bonus';
  status: 'pending' | 'paid';
  createdAt: Date;
}