import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../services/api';

interface DashboardStats {
  users: {
    total: number;
    consumers: number;
    sellers: number;
    recent: number;
  };
  surveys: {
    total: number;
    pending: number;
    approved: number;
    completed: number;
  };
  responses: {
    total: number;
  };
  rewards: {
    total: number;
    pending: number;
    paid: number;
  };
  notifications: {
    pendingWithdrawals: number;
    pendingCancellations: number;
  };
}

interface CancellationStats {
  count: number;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [cancellationStats, setCancellationStats] = useState<CancellationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
    fetchCancellationStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 403) {
          setError('관리자 권한이 필요합니다.');
          return;
        }
        throw new Error('통계 데이터 불러오기 실패');
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCancellationStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/cancellation-requests/recent`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCancellationStats({ count: data.count });
      }
    } catch (err) {
      console.error('Cancellation stats fetch error:', err);
    }
  };

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

  if (!stats) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">관리자 대시보드</h1>
        
        {/* 통계 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* 사용자 통계 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{stats.users.total.toLocaleString()}</p>
                <p className="text-sm text-gray-600">전체 사용자</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>소비자: {stats.users.consumers}명 | 판매자: {stats.users.sellers}명</p>
              <p className="text-green-600">최근 7일: +{stats.users.recent}명</p>
            </div>
          </div>

          {/* 설문 통계 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{stats.surveys.total}</p>
                <p className="text-sm text-gray-600">전체 설문</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>대기: {stats.surveys.pending} | 승인: {stats.surveys.approved}</p>
              <p>완료: {stats.surveys.completed}</p>
            </div>
          </div>

          {/* 응답 통계 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{stats.responses.total}</p>
                <p className="text-sm text-gray-600">전체 응답</p>
              </div>
            </div>
          </div>

          {/* 리워드 통계 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">₩{stats.rewards.total.toLocaleString()}</p>
                <p className="text-sm text-gray-600">총 리워드</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>대기: ₩{stats.rewards.pending.toLocaleString()}</p>
              <p>지급: ₩{stats.rewards.paid.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* 알림 섹션 */}
        {stats.notifications && (stats.notifications.pendingWithdrawals > 0 || stats.notifications.pendingCancellations > 0) && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🔔 대기중인 요청</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.notifications.pendingWithdrawals > 0 && (
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-orange-700">
                        <strong>{stats.notifications.pendingWithdrawals}건</strong>의 출금 요청이 승인을 기다리고 있습니다.
                      </p>
                      <button
                        onClick={() => navigate('/admin/withdrawal-requests')}
                        className="mt-2 text-sm text-orange-600 hover:text-orange-800 underline"
                      >
                        출금 요청 관리로 이동 →
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {stats.notifications.pendingCancellations > 0 && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        <strong>{stats.notifications.pendingCancellations}건</strong>의 중단 요청이 승인을 기다리고 있습니다.
                      </p>
                      <button
                        onClick={() => navigate('/admin/cancellation-requests')}
                        className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                      >
                        중단 요청 관리로 이동 →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 빠른 액세스 버튼들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <button
            onClick={() => navigate('/admin/surveys')}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">설문 관리</h3>
              <p className="text-gray-600">설문 승인 및 관리</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/users')}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">사용자 관리</h3>
              <p className="text-gray-600">사용자 조회 및 관리</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/rewards')}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">리워드 관리</h3>
              <p className="text-gray-600">리워드 지급 및 관리</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/cancellation-requests')}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow relative"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">중단요청 관리</h3>
              <p className="text-gray-600">설문 중단요청 처리</p>
              {stats.notifications && stats.notifications.pendingCancellations > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {stats.notifications.pendingCancellations}
                </div>
              )}
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/withdrawal-requests')}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow relative"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">출금요청 관리</h3>
              <p className="text-gray-600">사용자 출금요청 처리</p>
              {stats.notifications && stats.notifications.pendingWithdrawals > 0 && (
                <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {stats.notifications.pendingWithdrawals}
                </div>
              )}
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/finance')}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">재무 관리</h3>
              <p className="text-gray-600">입출금 및 수익 관리</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;