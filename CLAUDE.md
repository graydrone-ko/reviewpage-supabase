# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ReviewPage is a two-way platform connecting sellers and consumers for product detail page surveys. Sellers can create surveys for their product pages, and consumers participate to earn rewards while providing feedback.

## Development Commands

### Backend (Node.js + Express + Prisma)
```bash
cd backend
npm run dev                 # Start development server with nodemon
npm run build              # Build TypeScript and generate Prisma client
npm start                  # Start production server
npm run db:generate        # Generate Prisma client
npm run db:push           # Push schema changes to database
npm run db:migrate        # Deploy migrations (production)
npm run db:studio         # Open Prisma Studio
npm run db:seed           # Create test users
```

### Frontend (React + TypeScript)
```bash
cd frontend
npm start                  # Start development server (port 3000)
npm run build             # Build for production
npm test                  # Run tests
```

## Architecture

### Backend Structure
- **Entry point**: `backend/src/index.ts` - Express server with security middleware
- **Routes**: Role-based routing (`/api/auth`, `/api/surveys`, `/api/admin`)
- **Controllers**: Business logic in `src/controllers/`
- **Middleware**: Authentication and admin auth in `src/middleware/`
- **Database**: Prisma ORM with PostgreSQL, schema in `prisma/schema.prisma`
- **Scripts**: Utility scripts in `scripts/` for data management

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

## Database Operations
- Use Prisma Client from `backend/src/generated/prisma`
- Custom Prisma output location configured in schema
- Database URL and JWT secrets required in `.env`

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
- `backend/src/controllers/seoController.ts` - SEO API endpoints
- `frontend/public/manifest.json` - PWA manifest with Korean content

## Testing
No test framework is currently configured. Tests would need to be set up.

## Key Patterns
- Controllers use middleware for authentication
- Admin routes require additional admin role verification
- Frontend uses localStorage for user state management
- API responses follow consistent JSON structure
- Role-based component rendering in frontend
- SEO optimization applied to all major pages

## GitHub Repository
GitHub 주소: https://github.com/graydrone-ko/reviewpage

## GitHub Push Configuration
Personal Access Token은 보안상 별도 관리

## 원격 저장소에 푸시할 때 먼저 HTTP 버퍼 크기를 늘리고 조금 씩 나누어 푸시할 것. 에러 시 작은 변경사항만 포함하는 새커밋을 만들어 푸시할 것

## GitHub CLI 사용 가능 - gh 명령어로 GitHub 처리