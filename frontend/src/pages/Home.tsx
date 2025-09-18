import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 py-20 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        </div>

        <div className={`max-w-7xl mx-auto text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
              🚀 새로운 수익 창출 플랫폼
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              설문조사로 돈벌기,
            </span>
            <br />
            <span className="text-gray-900">ReviewPage와 함께</span>
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-12 max-w-4xl mx-auto font-medium leading-relaxed">
            제품 피드백 설문조사로 <span className="text-green-600 font-bold">현금 리워드</span> 받고,<br />
            판매자는 고객 의견으로 <span className="text-purple-600 font-bold">매출 증대</span>하는 윈윈 플랫폼
          </p>
          
          <div className="max-w-5xl mx-auto mb-12">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">판매자</h3>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  월 매출 평균 30% 증가
                </p>
                <p className="text-gray-600">실제 고객 데이터 기반 상세페이지 개선</p>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">소비자</h3>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  설문 1개당<br className="sm:hidden" /> 최대 5,000원
                </p>
                <p className="text-gray-600">간단한 설문 참여로 즉시 현금 적립</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={handleSellerCTA}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center">
                  <span className="mr-2">📋</span>
                  상세페이지 설문 작성
                </span>
              </button>
              
              <button
                onClick={handleConsumerCTA}
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center">
                  <span className="mr-2">💸</span>
                  설문하고 돈벌기
                </span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                설문조사 플랫폼의
              </span>
              <br />
              구체적인 혜택
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              판매자와 소비자 모두에게 실질적인 가치를 제공하는 혁신적인 플랫폼
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Seller Benefits */}
            <div className="group relative bg-white rounded-3xl shadow-xl p-8 sm:p-10 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    제품 상세페이지 개선으로
                    <br />
                    <span className="text-purple-600">매출 증대</span>
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="text-gray-700 text-lg">실제 소비자의 반응 <strong className="text-purple-600">직접 들어보세요!</strong></span>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="text-gray-700 text-lg">연령대별/성별 <strong className="text-purple-600">타겟 데이터 제공</strong></span>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="text-gray-700 text-lg">페이지 개선 후 전환율 상승은 <strong className="text-green-600">이익이 상승합니다.</strong></span>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="text-gray-700 text-lg">원하는 설문을 직접 <strong className="text-purple-600">세팅하실 수 있습니다.</strong></span>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="text-gray-700 text-lg">건당 설문 비용 <strong className="text-purple-600">직접 설정 가능해요.</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Consumer Benefits */}
            <div className="group relative bg-white rounded-3xl shadow-xl p-8 sm:p-10 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    설문 리워드 사이트로
                    <br />
                    <span className="text-green-600">용돈벌기</span>
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="text-gray-700 text-lg">설문 1개 완료시 <strong className="text-green-600">1,000원 이상 즉시 적립</strong></span>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="text-gray-700 text-lg">하루 10분 투자로 앱테크 <strong className="text-green-600">수익을 만들어보세요</strong></span>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="text-gray-700 text-lg">소비자 패널이 되는 <strong className="text-green-600">재미까지</strong></span>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="text-gray-700 text-lg">최소 출금 <strong className="text-green-600">1만원부터 출금 가능</strong></span>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="text-gray-700 text-lg">투자금 없이 지금 바로 <strong className="text-green-600">시작해보세요</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              온라인 부업<br className="sm:hidden" /> 설문조사 시작하는 방법
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                간단 3단계
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              복잡한 절차 없이 누구나 쉽게 시작할 수 있는 직관적인 프로세스
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Seller Process */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-10 transform group-hover:scale-105 transition-all duration-300">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">판매자</h3>
                  <p className="text-gray-600">매출 증대를 위한 고객 인사이트 획득</p>
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-start group/item">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl flex items-center justify-center font-bold text-xl mr-6 group-hover/item:scale-110 transition-transform duration-200">
                      1
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">간단한 URL 입력</h4>
                      <p className="text-gray-600">이미지 등록 필요 없이 상품 상세페이지 URL만 입력하세요</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group/item">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl flex items-center justify-center font-bold text-xl mr-6 group-hover/item:scale-110 transition-transform duration-200">
                      2
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">타겟 설정</h4>
                      <p className="text-gray-600">내 상품에 맞는 성별/연령대 타겟을 선택하세요</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group/item">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl flex items-center justify-center font-bold text-xl mr-6 group-hover/item:scale-110 transition-transform duration-200">
                      3
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">리워드 설정</h4>
                      <p className="text-gray-600">건당 리워드 금액과 진행 인원을 직접 설정하세요</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Consumer Process */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-10 transform group-hover:scale-105 transition-all duration-300">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">💰</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">소비자</h3>
                  <p className="text-gray-600">설문 참여로 용돈벌기 시작</p>
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-start group/item">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl flex items-center justify-center font-bold text-xl mr-6 group-hover/item:scale-110 transition-transform duration-200">
                      1
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">회원 가입</h4>
                      <p className="text-gray-600">설문자 회원 가입 후 프로필을 설정하세요</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group/item">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl flex items-center justify-center font-bold text-xl mr-6 group-hover/item:scale-110 transition-transform duration-200">
                      2
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">설문 참여</h4>
                      <p className="text-gray-600">대상 설문을 선택하여 10분간 리뷰를 작성하세요</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group/item">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl flex items-center justify-center font-bold text-xl mr-6 group-hover/item:scale-110 transition-transform duration-200">
                      3
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">즉시 적립</h4>
                      <p className="text-gray-600">설문 완료 후 1,000원 이상 즉시 리워드 적립</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="trust" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                믿을 수 있는 플랫폼
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              투명한 운영과 검증된 시스템으로 안전한 수익 창출을 보장합니다
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div className="text-3xl font-bold text-indigo-600 mb-4">운영자도 셀러</div>
                <p className="text-gray-600 text-lg px-2">설문 퀄리티 사전 검증으로 높은 품질 보장</p>
              </div>
            </div>
            
            <div className="group relative bg-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">⭐</span>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-4">4.8/5점</div>
                <p className="text-gray-600 text-lg px-2">사용자들의 높은 만족도와 긍정적인 피드백</p>
              </div>
            </div>
            
            <div className="group relative bg-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">💯</span>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-4">100%</div>
                <p className="text-gray-600 text-lg px-2">계획 인원 미달성 시 미진행 건 전액 환불</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-pulse animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse animation-delay-4000"></div>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-8">
            지금 시작하고
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              수익 창출하기
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-indigo-100 mb-12 max-w-3xl mx-auto">
            회원가입 무료, 10분이면 완료
            <br />
            <span className="text-white font-semibold">지금 바로 시작해보세요!</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={handleSellerCTA}
              className="group relative px-10 py-5 bg-white text-indigo-600 font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                <span className="mr-3">🎯</span>
                판매자로 시작하기
              </span>
            </button>
            
            <button
              onClick={handleConsumerCTA}
              className="group relative px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                <span className="mr-3">💰</span>
                소비자로 시작하기
              </span>
            </button>
          </div>
          
          {/* Additional Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-white/80">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">무료</div>
              <div className="text-sm">회원가입</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">10분</div>
              <div className="text-sm">시작 시간</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">즉시</div>
              <div className="text-sm">리워드 적립</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">24/7</div>
              <div className="text-sm">고객 지원</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;