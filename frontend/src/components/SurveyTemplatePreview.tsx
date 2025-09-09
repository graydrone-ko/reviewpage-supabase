import React, { useState } from 'react';
import { SurveyTemplate, SurveyStep, SurveyQuestion } from '../types';

interface EditableQuestion extends Omit<SurveyQuestion, 'id'> {
  id: string;
  tempId?: string;
}

interface EditableStep extends Omit<SurveyStep, 'id' | 'questions'> {
  id: string;
  tempId?: string;
  questions: EditableQuestion[];
}

interface SurveyTemplatePreviewProps {
  template?: SurveyTemplate;
  editableSteps?: EditableStep[];
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

const SurveyTemplatePreview: React.FC<SurveyTemplatePreviewProps> = ({
  template,
  editableSteps,
  title = "설문 미리보기",
  isOpen,
  onClose
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [sampleAnswers, setSampleAnswers] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  // Use either template.steps or editableSteps
  const steps = editableSteps || template?.steps || [];
  const currentStep = steps[currentStepIndex];

  const handleSampleAnswer = (questionId: string, value: string) => {
    setSampleAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const resetPreview = () => {
    setCurrentStepIndex(0);
    setSampleAnswers({});
  };

  const getProgressPercentage = () => {
    return ((currentStepIndex + 1) / steps.length) * 100;
  };

  const renderQuestion = (question: EditableQuestion | SurveyQuestion) => {
    const sampleValue = sampleAnswers[question.id] || '';

    return (
      <div key={question.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            {question.questionNumber}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {question.text}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </h3>
            
            {/* Answer Preview Based on Type */}
            <div className="mt-4">
              {question.type === 'MULTIPLE_CHOICE' && (
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <label key={option.id} className="flex items-center cursor-pointer p-2 rounded hover:bg-gray-50">
                      <input
                        type="radio"
                        name={`preview_${question.id}`}
                        value={option.text}
                        checked={sampleValue === option.text}
                        onChange={(e) => handleSampleAnswer(question.id, e.target.value)}
                        className="mr-3 text-blue-600"
                      />
                      <span className="text-gray-700">{option.text}</span>
                    </label>
                  ))}
                </div>
              )}
              
              {question.type === 'YES_NO' && (
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <label key={option.id} className="flex items-center cursor-pointer p-2 rounded hover:bg-gray-50">
                      <input
                        type="radio"
                        name={`preview_${question.id}`}
                        value={option.text}
                        checked={sampleValue === option.text}
                        onChange={(e) => handleSampleAnswer(question.id, e.target.value)}
                        className="mr-3 text-blue-600"
                      />
                      <span className="text-gray-700">{option.text}</span>
                    </label>
                  ))}
                </div>
              )}
              
              {question.type === 'SCORE' && (
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    {question.options.map((option, optionIndex) => (
                      <button
                        key={option.id}
                        onClick={() => handleSampleAnswer(question.id, option.text)}
                        className={`w-12 h-12 rounded-full border-2 font-bold transition-all ${
                          sampleValue === option.text
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-600 border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        {option.optionNumber}
                      </button>
                    ))}
                  </div>
                  {question.options.length > 0 && (
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{question.options[0]?.text}</span>
                      <span>{question.options[question.options.length - 1]?.text}</span>
                    </div>
                  )}
                </div>
              )}
              
              {question.type === 'TEXT' && (
                <textarea
                  value={sampleValue}
                  onChange={(e) => handleSampleAnswer(question.id, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  rows={3}
                  placeholder="자유롭게 의견을 작성해주세요..."
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                진행률: {currentStepIndex + 1}/{steps.length} 단계
              </span>
              <span className="text-sm">{getProgressPercentage().toFixed(0)}%</span>
            </div>
            <div className="w-full bg-blue-300 bg-opacity-30 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
          
          {/* Step Navigation */}
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStepIndex(index)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  index === currentStepIndex
                    ? 'bg-white text-blue-600'
                    : index < currentStepIndex
                    ? 'bg-blue-400 text-white'
                    : 'bg-blue-500 bg-opacity-50 text-white hover:bg-opacity-70'
                }`}
              >
                {step.stepNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentStep ? (
            <div>
              {/* Step Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                    {currentStep.stepNumber}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{currentStep.title}</h3>
                    {currentStep.description && (
                      <p className="text-gray-600 mt-1">{currentStep.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>📝 {currentStep.questions.length}개 질문</span>
                  <span>⏱️ 약 {Math.ceil(currentStep.questions.length * 0.5)}분 소요</span>
                  <span>✅ 필수 {currentStep.questions.filter(q => q.required).length}개</span>
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {currentStep.questions.map(renderQuestion)}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">설문 단계를 찾을 수 없습니다</h3>
              <p className="text-gray-500">설문 템플릿을 다시 선택해주세요.</p>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <button
                onClick={resetPreview}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                🔄 처음부터
              </button>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← 이전 단계
              </button>
              
              {currentStepIndex < steps.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  다음 단계 →
                </button>
              ) : (
                <div className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg font-medium">
                  ✅ 설문 완료
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyTemplatePreview;