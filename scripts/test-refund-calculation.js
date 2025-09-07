// 환불액 계산 테스트 스크립트

function testRefundCalculation() {
    console.log('=== 환불액 계산 테스트 ===\n');
    
    // 테스트 시나리오 설정
    const testCases = [
        { total: 50, reward: 1000, completed: 1, description: "문제 상황" },
        { total: 50, reward: 1000, completed: 0, description: "응답 0명" },
        { total: 50, reward: 1000, completed: 25, description: "응답 25명" },
        { total: 50, reward: 1000, completed: 49, description: "응답 49명" },
        { total: 50, reward: 1000, completed: 50, description: "응답 50명 완료" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`${index + 1}. ${testCase.description}`);
        console.log(`   총 예산: ${(testCase.total * testCase.reward * 1.1).toLocaleString()}원`);
        console.log(`   완료된 응답: ${testCase.completed}명`);
        console.log(`   미진행분: ${testCase.total - testCase.completed}명`);
        
        // 현재 로직
        const completedResponses = testCase.completed;
        const remainingSlots = testCase.total - completedResponses;
        const refundRewards = remainingSlots * testCase.reward;
        const refundFee = refundRewards * 0.1;
        const totalRefund = refundRewards + refundFee;
        
        console.log(`   미진행 리워드: ${refundRewards.toLocaleString()}원`);
        console.log(`   미진행 수수료: ${refundFee.toLocaleString()}원`);
        console.log(`   총 환불액: ${totalRefund.toLocaleString()}원`);
        
        // 검증: 총 예산에서 지급된 리워드를 뺀 값과 비교
        const totalBudget = testCase.total * testCase.reward * 1.1;
        const paidRewards = testCase.completed * testCase.reward;
        const expectedRefund = totalBudget - paidRewards;
        
        console.log(`   예상 환불액 (총예산-지급액): ${expectedRefund.toLocaleString()}원`);
        console.log(`   계산 차이: ${(totalRefund - expectedRefund).toLocaleString()}원`);
        console.log(`   정확성: ${totalRefund === expectedRefund ? '✅ 정확' : '❌ 오차'}`);
        console.log('');
    });
    
    // 특별 케이스: 사용자가 제시한 문제 상황 재현
    console.log('=== 사용자 제시 문제 상황 분석 ===');
    const problemCase = {
        total: 50,
        reward: 1000,
        completed: 1,
        expectedRefund: 53900,
        actualCalculated: 51250
    };
    
    console.log('문제 상황:');
    console.log(`- 총 예산: ${(problemCase.total * problemCase.reward * 1.1).toLocaleString()}원`);
    console.log(`- 완료 응답: ${problemCase.completed}명`);
    console.log(`- 미진행분: ${problemCase.total - problemCase.completed}명`);
    console.log(`- 사용자 예상 환불액: ${problemCase.expectedRefund.toLocaleString()}원`);
    console.log(`- 사용자 실제 계산 결과: ${problemCase.actualCalculated.toLocaleString()}원`);
    console.log(`- 차이: ${problemCase.expectedRefund - problemCase.actualCalculated}원`);
    
    // 현재 로직으로 계산
    const remaining = problemCase.total - problemCase.completed;
    const refundRewards = remaining * problemCase.reward;
    const refundFee = refundRewards * 0.1;
    const totalRefund = refundRewards + refundFee;
    
    console.log('\n현재 로직 계산 결과:');
    console.log(`- 미진행 리워드: ${refundRewards.toLocaleString()}원`);
    console.log(`- 미진행 수수료: ${refundFee.toLocaleString()}원`);
    console.log(`- 총 환불액: ${totalRefund.toLocaleString()}원`);
    
    // 올바른 계산 (총예산 - 지급액)
    const totalBudget = problemCase.total * problemCase.reward * 1.1;
    const paidRewards = problemCase.completed * problemCase.reward;
    const correctRefund = totalBudget - paidRewards;
    
    console.log('\n올바른 계산:');
    console.log(`- 총 예산: ${totalBudget.toLocaleString()}원`);
    console.log(`- 지급된 리워드: ${paidRewards.toLocaleString()}원`);
    console.log(`- 올바른 환불액: ${correctRefund.toLocaleString()}원`);
    console.log(`- 현재 로직과의 차이: ${(totalRefund - correctRefund).toLocaleString()}원`);
}

testRefundCalculation();