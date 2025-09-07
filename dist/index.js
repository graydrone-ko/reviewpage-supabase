"use strict";
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
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'ReviewPage API is running' });
});
app.use('/api/auth', auth_1.default);
app.use('/api/surveys', surveys_1.default);
app.use('/api/responses', responses_1.default);
app.use('/api/rewards', rewards_1.default);
app.use('/api/admin', admin_1.default);
// SEO 라우트 (API prefix 없이)
app.use('/', seo_1.default);
// 정적 파일 서빙 
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// 프론트엔드 페이지 라우트
app.use('/', frontend_1.default);
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