import React from 'react';

interface ScoreQuestionProps {
  question: {
    id: string;
    text: string;
  };
  value: number | null;
  onChange: (value: number) => void;
  disabled?: boolean;
  scale?: 5 | 10; // 1-5점 또는 1-10점 척도
}

const ScoreQuestion: React.FC<ScoreQuestionProps> = ({
  question,
  value,
  onChange,
  disabled = false,
  scale = 10
}) => {
  const scores = Array.from({ length: scale }, (_, i) => i + 1);

  const getScoreLabel = (score: number) => {
    if (scale === 5) {
      const labels = ['매우 나쁨', '나쁨', '보통', '좋음', '매우 좋음'];
      return labels[score - 1];
    } else {
      if (score <= 2) return '매우 나쁨';
      if (score <= 4) return '나쁨';
      if (score <= 6) return '보통';
      if (score <= 8) return '좋음';
      return '매우 좋음';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {question.text}
      </h3>
      
      {/* 점수 슬라이더 */}
      <div className="px-2">
        <div className="relative">
          <input
            type="range"
            min="1"
            max={scale}
            value={value || 1}
            onChange={(e) => onChange(parseInt(e.target.value))}
            disabled={disabled}
            className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{
              background: value 
                ? `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value - 1) / (scale - 1)) * 100}%, #e5e7eb ${((value - 1) / (scale - 1)) * 100}%, #e5e7eb 100%)`
                : '#e5e7eb'
            }}
          />
          
          {/* 점수 표시 */}
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>1</span>
            <span>{Math.ceil(scale / 2)}</span>
            <span>{scale}</span>
          </div>
        </div>
      </div>
      
      {/* 선택된 점수 표시 */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-4 bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {value || 1}점
          </div>
          <div className="text-sm text-blue-600">
            {getScoreLabel(value || 1)}
          </div>
        </div>
      </div>
      
      {/* 점수 버튼들 (클릭으로도 선택 가능) */}
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
        {scores.map((score) => (
          <button
            key={score}
            onClick={() => onChange(score)}
            disabled={disabled}
            className={`p-2 text-sm font-medium rounded-lg border-2 transition-colors ${
              value === score
                ? 'border-blue-500 bg-blue-500 text-white'
                : 'border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {score}
          </button>
        ))}
      </div>
      
      {/* 격려 메시지 */}
      <div className="mt-6 p-3 bg-blue-50 border-l-4 border-blue-400 text-sm text-blue-700">
        <p className="font-medium">판매자에게는 중요한 정보가 될 수 있습니다. 정성을 다하지만 솔직하게 답변을 부탁드립니다!</p>
      </div>
    </div>
  );
};

export default ScoreQuestion;