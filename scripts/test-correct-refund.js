// 올바른 환불액 계산 검증

console.log('=== 올바른 환불액 계산 검증 ===\n');

// 사용자가 원하는 계산 방식
function calculateRefund(total, reward, completed) {
    const remaining = total - completed;
    const refundRewards = remaining * reward;  // 미진행분 리워드
    const refundFee = refundRewards * 0.1;     // 미진행분 수수료 (10%)
    const totalRefund = refundRewards + refundFee;
    
    return {
        totalBudget: Math.round(total * reward * 1.1),
        completed,
        remaining,
        paidRewards: completed * reward,
        refundRewards,
        refundFee,
        totalRefund
    };
}

const testCases = [
    { total: 50, reward: 1000, completed: 1, description: "1명 완료" },
    { total: 50, reward: 1000, completed: 25, description: "25명 완료" },
    { total: 50, reward: 1000, completed: 49, description: "49명 완료" }
];

testCases.forEach((testCase, index) => {
    console.log(`${index + 1}. ${testCase.description}`);
    const result = calculateRefund(testCase.total, testCase.reward, testCase.completed);
    
    console.log(`   총 예산: ${result.totalBudget.toLocaleString()}원`);
    console.log(`   완료: ${result.completed}명 (지급: ${result.paidRewards.toLocaleString()}원)`);
    console.log(`   미진행: ${result.remaining}명`);
    console.log(`   미진행 리워드: ${result.refundRewards.toLocaleString()}원`);
    console.log(`   미진행 수수료 (10%): ${result.refundFee.toLocaleString()}원`);
    console.log(`   총 환불액: ${result.totalRefund.toLocaleString()}원`);
    console.log(`   잔여 (플랫폼 보관): ${(result.totalBudget - result.paidRewards - result.totalRefund).toLocaleString()}원`);
    console.log('');
});

// 특별히 25명 완료 케이스 확인
console.log('=== 25명 완료 케이스 상세 검증 ===');
const case25 = calculateRefund(50, 1000, 25);
console.log('예상 결과: 27,500원 환불');
console.log(`실제 계산: ${case25.totalRefund.toLocaleString()}원`);
console.log(`정확성: ${case25.totalRefund === 27500 ? '✅ 정확' : '❌ 오차'}`);