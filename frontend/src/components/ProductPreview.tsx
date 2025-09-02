import React, { useState, useEffect } from 'react';

interface ProductPreviewProps {
  productUrl: string;
  className?: string;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ productUrl, className = '' }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [iframeError, setIframeError] = useState(false);


  // 네이버 관련 사이트만 제한 (다른 사이트들은 iframe 시도)
  const isNaverRestrictedSite = (url: string): boolean => {
    const naverDomains = [
      'smartstore.naver.com',
      'brand.naver.com',
      'shopping.naver.com'
    ];
    
    return naverDomains.some(domain => url.includes(domain));
  };

  // URL에서 도메인 추출
  const getDomainName = (url: string): string => {
    try {
      const domain = new URL(url).hostname;
      if (domain.includes('smartstore.naver.com')) return '네이버 스마트스토어';
      if (domain.includes('brand.naver.com')) return '네이버 브랜드스토어';
      if (domain.includes('coupang.com')) return '쿠팡';
      if (domain.includes('gmarket.co.kr')) return '지마켓';
      if (domain.includes('11st.co.kr')) return '11번가';
      return domain.replace('www.', '');
    } catch {
      return '쇼핑몰';
    }
  };

  useEffect(() => {
    // 네이버 관련 사이트만 미리 차단
    if (isNaverRestrictedSite(productUrl)) {
      setError('naver_restricted');
      setLoading(false);
      return;
    }

    // 다른 사이트들은 iframe 로드를 시도하고, 일정 시간 후 에러 처리
    const timer = setTimeout(() => {
      if (loading) {
        setIframeError(true);
        setLoading(false);
      }
    }, 8000); // 8초 후 에러 처리 (네이버가 아닌 사이트들을 위해 조금 더 기다림)

    return () => clearTimeout(timer);
  }, [productUrl, loading]);

  const handleIframeLoad = () => {
    setLoading(false);
    setError('');
  };

  const handleIframeError = () => {
    setLoading(false);
    setIframeError(true);
    setError('iframe_blocked');
  };

  // 네이버 제한 사이트 또는 iframe 로드 실패 시 대체 UI
  if (error === 'naver_restricted' || iframeError || error === 'iframe_blocked') {
    const siteName = getDomainName(productUrl);
    
    return (
      <div className={`bg-white rounded-lg shadow-sm ${className}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">상품 페이지 미리보기</h3>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {siteName}
            </div>
          </div>
          
          {/* iPhone 스타일 프레임 */}
          <div className="mx-auto" style={{ width: '375px', maxWidth: '100%' }}>
            <div className="bg-black rounded-[2.5rem] p-2 shadow-xl">
              <div className="bg-white rounded-[2rem] overflow-hidden">
                {/* 상단 노치 영역 */}
                <div className="bg-gray-50 h-8 flex items-center justify-center">
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
                
                {/* 제한 안내 영역 */}
                <div className="h-[600px] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                  <div className="text-center max-w-xs">
                    {/* 아이콘 */}
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    
                    {/* 제목 */}
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      보안 정책으로 인한 제한
                    </h4>
                    
                    {/* 설명 */}
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {error === 'naver_restricted' 
                        ? `${siteName}은(는) 보안상의 이유로 다른 사이트 내에서의 미리보기를 제한하고 있습니다.`
                        : `${siteName} 페이지를 불러올 수 없습니다. 사이트 보안 정책으로 인한 제한일 수 있습니다.`
                      }
                    </p>
                    
                    {/* 새 탭으로 보기 버튼 */}
                    <a
                      href={productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      새 탭에서 상품 보기
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 하단 안내 */}
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm text-amber-800 font-medium">
                  {error === 'naver_restricted' ? '네이버 사이트 제한' : '미리보기 제한 안내'}
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  {error === 'naver_restricted' 
                    ? '네이버 관련 사이트는 보안상 외부에서의 미리보기를 차단합니다. "새 탭에서 상품 보기" 버튼을 클릭하여 실제 페이지를 확인해주세요.'
                    : '해당 사이트에서 미리보기를 차단했습니다. "새 탭에서 상품 보기" 버튼을 클릭하여 실제 페이지를 확인해주세요.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 일반 사이트에 대해서는 기존 iframe 시도
  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">상품 페이지 미리보기</h3>
          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            모바일 뷰
          </div>
        </div>
        
        {/* iPhone 스타일 프레임 */}
        <div className="mx-auto" style={{ width: '375px', maxWidth: '100%' }}>
          <div className="bg-black rounded-[2.5rem] p-2 shadow-xl">
            <div className="bg-white rounded-[2rem] overflow-hidden">
              {/* 상단 노치 영역 */}
              <div className="bg-gray-50 h-8 flex items-center justify-center">
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
              </div>
              
              {/* iframe 영역 */}
              <div className="relative">
                <iframe
                  src={productUrl}
                  className="w-full border-0"
                  style={{ height: '600px' }}
                  title="상품 페이지 미리보기"
                  sandbox="allow-scripts allow-same-origin"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                />
                
                {/* 로딩 오버레이 */}
                {loading && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <p className="text-sm">페이지 로딩 중...</p>
                      <p className="text-xs text-gray-400 mt-1">10초 후 자동으로 대체 화면이 표시됩니다</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* 새 탭에서 보기 링크 */}
        <div className="mt-4 text-center">
          <a 
            href={productUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            새 탭에서 원본 페이지 보기
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;