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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">판매자 대시보드</h1>
        <Link
          to="/surveys/create"
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          새 설문 생성
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">내 설문 목록</h2>
        </div>
        
        {surveys.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            아직 생성된 설문이 없습니다.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    설문 제목
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    총 예산
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    진행현황
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    종료일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {surveys.map((survey) => (
                  <tr key={survey.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {survey.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {survey.description || '설명 없음'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(survey)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(survey.reward * (survey.maxParticipants || 50) * 1.1).toLocaleString()}원
                      <div className="text-xs text-gray-500">
                        건당 {survey.reward.toLocaleString()}원 × {survey.maxParticipants || 50}명
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div className="font-medium">
                          {survey.responseCount || 0}/{survey.maxParticipants || 50}명
                        </div>
                        {survey.status === 'APPROVED' && (
                          <div className="text-xs text-gray-500">
                            ({Math.round(((survey.responseCount || 0) / (survey.maxParticipants || 50)) * 100)}% 완료)
                          </div>
                        )}
                        {survey.status === 'PENDING' && (
                          <div className="text-xs text-gray-500">승인 대기중</div>
                        )}
                        {survey.status === 'COMPLETED' && (
                          <div className="text-xs text-green-600">설문 완료</div>
                        )}
                        {survey.status === 'CANCELLED' && (
                          <div className="text-xs text-red-600">설문 취소</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatKoreanTime(new Date(survey.endDate), 'datetime')}
                      {new Date() > new Date(survey.endDate) && survey.status === 'APPROVED' && (
                        <div className="text-xs text-red-600">만료됨</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/surveys/${survey.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          상세보기
                        </Link>
                        
                        {survey.status === 'APPROVED' && (survey.responseCount || 0) > 0 && (
                          <Link
                            to={`/surveys/${survey.id}/responses`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            응답내용
                          </Link>
                        )}

                        {/* 드롭다운 메뉴 */}
                        {(canExtend(survey) || canRequestCancellation(survey)) && (
                          <div className="relative inline-block text-left">
                            <select
                              className="text-gray-600 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                              {canExtend(survey) && (
                                <option value="extend">마감연장</option>
                              )}
                              {canRequestCancellation(survey) && (
                                <option value="cancel">중단요청</option>
                              )}
                            </select>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  <strong>현재 마감일:</strong> {formatKoreanTime(new Date(selectedSurvey.endDate), 'datetime')}
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