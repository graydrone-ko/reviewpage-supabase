import React, { useState } from 'react';

interface ModalProps {
  onClose: () => void;
}

const TermsModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 id="terms-modal-title" className="text-xl font-bold text-gray-900">이용약관</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="닫기"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="prose max-w-none">
            <div className="text-gray-600 py-6">
              <div className="text-left space-y-6 text-sm text-gray-700">
                <div className="mb-6">
                  <p className="text-base font-semibold text-gray-900 mb-4">📑 리뷰페이지(reviewpage) 이용약관</p>
                  <p className="text-sm">본 약관은 리빙잇소(이하 '회사')가 운영하는 리뷰페이지(reviewpage) 서비스 이용과 관련하여 회사와 회원 간의 권리·의무 및 책임 사항을 규정합니다.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">제1조 (목적)</h3>
                  <p>이 약관은 회사가 제공하는 리뷰페이지(reviewpage) 서비스(셀러 상세페이지 검증 및 설문 플랫폼)의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임 사항을 규정하는 것을 목적으로 합니다.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">제2조 (정의)</h3>
                  <ul className="space-y-2">
                    <li>"셀러"란 서비스에 상세페이지를 등록하여 설문을 진행하는 회원을 말합니다.</li>
                    <li>"소비자 회원"이란 설문에 참여하고 리워드를 지급받는 회원을 말합니다.</li>
                    <li>"리워드"란 설문 참여 시 지급되는 보상으로, 일정 기준 충족 시 현금으로 출금 가능합니다.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">제3조 (회원 가입 및 이용 제한)</h3>
                  <ul className="space-y-2">
                    <li>회원 가입은 만 14세 이상인 자에 한합니다.</li>
                    <li>회원은 가입 시 실명, 이메일, 휴대전화번호, 계좌 정보를 제공해야 합니다.</li>
                    <li>허위 정보를 기재하거나 타인의 정보를 도용한 경우 서비스 이용이 제한됩니다.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">제4조 (서비스 내용)</h3>
                  <ul className="space-y-2">
                    <li>셀러는 설문 진행을 위해 건당 최소 1,000원 이상의 예산을 설정할 수 있습니다.</li>
                    <li>소비자는 설문 1건 참여 시 리워드를 지급받습니다.</li>
                    <li>회사는 총 예산의 10%를 서비스 운영 수수료로 부과합니다.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">제5조 (결제 및 환불)</h3>
                  <ul className="space-y-2">
                    <li>셀러의 설문 예산 결제는 회사 지정 계좌로 현금 입금하는 방식으로 진행됩니다.</li>
                    <li>설문이 진행되지 않은 예산에 한하여 환불이 가능합니다.</li>
                    <li>소비자 리워드는 누적 10,000원 이상 시 현금 출금 가능하며, 요청일 기준 1~2일 내 처리됩니다.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">제6조 (회원의 의무)</h3>
                  <ul className="space-y-2">
                    <li>회원은 관련 법령 및 본 약관을 준수해야 합니다.</li>
                    <li>타인의 권리를 침해하거나 부당한 방법으로 서비스를 이용해서는 안 됩니다.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">제7조 (회사의 의무)</h3>
                  <ul className="space-y-2">
                    <li>회사는 안정적인 서비스 제공을 위해 최선을 다합니다.</li>
                    <li>회사는 개인정보를 보호하며, 법령상 사유 없이 제3자에게 제공하지 않습니다.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">제8조 (책임의 제한)</h3>
                  <ul className="space-y-2">
                    <li>회사는 천재지변, 불가항력 사유로 인한 서비스 장애에 책임을 지지 않습니다.</li>
                    <li>회원 간 발생한 분쟁에 대해서는 회사가 직접 개입하지 않으며, 「소비자분쟁해결 기준」에 따릅니다.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">제9조 (약관의 변경)</h3>
                  <p>회사는 관련 법령 개정 및 운영상 필요에 따라 약관을 변경할 수 있으며, 변경 시 사전에 공지합니다.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">제10조 (분쟁 해결)</h3>
                  <p>본 약관은 대한민국 법률에 따르며, 분쟁 발생 시 「소비자분쟁해결 기준」에 따릅니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

const PrivacyModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 id="privacy-modal-title" className="text-xl font-bold text-gray-900">개인정보처리방침</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="닫기"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="prose max-w-none">
            <div className="text-gray-600 py-6">
              <div className="text-left space-y-6 text-sm text-gray-700">
                <div className="mb-6">
                  <p className="text-base font-semibold text-gray-900 mb-4">📑 리뷰페이지(reviewpage) 개인정보처리방침</p>
                  <p className="text-sm">리빙잇소(이하 '회사')는 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보를 소중히 다루고 있습니다. 본 방침은 이용자가 리뷰페이지(reviewpage) 서비스를 이용할 때 제공한 개인정보가 어떠한 용도와 방식으로 이용되며, 어떻게 보호되는지를 설명합니다.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">1. 수집하는 개인정보 항목</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">회원가입 시:</p>
                      <p>아이디(이메일), 본명, 휴대전화번호, 은행 계좌번호</p>
                    </div>
                    <div>
                      <p className="font-medium">서비스 이용 시:</p>
                      <p>설문 응답 정보(개인식별 불가능한 범위 내)</p>
                    </div>
                    <div>
                      <p className="font-medium">자동 수집 항목:</p>
                      <p>접속 로그, 쿠키, 접속 IP 정보</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">2. 개인정보 수집 및 이용 목적</h3>
                  <ul className="space-y-1">
                    <li>• 회원 식별 및 본인 확인</li>
                    <li>• 서비스 제공 및 설문 진행</li>
                    <li>• 리워드 지급 및 환불 처리</li>
                    <li>• 고객 상담 및 불만 처리</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">3. 개인정보 보유 및 이용 기간</h3>
                  <p className="mb-3">회원 탈퇴 시 즉시 삭제하며, 관련 법령에 따라 일정 기간 보존이 필요한 경우 해당 기간 동안만 보관합니다.</p>
                  <div className="ml-4 space-y-2">
                    <p className="font-medium">「전자상거래 등에서의 소비자보호에 관한 법률」에 따른 보관 기간</p>
                    <ul className="space-y-1">
                      <li>• 계약 또는 청약철회 기록: 5년</li>
                      <li>• 대금 결제 및 재화 공급 기록: 5년</li>
                      <li>• 소비자 불만 및 분쟁처리 기록: 3년</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">4. 개인정보의 제3자 제공</h3>
                  <p>회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 법령에 의거한 경우는 예외로 합니다.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">5. 개인정보 처리 위탁</h3>
                  <p>회사는 원칙적으로 개인정보를 위탁하지 않습니다. 필요 시 사전 고지 및 동의를 받습니다.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">6. 이용자의 권리</h3>
                  <p className="mb-2">언제든 본인의 개인정보를 조회, 수정, 삭제, 탈퇴 요청할 수 있습니다.</p>
                  <p className="text-blue-600">문의: livingitso2024@gmail.com / 0507-1347-5924</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">7. 개인정보 보호책임자</h3>
                  <div className="space-y-1">
                    <p>회사명: 리빙잇소</p>
                    <p>대표자: 김영호</p>
                    <p className="text-blue-600">연락처: livingitso2024@gmail.com / 0507-1347-5924</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 상단 링크 영역 */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-sm">
            <a href="/" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200">
              ReviewPage
            </a>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <button
              onClick={() => setShowTerms(true)}
              className="text-gray-600 hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 transition-colors duration-200"
            >
              이용약관
            </button>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <button
              onClick={() => setShowPrivacy(true)}
              className="text-gray-600 hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 transition-colors duration-200"
            >
              개인정보처리방침
            </button>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <a
              href="mailto:livingitso2024@gmail.com"
              className="text-gray-600 hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 transition-colors duration-200"
            >
              문의: livingitso2024@gmail.com
            </a>
          </div>

          {/* 구분선 */}
          <hr className="border-gray-200 mb-6" />

          {/* 하단 회사 정보 영역 */}
          <div className="text-center text-xs text-gray-500 space-y-2">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span>리빙잇소 (대표: 김영호)</span>
              <span className="hidden sm:inline text-gray-300">|</span>
              <span>서울특별시 도봉구 도봉로 180길 6-83</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span>사업자등록번호: 566-55-00849</span>
              <span className="hidden sm:inline text-gray-300">|</span>
              <span>통신판매업신고: 2024-서울노원-0676</span>
            </div>
            <div className="mt-4 text-gray-400">
              © 2025 ReviewPage. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* 이용약관 팝업 */}
      {showTerms && (
        <TermsModal onClose={() => setShowTerms(false)} />
      )}

      {/* 개인정보처리방침 팝업 */}
      {showPrivacy && (
        <PrivacyModal onClose={() => setShowPrivacy(false)} />
      )}
    </>
  );
};

export default Footer;