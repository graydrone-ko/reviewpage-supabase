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
    
    // 마감일까지 남은 일수 계산
    
    return diffDays;
  };

  // 사용자 나이 계산 함수
  const calculateUserAge = (birthDate: string) => {
    if (!birthDate) return null;
    
    // 생년월일 형식 처리: 'YYMMDD' 또는 'YYYYMMDD' 또는 ISO 형식
    let birth: Date;
    
    if (birthDate.length === 6) {
      // YYMMDD 형식 (예: '900101')
      const year = parseInt(birthDate.substring(0, 2));
      const month = parseInt(birthDate.substring(2, 4)) - 1; // 월은 0부터 시작
      const day = parseInt(birthDate.substring(4, 6));
      
      // 50년 이상은 1900년대, 50년 미만은 2000년대로 가정 (현재 2024년 기준)
      const fullYear = year >= 50 ? 1900 + year : 2000 + year;
      birth = new Date(fullYear, month, day);
    } else if (birthDate.length === 8) {
      // YYYYMMDD 형식 (예: '19900101')
      const year = parseInt(birthDate.substring(0, 4));
      const month = parseInt(birthDate.substring(4, 6)) - 1;
      const day = parseInt(birthDate.substring(6, 8));
      birth = new Date(year, month, day);
    } else {
      // ISO 형식 또는 기타 형식
      birth = new Date(birthDate);
    }
    
    // 유효한 날짜인지 확인
    if (isNaN(birth.getTime())) {
      return null;
    }
    
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  // 대상자 검증 함수
  const isEligibleForSurvey = (survey: Survey) => {
    if (!user) {
      return true; // 로그인하지 않은 경우 일단 허용 (로그인 시 자격 검증함)
    }
    
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            참여 가능한 설문
          </h1>
          <p className="text-xl text-gray-600 mb-6">설문에 참여하고 리워드를 받아보세요!</p>
          {user && (
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/50">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-gray-700 font-medium">
                {user.name}님 ({user.birthDate ? calculateUserAge(user.birthDate) : '?'}세)
              </span>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 shadow-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {surveys.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 max-w-md mx-auto border border-white/50">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">참여 가능한 설문이 없습니다</h3>
              <p className="text-gray-600">새로운 설문이 등록되면 알려드리겠습니다.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {surveys.map((survey) => {
              const daysRemaining = getDaysRemaining(survey.endDate);
              return (
                <div key={survey.id} className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    {/* 리워드 뱃지 */}
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg transform rotate-12">
                      <span className="text-lg font-bold">₩{survey.reward.toLocaleString()}</span>
                    </div>
                    
                    {/* 마감 임박 표시 */}
                    {daysRemaining <= 3 && daysRemaining > 0 && (
                      <div className="absolute -top-4 -left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        {daysRemaining}일 남음!
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {survey.title}
                      </h3>
                      
                      {survey.description && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {survey.description}
                        </p>
                      )}
                    </div>
                    
                    {/* 참여 정보 카드 */}
                    <div className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <span className="text-gray-600">대상 연령</span>
                        </div>
                        <span className="text-gray-900 font-medium">
                          {survey.target_age_min && survey.target_age_max 
                            ? `${survey.target_age_min}-${survey.target_age_max}세`
                            : survey.targetAgeMin && survey.targetAgeMax
                            ? `${survey.targetAgeMin}-${survey.targetAgeMax}세`
                            : '전체'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                          <span className="text-gray-600">대상 성별</span>
                        </div>
                        <span className="text-gray-900 font-medium">
                          {(survey.target_gender || survey.targetGender) === 'ALL' ? '전체' : 
                           (survey.target_gender || survey.targetGender) === 'MALE' ? '남성' : 
                           (survey.target_gender || survey.targetGender) === 'FEMALE' ? '여성' : '전체'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <div className={`w-2 h-2 rounded-full mr-3 ${daysRemaining <= 3 ? 'bg-red-400' : 'bg-green-400'}`}></div>
                          <span className="text-gray-600">남은 기간</span>
                        </div>
                        <span className={`font-bold ${daysRemaining <= 3 ? 'text-red-600' : 'text-green-600'}`}>
                          {daysRemaining > 0 ? `${daysRemaining}일` : '마감'}
                        </span>
                      </div>
                    </div>
                    
                    {/* 액션 버튼 */}
                    <div className="mt-6">
                      {daysRemaining <= 0 ? (
                        <button
                          disabled
                          className="w-full bg-gray-300 text-gray-500 py-4 px-6 rounded-2xl cursor-not-allowed font-medium text-lg"
                        >
                          <div className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            마감됨
                          </div>
                        </button>
                      ) : participationStatus && participationStatus[survey.id]?.status === 'PARTICIPATED' ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center bg-green-50 rounded-2xl py-3">
                            <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-green-700 font-semibold">참여 완료</span>
                          </div>
                          <Link
                            to={`/surveys/${survey.id}/edit-response`}
                            className="group w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 px-6 rounded-2xl hover:from-blue-600 hover:to-indigo-600 text-center block font-medium text-lg transition-all duration-300 transform hover:scale-105"
                          >
                            <div className="flex items-center justify-center">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              답변 수정하기
                            </div>
                          </Link>
                        </div>
                      ) : isEligibleForSurvey(survey) ? (
                        <Link
                          to={`/surveys/${survey.id}/participate`}
                          className="group w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-6 rounded-2xl hover:from-green-600 hover:to-emerald-600 text-center block font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          <div className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            설문 참여하기
                          </div>
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleIneligibleSurvey(survey)}
                          className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white py-4 px-6 rounded-2xl hover:from-gray-500 hover:to-gray-600 text-center font-medium text-lg transition-all duration-300"
                        >
                          <div className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            조건 미부합
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
};

export default SurveyList;