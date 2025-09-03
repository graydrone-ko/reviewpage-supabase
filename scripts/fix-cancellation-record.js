const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function fixCancellationRecord() {
  try {
    console.log('🔧 중단요청 기록 수정 스크립트 시작...');

    // 중단요청 기록 찾기
    const surveyId = 'cmf1vjwb100018zmugoqygvvi'; // 돼지갈비 테스트 설문 ID
    
    const cancellationRecord = await prisma.surveyCancellationRequest.findFirst({
      where: { surveyId },
      include: {
        survey: {
          include: {
            responses: true,
            seller: {
              select: { name: true, email: true }
            }
          }
        }
      }
    });

    if (!cancellationRecord) {
      console.log('❌ 중단요청 기록을 찾을 수 없습니다.');
      return;
    }

    const survey = cancellationRecord.survey;
    
    console.log('📊 현재 중단요청 기록:');
    console.log(`- 설문: ${survey.title}`);
    console.log(`- 판매자: ${survey.seller.name} (${survey.seller.email})`);
    console.log(`- 현재 환불액: ₩${cancellationRecord.refundAmount.toLocaleString()}`);

    // 올바른 환불액 계산
    const rewardPerResponse = survey.reward || 0;
    const completedResponses = survey.responses.length;
    const totalBudget = survey.totalBudget || 0;
    const maxParticipants = Math.round(totalBudget / (rewardPerResponse * 1.1));
    
    const remainingSlots = maxParticipants - completedResponses;
    const refundRewards = remainingSlots * rewardPerResponse;
    const refundFee = refundRewards * 0.1;
    const correctRefundAmount = refundRewards + refundFee;

    console.log('\n💰 올바른 환불액 계산:');
    console.log(`- 미진행분 리워드: ${remainingSlots} × ₩${rewardPerResponse} = ₩${refundRewards.toLocaleString()}`);
    console.log(`- 미진행분 수수료: ₩${refundRewards.toLocaleString()} × 10% = ₩${refundFee.toLocaleString()}`);
    console.log(`- 총 환불액: ₩${correctRefundAmount.toLocaleString()}`);

    // 중단요청 기록 업데이트
    await prisma.surveyCancellationRequest.update({
      where: { id: cancellationRecord.id },
      data: {
        refundAmount: correctRefundAmount
      }
    });

    console.log(`\n✅ 중단요청 환불액이 ₩${cancellationRecord.refundAmount.toLocaleString()}에서 ₩${correctRefundAmount.toLocaleString()}로 수정되었습니다.`);
    console.log(`📈 차이: ₩${(correctRefundAmount - cancellationRecord.refundAmount).toLocaleString()}`);

  } catch (error) {
    console.error('❌ 중단요청 기록 수정 중 오류 발생:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixCancellationRecord();