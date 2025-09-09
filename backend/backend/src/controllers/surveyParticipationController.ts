import { Response } from 'express';
import { prisma } from '../utils/database';
import { AuthRequest } from '../middleware/auth';

// 사용자의 설문 참여 상태 확인
export const getSurveyParticipationStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { surveyId } = req.params;
    
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 설문 존재 확인
    const survey = await prisma.survey.findUnique({
      where: { id: surveyId }
    });

    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    // 사용자의 응답 확인
    const existingResponse = await prisma.surveyResponse.findUnique({
      where: {
        surveyId_consumerId: {
          surveyId,
          consumerId: req.user.id
        }
      }
    });

    const participationStatus = existingResponse ? 'PARTICIPATED' : 'AVAILABLE';

    res.json({
      status: participationStatus,
      responseId: existingResponse?.id,
      completedAt: existingResponse?.createdAt,
      updatedAt: existingResponse?.updatedAt
    });

  } catch (error) {
    console.error('Get participation status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 여러 설문의 참여 상태를 한 번에 확인
export const getBulkParticipationStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { surveyIds } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!surveyIds || !Array.isArray(surveyIds)) {
      return res.status(400).json({ error: 'Survey IDs array is required' });
    }

    // 사용자의 모든 응답 조회
    const responses = await prisma.surveyResponse.findMany({
      where: {
        surveyId: { in: surveyIds },
        consumerId: req.user.id
      },
      select: {
        surveyId: true,
        id: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // 각 설문별 참여 상태 매핑
    const statusMap = surveyIds.reduce((acc, surveyId) => {
      const response = responses.find(r => r.surveyId === surveyId);
      acc[surveyId] = {
        status: response ? 'PARTICIPATED' : 'AVAILABLE',
        responseId: response?.id,
        completedAt: response?.createdAt,
        updatedAt: response?.updatedAt
      };
      return acc;
    }, {});

    res.json({ participationStatus: statusMap });

  } catch (error) {
    console.error('Get bulk participation status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 사용자의 기존 설문 응답 조회
export const getUserSurveyResponse = async (req: AuthRequest, res: Response) => {
  try {
    const { surveyId } = req.params;
    
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 기존 응답 확인
    const existingResponse = await prisma.surveyResponse.findUnique({
      where: {
        surveyId_consumerId: {
          surveyId,
          consumerId: req.user.id
        }
      }
    });

    if (!existingResponse) {
      return res.status(404).json({ error: 'No response found' });
    }

    res.json(existingResponse);

  } catch (error) {
    console.error('Get user response error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 설문 응답 수정
export const updateSurveyResponse = async (req: AuthRequest, res: Response) => {
  try {
    const { surveyId } = req.params;
    const { responses } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 기존 응답 확인 (본인 응답만 수정 가능)
    const existingResponse = await prisma.surveyResponse.findUnique({
      where: {
        surveyId_consumerId: {
          surveyId,
          consumerId: req.user.id
        }
      }
    });

    if (!existingResponse) {
      return res.status(404).json({ error: 'No existing response found' });
    }

    // 응답 수정
    const updatedResponse = await prisma.surveyResponse.update({
      where: {
        id: existingResponse.id
      },
      data: {
        responses: responses,
        updatedAt: new Date()
      }
    });

    res.json({
      message: '응답이 수정되었습니다',
      response: updatedResponse
    });

  } catch (error) {
    console.error('Update response error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};