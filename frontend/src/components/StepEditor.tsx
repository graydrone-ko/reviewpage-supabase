import React, { useState } from 'react';
import { SurveyStep, SurveyQuestion } from '../types';
import QuestionEditor from './QuestionEditor';

interface EditableQuestion extends Omit<SurveyQuestion, 'id'> {
  id: string;
  tempId?: string;
}

interface EditableStep extends Omit<SurveyStep, 'id' | 'questions'> {
  id: string;
  tempId?: string;
  questions: EditableQuestion[];
}

interface StepEditorProps {
  step: EditableStep;
  stepIndex: number;
  totalSteps: number;
  onUpdateStep: (updates: Partial<EditableStep>) => void;
  onAddQuestion: () => void;
  onUpdateQuestion: (questionIndex: number, updates: Partial<EditableQuestion>) => void;
  onDeleteQuestion: (questionIndex: number) => void;
  onMoveQuestion: (questionIndex: number, direction: 'up' | 'down') => void;
  onAddQuestionOption: (questionIndex: number) => void;
  onUpdateQuestionOption: (questionIndex: number, optionIndex: number, text: string) => void;
  onDeleteQuestionOption: (questionIndex: number, optionIndex: number) => void;
  validationErrors?: Record<string, string>;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const StepEditor: React.FC<StepEditorProps> = ({
  step,
  stepIndex,
  totalSteps,
  onUpdateStep,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onMoveQuestion,
  onAddQuestionOption,
  onUpdateQuestionOption,
  onDeleteQuestionOption,
  validationErrors = {},
  isExpanded = true,
  onToggleExpand
}) => {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set(Array.from({ length: step.questions.length }, (_, i) => i)));

  const toggleQuestionExpand = (questionIndex: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionIndex)) {
      newExpanded.delete(questionIndex);
    } else {
      newExpanded.add(questionIndex);
    }
    setExpandedQuestions(newExpanded);
  };

  const expandAllQuestions = () => {
    setExpandedQuestions(new Set(Array.from({ length: step.questions.length }, (_, i) => i)));
  };

  const collapseAllQuestions = () => {
    setExpandedQuestions(new Set());
  };

  // Step icons based on common survey stages
  const getStepIcon = (stepNumber: number) => {
    const icons = ['👀', '📝', '🎯', '📊', '💭'];
    return icons[stepNumber - 1] || '📋';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Step Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {step.stepNumber}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-semibold text-gray-900">{step.title}</span>
                  <span className="text-2xl">{getStepIcon(step.stepNumber)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{step.questions.length}개 질문</span>
                  <span>•</span>
                  <span>예상 {Math.ceil(step.questions.length * 0.5)}분 소요</span>
                </div>
              </div>
            </div>
            
            {step.description && (
              <div className="max-w-md">
                <p className="text-sm text-gray-600 italic">"{step.description}"</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Question Management Controls */}
            <div className="flex items-center space-x-1 mr-3">
              <button
                type="button"
                onClick={expandAllQuestions}
                className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                title="모든 질문 펼치기"
              >
                전체 펼치기
              </button>
              <span className="text-gray-300">|</span>
              <button
                type="button"
                onClick={collapseAllQuestions}
                className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                title="모든 질문 접기"
              >
                전체 접기
              </button>
            </div>
            
            {/* Add Question Button */}
            <button
              type="button"
              onClick={onAddQuestion}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>질문 추가</span>
            </button>
            
            {/* Expand/Collapse Toggle */}
            {onToggleExpand && (
              <button
                type="button"
                onClick={onToggleExpand}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title={isExpanded ? "단계 축소" : "단계 확장"}
              >
                <svg 
                  className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Step Content */}
      {isExpanded && (
        <div className="p-6">
          {/* Step Description Editor (Optional Enhancement) */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              단계 설명 (응답자에게 표시)
            </label>
            <textarea
              value={step.description || ''}
              onChange={(e) => onUpdateStep({ description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              rows={2}
              placeholder={`${step.stepNumber}단계에 대한 안내 메시지를 입력하세요 (예: 상품 페이지를 보고 첫 인상에 대해 답해주세요)`}
            />
          </div>

          {/* Questions List */}
          {step.questions.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">
                  설문 질문 ({step.questions.length}개)
                </h4>
                <div className="text-sm text-gray-500">
                  질문을 클릭하여 상세 편집하거나 드래그하여 순서를 변경하세요
                </div>
              </div>
              
              {step.questions.map((question, questionIndex) => (
                <QuestionEditor
                  key={question.tempId || question.id}
                  question={question}
                  questionIndex={questionIndex}
                  stepIndex={stepIndex}
                  totalQuestions={step.questions.length}
                  onUpdate={(updates) => onUpdateQuestion(questionIndex, updates)}
                  onDelete={() => onDeleteQuestion(questionIndex)}
                  onMove={(direction) => onMoveQuestion(questionIndex, direction)}
                  onAddOption={() => onAddQuestionOption(questionIndex)}
                  onUpdateOption={(optionIndex, text) => onUpdateQuestionOption(questionIndex, optionIndex, text)}
                  onDeleteOption={(optionIndex) => onDeleteQuestionOption(questionIndex, optionIndex)}
                  validationErrors={validationErrors}
                  isExpanded={expandedQuestions.has(questionIndex)}
                  onToggleExpand={() => toggleQuestionExpand(questionIndex)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                이 단계에 질문이 없습니다
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                '{step.title}' 단계에 첫 번째 질문을 추가해보세요
              </p>
              <button
                type="button"
                onClick={onAddQuestion}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                첫 질문 추가하기
              </button>
            </div>
          )}

          {/* Step Summary */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h5 className="font-medium text-blue-900 mb-2">{step.stepNumber}단계 요약</h5>
            <div className="grid grid-cols-3 gap-4 text-sm text-blue-700">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>질문 {step.questions.length}개</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>약 {Math.ceil(step.questions.length * 0.5)}분</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span>필수 {step.questions.filter(q => q.required).length}개</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepEditor;