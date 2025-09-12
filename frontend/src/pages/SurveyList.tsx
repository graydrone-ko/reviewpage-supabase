import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Survey } from '../types';

interface ParticipationStatus {
  status: 'PARTICIPATED' | 'AVAILABLE';
  responseId?: string;
  completedAt?: string;
  updatedAt?: string;
}

const SurveyList: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [participationStatus, setParticipationStatus] = useState<Record<string, ParticipationStatus>>({});

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await api.get('/surveys');
      const surveyList = response.data.surveys;
      setSurveys(surveyList);
      
      // 참여 상태 조회
      if (surveyList.length > 0) {
        await fetchParticipationStatus(surveyList.map((s: Survey) => s.id));
      }
    } catch (err: any) {
      setError('설문 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchParticipationStatus = async (surveyIds: string[]) => {
    try {
      const response = await api.post('/surveys/participation-status/bulk', {
        surveyIds
      });
      setParticipationStatus(response.data.participationStatus || {});
    } catch (err) {
      console.error('참여 상태 조회 실패:', err);
      // API 실패 시에도 빈 객체로 초기화
      setParticipationStatus({});
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">참여 가능한 설문</h1>
        <p className="text-gray-600 mt-2">설문에 참여하고 리워드를 받아보세요!</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {surveys.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="text-gray-500 mb-4">
            현재 참여 가능한 설문이 없습니다.
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {surveys.map((survey) => {
            const daysRemaining = getDaysRemaining(survey.endDate);
            return (
              <div key={survey.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {survey.title}
                  </h3>
                  <span className="text-2xl font-bold text-primary-600">
                    {survey.reward.toLocaleString()}원
                  </span>
                </div>
                
                {survey.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {survey.description}
                  </p>
                )}
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">대상 연령:</span>
                    <span className="ml-1">{survey.targetAgeMin}-{survey.targetAgeMax}세</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">대상 성별:</span>
                    <span className="ml-1">
                      {survey.targetGender === 'ALL' ? '전체' : 
                       survey.targetGender === 'MALE' ? '남성' : '여성'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">남은 기간:</span>
                    <span className={`ml-1 ${daysRemaining <= 3 ? 'text-red-600' : ''}`}>
                      {daysRemaining > 0 ? `${daysRemaining}일` : '마감'}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  {daysRemaining <= 0 ? (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed"
                    >
                      마감됨
                    </button>
                  ) : participationStatus && participationStatus[survey.id]?.status === 'PARTICIPATED' ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-center text-sm text-green-600 mb-2">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        참여 완료
                      </div>
                      <Link
                        to={`/surveys/${survey.id}/edit-response`}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-center block"
                      >
                        답변 수정
                      </Link>
                    </div>
                  ) : (
                    <Link
                      to={`/surveys/${survey.id}/participate`}
                      className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 text-center block"
                    >
                      설문 참여하기
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SurveyList;