import React, { useState, useEffect } from 'react';
import { API_URL } from '../../services/api';
import { getBankName, formatAccountNumber, formatPhoneNumber } from '../../utils/banks';

interface WithdrawalRequest {
  id: string;
  userId: string;
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedAt: string;
  processedAt: string | null;
  processedBy: string | null;
  note: string | null;
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

const WithdrawalRequests: React.FC = () => {
  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchWithdrawalRequests();
  }, [pagination.page, statusFilter]);

  const fetchWithdrawalRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(statusFilter && { status: statusFilter })
      });

      const response = await fetch(`${API_URL}/admin/withdrawal-requests?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('출금 요청 목록 불러오기 실패');
      }

      const data = await response.json();
      setRequests(data.requests);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const processWithdrawalRequest = async (requestId: string, action: 'approve' | 'reject', note?: string) => {
    setProcessing(requestId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/withdrawal-requests/${requestId}/process`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action, note })
      });

      if (!response.ok) {
        throw new Error('출금 요청 처리 실패');
      }

      // 목록 새로고침
      fetchWithdrawalRequests();
      alert(`출금 요청이 ${action === 'approve' ? '승인' : '거절'}되었습니다.`);
    } catch (err) {
      alert(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setProcessing(null);
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
      APPROVED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800'
    };
    const labels = {
      PENDING: '대기중',
      APPROVED: '승인됨',
      REJECTED: '거절됨'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
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

  if (loading && requests.length === 0) {
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
          <h1 className="text-3xl font-bold text-gray-900">출금 요청 관리</h1>
          <p className="mt-2 text-gray-600">사용자 출금 요청을 조회하고 승인/거절 처리합니다.</p>
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
                <option value="PENDING">대기중</option>
                <option value="APPROVED">승인됨</option>
                <option value="REJECTED">거절됨</option>
              </select>
            </div>
            <div className="text-sm text-gray-500">
              총 {pagination.total}건 | 
              {' '}총 금액: {formatCurrency(requests.reduce((sum, req) => sum + req.amount, 0))}
            </div>
          </div>
        </div>

        {/* 출금 요청 목록 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    요청자 정보
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    금액
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    요청일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">{request.user.name}</span>
                            {getRoleBadge(request.user.role)}
                          </div>
                          <div className="text-xs text-gray-500">{request.user.email}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">
                            📞 {formatPhoneNumber(request.user.phoneNumber || '')}
                          </div>
                        </div>
                        {request.user.bankCode && request.user.accountNumber && (
                          <div className="bg-green-50 p-2 rounded border">
                            <div className="text-xs font-medium text-green-900">
                              🏦 {getBankName(request.user.bankCode)}
                            </div>
                            <div 
                              className="text-xs font-mono text-green-800 cursor-pointer hover:bg-green-100 p-1 rounded"
                              onClick={() => navigator.clipboard.writeText(request.user.accountNumber || '')}
                              title="클릭하여 복사"
                            >
                              {formatAccountNumber(request.user.accountNumber)}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(request.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                      {request.note && (
                        <div className="text-xs text-gray-500 mt-1">
                          📝 {request.note}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{formatDate(request.requestedAt)}</div>
                      {request.processedAt && (
                        <div className="text-xs text-gray-400">
                          처리: {formatDate(request.processedAt)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {request.status === 'PENDING' ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => processWithdrawalRequest(request.id, 'approve')}
                            disabled={processing === request.id}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {processing === request.id ? '처리 중...' : '승인'}
                          </button>
                          <button
                            onClick={() => {
                              const note = prompt('거절 사유를 입력하세요 (선택사항):');
                              processWithdrawalRequest(request.id, 'reject', note || undefined);
                            }}
                            disabled={processing === request.id}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            거절
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">처리됨</span>
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

export default WithdrawalRequests;