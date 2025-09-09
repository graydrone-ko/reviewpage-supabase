# ReviewPage 개발 가이드

## 프로젝트 구조

```
reviewpage-platform/
├── frontend/          # React + TypeScript 클라이언트
├── backend/           # Node.js + Express API 서버
├── shared/            # 공유 타입 정의 및 유틸리티
└── README.md
```

## 개발 환경 설정

### 필수 요구사항
- Node.js 16.x 이상
- PostgreSQL 12.x 이상
- npm 또는 yarn

### 1. 데이터베이스 설정

PostgreSQL 데이터베이스를 설치하고 데이터베이스를 생성합니다:

```sql
CREATE DATABASE reviewpage;
CREATE USER reviewpage_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE reviewpage TO reviewpage_user;
```

### 2. Backend 설정

```bash
cd backend

# 환경 변수 파일 생성
cp .env.example .env

# .env 파일을 편집하여 데이터베이스 연결 정보 설정
# DATABASE_URL="postgresql://reviewpage_user:your_password@localhost:5432/reviewpage?schema=public"
# JWT_SECRET=your-secret-key-here
# JWT_EXPIRES_IN=7d
# PORT=3001
# NODE_ENV=development

# 의존성 설치
npm install

# Prisma 클라이언트 생성
npm run db:generate

# 데이터베이스 스키마 적용
npm run db:push

# 개발 서버 실행
npm run dev
```

### 3. Frontend 설정

```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

## 주요 기능

### 1. 회원가입/로그인
- **경로**: `/login`, `/register`
- **기능**: JWT 기반 인증, 역할별 접근 제어
- **역할**: SELLER (판매자), CONSUMER (소비자), ADMIN (관리자)

### 2. 판매자 기능
- **대시보드**: `/dashboard` - 설문 목록 및 통계
- **설문 생성**: `/surveys/create` - 새 설문 생성
- **설문 관리**: 설문 상태 확인, 응답 분석

### 3. 소비자 기능
- **설문 목록**: `/surveys` - 참여 가능한 설문 조회
- **설문 참여**: `/surveys/:id/participate` - 단계별 설문 응답
- **리워드 관리**: `/rewards` - 적립금 확인 및 출금 신청

### 4. 리워드 시스템
- 설문 완료 시 자동 리워드 지급
- 최소 출금 금액: 10,000원
- 출금 신청 처리

## API 엔드포인트

### 인증 (Auth)
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인

### 설문 (Surveys)
- `GET /api/surveys` - 설문 목록 조회 (역할별 필터링)
- `POST /api/surveys` - 설문 생성 (판매자만)
- `GET /api/surveys/:id` - 설문 상세 조회

### 응답 (Responses)
- `POST /api/responses` - 설문 응답 제출 (소비자만)
- `GET /api/responses/my` - 내 응답 목록 (소비자만)

### 리워드 (Rewards)
- `GET /api/rewards/my` - 내 리워드 목록 (소비자만)
- `POST /api/rewards/withdraw` - 출금 신청 (소비자만)
- `GET /api/rewards/stats` - 리워드 통계 (관리자만)

## 데이터베이스 스키마

### User
- 사용자 정보 (이메일, 이름, 역할, 나이, 성별)

### Survey
- 설문 정보 (제목, URL, 대상 조건, 리워드 금액, 상태)

### SurveyResponse
- 설문 응답 (섹션별 감정 평가, 피드백)

### Reward
- 리워드 내역 (금액, 유형, 상태)

## 기술 스택

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- bcryptjs

### 보안
- Helmet (보안 헤더)
- CORS 설정
- Rate Limiting
- JWT 토큰 인증
- 비밀번호 해싱

## 다음 단계 개발 계획

1. **페이지 분석 기능**
   - URL에서 실제 페이지 분석
   - 섹션 자동 감지
   - 스크린샷 캡처

2. **감정 분석**
   - AI 기반 감정 분석
   - 응답 데이터 시각화
   - 통계 대시보드

3. **결제 시스템**
   - 아임포트/토스페이먼츠 연동
   - 설문 비용 결제
   - 출금 시스템 개선

4. **관리자 기능**
   - 설문 승인/반려
   - 사용자 관리
   - 시스템 모니터링

5. **알림 시스템**
   - 이메일 알림
   - 실시간 알림
   - 설문 마감 알림

## 트러블슈팅

### 일반적인 문제들

1. **데이터베이스 연결 오류**
   - `.env` 파일의 `DATABASE_URL` 확인
   - PostgreSQL 서비스 실행 상태 확인

2. **Prisma 오류**
   - `npm run db:generate` 재실행
   - `npm run db:push` 로 스키마 동기화

3. **CORS 오류**
   - Backend의 CORS 설정 확인
   - Frontend 프록시 설정 확인

4. **JWT 토큰 오류**
   - `.env`의 `JWT_SECRET` 설정 확인
   - 토큰 만료 시간 확인