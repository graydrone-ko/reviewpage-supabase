import React from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalBudget: number;
  surveyTitle: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalBudget,
  surveyTitle
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="text-2xl mb-2">📢</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            리워드 금액 입금 안내
          </h2>
          <p className="text-sm text-gray-600">
            "{surveyTitle}" 설문을 위한 리워드 입금이 필요합니다.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">계좌번호:</span>
              <span className="font-semibold">신한은행 110-572-047334</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">예금주:</span>
              <span className="font-semibold">김영호</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">입금액:</span>
              <span className="font-bold text-blue-600 text-lg">
                {totalBudget.toLocaleString()}원
              </span>
            </div>
            <div className="text-xs text-gray-500 text-center mt-2">
              (수수료 10% 포함)
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="text-yellow-400">⚠️</div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 mb-2">
                중요 안내사항
              </h3>
              <div className="text-sm text-yellow-700 space-y-1">
                <p>• 진행 인원을 제외한 나머지 리워드 금액과 수수료는 환불 요청이 가능합니다</p>
                <p>• 입금 확인 후 설문이 승인됩니다</p>
                <p>• 승인까지 영업일 기준 1-2일 소요됩니다</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;