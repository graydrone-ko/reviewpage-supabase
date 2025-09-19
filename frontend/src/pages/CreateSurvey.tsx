import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const [isClient, setIsClient] = useState(false);
  const navigate = useNavigate();
  const formId = 'create-survey-form';

  function getDefaultEndDate(): string {
    // 한국시간 기준 7일 후
    const koreanTime = getKoreanTimeAfter(7);
    return toKoreanDateTimeLocal(koreanTime);
  }

  useEffect(() => {
    fetchTemplates();
    setIsClient(true);
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await api.get('/surveys/templates/list');
      const fetchedTemplates: SurveyTemplate[] = response.data.templates || [];
      setTemplates(fetchedTemplates);

      const defaultTemplate =
        fetchedTemplates.find((t) => t.isDefault) || fetchedTemplates[0];

      const hasValidSelection =
        selectedTemplate && fetchedTemplates.some((t) => t.id === selectedTemplate.id);

      if (defaultTemplate && (!hasValidSelection || editableSteps.length === 0)) {
        const templateToUse = hasValidSelection
          ? (selectedTemplate as SurveyTemplate)
          : defaultTemplate;

        if (!hasValidSelection) {
          setSelectedTemplate(templateToUse);
        }

        setFormData((prev) => ({ ...prev, templateId: templateToUse.id }));
        convertTemplateToEditable(templateToUse);
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


      await api.post('/surveys', surveyData);
      
      
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/80 backdrop-blur-sm shadow-xl p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/0 to-purple-50/50 opacity-50" />
            <div className="relative z-10">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">새 설문 생성</h1>
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <div className="text-gray-700 font-medium">설문 템플릿 로딩 중...</div>
                  <div className="text-sm text-gray-600 mt-2">잠시만 기다려주세요</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 pb-40 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/80 backdrop-blur-sm shadow-xl p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/0 to-purple-50/50 opacity-50" />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">새 설문 생성</h1>

            <form id={formId} onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-6 py-4 rounded-2xl shadow-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              {/* 설문 기본 정보와 템플릿 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 왼쪽: 기본 정보 */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/70 backdrop-blur-sm shadow-lg p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/0 to-purple-50/30 opacity-50" />
                    <div className="relative z-10">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">기본 정보</h2>
                      </div>
              
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          설문 제목 *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a.997.997 0 01-.707.293H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                            placeholder="예: [상품명] 상세페이지 설문"
                          />
                        </div>
                        {validationErrors.title && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          판매자 스토어 이름 <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="storeName"
                            value={formData.storeName}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                            placeholder="예: 브랜드명이나 쇼핑몰 명칭을 적어주세요"
                            required
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          설문 참여자가 스토어를 구분할 수 있도록 정확한 스토어명을 입력해주세요
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          상품 페이지 URL *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          </div>
                          <input
                            type="url"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                            placeholder="https://example.com/product/123"
                          />
                        </div>
                        {validationErrors.url && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.url}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            최소 연령
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <input
                              type="number"
                              name="targetAgeMin"
                              value={formData.targetAgeMin}
                              onChange={handleChange}
                              min="1"
                              max="100"
                              className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            최대 연령
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <input
                              type="number"
                              name="targetAgeMax"
                              value={formData.targetAgeMax}
                              onChange={handleChange}
                              min="1"
                              max="100"
                              className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                            />
                          </div>
                        </div>
                      </div>
                      {validationErrors.targetAge && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.targetAge}</p>
                      )}

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          대상 성별
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <select
                            name="targetGender"
                            value={formData.targetGender}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                          >
                            <option value="ALL">전체</option>
                            <option value="MALE">남성</option>
                            <option value="FEMALE">여성</option>
                          </select>
                        </div>
                      </div>

                      {/* 리워드 시스템 */}
                      <div className="relative overflow-hidden rounded-2xl border border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm shadow-lg p-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-white/0 to-purple-100/30 opacity-50" />
                        <div className="relative z-10">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                            </div>
                            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">리워드 설정</h3>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                건당 리워드 금액 (원) *
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                  </svg>
                                </div>
                                <input
                                  type="text"
                                  name="rewardPerResponse"
                                  value={formData.rewardPerResponse}
                                  onChange={handleNumberChange('rewardPerResponse')}
                                  onBlur={handleNumberBlur('rewardPerResponse', 1000, '1000')}
                                  placeholder="최소 1,000원"
                                  className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                                />
                              </div>
                              {validationErrors.rewardPerResponse && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.rewardPerResponse}</p>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                진행 인원 (명) *
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                </div>
                                <input
                                  type="text"
                                  name="maxParticipants"
                                  value={formData.maxParticipants}
                                  onChange={handleNumberChange('maxParticipants')}
                                  onBlur={handleNumberBlur('maxParticipants', 10, '10')}
                                  placeholder="최소 10명"
                                  className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                                />
                              </div>
                              {validationErrors.maxParticipants && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.maxParticipants}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg space-y-2">
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
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          마감 일시 *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <input
                            type="datetime-local"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                            min={toKoreanDateTimeLocal(getKoreanTimeAfter(3))}
                            max={toKoreanDateTimeLocal(getKoreanTimeAfter(30))}
                            className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                          />
                        </div>
                        {validationErrors.endDate && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.endDate}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                          현재로부터 3일 후 ~ 30일 후까지 설정 가능 (기본: 7일 후, 한국시간 기준)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 오른쪽: 템플릿 선택 */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/70 backdrop-blur-sm shadow-lg p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/0 to-purple-50/30 opacity-50" />
                    <div className="relative z-10">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">설문 템플릿</h2>
                      </div>
                      
                      {templates.length > 0 ? (
                        <div className="space-y-4 max-h-96 lg:max-h-[500px] overflow-y-auto pr-2">
                          {templates.map((template) => (
                            <div
                              key={template.id}
                              onClick={() => handleTemplateSelect(template)}
                              className={`relative overflow-hidden p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                selectedTemplate?.id === template.id
                                  ? 'border-blue-500 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm shadow-lg'
                                  : 'border-white/50 bg-white/50 backdrop-blur-sm hover:border-blue-300 hover:bg-white/70'
                              }`}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-white/0 to-purple-50/20 opacity-50" />
                              <div className="relative z-10">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-bold text-gray-900">{template.name}</h3>
                                  {template.isDefault && (
                                    <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full font-semibold shadow-lg">
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
                                    <div key={step.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 border border-white/50 shadow-lg">
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
                                    <div className="flex items-center text-blue-600 text-sm font-semibold">
                                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                      </svg>
                                      선택된 템플릿 - 아래에서 편집 가능
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gradient-to-br from-gray-50/80 to-slate-50/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300">
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
                </div>
              </div>

              {/* 향상된 설문 문항 편집 섹션 */}
              {!loadingTemplates && (
                <div className="space-y-8">
                  <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/80 backdrop-blur-sm shadow-xl p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/0 to-purple-50/50 opacity-50" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </div>
                          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">설문 문항 편집</h2>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={expandAllSteps}
                            className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                          >
                            모든 단계 펼치기
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            type="button"
                            onClick={collapseAllSteps}
                            className="px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                          >
                            모든 단계 접기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Template Customization Notice */}
                  <div className="relative overflow-hidden rounded-2xl border border-blue-200/50 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm shadow-xl p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-white/0 to-indigo-100/30 opacity-50" />
                    <div className="relative z-10">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">🎯</div>
                        <div>
                          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">새로운 5단계 상품 평가 템플릿</h3>
                          <div className="text-blue-800 space-y-1">
                            <p>✨ 첫인상부터 구매의향까지 체계적으로 분석하는 설문입니다</p>
                            <p>📝 총 {getTotalQuestions()}개 질문으로 구성된 전문적인 평가 시스템</p>
                            <p>⏱️ 예상 소요시간: {Math.ceil(getTotalQuestions() * 0.5)}분 (응답자 친화적)</p>
                            <p>🔧 모든 질문과 선택지를 자유롭게 수정할 수 있습니다</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Step Editors */}
                  <div className="space-y-6">
                    {editableSteps.length === 0 ? (
                      <div className="text-center py-12 bg-gradient-to-br from-gray-50/80 to-slate-50/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300">
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
                  <div className="relative overflow-hidden rounded-2xl border border-green-200/50 bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm shadow-xl p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 via-white/0 to-emerald-100/30 opacity-50" />
                    <div className="relative z-10">
                      <h4 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
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
                      
                      <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200/50 shadow-lg">
                        <h5 className="font-medium text-green-800 mb-2">단계별 구성</h5>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-sm">
                          {editableSteps.map((step) => (
                            <div key={step.id} className="flex items-center space-x-2 text-green-700">
                              <span className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
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
                          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
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
                </div>
              )}

              {/* 제출 버튼 */}
              {isClient && createPortal(
                <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4">
                  <div className="pointer-events-auto flex w-full max-w-5xl items-center justify-end gap-4 rounded-3xl border border-white/60 bg-white/95 px-6 py-4 shadow-2xl backdrop-blur-xl">
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard')}
                      className="rounded-2xl border border-gray-200 bg-white/80 px-6 py-3 text-gray-700 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      form={formId}
                      disabled={loading || !selectedTemplate || editableSteps.length === 0}
                      className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <div className="flex items-center">
                        {loading ? (
                          <>
                            <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            생성 중...
                          </>
                        ) : (
                          <>
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            설문 생성
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </div>,
                document.body
              )}
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
      </div>
    </div>
  );
};

export default CreateSurvey;
