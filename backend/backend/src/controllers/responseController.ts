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
    console.log('Submit response request:', {
      body: req.body,
      bodyKeys: Object.keys(req.body),
      surveyId: req.body.surveyId,
      responses: req.body.responses,
      responsesType: typeof req.body.responses,
      responsesLength: Array.isArray(req.body.responses) ? req.body.responses.length : 'not array'
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
        if (answer.value === null || answer.value === undefined || answer.value === '') {
          console.log('❌ Invalid answer value detected:', { 
            stepId: response.stepId,
            questionId: answer.questionId, 
            value: answer.value, 
            type: typeof answer.value,
            isNull: answer.value === null,
            isUndefined: answer.value === undefined,
            isEmpty: answer.value === ''
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

    // 익명 사용자의 경우 중복 체크와 타겟팅 체크를 스킵
    // TODO: 향후 필요시 IP 기반 중복 체크나 쿠키 기반 체크 구현 가능

    try {
      // Create survey response
      let consumerId = (req as any).user?.id;
      
      // 익명 사용자의 경우 NULL로 저장 (외래키 제약조건 우회)
      if (!consumerId) {
        consumerId = null;
      }
      
      const surveyResponse = await dbUtils.createSurveyResponse({
        survey_id: surveyId,
        consumer_id: consumerId, // 로그인 사용자 ID 또는 NULL (익명)
        responses
      });

      // 로그인한 사용자에게만 리워드 지급
      let reward = null;
      if ((req as any).user?.id) {
        reward = await dbUtils.createReward({
          user_id: (req as any).user.id,
          amount: survey.reward,
          type: 'SURVEY_COMPLETION'
        });
      }

      // Note: Response count and survey completion logic would need additional queries
      // For now, simplified without transaction support

      res.status(201).json({
        message: '응답이 성공적으로 제출되었습니다.',
        response: surveyResponse,
        reward: reward,
        surveyCompleted: false
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