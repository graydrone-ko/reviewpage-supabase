import React, { useState, useEffect } from 'react';
import { API_URL } from '../../services/api';
import { getBankName, formatAccountNumber, formatPhoneNumber } from '../../utils/banks';

interface Reward {
  id: string;
  amount: number;
  type: 'SURVEY_COMPLETION' | 'BONUS';
  status: 'PENDING' | 'PAID';
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'SELLER' | 'CONSUMER';
    phoneNumber?: string;
    bankCode?: string;
    accountNumber?: string;
  };
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const AdminRewards: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchRewards();
  }, [pagination.page, statusFilter]);

  const fetchRewards = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(statusFilter && { status: statusFilter })
      });

      const response = await fetch(`${API_URL}/admin/rewards?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return;
        }
        throw new Error(`리워드 목록 불러오기 실패: ${response.status}`);
      }

      const data = await response.json();
      setRewards(data.rewards);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const updateRewardStatus = async (rewardId: string, status: 'PENDING' | 'PAID') => {
    setUpdating(rewardId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/rewards/${rewardId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('리워드 상태 업데이트 실패');
      }

      // 목록 새로고침
      fetchRewards();
      alert(`리워드 상태가 ${status === 'PAID' ? '지급완료' : '대기중'}으로 변경되었습니다.`);
    } catch (err) {
      alert(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return `₩${amount.toLocaleString()}`;
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PAID: 'bg-green-100 text-green-800'
    };
    const labels = {
      PENDING: '지급 대기',
      PAID: '지급 완료'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getTypeText = (type: string) => {
    return type === 'SURVEY_COMPLETION' ? '설문 참여' : '보너스';
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      ADMIN: 'bg-purple-100 text-purple-800',
      SELLER: 'bg-blue-100 text-blue-800',
      CONSUMER: 'bg-green-100 text-green-800'
    };
    const labels = {
      ADMIN: '관리자',
      SELLER: '판매자',
      CONSUMER: '소비자'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[role as keyof typeof styles]}`}>
        {labels[role as keyof typeof labels]}
      </span>
    );
  };

  if (loading && rewards.length === 0) {
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">리워드 관리</h1>
          <p className="mt-2 text-gray-600">사용자 리워드를 조회하고 지급 상태를 관리합니다.</p>
        </div>

        {/* 필터 및 통계 */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">상태 필터:</label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPagination(prev => ({ ...prev, page: 1 }));
                }}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">전체</option>
                <option value="PENDING">지급 대기</option>
                <option value="PAID">지급 완료</option>
              </select>
            </div>
            <div className="text-sm text-gray-500">
              총 {pagination.total}건 | 
              {' '}총 금액: {formatCurrency(rewards.reduce((sum, reward) => sum + reward.amount, 0))}
            </div>
          </div>
        </div>

        {/* 리워드 목록 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    수급자 정보
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    리워드 정보
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    금액
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    생성일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rewards.map((reward) => (
                  <tr key={reward.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">{reward.user.name}</span>
                            {getRoleBadge(reward.user.role)}
                          </div>
                          <div className="text-xs text-gray-500">{reward.user.email}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">
                            📞 {formatPhoneNumber(reward.user.phoneNumber || '')}
                          </div>
                        </div>
                        {reward.user.bankCode && reward.user.accountNumber && (
                          <div className="bg-green-50 p-2 rounded border">
                            <div className="text-xs font-medium text-green-900">
                              🏦 {getBankName(reward.user.bankCode)}
                            </div>
                            <div 
                              className="text-xs font-mono text-green-800 cursor-pointer hover:bg-green-100 p-1 rounded"
                              onClick={() => navigator.clipboard.writeText(reward.user.accountNumber || '')}
                              title="클릭하여 복사"
                            >
                              {formatAccountNumber(reward.user.accountNumber)}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getTypeText(reward.type)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(reward.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(reward.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{formatDate(reward.createdAt)}</div>
                      {reward.status === 'PAID' && reward.updatedAt !== reward.createdAt && (
                        <div className="text-xs text-gray-400">
                          지급: {formatDate(reward.updatedAt)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {reward.status === 'PENDING' ? (
                        <button
                          onClick={() => updateRewardStatus(reward.id, 'PAID')}
                          disabled={updating === reward.id}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {updating === reward.id ? '처리 중...' : '지급 완료'}
                        </button>
                      ) : (
                        <button
                          onClick={() => updateRewardStatus(reward.id, 'PENDING')}
                          disabled={updating === reward.id}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {updating === reward.id ? '처리 중...' : '대기로 변경'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 페이지네이션 */}
        {pagination.pages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              전체 {pagination.total}건 중 {((pagination.page - 1) * pagination.limit) + 1}-
              {Math.min(pagination.page * pagination.limit, pagination.total)}건 표시
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page <= 1 || loading}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                  const page = i + Math.max(1, pagination.page - 2);
                  return page <= pagination.pages ? (
                    <button
                      key={page}
                      onClick={() => setPagination(prev => ({ ...prev, page }))}
                      disabled={loading}
                      className={`px-3 py-2 text-sm border rounded-md ${
                        pagination.page === page
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      } disabled:opacity-50`}
                    >
                      {page}
                    </button>
                  ) : null;
                })}
              </div>

              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page >= pagination.pages || loading}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRewards;