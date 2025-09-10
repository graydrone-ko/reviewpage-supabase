import { supabaseAdmin } from '../lib/supabase';

// Supabase 클라이언트를 Prisma와 유사한 방식으로 사용할 수 있도록 설정
export const db = supabaseAdmin;

// 유틸리티 함수들
export const dbUtils = {
  // 사용자 관련
  async findUserByEmail(email: string) {
    const { data, error } = await db
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async findUserById(id: string) {
    const { data, error } = await db
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async createUser(userData: any) {
    const { data, error } = await db
      .from('users')
      .insert(userData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 설문 관련
  async findSurveyById(id: string) {
    const { data, error } = await db
      .from('surveys')
      .select(`
        *,
        seller:users!surveys_seller_id_fkey(*),
        template:survey_templates!surveys_template_id_fkey(*)
      `)
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async findSurveysByStatus(status: string) {
    const { data, error } = await db
      .from('surveys')
      .select(`
        *,
        seller:users!surveys_seller_id_fkey(*),
        template:survey_templates!surveys_template_id_fkey(*)
      `)
      .eq('status', status);
    
    if (error) throw error;
    return data || [];
  },

  async createSurvey(surveyData: any) {
    const { data, error } = await db
      .from('surveys')
      .insert(surveyData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateSurvey(id: string, updateData: any) {
    const { data, error } = await db
      .from('surveys')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 응답 관련
  async createSurveyResponse(responseData: any) {
    const { data, error } = await db
      .from('survey_responses')
      .insert(responseData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async findResponseByUserAndSurvey(consumerId: string, surveyId: string) {
    const { data, error } = await db
      .from('survey_responses')
      .select('*')
      .eq('consumer_id', consumerId)
      .eq('survey_id', surveyId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // 리워드 관련
  async createReward(rewardData: any) {
    const { data, error } = await db
      .from('rewards')
      .insert(rewardData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async findRewardsByUserId(userId: string) {
    const { data, error } = await db
      .from('rewards')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // 템플릿 관련
  async findDefaultTemplate() {
    const { data, error } = await db
      .from('survey_templates')
      .select(`
        *,
        steps:survey_steps(
          *,
          questions:survey_questions(
            *,
            options:question_options(*)
          )
        )
      `)
      .eq('is_default', true)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async findTemplateById(id: string) {
    const { data, error } = await db
      .from('survey_templates')
      .select(`
        *,
        steps:survey_steps(
          *,
          questions:survey_questions(
            *,
            options:question_options(*)
          )
        )
      `)
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // 통계 관련
  async getStats() {
    const [usersResult, surveysResult, responsesResult, rewardsResult] = await Promise.all([
      db.from('users').select('id', { count: 'exact', head: true }),
      db.from('surveys').select('id', { count: 'exact', head: true }),
      db.from('survey_responses').select('id', { count: 'exact', head: true }),
      db.from('rewards').select('amount').eq('status', 'PAID')
    ]);

    const totalRewards = rewardsResult.data?.reduce((sum, reward) => sum + reward.amount, 0) || 0;

    return {
      totalUsers: usersResult.count || 0,
      totalSurveys: surveysResult.count || 0,
      totalResponses: responsesResult.count || 0,
      totalRewards
    };
  }
};

// 백워드 호환성을 위한 별칭
export const prisma = db;