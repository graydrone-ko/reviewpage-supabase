"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seoController_1 = require("../controllers/seoController");
const router = (0, express_1.Router)();
// SEO 관련 라우트
router.get('/sitemap.xml', seoController_1.generateSitemap);
router.get('/robots.txt', seoController_1.generateRobots);
exports.default = router;
//# sourceMappingURL=seo.js.map