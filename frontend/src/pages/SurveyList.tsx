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
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchSurveys();
    
    // 사용자 정보 로드
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
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
    
    // 시간대 차이를 보정하여 정확한 날짜 계산
    now.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 디버그 로그 (개발 환경에서만)
    if (process.env.NODE_ENV === 'development') {
      console.log('마감일 계산:', {
        endDate: endDate,
        parsedEndDate: end.toISOString(),
        today: now.toISOString(),
        diffDays: diffDays
      });
    }
    
    return diffDays;
  };

  // 사용자 나이 계산 함수
  const calculateUserAge = (birthDate: string) => {
    if (!birthDate) return null;
    
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  // 대상자 검증 함수
  const isEligibleForSurvey = (survey: Survey) => {
    if (!user) return true; // 로그인하지 않은 경우 일단 허용
    
    const userAge = calculateUserAge(user.birthDate);
    const targetAgeMin = survey.target_age_min || survey.targetAgeMin;
    const targetAgeMax = survey.target_age_max || survey.targetAgeMax;
    const targetGender = survey.target_gender || survey.targetGender;
    
    // 나이 검증
    if (userAge && targetAgeMin && targetAgeMax) {
      if (userAge < targetAgeMin || userAge > targetAgeMax) {
        return false;
      }
    }
    
    // 성별 검증
    if (targetGender && targetGender !== 'ALL' && user.gender !== targetGender) {
      return false;
    }
    
    return true;
  };

  // 부적격자 알림 함수
  const handleIneligibleSurvey = (survey: Survey) => {
    const userAge = calculateUserAge(user.birthDate);
    const targetAgeMin = survey.target_age_min || survey.targetAgeMin;
    const targetAgeMax = survey.target_age_max || survey.targetAgeMax;
    const targetGender = survey.target_gender || survey.targetGender;
    
    let reasons = [];
    
    if (userAge && targetAgeMin && targetAgeMax) {
      if (userAge < targetAgeMin || userAge > targetAgeMax) {
        reasons.push(`연령 대상: ${targetAgeMin}-${targetAgeMax}세 (회원님: ${userAge}세)`);
      }
    }
    
    if (targetGender && targetGender !== 'ALL' && user.gender !== targetGender) {
      const genderText = targetGender === 'MALE' ? '남성' : '여성';
      const userGenderText = user.gender === 'MALE' ? '남성' : '여성';
      reasons.push(`성별 대상: ${genderText} (회원님: ${userGenderText})`);
    }
    
    const message = reasons.length > 0 
      ? `죄송합니다. 이 설문은 다음 조건에 해당하는 분만 참여할 수 있습니다:\n\n${reasons.join('\n')}\n\n다른 설문에 참여해 주세요.`
      : '죄송합니다. 설문 참여 대상이 아닙니다. 다른 설문에 참여해 주세요.';
    
    alert(message);
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
                    <span className="ml-1">
                      {survey.target_age_min && survey.target_age_max 
                        ? `${survey.target_age_min}-${survey.target_age_max}세`
                        : survey.targetAgeMin && survey.targetAgeMax
                        ? `${survey.targetAgeMin}-${survey.targetAgeMax}세`
                        : '전체'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">대상 성별:</span>
                    <span className="ml-1">
                      {(survey.target_gender || survey.targetGender) === 'ALL' ? '전체' : 
                       (survey.target_gender || survey.targetGender) === 'MALE' ? '남성' : 
                       (survey.target_gender || survey.targetGender) === 'FEMALE' ? '여성' : '전체'}
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
                  ) : isEligibleForSurvey(survey) ? (
                    <Link
                      to={`/surveys/${survey.id}/participate`}
                      className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 text-center block"
                    >
                      설문 참여하기
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleIneligibleSurvey(survey)}
                      className="w-full bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 text-center block"
                    >
                      설문 참여하기
                    </button>
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