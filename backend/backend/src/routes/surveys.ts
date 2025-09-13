import { Router } from 'express';
import { 
  createSurvey, 
  getSurveys, 
  getSurvey,
  updateSurvey,
  getSurveyResponses,
  createSurveyValidation,
  getTemplates,
  getTemplate,
  createDefaultTemplate,
  getPublicTemplates,
  extendSurvey,
  requestSurveyCancellation,
  debugTemplates
} from '../controllers/surveyController';
import {
  getSurveyParticipationStatus,
  getBulkParticipationStatus,
  getUserSurveyResponse,
  updateSurveyResponse
} from '../controllers/surveyParticipationController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();

// 공개 라우트 (인증 불필요)
router.get('/templates/public', getPublicTemplates);
router.get('/templates/list', getPublicTemplates); // 프론트엔드 호환성을 위해 추가
router.get('/debug/templates', debugTemplates);
router.post('/debug/create-template', createDefaultTemplate);

// 설문 참여를 위한 공개 라우트 (인증 불필요)
router.get('/:id', getSurvey);

// All other routes require authentication
router.use(authenticateToken);

// Create survey (sellers only)
router.post('/', requireRole(['SELLER']), createSurveyValidation, createSurvey);

// Get surveys (filtered based on user role)
router.get('/', getSurveys);

// Update survey (sellers only)
router.patch('/:id', requireRole(['SELLER']), updateSurvey);

// Get survey responses
router.get('/:id/responses', getSurveyResponses);

// Participation routes
router.get('/:id/participation-status', getSurveyParticipationStatus);
router.post('/participation-status/bulk', getBulkParticipationStatus);
router.get('/:id/my-response', getUserSurveyResponse);
router.patch('/:id/response', updateSurveyResponse);

// Template routes
router.get('/templates/:id', getTemplate);
router.post('/templates/create-default', createDefaultTemplate);

// Survey extension and cancellation (sellers only)
router.patch('/:id/extend', requireRole(['SELLER']), extendSurvey);
router.post('/:id/cancel-request', requireRole(['SELLER']), requestSurveyCancellation);

export default router;