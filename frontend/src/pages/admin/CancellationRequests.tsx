import React, { useState, useEffect } from 'react';
import { API_URL } from '../../services/api';

interface CancellationRequest {
  id: string;
  title: string;
  storeName: string;
  totalBudget: number;
  reward: number;
  cancellationStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  cancellationRequestedAt: string;
  seller: {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
  };
  _count: {
    responses: number;
  };
}

interface CancellationStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  refunds: {
    pending: number;
    approved: number;
  };
}

const CancellationRequests: React.FC = () => {
  const [requests, setRequests] = useState<CancellationRequest[]>([]);
  const [stats, setStats] = useState<CancellationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<{ surveyId: string; action: 'approve' | 'reject'; title: string } | null>(null);
  const [reason, setReason] = useState('');

  const calculateRefundAmount = (request: CancellationRequest): number => {
    const totalBudget = request.totalBudget || 0;
    const rewardPerResponse = request.reward || 0;
    const completedResponses = request._count.responses;
    const totalRewardsPaid = completedResponses * rewardPerResponse;
    
    // 플랫폼 수수료 (5%)
    const platformFeeRate = 0.05;
    const platformFee = totalBudget * platformFeeRate;
    
    // 실제 환불 금액 = 전체 예산 - 지급된 리워드 - 플랫폼 수수료
    return Math.max(0, totalBudget - totalRewardsPaid - platformFee);
  };

  useEffect(() => {
    fetchStats();
    fetchRequests();
  }, [selectedStatus]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/cancellation-requests/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Stats fetch error:', err);
    }
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const statusParam = selectedStatus !== 'ALL' ? `?status=${selectedStatus}` : '';
      const response = await fetch(`${API_URL}/admin/cancellation-requests${statusParam}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('중단요청 목록 불러오기 실패');
      }

      const data = await response.json();
      setRequests(data.cancellationRequests);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = (surveyId: string, action: 'approve' | 'reject', title: string) => {
    setModalData({ surveyId, action, title });
    setShowModal(true);
    setReason('');
  };

  const confirmProcess = async () => {
    if (!modalData) return;

    try {
      setProcessingId(modalData.surveyId);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/cancellation-requests/${modalData.surveyId}/process`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: modalData.action,
          reason: reason.trim() || undefined
        })
      });

      if (!response.ok) {
        throw new Error('중단요청 처리 실패');
      }

      await fetchStats();
      await fetchRequests();
      setShowModal(false);
      setModalData(null);
      setReason('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '처리 중 오류가 발생했습니다.');
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: '대기 중' },
      APPROVED: { bg: 'bg-green-100', text: 'text-green-800', label: '승인됨' },
      REJECTED: { bg: 'bg-red-100', text: 'text-red-800', label: '거절됨' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  if (loading && !requests.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">중단요청 관리</h1>
          <button 
            onClick={fetchRequests}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            새로고침
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* 통계 카드 */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">전체 요청</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                <p className="text-sm text-gray-600">대기 중</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                <p className="text-sm text-gray-600">승인됨</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                <p className="text-sm text-gray-600">거절됨</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">₩{stats.refunds.pending.toLocaleString()}</p>
                <p className="text-sm text-gray-600">환불 대기액</p>
              </div>
            </div>
          </div>
        )}

        {/* 상태 필터 */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex space-x-2">
            {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'ALL' ? '전체' : status === 'PENDING' ? '대기중' : status === 'APPROVED' ? '승인됨' : '거절됨'}
              </button>
            ))}
          </div>
        </div>

        {/* 중단요청 목록 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">중단요청이 없습니다.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      설문 정보
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      판매자
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      환불액
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      응답수
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      요청일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      처리
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{request.title}</div>
                          <div className="text-sm text-gray-500">{request.storeName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{request.seller.name}</div>
                          <div className="text-sm text-gray-500">{request.seller.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ₩{calculateRefundAmount(request).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          (총액: ₩{request.totalBudget?.toLocaleString() || '0'})
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{request._count.responses}개</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(request.cancellationRequestedAt).toLocaleDateString('ko-KR')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(request.cancellationStatus)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {request.cancellationStatus === 'PENDING' ? (
                          <div className="space-x-2">
                            <button
                              onClick={() => handleProcess(request.id, 'approve', request.title)}
                              disabled={processingId === request.id}
                              className="text-green-600 hover:text-green-900 disabled:opacity-50"
                            >
                              승인
                            </button>
                            <button
                              onClick={() => handleProcess(request.id, 'reject', request.title)}
                              disabled={processingId === request.id}
                              className="text-red-600 hover:text-red-900 disabled:opacity-50 ml-3"
                            >
                              거절
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-500">처리완료</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 처리 확인 모달 */}
        {showModal && modalData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-lg font-bold mb-4">
                중단요청 {modalData.action === 'approve' ? '승인' : '거절'}
              </h2>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">설문: {modalData.title}</p>
                <p className="text-sm text-gray-800">
                  이 중단요청을 {modalData.action === 'approve' ? '승인' : '거절'}하시겠습니까?
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {modalData.action === 'approve' ? '승인' : '거절'} 사유 (선택사항)
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder={`${modalData.action === 'approve' ? '승인' : '거절'} 사유를 입력하세요`}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setModalData(null);
                    setReason('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  onClick={confirmProcess}
                  disabled={processingId !== null}
                  className={`flex-1 px-4 py-2 rounded-lg text-white ${
                    modalData.action === 'approve'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  } disabled:opacity-50`}
                >
                  {processingId ? '처리 중...' : modalData.action === 'approve' ? '승인' : '거절'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancellationRequests;