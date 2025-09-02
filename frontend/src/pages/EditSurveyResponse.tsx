import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Survey } from '../types';
import { validateSurveySubmission } from '../utils/validation';

interface SurveyResponse {
  id: string;
  responses: any[];
  createdAt: string;
  updatedAt: string;
}

const EditSurveyResponse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [existingResponse, setExistingResponse] = useState<SurveyResponse | null>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchSurveyAndResponse();
    }
  }, [id]);

  const fetchSurveyAndResponse = async () => {
    try {
      // 설문 정보 조회
      const surveyResponse = await api.get(`/surveys/${id}`);
      setSurvey(surveyResponse.data);

      // 참여 상태 확인
      const statusResponse = await api.get(`/surveys/${id}/participation-status`);
      
      if (statusResponse.data.status !== 'PARTICIPATED') {
        setError('참여한 설문이 아닙니다.');
        return;
      }

      // 기존 응답 조회 (API 구현 필요)
      const responseResponse = await api.get(`/surveys/${id}/my-response`);
      setExistingResponse(responseResponse.data);
      setAnswers(responseResponse.data.responses || []);
      
    } catch (err: any) {
      console.error('데이터 조회 실패:', err);
      if (err.response?.status === 404) {
        setError('설문을 찾을 수 없습니다.');
      } else if (err.response?.status === 403) {
        setError('수정 권한이 없습니다.');
      } else {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex: number, value: any) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!survey) return;

    // 유효성 검사 - survey.template.steps에서 모든 questions 추출
    const allQuestions = survey.template?.steps?.flatMap(step => step.questions) || [];
    const validationErrors = validateSurveySubmission(answers, allQuestions);
    if (validationErrors.length > 0) {
      setError(`수정 실패:\n${validationErrors.join('\n')}`);
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.patch(`/surveys/${id}/response`, {
        responses: answers
      });

      alert('응답이 성공적으로 수정되었습니다!');
      navigate('/surveys');
    } catch (err: any) {
      console.error('응답 수정 실패:', err);
      setError(err.response?.data?.error || '응답 수정 중 오류가 발생했습니다.');
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

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
          {error}
        </div>
        <button
          onClick={() => navigate('/surveys')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          설문 목록으로 돌아가기
        </button>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center text-gray-500">설문을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-6">
        <button
          onClick={() => navigate('/surveys')}
          className="text-gray-600 hover:text-gray-800 mb-4 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          설문 목록으로 돌아가기
        </button>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{survey.title}</h1>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-blue-800 font-medium">기존 답변 수정</p>
              <p className="text-blue-600 text-sm">
                최초 참여: {existingResponse ? new Date(existingResponse.createdAt).toLocaleDateString('ko-KR') : ''}
                {existingResponse?.updatedAt && existingResponse.updatedAt !== existingResponse.createdAt && (
                  <span> (마지막 수정: {new Date(existingResponse.updatedAt).toLocaleDateString('ko-KR')})</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {survey.template?.steps?.flatMap(step => step.questions).map((question: any, index: number) => (
          <div key={question.id} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                질문 {index + 1}
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </h3>
              <p className="text-gray-700">{question.text}</p>
            </div>

            {question.type === 'MULTIPLE_CHOICE' ? (
              <div className="space-y-2">
                {question.options?.map((option: any, optionIndex: number) => (
                  <label key={optionIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      className="mr-3 text-primary-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            ) : question.type === 'CHECKBOX' ? (
              <div className="space-y-2">
                {question.options?.map((option: any, optionIndex: number) => (
                  <label key={optionIndex} className="flex items-center">
                    <input
                      type="checkbox"
                      value={option}
                      checked={Array.isArray(answers[index]) && answers[index].includes(option)}
                      onChange={(e) => {
                        const currentAnswers = Array.isArray(answers[index]) ? answers[index] : [];
                        if (e.target.checked) {
                          handleAnswerChange(index, [...currentAnswers, option]);
                        } else {
                          handleAnswerChange(index, currentAnswers.filter((a: string) => a !== option));
                        }
                      }}
                      className="mr-3 text-primary-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                value={answers[index] || ''}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder="답변을 입력해주세요..."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                rows={4}
                maxLength={500}
              />
            )}
          </div>
        ))}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded whitespace-pre-line">
            {error}
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => navigate('/surveys')}
            className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 font-medium"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 disabled:bg-primary-400 font-medium"
          >
            {submitting ? '수정 중...' : '답변 수정 완료'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSurveyResponse;