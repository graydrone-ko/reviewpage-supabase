import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import surveyRoutes from './routes/surveys';
import responseRoutes from './routes/responses';
import rewardRoutes from './routes/rewards';
import adminRoutes from './routes/admin';
import seoRoutes from './routes/seo';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration for Vercel deployment
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'http://localhost:3001', // Local development backend
  process.env.FRONTEND_URL || 'https://reviewpage-frontend.vercel.app', // Vercel frontend URL
  'https://reviewpage.co.kr', // Production domain
  'https://www.reviewpage.co.kr', // Production domain with www
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
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
app.get('/health', async (req, res) => {
  try {
    const healthInfo: any = {
      status: 'OK', 
      message: 'ReviewPage Supabase Backend API is running',
      timestamp: new Date().toISOString(),
      version: '3.0.0',
      deployment: 'Vercel + Supabase',
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        SUPABASE_URL: process.env.SUPABASE_URL ? '✅ 설정됨' : '❌ 없음',
        JWT_SECRET: process.env.JWT_SECRET ? '✅ 설정됨' : '❌ 없음'
      }
    };

    // Supabase 연결 확인
    try {
      const { dbUtils } = await import('./utils/database');
      const stats = await dbUtils.getStats();
      healthInfo.database = {
        status: '✅ Supabase 연결됨',
        stats: stats
      };
    } catch (dbError) {
      healthInfo.database = {
        status: '❌ Supabase 연결 실패',
        error: dbError instanceof Error ? dbError.message : String(dbError)
      };
    }

    res.json(healthInfo);
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Health check failed',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/admin', adminRoutes);

// SEO Routes (for sitemap, robots.txt)
app.use('/', seoRoutes);

// 404 handler for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Error handling middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// For Vercel deployment, export the app
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📖 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Backend: http://localhost:${PORT}`);
    console.log(`🎯 Health Check: http://localhost:${PORT}/health`);
  });
}