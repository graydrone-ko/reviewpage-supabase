import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

// Service role client for server-side operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Regular client for user-based operations (respects RLS)
export const supabase = createClient(supabaseUrl, process.env.SUPABASE_ANON_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password: string
          name: string
          role: 'SELLER' | 'CONSUMER' | 'ADMIN'
          gender: 'MALE' | 'FEMALE' | 'ALL'
          account_number: string
          bank_code: string
          birth_date: string
          phone_number: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password: string
          name: string
          role?: 'SELLER' | 'CONSUMER' | 'ADMIN'
          gender: 'MALE' | 'FEMALE' | 'ALL'
          account_number: string
          bank_code: string
          birth_date: string
          phone_number: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password?: string
          name?: string
          role?: 'SELLER' | 'CONSUMER' | 'ADMIN'
          gender?: 'MALE' | 'FEMALE' | 'ALL'
          account_number?: string
          bank_code?: string
          birth_date?: string
          phone_number?: string
          created_at?: string
          updated_at?: string
        }
      }
      surveys: {
        Row: {
          id: string
          title: string
          description: string | null
          url: string
          seller_id: string
          template_id: string
          target_age_min: number
          target_age_max: number
          target_gender: 'MALE' | 'FEMALE' | 'ALL'
          reward: number
          max_participants: number
          total_budget: number | null
          status: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'CANCELLED' | 'SUSPENDED'
          custom_steps: any
          end_date: string
          approved_at: string | null
          cancellation_requested_at: string | null
          cancellation_status: 'PENDING' | 'APPROVED' | 'REJECTED' | null
          completed_at: string | null
          extension_count: number
          extension_history: any
          rejection_reason: string | null
          store_name: string
          suspended_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          url: string
          seller_id: string
          template_id: string
          target_age_min: number
          target_age_max: number
          target_gender: 'MALE' | 'FEMALE' | 'ALL'
          reward: number
          max_participants?: number
          total_budget?: number | null
          status?: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'CANCELLED' | 'SUSPENDED'
          custom_steps?: any
          end_date: string
          approved_at?: string | null
          cancellation_requested_at?: string | null
          cancellation_status?: 'PENDING' | 'APPROVED' | 'REJECTED' | null
          completed_at?: string | null
          extension_count?: number
          extension_history?: any
          rejection_reason?: string | null
          store_name?: string
          suspended_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          url?: string
          seller_id?: string
          template_id?: string
          target_age_min?: number
          target_age_max?: number
          target_gender?: 'MALE' | 'FEMALE' | 'ALL'
          reward?: number
          max_participants?: number
          total_budget?: number | null
          status?: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'CANCELLED' | 'SUSPENDED'
          custom_steps?: any
          end_date?: string
          approved_at?: string | null
          cancellation_requested_at?: string | null
          cancellation_status?: 'PENDING' | 'APPROVED' | 'REJECTED' | null
          completed_at?: string | null
          extension_count?: number
          extension_history?: any
          rejection_reason?: string | null
          store_name?: string
          suspended_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      survey_responses: {
        Row: {
          id: string
          survey_id: string
          consumer_id: string
          responses: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          survey_id: string
          consumer_id: string
          responses: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          survey_id?: string
          consumer_id?: string
          responses?: any
          created_at?: string
          updated_at?: string
        }
      }
      rewards: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: 'SURVEY_COMPLETION' | 'BONUS' | 'REFUND'
          status: 'PENDING' | 'PAID'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: 'SURVEY_COMPLETION' | 'BONUS' | 'REFUND'
          status?: 'PENDING' | 'PAID'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          type?: 'SURVEY_COMPLETION' | 'BONUS' | 'REFUND'
          status?: 'PENDING' | 'PAID'
          created_at?: string
          updated_at?: string
        }
      }
      survey_templates: {
        Row: {
          id: string
          name: string
          description: string | null
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      survey_steps: {
        Row: {
          id: string
          template_id: string
          step_number: number
          title: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          template_id: string
          step_number: number
          title: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          template_id?: string
          step_number?: number
          title?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      survey_questions: {
        Row: {
          id: string
          step_id: string
          question_number: number
          text: string
          type: 'MULTIPLE_CHOICE' | 'TEXT' | 'SCORE' | 'YES_NO'
          required: boolean
          max_length: number | null
          min_length: number | null
          placeholder: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          step_id: string
          question_number: number
          text: string
          type: 'MULTIPLE_CHOICE' | 'TEXT' | 'SCORE' | 'YES_NO'
          required?: boolean
          max_length?: number | null
          min_length?: number | null
          placeholder?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          step_id?: string
          question_number?: number
          text?: string
          type?: 'MULTIPLE_CHOICE' | 'TEXT' | 'SCORE' | 'YES_NO'
          required?: boolean
          max_length?: number | null
          min_length?: number | null
          placeholder?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      question_options: {
        Row: {
          id: string
          question_id: string
          option_number: number
          text: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question_id: string
          option_number: number
          text: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question_id?: string
          option_number?: number
          text?: string
          created_at?: string
          updated_at?: string
        }
      }
      withdrawal_requests: {
        Row: {
          id: string
          user_id: string
          amount: number
          status: 'PENDING' | 'APPROVED' | 'REJECTED'
          requested_at: string
          processed_at: string | null
          processed_by: string | null
          note: string | null
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          status?: 'PENDING' | 'APPROVED' | 'REJECTED'
          requested_at?: string
          processed_at?: string | null
          processed_by?: string | null
          note?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          status?: 'PENDING' | 'APPROVED' | 'REJECTED'
          requested_at?: string
          processed_at?: string | null
          processed_by?: string | null
          note?: string | null
        }
      }
      survey_cancellation_requests: {
        Row: {
          id: string
          survey_id: string
          reason: string
          refund_amount: number
          status: 'PENDING' | 'APPROVED' | 'REJECTED'
          requested_at: string
          processed_at: string | null
          processed_by: string | null
        }
        Insert: {
          id?: string
          survey_id: string
          reason: string
          refund_amount: number
          status?: 'PENDING' | 'APPROVED' | 'REJECTED'
          requested_at?: string
          processed_at?: string | null
          processed_by?: string | null
        }
        Update: {
          id?: string
          survey_id?: string
          reason?: string
          refund_amount?: number
          status?: 'PENDING' | 'APPROVED' | 'REJECTED'
          requested_at?: string
          processed_at?: string | null
          processed_by?: string | null
        }
      }
    }
  }
}