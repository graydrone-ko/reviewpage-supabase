import React from 'react';

interface Option {
  id: string;
  optionNumber: number;
  text: string;
}

interface MultipleChoiceQuestionProps {
  question: {
    id: string;
    text: string;
    options: Option[];
  };
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  otherText?: string;
  onOtherTextChange?: (text: string) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  value,
  onChange,
  disabled = false,
  otherText = '',
  onOtherTextChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {question.text}
      </h3>
      
      <div className="space-y-2">
        {question.options.map((option) => (
          <label
            key={option.id}
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
              value === option.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option.id}
              checked={value === option.id}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              className="sr-only"
            />
            <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
              value === option.id
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300'
            }`}>
              {value === option.id && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <span className="text-gray-700">{option.text}</span>
          </label>
        ))}
      </div>
      
      {/* 기타 입력 처리 (option.text가 '기타'인 경우) */}
      {question.options.some(option => 
        option.text.includes('기타') || option.text.includes('other')
      ) && value === question.options.find(option => 
        option.text.includes('기타') || option.text.includes('other')
      )?.id && (
        <div className="mt-3">
          <div className="relative">
            <textarea
              value={otherText}
              onChange={(e) => onOtherTextChange?.(e.target.value)}
              placeholder="기타 의견을 입력해주세요... (최소 10자)"
              className={`w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                otherText.length < 10 ? 'border-red-300' : 'border-gray-300'
              }`}
              rows={3}
              disabled={disabled}
            />
            <div className="absolute bottom-3 right-3 text-sm text-gray-400">
              {otherText.length}/10
            </div>
          </div>
          {otherText.length > 0 && otherText.length < 10 && (
            <div className="text-sm text-red-600 mt-1">
              최소 10자 이상 입력해주세요.
            </div>
          )}
        </div>
      )}
      
      {/* 격려 메시지 */}
      <div className="mt-6 p-3 bg-blue-50 border-l-4 border-blue-400 text-sm text-blue-700">
        <p className="font-medium">판매자에게는 중요한 정보가 될 수 있습니다. 정성을 다하지만 솔직하게 답변을 부탁드립니다!</p>
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;