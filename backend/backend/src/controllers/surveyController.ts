import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { dbUtils, db } from '../utils/database';
import { AuthRequest } from '../middleware/auth';

export const createSurveyValidation = [
  body('title').isLength({ min: 1, max: 100 }).withMessage('Title must be 1-100 characters'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
  body('url').isURL().withMessage('Valid URL is required'),
  body('targetAgeMin').isInt({ min: 1, max: 120 }).withMessage('Minimum age must be between 1 and 120'),
  body('targetAgeMax').isInt({ min: 1, max: 120 }).withMessage('Maximum age must be between 1 and 120'),
  body('targetGender').isIn(['MALE', 'FEMALE', 'ALL']).withMessage('Invalid target gender'),
  body('rewardPerResponse').isInt({ min: 1000 }).withMessage('Reward per response must be at least 1000'),
  body('maxParticipants').isInt({ min: 10 }).withMessage('Max participants must be at least 10'),
  body('totalBudget').optional().isFloat({ min: 0 }).withMessage('Total budget must be positive'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('customSteps').optional().isArray().withMessage('Custom steps must be an array')
];

export const createSurvey = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user || req.user.role !== 'SELLER') {
      return res.status(403).json({ error: 'Only sellers can create surveys' });
    }

    const { 
      title, 
      storeName,
      description, 
      url, 
      targetAgeMin, 
      targetAgeMax, 
      targetGender, 
      rewardPerResponse,
      maxParticipants,
      totalBudget,
      endDate, 
      templateId, 
      customSteps
    } = req.body;

    // 템플릿 ID가 제공되지 않으면 기본 템플릿 사용
    let finalTemplateId = templateId;
    if (!finalTemplateId) {
      const defaultTemplate = await dbUtils.findDefaultTemplate();
      
      if (!defaultTemplate) {
        return res.status(400).json({ error: 'No default template found' });
      }
      
      finalTemplateId = defaultTemplate.id;
    }

    // 총 예산 계산 (수수료 10% 포함)
    const calculatedTotalBudget = totalBudget || Math.round(rewardPerResponse * maxParticipants * 1.1);

    const survey = await dbUtils.createSurveyWithDetails({
      title,
      storeName: storeName || '',
      description: description || '',
      url,
      sellerId: req.user.id,
      templateId: finalTemplateId,
      targetAgeMin,
      targetAgeMax,
      targetGender,
      reward: rewardPerResponse,
      maxParticipants,
      totalBudget: calculatedTotalBudget,
      customSteps: customSteps || null,
      status: 'PENDING',
      endDate: new Date(endDate)
    });

    res.status(201).json({
      message: 'Survey created successfully',
      survey
    });

  } catch (error: any) {
    console.error('Create survey error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message || 'Unknown error occurred'
    });
  }
};

export const getSurveys = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;
    let where: any = {};

    if (req.user?.role === 'SELLER') {
      where.seller_id = req.user.id;
    } else if (req.user?.role === 'CONSUMER') {
      where.status = 'APPROVED';
      where.endDate = new Date().toISOString();
      
      if (req.user.age) {
        where.targetAgeMin = req.user.age;
        where.targetAgeMax = req.user.age;
      }
      
      if (req.user.gender && req.user.gender !== 'OTHER') {
        where.targetGender = req.user.gender;
      }
    }

    if (status) {
      where.status = status;
    }

    const surveys = await dbUtils.findSurveysByConditions(where);

    // 응답 수가 포함된 설문 목록 생성 (간소화)
    const surveysWithResponseCount = surveys.map((survey: any) => ({
      ...survey,
      responseCount: 0 // 임시로 0, 필요시 별도 쿼리로 계산
    }));

    res.json({ surveys: surveysWithResponseCount });

  } catch (error) {
    console.error('Get surveys error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSurvey = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const survey = await dbUtils.findSurveyById(id);

    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    res.json({ survey });

  } catch (error) {
    console.error('Get survey error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTemplates = async (req: AuthRequest, res: Response) => {
  try {
    const templates = await dbUtils.findTemplatesByConditions({ isPublic: true });
    res.json({ templates });

  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 간소화된 나머지 함수들
export const createTemplate = async (req: AuthRequest, res: Response) => {
  res.status(501).json({ error: 'Not implemented yet' });
};

export const getTemplate = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const template = await dbUtils.findTemplateById(id);
    res.json({ template });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSurveyStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updatedSurvey = await dbUtils.updateSurvey(id, { status });
    res.json({ survey: updatedSurvey });
    
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSurveyResponses = async (req: AuthRequest, res: Response) => {
  res.status(501).json({ error: 'Not implemented yet' });
};

export const approveSurvey = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updatedSurvey = await dbUtils.updateSurvey(id, { status: 'APPROVED' });
    res.json({ survey: updatedSurvey });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const rejectSurvey = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updatedSurvey = await dbUtils.updateSurvey(id, { status: 'REJECTED' });
    res.json({ survey: updatedSurvey });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const requestCancellation = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    const cancellationRequest = await dbUtils.createCancellationRequest({
      survey_id: id,
      reason,
      status: 'PENDING'
    });
    
    await dbUtils.updateSurvey(id, { status: 'CANCELLED' });
    
    res.json({ message: 'Cancellation requested successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};