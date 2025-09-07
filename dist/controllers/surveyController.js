"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSurveyCancellation = exports.extendSurvey = exports.getTemplate = exports.getSurveyResponses = exports.updateSurvey = exports.getTemplates = exports.getSurvey = exports.getSurveys = exports.createSurvey = exports.createSurveyValidation = void 0;
const express_validator_1 = require("express-validator");
const database_1 = require("../utils/database");
exports.createSurveyValidation = [
    (0, express_validator_1.body)('title').isLength({ min: 1, max: 100 }).withMessage('Title must be 1-100 characters'),
    (0, express_validator_1.body)('description').optional().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
    (0, express_validator_1.body)('url').isURL().withMessage('Valid URL is required'),
    (0, express_validator_1.body)('targetAgeMin').isInt({ min: 1, max: 120 }).withMessage('Minimum age must be between 1 and 120'),
    (0, express_validator_1.body)('targetAgeMax').isInt({ min: 1, max: 120 }).withMessage('Maximum age must be between 1 and 120'),
    (0, express_validator_1.body)('targetGender').isIn(['MALE', 'FEMALE', 'ALL']).withMessage('Invalid target gender'),
    (0, express_validator_1.body)('rewardPerResponse').isInt({ min: 1000 }).withMessage('Reward per response must be at least 1000'),
    (0, express_validator_1.body)('maxParticipants').isInt({ min: 10 }).withMessage('Max participants must be at least 10'),
    (0, express_validator_1.body)('totalBudget').optional().isFloat({ min: 0 }).withMessage('Total budget must be positive'),
    (0, express_validator_1.body)('endDate').isISO8601().withMessage('Valid end date is required'),
    (0, express_validator_1.body)('customSteps').optional().isArray().withMessage('Custom steps must be an array')
];
const createSurvey = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (!req.user || req.user.role !== 'SELLER') {
            return res.status(403).json({ error: 'Only sellers can create surveys' });
        }
        const { title, storeName, description, url, targetAgeMin, targetAgeMax, targetGender, rewardPerResponse, maxParticipants, totalBudget, endDate, templateId, customSteps, status } = req.body;
        console.log('Received survey data:', {
            title,
            rewardPerResponse,
            maxParticipants,
            totalBudget,
            customSteps: customSteps ? 'present' : 'not provided',
            status
        });
        console.log('User info for survey creation:', req.user);
        if (targetAgeMin > targetAgeMax) {
            return res.status(400).json({ error: 'Minimum age cannot be greater than maximum age' });
        }
        // 추가 검증
        if (!storeName || storeName.trim().length === 0) {
            return res.status(400).json({ error: '판매자 스토어 이름은 필수입니다.' });
        }
        if (rewardPerResponse < 1000) {
            return res.status(400).json({ error: '건당 리워드는 최소 1,000원 이상이어야 합니다.' });
        }
        if (maxParticipants < 10) {
            return res.status(400).json({ error: '진행 인원은 최소 10명 이상이어야 합니다.' });
        }
        // 템플릿 ID가 제공되지 않으면 기본 템플릿 사용
        let finalTemplateId = templateId;
        if (!finalTemplateId) {
            const defaultTemplate = await database_1.prisma.surveyTemplate.findFirst({
                where: { isDefault: true }
            });
            if (!defaultTemplate) {
                return res.status(400).json({ error: 'No default template found' });
            }
            finalTemplateId = defaultTemplate.id;
        }
        // 총 예산 계산 (수수료 10% 포함)
        const calculatedTotalBudget = totalBudget || Math.round(rewardPerResponse * maxParticipants * 1.1);
        const survey = await database_1.prisma.survey.create({
            data: {
                title,
                storeName: storeName || '',
                description: description || '',
                url,
                sellerId: req.user.id,
                templateId: finalTemplateId,
                targetAgeMin,
                targetAgeMax,
                targetGender,
                reward: rewardPerResponse, // 건당 리워드 금액
                maxParticipants,
                totalBudget: calculatedTotalBudget,
                customSteps: customSteps || null,
                status: 'PENDING', // 관리자 승인 대기 상태
                endDate: new Date(endDate)
            },
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                template: {
                    include: {
                        steps: {
                            include: {
                                questions: {
                                    include: {
                                        options: true
                                    },
                                    orderBy: { questionNumber: 'asc' }
                                }
                            },
                            orderBy: { stepNumber: 'asc' }
                        }
                    }
                }
            }
        });
        res.status(201).json({
            message: 'Survey created successfully',
            survey
        });
    }
    catch (error) {
        console.error('Create survey error:', error);
        if (error.code === 'P2003') {
            return res.status(400).json({
                error: '사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.',
                code: 'INVALID_USER'
            });
        }
        if (error.code === 'P2002') {
            return res.status(400).json({
                error: '중복된 데이터입니다.',
                code: 'DUPLICATE_DATA'
            });
        }
        res.status(500).json({
            error: 'Internal server error',
            message: error.message || 'Unknown error occurred'
        });
    }
};
exports.createSurvey = createSurvey;
const getSurveys = async (req, res) => {
    try {
        const { status } = req.query;
        let where = {};
        console.log('User info:', req.user); // 디버깅용 로그
        if (req.user?.role === 'SELLER') {
            where.sellerId = req.user.id;
        }
        else if (req.user?.role === 'CONSUMER') {
            where.status = 'APPROVED';
            where.endDate = { gte: new Date() };
            if (req.user.age) {
                where.targetAgeMin = { lte: req.user.age };
                where.targetAgeMax = { gte: req.user.age };
            }
            if (req.user.gender && req.user.gender !== 'OTHER') {
                where.OR = [
                    { targetGender: req.user.gender },
                    { targetGender: 'ALL' }
                ];
            }
        }
        console.log('Query where condition:', JSON.stringify(where, null, 2)); // 디버깅용 로그
        if (status) {
            where.status = status;
        }
        const surveys = await database_1.prisma.survey.findMany({
            where,
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                template: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                responses: {
                    select: {
                        id: true,
                        consumerId: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        // 응답 수가 포함된 설문 목록 생성
        const surveysWithResponseCount = surveys.map(survey => ({
            ...survey,
            responseCount: survey.responses?.length || 0
        }));
        res.json({ surveys: surveysWithResponseCount });
    }
    catch (error) {
        console.error('Get surveys error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getSurveys = getSurveys;
const getSurvey = async (req, res) => {
    try {
        const { id } = req.params;
        const survey = await database_1.prisma.survey.findUnique({
            where: { id },
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                template: {
                    include: {
                        steps: {
                            include: {
                                questions: {
                                    include: {
                                        options: {
                                            orderBy: { optionNumber: 'asc' }
                                        }
                                    },
                                    orderBy: { questionNumber: 'asc' }
                                }
                            },
                            orderBy: { stepNumber: 'asc' }
                        }
                    }
                },
                responses: {
                    include: {
                        consumer: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });
        if (!survey) {
            return res.status(404).json({ error: 'Survey not found' });
        }
        // Check access permissions
        if (req.user?.role === 'SELLER' && survey.sellerId !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        if (req.user?.role === 'CONSUMER' && survey.status !== 'APPROVED') {
            return res.status(403).json({ error: 'Survey not available' });
        }
        res.json({ survey });
    }
    catch (error) {
        console.error('Get survey error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getSurvey = getSurvey;
const getTemplates = async (req, res) => {
    try {
        let templates = await database_1.prisma.surveyTemplate.findMany({
            include: {
                steps: {
                    include: {
                        questions: {
                            include: {
                                options: {
                                    orderBy: { optionNumber: 'asc' }
                                }
                            },
                            orderBy: { questionNumber: 'asc' }
                        }
                    },
                    orderBy: { stepNumber: 'asc' }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        // 템플릿이 없다면 자동으로 기본 템플릿 생성
        if (templates.length === 0) {
            console.log('📝 템플릿이 없습니다. 기본 템플릿을 자동 생성합니다...');
            try {
                const defaultTemplate = await createDefaultTemplateHelper();
                if (defaultTemplate) {
                    templates = [defaultTemplate];
                    console.log('✅ 기본 템플릿이 자동으로 생성되었습니다.');
                }
            }
            catch (templateError) {
                console.error('❌ 기본 템플릿 자동 생성 실패:', templateError);
                // 템플릿 생성 실패해도 빈 배열로 응답
            }
        }
        res.json({ templates });
    }
    catch (error) {
        console.error('Get templates error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getTemplates = getTemplates;
// 기본 설문 템플릿 생성 헬퍼 함수 (내부 사용)
async function createDefaultTemplateHelper() {
    // 기존 기본 템플릿이 있는지 확인
    const existingTemplate = await database_1.prisma.surveyTemplate.findFirst({
        where: { isDefault: true }
    });
    if (existingTemplate) {
        // 기존 템플릿을 전체 정보와 함께 다시 조회
        const fullTemplate = await database_1.prisma.surveyTemplate.findUnique({
            where: { id: existingTemplate.id },
            include: {
                steps: {
                    include: {
                        questions: {
                            include: {
                                options: {
                                    orderBy: { optionNumber: 'asc' }
                                }
                            },
                            orderBy: { questionNumber: 'asc' }
                        }
                    },
                    orderBy: { stepNumber: 'asc' }
                }
            }
        });
        return fullTemplate;
    }
    // 새 기본 템플릿 생성
    const template = await database_1.prisma.surveyTemplate.create({
        data: {
            name: '기본 상품 상세페이지 평가 설문',
            description: '상품 상세페이지의 첫인상, 콘텐츠 이해도, 구매 동기, 페이지 구조, 감정 및 행동 의도를 종합적으로 평가하는 5단계 21문항 설문',
            isDefault: true,
            steps: {
                create: [
                    // 1단계: 첫인상 평가
                    {
                        stepNumber: 1,
                        title: '첫인상 평가',
                        description: '상품 상세페이지를 처음 봤을 때의 느낌과 이해도를 평가합니다.',
                        questions: {
                            create: [
                                {
                                    questionNumber: 1,
                                    text: '첫 화면을 봤을 때 어떤 느낌이 드나요?',
                                    type: 'MULTIPLE_CHOICE',
                                    required: true,
                                    options: {
                                        create: [
                                            { optionNumber: 1, text: '신뢰할 수 있어 보임' },
                                            { optionNumber: 2, text: '평범함' },
                                            { optionNumber: 3, text: '퀄리티가 낮음' },
                                            { optionNumber: 4, text: '믿음이 가지 않음' },
                                            { optionNumber: 5, text: '기타(작성)' }
                                        ]
                                    }
                                },
                                {
                                    questionNumber: 2,
                                    text: '이 상품이 어떤 상품인지 5초 안에 이해되나요?',
                                    type: 'YES_NO',
                                    required: true
                                },
                                {
                                    questionNumber: 3,
                                    text: '상세페이지를 전체적으로 보고나서 기억나는 문장은 무엇인가요?',
                                    type: 'TEXT',
                                    required: true,
                                    minLength: 5,
                                    maxLength: 500,
                                    placeholder: '기억에 남는 문장이나 표현을 입력해주세요.'
                                },
                                {
                                    questionNumber: 4,
                                    text: '전체적인 페이지 디자인 점수는?',
                                    type: 'SCORE',
                                    required: true
                                }
                            ]
                        }
                    },
                    // 2단계: 콘텐츠 이해도
                    {
                        stepNumber: 2,
                        title: '콘텐츠 이해도',
                        description: '상품 설명과 정보의 전달력을 평가합니다.',
                        questions: {
                            create: [
                                {
                                    questionNumber: 1,
                                    text: '상품 설명이 이해하기 쉽고 가치있게 다가왔나요?',
                                    type: 'SCORE',
                                    required: true
                                },
                                {
                                    questionNumber: 2,
                                    text: '상세페이지 어떤 부분에서 가장 기대가 됐나요?',
                                    type: 'TEXT',
                                    required: true,
                                    minLength: 10,
                                    maxLength: 500,
                                    placeholder: '기대감을 준 구체적인 부분을 설명해주세요.'
                                },
                                {
                                    questionNumber: 3,
                                    text: '상세페이지 어떤 부분에서 부정적인 생각이나 의심이 들었나요?',
                                    type: 'TEXT',
                                    required: true,
                                    minLength: 5,
                                    maxLength: 500,
                                    placeholder: '의심스럽거나 부정적으로 느낀 부분을 설명해주세요.'
                                },
                                {
                                    questionNumber: 4,
                                    text: '이 상품의 핵심 장점이 명확히 전달되나요?',
                                    type: 'YES_NO',
                                    required: true
                                },
                                {
                                    questionNumber: 5,
                                    text: '경쟁 상품 대비 차별점을 찾을 수 있나요?',
                                    type: 'YES_NO',
                                    required: true
                                }
                            ]
                        }
                    },
                    // 3단계: 구매 동기 분석
                    {
                        stepNumber: 3,
                        title: '구매 동기 분석',
                        description: '상품에 대한 구매 의향과 동기를 분석합니다.',
                        questions: {
                            create: [
                                {
                                    questionNumber: 1,
                                    text: '현재 상태에서 구매 의향은?',
                                    type: 'SCORE',
                                    required: true
                                },
                                {
                                    questionNumber: 2,
                                    text: '구매를 망설이게 하는 가장 큰 요인은?',
                                    type: 'MULTIPLE_CHOICE',
                                    required: true,
                                    options: {
                                        create: [
                                            { optionNumber: 1, text: '가격' },
                                            { optionNumber: 2, text: '신뢰도 부족' },
                                            { optionNumber: 3, text: '정보 부족' },
                                            { optionNumber: 4, text: '필요성 못 느낌' }
                                        ]
                                    }
                                },
                                {
                                    questionNumber: 3,
                                    text: '구매 결정에 가장 결정적이었던 부분은 상세페이지의 어떤 내용이었나요?',
                                    type: 'TEXT',
                                    required: true,
                                    minLength: 10,
                                    maxLength: 500,
                                    placeholder: '구매 결정에 영향을 준 구체적인 내용을 설명해주세요.'
                                },
                                {
                                    questionNumber: 4,
                                    text: '어떤 부분이 개선되면 구매 확률이 높아질까요?',
                                    type: 'TEXT',
                                    required: true,
                                    minLength: 10,
                                    maxLength: 500,
                                    placeholder: '개선이 필요한 부분과 개선 방향을 제안해주세요.'
                                }
                            ]
                        }
                    },
                    // 4단계: 페이지 구조 평가
                    {
                        stepNumber: 4,
                        title: '페이지 구조 평가',
                        description: '상세페이지의 구조와 사용성을 평가합니다.',
                        questions: {
                            create: [
                                {
                                    questionNumber: 1,
                                    text: '상세페이지의 전체적인 흐름이 설득이나 정보를 파악하는데 어땠나요?',
                                    type: 'TEXT',
                                    required: true,
                                    minLength: 15,
                                    maxLength: 500,
                                    placeholder: '페이지 구성과 정보 전달 흐름에 대한 의견을 자세히 작성해주세요.'
                                },
                                {
                                    questionNumber: 2,
                                    text: '스크롤하면서 지루하거나 불편한 구간이 있나요?',
                                    type: 'TEXT',
                                    required: true,
                                    minLength: 5,
                                    maxLength: 500,
                                    placeholder: '지루하거나 불편했던 구간이 있다면 구체적으로 설명해주세요.'
                                },
                                {
                                    questionNumber: 3,
                                    text: '모바일 화면으로 보았을 때 글자를 읽기 편했나요?',
                                    type: 'TEXT',
                                    required: true,
                                    minLength: 5,
                                    maxLength: 500,
                                    placeholder: '모바일 가독성에 대한 의견을 작성해주세요.'
                                },
                                {
                                    questionNumber: 4,
                                    text: '실제 구매를 위해 이 상품의 상세페이지를 보았다면 어떤 부분까지 보았을까요?',
                                    type: 'TEXT',
                                    required: true,
                                    minLength: 10,
                                    maxLength: 500,
                                    placeholder: '실제 구매 상황을 가정하여 어디까지 보았을지 설명해주세요.'
                                }
                            ]
                        }
                    },
                    // 5단계: 감정 및 행동 의도
                    {
                        stepNumber: 5,
                        title: '감정 및 행동 의도',
                        description: '상세페이지를 본 후의 감정 상태와 행동 의도를 파악합니다.',
                        questions: {
                            create: [
                                {
                                    questionNumber: 1,
                                    text: '이 페이지를 보고 난 후 감정 상태는?',
                                    type: 'MULTIPLE_CHOICE',
                                    required: true,
                                    options: {
                                        create: [
                                            { optionNumber: 1, text: '흥미로움' },
                                            { optionNumber: 2, text: '신뢰감' },
                                            { optionNumber: 3, text: '의구심' },
                                            { optionNumber: 4, text: '무관심' },
                                            { optionNumber: 5, text: '짜증' }
                                        ]
                                    }
                                },
                                {
                                    questionNumber: 2,
                                    text: '지인에게 추천하고 싶은 정도는?',
                                    type: 'SCORE',
                                    required: true
                                },
                                {
                                    questionNumber: 3,
                                    text: '실제 구매한다면 언제 하시겠어요?',
                                    type: 'MULTIPLE_CHOICE',
                                    required: true,
                                    options: {
                                        create: [
                                            { optionNumber: 1, text: '지금 즉시' },
                                            { optionNumber: 2, text: '더 알아본 후' },
                                            { optionNumber: 3, text: '할인할 때' },
                                            { optionNumber: 4, text: '구매 안 함' }
                                        ]
                                    }
                                },
                                {
                                    questionNumber: 4,
                                    text: '한 줄로 이 페이지를 평가한다면?',
                                    type: 'TEXT',
                                    required: true,
                                    minLength: 10,
                                    maxLength: 200,
                                    placeholder: '이 상세페이지에 대한 전체적인 평가를 한 줄로 요약해주세요.'
                                }
                            ]
                        }
                    }
                ]
            }
        },
        include: {
            steps: {
                include: {
                    questions: {
                        include: {
                            options: {
                                orderBy: { optionNumber: 'asc' }
                            }
                        },
                        orderBy: { questionNumber: 'asc' }
                    }
                },
                orderBy: { stepNumber: 'asc' }
            }
        }
    });
    return template;
}
const updateSurvey = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!req.user || req.user.role !== 'SELLER') {
            return res.status(403).json({ error: 'Only sellers can update surveys' });
        }
        const survey = await database_1.prisma.survey.findUnique({
            where: { id }
        });
        if (!survey) {
            return res.status(404).json({ error: 'Survey not found' });
        }
        if (survey.sellerId !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const updatedSurvey = await database_1.prisma.survey.update({
            where: { id },
            data: { status },
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                template: {
                    include: {
                        steps: {
                            include: {
                                questions: {
                                    include: {
                                        options: true
                                    },
                                    orderBy: { questionNumber: 'asc' }
                                }
                            },
                            orderBy: { stepNumber: 'asc' }
                        }
                    }
                }
            }
        });
        res.json({
            message: 'Survey updated successfully',
            survey: updatedSurvey
        });
    }
    catch (error) {
        console.error('Update survey error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message || 'Unknown error occurred'
        });
    }
};
exports.updateSurvey = updateSurvey;
const getSurveyResponses = async (req, res) => {
    try {
        const { id } = req.params;
        // 설문이 존재하고 접근 권한이 있는지 확인 (템플릿 정보 포함)
        const survey = await database_1.prisma.survey.findUnique({
            where: { id },
            include: {
                seller: {
                    select: { id: true }
                },
                template: {
                    include: {
                        steps: {
                            include: {
                                questions: {
                                    include: {
                                        options: {
                                            orderBy: { optionNumber: 'asc' }
                                        }
                                    },
                                    orderBy: { questionNumber: 'asc' }
                                }
                            },
                            orderBy: { stepNumber: 'asc' }
                        }
                    }
                }
            }
        });
        if (!survey) {
            return res.status(404).json({ error: 'Survey not found' });
        }
        // 권한 확인 - 설문 작성자만 응답을 볼 수 있음
        if (req.user?.role === 'SELLER' && survey.sellerId !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        // 설문 작성자나 관리자는 언제든 응답 조회 가능 (실시간 결과 가시성)
        if (req.user?.role !== 'ADMIN' && survey.sellerId !== req.user?.id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const responses = await database_1.prisma.surveyResponse.findMany({
            where: { surveyId: id },
            include: {
                consumer: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        // 응답 데이터를 처리하여 질문 정보와 매핑
        const processedResponses = responses.map(response => {
            const responseData = response.responses;
            const processedSteps = responseData.map((stepResponse) => {
                const templateStep = survey.template.steps.find(step => step.id === stepResponse.stepId);
                const processedAnswers = stepResponse.answers.map((answer) => {
                    const question = templateStep?.questions.find(q => q.id === answer.questionId);
                    let formattedValue = answer.value;
                    let optionText = null;
                    if (question) {
                        // 답변 형식 변환
                        switch (question.type) {
                            case 'MULTIPLE_CHOICE':
                                // ID로 저장된 경우와 optionNumber로 저장된 경우 모두 처리
                                let option = question.options.find(opt => opt.id === answer.value);
                                if (!option) {
                                    // optionNumber로 저장된 경우
                                    option = question.options.find(opt => opt.optionNumber === parseInt(answer.value));
                                }
                                if (!option && typeof answer.value === 'string') {
                                    // 텍스트로 직접 저장된 경우
                                    option = question.options.find(opt => opt.text === answer.value);
                                }
                                optionText = option ? option.text : answer.value;
                                formattedValue = option ? `${option.optionNumber}. ${option.text}` : answer.value;
                                break;
                            case 'YES_NO':
                                formattedValue = answer.value ? '예' : '아니오';
                                break;
                            case 'SCORE':
                                formattedValue = `${answer.value}점`;
                                break;
                            case 'TEXT':
                                formattedValue = answer.value;
                                break;
                        }
                    }
                    return {
                        questionId: answer.questionId,
                        questionText: question?.text || 'Unknown Question',
                        questionType: question?.type || 'UNKNOWN',
                        value: answer.value,
                        formattedValue,
                        optionText
                    };
                });
                return {
                    stepId: stepResponse.stepId,
                    stepTitle: templateStep?.title || 'Unknown Step',
                    answers: processedAnswers
                };
            });
            return {
                id: response.id,
                surveyId: response.surveyId,
                consumerId: response.consumerId,
                consumerName: response.consumer?.name || '익명',
                consumerAge: undefined, // 추후 구현
                consumerGender: undefined, // 추후 구현
                responses: processedSteps,
                createdAt: response.createdAt
            };
        });
        // 통계 데이터 생성
        const statistics = generateStatistics(survey, processedResponses);
        res.json({
            survey: {
                id: survey.id,
                title: survey.title,
                description: survey.description,
                maxParticipants: survey.maxParticipants,
                endDate: survey.endDate,
                template: survey.template
            },
            responses: processedResponses,
            statistics
        });
    }
    catch (error) {
        console.error('Get survey responses error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getSurveyResponses = getSurveyResponses;
// 통계 데이터 생성 함수
function generateStatistics(survey, responses) {
    const statistics = [];
    survey.template.steps.forEach((step) => {
        step.questions.forEach((question) => {
            const questionResponses = responses.map(r => r.responses.find((resp) => resp.answers.find((ans) => ans.questionId === question.id))?.answers.find((ans) => ans.questionId === question.id)).filter(Boolean);
            const stat = {
                questionId: question.id,
                questionText: question.text,
                questionType: question.type,
                statistics: {
                    totalResponses: questionResponses.length
                }
            };
            switch (question.type) {
                case 'MULTIPLE_CHOICE':
                    const optionCounts = question.options.reduce((acc, option) => {
                        acc[option.optionNumber] = 0;
                        return acc;
                    }, {});
                    questionResponses.forEach((response) => {
                        // ID로 저장된 경우와 optionNumber로 저장된 경우 모두 처리
                        let option = question.options.find(opt => opt.id === response.value);
                        if (!option) {
                            // optionNumber로 저장된 경우
                            option = question.options.find(opt => opt.optionNumber === parseInt(response.value));
                        }
                        if (!option && typeof response.value === 'string') {
                            // 텍스트로 직접 저장된 경우
                            option = question.options.find(opt => opt.text === response.value);
                        }
                        if (option && optionCounts[option.optionNumber] !== undefined) {
                            optionCounts[option.optionNumber]++;
                        }
                    });
                    stat.statistics.options = question.options.map((option) => ({
                        optionText: option.text,
                        count: optionCounts[option.optionNumber] || 0,
                        percentage: questionResponses.length > 0
                            ? ((optionCounts[option.optionNumber] || 0) / questionResponses.length * 100)
                            : 0
                    }));
                    break;
                case 'SCORE':
                    const scores = questionResponses.map((r) => parseFloat(r.value)).filter(s => !isNaN(s));
                    stat.statistics.averageScore = scores.length > 0
                        ? scores.reduce((a, b) => a + b, 0) / scores.length
                        : 0;
                    break;
                case 'YES_NO':
                    const yesCount = questionResponses.filter((r) => r.value === true || r.value === 'true').length;
                    const noCount = questionResponses.filter((r) => r.value === false || r.value === 'false').length;
                    stat.statistics.yesCount = yesCount;
                    stat.statistics.noCount = noCount;
                    break;
                case 'TEXT':
                    stat.statistics.textResponses = questionResponses.map((r) => r.value).filter(v => v && v.trim());
                    break;
            }
            statistics.push(stat);
        });
    });
    return statistics;
}
const getTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const template = await database_1.prisma.surveyTemplate.findUnique({
            where: { id },
            include: {
                steps: {
                    include: {
                        questions: {
                            include: {
                                options: {
                                    orderBy: { optionNumber: 'asc' }
                                }
                            },
                            orderBy: { questionNumber: 'asc' }
                        }
                    },
                    orderBy: { stepNumber: 'asc' }
                }
            }
        });
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        res.json({ template });
    }
    catch (error) {
        console.error('Get template error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getTemplate = getTemplate;
// 설문 마감연장
const extendSurvey = async (req, res) => {
    try {
        const { id } = req.params;
        const { newEndDate, reason } = req.body;
        if (!req.user || req.user.role !== 'SELLER') {
            return res.status(403).json({ error: 'Only sellers can extend surveys' });
        }
        // 설문 존재 및 소유권 확인
        const survey = await database_1.prisma.survey.findUnique({
            where: { id }
        });
        if (!survey) {
            return res.status(404).json({ error: 'Survey not found' });
        }
        if (survey.sellerId !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        // 연장 가능 조건 확인
        if (survey.status !== 'APPROVED') {
            return res.status(400).json({ error: '승인된 설문만 연장할 수 있습니다.' });
        }
        if (new Date() > survey.endDate) {
            return res.status(400).json({ error: '이미 마감된 설문은 연장할 수 없습니다.' });
        }
        if (survey.extensionCount >= 2) {
            return res.status(400).json({ error: '최대 2회까지만 연장할 수 있습니다.' });
        }
        // 새 마감일 유효성 확인
        const newDate = new Date(newEndDate);
        const currentDate = new Date();
        const maxExtensionDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 최대 30일
        if (newDate <= survey.endDate) {
            return res.status(400).json({ error: '연장일은 현재 마감일보다 늦어야 합니다.' });
        }
        if (newDate > maxExtensionDate) {
            return res.status(400).json({ error: '최대 30일까지만 연장할 수 있습니다.' });
        }
        // 연장 이력 생성
        const extensionHistory = Array.isArray(survey.extensionHistory)
            ? survey.extensionHistory
            : [];
        extensionHistory.push({
            extensionNumber: survey.extensionCount + 1,
            previousEndDate: survey.endDate.toISOString(),
            newEndDate: newDate.toISOString(),
            reason: reason || '',
            extendedAt: new Date().toISOString()
        });
        // 설문 연장 처리
        const updatedSurvey = await database_1.prisma.survey.update({
            where: { id },
            data: {
                endDate: newDate,
                extensionCount: survey.extensionCount + 1,
                extensionHistory: extensionHistory,
                updatedAt: new Date()
            },
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        res.json({
            message: '설문 마감일이 성공적으로 연장되었습니다.',
            survey: updatedSurvey,
            extensionInfo: {
                extensionNumber: updatedSurvey.extensionCount,
                previousEndDate: survey.endDate,
                newEndDate: newDate,
                reason: reason || ''
            }
        });
    }
    catch (error) {
        console.error('Extend survey error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message || 'Unknown error occurred'
        });
    }
};
exports.extendSurvey = extendSurvey;
// 설문 중단 요청
const requestSurveyCancellation = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        if (!req.user || req.user.role !== 'SELLER') {
            return res.status(403).json({ error: 'Only sellers can request survey cancellation' });
        }
        if (!reason || reason.trim().length < 10) {
            return res.status(400).json({ error: '중단 사유는 최소 10자 이상 입력해주세요.' });
        }
        // 설문 존재 및 소유권 확인
        const survey = await database_1.prisma.survey.findUnique({
            where: { id },
            include: {
                responses: true,
                cancellationRequest: true
            }
        });
        if (!survey) {
            return res.status(404).json({ error: 'Survey not found' });
        }
        if (survey.sellerId !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        // 중단 요청 가능 조건 확인
        if (survey.status !== 'APPROVED') {
            return res.status(400).json({ error: '진행 중인 설문만 중단 요청할 수 있습니다.' });
        }
        if (survey.cancellationRequest) {
            return res.status(400).json({
                error: '이미 중단 요청이 진행 중입니다.',
                existingRequest: {
                    status: survey.cancellationRequest.status,
                    requestedAt: survey.cancellationRequest.requestedAt
                }
            });
        }
        // 환불액 계산 (원래 로직이 맞음)
        // 미진행분에 대한 리워드 + 해당 수수료만 환불
        const completedResponses = survey.responses.length;
        const remainingSlots = survey.maxParticipants - completedResponses;
        const refundRewards = remainingSlots * survey.reward;
        const refundFee = refundRewards * 0.1; // 미진행분에 대한 10% 수수료
        const totalRefund = refundRewards + refundFee;
        // 중단 요청 생성
        const cancellationRequest = await database_1.prisma.surveyCancellationRequest.create({
            data: {
                surveyId: id,
                reason: reason.trim(),
                refundAmount: totalRefund
            }
        });
        // 설문 상태 업데이트
        await database_1.prisma.survey.update({
            where: { id },
            data: {
                cancellationStatus: 'PENDING',
                cancellationRequestedAt: new Date(),
                updatedAt: new Date()
            }
        });
        res.status(201).json({
            message: '중단 요청이 성공적으로 제출되었습니다. 관리자 검토 후 처리됩니다.',
            cancellationRequest: {
                id: cancellationRequest.id,
                reason: cancellationRequest.reason,
                refundAmount: cancellationRequest.refundAmount,
                status: cancellationRequest.status,
                requestedAt: cancellationRequest.requestedAt
            },
            refundInfo: {
                completedResponses,
                remainingSlots,
                refundRewards,
                refundFee,
                totalRefund
            }
        });
    }
    catch (error) {
        console.error('Request survey cancellation error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message || 'Unknown error occurred'
        });
    }
};
exports.requestSurveyCancellation = requestSurveyCancellation;
//# sourceMappingURL=surveyController.js.map