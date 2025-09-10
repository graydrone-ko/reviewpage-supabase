# Supabase + Vercel 배포 가이드 (업데이트)

ReviewPage 플랫폼을 새로운 `reviewpage-supabase` 저장소로 배포하는 가이드입니다.

## 🚨 중요한 변경사항

현재 새로운 저장소는 **기본 스키마만 포함**되어 있습니다. 실제 배포를 위해서는 **백엔드와 프론트엔드 코드를 추가**해야 합니다.

## 1. 현재 저장소 상태

```
reviewpage-supabase/
├── frontend/public/     # 기존 빌드된 파일들 (React 소스 아님)
├── supabase/           # 데이터베이스 스키마
└── README.md
```

## 2. 배포 준비 작업

### Option A: 기존 코드 이전 (권장)

1. **백엔드 코드 복사**
```bash
# 원본 저장소에서
cp -r backend/backend/ ../reviewpage-supabase/backend/
```

2. **프론트엔드 소스 코드 복사**
```bash
# 원본 저장소에서
cp -r frontend/ ../reviewpage-supabase/frontend/
# public 폴더의 빌드 파일 제거
rm -rf ../reviewpage-supabase/frontend/public/pages/
rm -rf ../reviewpage-supabase/frontend/public/components/
```

### Option B: 새로 개발

완전히 새로운 프로젝트로 시작하고 기존 기능을 점진적으로 이전

## 3. Vercel 배포 설정

### 3.1 백엔드 배포 (Serverless Functions)

**Vercel 프로젝트 설정:**
- Repository: `graydrone-ko/reviewpage-supabase`
- **Root Directory**: `backend` ✅
- Framework Preset: Other
- Build Command: `npm run build`
- Output Directory: `dist`

**환경 변수:**
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
JWT_SECRET=your-jwt-secret
NODE_ENV=production
```

### 3.2 프론트엔드 배포 (Static Site)

**Vercel 프로젝트 설정:**
- Repository: `graydrone-ko/reviewpage-supabase`
- **Root Directory**: `frontend` ✅
- Framework Preset: Create React App
- Build Command: `npm run build`
- Output Directory: `build`

**환경 변수:**
```
REACT_APP_API_URL=https://your-backend.vercel.app
```

## 4. Supabase 설정

### 4.1 프로젝트 생성
1. [Supabase Dashboard](https://app.supabase.com) 로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력

### 4.2 스키마 적용
1. Supabase Dashboard → SQL Editor
2. `supabase/schema.sql` 내용 복사하여 실행

## 5. 즉시 배포 가능한 방법

현재 상태에서 **즉시 테스트 배포**하려면:

### 프론트엔드만 배포
1. Vercel → New Project
2. Repository: `reviewpage-supabase`
3. **Root Directory**: `frontend/public` 
4. Framework: Other
5. Build Command: (비워두기)
6. Output Directory: `.`

이렇게 하면 기존 빌드된 파일들이 정적 사이트로 배포됩니다.

## 6. 완전한 배포를 위한 다음 단계

### 6.1 코드 구조 정리
```bash
# 새로운 저장소에 올바른 구조 생성
reviewpage-supabase/
├── backend/
│   ├── api/
│   ├── src/
│   ├── package.json
│   └── vercel.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
├── supabase/
│   └── schema.sql
└── README.md
```

### 6.2 배포 순서
1. **Supabase 데이터베이스 설정** ✅ (스키마 적용)
2. **백엔드 Vercel 배포** (환경 변수 설정)
3. **프론트엔드 Vercel 배포** (API URL 설정)
4. **테스트 및 확인**

## 7. 문제 해결

### 현재 Vercel 설정에서 문제가 있다면:

1. **Cancel** 버튼 클릭
2. 먼저 백엔드/프론트엔드 코드를 새 저장소에 추가
3. 다시 Vercel 프로젝트 생성

### 빠른 해결책:

기존 `graydrone-ko/reviewpage` 저장소에서 `railway-deploy` 브랜치를 새로 만들어 Supabase 코드를 merge하는 것도 고려해볼 수 있습니다.

---

**현재 상황**: 새 저장소는 스키마만 있는 상태이므로, 실제 애플리케이션 코드를 추가한 후 배포하는 것을 권장합니다.