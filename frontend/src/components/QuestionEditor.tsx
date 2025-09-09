import React, { useState, useEffect } from 'react';
import { SurveyQuestion, QuestionOption } from '../types';

interface EditableQuestion extends Omit<SurveyQuestion, 'id'> {
  id: string;
  tempId?: string;
}

interface QuestionEditorProps {
  question: EditableQuestion;
  questionIndex: number;
  stepIndex: number;
  totalQuestions: number;
  onUpdate: (updates: Partial<EditableQuestion>) => void;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
  onAddOption: () => void;
  onUpdateOption: (optionIndex: number, text: string) => void;
  onDeleteOption: (optionIndex: number) => void;
  validationErrors?: Record<string, string>;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const QUESTION_TYPES = [
  { value: 'MULTIPLE_CHOICE', label: '객관식', icon: '☐', description: '여러 선택지 중 하나 선택' },
  { value: 'TEXT', label: '주관식', icon: '✏️', description: '자유롭게 텍스트 입력' },
  { value: 'SCORE', label: '평점', icon: '⭐', description: '점수나 등급으로 평가' },
  { value: 'YES_NO', label: '예/아니오', icon: '✓', description: '간단한 예/아니오 선택' },
];

const QuestionEditor: React.FC<QuestionEditorProps> = ({
  question,
  questionIndex,
  stepIndex,
  totalQuestions,
  onUpdate,
  onDelete,
  onMove,
  onAddOption,
  onUpdateOption,
  onDeleteOption,
  validationErrors = {},
  isExpanded = true,
  onToggleExpand
}) => {
  const questionErrorKey = `question_${stepIndex}_${questionIndex}`;
  const optionsErrorKey = `question_${stepIndex}_${questionIndex}_options`;
  
  // 객관식 옵션 백업을 위한 state
  const [multipleChoiceBackup, setMultipleChoiceBackup] = useState<QuestionOption[]>([]);
  
  const selectedType = QUESTION_TYPES.find(type => type.value === question.type);

  // 컴포넌트 마운트 시 또는 question이 변경될 때 객관식 옵션 백업
  useEffect(() => {
    if (question.type === 'MULTIPLE_CHOICE' && question.options.length > 0) {
      // 빈 텍스트가 아닌 유의미한 옵션들만 백업
      const meaningfulOptions = question.options.filter(opt => opt.text.trim() !== '');
      if (meaningfulOptions.length > 0) {
        setMultipleChoiceBackup(meaningfulOptions);
      }
    }
  }, [question.id]); // question.id로 의존성을 제한하여 무한 루프 방지

  const handleTypeChange = (newType: string) => {
    let newOptions: QuestionOption[] = [];
    
    // 현재 객관식이고 백업이 없다면 현재 옵션을 백업
    if (question.type === 'MULTIPLE_CHOICE' && multipleChoiceBackup.length === 0) {
      const meaningfulOptions = question.options.filter(opt => opt.text.trim() !== '');
      if (meaningfulOptions.length > 0) {
        setMultipleChoiceBackup(meaningfulOptions);
      }
    }
    
    if (newType === 'MULTIPLE_CHOICE') {
      // 백업된 옵션이 있으면 복원, 없으면 기본 옵션 생성
      if (multipleChoiceBackup.length >= 2) {
        newOptions = multipleChoiceBackup.map(opt => ({
          ...opt,
          id: opt.id.startsWith('opt_') ? opt.id : `opt_${Date.now()}_${opt.optionNumber}`
        }));
      } else if (question.options.length >= 2) {
        // 현재 옵션이 유효하면 그대로 사용
        newOptions = question.options;
      } else {
        // 기본 옵션 생성
        newOptions = [
          { id: `opt_${Date.now()}_1`, optionNumber: 1, text: '' },
          { id: `opt_${Date.now()}_2`, optionNumber: 2, text: '' }
        ];
      }
    } else if (newType === 'YES_NO') {
      newOptions = [
        { id: `opt_${Date.now()}_1`, optionNumber: 1, text: '예' },
        { id: `opt_${Date.now()}_2`, optionNumber: 2, text: '아니오' }
      ];
    } else if (newType === 'SCORE') {
      newOptions = Array.from({ length: 5 }, (_, i) => ({
        id: `opt_${Date.now()}_${i + 1}`,
        optionNumber: i + 1,
        text: `${i + 1}점`
      }));
    }
    
    onUpdate({ type: newType as any, options: newOptions });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Question Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-blue-600">Q{question.questionNumber}</span>
              <span className="text-sm text-gray-500">({questionIndex + 1}/{totalQuestions})</span>
            </div>
            
            {selectedType && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                <span>{selectedType.icon}</span>
                <span>{selectedType.label}</span>
              </div>
            )}
            
            {question.required && (
              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                필수
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Expand/Collapse Toggle */}
            {onToggleExpand && (
              <button
                type="button"
                onClick={onToggleExpand}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title={isExpanded ? "축소" : "확장"}
              >
                <svg 
                  className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
            
            {/* Move Controls */}
            <div className="flex border border-gray-200 rounded">
              <button
                type="button"
                onClick={() => onMove('up')}
                disabled={questionIndex === 0}
                className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="위로 이동"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => onMove('down')}
                disabled={questionIndex === totalQuestions - 1}
                className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border-l border-gray-200 transition-colors"
                title="아래로 이동"
              >
                ↓
              </button>
            </div>
            
            {/* Delete Button */}
            <button
              type="button"
              onClick={onDelete}
              className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
              title="질문 삭제"
            >
              🗑
            </button>
          </div>
        </div>
      </div>

      {/* Question Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Question Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              질문 내용 {question.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={question.text}
              onChange={(e) => onUpdate({ text: e.target.value })}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                validationErrors[questionErrorKey] ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              rows={2}
              placeholder="질문을 입력하세요 (예: 이 상품의 첫 인상은 어떠셨나요?)"
            />
            {validationErrors[questionErrorKey] && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {validationErrors[questionErrorKey]}
              </p>
            )}
          </div>

          {/* Question Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              답변 방식
            </label>
            <div className="grid grid-cols-2 gap-2">
              {QUESTION_TYPES.map(type => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleTypeChange(type.value)}
                  className={`p-3 border-2 rounded-lg text-left transition-all hover:border-blue-300 ${
                    question.type === type.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{type.icon}</span>
                    <span className="font-medium">{type.label}</span>
                  </div>
                  <p className="text-xs text-gray-500">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Options for Multiple Choice, Score, and Yes/No */}
          {(question.type === 'MULTIPLE_CHOICE' || question.type === 'SCORE' || question.type === 'YES_NO') && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  {question.type === 'SCORE' ? '점수 범위' : '선택지'}
                  {question.type === 'MULTIPLE_CHOICE' && <span className="text-red-500">*</span>}
                </label>
                {question.type === 'MULTIPLE_CHOICE' && (
                  <button
                    type="button"
                    onClick={onAddOption}
                    className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    + 선택지 추가
                  </button>
                )}
              </div>
              
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {question.options.map((option, optionIndex) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 w-8 text-center font-medium">
                      {option.optionNumber}.
                    </span>
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) => {
                        onUpdateOption(optionIndex, e.target.value);
                        // 객관식 옵션 수정 시 백업도 함께 업데이트
                        if (question.type === 'MULTIPLE_CHOICE') {
                          const updatedBackup = [...multipleChoiceBackup];
                          const backupIndex = updatedBackup.findIndex(opt => opt.optionNumber === option.optionNumber);
                          if (backupIndex !== -1) {
                            updatedBackup[backupIndex] = { ...updatedBackup[backupIndex], text: e.target.value };
                            setMultipleChoiceBackup(updatedBackup);
                          }
                        }
                      }}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder={
                        question.type === 'SCORE' 
                          ? `${option.optionNumber}점`
                          : question.type === 'YES_NO'
                            ? (optionIndex === 0 ? '예' : '아니오')
                            : '선택지를 입력하세요'
                      }
                      readOnly={question.type === 'YES_NO'}
                    />
                    {question.type === 'MULTIPLE_CHOICE' && question.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => onDeleteOption(optionIndex)}
                        className="px-2 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                        title="선택지 삭제"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              {validationErrors[optionsErrorKey] && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {validationErrors[optionsErrorKey]}
                </p>
              )}
              
              {question.type === 'MULTIPLE_CHOICE' && (
                <p className="text-xs text-gray-500 mt-1">
                  💡 최소 2개의 선택지가 필요합니다. 선택지는 구체적이고 명확하게 작성해주세요.
                </p>
              )}
            </div>
          )}

          {/* Required Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={question.required}
                onChange={(e) => onUpdate({ required: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
              />
              <span className="text-sm text-gray-700">필수 응답 질문</span>
            </label>
            
            {/* Question Type Help */}
            {selectedType && (
              <div className="text-xs text-gray-500">
                {selectedType.description}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionEditor;