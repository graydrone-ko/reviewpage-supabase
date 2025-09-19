import { useEffect } from 'react';

type JsonLd = Record<string, unknown>;

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  jsonLd?: JsonLd[];
  twitterImage?: string;
}

const JSON_LD_ATTR = 'data-dynamic-jsonld';
const defaultCanonical = process.env.REACT_APP_SITE_URL || 'https://reviewpage-frontend3.vercel.app';

export const useSEO = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  canonical,
  jsonLd,
  twitterImage
}: SEOProps) => {
  const defaultKeywords = '상세페이지설문,설문조사돈벌기,설문리워드사이트,제품피드백설문,온라인부업설문,앱테크,설문조사현금지급,상품상세페이지개선,이커머스설문플랫폼';
  const defaultOgImage = `${defaultCanonical}/og-image.jpg`;
  const serializedJsonLd = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    // 기본값 설정
    const defaultTitle = 'ReviewPage - 상세페이지 설문조사로 돈벌기 | 제품 피드백 리워드 플랫폼';
    const defaultDescription = '상세페이지 설문조사 전문 플랫폼! 소비자는 간단한 제품 피드백으로 현금 리워드, 판매자는 고객 의견으로 매출 증대. 지금 시작하세요!';

    // 타이틀 설정
    const metaTitle = title || defaultTitle;
    document.title = metaTitle;

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

    // 기존 JSON-LD 스크립트 제거
    const existingDynamicScripts = Array.from(document.querySelectorAll(`script[${JSON_LD_ATTR}="true"]`));
    existingDynamicScripts.forEach((script) => script.parentNode?.removeChild(script));

    const metaDescription = description || defaultDescription;
    updateMetaTag('description', metaDescription);

    const metaKeywords = keywords || defaultKeywords;
    updateMetaTag('keywords', metaKeywords);

    const metaOgTitle = ogTitle || metaTitle;
    updateMetaTag('og:title', metaOgTitle, true);
    updateMetaTag('twitter:title', metaOgTitle);

    const metaOgDescription = ogDescription || metaDescription;
    updateMetaTag('og:description', metaOgDescription, true);
    updateMetaTag('twitter:description', metaOgDescription);

    const ogImageContent = ogImage || defaultOgImage;
    updateMetaTag('og:image', ogImageContent, true);
    updateMetaTag('twitter:image', twitterImage || ogImageContent);

    const canonicalHref = canonical || defaultCanonical;
    updateLinkTag('canonical', canonicalHref);
    updateMetaTag('og:url', canonicalHref, true);

    const createdScripts: HTMLScriptElement[] = [];
    if (jsonLd && jsonLd.length > 0) {
      jsonLd.forEach((ld) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute(JSON_LD_ATTR, 'true');
        script.text = JSON.stringify(ld);
        document.head.appendChild(script);
        createdScripts.push(script);
      });
    }

    // 정리 함수 (컴포넌트 언마운트 시)
    return () => {
      createdScripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });

      // 기본값으로 복원
      document.title = defaultTitle;
      updateMetaTag('description', defaultDescription);
      updateMetaTag('keywords', defaultKeywords);
      updateMetaTag('og:title', defaultTitle, true);
      updateMetaTag('twitter:title', defaultTitle);
      updateMetaTag('og:description', defaultDescription, true);
      updateMetaTag('twitter:description', defaultDescription);
      updateMetaTag('og:image', defaultOgImage, true);
      updateMetaTag('twitter:image', defaultOgImage);
      updateMetaTag('og:url', defaultCanonical, true);
      updateLinkTag('canonical', defaultCanonical);
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonical, serializedJsonLd, twitterImage, defaultKeywords, defaultOgImage]);
};

export default useSEO;
