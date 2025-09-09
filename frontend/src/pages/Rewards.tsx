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
  totalPending: number;
}

const Rewards: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [summary, setSummary] = useState<RewardSummary>({
    totalEarned: 0,
    totalPaid: 0,
    totalPending: 0
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
      const amount = parseInt(withdrawalAmount);
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
      case 'PENDING':
        return '제출 완료';
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
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">내 리워드</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">총 적립 금액</h3>
          <p className="text-2xl font-bold text-gray-900">
            {summary.totalEarned.toLocaleString()}원
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">출금 가능 금액</h3>
          <p className="text-2xl font-bold text-primary-600">
            {summary.totalPending.toLocaleString()}원
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">출금 완료 금액</h3>
          <p className="text-2xl font-bold text-green-600">
            {summary.totalPaid.toLocaleString()}원
          </p>
        </div>
      </div>

      {/* Withdrawal Form */}
      {summary.totalPending > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">출금 신청</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}
          
          {summary.totalPending < 10000 ? (
            <div className="bg-orange-50 border border-orange-200 text-orange-700 px-4 py-3 rounded mb-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">출금 가능 금액이 최소 출금 가능 10,000원보다 작습니다.</span>
              </div>
              <p className="text-sm mt-2">
                현재 출금 가능 금액: {summary.totalPending.toLocaleString()}원<br/>
                최소 출금 금액: 10,000원
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleWithdrawal} className="flex items-end space-x-4">
                <div className="flex-1">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    출금 금액 (최소 10,000원)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    min="10000"
                    max={summary.totalPending}
                    step="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="출금할 금액을 입력하세요"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={withdrawing || !withdrawalAmount}
                  className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {withdrawing ? '처리 중...' : '출금 신청'}
                </button>
              </form>
              
              <p className="text-sm text-gray-500 mt-2">
                출금 신청 후 2-3 영업일 내에 처리됩니다.
              </p>
            </>
          )}
        </div>
      )}

      {/* Rewards History */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">리워드 내역</h2>
        </div>
        
        {rewards.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            아직 적립된 리워드가 없습니다.
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      날짜
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      설문 제목
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      스토어 이름
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      금액
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rewards.map((reward) => (
                    <tr key={reward.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(reward.createdAt).toLocaleDateString('ko-KR')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="max-w-xs truncate" title={reward.surveyTitle || '설문 정보 없음'}>
                          {reward.surveyTitle || '설문 정보 없음'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                        {reward.storeName || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                        +{reward.amount.toLocaleString()}원
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          reward.status === 'PAID' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {getStatusLabel(reward.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-4 p-4">
              {rewards.map((reward) => (
                <div key={reward.id} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 mr-4">
                      <h3 className="font-medium text-gray-900 text-sm mb-1" title={reward.surveyTitle || '설문 정보 없음'}>
                        {reward.surveyTitle || '설문 정보 없음'}
                      </h3>
                      <p className="text-xs text-blue-600 font-medium">
                        {reward.storeName || '-'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-green-600">
                        +{reward.amount.toLocaleString()}원
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(reward.createdAt).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      reward.status === 'PAID' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {getStatusLabel(reward.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Rewards;