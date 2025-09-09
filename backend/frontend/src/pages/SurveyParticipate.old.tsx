import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Survey } from '../types';

interface SurveyResponse {
  section: string;
  emotion: 'positive' | 'neutral' | 'negative';
  feedback: string;
}

const SurveyParticipate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // 기본 섹션들 (실제로는 페이지를 분석해서 동적으로 생성)
  const sections = useMemo(() => [
    { name: '전체적인 인상', description: '페이지의 첫인상에 대해 평가해주세요' },
    { name: '제품 정보', description: '제품 설명과 정보의 명확성을 평가해주세요' },
    { name: '가격 정보', description: '가격 표시와 할인 정보에 대해 평가해주세요' },
    { name: '구매 버튼', description: '구매 프로세스의 편의성을 평가해주세요' },
    { name: '전반적 만족도', description: '전체적인 사용자 경험을 평가해주세요' }
  ], []);

  const fetchSurvey = useCallback(async () => {
    try {
      const response = await api.get(`/surveys/${id}`);
      setSurvey(response.data.survey);
    } catch (err: any) {
      setError('설문을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const initializeResponses = useCallback(() => {
    const initialResponses = sections.map(section => ({
      section: section.name,
      emotion: 'neutral' as const,
      feedback: ''
    }));
    setResponses(initialResponses);
  }, [sections]);

  useEffect(() => {
    if (id) {
      fetchSurvey();
      initializeResponses();
    }
  }, [id, fetchSurvey, initializeResponses]);

  const handleEmotionChange = (emotion: 'positive' | 'neutral' | 'negative') => {
    const newResponses = [...responses];
    newResponses[currentSection].emotion = emotion;
    setResponses(newResponses);
  };

  const handleFeedbackChange = (feedback: string) => {
    const newResponses = [...responses];
    newResponses[currentSection].feedback = feedback;
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    try {
      await api.post('/responses', {
        surveyId: id,
        responses
      });
      
      alert('설문 참여가 완료되었습니다! 리워드가 지급되었습니다.');
      navigate('/surveys');
    } catch (err: any) {
      setError(err.response?.data?.error || '설문 제출 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 text-center">
        <div className="text-red-600">설문을 찾을 수 없습니다.</div>
      </div>
    );
  }

  const currentSectionData = sections[currentSection];
  const currentResponse = responses[currentSection];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
        {/* 설문 영역 */}
        <div className="w-full lg:w-1/2 xl:w-3/5">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{survey.title}</h1>
                <span className="text-lg font-semibold text-primary-600">
                  {survey.reward.toLocaleString()}원
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                />
              </div>
              
              <div className="text-sm text-gray-500">
                {currentSection + 1} / {sections.length} 단계
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {/* Current section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {currentSectionData.name}
              </h2>
              <p className="text-gray-600 mb-6">
                {currentSectionData.description}
              </p>

              {/* Product page URL display */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-600 font-medium mb-2">평가할 상품 페이지:</div>
                <a 
                  href={survey.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-800 underline text-sm break-all"
                >
                  {survey.url}
                </a>
                <div className="text-xs text-blue-500 mt-2">
                  → 오른쪽 미리보기에서 페이지를 확인하며 설문해주세요
                </div>
              </div>

              {/* Emotion selection */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  이 섹션에 대한 감정 평가
                </h3>
                <div className="flex space-x-4">
                  {[
                    { value: 'positive', emoji: '😊', label: '좋음', color: 'bg-green-100 text-green-800' },
                    { value: 'neutral', emoji: '😐', label: '보통', color: 'bg-gray-100 text-gray-800' },
                    { value: 'negative', emoji: '😞', label: '아쉬움', color: 'bg-red-100 text-red-800' }
                  ].map((emotion) => (
                    <button
                      key={emotion.value}
                      onClick={() => handleEmotionChange(emotion.value as any)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        currentResponse.emotion === emotion.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{emotion.emoji}</div>
                      <div className={`text-sm px-2 py-1 rounded-full ${emotion.color}`}>
                        {emotion.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback input */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  상세 피드백 (선택사항)
                </h3>
                <textarea
                  value={currentResponse.feedback}
                  onChange={(e) => handleFeedbackChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  rows={4}
                  placeholder="이 섹션에 대한 상세한 의견을 남겨주세요..."
                />
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                disabled={currentSection === 0}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>
              
              <button
                onClick={handleNext}
                disabled={submitting}
                className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
              >
                {submitting ? '제출 중...' : 
                 currentSection === sections.length - 1 ? '완료' : '다음'}
              </button>
            </div>
          </div>
        </div>

        {/* 미리보기 영역 */}
        <div className="w-full lg:w-1/2 xl:w-2/5">
          <div className="sticky top-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">상품 페이지 미리보기</h3>
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  모바일 뷰
                </div>
              </div>
              
              {/* iPhone 스타일 프레임 */}
              <div className="mx-auto" style={{ width: '375px', maxWidth: '100%' }}>
                <div className="bg-black rounded-[2.5rem] p-2 shadow-xl">
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    {/* 상단 노치 영역 */}
                    <div className="bg-gray-50 h-8 flex items-center justify-center">
                      <div className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* iframe 영역 */}
                    <div className="relative">
                      <iframe
                        src={survey.url}
                        className="w-full border-0"
                        style={{ height: '600px' }}
                        title="상품 페이지 미리보기"
                        sandbox="allow-scripts allow-same-origin"
                        onLoad={() => setIframeLoaded(true)}
                      />
                      
                      {/* 로딩 오버레이 */}
                      {!iframeLoaded && (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                            페이지 로딩 중...
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <a 
                  href={survey.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  새 탭에서 열기
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyParticipate;