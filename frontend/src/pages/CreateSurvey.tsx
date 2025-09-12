import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { SurveyTemplate, SurveyQuestion, QuestionOption, SurveyStep } from '../types';
import PaymentModal from '../components/PaymentModal';
import StepEditor from '../components/StepEditor';
import SurveyTemplatePreview from '../components/SurveyTemplatePreview';
import { getKoreanTimeAfter, toKoreanDateTimeLocal, getTimeFromNowKST } from '../utils/timezone';

interface SurveyFormData {
  title: string;
  storeName: string;         // 판매자 스토어 이름
  description?: string;      // 선택사항으로 변경
  url: string;
  targetAgeMin: number;
  targetAgeMax: number;
  targetGender: 'MALE' | 'FEMALE' | 'ALL';
  rewardPerResponse: string; // 입력 필드를 위해 string으로 변경
  maxParticipants: string;   // 입력 필드를 위해 string으로 변경
  endDate: string;
  templateId?: string;
}

interface EditableQuestion extends Omit<SurveyQuestion, 'id'> {
  id: string;
  tempId?: string;
}

interface EditableStep extends Omit<SurveyStep, 'id' | 'questions'> {
  id: string;
  tempId?: string;
  questions: EditableQuestion[];
}

// Question types are now managed in QuestionEditor component

