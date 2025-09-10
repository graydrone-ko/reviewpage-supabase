# Supabase + Vercel 배포 가이드

ReviewPage 플랫폼을 Supabase (데이터베이스) + Vercel (프론트엔드/백엔드) 환경으로 배포하는 가이드입니다.

## 1. 사전 준비

### 필요한 계정
- [Supabase](https://supabase.com) 계정
- [Vercel](https://vercel.com) 계정
- [GitHub](https://github.com) 계정 (코드 저장소)

## 2. Supabase 데이터베이스 설정

### 2.1 Supabase 프로젝트 생성
1. [Supabase Dashboard](https://app.supabase.com)에 로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - Name: `reviewpage-db`
   - Database Password: 강력한 패스워드 생성
   - Region: Asia Pacific (Seoul) 선택
4. 프로젝트 생성 대기 (2-3분)

### 2.2 데이터베이스 스키마 적용
1. Supabase Dashboard → SQL Editor
2. `supabase/schema.sql` 파일 내용을 복사하여 붙여넣기
3. 스키마 실행 (Run 버튼 클릭)
4. 성공 메시지 확인

### 2.3 API 키 및 URL 확인
Settings → API에서 다음 값들을 복사:
- `Project URL`
- `anon public` key
- `service_role` key (secret)

## 3. 백엔드 배포 (Vercel)

### 3.1 Vercel에 프로젝트 연결
1. [Vercel Dashboard](https://vercel.com/dashboard)에 로그인
2. "New Project" 클릭
3. GitHub 저장소 선택
4. Root Directory: `backend/backend`로 설정
5. Framework Preset: "Other" 선택

### 3.2 환경 변수 설정
Vercel Project Settings → Environment Variables에서 추가:

```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-strong-jwt-secret-key
NODE_ENV=production
```

### 3.3 배포 실행
1. "Deploy" 버튼 클릭
2. 배포 완료 후 URL 확인 (예: `https://reviewpage-backend.vercel.app`)

## 4. 프론트엔드 배포 (Vercel)

### 4.1 새 Vercel 프로젝트 생성
1. Vercel Dashboard에서 "New Project" 클릭
2. 같은 GitHub 저장소 선택
3. Root Directory: `frontend`로 설정
4. Framework Preset: "Create React App" 선택

### 4.2 환경 변수 설정
```
REACT_APP_API_URL=https://reviewpage-backend.vercel.app
```

### 4.3 배포 실행
1. "Deploy" 버튼 클릭
2. 배포 완료 후 URL 확인 (예: `https://reviewpage-frontend.vercel.app`)

## 5. 초기 데이터 설정

### 5.1 테스트 사용자 생성
백엔드 서버에서 다음 스크립트 실행:
```bash
# 로컬에서 실행 (환경 변수 설정 후)
cd backend/backend
npm run db:seed
```

### 5.2 기본 설문 템플릿 생성
Supabase Dashboard → Table Editor에서 `survey_templates` 테이블에 기본 템플릿 추가하거나 관리자 계정으로 로그인하여 생성.

## 6. 도메인 연결 (선택사항)

### 6.1 Vercel 도메인 설정
1. 각 Vercel 프로젝트 → Settings → Domains
2. 커스텀 도메인 추가:
   - 프론트엔드: `www.reviewpage.co.kr`
   - 백엔드: `api.reviewpage.co.kr`

### 6.2 DNS 설정
도메인 제공업체에서 CNAME 레코드 추가:
```
www.reviewpage.co.kr → reviewpage-frontend.vercel.app
api.reviewpage.co.kr → reviewpage-backend.vercel.app
```

## 7. 환경별 설정

### 개발 환경
```bash
# backend/backend/.env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=development-secret
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 프로덕션 환경
Vercel 환경 변수로 설정 (위의 3.2, 4.2 참조)

## 8. 모니터링 및 로그

### 8.1 Vercel 로그
- Vercel Dashboard → Functions → View Function Logs
- 실시간 로그 모니터링 가능

### 8.2 Supabase 모니터링
- Supabase Dashboard → Logs
- 데이터베이스 성능 모니터링

### 8.3 Health Check
배포 후 다음 엔드포인트에서 상태 확인:
- Backend: `https://your-backend.vercel.app/health`
- Frontend: `https://your-frontend.vercel.app`

## 9. 트러블슈팅

### 자주 발생하는 문제들

1. **Supabase 연결 오류**
   - API 키와 URL이 정확한지 확인
   - Row Level Security 정책이 올바르게 설정되어 있는지 확인

2. **CORS 오류**
   - 백엔드의 CORS 설정에 프론트엔드 URL이 포함되어 있는지 확인
   - Vercel 도메인이 allowedOrigins에 추가되어 있는지 확인

3. **환경 변수 관련 오류**
   - Vercel 환경 변수가 올바르게 설정되어 있는지 확인
   - 배포 후 환경 변수 변경 시 재배포 필요

4. **Function Timeout**
   - Vercel 함수 실행 시간 제한 (Hobby: 10초, Pro: 60초)
   - 복잡한 쿼리의 경우 최적화 필요

## 10. 배포 완료 확인

배포가 성공적으로 완료되었다면:

1. ✅ 프론트엔드 접속 가능
2. ✅ 회원가입/로그인 기능 동작
3. ✅ 설문 생성/참여 기능 동작
4. ✅ 관리자 대시보드 접근 가능
5. ✅ Health check 엔드포인트 정상 응답

---

## 지원 및 문의

배포 과정에서 문제가 발생하면 다음을 참고:
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- GitHub Issues 또는 개발팀 연락