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
    earned: number;
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
    let isCancelled = false;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const [statsResponse, cancellationResponse] = await Promise.all([
          fetch(`${API_URL}/admin/dashboard/stats`, { headers }),
          fetch(`${API_URL}/admin/cancellation-requests/recent`, { headers })
        ]);

        if (!statsResponse.ok) {
          if (statsResponse.status === 403) {
            if (!isCancelled) setError('관리자 권한이 필요합니다.');
            return;
          }
          throw new Error('통계 데이터 불러오기 실패');
        }

        const statsData = await statsResponse.json();
        if (!isCancelled) {
          setStats(statsData);
        }

        if (cancellationResponse.ok) {
          const cancellationData = await cancellationResponse.json();
          if (!isCancelled) {
            setCancellationStats({ count: cancellationData.count });
          }
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      isCancelled = true;
    };
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            관리자 대시보드
          </h1>
          <p className="text-xl text-gray-600">ReviewPage 플랫폼 통계 및 관리</p>
        </div>
        
        {/* 통계 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* 사용자 통계 */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stats.users.total.toLocaleString()}</p>
                  <p className="text-sm font-medium text-gray-600">전체 사용자</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">소비자</span>
                  <span className="font-semibold text-blue-600">{stats.users.consumers}명</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">판매자</span>
                  <span className="font-semibold text-indigo-600">{stats.users.sellers}명</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                  <span className="text-green-600 font-medium">최근 7일</span>
                  <span className="font-bold text-green-600">+{stats.users.recent}명</span>
                </div>
              </div>
            </div>
          </div>

          {/* 설문 통계 */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stats.surveys.total}</p>
                  <p className="text-sm font-medium text-gray-600">전체 설문</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">대기중</span>
                  <span className="font-semibold text-orange-600">{stats.surveys.pending}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">승인됨</span>
                  <span className="font-semibold text-green-600">{stats.surveys.approved}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">완료됨</span>
                  <span className="font-semibold text-blue-600">{stats.surveys.completed}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 응답 통계 */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stats.responses.total}</p>
                  <p className="text-sm font-medium text-gray-600">전체 응답</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3">
                <p className="text-center text-sm font-medium text-purple-700">
                  활발한 사용자 참여
                </p>
              </div>
            </div>
          </div>

          {/* 리워드 통계 */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 mb-1">₩{stats.rewards.total.toLocaleString()}</p>
                  <p className="text-sm font-medium text-gray-600">총 리워드</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">적립</span>
                  <span className="font-semibold text-blue-600">₩{(stats.rewards.earned ?? 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">출금 대기</span>
                  <span className="font-semibold text-orange-600">₩{stats.rewards.pending.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">지급 완료</span>
                  <span className="font-semibold text-green-600">₩{stats.rewards.paid.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 알림 섹션 */}
        {stats.notifications && (stats.notifications.pendingWithdrawals > 0 || stats.notifications.pendingCancellations > 0) && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-3xl mr-3">🔔</span>
              대기중인 요청
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.notifications.pendingWithdrawals > 0 && (
                <div className="group relative bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-400 hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl opacity-50"></div>
                  <div className="relative z-10 flex items-start">
                    <div className="flex-shrink-0 p-3 bg-orange-100 rounded-full">
                      <svg className="h-6 w-6 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-semibold text-orange-800 mb-2">출금 요청 대기</h3>
                      <p className="text-sm text-orange-700 mb-4">
                        <strong className="text-xl">{stats.notifications.pendingWithdrawals}건</strong>의 출금 요청이 승인을 기다리고 있습니다.
                      </p>
                      <button
                        onClick={() => navigate('/admin/withdrawal-requests')}
                        className="inline-flex items-center px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200"
                      >
                        출금 요청 관리
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {stats.notifications.pendingCancellations > 0 && (
                <div className="group relative bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-400 hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl opacity-50"></div>
                  <div className="relative z-10 flex items-start">
                    <div className="flex-shrink-0 p-3 bg-red-100 rounded-full">
                      <svg className="h-6 w-6 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-semibold text-red-800 mb-2">중단 요청 대기</h3>
                      <p className="text-sm text-red-700 mb-4">
                        <strong className="text-xl">{stats.notifications.pendingCancellations}건</strong>의 중단 요청이 승인을 기다리고 있습니다.
                      </p>
                      <button
                        onClick={() => navigate('/admin/cancellation-requests')}
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
                      >
                        중단 요청 관리
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 빠른 액세스 섹션 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">빠른 액세스</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/admin/surveys')}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">설문 관리</h3>
                <p className="text-gray-600 mb-4">설문 승인 및 관리</p>
                {stats.surveys.pending > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg animate-pulse">
                    {stats.surveys.pending}
                  </div>
                )}
                <div className="bg-blue-100 rounded-lg p-2">
                  <span className="text-blue-700 text-sm font-medium">전체 {stats.surveys.total}개</span>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/users')}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">사용자 관리</h3>
                <p className="text-gray-600 mb-4">사용자 조회 및 관리</p>
                <div className="bg-green-100 rounded-lg p-2">
                  <span className="text-green-700 text-sm font-medium">전체 {stats.users.total.toLocaleString()}명</span>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/rewards')}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">리워드 관리</h3>
                <p className="text-gray-600 mb-4">리워드 지급 및 관리</p>
                <div className="bg-yellow-100 rounded-lg p-2">
                  <span className="text-yellow-700 text-sm font-medium">₩{stats.rewards.total.toLocaleString()}</span>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/cancellation-requests')}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">중단요청 관리</h3>
                <p className="text-gray-600 mb-4">설문 중단요청 처리</p>
                {stats.notifications && stats.notifications.pendingCancellations > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg animate-pulse">
                    {stats.notifications.pendingCancellations}
                  </div>
                )}
                <div className="bg-red-100 rounded-lg p-2">
                  <span className="text-red-700 text-sm font-medium">요청 처리</span>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/withdrawal-requests')}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">출금요청 관리</h3>
                <p className="text-gray-600 mb-4">사용자 출금요청 처리</p>
                {stats.notifications && stats.notifications.pendingWithdrawals > 0 && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg animate-pulse">
                    {stats.notifications.pendingWithdrawals}
                  </div>
                )}
                <div className="bg-purple-100 rounded-lg p-2">
                  <span className="text-purple-700 text-sm font-medium">출금 처리</span>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/finance')}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">재무 관리</h3>
                <p className="text-gray-600 mb-4">입출금 및 수익 관리</p>
                <div className="bg-indigo-100 rounded-lg p-2">
                  <span className="text-indigo-700 text-sm font-medium">재무 현황</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
