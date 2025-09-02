import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../../services/api';

interface SurveyResponse {
  id: string;
  responses: any[];
  createdAt: string;
  consumer: {
    id: string;
    name: string;
    email: string;
    birthDate: string;
    gender: 'MALE' | 'FEMALE';
  };
}

interface Survey {
  id: string;
  title: string;
  description: string;
  url: string;
  seller: {
    name: string;
    email: string;
  };
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const AdminResponseReview: React.FC = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedResponse, setSelectedResponse] = useState<SurveyResponse | null>(null);

  useEffect(() => {
    if (surveyId) {
      fetchSurveyResponses();
    }
  }, [surveyId, pagination.page]);

  const fetchSurveyResponses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString()
      });

      const response = await fetch(`${API_URL}/admin/surveys/${surveyId}/responses?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          setError('설문을 찾을 수 없습니다.');
          return;
        }
        throw new Error('설문 응답 불러오기 실패');
      }

      const data = await response.json();
      setSurvey(data.survey);
      setResponses(data.responses);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setLoading(false);
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

  const getGenderText = (gender: string) => {
    return gender === 'MALE' ? '남성' : '여성';
  };

  const calculateAge = (birthDate: string) => {
    if (birthDate.length !== 6) return '알 수 없음';
    const year = parseInt(birthDate.slice(0, 2));
    const fullYear = year < 30 ? 2000 + year : 1900 + year;
    const currentYear = new Date().getFullYear();
    return currentYear - fullYear;
  };

  const renderResponseContent = (responseData: any[]) => {
    return responseData.map((item, index) => (
      <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="font-medium text-gray-900 mb-2">질문 {index + 1}</div>
        <div className="text-gray-700">
          {typeof item === 'object' ? JSON.stringify(item, null, 2) : item}
        </div>
      </div>
    ));
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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <button
          onClick={() => navigate('/admin/surveys')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          설문 목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/surveys')}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-700"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            설문 목록으로 돌아가기
          </button>
          
          {survey && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{survey.title}</h1>
              <p className="text-gray-600 mb-4">{survey.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>판매자: {survey.seller.name} ({survey.seller.email})</span>
                <span>•</span>
                <a
                  href={survey.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  설문 URL 확인
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 응답 목록 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              설문 응답 ({pagination.total}개)
            </h2>
          </div>

          {responses.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              아직 응답이 없습니다.
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-200">
                {responses.map((response) => (
                  <div key={response.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="font-medium text-gray-900">{response.consumer.name}</div>
                          <div className="text-sm text-gray-500">
                            {response.consumer.email} | 
                            {getGenderText(response.consumer.gender)} | 
                            {calculateAge(response.consumer.birthDate)}세
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">
                          {formatDate(response.createdAt)}
                        </div>
                        <button
                          onClick={() => setSelectedResponse(
                            selectedResponse?.id === response.id ? null : response
                          )}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                        >
                          {selectedResponse?.id === response.id ? '접기' : '상세보기'}
                        </button>
                      </div>
                    </div>
                    
                    {selectedResponse?.id === response.id && (
                      <div className="mt-4 pl-4 border-l-4 border-blue-200">
                        <h4 className="font-medium text-gray-900 mb-3">응답 내용</h4>
                        {renderResponseContent(response.responses)}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* 페이지네이션 */}
              {pagination.pages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
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
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminResponseReview;