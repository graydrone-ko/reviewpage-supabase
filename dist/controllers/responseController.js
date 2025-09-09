"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyResponses = exports.submitResponse = exports.submitResponseValidation = void 0;
const express_validator_1 = require("express-validator");
const database_1 = require("../utils/database");
exports.submitResponseValidation = [
    (0, express_validator_1.body)('surveyId').isString().withMessage('Survey ID is required'),
    (0, express_validator_1.body)('responses').isArray({ min: 1 }).withMessage('At least one response is required'),
    (0, express_validator_1.body)('responses.*.stepId').isString().withMessage('Step ID is required'),
    (0, express_validator_1.body)('responses.*.answers').isArray({ min: 1 }).withMessage('At least one answer is required'),
    (0, express_validator_1.body)('responses.*.answers.*.questionId').isString().withMessage('Question ID is required')
];
const submitResponse = async (req, res) => {
    try {
        console.log('Submit response request:', {
            body: req.body,
            user: req.user
        });
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({
                error: 'Validation failed',
                details: errors.array()
            });
        }
        if (!req.user || req.user.role !== 'CONSUMER') {
            return res.status(403).json({ error: 'Only consumers can submit responses' });
        }
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
        const survey = await database_1.prisma.survey.findUnique({
            where: { id: surveyId }
        });
        if (!survey) {
            return res.status(404).json({ error: 'Survey not found' });
        }
        if (survey.status !== 'APPROVED') {
            return res.status(400).json({ error: 'Survey is not available for responses' });
        }
        if (new Date() > survey.endDate) {
            return res.status(400).json({ error: 'Survey has ended' });
        }
        // Check if user already responded (duplicate prevention)
        const existingResponse = await database_1.prisma.surveyResponse.findUnique({
            where: {
                surveyId_consumerId: {
                    surveyId,
                    consumerId: req.user.id
                }
            }
        });
        if (existingResponse) {
            console.log('Duplicate response attempt:', {
                userId: req.user.id,
                surveyId,
                existingResponseId: existingResponse.id,
                existingResponseDate: existingResponse.createdAt
            });
            return res.status(400).json({
                error: 'You have already responded to this survey',
                existingResponseDate: existingResponse.createdAt,
                canEdit: true // User can edit their existing response instead
            });
        }
        // Check if user meets survey criteria
        if (req.user.age) {
            if (req.user.age < survey.targetAgeMin || req.user.age > survey.targetAgeMax) {
                return res.status(400).json({ error: 'You do not meet the age criteria for this survey' });
            }
        }
        if (survey.targetGender !== 'ALL' && req.user.gender && req.user.gender !== 'OTHER') {
            if (req.user.gender !== survey.targetGender) {
                return res.status(400).json({ error: 'You do not meet the gender criteria for this survey' });
            }
        }
        // Create response and reward in a transaction
        const result = await database_1.prisma.$transaction(async (tx) => {
            // Create survey response
            const surveyResponse = await tx.surveyResponse.create({
                data: {
                    surveyId,
                    consumerId: req.user.id,
                    responses
                }
            });
            // Create reward
            const reward = await tx.reward.create({
                data: {
                    userId: req.user.id,
                    amount: survey.reward,
                    type: 'SURVEY_COMPLETION'
                }
            });
            // Check if survey should be completed (reached max participants)
            const responseCount = await tx.surveyResponse.count({
                where: { surveyId }
            });
            let updatedSurvey = survey;
            if (responseCount >= survey.maxParticipants) {
                // 최대 참가자 수에 도달했으면 자동으로 COMPLETED 처리
                updatedSurvey = await tx.survey.update({
                    where: { id: surveyId },
                    data: {
                        status: 'COMPLETED',
                        completedAt: new Date()
                    }
                });
                console.log(`설문 "${survey.title}"이 최대 참가자(${survey.maxParticipants}명) 도달로 자동 완료되었습니다.`);
            }
            return { surveyResponse, reward, updatedSurvey };
        });
        const message = result.updatedSurvey.status === 'COMPLETED'
            ? '응답이 제출되었습니다. 설문이 목표 참가자 수에 도달하여 완료되었습니다.'
            : '응답이 성공적으로 제출되었습니다.';
        res.status(201).json({
            message,
            response: result.surveyResponse,
            reward: result.reward,
            surveyCompleted: result.updatedSurvey.status === 'COMPLETED'
        });
    }
    catch (error) {
        console.error('Submit response error:', {
            message: error.message,
            stack: error.stack,
            code: error.code,
            meta: error.meta
        });
        // Handle specific Prisma errors
        if (error.code === 'P2002') {
            return res.status(400).json({
                error: 'Duplicate response: You have already responded to this survey'
            });
        }
        if (error.code === 'P2025') {
            return res.status(404).json({
                error: 'Survey not found or no longer available'
            });
        }
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};
exports.submitResponse = submitResponse;
const getMyResponses = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'CONSUMER') {
            return res.status(403).json({ error: 'Access denied' });
        }
        const responses = await database_1.prisma.surveyResponse.findMany({
            where: {
                consumerId: req.user.id
            },
            include: {
                survey: {
                    select: {
                        id: true,
                        title: true,
                        reward: true,
                        createdAt: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json({ responses });
    }
    catch (error) {
        console.error('Get responses error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getMyResponses = getMyResponses;
//# sourceMappingURL=responseController.js.map