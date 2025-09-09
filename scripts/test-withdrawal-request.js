const axios = require('axios');

const API_URL = 'http://localhost:3001/api';

async function testWithdrawalRequest() {
  try {
    console.log('🧪 소비자 출금 신청 테스트 시작...\n');

    // 1. 테스트 소비자로 로그인
    console.log('1️⃣ 테스트 소비자 로그인 중...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'testconsumer@example.com',
      password: 'password123'
    });

    const token = loginResponse.data.token;
    console.log('✅ 로그인 성공\n');

    // 2. 현재 리워드 상황 확인
    console.log('2️⃣ 현재 리워드 상황 확인...');
    const rewardsResponse = await axios.get(`${API_URL}/rewards/my`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const { rewards, summary } = rewardsResponse.data;
    console.log(`📊 총 적립: ₩${summary.totalEarned.toLocaleString()}`);
    console.log(`💰 출금 가능: ₩${summary.totalPending.toLocaleString()}`);
    console.log(`🏦 출금 완료: ₩${summary.totalPaid.toLocaleString()}`);
    console.log(`📝 리워드 건수: ${rewards.length}건\n`);

    if (summary.totalPending < 10000) {
      console.log('❌ 출금 가능 금액이 ₩10,000 미만입니다.');
      return;
    }

    // 3. 출금 신청 (₩12,000)
    const withdrawalAmount = 12000;
    console.log(`3️⃣ ₩${withdrawalAmount.toLocaleString()} 출금 신청 중...`);
    
    const withdrawalResponse = await axios.post(`${API_URL}/rewards/withdraw`, {
      amount: withdrawalAmount
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    console.log('✅ 출금 신청 완료');
    console.log(`📝 응답: ${withdrawalResponse.data.message}`);
    console.log(`💡 참고: ${withdrawalResponse.data.note}\n`);

    // 4. 출금 신청 후 리워드 상황 재확인
    console.log('4️⃣ 출금 신청 후 리워드 상황 재확인...');
    const updatedRewardsResponse = await axios.get(`${API_URL}/rewards/my`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const updatedSummary = updatedRewardsResponse.data.summary;
    console.log(`📊 총 적립: ₩${updatedSummary.totalEarned.toLocaleString()}`);
    console.log(`💰 출금 가능: ₩${updatedSummary.totalPending.toLocaleString()}`);
    console.log(`🏦 출금 완료: ₩${updatedSummary.totalPaid.toLocaleString()}`);

    console.log('\n🔍 현재 시스템 동작:');
    console.log('- 출금 신청은 성공하지만 실제로 리워드 상태는 변경되지 않음');
    console.log('- 관리자가 수동으로 리워드 상태를 PAID로 변경해야 함');
    console.log('- 이것이 올바른 동작입니다 (관리자 승인 필요)');

  } catch (error) {
    console.error('❌ 오류 발생:', error.response?.data || error.message);
  }
}

testWithdrawalRequest();