import { Request, Response } from 'express';
import { dbUtils, db } from '../utils/database';
import { AuthRequest } from '../middleware/auth';

export const getAvailableSurveys = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'CONSUMER') {
      return res.status(403).json({ error: 'Only consumers can view available surveys' });
    }

    const where = {
      status: 'APPROVED',
      endDate: new Date().toISOString()
    };

    const surveys = await dbUtils.findSurveysByConditions(where);

    res.json({
      surveys: surveys || []
    });

  } catch (error) {
    console.error('Get available surveys error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const participateInSurvey = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'CONSUMER') {
      return res.status(403).json({ error: 'Only consumers can participate in surveys' });
    }

    const { surveyId } = req.params;
    const { responses } = req.body;

    // 기존 응답 확인
    const existingResponse = await dbUtils.findResponseByUserAndSurvey(req.user.id, surveyId);
    
    if (existingResponse) {
      return res.status(400).json({ error: 'You have already participated in this survey' });
    }

    // 응답 생성
    const surveyResponse = await dbUtils.createSurveyResponse({
      survey_id: surveyId,
      consumer_id: req.user.id,
      responses: responses
    });

    // 리워드 생성 (임시로 1000원)
    const reward = await dbUtils.createReward({
      user_id: req.user.id,
      amount: 1000,
      type: 'SURVEY_COMPLETION'
    });

    res.status(201).json({
      message: 'Survey participation completed successfully',
      response: surveyResponse,
      reward: reward
    });

  } catch (error) {
    console.error('Survey participation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMyParticipations = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'CONSUMER') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const responses = await dbUtils.findResponsesByUserId(req.user.id);

    res.json({
      participations: responses || []
    });

  } catch (error) {
    console.error('Get my participations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSurveyParticipationStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { surveyId } = req.params;
    
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const existingResponse = await dbUtils.findResponseByUserAndSurvey(req.user.id, surveyId);

    res.json({
      hasParticipated: !!existingResponse,
      participation: existingResponse
    });

  } catch (error) {
    console.error('Get participation status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 누락된 함수들 추가
export const getBulkParticipationStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { surveyIds } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!Array.isArray(surveyIds)) {
      return res.status(400).json({ error: 'surveyIds must be an array' });
    }

    const participationStatuses: any = {};

    for (const surveyId of surveyIds) {
      const existingResponse = await dbUtils.findResponseByUserAndSurvey(req.user.id, surveyId);
      participationStatuses[surveyId] = {
        hasParticipated: !!existingResponse,
        participation: existingResponse
      };
    }

    res.json({ participations: participationStatuses });

  } catch (error) {
    console.error('Get bulk participation status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserSurveyResponse = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params; // survey ID
    
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const response = await dbUtils.findResponseByUserAndSurvey(req.user.id, id);

    if (!response) {
      return res.status(404).json({ error: 'No response found for this survey' });
    }

    res.json({ response });

  } catch (error) {
    console.error('Get user survey response error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSurveyResponse = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params; // survey ID
    const { responses } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const existingResponse = await dbUtils.findResponseByUserAndSurvey(req.user.id, id);

    if (!existingResponse) {
      return res.status(404).json({ error: 'No existing response found to update' });
    }

    const updatedResponse = await dbUtils.updateSurveyResponse(existingResponse.id, {
      responses: responses,
      updated_at: new Date().toISOString()
    });

    res.json({
      message: 'Survey response updated successfully',
      response: updatedResponse
    });

  } catch (error) {
    console.error('Update survey response error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};