# ReviewPage - 상품 상세페이지 설문 플랫폼

판매자와 소비자를 연결하는 양방향 플랫폼

## 프로젝트 구조

```
reviewpage-platform/
├── frontend/          # React + TypeScript 클라이언트
├── backend/           # Node.js + Express API 서버
├── shared/            # 공유 타입 정의 및 유틸리티
└── README.md
```

## 핵심 기능

### 판매자 기능
- 회원가입/로그인
- 상품 상세페이지 URL 등록
- 설문 대상자 조건 설정 (연령대, 성별)
- 페이지 섹션별 설문 문항 생성
- 설문 결과 대시보드 (감정 분석, 통계)
- 설문 비용 결제

### 소비자 기능
- 회원가입/로그인 (연령, 성별 정보 포함)
- 참여 가능한 설문 목록 조회
- 상세페이지 리뷰 및 섹션별 감정 평가
- 리워드 적립 및 현금 출금 신청

### 관리자 기능
- 설문 승인/반려
- 사용자 관리
- 결제/정산 관리

## 기술 스택

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + Prisma
- **Database**: PostgreSQL
- **결제**: 아임포트/토스페이먼츠
- **배포**: Vercel (Frontend) + Railway/Heroku (Backend)

## MVP 개발 순서

1. 기본 회원가입/로그인
2. 판매자의 URL 등록
3. 소비자의 간단한 설문 참여
4. 기본 리워드 시스템

## 빠른 시작

### 1. 프로젝트 클론 및 설정
```bash
git clone <repository-url>
cd reviewpage-platform
```

### 2. Backend 설정 및 실행
```bash
cd backend
npm install
cp .env.example .env
# .env 파일을 편집하여 데이터베이스 설정
npm run db:generate
npm run db:push
npm run dev
```

### 3. Frontend 설정 및 실행
```bash
cd frontend
npm install
npm start
```

### 4. 접속
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 현재 구현된 기능 (MVP)

✅ **기본 회원가입/로그인**
- JWT 기반 인증
- 판매자/소비자 역할 구분
- 보안 미들웨어 적용

✅ **판매자 기능**
- 설문 생성 (URL, 대상 조건, 리워드 설정)
- 설문 목록 및 상태 관리
- 대시보드

✅ **소비자 기능**  
- 설문 목록 조회 (조건 필터링)
- 단계별 설문 참여
- 섹션별 감정 평가 및 피드백

✅ **리워드 시스템**
- 설문 완료시 자동 리워드 지급
- 리워드 내역 확인
- 출금 신청 기능

## 배포하기

### Railway 배포 (백엔드)

1. **Railway 계정 생성 및 프로젝트 연결**
   ```bash
   npm install -g @railway/cli
   railway login
   railway init
   ```

2. **환경 변수 설정**
   - `DATABASE_URL`: PostgreSQL 연결 URL
   - `JWT_SECRET`: 강력한 JWT 비밀키
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: 프론트엔드 도메인 URL

3. **데이터베이스 마이그레이션**
   ```bash
   railway run npm run db:migrate
   railway run npm run db:seed  # 테스트 사용자 생성
   ```

### Vercel 배포 (프론트엔드)

1. **Vercel에 프로젝트 연결**
   - GitHub 저장소 연결
   - 빌드 명령어: `cd frontend && npm run build`
   - 출력 디렉토리: `frontend/build`

2. **환경 변수 설정**
   - `REACT_APP_API_URL`: Railway 백엔드 URL

### 배포 후 설정

1. **관리자 계정 로그인**
   - 이메일: `graydrone@naver.com`
   - 비밀번호: `7300gray`

2. **테스트 계정들**
   - 소비자: `testconsumer@example.com` / `testpass123`
   - 판매자: `testseller@example.com` / `testpass123`

## 프로젝트 특징

### 🔐 보안
- JWT 기반 인증 시스템
- 역할 기반 접근 제어 (RBAC)
- Rate limiting 및 CORS 설정
- Helmet.js 보안 미들웨어

### 🎨 사용자 경험
- 반응형 디자인 (Tailwind CSS)
- 직관적인 관리자 대시보드
- 실시간 상태 업데이트
- 모바일 친화적 UI

### 📊 관리자 시스템
- 종합 대시보드 (사용자, 설문, 리워드 통계)
- 설문 승인/거부 시스템
- 사용자 관리 및 모니터링
- 리워드 지급 관리
- 상세한 응답 검토 시스템

### 🚀 성능 및 확장성
- TypeScript로 타입 안정성 확보
- Prisma ORM으로 데이터베이스 최적화
- 컴포넌트 기반 아키텍처
- 환경별 설정 분리

## API 엔드포인트

### 인증
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인

### 설문
- `GET /api/surveys` - 설문 목록
- `POST /api/surveys` - 설문 생성
- `GET /api/surveys/:id` - 설문 상세
- `POST /api/surveys/:id/participate` - 설문 참여

### 관리자
- `GET /api/admin/dashboard/stats` - 대시보드 통계
- `GET /api/admin/users` - 사용자 목록
- `GET /api/admin/surveys/pending` - 승인 대기 설문
- `PATCH /api/admin/surveys/:id/status` - 설문 상태 변경
- `GET /api/admin/rewards` - 리워드 목록
- `PATCH /api/admin/rewards/:id/status` - 리워드 상태 변경

## 상세 개발 가이드

더 자세한 개발 정보는 [DEVELOPMENT.md](./DEVELOPMENT.md)를 참고하세요.