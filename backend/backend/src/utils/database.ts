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

  async findUserByPhoneNumber(phoneNumber: string) {
    const { data, error } = await db
      .from('users')
      .select('id')
      .eq('phone_number', phoneNumber)
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

  async createSurveyWithDetails(surveyData: any) {
    // Supabase에서는 nested insert가 복잡하므로 단순하게 survey만 생성
    const { data, error } = await db
      .from('surveys')
      .insert({
        title: surveyData.title,
        store_name: surveyData.storeName,
        description: surveyData.description,
        url: surveyData.url,
        seller_id: surveyData.sellerId,
        template_id: surveyData.templateId,
        target_age_min: surveyData.targetAgeMin,
        target_age_max: surveyData.targetAgeMax,
        target_gender: surveyData.targetGender,
        reward: surveyData.reward,
        max_participants: surveyData.maxParticipants,
        total_budget: surveyData.totalBudget,
        custom_steps: surveyData.customSteps,
        status: surveyData.status,
        end_date: surveyData.endDate
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // 생성된 survey의 상세 정보 조회
    return await this.findSurveyWithTemplate(data.id);
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

  async updateSurveyResponse(id: string, updateData: any) {
    const { data, error } = await db
      .from('survey_responses')
      .update(updateData)
      .eq('id', id)
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

  async findResponsesByUserId(userId: string) {
    const { data, error } = await db
      .from('survey_responses')
      .select(`
        *,
        surveys!survey_responses_survey_id_fkey (
          id,
          title,
          reward,
          created_at
        )
      `)
      .eq('consumer_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
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

  // 설문 관련 추가 함수들
  async findSurveysByConditions(conditions: any) {
    let query = db.from('surveys').select(`
      *,
      seller:users!surveys_seller_id_fkey(*),
      template:survey_templates!surveys_template_id_fkey(*)
    `);
    
    // 조건 적용
    if (conditions.seller_id) query = query.eq('seller_id', conditions.seller_id);
    if (conditions.status) query = query.eq('status', conditions.status);
    if (conditions.endDate) query = query.gte('end_date', conditions.endDate);
    if (conditions.targetAgeMin) query = query.lte('target_age_min', conditions.targetAgeMin);
    if (conditions.targetAgeMax) query = query.gte('target_age_max', conditions.targetAgeMax);
    if (conditions.targetGender) {
      query = query.or(`target_gender.eq.${conditions.targetGender},target_gender.eq.ALL`);
    }

    query = query.order('created_at', { ascending: false });
    
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async findSurveyWithTemplate(id: string) {
    const { data, error } = await db
      .from('surveys')
      .select(`
        *,
        seller:users!surveys_seller_id_fkey(id, name, email),
        template:survey_templates!surveys_template_id_fkey(
          *,
          steps:survey_steps(
            *,
            questions:survey_questions(
              *,
              options:question_options(*)
            )
          )
        )
      `)
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async createSurveyTemplate(templateData: any) {
    const { data, error } = await db
      .from('survey_templates')
      .insert(templateData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async findTemplatesByConditions(conditions: any) {
    let query = db.from('survey_templates').select(`
      *,
      steps:survey_steps(
        *,
        questions:survey_questions(
          *,
          options:question_options(*)
        )
      )
    `);
    
    if (conditions.isDefault) query = query.eq('is_default', conditions.isDefault);
    if (conditions.isPublic) query = query.eq('is_public', conditions.isPublic);
    if (conditions.createdBy) query = query.eq('created_by', conditions.createdBy);

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async findStepsByTemplateId(templateId: string) {
    const { data, error } = await db
      .from('survey_steps')
      .select(`
        *,
        questions:survey_questions(
          *,
          options:question_options(*)
        )
      `)
      .eq('template_id', templateId)
      .order('step_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async createCancellationRequest(requestData: any) {
    const { data, error } = await db
      .from('survey_cancellation_requests')
      .insert(requestData)
      .select()
      .single();
    
    if (error) throw error;
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
  },

  // 템플릿 생성 관련 함수들
  async createTemplate(templateData: any) {
    const { data, error } = await db
      .from('survey_templates')
      .insert(templateData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async createStep(stepData: any) {
    const { data, error } = await db
      .from('survey_steps')
      .insert(stepData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async createQuestion(questionData: any) {
    const { data, error } = await db
      .from('survey_questions')
      .insert(questionData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async createOption(optionData: any) {
    const { data, error } = await db
      .from('question_options')
      .insert(optionData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// 백워드 호환성을 위한 별칭
export const prisma = db;