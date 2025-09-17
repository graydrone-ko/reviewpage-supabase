import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface Reward {
  id: string;
  amount: number;
  type: string;
  status: string;
  createdAt: string;
  surveyTitle?: string;
  storeName?: string;
}

interface RewardSummary {
  totalEarned: number;
  totalPaid: number;
  totalAccrued: number;
  totalWithdrawalPending: number;
}

const Rewards: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [summary, setSummary] = useState<RewardSummary>({
    totalEarned: 0,
    totalPaid: 0,
    totalAccrued: 0,
    totalWithdrawalPending: 0
  });
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const response = await api.get('/rewards/my');
      setRewards(response.data.rewards);
      setSummary(response.data.summary);
      setWithdrawalAmount(response.data.summary.totalAccrued > 0 ? String(response.data.summary.totalAccrued) : '');
    } catch (err: any) {
      setError('리워드 정보를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawing(true);
    setError('');
    setSuccess('');

    try {
      const amount = parseInt(withdrawalAmount, 10);
      await api.post('/rewards/withdraw', { amount });
      
      setSuccess('출금 신청이 완료되었습니다.');
      setWithdrawalAmount('');
      fetchRewards(); // Refresh data
    } catch (err: any) {
      setError(err.response?.data?.error || '출금 신청 중 오류가 발생했습니다.');
    } finally {
      setWithdrawing(false);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'SURVEY_COMPLETION':
        return '설문 완료';
      case 'BONUS':
        return '보너스';
      default:
        return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'EARNED':
        return '리워드 적립';
      case 'PENDING':
        return '지급 대기';
      case 'PAID':
        return '지급 완료';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            내 리워드
          </h1>
          <p className="text-xl text-gray-600">설문 참여로 적립된 리워드를 확인하고 출금하세요</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 mb-1">₩{summary.totalEarned.toLocaleString()}</p>
                  <p className="text-sm font-medium text-gray-600">총 적립 금액</p>
                </div>
              </div>
              <div className="bg-blue-100 rounded-lg p-3">
                <p className="text-center text-sm font-medium text-blue-700">전체 적립 내역</p>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 mb-1">₩{summary.totalAccrued.toLocaleString()}</p>
                  <p className="text-sm font-medium text-gray-600">출금 가능 금액</p>
                </div>
              </div>
              <div className="bg-green-100 rounded-lg p-3">
                <p className="text-center text-sm font-medium text-green-700">
                  {summary.totalAccrued >= 10000 ? '출금 가능' : '최소 10,000원 필요'}
                </p>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 mb-1">₩{summary.totalWithdrawalPending.toLocaleString()}</p>
                  <p className="text-sm font-medium text-gray-600">출금 대기 금액</p>
                </div>
              </div>
              <div className="bg-yellow-100 rounded-lg p-3">
                <p className="text-center text-sm font-medium text-yellow-700">처리 대기 중</p>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 mb-1">₩{summary.totalPaid.toLocaleString()}</p>
                  <p className="text-sm font-medium text-gray-600">출금 완료 금액</p>
                </div>
              </div>
              <div className="bg-emerald-100 rounded-lg p-3">
                <p className="text-center text-sm font-medium text-emerald-700">지급 완료</p>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawal Form */}
        {summary.totalAccrued > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 mb-12 border border-white/50">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">출금 신청</h2>
                <p className="text-gray-600">적립된 리워드를 계좌로 출금 신청하세요</p>
              </div>
            </div>

            {summary.totalWithdrawalPending > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-800 px-6 py-4 rounded-2xl mb-6">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold">출금 대기 중인 금액이 있습니다</p>
                    <p className="text-sm mt-1">관리자 처리가 완료된 후 다시 신청할 수 있습니다.</p>
                  </div>
                </div>
              </div>
            )}
            
            {error && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800 px-6 py-4 rounded-2xl mb-6">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}
            
            {success && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 px-6 py-4 rounded-2xl mb-6">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{success}</span>
                </div>
              </div>
            )}
            
            {summary.totalAccrued < 10000 ? (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 text-orange-800 px-6 py-6 rounded-2xl">
                <div className="flex items-start">
                  <svg className="w-6 h-6 mr-4 mt-1 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-lg mb-2">출금 가능 금액 부족</p>
                    <p className="text-orange-700 mb-3">최소 출금 금액에 도달하지 못했습니다.</p>
                    <div className="bg-white/50 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">현재 출금 가능 금액</span>
                        <span className="text-lg font-bold">₩{summary.totalAccrued.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">최소 출금 금액</span>
                        <span className="text-lg font-bold">₩10,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <form onSubmit={handleWithdrawal} className="space-y-6">
                  <div>
                    <label htmlFor="amount" className="block text-lg font-semibold text-gray-900 mb-3">
                      출금 금액
                    </label>
                    <p className="text-sm text-gray-600 mb-4">현재 출금 가능 금액 전체만 신청 가능합니다</p>
                    <div className="relative">
                      <input
                        type="number"
                        id="amount"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                        min="10000"
                        max={summary.totalAccrued}
                        step="1000"
                        className="w-full px-6 py-4 text-xl font-bold border-2 border-gray-200 rounded-2xl focus:ring-green-500 focus:border-green-500 bg-gray-50"
                        placeholder="출금할 금액을 입력하세요"
                        required
                        readOnly
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                        원
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={withdrawing || !withdrawalAmount || summary.totalWithdrawalPending > 0}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-xl py-4 px-8 rounded-2xl hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center justify-center">
                      {withdrawing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          처리 중...
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          출금 신청하기
                        </>
                      )}
                    </div>
                  </button>
                </form>
                
                <div className="bg-blue-50 rounded-2xl p-6">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">출금 처리 안내</p>
                      <p className="text-blue-700">출금 신청 후 2-3 영업일 내에 처리됩니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Rewards History */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50">
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">리워드 내역</h2>
                <p className="text-gray-600">설문 참여로 적립된 리워드 기록</p>
              </div>
            </div>
          </div>
          
          {rewards.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">아직 적립된 리워드가 없습니다</h3>
              <p className="text-gray-600">설문에 참여하여 리워드를 적립해보세요!</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        날짜
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        설문 제목
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        스토어 이름
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        금액
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        상태
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/50">
                    {rewards.map((reward, index) => (
                      <tr key={reward.id} className="hover:bg-white/80 transition-colors duration-200 border-b border-gray-100">
                        <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-gray-900">
                          {new Date(reward.createdAt).toLocaleDateString('ko-KR')}
                        </td>
                        <td className="px-8 py-6 text-sm text-gray-900">
                          <div className="max-w-xs truncate font-medium" title={reward.surveyTitle || '설문 정보 없음'}>
                            {reward.surveyTitle || '설문 정보 없음'}
                          </div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-sm text-indigo-600 font-semibold">
                          {reward.storeName || '-'}
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-lg font-bold text-green-600">
                          +₩{reward.amount.toLocaleString()}
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                            reward.status === 'PAID' 
                              ? 'bg-green-100 text-green-800' 
                              : reward.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              reward.status === 'PAID' 
                                ? 'bg-green-500' 
                                : reward.status === 'PENDING'
                                ? 'bg-yellow-500'
                                : 'bg-blue-500'
                            }`}></div>
                            {getStatusLabel(reward.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Layout */}
              <div className="md:hidden space-y-4 p-6">
                {rewards.map((reward) => (
                  <div key={reward.id} className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 mr-4">
                        <h3 className="font-semibold text-gray-900 text-base mb-2" title={reward.surveyTitle || '설문 정보 없음'}>
                          {reward.surveyTitle || '설문 정보 없음'}
                        </h3>
                        <p className="text-sm text-indigo-600 font-medium mb-1">
                          {reward.storeName || '-'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(reward.createdAt).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-green-600 block mb-2">
                          +₩{reward.amount.toLocaleString()}
                        </span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          reward.status === 'PAID' 
                            ? 'bg-green-100 text-green-800' 
                            : reward.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            reward.status === 'PAID' 
                              ? 'bg-green-500' 
                              : reward.status === 'PENDING'
                              ? 'bg-yellow-500'
                              : 'bg-blue-500'
                          }`}></div>
                          {getStatusLabel(reward.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
