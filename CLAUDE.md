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

## Testing
No test framework is currently configured. Tests would need to be set up.

## Key Patterns
- Controllers use middleware for authentication
- Admin routes require additional admin role verification
- Frontend uses localStorage for user state management
- API responses follow consistent JSON structure
- Role-based component rendering in frontend

## github 푸쉬를 위해 다음 정보 사용:
GIT HUB의 Personal Access Token:
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

Github 주소 : https://github.com/graydrone-cloud/reviewpage

## 원격 저장소에 푸시할 때 먼저 HTTP 버퍼 크기를 늘리고 조금 씩 나누어 푸시할 것. 에러 시 작은 변경사항만 포함하는 새커밋을 만들어 푸시할 것

## .git 이 존재하지 않으면 Git 저장소 초기화 할 것 (git init) 파일 생성 또는 수정 시, 파일 생성 또는 수정한 후, git add와 commit 수행할 것 파일 삭제 시 git rm 및 commit 사용할 것