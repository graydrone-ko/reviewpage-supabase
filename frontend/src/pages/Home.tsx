import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSellerCTA = () => {
    navigate('/surveys/create');
  };

  const handleConsumerCTA = () => {
    navigate('/surveys');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            상품 페이지 전환율,<br />
            <span className="text-indigo-600">진짜 이유를 알고 싶다면?</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            실제 고객이 직접 평가해주는 상세페이지 분석 서비스
          </p>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border-l-4 border-green-500 transform hover:scale-105 transition-transform duration-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">🎯 판매자</h3>
              <p className="text-xl sm:text-2xl font-bold text-green-600">월 매출 평균 30% 증가</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border-l-4 border-blue-500 transform hover:scale-105 transition-transform duration-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">💰 소비자</h3>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">설문 1개당 최대 5,000원 적립</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSellerCTA}
              className="bg-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              상세페이지 설문 작성
            </button>
            <button
              onClick={handleConsumerCTA}
              className="bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              설문하고 돈벌기
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
            구체적인 혜택
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Seller Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 transform hover:scale-105 transition-transform duration-200">
              <h3 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4 sm:mb-6 flex items-center">
                🎯 판매자 혜택
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700">실제 소비자의 반응 <strong className="text-indigo-600">직접 들어보세요!</strong></span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700">연령대별/성별 <strong className="text-indigo-600">타겟 데이터 제공</strong></span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700">페이지 개선 후 전환율 상승은 <strong className="text-green-600">이익이 상승합니다.</strong></span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700">원하는 설문을 직접 <strong className="text-indigo-600">세팅하실 수 있습니다.</strong></span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700">건당 설문 비용 <strong className="text-indigo-600">직접 설정 가능해요.</strong></span>
                </li>
              </ul>
            </div>

            {/* Consumer Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 transform hover:scale-105 transition-transform duration-200">
              <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-4 sm:mb-6 flex items-center">
                💰 소비자 혜택
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700">설문 1개 완료시 <strong className="text-green-600">1,000원 이상 즉시 적립</strong></span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700">하루 10분 투자로 앱테크 <strong className="text-green-600">수익을 만들어보세요</strong></span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700">소비자 패널이 되는 <strong className="text-green-600">재미까지</strong></span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700">최소 출금 <strong className="text-green-600">1만원부터 당일 지급</strong></span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700">투자금 없이 지금 바로 <strong className="text-green-600">시작해보세요</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
            작동 방식 (간단 3단계)
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Seller Process */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 sm:p-8 transform hover:scale-105 transition-transform duration-200">
              <h3 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-6 sm:mb-8 text-center">판매자</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <span className="text-lg text-gray-700">이미지 등록 필요 없는 간단한 URL 입력</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <span className="text-lg text-gray-700">내 상품에 맞는 성별/연령 타겟 선택</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <span className="text-lg text-gray-700">건당 리워드와 진행 인원 선택</span>
                </div>
              </div>
            </div>

            {/* Consumer Process */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 sm:p-8 transform hover:scale-105 transition-transform duration-200">
              <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-6 sm:mb-8 text-center">소비자</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <span className="text-lg text-gray-700">설문자 회원 가입</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <span className="text-lg text-gray-700">대상 설문 건 10분 리뷰</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <span className="text-lg text-gray-700">건당 1000원 이상 즉시 적립</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="trust" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-12 sm:mb-16">
            신뢰도
          </h2>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg transform hover:scale-105 transition-transform duration-200">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-2">운영자도 셀러</div>
              <p className="text-sm sm:text-base text-gray-600">설문 퀄리티 사전 검증</p>
            </div>
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg transform hover:scale-105 transition-transform duration-200">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">4.8/5점</div>
              <p className="text-sm sm:text-base text-gray-600">평균 만족도</p>
            </div>
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg transform hover:scale-105 transition-transform duration-200">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-sm sm:text-base text-gray-600">계획 인원 미달성 시 미진행 건 환불</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8">
            지금 시작하고 수익 창출하기
          </h2>
          <p className="text-lg sm:text-xl text-indigo-100 mb-8 sm:mb-12">
            회원가입 무료, 10분이면 완료
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSellerCTA}
              className="bg-white text-indigo-600 px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              판매자로 시작하기
            </button>
            <button
              onClick={handleConsumerCTA}
              className="bg-green-500 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-bold hover:bg-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              소비자로 시작하기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;