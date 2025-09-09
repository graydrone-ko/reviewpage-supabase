import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Survey } from '../types';
import { formatKoreanTime } from '../utils/timezone';

interface ResponseDetail {
  id: string;
  surveyId: string;
  consumerId: string;
  consumerName?: string;
  consumerAge?: number;
  consumerGender?: string;
  responses: {
    stepId: string;
    stepTitle: string;
    answers: {
      questionId: string;
      questionText: string;
      questionType: string;
      value: string | number | boolean | null;
      formattedValue: string;
      optionText?: string;
    }[];
  }[];
  createdAt: string;
}

interface QuestionStatistics {
  questionId: string;
  questionText: string;
  questionType: string;
  statistics: {
    totalResponses: number;
    options?: {
      optionText: string;
      count: number;
      percentage: number;
    }[];
    averageScore?: number;
    textResponses?: string[];
    yesCount?: number;
    noCount?: number;
  };
}

interface Question {
  id: string;
  text: string;
  type: string;
}

const SurveyResponseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<ResponseDetail[]>([]);
  const [statistics, setStatistics] = useState<QuestionStatistics[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'table' | 'statistics' | 'individual'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    if (id) {
      fetchSurveyAndResponses();
    }
  }, [id]);

  const fetchSurveyAndResponses = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/surveys/${id}/responses`);
      const data = response.data;

      setSurvey(data.survey);
      setResponses(data.responses || []);
      setStatistics(data.statistics || []);

      // 모든 질문 추출
      const allQuestions: Question[] = [];
      if (data.survey?.template?.steps) {
        data.survey.template.steps.forEach((step: any) => {
          step.questions.forEach((question: any) => {
            allQuestions.push({
              id: question.id,
              text: question.text,
              type: question.type
            });
          });
        });
      }
      setQuestions(allQuestions);

    } catch (err: any) {
      setError('설문 응답을 불러오는 중 오류가 발생했습니다.');
      console.error('Error fetching survey responses:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = () => {
    if (responses.length === 0) return;

    // 엑셀 헤더 생성 (개선된 형식)
    const headers = ['응답자', '나이', '성별', '응답일시'];
    questions.forEach(question => {
      headers.push(question.text);
    });

    // 엑셀 데이터 생성 (테이블 형식)
    const excelData = responses.map((response) => {
      const row: (string | number)[] = [
        response.consumerName || '익명',
        response.consumerAge || '미제공',
        response.consumerGender === 'MALE' ? '남성' : 
        response.consumerGender === 'FEMALE' ? '여성' : '미제공',
        formatKoreanTime(new Date(response.createdAt), 'datetime')
      ];

      // 각 질문에 대한 답변 찾기
      questions.forEach(question => {
        let answer = '';
        
        // 모든 응답에서 해당 질문 찾기
        for (const stepResponse of response.responses) {
          const foundAnswer = stepResponse.answers.find(a => a.questionId === question.id);
          if (foundAnswer) {
            answer = foundAnswer.formattedValue;
            break;
          }
        }
        
        row.push(answer || '미응답');
      });

      return row;
    });

    // CSV 파일 생성
    const csvContent = [headers, ...excelData]
      .map(row => row.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(','))
      .join('\n');
    
    // CSV 파일 다운로드
    const blob = new Blob(['\uFEFF' + csvContent], { 
      type: 'text/csv;charset=utf-8;' 
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${survey?.title}_설문응답_테이블.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderQuestionStatistics = (stat: QuestionStatistics) => {
    const { questionText, questionType, statistics: stats } = stat;

    return (
      <div key={stat.questionId} className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{questionText}</h3>
        
        {questionType === 'MULTIPLE_CHOICE' && stats.options && (
          <div className="space-y-3">
            {stats.options.map((option, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">{option.optionText}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${option.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {option.count}명
                  </span>
                  <span className="text-sm text-gray-500 w-12 text-right">
                    ({option.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
            <div className="mt-2 text-sm text-gray-500">
              총 {stats.totalResponses}명 응답
            </div>
          </div>
        )}

        {questionType === 'SCORE' && stats.averageScore !== undefined && (
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stats.averageScore.toFixed(1)}/5.0
            </div>
            <div className="text-sm text-gray-500">
              평균 점수 (총 {stats.totalResponses}명 응답)
            </div>
          </div>
        )}

        {questionType === 'YES_NO' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">
                {stats.yesCount || 0}명
              </div>
              <div className="text-sm text-gray-600">예</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded">
              <div className="text-2xl font-bold text-red-600">
                {stats.noCount || 0}명
              </div>
              <div className="text-sm text-gray-600">아니오</div>
            </div>
          </div>
        )}

        {questionType === 'TEXT' && stats.textResponses && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {stats.textResponses.map((response, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded text-sm">
                "{response}"
              </div>
            ))}
            <div className="text-sm text-gray-500">
              총 {stats.totalResponses}개 응답
            </div>
          </div>
        )}
      </div>
    );
  };

  // 필터링된 응답 생성
  const getFilteredResponses = () => {
    let filteredResponses = responses;
    
    // 날짜 필터
    if (filterType !== 'all') {
      const now = new Date();
      let cutoffDate: Date;
      
      switch (filterType) {
        case 'recent':
          cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case 'week':
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          cutoffDate = new Date(0);
      }
      
      filteredResponses = filteredResponses.filter(response => 
        new Date(response.createdAt) >= cutoffDate
      );
    }
    
    // 검색 필터
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filteredResponses = filteredResponses.filter(response => {
        // 응답자 이름으로 검색
        if (response.consumerName?.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        // 답변 내용으로 검색
        return response.responses.some(step =>
          step.answers.some(answer => {
            const value = answer.formattedValue || String(answer.value || '');
            return value.toLowerCase().includes(searchLower);
          })
        );
      });
    }
    
    return filteredResponses;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">응답 내용을 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center text-gray-500">설문을 찾을 수 없습니다.</div>
      </div>
    );
  }

  const filteredResponses = getFilteredResponses();

  return (
    <div className="max-w-full mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* 헤더 */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{survey.title}</h1>
            <p className="text-gray-600">{survey.description}</p>
            <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
              <span>총 응답: {responses.length}/{survey.maxParticipants}명</span>
              <span>응답률: {((responses.length / survey.maxParticipants) * 100).toFixed(1)}%</span>
              <span>마감일: {formatKoreanTime(new Date(survey.endDate), 'datetime')}</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <Link
              to="/dashboard"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              대시보드로
            </Link>
            <button
              onClick={downloadExcel}
              disabled={responses.length === 0}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <span>엑셀 다운로드</span>
            </button>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('table')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'table'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              테이블 보기 ({responses.length}개)
            </button>
            <button
              onClick={() => setActiveTab('statistics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'statistics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              통계 분석
            </button>
            <button
              onClick={() => setActiveTab('individual')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'individual'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              개별 응답 ({responses.length}개)
            </button>
          </nav>
        </div>

        {/* 검색 및 필터 (테이블 및 개별 응답 탭에서만 표시) */}
        {(activeTab === 'table' || activeTab === 'individual') && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-64">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  응답 검색
                </label>
                <input
                  type="text"
                  placeholder="응답자 이름, 답변 내용으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="min-w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  응답 필터
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">전체 응답</option>
                  <option value="recent">최근 24시간</option>
                  <option value="week">최근 1주일</option>
                  <option value="month">최근 1개월</option>
                </select>
              </div>
              {(searchTerm || filterType !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                  }}
                  className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  초기화
                </button>
              )}
            </div>
          </div>
        )}

        {/* 콘텐츠 */}
        {activeTab === 'table' ? (
          <div className="space-y-6">
            {filteredResponses.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                {searchTerm || filterType !== 'all' 
                  ? '검색 조건에 맞는 응답이 없습니다.'
                  : '아직 수집된 응답이 없습니다.'
                }
              </div>
            ) : (
              <>
                {/* 필터링 결과 요약 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                      </svg>
                      <span className="text-sm font-medium text-blue-800">
                        총 {filteredResponses.length}개 응답
                        {filteredResponses.length < responses.length && (
                          <span className="text-blue-600"> (전체 {responses.length}개 중)</span>
                        )}
                      </span>
                    </div>
                    {(searchTerm || filterType !== 'all') && (
                      <div className="text-xs text-blue-600">
                        {searchTerm && `검색: "${searchTerm}"`}
                        {searchTerm && filterType !== 'all' && ' | '}
                        {filterType !== 'all' && `기간: ${{
                          recent: '최근 24시간',
                          week: '최근 1주일', 
                          month: '최근 1개월'
                        }[filterType]}`}
                      </div>
                    )}
                  </div>
                </div>

                {/* 엑셀 스타일 테이블 */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="sticky left-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                          응답자 정보
                        </th>
                        {questions.map((question, index) => (
                          <th key={question.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-48">
                            <div className="space-y-1">
                              <div className="font-semibold">질문 {index + 1}</div>
                              <div className="font-normal text-gray-700 normal-case leading-tight">
                                {question.text}
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredResponses.map((response, responseIndex) => (
                        <tr key={response.id} className={responseIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="sticky left-0 z-10 bg-inherit px-6 py-4 whitespace-nowrap border-r border-gray-200">
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-gray-900">
                                {response.consumerName || '익명'}
                              </div>
                              <div className="text-xs text-gray-500">
                                {response.consumerAge ? `${response.consumerAge}세` : '나이 미제공'} ·{' '}
                                {response.consumerGender === 'MALE' ? '남성' :
                                 response.consumerGender === 'FEMALE' ? '여성' : '성별 미제공'}
                              </div>
                              <div className="text-xs text-gray-400">
                                {formatKoreanTime(new Date(response.createdAt), 'datetime')}
                              </div>
                            </div>
                          </td>
                          {questions.map((question) => {
                            // 해당 질문에 대한 답변 찾기
                            let answer = '';
                            let answerType = '';
                            
                            for (const stepResponse of response.responses) {
                              const foundAnswer = stepResponse.answers.find(a => a.questionId === question.id);
                              if (foundAnswer) {
                                answer = foundAnswer.formattedValue;
                                answerType = foundAnswer.questionType;
                                break;
                              }
                            }

                            return (
                              <td key={question.id} className="px-6 py-4">
                                <div className="text-sm text-gray-900">
                                  {answer ? (
                                    <div className="space-y-1">
                                      {answerType === 'TEXT' ? (
                                        <div className="bg-blue-50 p-2 rounded text-xs border-l-2 border-blue-400 max-w-xs">
                                          <div className="line-clamp-3">{answer}</div>
                                          <div className="text-gray-500 mt-1">
                                            {answer.length}자
                                          </div>
                                        </div>
                                      ) : answerType === 'SCORE' ? (
                                        <div className="flex items-center space-x-2">
                                          <div className="flex space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                              <svg 
                                                key={star}
                                                className={`w-4 h-4 ${
                                                  star <= parseInt(answer) 
                                                    ? 'text-yellow-400 fill-current' 
                                                    : 'text-gray-300'
                                                }`} 
                                                viewBox="0 0 20 20"
                                              >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                              </svg>
                                            ))}
                                          </div>
                                          <span className="text-sm font-medium">{answer}</span>
                                        </div>
                                      ) : answerType === 'YES_NO' ? (
                                        <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                          answer === '예' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                          {answer}
                                        </div>
                                      ) : (
                                        <div className="max-w-xs truncate" title={answer}>
                                          {answer}
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-gray-400 text-xs">미응답</span>
                                  )}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        ) : activeTab === 'statistics' ? (
          <div className="space-y-6">
            {statistics.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                아직 수집된 응답이 없습니다.
              </div>
            ) : (
              statistics.map(renderQuestionStatistics)
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredResponses.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                {searchTerm || filterType !== 'all' 
                  ? '검색 조건에 맞는 응답이 없습니다.'
                  : '아직 수집된 응답이 없습니다.'
                }
              </div>
            ) : (
              <div className="space-y-6">
                {/* 필터링 결과 요약 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                      </svg>
                      <span className="text-sm font-medium text-blue-800">
                        총 {filteredResponses.length}개 응답
                        {filteredResponses.length < responses.length && (
                          <span className="text-blue-600"> (전체 {responses.length}개 중)</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* 응답 리스트 */}
                {filteredResponses.map((response) => {
                  const originalIndex = responses.findIndex(r => r.id === response.id) + 1;
                  
                  return (
                    <div key={response.id} className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
                      {/* 응답자 헤더 */}
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">#{originalIndex}</span>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">
                                {response.consumerName || '익명 사용자'}
                              </h3>
                              <div className="text-blue-100 text-sm">
                                {response.consumerAge ? `${response.consumerAge}세` : '나이 미제공'} ·{' '}
                                {response.consumerGender === 'MALE' ? '남성' :
                                 response.consumerGender === 'FEMALE' ? '여성' : '성별 미제공'}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-blue-100 text-sm">
                              응답 완료: {formatKoreanTime(new Date(response.createdAt), 'datetime')}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* 응답 내용 */}
                      <div className="p-6">
                        <div className="space-y-6">
                          {response.responses.map((step, stepIndex) => (
                            <div key={step.stepId}>
                              <div className="flex items-center space-x-2 mb-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                                  {stepIndex + 1}
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900">{step.stepTitle}</h4>
                              </div>
                              <div className="space-y-3">
                                {step.answers.map((answer) => (
                                  <div key={answer.questionId}>
                                    <div className="text-sm text-gray-700 mb-1">
                                      {answer.questionText}
                                    </div>
                                    <div className="text-gray-900">
                                      {answer.questionType === 'MULTIPLE_CHOICE' && (
                                        <div className="flex items-center space-x-2">
                                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                          <span className="font-medium">{answer.formattedValue}</span>
                                        </div>
                                      )}
                                      {answer.questionType === 'YES_NO' && (
                                        <div className="flex items-center space-x-2">
                                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            answer.formattedValue === '예' 
                                              ? 'bg-green-100 text-green-800' 
                                              : 'bg-red-100 text-red-800'
                                          }`}>
                                            {answer.formattedValue}
                                          </div>
                                        </div>
                                      )}
                                      {answer.questionType === 'SCORE' && (
                                        <div className="flex items-center space-x-3">
                                          <div className="flex space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                              <svg 
                                                key={star}
                                                className={`w-5 h-5 ${
                                                  star <= (answer.value as number || 0) 
                                                    ? 'text-yellow-400 fill-current' 
                                                    : 'text-gray-300'
                                                }`} 
                                                viewBox="0 0 20 20"
                                              >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                              </svg>
                                            ))}
                                          </div>
                                          <span className="text-lg font-semibold text-blue-600">
                                            {answer.formattedValue}
                                          </span>
                                        </div>
                                      )}
                                      {answer.questionType === 'TEXT' && (
                                        <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-blue-500">
                                          <p className="text-gray-800 leading-relaxed">
                                            "{String(answer.value || '')}"
                                          </p>
                                          <div className="text-xs text-gray-500 mt-2">
                                            글자 수: {String(answer.value || '').length}자
                                          </div>
                                        </div>
                                      )}
                                      {!['MULTIPLE_CHOICE', 'YES_NO', 'SCORE', 'TEXT'].includes(answer.questionType) && (
                                        <span>{answer.formattedValue || String(answer.value || '')}</span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyResponseDetail;