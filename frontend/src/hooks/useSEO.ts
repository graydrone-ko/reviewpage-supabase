import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
}

export const useSEO = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  canonical
}: SEOProps) => {
  useEffect(() => {
    // 기본값 설정
    const defaultTitle = 'ReviewPage - 상세페이지 설문조사로 돈벌기 | 제품 피드백 리워드 플랫폼';
    const defaultDescription = '상세페이지 설문조사 전문 플랫폼! 소비자는 간단한 제품 피드백으로 현금 리워드, 판매자는 고객 의견으로 매출 증대. 지금 시작하세요!';

    // 타이틀 설정
    if (title) {
      document.title = title;
    }

    // 메타 태그 업데이트 함수
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // 링크 태그 업데이트 함수
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      
      link.setAttribute('href', href);
    };

    // 메타 태그들 업데이트
    if (description) {
      updateMetaTag('description', description);
    }

    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    if (ogTitle) {
      updateMetaTag('og:title', ogTitle, true);
    }

    if (ogDescription) {
      updateMetaTag('og:description', ogDescription, true);
    }

    if (canonical) {
      updateLinkTag('canonical', canonical);
    }

    // 정리 함수 (컴포넌트 언마운트 시)
    return () => {
      // 기본값으로 복원
      document.title = defaultTitle;
      updateMetaTag('description', defaultDescription);
    };
  }, [title, description, keywords, ogTitle, ogDescription, canonical]);
};

export default useSEO;