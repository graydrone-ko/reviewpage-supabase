# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ReviewPage is a two-way platform connecting sellers and consumers for product detail page surveys. Sellers can create surveys for their product pages, and consumers participate to earn rewards while providing feedback.

## Development Commands

### Monorepo Structure
- **Root**: Unified build and deployment configuration
- **Backend**: `backend/backend/` - Express API server (Vercel Serverless Functions)  
- **Frontend**: `frontend/` - React application (Vercel Static Site)
- **Database Schema**: `supabase/schema.sql` - Supabase PostgreSQL schema

### Quick Start Commands (Run from project root)
```bash
# Install all dependencies (monorepo setup)
npm install

# Build entire project (frontend + backend)
npm run build

# Development mode (backend only)
npm run dev

# Production mode (backend only)
npm start
```

### Backend Development (Node.js + Express + Supabase)
```bash
cd backend/backend
npm install                # Install backend dependencies
npm run dev                # Start development server with nodemon (port 3001)
npm run build:real         # Build TypeScript for production
npm start                  # Start production server
npm run db:seed            # Create test users in Supabase
```

### Frontend Development (React + TypeScript)
```bash
cd frontend
npm install --legacy-peer-deps  # Install with peer dependency resolution
npm start                      # Start development server (port 3000)
npm run build                 # Build for production (CI='' for Vercel)
npm test                     # Run Jest tests
```

### Database Setup (Supabase)
1. Create new Supabase project  
2. Run SQL schema: Copy contents of `supabase/schema.sql` to Supabase SQL editor
3. Set environment variables (see Environment Variables section)
4. Row Level Security (RLS) policies are pre-configured in schema

## Architecture

### Backend Structure
- **Express Server**: `backend/backend/src/index.ts` - Development server with security middleware
- **Vercel Functions**: `backend/backend/api/index.ts` - Serverless function entry point for production
- **Routes**: Role-based API routing (`/api/auth`, `/api/surveys`, `/api/admin`, `/api/rewards`, `/api/seo`)
- **Controllers**: Business logic in `src/controllers/` (9 controllers: auth, survey, admin, finance, rewards, etc.)
- **Middleware**: JWT authentication (`auth.ts`) and admin authorization (`adminAuth.ts`)
- **Database**: Supabase PostgreSQL with service role and anon key clients
- **Database Utils**: Abstraction layer in `src/utils/database.ts` for Supabase operations
- **Supabase Client**: Configuration in `src/lib/supabase.ts` with TypeScript types
- **Scripts**: Extensive utility scripts (25+ files) for data management, testing, and admin tasks

### Frontend Structure  
- **App Router**: `frontend/src/App.tsx` - Role-based routing with React Router v7
- **Pages**: Role-specific pages (`pages/` for users, `pages/admin/` for administration)
- **Components**: Reusable UI components with Tailwind CSS styling
- **API Service**: Centralized API client in `services/api.ts` with axios
- **Hooks**: Custom hooks like `useSEO.ts` for dynamic meta tag management
- **Types**: Shared TypeScript interfaces in `types/index.ts`

### Database Schema (Supabase)
- **User Management**: Three roles (SELLER, CONSUMER, ADMIN) with demographics and banking info
- **Survey System**: Complex template-based surveys with steps, questions, and targeting
- **Response Collection**: Consumer responses with JSON storage for flexible data
- **Reward System**: Automatic reward distribution with withdrawal request management  
- **Admin Features**: Survey approval, cancellation requests, and financial management
- **RLS Policies**: Row Level Security configured for multi-tenant access control

## Authentication & Security
- JWT-based authentication with role-based access control
- Security middleware: Helmet, CORS, rate limiting
- Admin authentication middleware for admin routes
- Password hashing with bcryptjs

## Environment Variables

### Backend (.env in backend/backend/)
```bash
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Configuration  
JWT_SECRET=your_strong_jwt_secret

# Frontend URL for CORS
FRONTEND_URL=https://your-frontend-domain.vercel.app

# Environment
NODE_ENV=development|production
```