const CreateSurvey: React.FC = () => {
  const [formData, setFormData] = useState<SurveyFormData>({
    title: '',
    storeName: '',
    url: '',
    targetAgeMin: 18,
    targetAgeMax: 65,
    targetGender: 'ALL',
    rewardPerResponse: '1000', // 문자열로 초기화
    maxParticipants: '50',      // 문자열로 초기화
    endDate: getDefaultEndDate()
  });

  const [templates, setTemplates] = useState<SurveyTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<SurveyTemplate | null>(null);
  const [editableSteps, setEditableSteps] = useState<EditableStep[]>([]);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  function getDefaultEndDate(): string {
    // 한국시간 기준 7일 후
    const koreanTime = getKoreanTimeAfter(7);
    return toKoreanDateTimeLocal(koreanTime);
  }

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await api.get('/surveys/templates/list');
      setTemplates(response.data.templates);
      
      // 기본 템플릿 자동 선택 및 편집 가능한 형태로 변환
      const defaultTemplate = response.data.templates.find((t: SurveyTemplate) => t.isDefault);
      if (defaultTemplate) {
        setSelectedTemplate(defaultTemplate);
        setFormData(prev => ({ ...prev, templateId: defaultTemplate.id }));
        convertTemplateToEditable(defaultTemplate);
      }
    } catch (err) {
      console.error('템플릿 로딩 실패:', err);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const convertTemplateToEditable = (template: SurveyTemplate) => {
    const editableSteps: EditableStep[] = template.steps.map(step => ({
      ...step,
      questions: step.questions.map(question => ({
        ...question,
        tempId: `temp_${Date.now()}_${Math.random()}`
      }))
    }));
    setEditableSteps(editableSteps);
    
    // Expand all steps by default for new comprehensive template
    setExpandedSteps(new Set(Array.from({ length: editableSteps.length }, (_, i) => i)));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    const endDate = new Date(formData.endDate + '+09:00'); // 한국시간으로 해석
    const timeFromNow = getTimeFromNowKST(endDate);
    const rewardAmount = parseInt(formData.rewardPerResponse) || 0;
    const participants = parseInt(formData.maxParticipants) || 0;

    if (!formData.title.trim()) errors.title = '설문 제목은 필수입니다.';
    if (!formData.url.trim()) errors.url = '상품 페이지 URL은 필수입니다.';
    if (formData.targetAgeMin >= formData.targetAgeMax) {
      errors.targetAge = '최소 연령은 최대 연령보다 작아야 합니다.';
    }
    if (rewardAmount < 1000) {
      errors.rewardPerResponse = '건당 리워드는 최소 1,000원 이상이어야 합니다.';
    }
    if (participants < 10) {
      errors.maxParticipants = '진행 인원은 최소 10명 이상이어야 합니다.';
    }
    if (timeFromNow.totalHours < 72) { // 3일 = 72시간
      errors.endDate = '마감일은 최소 3일 이후로 설정해주세요.';
    }
    if (timeFromNow.totalHours > 720) { // 30일 = 720시간
      errors.endDate = '마감일시는 현재로부터 최대 30일 후까지 설정 가능합니다.';
    }

    // 설문 문항 검증
    editableSteps.forEach((step, stepIndex) => {
      step.questions.forEach((question, questionIndex) => {
        if (!question.text.trim()) {
          errors[`question_${stepIndex}_${questionIndex}`] = '질문 텍스트는 필수입니다.';
        }
        if (question.type === 'MULTIPLE_CHOICE' && question.options.length < 2) {
          errors[`question_${stepIndex}_${questionIndex}_options`] = '객관식 질문은 최소 2개의 선택지가 필요합니다.';
        }
      });
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError('입력 정보를 확인해주세요.');
      return;
    }

    // 입금 안내 모달 표시
    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = async () => {
    setShowPaymentModal(false);
    setLoading(true);
    setError('');

    try {
      // 편집된 설문 데이터와 함께 전송
      const surveyData = {
        title: formData.title,
        storeName: formData.storeName,
        description: formData.description || '',
        url: formData.url,
        targetAgeMin: formData.targetAgeMin,
        targetAgeMax: formData.targetAgeMax,
        targetGender: formData.targetGender,
        rewardPerResponse: parseInt(formData.rewardPerResponse),
        maxParticipants: parseInt(formData.maxParticipants),
        totalBudget: getTotalBudget(),
        endDate: formData.endDate,
        templateId: formData.templateId,
        customSteps: editableSteps,
        status: 'PENDING' // 승인 대기중 상태로 설정
      };


      const response = await api.post('/surveys', surveyData);
      
      
      alert(`설문이 성공적으로 생성되었습니다!\n제목: ${formData.title}\n총 예산: ${getTotalBudget().toLocaleString()}원\n\n입금 확인 후 설문이 승인됩니다.`);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Survey creation error:', err);
      console.error('Error response:', err.response?.data);
      
      if (err.response?.data?.code === 'INVALID_USER') {
        setError('사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
        // 로그인 페이지로 리다이렉트하거나 로그아웃 처리
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else if (err.response?.data?.errors) {
        // 검증 오류가 있는 경우
        const validationErrors = err.response.data.errors;
        const errorMessages = validationErrors.map((error: any) => error.msg).join(', ');
        setError(`입력 데이터 오류: ${errorMessages}`);
      } else {
        setError(err.response?.data?.error || `설문 생성 중 오류가 발생했습니다: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['targetAgeMin', 'targetAgeMax'].includes(name) 
        ? Number(value) 
        : value
    });
  };

  // 숫자 입력 필드 전용 핸들러
  const handleNumberChange = (name: 'rewardPerResponse' | 'maxParticipants') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 허용, 빈 문자열도 허용
    if (value === '' || /^\d+$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 포커스 아웃 시 최소값 보장
  const handleNumberBlur = (name: 'rewardPerResponse' | 'maxParticipants', minValue: number, defaultValue: string) => () => {
    const value = formData[name];
    if (value === '' || parseInt(value) < minValue) {
      setFormData({ ...formData, [name]: defaultValue });
    }
  };

  const handleTemplateSelect = (template: SurveyTemplate) => {
    setSelectedTemplate(template);
    setFormData(prev => ({ ...prev, templateId: template.id }));
    convertTemplateToEditable(template);
  };

  const getTotalBudget = (): number => {
    const rewardAmount = parseInt(formData.rewardPerResponse) || 0;
    const participants = parseInt(formData.maxParticipants) || 0;
    const baseAmount = rewardAmount * participants;
    return Math.round(baseAmount * 1.1); // 10% 수수료 포함
  };

  const getBaseBudget = (): number => {
    const rewardAmount = parseInt(formData.rewardPerResponse) || 0;
    const participants = parseInt(formData.maxParticipants) || 0;
    return rewardAmount * participants;
  };

  const getFee = (): number => {
    return getTotalBudget() - getBaseBudget();
  };

  const getTotalQuestions = (): number => {
    return editableSteps.reduce((total, step) => total + step.questions.length, 0);
  };

  // 문항 편집 함수들
  const updateQuestion = (stepIndex: number, questionIndex: number, updates: Partial<EditableQuestion>) => {
    const newSteps = [...editableSteps];
    newSteps[stepIndex].questions[questionIndex] = {
      ...newSteps[stepIndex].questions[questionIndex],
      ...updates
    };
    setEditableSteps(newSteps);
  };

  const addQuestion = (stepIndex: number) => {
    const newSteps = [...editableSteps];
    const newQuestion: EditableQuestion = {
      id: `temp_${Date.now()}_${Math.random()}`,
      tempId: `temp_${Date.now()}_${Math.random()}`,
      questionNumber: newSteps[stepIndex].questions.length + 1,
      text: '',
      type: 'MULTIPLE_CHOICE',
      required: true,
      options: [
        { id: `opt_${Date.now()}_1`, optionNumber: 1, text: '' },
        { id: `opt_${Date.now()}_2`, optionNumber: 2, text: '' }
      ]
    };
    newSteps[stepIndex].questions.push(newQuestion);
    setEditableSteps(newSteps);
  };

  const deleteQuestion = (stepIndex: number, questionIndex: number) => {
    if (editableSteps[stepIndex].questions.length <= 1) {
      alert('각 단계는 최소 1개의 질문이 필요합니다.');
      return;
    }
    
    const newSteps = [...editableSteps];
    newSteps[stepIndex].questions.splice(questionIndex, 1);
    // 질문 번호 재정렬
    newSteps[stepIndex].questions.forEach((q, idx) => {
      q.questionNumber = idx + 1;
    });
    setEditableSteps(newSteps);
  };

  const moveQuestion = (stepIndex: number, questionIndex: number, direction: 'up' | 'down') => {
    const newSteps = [...editableSteps];
    const questions = newSteps[stepIndex].questions;
    const newIndex = direction === 'up' ? questionIndex - 1 : questionIndex + 1;
    
    if (newIndex < 0 || newIndex >= questions.length) return;
    
    [questions[questionIndex], questions[newIndex]] = [questions[newIndex], questions[questionIndex]];
    
    // 질문 번호 재정렬
    questions.forEach((q, idx) => {
      q.questionNumber = idx + 1;
    });
    
    setEditableSteps(newSteps);
  };

  const updateQuestionOption = (stepIndex: number, questionIndex: number, optionIndex: number, text: string) => {
    const newSteps = [...editableSteps];
    newSteps[stepIndex].questions[questionIndex].options[optionIndex].text = text;
    setEditableSteps(newSteps);
  };

  const addQuestionOption = (stepIndex: number, questionIndex: number) => {
    const newSteps = [...editableSteps];
    const question = newSteps[stepIndex].questions[questionIndex];
    const newOption: QuestionOption = {
      id: `opt_${Date.now()}_${question.options.length + 1}`,
      optionNumber: question.options.length + 1,
      text: ''
    };
    question.options.push(newOption);
    setEditableSteps(newSteps);
  };

  const deleteQuestionOption = (stepIndex: number, questionIndex: number, optionIndex: number) => {
    const newSteps = [...editableSteps];
    const question = newSteps[stepIndex].questions[questionIndex];
    
    if (question.options.length <= 2) {
      alert('객관식 질문은 최소 2개의 선택지가 필요합니다.');
      return;
    }
    
    question.options.splice(optionIndex, 1);
    // 선택지 번호 재정렬
    question.options.forEach((opt, idx) => {
      opt.optionNumber = idx + 1;
    });
    
    setEditableSteps(newSteps);
  };

  // Enhanced Step Management Functions
  const updateStep = (stepIndex: number, updates: Partial<EditableStep>) => {
    const newSteps = [...editableSteps];
    newSteps[stepIndex] = { ...newSteps[stepIndex], ...updates };
    setEditableSteps(newSteps);
  };

  const toggleStepExpand = (stepIndex: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepIndex)) {
      newExpanded.delete(stepIndex);
    } else {
      newExpanded.add(stepIndex);
    }
    setExpandedSteps(newExpanded);
  };

  const expandAllSteps = () => {
    setExpandedSteps(new Set(Array.from({ length: editableSteps.length }, (_, i) => i)));
  };

  const collapseAllSteps = () => {
    setExpandedSteps(new Set());
  };

  if (loadingTemplates) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">새 설문 생성</h1>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <div className="text-gray-600 font-medium">설문 템플릿 로딩 중...</div>
              <div className="text-sm text-gray-500 mt-2">잠시만 기다려주세요</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">새 설문 생성</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* 설문 기본 정보와 템플릿 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 왼쪽: 기본 정보 */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">기본 정보</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  설문 제목 *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="예: [상품명] 상세페이지 설문"
                />
                {validationErrors.title && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  판매자 스토어 이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="예: 브랜드명이나 쇼핑몰 명칭을 적어주세요"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  설문 참여자가 스토어를 구분할 수 있도록 정확한 스토어명을 입력해주세요
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  상품 페이지 URL *
                </label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/product/123"
                />
                {validationErrors.url && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.url}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    최소 연령
                  </label>
                  <input
                    type="number"
                    name="targetAgeMin"
                    value={formData.targetAgeMin}
                    onChange={handleChange}
                    min="1"
                    max="100"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    최대 연령
                  </label>
                  <input
                    type="number"
                    name="targetAgeMax"
                    value={formData.targetAgeMax}
                    onChange={handleChange}
                    min="1"
                    max="100"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              {validationErrors.targetAge && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.targetAge}</p>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  대상 성별
                </label>
                <select
                  name="targetGender"
                  value={formData.targetGender}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ALL">전체</option>
                  <option value="MALE">남성</option>
                  <option value="FEMALE">여성</option>
                </select>
              </div>

              {/* 리워드 시스템 */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-3">리워드 설정</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      건당 리워드 금액 (원) *
                    </label>
                    <input
                      type="text"
                      name="rewardPerResponse"
                      value={formData.rewardPerResponse}
                      onChange={handleNumberChange('rewardPerResponse')}
                      onBlur={handleNumberBlur('rewardPerResponse', 1000, '1000')}
                      placeholder="최소 1,000원"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    {validationErrors.rewardPerResponse && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.rewardPerResponse}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      진행 인원 (명) *
                    </label>
                    <input
                      type="text"
                      name="maxParticipants"
                      value={formData.maxParticipants}
                      onChange={handleNumberChange('maxParticipants')}
                      onBlur={handleNumberBlur('maxParticipants', 10, '10')}
                      placeholder="최소 10명"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    {validationErrors.maxParticipants && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.maxParticipants}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-3 p-3 bg-white rounded border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>리워드 금액:</span>
                    <span>{getBaseBudget().toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>수수료 (10%):</span>
                    <span>{getFee().toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold border-t pt-2">
                    <span>총 리워드 예산:</span>
                    <span className="text-blue-600">
                      {getTotalBudget().toLocaleString()}원
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    (수수료 10% 포함)
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  마감 일시 *
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  min={toKoreanDateTimeLocal(getKoreanTimeAfter(3))}
                  max={toKoreanDateTimeLocal(getKoreanTimeAfter(30))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                {validationErrors.endDate && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.endDate}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  현재로부터 3일 후 ~ 30일 후까지 설정 가능 (기본: 7일 후, 한국시간 기준)
                </p>
              </div>
            </div>

            {/* 오른쪽: 템플릿 선택 */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">설문 템플릿</h2>
              
              {templates.length > 0 ? (
                <div className="space-y-4 max-h-96 lg:max-h-[500px] overflow-y-auto">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedTemplate?.id === template.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{template.name}</h3>
                        {template.isDefault && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            기본
                          </span>
                        )}
                      </div>
                      
                      {template.description && (
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      )}
                      
                      <div className="text-sm text-gray-500 mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <strong className="text-blue-600">{template.steps.length}단계</strong> / 
                            <strong className="ml-1 text-blue-600">
                              {template.steps.reduce((total, step) => total + step.questions.length, 0)}개 질문
                            </strong>
                          </div>
                          <div className="text-xs text-gray-400">
                            예상 {Math.ceil(template.steps.reduce((total, step) => total + step.questions.length, 0) * 0.5)}분 소요
                          </div>
                        </div>
                      </div>
                      
                      {/* 템플릿 질문 미리보기 */}
                      <div className="space-y-2">
                        {template.steps.slice(0, 2).map((step) => (
                          <div key={step.id} className="bg-white rounded-md p-3 border border-gray-100">
                            <div className="text-xs font-medium text-gray-700 mb-1">
                              {step.stepNumber}단계: {step.title}
                            </div>
                            <div className="space-y-1">
                              {step.questions.slice(0, 1).map((question) => (
                                <div key={question.id} className="text-xs text-gray-600">
                                  Q. {question.text}
                                  {question.type === 'SCORE' && (
                                    <div className="flex gap-1 mt-1">
                                      {[1,2,3,4,5].map(i => (
                                        <div key={i} className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                                          {i}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  {question.type === 'MULTIPLE_CHOICE' && (
                                    <div className="mt-1 space-y-0.5">
                                      {question.options.slice(0, 3).map((option) => (
                                        <div key={option.id} className="text-xs text-gray-500">
                                          • {option.text}
                                        </div>
                                      ))}
                                      {question.options.length > 3 && (
                                        <div className="text-xs text-gray-400">
                                          ... 외 {question.options.length - 3}개
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                              {step.questions.length > 1 && (
                                <div className="text-xs text-gray-400">
                                  ... 외 {step.questions.length - 1}개 질문
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        {template.steps.length > 2 && (
                          <div className="text-xs text-gray-400 text-center py-1">
                            ... 외 {template.steps.length - 2}개 단계
                          </div>
                        )}
                      </div>
                      
                      {/* 선택된 템플릿 표시 */}
                      {selectedTemplate?.id === template.id && (
                        <div className="mt-3 pt-3 border-t border-blue-200">
                          <div className="flex items-center text-blue-600 text-sm">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                            선택된 템플릿 - 아래에서 편집 가능
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="w-12 h-12 mx-auto mb-4 text-gray-400">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    설문 템플릿을 로딩 중입니다
                  </h3>
                  <p className="text-gray-500 text-sm">
                    잠시만 기다려주세요. 템플릿이 곧 표시됩니다.
                  </p>
                  {!loadingTemplates && (
                    <div className="mt-4">
                      <button
                        onClick={fetchTemplates}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        다시 시도
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 향상된 설문 문항 편집 섹션 */}
          {!loadingTemplates && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">설문 문항 편집</h2>
                
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={expandAllSteps}
                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    모든 단계 펼치기
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    type="button"
                    onClick={collapseAllSteps}
                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    모든 단계 접기
                  </button>
                </div>
              </div>
              
              {/* Template Customization Notice */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">새로운 5단계 상품 평가 템플릿</h3>
                    <div className="text-blue-800 space-y-1">
                      <p>✨ 첫인상부터 구매의향까지 체계적으로 분석하는 설문입니다</p>
                      <p>📝 총 {getTotalQuestions()}개 질문으로 구성된 전문적인 평가 시스템</p>
                      <p>⏱️ 예상 소요시간: {Math.ceil(getTotalQuestions() * 0.5)}분 (응답자 친화적)</p>
                      <p>🔧 모든 질문과 선택지를 자유롭게 수정할 수 있습니다</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Step Editors */}
              <div className="space-y-6">
                {editableSteps.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg">템플릿을 선택하면 편집할 수 있는 설문 문항이 표시됩니다.</p>
                    <p className="text-gray-400 text-sm mt-2">위에서 설문 템플릿을 클릭해주세요.</p>
                  </div>
                ) : (
                  editableSteps.map((step, stepIndex) => (
                  <StepEditor
                    key={step.id}
                    step={step}
                    stepIndex={stepIndex}
                    totalSteps={editableSteps.length}
                    onUpdateStep={(updates) => updateStep(stepIndex, updates)}
                    onAddQuestion={() => addQuestion(stepIndex)}
                    onUpdateQuestion={(questionIndex, updates) => updateQuestion(stepIndex, questionIndex, updates)}
                    onDeleteQuestion={(questionIndex) => deleteQuestion(stepIndex, questionIndex)}
                    onMoveQuestion={(questionIndex, direction) => moveQuestion(stepIndex, questionIndex, direction)}
                    onAddQuestionOption={(questionIndex) => addQuestionOption(stepIndex, questionIndex)}
                    onUpdateQuestionOption={(questionIndex, optionIndex, text) => updateQuestionOption(stepIndex, questionIndex, optionIndex, text)}
                    onDeleteQuestionOption={(questionIndex, optionIndex) => deleteQuestionOption(stepIndex, questionIndex, optionIndex)}
                    validationErrors={validationErrors}
                    isExpanded={expandedSteps.has(stepIndex)}
                    onToggleExpand={() => toggleStepExpand(stepIndex)}
                  />
                  ))
                )}
              </div>
              
              {/* Enhanced Survey Summary */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  설문 최종 요약
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">{editableSteps.length}</div>
                    <div className="text-sm text-green-600">단계</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">{getTotalQuestions()}</div>
                    <div className="text-sm text-green-600">질문</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">{Math.ceil(getTotalQuestions() * 0.5)}</div>
                    <div className="text-sm text-green-600">예상 분</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">{getTotalBudget().toLocaleString()}</div>
                    <div className="text-sm text-green-600">총 예산(원)</div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">단계별 구성</h5>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-sm">
                    {editableSteps.map((step) => (
                      <div key={step.id} className="flex items-center space-x-2 text-green-700">
                        <span className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-bold">
                          {step.stepNumber}
                        </span>
                        <div>
                          <div className="font-medium truncate" title={step.title}>{step.title}</div>
                          <div className="text-xs text-green-600">{step.questions.length}개 질문</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setShowPreview(true)}
                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>설문 미리보기</span>
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    응답자가 보게 될 설문의 모습을 미리 체험해보세요
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 제출 버튼 */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading || !selectedTemplate || editableSteps.length === 0}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '생성 중...' : '설문 생성'}
            </button>
          </div>
        </form>

        {/* 입금 안내 모달 */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={handlePaymentCancel}
          onConfirm={handlePaymentConfirm}
          totalBudget={getTotalBudget()}
          surveyTitle={formData.title || '새 설문'}
        />

        {/* 설문 미리보기 모달 */}
        <SurveyTemplatePreview
          editableSteps={editableSteps}
          title={formData.title || '설문 미리보기'}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
        />
      </div>
    </div>
  );
};

export default CreateSurvey;