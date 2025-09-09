const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

async function createTestSurveyWithNaverUrl() {
  try {
    console.log('🛒 네이버 스마트스토어 URL로 테스트 설문을 생성합니다...\n');

    // 필요한 데이터 확인
    const seller = await prisma.user.findFirst({
      where: { role: 'SELLER' }
    });

    const template = await prisma.surveyTemplate.findFirst({
      where: { isDefault: true }
    });

    if (!seller || !template) {
      throw new Error('필요한 데이터를 찾을 수 없습니다. (판매자 또는 템플릿)');
    }

    console.log(`📋 사용할 판매자: ${seller.name} (${seller.email})`);
    console.log(`📋 사용할 템플릿: ${template.name}`);

    // 네이버 스마트스토어 테스트 설문 생성
    const testSurvey = await prisma.survey.create({
      data: {
        title: '네이버 스마트스토어 상품 - 미리보기 테스트',
        description: '네이버 스마트스토어 상품 페이지 미리보기 기능을 테스트하기 위한 설문입니다.',
        url: 'https://smartstore.naver.com/woorihankki/products/11315727151', // 실제 네이버 스마트스토어 링크
        sellerId: seller.id,
        templateId: template.id,
        targetAgeMin: 20,
        targetAgeMax: 60,
        targetGender: 'ALL',
        reward: 1500,
        maxParticipants: 50,
        totalBudget: 82500, // 50명 × 1500원 × 1.1 (수수료)
        status: 'PENDING', // 승인 대기 상태
        endDate: new Date('2025-12-31')
      }
    });

    console.log('\n✅ 테스트 설문 생성 완료!');
    console.log('══════════════════════════════════════');
    console.log(`📋 설문 제목: ${testSurvey.title}`);
    console.log(`🔗 상품 URL: ${testSurvey.url}`);
    console.log(`📊 상태: ${testSurvey.status} (관리자 승인 필요)`);
    console.log(`👥 최대 참가자: ${testSurvey.maxParticipants}명`);
    console.log(`💰 건당 리워드: ${testSurvey.reward}원`);
    console.log(`🆔 설문 ID: ${testSurvey.id}`);

    console.log('\n🧪 테스트 방법:');
    console.log('1. 관리자 (admin@reviewpage.com)로 로그인');
    console.log('2. /admin/surveys에서 설문 승인');
    console.log(`3. /surveys/${testSurvey.id}/participate에서 미리보기 기능 확인`);
    console.log('4. "보안 정책으로 인한 제한" 메시지와 "새 탭에서 상품 보기" 버튼 확인');

    // 추가로 일반 사이트 테스트 설문도 생성
    const regularTestSurvey = await prisma.survey.create({
      data: {
        title: '일반 사이트 - 미리보기 테스트',
        description: 'iframe이 허용될 수 있는 일반 사이트 테스트',
        url: 'https://example.com', // 테스트용 일반 사이트
        sellerId: seller.id,
        templateId: template.id,
        targetAgeMin: 20,
        targetAgeMax: 60,
        targetGender: 'ALL',
        reward: 1000,
        maxParticipants: 30,
        totalBudget: 33000,
        status: 'PENDING',
        endDate: new Date('2025-12-31')
      }
    });

    console.log(`\n🔄 추가 테스트 설문도 생성되었습니다: ${regularTestSurvey.title} (${regularTestSurvey.id})`);

    return {
      success: true,
      naverSurvey: testSurvey,
      regularSurvey: regularTestSurvey
    };

  } catch (error) {
    console.error('❌ 테스트 설문 생성 실패:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 스크립트 직접 실행
if (require.main === module) {
  createTestSurveyWithNaverUrl();
}

module.exports = { createTestSurveyWithNaverUrl };