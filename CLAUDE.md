# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ReviewPage is a two-way platform connecting sellers and consumers for product detail page surveys. Sellers can create surveys for their product pages, and consumers participate to earn rewards while providing feedback.

## Development Commands (Updated - Supabase + Vercel)

### Project Structure
- `backend/backend/` - Express API server (Vercel Serverless Functions)
- `frontend/` - React application (Vercel Static Site)
- `supabase/` - Database schema and migrations

### Backend (Node.js + Express + Supabase)
```bash
cd backend/backend          # Navigate to backend directory
npm install                # Install dependencies (includes @supabase/supabase-js)
npm run dev                 # Start development server with nodemon
npm run build              # Build TypeScript for production
npm start                  # Start production server
npm run db:seed            # Create test users in Supabase
```

### Frontend (React + TypeScript)
```bash
cd frontend
npm install                # Install dependencies
npm start                  # Start development server (port 3000, proxies to :3001)
npm run build             # Build for production (Vercel deployment)
npm test                  # Run tests with Jest
```

### Database Setup (Supabase)
1. Create new Supabase project
2. Run SQL schema from `supabase/schema.sql`
3. Set environment variables in both projects
4. Enable Row Level Security policies

## Architecture

### Backend Structure
- **Entry point**: `backend/backend/src/index.ts` - Express server with security middleware and static file serving
- **Routes**: Role-based routing (`/api/auth`, `/api/surveys`, `/api/admin`, `/api/frontend`)
- **Controllers**: Business logic in `src/controllers/` (auth, survey, admin, SEO, finance, rewards)
- **Middleware**: Authentication (`auth.ts`) and admin auth (`adminAuth.ts`) in `src/middleware/`
- **Database**: Prisma ORM with PostgreSQL, schema in `prisma/schema.prisma`
- **Generated Client**: Custom Prisma output location in `src/generated/prisma/`
- **Scripts**: Extensive utility scripts in `scripts/` for data management, testing, and admin tasks
- **Static Serving**: Built frontend served from `public/` directory

### Frontend Structure
- **Entry point**: `frontend/src/App.tsx` - Router with role-based routes
- **Pages**: Role-specific pages (`pages/`, `pages/admin/`)
- **Components**: Reusable UI components (`components/`)
- **Services**: API client in `services/api.ts`
- **Types**: Shared TypeScript interfaces in `types/index.ts`

### Key Models
- **User**: Three roles (SELLER, CONSUMER, ADMIN) with demographics
- **Survey**: Created by sellers with targeting criteria and templates
- **SurveyTemplate/SurveyStep/SurveyQuestion**: Flexible survey structure
- **SurveyResponse**: Consumer responses with step-based answers
- **Reward**: Automatic reward system for completed surveys

## Authentication & Security
- JWT-based authentication with role-based access control
- Security middleware: Helmet, CORS, rate limiting
- Admin authentication middleware for admin routes
- Password hashing with bcryptjs

## Database Operations (Updated - Supabase)
- Use Supabase client from `backend/backend/src/lib/supabase.ts`
- Database utility functions in `backend/backend/src/utils/database.ts`
- Supabase connection parameters required in `.env`
- Database schema: `supabase/schema.sql`
- Row Level Security (RLS) policies configured
- Development: Local Supabase or cloud instance
- Production: Supabase cloud PostgreSQL

## SEO Optimization (Added)
- **Meta Tags**: Comprehensive meta tags in `public/index.html` with Korean keywords
- **Dynamic SEO**: `useSEO` hook for page-specific meta tags
- **Sitemap**: Dynamic sitemap.xml generation via `/sitemap.xml` API endpoint
- **Robots.txt**: Dynamic robots.txt generation via `/robots.txt` API endpoint
- **Structured Data**: JSON-LD markup for organization and website information
- **Mobile Optimization**: Responsive meta tags and PWA manifest
- **Open Graph**: Social media sharing optimization

### SEO Files
- `frontend/src/hooks/useSEO.ts` - Dynamic SEO hook
- `backend/backend/src/controllers/seoController.ts` - SEO API endpoints
- `frontend/public/manifest.json` - PWA manifest with Korean content

## Testing
- Frontend: Jest and React Testing Library configured (via react-scripts)
- Backend: No test framework currently configured
- Run frontend tests: `cd frontend && npm test`

## Key Patterns
- Controllers use middleware for authentication
- Admin routes require additional admin role verification
- Frontend uses localStorage for user state management
- API responses follow consistent JSON structure
- Role-based component rendering in frontend
- SEO optimization applied to all major pages

## Deployment Architecture (Updated - Supabase + Vercel)
- **Database**: Supabase PostgreSQL with Row Level Security (RLS)
- **Backend**: Vercel Serverless Functions (Node.js + Express)
- **Frontend**: Vercel Static Site Generation (React)
- **API Routes**: All API endpoints prefixed with `/api/`
- **Health Check**: `/health` endpoint for deployment monitoring
- **Authentication**: JWT tokens (server-side) + Supabase RLS policies

## Important File Locations (Updated)
- **Backend Entry**: `backend/backend/src/index.ts` (Express app)
- **Backend API**: `backend/backend/api/index.ts` (Vercel Functions entry)
- **Frontend Entry**: `frontend/src/App.tsx`
- **Database Schema**: `supabase/schema.sql`
- **Supabase Client**: `backend/backend/src/lib/supabase.ts`
- **DB Utils**: `backend/backend/src/utils/database.ts`
- **Environment**: `backend/backend/.env`
- **Deployment Config**: `vercel.json` (both frontend and backend)
- **Scripts**: `backend/backend/scripts/` (extensive collection for admin tasks)

## Scripts Usage
Common utility scripts in `backend/backend/scripts/`:
```bash
cd backend/backend
node scripts/createTestUsers.js           # Create test accounts
node scripts/backup-and-clean-data.js     # Backup and clean database
node scripts/get-user-details.js          # Get user information
node scripts/testSurveySystem.js          # Test survey workflow
```

## Development Workflow (Updated)
1. **Database Setup**: Create Supabase project, run schema, configure RLS
2. **Backend Development**: `cd backend/backend && npm run dev`
3. **Frontend Development**: `cd frontend && npm start` (proxies to backend)
4. **Database Changes**: Update `supabase/schema.sql`, apply via Supabase dashboard
5. **Production Deployment**: 
   - Backend: Deploy to Vercel (auto from git)
   - Frontend: Deploy to Vercel (auto from git)
   - Environment variables set in Vercel dashboard

## GitHub Repository
GitHub 주소: https://github.com/graydrone-ko/reviewpage-supabase

## GitHub Configuration
- GitHub CLI 사용 가능 - gh 명령어로 GitHub 처리
- 푸시 시 작은 단위로 나누어 진행 권장
- 환경 변수나 민감한 정보는 .gitignore에 추가

## 모든 커뮤니케이션은 특정 명사를 제외하고 한글로 해

## 이 프로젝트는 배포를 목적으로함으로 코드 변경 시마다 깃허브에 커밋하고 깃포인트를 남길것