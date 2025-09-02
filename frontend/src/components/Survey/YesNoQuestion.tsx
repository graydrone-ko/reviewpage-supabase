import React from 'react';

interface YesNoQuestionProps {
  question: {
    id: string;
    text: string;
  };
  value: boolean | null;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

const YesNoQuestion: React.FC<YesNoQuestionProps> = ({
  question,
  value,
  onChange,
  disabled = false
}) => {
  console.log('YesNoQuestion render - Current value:', value, typeof value);
  
  const handleOptionChange = (selectedValue: boolean) => {
    console.log('Option clicked:', selectedValue);
    onChange(selectedValue);
  };

  // 강력한 인라인 스타일 정의 - 확실한 시각적 피드백을 위해
  const getYesStyle = (): React.CSSProperties => {
    if (value === true) {
      return {
        backgroundColor: '#10b981',
        borderColor: '#10b981',
        color: 'white',
        transform: 'scale(1.03)',
        boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.4), 0 0 0 4px rgba(16, 185, 129, 0.3)',
        borderWidth: '2px',
        borderStyle: 'solid'
      };
    }
    return {};
  };

  const getNoStyle = (): React.CSSProperties => {
    if (value === false) {
      return {
        backgroundColor: '#ef4444',
        borderColor: '#ef4444', 
        color: 'white',
        transform: 'scale(1.03)',
        boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.4), 0 0 0 4px rgba(239, 68, 68, 0.3)',
        borderWidth: '2px',
        borderStyle: 'solid'
      };
    }
    return {};
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        {question.text}
      </h3>
      
      {/* 라디오 버튼 스타일로 변경하여 더 명확한 시각적 피드백 제공 */}
      <div className="space-y-4">
        {/* 예 버튼 */}
        <label 
          className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
            value !== true ? 'border-gray-300 text-gray-700 hover:border-green-300 hover:bg-green-50' : ''
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={getYesStyle()}
        >
          <input
            type="radio"
            name={`question-${question.id}`}
            value="true"
            checked={value === true}
            onChange={() => handleOptionChange(true)}
            disabled={disabled}
            className="sr-only"
          />
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${
            value === true 
              ? 'border-white bg-white' 
              : 'border-gray-400'
          }`}>
            {value === true && (
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <svg className={`w-6 h-6 ${value === true ? 'text-white' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-lg font-medium" style={value === true ? {color: 'white'} : {}}>예</span>
          </div>
        </label>

        {/* 아니오 버튼 - 강화된 시각적 피드백 */}
        <label 
          className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
            value !== false ? 'border-gray-300 text-gray-700 hover:border-red-300 hover:bg-red-50' : ''
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={getNoStyle()}
        >
          <input
            type="radio"
            name={`question-${question.id}`}
            value="false"
            checked={value === false}
            onChange={() => handleOptionChange(false)}
            disabled={disabled}
            className="sr-only"
          />
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${
            value === false 
              ? 'border-white bg-white' 
              : 'border-gray-400'
          }`}>
            {value === false && (
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <svg className={`w-6 h-6 ${value === false ? 'text-white' : 'text-red-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-lg font-medium" style={value === false ? {color: 'white'} : {}}>아니오</span>
          </div>
        </label>
      </div>
      
      {/* 현재 선택 상태 표시 - 더 명확하고 강조된 스타일 */}
      <div className="text-center">
        {value !== null ? (
          <div 
            className={`inline-flex items-center space-x-3 px-6 py-3 rounded-lg text-base font-bold border-2`}
            style={value === true ? {
              backgroundColor: '#dcfce7',
              borderColor: '#22c55e',
              color: '#166534'
            } : {
              backgroundColor: '#fee2e2',
              borderColor: '#ef4444',
              color: '#991b1b'
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              {value === true ? (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              )}
            </svg>
            <span>✓ {value === true ? '예' : '아니오'}가 선택되었습니다</span>
          </div>
        ) : (
          <div className="text-gray-500 text-base font-medium px-4 py-2 bg-gray-100 rounded-lg border border-gray-300">
            ⚠️ 답변을 선택해주세요
          </div>
        )}
      </div>
      
      {/* 격려 메시지 */}
      <div className="mt-6 p-3 bg-blue-50 border-l-4 border-blue-400 text-sm text-blue-700">
        <p className="font-medium">판매자에게는 중요한 정보가 될 수 있습니다. 정성을 다하지만 솔직하게 답변을 부탁드립니다!</p>
      </div>
    </div>
  );
};

export default YesNoQuestion;