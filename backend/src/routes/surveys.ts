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
  extendSurvey,
  requestSurveyCancellation
} from '../controllers/surveyController';
import {
  getSurveyParticipationStatus,
  getBulkParticipationStatus,
  getUserSurveyResponse,
  updateSurveyResponse
} from '../controllers/surveyParticipationController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Create survey (sellers only)
router.post('/', requireRole(['SELLER']), createSurveyValidation, createSurvey);

// Get surveys (filtered based on user role)
router.get('/', getSurveys);

// Get specific survey
router.get('/:id', getSurvey);

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
router.get('/templates/list', getTemplates);
router.get('/templates/:id', getTemplate);

// Survey extension and cancellation (sellers only)
router.patch('/:id/extend', requireRole(['SELLER']), extendSurvey);
router.post('/:id/cancel-request', requireRole(['SELLER']), requestSurveyCancellation);

export default router;