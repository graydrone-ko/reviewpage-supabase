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

// 기본 템플릿 생성 (관리자용 또는 시스템 초기화용)
export const createDefaultTemplate = async (req: AuthRequest, res: Response) => {
  try {
    // 기존 기본 템플릿이 있는지 확인
    const existingTemplates = await dbUtils.findTemplatesByConditions({ isDefault: true });
    
    if (existingTemplates && existingTemplates.length > 0) {
      return res.json({ 
        message: '기본 템플릿이 이미 존재합니다.', 
        templates: existingTemplates 
      });
    }

    // 1. 기본 템플릿 생성
    const templateData = {
      name: '상품 상세페이지 리뷰 설문',
      description: '상품 상세페이지의 완성도를 평가하는 포괄적인 설문조사 (5단계 21문항)',
      is_default: true,
      is_public: true,
      created_by: null, // 시스템 생성
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('템플릿 기본 정보 생성 중...');
    const template = await dbUtils.createTemplate(templateData);
    console.log(`템플릿 생성 완료: ${template.id}`);

    // 2. 5단계 생성
    const steps = [
      {
        step_number: 1,
        title: '첫인상 평가',
        description: '상품 상세페이지의 첫인상에 대해 평가해주세요',
        template_id: template.id
      },
      {
        step_number: 2,
        title: '콘텐츠 이해도',
        description: '상품 정보와 콘텐츠의 이해도를 평가해주세요',
        template_id: template.id
      },
      {
        step_number: 3,
        title: '구매 동기 분석',
        description: '구매 의사결정에 영향을 주는 요소들을 분석해주세요',
        template_id: template.id
      },
      {
        step_number: 4,
        title: '페이지 구조 평가',
        description: '상세페이지의 구조와 사용성을 평가해주세요',
        template_id: template.id
      },
      {
        step_number: 5,
        title: '감정 및 행동 의도',
        description: '페이지를 본 후의 감정과 행동 의도를 알려주세요',
        template_id: template.id
      }
    ];

    console.log('5단계 생성 중...');
    const createdSteps = [];
    for (const stepData of steps) {
      const step = await dbUtils.createStep(stepData);
      createdSteps.push(step);
      console.log(`${step.step_number}단계: ${step.title}`);
    }

    res.json({
      message: '5단계 21문항 기본 템플릿 생성 완료!',
      template: template,
      stepsCreated: createdSteps.length,
      templateId: template.id
    });

  } catch (error) {
    console.error('기본 템플릿 생성 실패:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

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

// 누락된 함수들 추가
export const updateSurvey = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (!req.user || req.user.role !== 'SELLER') {
      return res.status(403).json({ error: 'Only sellers can update surveys' });
    }

    const updatedSurvey = await dbUtils.updateSurvey(id, updateData);
    res.json({ survey: updatedSurvey });
  } catch (error) {
    console.error('Update survey error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const extendSurvey = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { endDate } = req.body;
    
    if (!req.user || req.user.role !== 'SELLER') {
      return res.status(403).json({ error: 'Only sellers can extend surveys' });
    }

    const updatedSurvey = await dbUtils.updateSurvey(id, { 
      endDate: new Date(endDate) 
    });
    
    res.json({ 
      message: 'Survey extended successfully',
      survey: updatedSurvey 
    });
  } catch (error) {
    console.error('Extend survey error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const requestSurveyCancellation = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    if (!req.user || req.user.role !== 'SELLER') {
      return res.status(403).json({ error: 'Only sellers can request survey cancellation' });
    }

    const cancellationRequest = await dbUtils.createCancellationRequest({
      survey_id: id,
      reason,
      status: 'PENDING'
    });
    
    await dbUtils.updateSurvey(id, { status: 'CANCELLED' });
    
    res.json({ 
      message: 'Survey cancellation requested successfully',
      request: cancellationRequest
    });
  } catch (error) {
    console.error('Request survey cancellation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const debugTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await dbUtils.findTemplatesByConditions({});
    const templateDetails = [];

    for (const template of templates) {
      const steps = await dbUtils.findStepsByTemplateId(template.id);
      templateDetails.push({
        ...template,
        steps: steps || []
      });
    }

    res.json({ 
      message: 'Debug templates data',
      templates: templateDetails,
      count: templateDetails.length
    });
  } catch (error) {
    console.error('Debug templates error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};