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
            <div className="text-gray-600 text-center py-12">
              <p className="text-lg mb-4">이용약관</p>
              <p className="text-sm text-gray-500 mb-8">
                ReviewPage 서비스 이용약관은 추후 업데이트 예정입니다.
              </p>
              <div className="text-left space-y-4 text-sm text-gray-700">
                <div>
                  <h3 className="font-semibold mb-2">제1조 (목적)</h3>
                  <p>본 약관은 ReviewPage(이하 "회사")가 제공하는 설문조사 플랫폼 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">제2조 (정의)</h3>
                  <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>"서비스"라 함은 회사가 제공하는 설문조사 플랫폼을 의미합니다.</li>
                    <li>"회원"이라 함은 본 약관에 동의하고 서비스에 가입한 개인 또는 법인을 의미합니다.</li>
                    <li>"설문조사"라 함은 회원이 작성하거나 참여하는 모든 형태의 질문 및 응답을 의미합니다.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">제3조 (약관의 효력 및 변경)</h3>
                  <p>본 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다.</p>
                </div>
                <p className="text-xs text-gray-400 mt-8">
                  상세한 이용약관은 서비스 정식 오픈 시 업데이트될 예정입니다.
                </p>
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
            <div className="text-gray-600 text-center py-12">
              <p className="text-lg mb-4">개인정보처리방침</p>
              <p className="text-sm text-gray-500 mb-8">
                ReviewPage 개인정보처리방침은 추후 업데이트 예정입니다.
              </p>
              <div className="text-left space-y-4 text-sm text-gray-700">
                <div>
                  <h3 className="font-semibold mb-2">1. 개인정보의 수집·이용 목적</h3>
                  <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>서비스 제공 및 계약 이행</li>
                    <li>회원 식별 및 본인 확인</li>
                    <li>설문조사 참여 및 리워드 지급</li>
                    <li>고객 상담 및 불만 처리</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">2. 수집하는 개인정보의 항목</h3>
                  <p>회사는 다음과 같은 개인정보를 수집합니다:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>필수항목: 이름, 이메일, 전화번호, 생년월일, 성별</li>
                    <li>선택항목: 은행 계좌 정보 (리워드 지급용)</li>
                    <li>자동수집: 접속 로그, IP 주소, 쿠키</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">3. 개인정보의 처리 및 보유 기간</h3>
                  <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                </div>
                <p className="text-xs text-gray-400 mt-8">
                  상세한 개인정보처리방침은 서비스 정식 오픈 시 업데이트될 예정입니다.
                </p>
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