#!/usr/bin/env node

/**
 * 초기 설문 템플릿 생성 스크립트
 * 
 * 사용법:
 * node scripts/initializeTemplates.js
 * 
 * 이 스크립트는 다음 작업을 수행합니다:
 * 1. 기본 설문 템플릿 존재 여부 확인
 * 2. 기본 템플릿이 없으면 자동 생성
 * 3. 추가 템플릿 생성 (선택사항)
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { dbUtils } = require('../src/utils/database');

async function main() {
  console.log('🚀 설문 템플릿 초기화 시작...\n');

  try {
    // 1. 기본 템플릿 존재 여부 확인
    console.log('1️⃣ 기본 템플릿 확인 중...');
    const hasDefault = await dbUtils.hasDefaultTemplate();
    
    if (hasDefault) {
      console.log('✅ 기본 템플릿이 이미 존재합니다.');
      const defaultTemplate = await dbUtils.findDefaultTemplate();
      console.log(`   템플릿 ID: ${defaultTemplate.id}`);
      console.log(`   템플릿 이름: ${defaultTemplate.name}`);
      console.log(`   단계 수: ${defaultTemplate.steps?.length || 0}`);
    } else {
      console.log('⚠️  기본 템플릿이 존재하지 않습니다.');
      
      // 2. 기본 템플릿 생성
      console.log('\n2️⃣ 기본 템플릿 생성 중...');
      const defaultTemplate = await dbUtils.initializeDefaultTemplate();
      
      console.log('✅ 기본 템플릿 생성 완료!');
      console.log(`   템플릿 ID: ${defaultTemplate.id}`);
      console.log(`   템플릿 이름: ${defaultTemplate.name}`);
      console.log(`   단계 수: ${defaultTemplate.steps?.length || 0}`);
      
      // 생성된 단계들 정보 출력
      if (defaultTemplate.steps) {
        console.log('\n📋 생성된 단계들:');
        defaultTemplate.steps.forEach((step, index) => {
          console.log(`   ${index + 1}. ${step.title} (질문 ${step.questions?.length || 0}개)`);
        });
      }
    }

    // 3. 모든 템플릿 목록 조회
    console.log('\n3️⃣ 전체 템플릿 목록:');
    const allTemplates = await dbUtils.findTemplatesByConditions({});
    
    if (allTemplates.length === 0) {
      console.log('   템플릿이 없습니다.');
    } else {
      allTemplates.forEach((template, index) => {
        const isDefault = template.is_default ? ' (기본)' : '';
        const stepCount = template.steps?.length || 0;
        console.log(`   ${index + 1}. ${template.name}${isDefault} - ${stepCount}개 단계`);
      });
    }

    // 4. 통계 정보
    console.log('\n📊 데이터베이스 통계:');
    const stats = await dbUtils.getStats();
    console.log(`   총 사용자: ${stats.totalUsers}명`);
    console.log(`   총 설문: ${stats.totalSurveys}개`);
    console.log(`   총 응답: ${stats.totalResponses}개`);
    console.log(`   총 지급된 리워드: ${stats.totalRewards}원`);

    console.log('\n🎉 설문 템플릿 초기화 완료!');
    
  } catch (error) {
    console.error('❌ 설문 템플릿 초기화 실패:', error);
    
    if (error.message) {
      console.error('오류 메시지:', error.message);
    }
    
    if (error.code) {
      console.error('오류 코드:', error.code);
    }
    
    process.exit(1);
  }
}

// 직접 실행된 경우에만 main 함수 호출
if (require.main === module) {
  main();
}

module.exports = { main };