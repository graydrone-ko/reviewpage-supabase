import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { dbUtils } from '../utils/database';
import { AuthRequest } from '../middleware/auth';

// 익명 사용자 ID
const ANONYMOUS_USER_ID = 'c91a823e-21c1-4a59-9e30-a6b22fa8c145';

export const submitResponseValidation = [
  body('surveyId').isString().withMessage('Survey ID is required'),
  body('responses').isArray({ min: 1 }).withMessage('At least one response is required'),
  body('responses.*.stepId').isString().withMessage('Step ID is required'),
  body('responses.*.answers').isArray({ min: 1 }).withMessage('At least one answer is required'),
  body('responses.*.answers.*.questionId').isString().withMessage('Question ID is required')
];

export const submitResponse = async (req: Request, res: Response) => {
  try {
    console.log('Submit response request:', {
      body: req.body
    });

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
        return res.status(400).json({ 
          error: 'Invalid response format: each response must have stepId and answers array' 
        });
      }
      
      for (const answer of response.answers) {
        if (!answer.questionId || answer.value === undefined) {
          return res.status(400).json({ 
            error: 'Invalid answer format: each answer must have questionId and value' 
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
      const surveyResponse = await dbUtils.createSurveyResponse({
        survey_id: surveyId,
        consumer_id: (req as any).user?.id || ANONYMOUS_USER_ID, // 익명 사용자
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
        return res.status(400).json({ 
          error: 'Duplicate response: You have already responded to this survey' 
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