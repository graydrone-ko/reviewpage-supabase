"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("./routes/auth"));
const surveys_1 = __importDefault(require("./routes/surveys"));
const responses_1 = __importDefault(require("./routes/responses"));
const rewards_1 = __importDefault(require("./routes/rewards"));
const admin_1 = __importDefault(require("./routes/admin"));
const seo_1 = __importDefault(require("./routes/seo"));
const frontend_1 = __importDefault(require("./routes/frontend"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Security middleware
app.use((0, helmet_1.default)());
// CORS configuration for development and production
const allowedOrigins = [
    'http://localhost:3000', // Local development
    'http://localhost:3001', // Local development backend
    process.env.FRONTEND_URL, // Production frontend URL
    'https://reviewpage.co.kr', // Production domain
    'https://www.reviewpage.co.kr', // Production domain with www
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production'
        ? (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin)
                return callback(null, true);
            // Check if the origin is allowed
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            else {
                return callback(new Error('Not allowed by CORS'));
            }
        }
        : allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// Body parsing middleware
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.get('/health', async (req, res) => {
    try {
        // 기본 헬스 체크
        const healthInfo = {
            status: 'OK',
            message: 'ReviewPage Express Backend API is running',
            timestamp: new Date().toISOString(),
            version: '2.0.0',
            environment: {
                NODE_ENV: process.env.NODE_ENV,
                PORT: process.env.PORT,
                DATABASE_URL: process.env.DATABASE_URL ? '✅ 설정됨' : '❌ 없음',
                JWT_SECRET: process.env.JWT_SECRET ? '✅ 설정됨' : '❌ 없음'
            }
        };
        // DB 연결 및 템플릿 개수 확인 (선택적)
        try {
            const { prisma } = await Promise.resolve().then(() => __importStar(require('./utils/database')));
            const templateCount = await prisma.surveyTemplate.count();
            healthInfo.database = {
                status: '✅ 연결됨',
                templateCount: templateCount
            };
        }
        catch (dbError) {
            healthInfo.database = {
                status: '❌ 연결 실패',
                error: dbError instanceof Error ? dbError.message : String(dbError)
            };
        }
        res.json(healthInfo);
    }
    catch (error) {
        res.status(500).json({
            status: 'ERROR',
            message: 'Health check failed',
            error: error instanceof Error ? error.message : String(error)
        });
    }
});
app.use('/api/auth', auth_1.default);
app.use('/api/surveys', surveys_1.default);
app.use('/api/responses', responses_1.default);
app.use('/api/rewards', rewards_1.default);
app.use('/api/admin', admin_1.default);
// SEO 라우트 (API prefix 없이)
app.use('/', seo_1.default);
// 정적 파일 서빙 (React 빌드 파일)
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// 프론트엔드 페이지 라우트 (개발용 폴백)
app.use('/', frontend_1.default);
// React Router 지원 - 모든 비-API 요청을 index.html로 리다이렉트
app.get('*', (req, res) => {
    // API 요청이 아닌 경우에만 React 앱 제공
    if (!req.path.startsWith('/api/') && !req.path.startsWith('/health')) {
        const indexPath = path_1.default.join(__dirname, '../public', 'index.html');
        res.sendFile(indexPath, (err) => {
            if (err) {
                console.log('React app index.html not found, using fallback');
                res.status(404).json({ error: 'Page not found' });
            }
        });
    }
    else {
        res.status(404).json({ error: 'API endpoint not found' });
    }
});
// Error handling middleware
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📖 Environment: ${process.env.NODE_ENV || 'development'}`);
});
//# sourceMappingURL=index.js.map