### Vercel Deployment Environment Variables
Set these in Vercel dashboard for both frontend and backend:
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`, `FRONTEND_URL`, `NODE_ENV=production`

## Database Operations (Supabase)
- **Admin Client**: `supabaseAdmin` from `src/lib/supabase.ts` - Bypasses RLS for server operations
- **Regular Client**: `supabase` for user-scoped operations (respects RLS)
- **Database Utils**: Helper functions in `src/utils/database.ts` (findUserByEmail, etc.)
- **TypeScript Types**: Complete database types defined in supabase.ts
- **Schema Management**: Direct SQL execution via Supabase dashboard

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

## Utility Scripts

### Important Scripts (backend/backend/scripts/)
```bash
cd backend/backend

# User Management  
node scripts/createTestUsers.js          # Create test consumer/seller accounts
node scripts/get-user-details.js         # Get user information by email
node scripts/create-admin.js             # Create admin user

# Data Management
node scripts/backup-and-clean-data.js    # Backup and clean database 
node scripts/check-templates.js          # Verify survey templates
node scripts/check-completed-responses.js # Check response completion status

# Testing & Workflow
node scripts/testSurveySystem.js         # Test complete survey workflow
node scripts/testWorkflow.js             # Test full user workflow
node scripts/test-withdrawal-request.js  # Test withdrawal system

# Financial Operations  
node scripts/debug-net-profit.js         # Debug financial calculations
node scripts/fix-refund-amount.js        # Fix refund calculation issues
node scripts/test-refund-calculation.js  # Test refund logic

# Template Management
node scripts/createDefaultTemplate.js    # Create default survey template
node scripts/deleteAndRecreateTemplate.js # Reset survey templates
node scripts/cleanupOldTemplates.js      # Clean unused templates
```

### Script Usage Patterns
- Always run from `backend/backend/` directory
- Scripts use Supabase client directly via database utils
- Test scripts create temporary data for validation
- Financial scripts include safety checks and confirmations

## Development Workflow  

### Initial Setup
1. **Clone Repository**: `git clone https://github.com/graydrone-ko/reviewpage`
2. **Install Dependencies**: `npm install` (monorepo setup)
3. **Database Setup**: Create Supabase project, copy schema from `supabase/schema.sql`
4. **Environment Variables**: Set up `.env` files (see Environment Variables section)

### Development Process  
1. **Backend Development**: `cd backend/backend && npm run dev` (port 3001)
2. **Frontend Development**: `cd frontend && npm start` (port 3000, proxies API to 3001)
3. **Database Changes**: Update `supabase/schema.sql`, apply via Supabase SQL editor
4. **Testing**: Use utility scripts for workflow validation

### Deployment (Vercel)
- **Auto Deployment**: Both frontend and backend deploy automatically from git pushes
- **Build Process**: Root `npm run build` handles both frontend and backend
- **Environment Variables**: Set in Vercel dashboard for production
- **Monitoring**: `/health` endpoint available for backend status

## Key Development Notes

### Current Branch Status
- Working branch: `supabase-complete` (migrated from Prisma to Supabase)
- Main deployment: Vercel handles serverless functions and static hosting
- Database: Fully migrated to Supabase with RLS policies

### Testing Strategy  
- **Frontend**: Jest + React Testing Library (`npm test` in frontend/)
- **Backend**: Manual testing via utility scripts (no test framework configured)
- **Integration**: Full workflow testing via scripts in `scripts/` directory
- **User Testing**: Pre-configured test accounts via `createTestUsers.js`

### Performance Considerations
- **Frontend**: React 19 with Tailwind CSS, optimized builds for Vercel
- **Backend**: Express with security middleware, optimized for serverless
- **Database**: Supabase PostgreSQL with RLS, indexed for query performance  
- **API**: RESTful endpoints with role-based access control

## GitHub Repository
- **URL**: https://github.com/graydrone-ko/reviewpage
- **CLI Access**: `gh` commands available for GitHub operations
- **Deployment**: Auto-deploy from git pushes to main branch
- **Security**: Environment variables managed via Vercel dashboard (never committed)