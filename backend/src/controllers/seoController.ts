import { Request, Response } from 'express';

export const generateSitemap = async (req: Request, res: Response) => {
  try {
    const baseUrl = req.protocol + '://' + req.get('host');
    const currentDate = new Date().toISOString().split('T')[0];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- 메인 페이지 (최우선순위) -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- 판매자 페이지 (고우선순위) -->
  <url>
    <loc>${baseUrl}/seller</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 소비자 페이지 (고우선순위) -->
  <url>
    <loc>${baseUrl}/consumer</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 서비스 소개 페이지 -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- 이용방법 페이지 -->
  <url>
    <loc>${baseUrl}/how-it-works</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- 로그인 페이지 -->
  <url>
    <loc>${baseUrl}/login</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- 회원가입 페이지 -->
  <url>
    <loc>${baseUrl}/register</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.send(sitemap);

  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const generateRobots = async (req: Request, res: Response) => {
  try {
    const baseUrl = req.protocol + '://' + req.get('host');

    const robots = `User-agent: *
Allow: /
Allow: /seller
Allow: /consumer
Allow: /about
Allow: /how-it-works
Allow: /login
Allow: /register
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard
Disallow: /profile
Disallow: /rewards
Disallow: /surveys/create
Disallow: /surveys/*/participate
Disallow: /surveys/*/edit-response

# 크롤링 속도 제한
Crawl-delay: 1

# 사이트맵 위치
Sitemap: ${baseUrl}/sitemap.xml

# 주요 검색엔진별 설정
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 2

User-agent: NaverBot
Allow: /
Crawl-delay: 1`;

    res.setHeader('Content-Type', 'text/plain');
    res.send(robots);

  } catch (error) {
    console.error('Robots.txt generation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};