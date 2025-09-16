import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { dbUtils } from '../utils/database';
import { AuthRequest } from '../middleware/auth';

// 익명 사용자 ID 생성 함수 (각 응답마다 고유 ID)
const generateAnonymousUserId = () => {
  return `anonymous-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const submitResponseValidation = [
  body('surveyId').isString().withMessage('Survey ID is required'),
  body('responses').isArray({ min: 1 }).withMessage('At least one response is required'),
  body('responses.*.stepId').isString().withMessage('Step ID is required'),
  body('responses.*.answers').isArray({ min: 1 }).withMessage('At least one answer is required'),
  body('responses.*.answers.*.questionId').isString().withMessage('Question ID is required'),
  body('responses.*.answers.*.value').notEmpty().withMessage('Answer value is required')
];

export const submitResponse = async (req: Request, res: Response) => {
  try {
    // 선택적 인증 처리 (토큰이 있으면 인증, 없으면 익명)
    const authHeader = req.headers.authorization;
    let authenticatedUser = null;
    
    console.log('🔍 Auth header check:', { 
      hasAuthHeader: !!authHeader, 
      authHeader: authHeader ? authHeader.substring(0, 20) + '...' : 'none',
      startsWithBearer: authHeader ? authHeader.startsWith('Bearer ') : false
    });
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      console.log('🎫 Token extracted, verifying...');
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        authenticatedUser = decoded;
        (req as any).user = decoded;
        console.log('🔐 Authenticated user found:', { id: decoded.id, email: decoded.email, role: decoded.role });
      } catch (tokenError: any) {
        console.log('⚠️ Invalid token provided, proceeding as anonymous user. Error:', tokenError.message);
      }
    } else {
      console.log('👤 No valid auth header, proceeding as anonymous user');
    }
    
    console.log('Submit response request:', {
      body: req.body,
      bodyKeys: Object.keys(req.body),
      surveyId: req.body.surveyId,
      responses: req.body.responses,
      responsesType: typeof req.body.responses,
      responsesLength: Array.isArray(req.body.responses) ? req.body.responses.length : 'not array',
      isAuthenticated: !!authenticatedUser,
      userId: authenticatedUser?.id
    });
    
    // 각 응답의 상세 구조 로깅
    if (Array.isArray(req.body.responses)) {
      req.body.responses.forEach((resp: any, index: number) => {
        console.log(`Response ${index}:`, {
          stepId: resp.stepId,
          answersCount: resp.answers?.length,
          answers: resp.answers?.map((ans: any) => ({
            questionId: ans.questionId,
            value: ans.value,
            valueType: typeof ans.value
          }))
        });
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array()
      });
    }

    // 설문 참여는 비로그인 사용자도 가능 (인증 체크 제거)

    const { surveyId, responses } = req.body;

    // Additional validation for response structure
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return res.status(400).json({ 
        error: 'Invalid response format: responses must be a non-empty array' 
      });
    }

    // Validate each response structure
    for (const response of responses) {
      if (!response.stepId || !response.answers || !Array.isArray(response.answers)) {
        console.log('Invalid response structure:', { stepId: response.stepId, answers: response.answers });
        return res.status(400).json({ 
          error: 'Invalid response format: each response must have stepId and answers array' 
        });
      }
      
      for (const answer of response.answers) {
        if (!answer.questionId) {
          console.log('Missing questionId:', answer);
          return res.status(400).json({ 
            error: 'Invalid answer format: questionId is required' 
          });
        }
        
        // Check for null, undefined, or empty string values
        // Allow 0 and false as valid values
        if (answer.value === null || answer.value === undefined || (typeof answer.value === 'string' && answer.value.trim() === '')) {
          console.log('❌ Invalid answer value detected:', { 
            stepId: response.stepId,
            questionId: answer.questionId, 
            value: answer.value, 
            type: typeof answer.value,
            isNull: answer.value === null,
            isUndefined: answer.value === undefined,
            isEmpty: typeof answer.value === 'string' && answer.value.trim() === ''
          });
          return res.status(400).json({ 
            error: `Invalid answer value for question ${answer.questionId}: value cannot be null, undefined, or empty`,
            details: {
              stepId: response.stepId,
              questionId: answer.questionId,
              receivedValue: answer.value,
              receivedType: typeof answer.value
            }
          });
        }
      }
    }

    // Check if survey exists and is available
    const survey = await dbUtils.findSurveyById(surveyId);

    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    if (survey.status !== 'APPROVED') {
      return res.status(400).json({ error: 'Survey is not available for responses' });
    }

    if (new Date() > new Date(survey.end_date)) {
      return res.status(400).json({ error: 'Survey has ended' });
    }

    // 로그인한 사용자의 경우 중복 응답 사전 체크 및 자격 검증
    let consumerId = (req as any).user?.id;
    if (consumerId) {
      console.log('🔍 Checking for existing response from logged user:', consumerId);
      const existingResponse = await dbUtils.findResponseByUserAndSurvey(consumerId, surveyId);
      if (existingResponse) {
        return res.status(400).json({ 
          error: '이미 이 설문에 참여하셨습니다. 중복 참여는 불가능합니다.',
          canEdit: false
        });
      }

      // 자격 검증 - 사용자 정보 조회
      console.log('🔍 Checking user eligibility for survey');
      const user = await dbUtils.findUserById(consumerId);
      if (user) {
        // 나이 계산
        const calculateUserAge = (birthDate: string) => {
          if (!birthDate) return null;
          
          // 생년월일 형식 처리: 'YYMMDD' 또는 'YYYYMMDD' 또는 ISO 형식
          let birth: Date;
          
          if (birthDate.length === 6) {
            // YYMMDD 형식 (예: '900101')
            const year = parseInt(birthDate.substring(0, 2));
            const month = parseInt(birthDate.substring(2, 4)) - 1; // 월은 0부터 시작
            const day = parseInt(birthDate.substring(4, 6));
            
            // 50년 이상은 1900년대, 50년 미만은 2000년대로 가정 (현재 2024년 기준)
            const fullYear = year >= 50 ? 1900 + year : 2000 + year;
            birth = new Date(fullYear, month, day);
          } else if (birthDate.length === 8) {
            // YYYYMMDD 형식 (예: '19900101')
            const year = parseInt(birthDate.substring(0, 4));
            const month = parseInt(birthDate.substring(4, 6)) - 1;
            const day = parseInt(birthDate.substring(6, 8));
            birth = new Date(year, month, day);
          } else {
            // ISO 형식 또는 기타 형식
            birth = new Date(birthDate);
          }
          
          // 유효한 날짜인지 확인
          if (isNaN(birth.getTime())) {
            console.warn('Invalid birth date:', birthDate);
            return null;
          }
          
          const today = new Date();
          let age = today.getFullYear() - birth.getFullYear();
          const monthDiff = today.getMonth() - birth.getMonth();
          
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
          }
          
          return age;
        };

        const userAge = calculateUserAge(user.birth_date);
        const targetAgeMin = survey.target_age_min;
        const targetAgeMax = survey.target_age_max;
        const targetGender = survey.target_gender;
        
        // 나이 검증
        if (userAge && targetAgeMin && targetAgeMax) {
          if (userAge < targetAgeMin || userAge > targetAgeMax) {
            return res.status(400).json({ 
              error: `이 설문은 ${targetAgeMin}-${targetAgeMax}세 대상입니다. (회원님: ${userAge}세)`,
              eligibilityError: true
            });
          }
        }
        
        // 성별 검증
        if (targetGender && targetGender !== 'ALL' && user.gender !== targetGender) {
          const genderText = targetGender === 'MALE' ? '남성' : '여성';
          const userGenderText = user.gender === 'MALE' ? '남성' : '여성';
          return res.status(400).json({ 
            error: `이 설문은 ${genderText} 대상입니다. (회원님: ${userGenderText})`,
            eligibilityError: true
          });
        }
      }
    }

    try {
      console.log('📝 Survey response creation attempt:', {
        surveyId,
        userId: consumerId,
        isAnonymous: !consumerId,
        responsesCount: responses.length
      });
      
      // 익명 사용자의 경우 NULL로 저장 (외래키 제약조건 우회)
      if (!consumerId) {
        consumerId = null;
      }
      
      const responsePayload = {
        survey_id: surveyId,
        consumer_id: consumerId, // 로그인 사용자 ID 또는 NULL (익명)
        responses
      };
      
      console.log('💾 Database payload:', responsePayload);
      
      const surveyResponse = await dbUtils.createSurveyResponse(responsePayload);

      console.log('✅ Survey response created successfully:', surveyResponse.id);
      
      // 로그인한 사용자에게만 리워드 지급
      let reward = null;
      if ((req as any).user?.id) {
        console.log('💰 Creating reward for logged user:', (req as any).user.id);
        try {
          // 리워드 중복 지급 방지 - 동일 사용자의 동일 설문에 대한 리워드 확인
          const existingReward = await dbUtils.findRewardByUserAndSurvey((req as any).user.id, surveyId);
          if (existingReward) {
            console.log('⚠️ Reward already exists for this user and survey, skipping reward creation');
          } else {
            reward = await dbUtils.createReward({
              user_id: (req as any).user.id,
              amount: survey.reward,
              type: 'SURVEY_COMPLETION'
              // survey_id 필드는 현재 스키마에 없음
            });
            console.log('✅ Reward created successfully:', reward.id, 'Amount:', survey.reward);
          }
        } catch (rewardError: any) {
          console.error('❌ Reward creation failed:', rewardError);
          // 리워드 생성 실패는 심각한 문제이므로 로깅하고 응답에 포함
          console.error('Reward creation error details:', {
            userId: (req as any).user.id,
            surveyId,
            rewardAmount: survey.reward,
            error: rewardError.message,
            stack: rewardError.stack
          });
        }
      } else {
        console.log('👤 Anonymous user - skipping reward creation');
      }

      // 설문 완료 여부 체크 - 템플릿의 모든 단계에 응답했는지 확인
      const templateSteps = survey.template?.steps || [];
      const respondedStepIds = responses.map((r: any) => r.stepId);
      const allStepsCompleted = templateSteps.every((step: any) => 
        respondedStepIds.includes(step.id)
      );
      
      console.log('📊 Survey completion check:', {
        templateStepsCount: templateSteps.length,
        respondedStepsCount: respondedStepIds.length,
        templateStepIds: templateSteps.map((s: any) => s.id),
        respondedStepIds,
        allStepsCompleted
      });

      res.status(201).json({
        message: '응답이 성공적으로 제출되었습니다.',
        response: surveyResponse,
        reward: reward,
        surveyCompleted: allStepsCompleted
      });

    } catch (dbError: any) {
      console.error('Database error:', dbError);
      
      // Handle specific Supabase/PostgreSQL errors
      if (dbError.code === '23505') { // Unique constraint violation
        // 로그인한 사용자의 중복 응답인 경우
        if ((req as any).user?.id) {
          return res.status(400).json({ 
            error: 'Duplicate response: You have already responded to this survey',
            canEdit: true
          });
        } else {
          // 익명 사용자의 경우 (이론적으로 발생하지 않아야 함)
          return res.status(400).json({ 
            error: 'Response submission failed. Please try again.'
          });
        }
      }
      
      // Foreign key constraint violation (존재하지 않는 사용자)
      if (dbError.code === '23503') {
        return res.status(400).json({ 
          error: 'Invalid user reference. Please refresh and try again.'
        });
      }
      
      throw dbError;
    }

  } catch (error: any) {
    console.error('Submit response error:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
};

export const getMyResponses = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'CONSUMER') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const responses = await dbUtils.findResponsesByUserId(req.user.id);

    res.json({ responses });

  } catch (error) {
    console.error('Get responses error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};