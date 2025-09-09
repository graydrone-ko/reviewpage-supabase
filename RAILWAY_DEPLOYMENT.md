# 🚀 Railway 배포 가이드

ReviewPage Platform을 Railway에 배포하기 위한 단계별 가이드입니다.

## 📋 배포 전 준비사항 ✅

### ✅ 완료된 작업
- [x] 데이터 정리 완료 (테스트 데이터 삭제)
- [x] 필수 사용자 계정 보존
- [x] SEO 최적화 완료
- [x] CORS 설정 업데이트
- [x] JWT 시크릿 생성 완료

### 🗄️ 데이터 현황
- **보존된 사용자**: 3명 (graydrone@naver.com, testseller@example.com, testconsumer@example.com)
- **템플릿**: 기본 템플릿 보존됨
- **초기화됨**: 설문, 응답, 리워드, 출금요청 모두 삭제

## 🛠️ Railway 배포 단계

### 1. Railway 프로젝트 생성
```bash
# Railway CLI 설치 (없다면)
npm install -g @railway/cli

# Railway 로그인
railway login

# 새 프로젝트 생성
railway init
```

### 2. 환경변수 설정 (CRITICAL)

Railway 대시보드에서 다음 환경변수를 설정하세요:

#### 🔐 **필수 환경변수**
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=486b286dbe9654826e051d396dc27a0eef313e72103a3fb4ca0928e987f2eaf9b5e55112c19dedc0db2f02488fe706c4f100d12fbf8981c97318
JWT_EXPIRES_IN=7d
```

#### 🗄️ **데이터베이스** (Railway PostgreSQL 플러그인 추가 후 자동 생성됨)
```env
DATABASE_URL=postgresql://username:password@host:port/database?schema=public
```

#### 🌐 **도메인 설정** (배포 후 Railway에서 제공하는 URL 사용)
```env
FRONTEND_URL=https://your-project-name.railway.app
```

### 3. 데이터베이스 마이그레이션

Railway PostgreSQL 추가 후:
```bash
# Prisma 마이그레이션 실행
railway run npm run db:migrate

# 기본 템플릿 생성 (필요시)
railway run npm run db:seed
```

### 4. 빌드 스크립트 확인

현재 package.json 빌드 스크립트는 Railway와 호환됩니다:
- `build`: Prisma 클라이언트 생성 + TypeScript 컴파일
- `start`: 프로덕션 서버 시작

### 5. 배포 실행
```bash
# Railway에 배포
railway up
```

## 🔍 배포 후 검증

### ✅ 기본 기능 테스트
1. **헬스체크**: `https://your-domain.railway.app/health`
2. **로그인**: graydrone@naver.com / password123
3. **SEO 확인**: `https://your-domain.railway.app/robots.txt`
4. **Sitemap**: `https://your-domain.railway.app/sitemap.xml`

### 📊 SEO 검증
- Meta 태그 올바른 렌더링
- 한국어 키워드 최적화 확인
- Open Graph 태그 작동 확인

## ⚠️ 중요 주의사항

1. **JWT_SECRET**: 절대 코드에 커밋하지 말고 Railway 환경변수에만 설정
2. **CORS**: 프로덕션 도메인 설정 확인
3. **데이터베이스**: Railway PostgreSQL 사용 권장
4. **HTTPS**: Railway가 자동으로 SSL 인증서 제공

## 🎯 배포 완료 후 체크리스트

- [ ] 헬스체크 API 응답 확인
- [ ] 회원가입/로그인 기능 테스트
- [ ] 설문 생성/참여 기능 테스트
- [ ] 리워드 시스템 작동 확인
- [ ] SEO 메타태그 정상 작동 확인
- [ ] 모바일 반응형 확인

---

🎉 **배포 준비 완료!** 이제 Railway에 안전하게 배포할 수 있습니다.