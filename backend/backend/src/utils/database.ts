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
      .order('created_at', { ascending: false })
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    
    // 데이터가 있다면 정렬 보장
    if (data?.steps) {
      data.steps.sort((a: any, b: any) => a.step_number - b.step_number);
      data.steps.forEach((step: any) => {
        if (step.questions) {
          step.questions.sort((a: any, b: any) => a.question_number - b.question_number);
          step.questions.forEach((question: any) => {
            if (question.options) {
              question.options.sort((a: any, b: any) => a.option_number - b.option_number);
            }
          });
        }
      });
    }
    
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
      seller:users!surveys_seller_id_fkey(id, name, email),
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
      .order('step_number', { ascending: true });
    
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
  },

  // 완전한 템플릿 생성 (steps, questions, options 포함)
  async createCompleteTemplate(templateData: {
    name: string;
    description?: string;
    is_default?: boolean;
    steps: Array<{
      step_number: number;
      title: string;
      description?: string;
      questions: Array<{
        question_number: number;
        text: string;
        type: 'MULTIPLE_CHOICE' | 'TEXT' | 'SCORE' | 'YES_NO';
        required: boolean;
        max_length?: number;
        min_length?: number;
        placeholder?: string;
        options?: Array<{
          option_number: number;
          text: string;
        }>;
      }>;
    }>;
  }) {
    // Transaction을 시뮬레이션하기 위해 단계별로 진행하고 에러 시 롤백
    try {
      // 1. 템플릿 생성
      const template = await this.createTemplate({
        name: templateData.name,
        description: templateData.description,
        is_default: templateData.is_default || false
      });

      // 2. 각 단계 생성
      for (const stepData of templateData.steps) {
        const step = await this.createStep({
          template_id: template.id,
          step_number: stepData.step_number,
          title: stepData.title,
          description: stepData.description
        });

        // 3. 각 질문 생성
        for (const questionData of stepData.questions) {
          const question = await this.createQuestion({
            step_id: step.id,
            question_number: questionData.question_number,
            text: questionData.text,
            type: questionData.type,
            required: questionData.required,
            max_length: questionData.max_length,
            min_length: questionData.min_length,
            placeholder: questionData.placeholder
          });

          // 4. 각 옵션 생성 (MULTIPLE_CHOICE인 경우)
          if (questionData.options && questionData.options.length > 0) {
            for (const optionData of questionData.options) {
              await this.createOption({
                question_id: question.id,
                option_number: optionData.option_number,
                text: optionData.text
              });
            }
          }
        }
      }

      // 전체 생성된 템플릿 조회하여 반환
      return await this.findTemplateById(template.id);
    } catch (error) {
      console.error('Complete template creation failed:', error);
      throw error;
    }
  },

  // 기본 템플릿 존재 여부 확인
  async hasDefaultTemplate() {
    const { data, error } = await db
      .from('survey_templates')
      .select('id')
      .eq('is_default', true)
      .limit(1)
      .single();
    
    // 데이터가 없으면 false 반환 (에러가 아님)
    if (error && error.code === 'PGRST116') {
      return false;
    }
    
    if (error) throw error;
    return !!data;
  },

  // 기본 템플릿 초기화 (데이터베이스에 기본 템플릿이 없는 경우)
  async initializeDefaultTemplate() {
    const hasDefault = await this.hasDefaultTemplate();
    if (hasDefault) {
      console.log('Default template already exists');
      return await this.findDefaultTemplate();
    }

    console.log('Creating default template...');
    
    // 기본 템플릿 데이터 정의
    const defaultTemplateData = {
      name: '기본 상품 상세페이지 설문',
      description: '상품 상세페이지 개선을 위한 기본 설문 템플릿입니다.',
      is_default: true,
      steps: [
        {
          step_number: 1,
          title: '상품 정보 확인',
          description: '상품 상세페이지의 정보가 얼마나 도움이 되었는지 알려주세요.',
          questions: [
            {
              question_number: 1,
              text: '이 상품의 상세 정보가 구매 결정에 얼마나 도움이 되었나요?',
              type: 'MULTIPLE_CHOICE' as const,
              required: true,
              options: [
                { option_number: 1, text: '매우 도움이 되었다' },
                { option_number: 2, text: '도움이 되었다' },
                { option_number: 3, text: '보통이다' },
                { option_number: 4, text: '별로 도움이 안되었다' },
                { option_number: 5, text: '전혀 도움이 안되었다' }
              ]
            },
            {
              question_number: 2,
              text: '상품 상세페이지에서 부족하다고 느낀 정보가 있다면 무엇인가요?',
              type: 'TEXT' as const,
              required: false,
              placeholder: '부족한 정보를 자유롭게 작성해주세요.'
            }
          ]
        },
        {
          step_number: 2,
          title: '구매 의사결정',
          description: '상품 구매와 관련된 경험을 알려주세요.',
          questions: [
            {
              question_number: 1,
              text: '이 상품을 구매하셨나요?',
              type: 'YES_NO' as const,
              required: true
            },
            {
              question_number: 2,
              text: '구매하지 않으셨다면, 가장 큰 이유는 무엇인가요?',
              type: 'MULTIPLE_CHOICE' as const,
              required: false,
              options: [
                { option_number: 1, text: '가격이 비싸서' },
                { option_number: 2, text: '정보가 부족해서' },
                { option_number: 3, text: '신뢰가 부족해서' },
                { option_number: 4, text: '배송/반품 조건이 불만족스러워서' },
                { option_number: 5, text: '리뷰가 부족해서' },
                { option_number: 6, text: '기타' }
              ]
            },
            {
              question_number: 3,
              text: '이 상품 페이지를 전반적으로 평가해주세요. (1-10점)',
              type: 'SCORE' as const,
              required: true
            }
          ]
        },
        {
          step_number: 3,
          title: '개선 제안',
          description: '상품 페이지 개선을 위한 제안을 해주세요.',
          questions: [
            {
              question_number: 1,
              text: '이 상품 페이지에서 가장 개선이 필요한 부분은 무엇인가요?',
              type: 'MULTIPLE_CHOICE' as const,
              required: true,
              options: [
                { option_number: 1, text: '상품 이미지의 품질이나 개수' },
                { option_number: 2, text: '상품 설명의 상세함' },
                { option_number: 3, text: '가격 정보의 명확성' },
                { option_number: 4, text: '배송/반품 정보' },
                { option_number: 5, text: '고객 리뷰나 평점' },
                { option_number: 6, text: '페이지 로딩 속도' },
                { option_number: 7, text: '모바일 최적화' },
                { option_number: 8, text: '기타' }
              ]
            },
            {
              question_number: 2,
              text: '추가적인 개선 제안이나 의견이 있으시면 자유롭게 작성해주세요.',
              type: 'TEXT' as const,
              required: false,
              placeholder: '개선 제안이나 의견을 자유롭게 작성해주세요.'
            }
          ]
        }
      ]
    };

    return await this.createCompleteTemplate(defaultTemplateData);
  }
};

// 백워드 호환성을 위한 별칭
export const prisma = db;