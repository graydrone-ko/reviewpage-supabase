import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../services/api';
import { SurveyTemplate } from '../../types';
import SurveyTemplatePreview from '../SurveyTemplatePreview';

interface Survey {
  id: string;
  title: string;
  description: string;
  url: string;
  reward: number;
  maxParticipants: number;
  totalBudget: number;
  status: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'CANCELLED' | 'SUSPENDED';
  createdAt: string;
  endDate: string;
  approvedAt?: string;
  completedAt?: string;
  seller: {
    id: string;
    name: string;
    email: string;
  };
  template?: SurveyTemplate;
  _count: {
    responses: number;
  };
}

type SurveyStatus = 'ALL' | 'PENDING' | 'APPROVED' | 'COMPLETED' | 'CANCELLED' | 'SUSPENDED';

const EnhancedSurveyManager: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [filteredSurveys, setFilteredSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<SurveyStatus>('ALL');
  const [selectedSurveys, setSelectedSurveys] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewSurvey, setPreviewSurvey] = useState<Survey | null>(null);
  const [sortField, setSortField] = useState<'createdAt' | 'endDate' | 'title' | 'status'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchAllSurveys();
  }, []);

  useEffect(() => {
    filterAndSortSurveys();
  }, [surveys, selectedStatus, searchTerm, sortField, sortOrder]);

  const fetchAllSurveys = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/surveys`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('설문 목록 불러오기 실패');
      }

      const data = await response.json();
      setSurveys(data.surveys);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortSurveys = () => {
    let filtered = surveys.filter(survey => {
      const matchesStatus = selectedStatus === 'ALL' || survey.status === selectedStatus;
      const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           survey.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           survey.seller.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });

    // Sort surveys
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortField === 'createdAt' || sortField === 'endDate') {
        const aTime = new Date(aValue).getTime();
        const bTime = new Date(bValue).getTime();
        return sortOrder === 'desc' ? bTime - aTime : aTime - bTime;
      } else {
        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();
        if (sortOrder === 'desc') {
          return bStr.localeCompare(aStr);
        } else {
          return aStr.localeCompare(bStr);
        }
      }
    });

    setFilteredSurveys(filtered);
  };

  const updateSurveyStatus = async (surveyId: string, status: 'APPROVED' | 'CANCELLED' | 'SUSPENDED' | 'COMPLETED') => {
    setUpdating(surveyId);
    try {
      const token = localStorage.getItem('token');
      let endpoint = '';
      let method = 'PATCH';
      let body = {};
      
      if (status === 'APPROVED') {
        endpoint = `${API_URL}/admin/surveys/${surveyId}/approve`;
      } else if (status === 'CANCELLED') {
        endpoint = `${API_URL}/admin/surveys/${surveyId}/reject`;
        body = { reason: '관리자에 의해 취소됨' };
      } else {
        // For other status updates, we'll need to add new endpoints or use a general status endpoint
        endpoint = `${API_URL}/admin/surveys/${surveyId}/status`;
        body = { status };
      }
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('설문 상태 업데이트 실패');
      }

      // Update surveys list
      setSurveys(prev => prev.map(survey => 
        survey.id === surveyId 
          ? { ...survey, status, ...(status === 'APPROVED' ? { approvedAt: new Date().toISOString() } : {}) }
          : survey
      ));
      
      const statusLabels = {
        APPROVED: '승인',
        CANCELLED: '취소',
        SUSPENDED: '일시중단',
        COMPLETED: '완료'
      };
      
      alert(`설문이 ${statusLabels[status]}되었습니다.`);
    } catch (err) {
      alert(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setUpdating(null);
    }
  };

  const bulkUpdateSurveys = async (status: 'APPROVED' | 'CANCELLED' | 'SUSPENDED') => {
    if (selectedSurveys.size === 0) {
      alert('설문을 선택해주세요.');
      return;
    }

    const confirm = window.confirm(`선택된 ${selectedSurveys.size}개 설문을 ${status === 'APPROVED' ? '승인' : status === 'CANCELLED' ? '취소' : '일시중단'}하시겠습니까?`);
    if (!confirm) return;

    setUpdating('bulk');
    try {
      const token = localStorage.getItem('token');
      await Promise.all(
        Array.from(selectedSurveys).map(surveyId => {
          let endpoint = '';
          let body = {};
          
          if (status === 'APPROVED') {
            endpoint = `${API_URL}/admin/surveys/${surveyId}/approve`;
          } else if (status === 'CANCELLED') {
            endpoint = `${API_URL}/admin/surveys/${surveyId}/reject`;
            body = { reason: '일괄 취소됨' };
          } else {
            endpoint = `${API_URL}/admin/surveys/${surveyId}/status`;
            body = { status };
          }
          
          return fetch(endpoint, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });
        })
      );

      // Update surveys list
      setSurveys(prev => prev.map(survey => 
        selectedSurveys.has(survey.id) 
          ? { ...survey, status }
          : survey
      ));
      
      setSelectedSurveys(new Set());
      alert(`${selectedSurveys.size}개 설문이 처리되었습니다.`);
    } catch (err) {
      alert('일부 설문 처리에 실패했습니다.');
    } finally {
      setUpdating(null);
    }
  };

  const toggleSurveySelection = (surveyId: string) => {
    const newSelected = new Set(selectedSurveys);
    if (newSelected.has(surveyId)) {
      newSelected.delete(surveyId);
    } else {
      newSelected.add(surveyId);
    }
    setSelectedSurveys(newSelected);
  };

  const selectAllCurrentPage = () => {
    const currentPageIds = filteredSurveys.map(survey => survey.id);
    setSelectedSurveys(new Set(currentPageIds));
  };

  const clearSelection = () => {
    setSelectedSurveys(new Set());
  };

  const previewSurveyTemplate = (survey: Survey) => {
    setPreviewSurvey(survey);
    setShowPreview(true);
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

  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      APPROVED: 'bg-green-100 text-green-800',
      COMPLETED: 'bg-blue-100 text-blue-800',
      CANCELLED: 'bg-red-100 text-red-800',
      SUSPENDED: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      PENDING: '승인대기',
      APPROVED: '진행중',
      COMPLETED: '완료',
      CANCELLED: '취소됨',
      SUSPENDED: '일시중단'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getAvailableActions = (survey: Survey) => {
    const actions = [];
    
    switch (survey.status) {
      case 'PENDING':
        actions.push(
          { action: 'APPROVED', label: '승인', color: 'bg-green-600 hover:bg-green-700' },
          { action: 'CANCELLED', label: '거부', color: 'bg-red-600 hover:bg-red-700' }
        );
        break;
      case 'APPROVED':
        actions.push(
          { action: 'SUSPENDED', label: '일시중단', color: 'bg-yellow-600 hover:bg-yellow-700' },
          { action: 'COMPLETED', label: '완료처리', color: 'bg-blue-600 hover:bg-blue-700' }
        );
        break;
      case 'SUSPENDED':
        actions.push(
          { action: 'APPROVED', label: '재개', color: 'bg-green-600 hover:bg-green-700' },
          { action: 'CANCELLED', label: '취소', color: 'bg-red-600 hover:bg-red-700' }
        );
        break;
    }
    
    return actions;
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">향상된 설문 관리</h1>
          <p className="mt-2 text-gray-600">모든 설문의 전체 라이프사이클을 관리합니다.</p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">상태 필터</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as SurveyStatus)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ALL">전체</option>
                <option value="PENDING">승인대기</option>
                <option value="APPROVED">진행중</option>
                <option value="COMPLETED">완료</option>
                <option value="SUSPENDED">일시중단</option>
                <option value="CANCELLED">취소됨</option>
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">검색</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="설문명, 판매자명, 이메일..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Sort Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">정렬 기준</label>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as any)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="createdAt">등록일</option>
                <option value="endDate">마감일</option>
                <option value="title">제목</option>
                <option value="status">상태</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">정렬 순서</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="desc">내림차순</option>
                <option value="asc">올림차순</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedSurveys.size > 0 && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {selectedSurveys.size}개 설문 선택됨
                  </span>
                  <button
                    onClick={clearSelection}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    선택 해제
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => bulkUpdateSurveys('APPROVED')}
                    disabled={updating === 'bulk'}
                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    일괄 승인
                  </button>
                  <button
                    onClick={() => bulkUpdateSurveys('SUSPENDED')}
                    disabled={updating === 'bulk'}
                    className="px-4 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 disabled:opacity-50"
                  >
                    일괄 중단
                  </button>
                  <button
                    onClick={() => bulkUpdateSurveys('CANCELLED')}
                    disabled={updating === 'bulk'}
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    일괄 취소
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {['PENDING', 'APPROVED', 'COMPLETED', 'SUSPENDED', 'CANCELLED'].map(status => {
            const count = surveys.filter(s => s.status === status).length;
            return (
              <div key={status} className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600">{getStatusLabel(status)}</div>
              </div>
            );
          })}
        </div>

        {/* Survey List */}
        {filteredSurveys.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-gray-500 text-lg">조건에 맞는 설문이 없습니다.</div>
            {selectedStatus !== 'ALL' && (
              <button
                onClick={() => setSelectedStatus('ALL')}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                전체 설문 보기
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                총 {filteredSurveys.length}개 설문
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={selectAllCurrentPage}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  현재 페이지 전체 선택
                </button>
              </div>
            </div>

            {filteredSurveys.map((survey) => (
              <div key={survey.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Selection Checkbox */}
                  <div className="lg:col-span-3">
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedSurveys.has(survey.id)}
                        onChange={() => toggleSurveySelection(survey.id)}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {survey.title}
                            </h3>
                            <p className="text-gray-600 mb-3">{survey.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>판매자: {survey.seller.name} ({survey.seller.email})</span>
                              <span>•</span>
                              <span>등록일: {formatDate(survey.createdAt)}</span>
                              {survey.approvedAt && (
                                <>
                                  <span>•</span>
                                  <span>승인일: {formatDate(survey.approvedAt)}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(survey.status)}`}>
                            {getStatusLabel(survey.status)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">설문 URL:</span>
                            <p className="text-blue-600 break-all">{survey.url}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">마감일:</span>
                            <p>{formatDate(survey.endDate)}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">목표 인원:</span>
                            <p>{survey.maxParticipants}명</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">개별 리워드:</span>
                            <p>{formatCurrency(survey.reward)}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">총 예산:</span>
                            <p>{formatCurrency(survey.totalBudget)}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">현재 응답:</span>
                            <p>{survey._count.responses}명</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col justify-center space-y-2">
                    {getAvailableActions(survey).map((actionConfig) => (
                      <button
                        key={actionConfig.action}
                        onClick={() => updateSurveyStatus(survey.id, actionConfig.action as any)}
                        disabled={updating === survey.id}
                        className={`w-full px-4 py-2 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${actionConfig.color}`}
                      >
                        {updating === survey.id ? '처리 중...' : actionConfig.label}
                      </button>
                    ))}
                    
                    <a
                      href={survey.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-center transition-colors"
                    >
                      설문 확인
                    </a>
                    
                    {survey.template && (
                      <button
                        onClick={() => previewSurveyTemplate(survey)}
                        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors"
                      >
                        템플릿 미리보기
                      </button>
                    )}
                    
                    {survey._count.responses > 0 && (
                      <Link
                        to={`/admin/surveys/${survey.id}/responses`}
                        className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium text-center transition-colors"
                      >
                        응답 검토 ({survey._count.responses}개)
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Survey Template Preview Modal */}
        {previewSurvey && (
          <SurveyTemplatePreview
            template={previewSurvey.template}
            title={`${previewSurvey.title} - 템플릿 미리보기`}
            isOpen={showPreview}
            onClose={() => {
              setShowPreview(false);
              setPreviewSurvey(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default EnhancedSurveyManager;