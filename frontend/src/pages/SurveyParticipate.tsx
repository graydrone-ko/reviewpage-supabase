import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Survey, SurveyStep, SurveyQuestion, QuestionAnswer, StepResponse } from '../types';
import MultipleChoiceQuestion from '../components/Survey/MultipleChoiceQuestion';
import TextQuestion from '../components/Survey/TextQuestion';
import ScoreQuestion from '../components/Survey/ScoreQuestion';
import YesNoQuestion from '../components/Survey/YesNoQuestion';
import ProductPreview from '../components/ProductPreview';

const SurveyParticipate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<StepResponse[]>([]);
  const [otherTexts, setOtherTexts] = useState<{[questionId: string]: string}>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  const fetchSurvey = useCallback(async () => {
    try {
      const response = await api.get(`/surveys/${id}`);
      const surveyData = response.data.survey;
      setSurvey(surveyData);
      
      // 응답 구조 초기화
      if (surveyData.template?.steps) {
        const initialResponses: StepResponse[] = surveyData.template.steps.map((step: SurveyStep) => ({
          stepId: step.id,
          answers: step.questions.map((question: SurveyQuestion) => ({
            questionId: question.id,
            value: null
          }))
        }));
        setResponses(initialResponses);
      }
    } catch (err: any) {
      setError('설문을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  // 사용자 나이 계산 함수 (SurveyList와 동일)
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
    if (!user || !survey) return true;
    
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

  useEffect(() => {
    if (id) {
      fetchSurvey();
      
      // 사용자 정보 로드
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [id, fetchSurvey]);

  const handleAnswerChange = (value: string | number | boolean) => {
    if (!survey?.template?.steps || currentStepIndex >= survey.template.steps.length) return;

    const currentStep = survey.template.steps[currentStepIndex];
    if (!currentStep?.questions || currentQuestionIndex >= currentStep.questions.length) return;
    
    const currentQuestion = currentStep.questions[currentQuestionIndex];
    
    setResponses(prev => prev.map(stepResponse => {
      if (stepResponse.stepId === currentStep.id) {
        return {
          ...stepResponse,
          answers: stepResponse.answers.map(answer => 
            answer.questionId === currentQuestion.id
              ? { ...answer, value }
              : answer
          )
        };
      }
      return stepResponse;
    }));
  };

  const getCurrentAnswer = (): QuestionAnswer | undefined => {
    if (!survey?.template?.steps || currentStepIndex >= survey.template.steps.length) return undefined;

    const currentStep = survey.template.steps[currentStepIndex];
    if (!currentStep?.questions || currentQuestionIndex >= currentStep.questions.length) return undefined;
    
    const currentQuestion = currentStep.questions[currentQuestionIndex];
    const stepResponse = responses.find(r => r.stepId === currentStep.id);
    
    return stepResponse?.answers.find(a => a.questionId === currentQuestion.id);
  };

  const isCurrentAnswerValid = (): boolean => {
    if (!survey?.template?.steps || currentStepIndex >= survey.template.steps.length) return false;

    const currentStep = survey.template.steps[currentStepIndex];
    if (!currentStep?.questions || currentQuestionIndex >= currentStep.questions.length) return false;
    
    const currentQuestion = currentStep.questions[currentQuestionIndex];
    const currentAnswer = getCurrentAnswer();
    
    
    // TEXT 질문은 특별 처리 (0자~19자까지 모두 비활성화)
    if (currentQuestion.type === 'TEXT') {
      const textValue = typeof currentAnswer?.value === 'string' ? currentAnswer.value.trim() : '';
      return textValue.length >= 20;
    }
    
    // 필수가 아닌 질문이지만 답변이 있으면 형식 검증은 해야 함
    const hasAnswer = currentAnswer?.value !== null && currentAnswer?.value !== undefined && currentAnswer?.value !== '';
    
    // 필수 질문이면서 답변이 없는 경우
    if (currentQuestion.required && !hasAnswer) {
      return false;
    }
    
    // 답변이 있는 경우 형식 검증
    if (hasAnswer) {
      // 객관식에서 '기타' 옵션 선택 시 추가 검증
      if (currentQuestion.type === 'MULTIPLE_CHOICE') {
        const selectedOption = currentQuestion.options.find(opt => opt.id === currentAnswer?.value);
        if (selectedOption && (selectedOption.text.includes('기타') || selectedOption.text.includes('other'))) {
          const otherText = otherTexts[currentQuestion.id] || '';
          return otherText.length >= 10;
        }
      }
    }
    
    return true;
  };

  const handleNext = () => {
    if (!survey?.template?.steps || currentStepIndex >= survey.template.steps.length) return;

    const currentStep = survey.template.steps[currentStepIndex];
    if (!currentStep?.questions) return;
    
    // 다음 질문으로 이동
    if (currentQuestionIndex < currentStep.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    // 다음 단계로 이동
    else if (currentStepIndex < survey.template.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setCurrentQuestionIndex(0);
    }
    // 설문 완료
    else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    // 이전 질문으로 이동
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
    // 이전 단계로 이동
    else if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      if (survey?.template?.steps && currentStepIndex > 0) {
        const prevStep = survey.template.steps[currentStepIndex - 1];
        if (prevStep?.questions?.length) {
          setCurrentQuestionIndex(prevStep.questions.length - 1);
        }
      }
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    try {
      console.log('Submitting survey response:', {
        surveyId: id,
        responses,
        responseCount: responses.length
      });

      // Validate all responses before submission
      const validationErrors = validateAllResponses();
      if (validationErrors.length > 0) {
        setError(`다음 항목을 완성해주세요:\n${validationErrors.join('\n')}`);
        return;
      }

      const response = await api.post('/responses', {
        surveyId: id,
        responses
      });

      
      alert(`설문 참여가 완료되었습니다! ${response.data.reward?.amount || 0}원 리워드가 지급되었습니다.`);
      navigate('/surveys');
    } catch (err: any) {
      console.error('Survey submission error:', {
        error: err,
        response: err.response?.data,
        status: err.response?.status
      });
      
      let errorMessage = '설문 제출 중 오류가 발생했습니다.';
      
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
        
        // Special handling for duplicate response
        if (err.response.data.canEdit) {
          errorMessage += '\n\n기존 응답을 수정하시려면 설문 목록에서 "답변 수정" 버튼을 사용해주세요.';
        }
      } else if (err.response?.data?.details) {
        errorMessage = `입력 오류: ${err.response.data.details.map((d: any) => d.msg).join(', ')}`;
      } else if (err.response?.status === 400) {
        errorMessage = '입력한 답변에 문제가 있습니다. 모든 필수 답변을 완성해주세요.';
      } else if (err.response?.status === 403) {
        errorMessage = '설문 참여 권한이 없습니다. 로그인 상태를 확인해주세요.';
      } else if (err.response?.status === 404) {
        errorMessage = '설문을 찾을 수 없거나 더 이상 사용할 수 없습니다.';
      } else if (err.code === 'NETWORK_ERROR') {
        errorMessage = '네트워크 연결을 확인해주세요.';
      }
      
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const validateAllResponses = (): string[] => {
    const errors: string[] = [];
    
    if (!survey?.template) return ['설문 데이터를 불러올 수 없습니다'];
    
    survey.template.steps.forEach((step) => {
      const stepResponse = responses.find(r => r.stepId === step.id);
      
      step.questions.forEach((question, questionIndex) => {
        const answer = stepResponse?.answers.find(a => a.questionId === question.id);
        
        if (question.required) {
          if (!answer || answer.value === null || answer.value === undefined || answer.value === '') {
            errors.push(`${step.title} - 질문 ${questionIndex + 1}: 필수 답변입니다`);
            return;
          }
          
          // Text questions minimum length validation
          if (question.type === 'TEXT' && typeof answer.value === 'string') {
            const trimmedText = answer.value.trim();
            if (trimmedText.length < 20) {
              errors.push(`${step.title} - 질문 ${questionIndex + 1}: 최소 20자 이상 작성해주세요 (현재: ${trimmedText.length}자)`);
            }
          }
          
          // Multiple choice "other" option validation
          if (question.type === 'MULTIPLE_CHOICE') {
            const selectedOption = question.options.find(opt => opt.id === answer.value);
            if (selectedOption && (selectedOption.text.includes('기타') || selectedOption.text.includes('other'))) {
              const otherText = otherTexts[question.id] || '';
              if (otherText.trim().length < 10) {
                errors.push(`${step.title} - 질문 ${questionIndex + 1}: 기타 답변은 최소 10자 이상 작성해주세요`);
              }
            }
          }
        }
      });
    });
    
    return errors;
  };

  const getTotalQuestions = (): number => {
    if (!survey?.template?.steps || survey.template.steps.length === 0) return 0;
    return survey.template.steps.reduce((total, step) => {
      return total + (step.questions?.length || 0);
    }, 0);
  };

  const getCurrentQuestionNumber = (): number => {
    if (!survey?.template?.steps || survey.template.steps.length === 0) return 1;
    
    let questionNumber = 1;
    for (let i = 0; i < currentStepIndex && i < survey.template.steps.length; i++) {
      const step = survey.template.steps[i];
      questionNumber += (step?.questions?.length || 0);
    }
    return questionNumber + currentQuestionIndex;
  };

  const renderQuestion = () => {
    if (!survey?.template?.steps || currentStepIndex >= survey.template.steps.length) return null;

    const currentStep = survey.template.steps[currentStepIndex];
    if (!currentStep?.questions || currentQuestionIndex >= currentStep.questions.length) return null;
    
    const currentQuestion = currentStep.questions[currentQuestionIndex];
    const currentAnswer = getCurrentAnswer();

    const questionProps = {
      question: currentQuestion,
      disabled: submitting
    };

    switch (currentQuestion.type) {
      case 'MULTIPLE_CHOICE':
        return (
          <MultipleChoiceQuestion
            {...questionProps}
            value={currentAnswer?.value as string || ''}
            onChange={handleAnswerChange}
            otherText={otherTexts[currentQuestion.id] || ''}
            onOtherTextChange={(text) => setOtherTexts(prev => ({...prev, [currentQuestion.id]: text}))}
          />
        );
      case 'TEXT':
        return (
          <TextQuestion
            {...questionProps}
            value={currentAnswer?.value as string || ''}
            onChange={handleAnswerChange}
          />
        );
      case 'SCORE':
        return (
          <ScoreQuestion
            {...questionProps}
            value={currentAnswer?.value as number || null}
            onChange={handleAnswerChange}
            scale={currentQuestion.text.includes('1-5') ? 5 : 10}
          />
        );
      case 'YES_NO':
        return (
          <YesNoQuestion
            {...questionProps}
            value={currentAnswer?.value !== undefined ? currentAnswer.value as boolean : null}
            onChange={handleAnswerChange}
          />
        );
      default:
        return <div>지원하지 않는 질문 타입입니다.</div>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  // 대상자 검증 - 설문이 로드된 후 체크
  if (survey && user && !isEligibleForSurvey(survey)) {
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

    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-900 mb-4">설문 참여 불가</h2>
          <p className="text-red-800 mb-4">
            죄송합니다. 이 설문은 다음 조건에 해당하는 분만 참여할 수 있습니다:
          </p>
          {reasons.length > 0 && (
            <div className="bg-white rounded-md p-4 mb-4">
              <ul className="text-red-700 text-left space-y-2">
                {reasons.map((reason, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/surveys')}
              className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700"
            >
              다른 설문 보기
            </button>
            <button
              onClick={() => navigate(-1)}
              className="block w-full text-gray-600 hover:text-gray-800"
            >
              이전 페이지로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!survey || !survey.template || !survey.template.steps || survey.template.steps.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 text-center">
        <div className="text-red-600">설문을 찾을 수 없습니다.</div>
      </div>
    );
  }

  // 현재 스텝 인덱스가 유효한지 확인
  if (currentStepIndex >= survey.template.steps.length) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 text-center">
        <div className="text-red-600">잘못된 설문 단계입니다.</div>
      </div>
    );
  }

  const currentStep = survey.template.steps[currentStepIndex];
  
  // 현재 스텝에 질문이 있는지 확인
  if (!currentStep || !currentStep.questions || currentStep.questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 text-center">
        <div className="text-red-600">설문 질문을 찾을 수 없습니다.</div>
      </div>
    );
  }

  // 현재 질문 인덱스가 유효한지 확인
  if (currentQuestionIndex >= currentStep.questions.length) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 text-center">
        <div className="text-red-600">잘못된 질문 번호입니다.</div>
      </div>
    );
  }

  const totalQuestions = getTotalQuestions();
  const currentQuestionNumber = getCurrentQuestionNumber();
  const isLastQuestion = currentStepIndex === survey.template.steps.length - 1 && 
                        currentQuestionIndex === currentStep.questions.length - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
        {/* 설문 영역 */}
        <div className="w-full lg:w-1/2 xl:w-3/5">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* 헤더 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{survey.title}</h1>
                <span className="text-lg font-semibold text-blue-600">
                  {survey.reward.toLocaleString()}원
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(currentQuestionNumber / totalQuestions) * 100}%` }}
                />
              </div>
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>{currentQuestionNumber} / {totalQuestions} 질문</span>
                <span>{currentStep.title}</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <h4 className="font-medium text-red-800 mb-1">오류가 발생했습니다</h4>
                    <div className="text-sm whitespace-pre-line">{error}</div>
                  </div>
                </div>
              </div>
            )}

            {/* 현재 단계 정보 */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">
                {currentStep.title}
              </h2>
              {currentStep.description && (
                <p className="text-blue-700">
                  {currentStep.description}
                </p>
              )}
            </div>

            {/* 상품 페이지 URL */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
              <div className="text-sm text-gray-600 font-medium mb-2">평가할 상품 페이지:</div>
              <a 
                href={survey.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-800 underline text-sm break-all"
              >
                {survey.url}
              </a>
              <div className="text-xs text-gray-500 mt-2">
                → 오른쪽 미리보기에서 페이지를 확인하며 설문해주세요
              </div>
            </div>

            {/* 현재 질문 */}
            <div className="mb-8">
              {renderQuestion()}
            </div>

            {/* 네비게이션 버튼 */}
            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                disabled={currentStepIndex === 0 && currentQuestionIndex === 0}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>
              
              <button
                onClick={handleNext}
                disabled={!isCurrentAnswerValid() || submitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>제출 중...</span>
                  </>
                ) : (
                  <>
                    <span>{isLastQuestion ? '완료' : '다음'}</span>
                    {!isLastQuestion && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                    {isLastQuestion && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 미리보기 영역 */}
        <div className="w-full lg:w-1/2 xl:w-2/5">
          <div className="sticky top-6">
            <ProductPreview productUrl={survey.url} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyParticipate;