"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./generated/prisma");
const prisma = new prisma_1.PrismaClient();
async function createTestSurvey() {
    try {
        // 기본 템플릿 찾기
        const defaultTemplate = await prisma.surveyTemplate.findFirst({
            where: { isDefault: true }
        });
        if (!defaultTemplate) {
            throw new Error('기본 템플릿을 찾을 수 없습니다.');
            return;
        }
        // 테스트 판매자 찾기
        const seller = await prisma.user.findFirst({
            where: {
                email: 'testseller@example.com',
                role: 'SELLER'
            }
        });
        if (!seller) {
            throw new Error('테스트 판매자를 찾을 수 없습니다.');
            return;
        }
        // 테스트 설문 생성
        const survey = await prisma.survey.create({
            data: {
                title: '테스트 상품 상세페이지 평가',
                description: '새로운 5단계 설문 시스템 테스트를 위한 설문입니다.',
                url: 'https://www.apple.com/iphone-15/',
                sellerId: seller.id,
                templateId: defaultTemplate.id,
                targetAgeMin: 20,
                targetAgeMax: 40,
                targetGender: 'ALL',
                reward: 5000,
                status: 'APPROVED', // 테스트를 위해 바로 승인 상태로 설정
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30일 후
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
        // 테스트 설문 생성 완료
    }
    catch (error) {
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
createTestSurvey();
//# sourceMappingURL=create-test-survey.js.map