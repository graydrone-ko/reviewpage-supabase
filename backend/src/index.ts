import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth';
import surveyRoutes from './routes/surveys';
import responseRoutes from './routes/responses';
import rewardRoutes from './routes/rewards';
import adminRoutes from './routes/admin';
import seoRoutes from './routes/seo';
import frontendRoutes from './routes/frontend';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration for development and production
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'http://localhost:3001', // Local development backend
  process.env.FRONTEND_URL, // Production frontend URL
  'https://reviewpage.co.kr', // Production domain
  'https://www.reviewpage.co.kr', // Production domain with www
].filter(Boolean);

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Check if the origin is allowed
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        } else {
          return callback(new Error('Not allowed by CORS'));
        }
      }
    : allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'ReviewPage Express Backend API is running',
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/admin', adminRoutes);

// SEO 라우트 (API prefix 없이)
app.use('/', seoRoutes);

// 정적 파일 서빙 (React 빌드 파일)
app.use(express.static(path.join(__dirname, '../public')));

// 프론트엔드 페이지 라우트 (개발용 폴백)
app.use('/', frontendRoutes);

// React Router 지원 - 모든 비-API 요청을 index.html로 리다이렉트
app.get('*', (req, res) => {
  // API 요청이 아닌 경우에만 React 앱 제공
  if (!req.path.startsWith('/api/') && !req.path.startsWith('/health')) {
    const indexPath = path.join(__dirname, '../public', 'index.html');
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.log('React app index.html not found, using fallback');
        res.status(404).json({ error: 'Page not found' });
      }
    });
  } else {
    res.status(404).json({ error: 'API endpoint not found' });
  }
});

// Error handling middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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