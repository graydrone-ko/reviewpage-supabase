const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function fixRefundAmount() {
  try {
    console.log('🔧 환불 금액 수정 스크립트 시작...');

    // 해당 환불 기록 찾기
    const refundRecord = await prisma.reward.findUnique({
      where: { id: 'cmf22tyl500038zks55jbgujd' },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    if (!refundRecord) {
      console.log('❌ 환불 기록을 찾을 수 없습니다.');
      return;
    }

    console.log('📊 현재 환불 기록:');
    console.log(`- 사용자: ${refundRecord.user.name} (${refundRecord.user.email})`);
    console.log(`- 현재 환불액: ₩${Math.abs(refundRecord.amount).toLocaleString()}`);
    console.log(`- 상태: ${refundRecord.status}`);

    // 관련 설문 정보 가져오기
    const survey = await prisma.survey.findFirst({
      where: { 
        sellerId: refundRecord.userId,
        cancellationStatus: 'APPROVED'
      },
      include: {
        responses: true
      }
    });

    if (!survey) {
      console.log('❌ 관련 설문을 찾을 수 없습니다.');
      return;
    }

    // 올바른 환불액 계산
    const rewardPerResponse = survey.reward || 0;
    const completedResponses = survey.responses.length;
    const totalBudget = survey.totalBudget || 0;
    const maxParticipants = Math.round(totalBudget / (rewardPerResponse * 1.1));
    
    const remainingSlots = maxParticipants - completedResponses;
    const refundRewards = remainingSlots * rewardPerResponse;
    const refundFee = refundRewards * 0.1;
    const correctRefundAmount = refundRewards + refundFee;

    console.log('\n📊 설문 정보:');
    console.log(`- 설문 제목: ${survey.title}`);
    console.log(`- 총 예산: ₩${totalBudget.toLocaleString()}`);
    console.log(`- 개당 리워드: ₩${rewardPerResponse.toLocaleString()}`);
    console.log(`- 최대 참여자: ${maxParticipants}명`);
    console.log(`- 완료된 응답: ${completedResponses}명`);
    console.log(`- 미진행 응답: ${remainingSlots}명`);

    console.log('\n💰 환불액 계산:');
    console.log(`- 미진행분 리워드: ${remainingSlots} × ₩${rewardPerResponse} = ₩${refundRewards.toLocaleString()}`);
    console.log(`- 미진행분 수수료: ₩${refundRewards.toLocaleString()} × 10% = ₩${refundFee.toLocaleString()}`);
    console.log(`- 총 환불액: ₩${refundRewards.toLocaleString()} + ₩${refundFee.toLocaleString()} = ₩${correctRefundAmount.toLocaleString()}`);

    // 환불액 수정
    await prisma.reward.update({
      where: { id: 'cmf22tyl500038zks55jbgujd' },
      data: {
        amount: -correctRefundAmount, // 음수로 환불 표시
        status: 'PAID' // 원래 상태로 복원
      }
    });

    console.log(`\n✅ 환불액이 ₩${Math.abs(refundRecord.amount).toLocaleString()}에서 ₩${correctRefundAmount.toLocaleString()}로 수정되었습니다.`);
    console.log(`📈 차이: ₩${(correctRefundAmount - Math.abs(refundRecord.amount)).toLocaleString()}`);

  } catch (error) {
    console.error('❌ 환불액 수정 중 오류 발생:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixRefundAmount();