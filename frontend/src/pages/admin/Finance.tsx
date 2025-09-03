import React, { useState, useEffect } from 'react';
import { API_URL } from '../../services/api';
import { getBankName, formatAccountNumber, formatPhoneNumber } from '../../utils/banks';

interface FinanceStats {
  totalRevenue: number;      // 총 입금액 (수수료 포함)
  totalWithdrawn: number;    // 총 출금액
  netProfit: number;         // 순 수익 (수수료)
  pendingWithdrawals: number; // 대기 중인 출금 신청
}

interface PaymentRecord {
  id: string;
  surveyId: string;
  surveyTitle: string;
  sellerName: string;
  sellerEmail: string;
  totalAmount: number;
  feeAmount: number;
  baseAmount: number;
  status: string;
  createdAt: string;
}

interface WithdrawalRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  bankCode: string;
  accountNumber: string;
  status: string;
  requestedAt: string;
  completedAt?: string;
  type?: string; // 거래 유형 (REFUND, SURVEY_COMPLETION 등)
}

interface TransactionRecord {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL';
  subType: 'SURVEY_PAYMENT' | 'REFUND' | 'REWARD';
  amount: number;
  status: string;
  createdAt: string;
  processedAt?: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    phoneNumber?: string;
    bankCode?: string;
    accountNumber?: string;
  };
  metadata?: {
    surveyTitle?: string;
    description?: string;
  };
}

const AdminFinance: React.FC = () => {
  const [stats, setStats] = useState<FinanceStats | null>(null);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>([]);
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'transactions' | 'payments' | 'withdrawals'>('transactions');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // 필터 상태
  const [dateRange, setDateRange] = useState('month');
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFinanceData();
  }, [dateRange, statusFilter, customDateRange]);

  // 날짜 헬퍼 함수들
  const getThisMonthRange = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0]
    };
  };

  const getLastMonthRange = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const end = new Date(now.getFullYear(), now.getMonth(), 0);
    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0]
    };
  };

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    
    if (range === 'thisMonth') {
      setCustomDateRange(getThisMonthRange());
      setShowCustomDate(true);
    } else if (range === 'lastMonth') {
      setCustomDateRange(getLastMonthRange());
      setShowCustomDate(true);
    } else if (range === 'custom') {
      setShowCustomDate(true);
    } else {
      setShowCustomDate(false);
      setCustomDateRange({ startDate: '', endDate: '' });
    }
  };

  const fetchFinanceData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // URL 파라미터 구성
      const params = new URLSearchParams({
        period: dateRange,
        status: statusFilter
      });

      // 커스텀 날짜 범위가 있으면 추가
      if (showCustomDate && customDateRange.startDate && customDateRange.endDate) {
        params.append('startDate', customDateRange.startDate);
        params.append('endDate', customDateRange.endDate);
      }

      // 통계 데이터 조회
      const statsResponse = await fetch(`${API_URL}/admin/finance/stats?${params.toString()}`, { headers });
      if (!statsResponse.ok) throw new Error('통계 조회 실패');
      const statsData = await statsResponse.json();
      setStats(statsData);

      // 입금 내역 조회
      const paymentsResponse = await fetch(`${API_URL}/admin/finance/payments?${params.toString()}`, { headers });
      if (!paymentsResponse.ok) throw new Error('입금 내역 조회 실패');
      const paymentsData = await paymentsResponse.json();
      setPayments(paymentsData.payments || []);

      // 통합 거래 내역 조회
      const transactionsResponse = await fetch(`${API_URL}/admin/finance/transactions?${params.toString()}`, { headers });
      if (!transactionsResponse.ok) throw new Error('거래 내역 조회 실패');
      const transactionsData = await transactionsResponse.json();
      setTransactions(transactionsData.transactions || []);

      // 출금 내역 조회 (레거시)
      const withdrawalsResponse = await fetch(`${API_URL}/admin/finance/withdrawals?${params.toString()}`, { headers });
      if (!withdrawalsResponse.ok) throw new Error('출금 내역 조회 실패');
      const withdrawalsData = await withdrawalsResponse.json();
      setWithdrawals(withdrawalsData.withdrawals || []);

    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터 로딩 실패');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawalApproval = async (withdrawalId: string, action: 'approve' | 'reject') => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/finance/withdrawal/${action}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ withdrawalId })
      });

      if (!response.ok) throw new Error(`출금 ${action === 'approve' ? '승인' : '거부'} 실패`);
      
      // 데이터 새로고침
      fetchFinanceData();
      alert(`출금 신청이 ${action === 'approve' ? '승인' : '거부'}되었습니다.`);
    } catch (err) {
      alert(err instanceof Error ? err.message : '처리 중 오류가 발생했습니다.');
    }
  };

  const exportToExcel = async () => {
    try {
      const token = localStorage.getItem('token');
      let exportType = activeTab;
      
      // 통합 거래내역의 경우 전체 데이터 내보내기
      if (activeTab === 'transactions') {
        exportType = 'payments'; // 기본적으로 입금 내역을 내보내기
      }
      
      const response = await fetch(`${API_URL}/admin/finance/export?period=${dateRange}&type=${exportType}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('엑셀 내보내기 실패');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      
      // 파일명을 한글로 설정
      const dateStr = new Date().toISOString().split('T')[0];
      const typeName = activeTab === 'transactions' ? '거래내역' :
                      activeTab === 'payments' ? '입금내역' : '출금내역';
      a.download = `${typeName}_${dateRange}_${dateStr}.csv`;
      
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('엑셀 다운로드 중 오류가 발생했습니다.');
    }
  };

  const filteredPayments = payments.filter(payment => 
    payment.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.sellerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.surveyTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredWithdrawals = withdrawals.filter(withdrawal =>
    withdrawal.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    withdrawal.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTransactions = transactions.filter(transaction =>
    transaction.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (transaction.metadata?.surveyTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (transaction.metadata?.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">재무 관리</h1>
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <span>엑셀 다운로드</span>
          </button>
        </div>

        {/* 통계 카드 */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">₩{stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">총 입금액</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">₩{stats.totalWithdrawn.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">총 출금액</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">₩{stats.netProfit.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">순 수익 (수수료)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">₩{stats.pendingWithdrawals.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">대기 중인 출금</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 필터 및 검색 */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-start">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">기간</label>
              <select
                value={dateRange}
                onChange={(e) => handleDateRangeChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="today">오늘</option>
                <option value="week">최근 1주일</option>
                <option value="month">최근 1개월</option>
                <option value="3month">최근 3개월</option>
                <option value="thisMonth">이번 달</option>
                <option value="lastMonth">지난 달</option>
                <option value="custom">직접 선택</option>
                <option value="all">전체</option>
              </select>
            </div>

            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">전체</option>
                <option value="PENDING">대기</option>
                <option value="APPROVED">승인됨</option>
                <option value="COMPLETED">완료</option>
                <option value="REJECTED">거부됨</option>
              </select>
            </div>

            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">검색</label>
              <input
                type="text"
                placeholder="이름, 이메일, 설문 제목으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* 커스텀 날짜 범위 입력 */}
          {showCustomDate && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-48">
                  <label className="block text-sm font-medium text-gray-700 mb-2">시작 날짜</label>
                  <input
                    type="date"
                    value={customDateRange.startDate}
                    onChange={(e) => setCustomDateRange(prev => ({
                      ...prev,
                      startDate: e.target.value
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-48">
                  <label className="block text-sm font-medium text-gray-700 mb-2">종료 날짜</label>
                  <input
                    type="date"
                    value={customDateRange.endDate}
                    onChange={(e) => setCustomDateRange(prev => ({
                      ...prev,
                      endDate: e.target.value
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setCustomDateRange(getThisMonthRange());
                    }}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                  >
                    이번 달
                  </button>
                  <button
                    onClick={() => {
                      setCustomDateRange(getLastMonthRange());
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    지난 달
                  </button>
                  <button
                    onClick={() => {
                      const today = new Date().toISOString().split('T')[0];
                      setCustomDateRange({ startDate: today, endDate: today });
                    }}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                  >
                    오늘
                  </button>
                </div>
              </div>
              
              {/* 선택된 날짜 범위 표시 */}
              {customDateRange.startDate && customDateRange.endDate && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-blue-800">
                      선택된 기간: {new Date(customDateRange.startDate).toLocaleDateString('ko-KR')} ~ {new Date(customDateRange.endDate).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 탭 메뉴 */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('transactions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'transactions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                거래 내역 ({filteredTransactions.length})
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'payments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                입금 내역 ({filteredPayments.length})
              </button>
              <button
                onClick={() => setActiveTab('withdrawals')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'withdrawals'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                출금 내역 ({filteredWithdrawals.length})
              </button>
            </nav>
          </div>

          {/* 테이블 내용 */}
          <div className="p-6">
            {activeTab === 'transactions' ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">거래 유형</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">사용자 정보</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">금액</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">설명</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              transaction.type === 'DEPOSIT' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {transaction.type === 'DEPOSIT' ? '입금' : '출금'}
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              transaction.subType === 'SURVEY_PAYMENT' ? 'bg-blue-100 text-blue-800' :
                              transaction.subType === 'REFUND' ? 'bg-orange-100 text-orange-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {transaction.subType === 'SURVEY_PAYMENT' ? '설문결제' : 
                               transaction.subType === 'REFUND' ? '환불' : '리워드'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-2">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900">{transaction.user.name}</span>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  transaction.user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                                  transaction.user.role === 'SELLER' ? 'bg-blue-100 text-blue-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {transaction.user.role === 'ADMIN' ? '관리자' :
                                   transaction.user.role === 'SELLER' ? '판매자' : '소비자'}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">{transaction.user.email}</div>
                            </div>
                            {transaction.user.phoneNumber && (
                              <div className="text-xs text-gray-600">
                                📞 {formatPhoneNumber(transaction.user.phoneNumber)}
                              </div>
                            )}
                            {transaction.user.bankCode && transaction.user.accountNumber && (
                              <div className="bg-blue-50 p-2 rounded border">
                                <div className="text-xs font-medium text-blue-900">
                                  🏦 {getBankName(transaction.user.bankCode)}
                                </div>
                                <div 
                                  className="text-xs font-mono text-blue-800 cursor-pointer hover:bg-blue-100 p-1 rounded"
                                  onClick={() => navigator.clipboard.writeText(transaction.user.accountNumber || '')}
                                  title="클릭하여 복사"
                                >
                                  {formatAccountNumber(transaction.user.accountNumber)}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${
                            transaction.type === 'DEPOSIT' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'DEPOSIT' ? '+' : '-'}₩{transaction.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {transaction.metadata?.surveyTitle || transaction.metadata?.description || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>{new Date(transaction.createdAt).toLocaleDateString('ko-KR')}</div>
                          {transaction.processedAt && (
                            <div className="text-xs text-gray-400">
                              처리: {new Date(transaction.processedAt).toLocaleDateString('ko-KR')}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            transaction.status === 'COMPLETED' || transaction.status === 'CONFIRMED'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {transaction.status === 'COMPLETED' || transaction.status === 'CONFIRMED' ? '완료' : '대기중'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : activeTab === 'payments' ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">설문 제목</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">판매자</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연락처</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">총 입금액</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">수수료</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(payment.createdAt).toLocaleDateString('ko-KR')}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="max-w-xs truncate" title={payment.surveyTitle}>
                            {payment.surveyTitle}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.sellerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.sellerEmail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          ₩{payment.totalAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          ₩{payment.feeAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            payment.status === 'CONFIRMED'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status === 'CONFIRMED' ? '확인됨' : '대기중'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">사용자</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연락처</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">은행/계좌</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">출금 금액</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">유형</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">액션</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredWithdrawals.map((withdrawal) => (
                      <tr key={withdrawal.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(withdrawal.requestedAt).toLocaleDateString('ko-KR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {withdrawal.userName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {withdrawal.userEmail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {withdrawal.bankCode} / {withdrawal.accountNumber.replace(/(.{4})/g, '$1-').slice(0, -1)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                          ₩{withdrawal.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            withdrawal.type === 'REFUND' 
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {withdrawal.type === 'REFUND' ? '환불' : 
                             withdrawal.type === 'SURVEY_COMPLETION' ? '리워드' : '기타'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            withdrawal.status === 'COMPLETED'
                              ? 'bg-green-100 text-green-800'
                              : withdrawal.status === 'REJECTED'
                              ? 'bg-red-100 text-red-800'
                              : withdrawal.status === 'APPROVED'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {withdrawal.status === 'COMPLETED' ? '완료' : 
                             withdrawal.status === 'APPROVED' ? '승인됨' :
                             withdrawal.status === 'REJECTED' ? '거부됨' : '대기중'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {withdrawal.status === 'PENDING' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleWithdrawalApproval(withdrawal.id, 'approve')}
                                className="text-green-600 hover:text-green-900"
                              >
                                승인
                              </button>
                              <button
                                onClick={() => handleWithdrawalApproval(withdrawal.id, 'reject')}
                                className="text-red-600 hover:text-red-900"
                              >
                                거부
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFinance;