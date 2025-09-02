import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Survey, SurveyResponse } from '../types';
import { formatKoreanTime } from '../utils/timezone';

const SurveyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showResponses, setShowResponses] = useState(false);

  useEffect(() => {
    if (id) {
      fetchSurveyDetail();
    }
  }, [id]);

  const fetchSurveyDetail = async () => {
    try {
      const [surveyResponse, responsesResponse] = await Promise.all([
        api.get(`/surveys/${id}`),
        api.get(`/surveys/${id}/responses`).catch(() => ({ data: { responses: [] } }))
      ]);
      
      setSurvey(surveyResponse.data.survey);
      setResponses(responsesResponse.data.responses || []);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('설문을 찾을 수 없습니다.');
      } else if (err.response?.status === 403) {
        setError('설문에 접근할 권한이 없습니다.');
      } else {
        setError('설문 정보를 불러오는 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSurvey = async () => {
    if (!survey || !window.confirm('정말로 설문을 취소하시겠습니까?')) {
      return;
    }

    try {
      await api.patch(`/surveys/${id}`, { status: 'CANCELLED' });
      navigate('/dashboard');
    } catch (err) {
      alert('설문 취소 중 오류가 발생했습니다.');
    }
  };

  const handleExportCSV = () => {
    if (!responses.length) return;

    const csvContent = generateCSV(responses, survey);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `survey_${survey?.title}_responses.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateCSV = (responses: SurveyResponse[], survey: Survey | null) => {
    const headers = ['응답일시', '응답자ID'];
    const rows: string[][] = [];

    if (survey?.template?.steps) {
      survey.template.steps.forEach(step => {
        step.questions.forEach(question => {
          headers.push(`Q${question.questionNumber}: ${question.text}`);
        });
      });
    }

    responses.forEach(response => {
      const row = [
        formatKoreanTime(new Date(response.createdAt), 'datetime'),
        response.consumerId
      ];

      if (survey?.template?.steps) {
        survey.template.steps.forEach(step => {
          step.questions.forEach(question => {
            const stepResponse = response.responses.find(r => r.stepId === step.id);
            const answer = stepResponse?.answers.find(a => a.questionId === question.id);
            row.push(answer?.value?.toString() || '');
          });
        });
      }

      rows.push(row);
    });

    return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  };

  const getStatusDisplay = (status: string) => {
    const statusMap = {
      PENDING: { text: '승인 대기중', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
      APPROVED: { text: '진행중', color: 'text-blue-600', bgColor: 'bg-blue-100' },
      COMPLETED: { text: '완료', color: 'text-green-600', bgColor: 'bg-green-100' },
      CANCELLED: { text: '취소', color: 'text-red-600', bgColor: 'bg-red-100' }
    };
    
    return statusMap[status as keyof typeof statusMap] || 
      { text: status, color: 'text-gray-600', bgColor: 'bg-gray-100' };
  };

  const getRemainingDays = () => {
    if (!survey) return 0;
    const now = new Date();
    const endDate = new Date(survey.endDate);
    const diffTime = endDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-2 text-sm text-red-500 hover:text-red-700"
          >
            대시보드로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="text-center">
          <p className="text-gray-500">설문을 찾을 수 없습니다.</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-2 text-primary-600 hover:text-primary-800"
          >
            대시보드로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const statusDisplay = getStatusDisplay(survey.status);
  const responseCount = survey.responseCount || responses.length;
  const progressPercentage = ((responseCount / (survey.maxParticipants || 50)) * 100);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate('/dashboard')}
        className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        대시보드로
      </button>

      {/* 제목 섹션 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {survey.title}
          </h1>
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${statusDisplay.color} ${statusDisplay.bgColor}`}>
            {statusDisplay.text}
          </span>
        </div>
        
        {survey.description && (
          <p className="text-gray-600 leading-relaxed">
            {survey.description}
          </p>
        )}
      </div>

      {/* 승인 대기중 상태 */}
      {survey.status === 'PENDING' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-yellow-800 mb-4">설문 승인 대기 중</h2>
          <div className="space-y-2 text-yellow-700">
            <p>🕐 관리자 승인을 기다리고 있습니다</p>
            <p>📋 설문 내용 미리보기가 가능합니다</p>
            <p>💰 입금 확인 후 승인 처리됩니다</p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-yellow-800 mb-3">설문 정보</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">목표 인원:</span> {survey.maxParticipants}명
              </div>
              <div>
                <span className="font-medium">건당 리워드:</span> {survey.reward.toLocaleString()}원
              </div>
              <div>
                <span className="font-medium">총 예산:</span> {survey.totalBudget?.toLocaleString()}원
              </div>
              <div>
                <span className="font-medium">마감일:</span> {formatKoreanTime(new Date(survey.endDate), 'datetime')}
              </div>
            </div>
          </div>

          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleCancelSurvey}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              설문 취소
            </button>
          </div>
        </div>
      )}

      {/* 진행중 상태 */}
      {survey.status === 'APPROVED' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">설문 진행 현황</h2>
          
          {/* 진행 현황 대시보드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">응답 현황</h3>
              <p className="text-3xl font-bold text-blue-600">
                {responseCount}/{survey.maxParticipants}명
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">{progressPercentage.toFixed(1)}% 완료</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">남은 기간</h3>
              <p className="text-3xl font-bold text-blue-600">{getRemainingDays()}일</p>
              <p className="text-sm text-gray-600 mt-1">
                {formatKoreanTime(new Date(survey.endDate), 'date')}까지
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">실제 비용</h3>
              <p className="text-3xl font-bold text-blue-600">
                {(responseCount * survey.reward).toLocaleString()}원
              </p>
              <p className="text-sm text-gray-600 mt-1">
                예상 총 비용: {((survey.maxParticipants || 50) * survey.reward).toLocaleString()}원
              </p>
            </div>
          </div>

          {/* 응답 내용 보기 */}
          {responseCount > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">응답 내용</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowResponses(!showResponses)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {showResponses ? '응답 숨기기' : `응답 보기 (${responseCount}개)`}
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    CSV 다운로드
                  </button>
                </div>
              </div>

              {showResponses && responses.length > 0 && (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {responses.slice(0, 10).map((response, idx) => (
                    <div key={response.id} className="border border-gray-200 rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">응답 #{idx + 1}</span>
                        <span className="text-sm text-gray-500">
                          {formatKoreanTime(new Date(response.createdAt), 'datetime')}
                        </span>
                      </div>
                      {response.responses.map((stepResponse, stepIdx) => (
                        <div key={stepIdx} className="ml-4 space-y-1">
                          {stepResponse.answers.map((answer, answerIdx) => (
                            <div key={answerIdx} className="text-sm">
                              <span className="text-gray-600">답변 {answerIdx + 1}:</span> {answer.value}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                  {responses.length > 10 && (
                    <p className="text-center text-gray-500 text-sm">
                      처음 10개 응답만 표시됩니다. 전체 응답은 CSV로 다운로드해서 확인하세요.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 완료 상태 */}
      {survey.status === 'COMPLETED' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">설문 완료</h2>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">최종 결과</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">총 응답자:</span> {responseCount}명
              </div>
              <div>
                <span className="font-medium">총 리워드 지급:</span> {(responseCount * survey.reward).toLocaleString()}원
              </div>
              <div>
                <span className="font-medium">완료일:</span> {formatKoreanTime(new Date(), 'date')}
              </div>
              <div>
                <span className="font-medium">달성률:</span> {((responseCount / (survey.maxParticipants || 50)) * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          {responseCount > 0 && (
            <div className="flex space-x-4">
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                전체 보고서 다운로드
              </button>
              <Link
                to={`/surveys/${id}/responses`}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                상세 분석 보기
              </Link>
            </div>
          )}
        </div>
      )}

      {/* 취소된 상태 */}
      {survey.status === 'CANCELLED' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-red-800 mb-4">설문 취소됨</h2>
          <p className="text-red-700">이 설문은 취소되었습니다.</p>
          <div className="mt-4">
            <p className="text-sm text-red-600">
              취소 전까지 수집된 응답: {responseCount}개
            </p>
          </div>
        </div>
      )}

      {/* 설문 내용 미리보기 */}
      {survey.template && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">설문 내용 미리보기</h3>
          <div className="space-y-6">
            {survey.template.steps?.map((step, stepIdx) => (
              <div key={step.id} className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  단계 {step.stepNumber}: {step.title}
                </h4>
                {step.description && (
                  <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                )}
                <div className="space-y-3">
                  {step.questions?.map((question, qIdx) => (
                    <div key={question.id} className="bg-gray-50 p-3 rounded">
                      <p className="font-medium text-gray-900">
                        Q{question.questionNumber}: {question.text}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        답변 방식: {question.type === 'MULTIPLE_CHOICE' ? '객관식' : 
                                 question.type === 'TEXT' ? '주관식' :
                                 question.type === 'SCORE' ? '평점' : '예/아니오'}
                        {question.required && ' (필수)'}
                      </p>
                      {question.options && question.options.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 mb-1">선택지:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {question.options.map((option, optIdx) => (
                              <li key={option.id}>{option.text}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyDetail;