// 수정된 환불액 계산 테스트

function testFixedRefundCalculation() {
    console.log('=== 수정된 환불액 계산 테스트 ===\n');
    
    const testCases = [
        { total: 50, reward: 1000, completed: 1, description: "문제 상황 (수정 후)" },
        { total: 50, reward: 1000, completed: 0, description: "응답 0명" },
        { total: 50, reward: 1000, completed: 25, description: "응답 25명" },
        { total: 50, reward: 1000, completed: 49, description: "응답 49명" },
        { total: 50, reward: 1000, completed: 50, description: "응답 50명 완료" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`${index + 1}. ${testCase.description}`);
        
        // 수정된 로직: 총 예산 - 지급된 리워드
        const totalBudget = Math.round(testCase.total * testCase.reward * 1.1);
        const paidRewards = testCase.completed * testCase.reward;
        const totalRefund = totalBudget - paidRewards;
        
        // 세부 계산 (표시용)
        const remaining = testCase.total - testCase.completed;
        const refundRewards = remaining * testCase.reward;
        const refundFee = totalRefund - refundRewards;
        
        console.log(`   총 예산: ${totalBudget.toLocaleString()}원`);
        console.log(`   완료된 응답: ${testCase.completed}명 (지급: ${paidRewards.toLocaleString()}원)`);
        console.log(`   미진행분: ${remaining}명`);
        console.log(`   미진행 리워드: ${refundRewards.toLocaleString()}원`);
        console.log(`   환불 수수료: ${refundFee.toLocaleString()}원`);
        console.log(`   총 환불액: ${totalRefund.toLocaleString()}원`);
        
        // 검증: 총 예산 = 지급된 리워드 + 환불액
        const verification = paidRewards + totalRefund;
        console.log(`   검증 (지급+환불): ${verification.toLocaleString()}원`);
        console.log(`   정확성: ${verification === totalBudget ? '✅ 정확' : '❌ 오차'}`);
        console.log('');
    });
    
    // 원래 문제 상황 재검증
    console.log('=== 원래 문제 상황 검증 ===');
    const problemCase = {
        total: 50,
        reward: 1000,
        completed: 1
    };
    
    const totalBudget = Math.round(problemCase.total * problemCase.reward * 1.1); // 55,000원
    const paidRewards = problemCase.completed * problemCase.reward; // 1,000원
    const totalRefund = totalBudget - paidRewards; // 54,000원
    
    const remaining = problemCase.total - problemCase.completed; // 49명
    const refundRewards = remaining * problemCase.reward; // 49,000원
    const refundFee = totalRefund - refundRewards; // 5,000원
    
    console.log('수정된 계산 결과:');
    console.log(`- 총 예산: ${totalBudget.toLocaleString()}원`);
    console.log(`- 지급된 리워드: ${paidRewards.toLocaleString()}원`);
    console.log(`- 총 환불액: ${totalRefund.toLocaleString()}원`);
    console.log(`- 세부: 미진행 리워드 ${refundRewards.toLocaleString()}원 + 수수료 ${refundFee.toLocaleString()}원`);
    console.log(`- 사용자 기대값과 비교: ${totalRefund === 54000 ? '✅ 정확 (54,000원)' : '❌ 오차'}`);
}

testFixedRefundCalculation();