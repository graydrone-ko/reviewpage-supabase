import { Router } from 'express';
import { generateSitemap, generateRobots } from '../controllers/seoController';

const router = Router();

// SEO 관련 라우트
router.get('/sitemap.xml', generateSitemap);
router.get('/robots.txt', generateRobots);

export default router;