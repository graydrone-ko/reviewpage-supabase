import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Survey } from '../types';
import { formatKoreanTime } from '../utils/timezone';

interface ExtendedSurvey extends Survey {
  extensionCount?: number;
  cancellationStatus?: 'PENDING' | 'APPROVED' | 'REJECTED' | null;
  cancellationRequestedAt?: string;
}

const Dashboard: React.FC = () => {
  const [surveys, setSurveys] = useState<ExtendedSurvey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<ExtendedSurvey | null>(null);
  const [extensionDate, setExtensionDate] = useState('');
  const [extensionReason, setExtensionReason] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await api.get('/surveys');
      setSurveys(response.data.surveys);
    } catch (err: any) {
      setError('설문 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleExtendSurvey = async () => {
    if (!selectedSurvey || !extensionDate) return;

    try {
      setActionLoading(true);
      await api.patch(`/surveys/${selectedSurvey.id}/extend`, {
        newEndDate: extensionDate,
        reason: extensionReason
      });
      
      setShowExtensionModal(false);
      setExtensionDate('');
      setExtensionReason('');
      setSelectedSurvey(null);
      
      // 성공 메시지
      alert('설문 마감일이 성공적으로 연장되었습니다.');
      
      // 설문 목록 새로고침
      fetchSurveys();
    } catch (err: any) {
      alert(err.response?.data?.error || '연장 요청 중 오류가 발생했습니다.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRequestCancellation = async () => {
    if (!selectedSurvey || !cancellationReason.trim() || cancellationReason.trim().length < 10) {
      alert('중단 사유를 최소 10자 이상 입력해주세요.');
      return;
    }

    try {
      setActionLoading(true);
      await api.post(`/surveys/${selectedSurvey.id}/cancel-request`, {
        reason: cancellationReason
      });
      
      setShowCancellationModal(false);
      setCancellationReason('');
      setSelectedSurvey(null);
      
      // 성공 메시지
      alert('중단 요청이 성공적으로 제출되었습니다. 관리자 검토 후 처리됩니다.');
      
      // 설문 목록 새로고침
      fetchSurveys();
    } catch (err: any) {
      alert(err.response?.data?.error || '중단 요청 중 오류가 발생했습니다.');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (survey: ExtendedSurvey) => {
    const badges = [];
    
    // 기본 상태 배지
    const statusMap = {
      PENDING: { text: '승인 대기중', color: 'bg-yellow-100 text-yellow-800' },
      APPROVED: { text: '진행중', color: 'bg-blue-100 text-blue-800' },
      COMPLETED: { text: '완료', color: 'bg-green-100 text-green-800' },
      CANCELLED: { text: '취소', color: 'bg-red-100 text-red-800' }
    };
    
    const statusInfo = statusMap[survey.status as keyof typeof statusMap] || 
      { text: survey.status, color: 'bg-gray-100 text-gray-800' };
    
    badges.push(
      <span key="status" className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color} mr-1`}>
        {statusInfo.text}
      </span>
    );

    // 연장 배지
    if (survey.extensionCount && survey.extensionCount > 0) {
      badges.push(
        <span key="extension" className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800 mr-1">
          {survey.extensionCount}회 연장
        </span>
      );
    }

    // 중단 요청 배지
    if (survey.cancellationStatus === 'PENDING') {
      badges.push(
        <span key="cancellation" className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 mr-1">
          중단요청중
        </span>
      );
    } else if (survey.cancellationStatus === 'APPROVED') {
      badges.push(
        <span key="cancellation" className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 mr-1">
          중단승인
        </span>
      );
    }

    return <div className="flex flex-wrap">{badges}</div>;
  };

  const canExtend = (survey: ExtendedSurvey) => {
    return survey.status === 'APPROVED' && 
           new Date() <= new Date(survey.endDate) && 
           (survey.extensionCount || 0) < 2 &&
           !survey.cancellationStatus;
  };

  const canRequestCancellation = (survey: ExtendedSurvey) => {
    return survey.status === 'APPROVED' && !survey.cancellationStatus;
  };

  const getMinExtensionDate = () => {
    if (!selectedSurvey) return '';
    const tomorrow = new Date(new Date(selectedSurvey.endDate).getTime() + 24 * 60 * 60 * 1000);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxExtensionDate = () => {
    const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    return maxDate.toISOString().split('T')[0];
  };

  // Dashboard stats
  const getStats = () => {
    const approved = surveys.filter(s => s.status === 'APPROVED').length;
    const pending = surveys.filter(s => s.status === 'PENDING').length;
    const completed = surveys.filter(s => s.status === 'COMPLETED').length;
    const cancelled = surveys.filter(s => s.status === 'CANCELLED').length;
    
    const totalResponses = surveys.reduce((sum, survey) => sum + (survey.responseCount || 0), 0);
    const totalBudget = surveys.reduce((sum, survey) => 
      sum + (survey.reward * (survey.maxParticipants || 50) * 1.1), 0);
    
    return { approved, pending, completed, cancelled, totalResponses, totalBudget };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-medium text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            판매자 대시보드
          </h1>
          <p className="text-gray-600 text-lg">설문 현황을 한눈에 확인하고 관리하세요</p>
        </div>

        {/* Stats overview */}
        <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/80 backdrop-blur-sm shadow-xl mb-8 p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/0 to-purple-50/50 opacity-50" />
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700">총 설문 수</h3>
                </div>
                <p className="text-3xl font-bold text-gray-900">{surveys.length}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    진행중 {stats.approved}
                  </span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    대기중 {stats.pending}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700">총 응답 수</h3>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.totalResponses}</p>
                <div className="text-sm text-gray-600">
                  전체 설문 응답 합계
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700">총 예산</h3>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBudget.toLocaleString()}원</p>
                <div className="text-sm text-gray-600">
                  수수료 포함 금액
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700">완료된 설문</h3>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    완료 {stats.completed}
                  </span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    취소 {stats.cancelled}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">내 설문 목록</h2>
          <Link
            to="/surveys/create"
            className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              새 설문 생성
            </span>
          </Link>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-6 py-4 rounded-2xl shadow-lg mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Survey list */}
        {surveys.length === 0 ? (
          <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/80 backdrop-blur-sm shadow-xl p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/0 to-purple-50/50 opacity-50" />
            <div className="relative z-10 space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-xl text-gray-600 mb-4">아직 생성된 설문이 없습니다.</p>
              <Link
                to="/surveys/create"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                첫 설문 생성하기
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surveys.map((survey) => {
              const progressPercentage = Math.round(((survey.responseCount || 0) / (survey.maxParticipants || 50)) * 100);
              const isExpired = new Date() > new Date(survey.endDate) && survey.status === 'APPROVED';

              return (
                <div key={survey.id} className="group relative overflow-hidden rounded-2xl border border-white/50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/0 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-2 flex-1 mr-4">
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{survey.title}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {getStatusBadge(survey)}
                          {isExpired && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                              만료됨
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions dropdown */}
                      {(canExtend(survey) || canRequestCancellation(survey)) && (
                        <div className="relative inline-block">
                          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                          <select
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const action = e.target.value;
                              if (action === 'extend') {
                                setSelectedSurvey(survey);
                                setShowExtensionModal(true);
                              } else if (action === 'cancel') {
                                setSelectedSurvey(survey);
                                setShowCancellationModal(true);
                              }
                              e.target.value = '';
                            }}
                            defaultValue=""
                          >
                            <option value="">작업 선택</option>
                            {canExtend(survey) && <option value="extend">마감연장</option>}
                            {canRequestCancellation(survey) && <option value="cancel">중단요청</option>}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {survey.description || '설명 없음'}
                    </p>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="space-y-1">
                        <div className="text-xs text-gray-500 flex items-center">
                          <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          총 예산
                        </div>
                        <div className="font-semibold text-gray-900">
                          {(survey.reward * (survey.maxParticipants || 50) * 1.1).toLocaleString()}원
                        </div>
                        <div className="text-xs text-gray-500">
                          건당 {survey.reward.toLocaleString()}원 × {survey.maxParticipants || 50}명
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-xs text-gray-500 flex items-center">
                          <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          진행현황
                        </div>
                        <div className="font-semibold text-gray-900">
                          {survey.responseCount || 0}/{survey.maxParticipants || 50}명
                          {survey.status === 'APPROVED' && (
                            <span className="text-xs ml-1 text-gray-500">
                              ({progressPercentage}% 완료)
                            </span>
                          )}
                        </div>
                        
                        {/* Progress bar */}
                        {survey.status === 'APPROVED' && (
                          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="space-y-1">
                        <div className="text-xs text-gray-500 flex items-center">
                          <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          종료일
                        </div>
                        <div className={`font-medium text-sm ${isExpired ? 'text-red-600' : 'text-gray-900'}`}>
                          {(() => {
                            try {
                              const endDate = new Date(survey.endDate);
                              if (isNaN(endDate.getTime())) {
                                return <span className="text-red-600">날짜 오류</span>;
                              }
                              return formatKoreanTime(endDate, 'date');
                            } catch (error) {
                              return <span className="text-red-600">날짜 처리 오류</span>;
                            }
                          })()}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/surveys/${survey.id}`}
                          className="px-3 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center"
                        >
                          상세보기
                          <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        
                        {survey.status === 'APPROVED' && (survey.responseCount || 0) > 0 && (
                          <Link
                            to={`/surveys/${survey.id}/responses`}
                            className="px-3 py-1.5 text-sm bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
                          >
                            응답보기
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 마감연장 모달 */}
      {showExtensionModal && selectedSurvey && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                설문 마감연장
              </h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>설문:</strong> {selectedSurvey.title}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>현재 마감일:</strong> {(() => {
                    try {
                      const endDate = new Date(selectedSurvey.endDate);
                      if (isNaN(endDate.getTime())) {
                        return '날짜 오류';
                      }
                      return formatKoreanTime(endDate, 'datetime');
                    } catch (error) {
                      return '날짜 처리 오류';
                    }
                  })()}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  최대 2회까지, 30일 이내로 연장 가능합니다. 
                  현재 {selectedSurvey.extensionCount || 0}회 연장하였습니다.
                </p>
                
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  새 마감일 *
                </label>
                <input
                  type="date"
                  value={extensionDate}
                  onChange={(e) => setExtensionDate(e.target.value)}
                  min={getMinExtensionDate()}
                  max={getMaxExtensionDate()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  required
                />
                
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연장 사유 (선택사항)
                </label>
                <textarea
                  value={extensionReason}
                  onChange={(e) => setExtensionReason(e.target.value)}
                  placeholder="연장 사유를 입력해주세요..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowExtensionModal(false);
                    setExtensionDate('');
                    setExtensionReason('');
                    setSelectedSurvey(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  disabled={actionLoading}
                >
                  취소
                </button>
                <button
                  onClick={handleExtendSurvey}
                  disabled={!extensionDate || actionLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? '처리중...' : '연장하기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 중단요청 모달 */}
      {showCancellationModal && selectedSurvey && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                설문 중단요청
              </h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>설문:</strong> {selectedSurvey.title}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>진행현황:</strong> {selectedSurvey.responseCount || 0}/{selectedSurvey.maxParticipants || 50}명
                </p>
                
                {(() => {
                  const completed = selectedSurvey.responseCount || 0;
                  const total = selectedSurvey.maxParticipants || 50;
                  const remaining = total - completed;
                  
                  // 원래 로직이 맞음: 미진행분 리워드 + 해당 수수료
                  const refundRewards = remaining * selectedSurvey.reward;
                  const refundFee = refundRewards * 0.1;
                  const totalRefund = refundRewards + refundFee;
                  
                  return (
                    <div className="bg-blue-50 p-3 rounded mb-4">
                      <p className="text-xs text-blue-800 mb-1">
                        <strong>예상 환불액:</strong>
                      </p>
                      <p className="text-xs text-blue-700">
                        미진행 리워드: {refundRewards.toLocaleString()}원<br/>
                        미진행 수수료: {refundFee.toLocaleString()}원<br/>
                        <strong>총 환불액: {totalRefund.toLocaleString()}원</strong>
                      </p>
                    </div>
                  );
                })()}
                
                <p className="text-xs text-red-600 mb-4">
                  ⚠️ 중단 요청 후에는 취소할 수 없으며, 관리자 검토를 거쳐 처리됩니다.
                </p>
                
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  중단 사유 * (최소 10자)
                </label>
                <textarea
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  placeholder="중단 사유를 상세히 입력해주세요... (최소 10자)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  rows={4}
                  required
                />
                <p className="text-xs text-gray-500 mb-4">
                  {cancellationReason.length}/10자 (최소 10자 이상)
                </p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowCancellationModal(false);
                    setCancellationReason('');
                    setSelectedSurvey(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  disabled={actionLoading}
                >
                  취소
                </button>
                <button
                  onClick={handleRequestCancellation}
                  disabled={cancellationReason.length < 10 || actionLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? '처리중...' : '중단요청'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;