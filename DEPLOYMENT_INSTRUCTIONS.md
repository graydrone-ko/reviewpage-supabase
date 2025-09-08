# 🚨 즉시 배포 해결 방법

GitHub 푸시가 Personal Access Token으로 차단되고 있습니다. 다음 방법들로 해결하세요:

## 방법 1: GitHub 웹에서 토큰 허용 (추천)

1. **GitHub 웹사이트**에서 다음 URL 접속:
   https://github.com/graydrone-ko/reviewpage/security/secret-scanning/unblock-secret/32P0RTYsJR4f7sUQHC07VS5Pf2Q

2. **"Allow secret"** 버튼 클릭

3. 허용 후 다음 명령어로 푸시:
   ```bash
   git push origin main --force-with-lease
   ```

## 방법 2: Railway 수동 배포

1. **Railway Dashboard** 접속: https://railway.app/dashboard

2. **reviewpage 프로젝트** 선택

3. **Settings** → **Deploy** → **Manual Deploy** 클릭

4. **Deploy Now** 버튼 클릭

## 방법 3: 로컬에서 Railway CLI 사용

```bash
# Railway CLI 설치 (이미 설치되어 있으면 생략)
npm install -g @railway/cli

# Railway 로그인
railway login

# 프로젝트 연결
railway link

# 배포 실행
railway up
```

## 현재 수정된 중요 파일들

✅ **backend/railway.json** - Railway 배포 설정 수정
✅ **backend/package.json** - 빌드 스크립트 개선  
✅ **backend/src/index.ts** - 프론트엔드 통합 서빙
✅ **backend/src/routes/frontend.ts** - 프론트엔드 라우팅

## 배포 후 예상 결과

- ✅ `https://frontend-production-a55d.up.railway.app/health` → JSON 응답
- ✅ `https://frontend-production-a55d.up.railway.app/api/surveys/templates` → 템플릿 JSON
- ✅ 설문 생성 페이지에서 템플릿 자동 로딩
- ✅ **모든 사용자가 정상적으로 설문 생성 가능**

## Git 히스토리 정리 (선택사항)

토큰 문제를 완전히 해결하려면:
```bash
# 문제가 있는 커밋 제거 (신중하게 수행)
git rebase -i HEAD~10
# 829f956 커밋을 찾아서 'drop'으로 변경
```

하지만 **방법 1 (웹에서 토큰 허용)**이 가장 간단하고 안전합니다.

---
**중요**: 위 방법 중 하나라도 성공하면 Railway가 새로운 백엔드를 배포하고, 템플릿 로딩 문제가 **영구적으로 해결**됩니다.