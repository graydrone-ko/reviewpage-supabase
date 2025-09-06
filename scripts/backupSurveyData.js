const { PrismaClient } = require('../src/generated/prisma');
const fs = require('fs').promises;
const path = require('path');

const prisma = new PrismaClient();

async function backupSurveyData() {
  try {
    console.log('📦 설문 데이터 백업을 시작합니다...');
    
    // 1. 모든 설문 템플릿 백업
    const templates = await prisma.surveyTemplate.findMany({
      include: {
        steps: {
          include: {
            questions: {
              include: {
                options: true
              }
            }
          }
        }
      }
    });

    // 2. 모든 설문 백업
    const surveys = await prisma.survey.findMany({
      include: {
        responses: true,
        seller: {
          select: {
            id: true,
            email: true,
            name: true
          }
        },
        template: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    // 3. 모든 설문 응답 백업
    const surveyResponses = await prisma.surveyResponse.findMany({
      include: {
        consumer: {
          select: {
            id: true,
            email: true,
            name: true
          }
        },
        survey: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });

    // 4. 리워드 데이터 백업
    const rewards = await prisma.reward.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });

    // 백업 데이터 구조
    const backupData = {
      metadata: {
        backupDate: new Date().toISOString(),
        version: '1.0.0',
        description: '설문 템플릿 개선 전 전체 데이터 백업',
        counts: {
          templates: templates.length,
          surveys: surveys.length,
          responses: surveyResponses.length,
          rewards: rewards.length
        }
      },
      templates,
      surveys,
      responses: surveyResponses,
      rewards
    };

    // 백업 파일명 생성
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `survey_data_backup_${timestamp}.json`;
    const backupFilePath = path.join(__dirname, '../backup', backupFileName);

    // 백업 파일 저장
    await fs.writeFile(backupFilePath, JSON.stringify(backupData, null, 2), 'utf8');

    console.log('✅ 데이터 백업이 완료되었습니다!');
    console.log(`📁 백업 파일: ${backupFilePath}`);
    console.log(`📊 백업 통계:`);
    console.log(`   - 설문 템플릿: ${templates.length}개`);
    console.log(`   - 활성 설문: ${surveys.length}개`);
    console.log(`   - 설문 응답: ${surveyResponses.length}개`);
    console.log(`   - 리워드: ${rewards.length}개`);

    return {
      success: true,
      filePath: backupFilePath,
      stats: backupData.metadata.counts
    };

  } catch (error) {
    console.error('❌ 백업 실패:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 백업 복원 함수
async function restoreFromBackup(backupFilePath) {
  try {
    console.log('🔄 백업에서 데이터를 복원합니다...');
    
    // 백업 파일 읽기
    const backupContent = await fs.readFile(backupFilePath, 'utf8');
    const backupData = JSON.parse(backupContent);
    
    console.log('📋 백업 정보:');
    console.log(`   - 백업 날짜: ${backupData.metadata.backupDate}`);
    console.log(`   - 설명: ${backupData.metadata.description}`);
    
    // 복원 프로세스 (필요시 구현)
    console.log('⚠️  복원은 수동으로 확인 후 진행해주세요.');
    
    return { success: true };
  } catch (error) {
    console.error('❌ 복원 실패:', error);
    throw error;
  }
}

// 스크립트 직접 실행
if (require.main === module) {
  backupSurveyData();
}

module.exports = { backupSurveyData, restoreFromBackup };