import React from 'react';
import { getTextInputStatus } from '../../utils/validation';

interface TextQuestionProps {
  question: {
    id: string;
    text: string;
    required?: boolean;
    minLength?: number;
  };
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

const TextQuestion: React.FC<TextQuestionProps> = ({
  question,
  value,
  onChange,
  disabled = false
}) => {
  const maxLength = 500;
  const minLength = question.minLength || 20; // 기본 20자
  
  // 실시간 입력 상태 확인
  const inputStatus = getTextInputStatus(value, minLength);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {question.text}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </h3>
      
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="여기에 답변을 입력해주세요..."
          className={`w-full p-4 border rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors ${
            disabled ? 'bg-gray-50 cursor-not-allowed' : ''
          } ${
            inputStatus.isValid ? 'border-green-300 bg-green-50' : 
            value.trim().length > 0 ? 'border-yellow-300 bg-yellow-50' : 
            'border-gray-300'
          }`}
          rows={4}
          maxLength={maxLength}
        />
        
        <div className="absolute bottom-3 right-3 text-sm text-gray-400">
          {value.length}/{maxLength}
        </div>
      </div>
      
      {/* 입력 상태 피드백 */}
      <div className={`flex items-center justify-between text-sm ${
        inputStatus.isValid ? 'text-green-600' : 
        value.trim().length > 0 ? 'text-yellow-600' : 
        'text-gray-500'
      }`}>
        <div className="flex items-center space-x-2">
          {inputStatus.isValid ? (
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span>{inputStatus.message}</span>
        </div>
        <span className="text-xs">
          최소 {minLength}자, 최대 {maxLength}자
        </span>
      </div>
      
      {/* 격려 메시지 */}
      <div className="mt-6 p-3 bg-blue-50 border-l-4 border-blue-400 text-sm text-blue-700">
        <p className="font-medium">판매자에게는 중요한 정보가 될 수 있습니다. 정성을 다하지만 솔직하게 답변을 부탁드립니다!</p>
      </div>
    </div>
  );
};

export default TextQuestion;