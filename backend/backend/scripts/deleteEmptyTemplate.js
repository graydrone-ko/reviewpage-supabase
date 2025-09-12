require('dotenv').config();
const { dbUtils } = require('../dist/src/utils/database');

// 빈 템플릿 삭제 스크립트
async function deleteEmptyTemplate() {
  try {
    console.log('🗑️ 빈 템플릿 삭제 시작...');
    
    // 템플릿 ID 지정 (0단계 0질문인 템플릿)
    const emptyTemplateId = '69a55263-f3fb-41b6-90fe-87e0da4a56a8';
    
    console.log(`📋 삭제할 템플릿 ID: ${emptyTemplateId}`);
    
    // 템플릿 존재 여부 확인
    const template = await dbUtils.findTemplateById(emptyTemplateId);
    if (!template) {
      console.log('❌ 해당 템플릿을 찾을 수 없습니다.');
      return;
    }
    
    console.log(`📋 템플릿 확인: ${template.name}`);
    console.log(`📊 단계 수: ${template.steps?.length || 0}개`);
    
    // Supabase에서 직접 삭제 (CASCADE로 관련 데이터 자동 삭제)
    const { supabaseAdmin } = require('../dist/src/lib/supabase');
    const { error } = await supabaseAdmin
      .from('survey_templates')
      .delete()
      .eq('id', emptyTemplateId);
    
    if (error) {
      throw error;
    }
    
    console.log('✅ 빈 템플릿 삭제 완료!');
    console.log('📝 관련 단계 및 질문들도 CASCADE로 자동 삭제되었습니다.');
    
    // 남은 템플릿들 확인
    const remainingTemplates = await dbUtils.findTemplatesByConditions({ isDefault: true });
    console.log(`\n📊 남은 기본 템플릿 수: ${remainingTemplates?.length || 0}개`);
    
    if (remainingTemplates && remainingTemplates.length > 0) {
      remainingTemplates.forEach(t => {
        console.log(`  - ${t.name} (${t.steps?.length || 0}단계)`);
      });
    }
    
  } catch (error) {
    console.error('❌ 빈 템플릿 삭제 실패:', error);
    console.error('상세 오류:', error.message);
    throw error;
  }
}

// 스크립트 직접 실행
if (require.main === module) {
  deleteEmptyTemplate()
    .then(() => {
      console.log('✅ 스크립트 실행 완료');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ 스크립트 실행 실패:', error);
      process.exit(1);
    });
}

module.exports = { deleteEmptyTemplate };