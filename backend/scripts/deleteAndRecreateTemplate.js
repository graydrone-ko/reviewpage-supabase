const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

async function deleteAndRecreateTemplate() {
  try {
    console.log('🗑️ 기존 템플릿 삭제 중...');
    
    // 기존 템플릿 삭제
    await prisma.surveyTemplate.deleteMany({});
    
    console.log('✅ 기존 템플릿 삭제 완료');
    console.log('🔄 새로운 템플릿 생성 중...');
    
    // 새로운 템플릿 생성 스크립트 실행
    const { createNewDefaultTemplate } = require('./createNewDefaultTemplate.js');
    await createNewDefaultTemplate();
    
    console.log('✅ 새로운 템플릿 생성 완료');
    
  } catch (error) {
    console.error('❌ 템플릿 재생성 실패:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  deleteAndRecreateTemplate();
}

module.exports = { deleteAndRecreateTemplate };