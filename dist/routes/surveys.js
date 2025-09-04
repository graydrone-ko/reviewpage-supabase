"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const surveyController_1 = require("../controllers/surveyController");
const surveyParticipationController_1 = require("../controllers/surveyParticipationController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_1.authenticateToken);
// Create survey (sellers only)
router.post('/', (0, auth_1.requireRole)(['SELLER']), surveyController_1.createSurveyValidation, surveyController_1.createSurvey);
// Get surveys (filtered based on user role)
router.get('/', surveyController_1.getSurveys);
// Get specific survey
router.get('/:id', surveyController_1.getSurvey);
// Update survey (sellers only)
router.patch('/:id', (0, auth_1.requireRole)(['SELLER']), surveyController_1.updateSurvey);
// Get survey responses
router.get('/:id/responses', surveyController_1.getSurveyResponses);
// Participation routes
router.get('/:id/participation-status', surveyParticipationController_1.getSurveyParticipationStatus);
router.post('/participation-status/bulk', surveyParticipationController_1.getBulkParticipationStatus);
router.get('/:id/my-response', surveyParticipationController_1.getUserSurveyResponse);
router.patch('/:id/response', surveyParticipationController_1.updateSurveyResponse);
// Template routes
router.get('/templates/list', surveyController_1.getTemplates);
router.get('/templates/:id', surveyController_1.getTemplate);
// Survey extension and cancellation (sellers only)
router.patch('/:id/extend', (0, auth_1.requireRole)(['SELLER']), surveyController_1.extendSurvey);
router.post('/:id/cancel-request', (0, auth_1.requireRole)(['SELLER']), surveyController_1.requestSurveyCancellation);
exports.default = router;
//# sourceMappingURL=surveys.js.map