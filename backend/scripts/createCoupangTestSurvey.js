const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

async function createCoupangTestSurvey() {
  try {
    console.log('🛒 쿠팡 상품으로 iframe 미리보기 테스트 설문을 생성합니다...\n');

    // 필요한 데이터 확인
    const seller = await prisma.user.findFirst({
      where: { role: 'SELLER' }
    });

    const template = await prisma.surveyTemplate.findFirst({
      where: { isDefault: true }
    });

    if (!seller || !template) {
      throw new Error('필요한 데이터를 찾을 수 없습니다.');
    }

    // 쿠팡 테스트 설문 생성
    const coupangSurvey = await prisma.survey.create({
      data: {
        title: '쿠팡 상품 - iframe 미리보기 테스트',
        description: '쿠팡 상품 페이지에서 iframe 미리보기가 정상 작동하는지 테스트',
        url: 'https://www.coupang.com/vp/products/123456789', // 쿠팡 테스트 링크
        sellerId: seller.id,
        templateId: template.id,
        targetAgeMin: 20,
        targetAgeMax: 50,
        targetGender: 'ALL',
        reward: 1200,
        maxParticipants: 30,
        totalBudget: 39600,
        status: 'PENDING',
        endDate: new Date('2025-12-31')
      }
    });

    // 지마켓 테스트 설문도 추가
    const gmarketSurvey = await prisma.survey.create({
      data: {
        title: '지마켓 상품 - iframe 미리보기 테스트',
        description: '지마켓 상품 페이지에서 iframe 미리보기가 정상 작동하는지 테스트',
        url: 'https://item.gmarket.co.kr/Item?goodscode=123456789', // 지마켓 테스트 링크
        sellerId: seller.id,
        templateId: template.id,
        targetAgeMin: 25,
        targetAgeMax: 55,
        targetGender: 'ALL',
        reward: 1300,
        maxParticipants: 25,
        totalBudget: 35750,
        status: 'PENDING',
        endDate: new Date('2025-12-31')
      }
    });

    console.log('✅ 테스트 설문들이 생성되었습니다!');
    console.log('══════════════════════════════════════');
    console.log(`🛒 쿠팡 테스트 설문: ${coupangSurvey.title}`);
    console.log(`   🆔 설문 ID: ${coupangSurvey.id}`);
    console.log(`   🔗 URL: ${coupangSurvey.url}`);
    console.log('');
    console.log(`🛒 지마켓 테스트 설문: ${gmarketSurvey.title}`);
    console.log(`   🆔 설문 ID: ${gmarketSurvey.id}`);
    console.log(`   🔗 URL: ${gmarketSurvey.url}`);

    console.log('\n🧪 테스트 방법:');
    console.log('1. 관리자로 로그인하여 두 설문 모두 승인');
    console.log('2. 각 설문의 참여 페이지에서 미리보기 동작 확인');
    console.log('3. 네이버가 아닌 사이트들은 iframe 로드를 먼저 시도');
    console.log('4. 8초 후에도 로드되지 않으면 제한 안내 표시');
    console.log('\n📝 예상 결과:');
    console.log('- 네이버 스마트스토어: 즉시 제한 안내 표시');
    console.log('- 쿠팡/지마켓: iframe 시도 → 성공시 미리보기, 실패시 제한 안내');

    return {
      success: true,
      coupangSurvey,
      gmarketSurvey
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
  createCoupangTestSurvey();
}

module.exports = { createCoupangTestSurvey };