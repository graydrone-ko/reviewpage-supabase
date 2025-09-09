# Railway 수동 배포 방법

Railway 자동 배포가 작동하지 않을 때 사용할 수 있는 방법들:

## 1. Railway 웹 인터페이스에서 수동 배포

1. https://railway.app 접속
2. 프로젝트 대시보드로 이동
3. "Deploy" 또는 "Redeploy" 버튼 클릭
4. 강제 재배포 옵션 선택

## 2. Railway 프로젝트 설정 확인

Railway 프로젝트 설정에서 확인할 사항:
- Repository: `https://github.com/graydrone-ko/reviewpage`
- Branch: `main`  
- Build Command: `npm ci && npm run build`
- Start Command: `npm start`

## 3. GitHub Webhook 재설정

GitHub 저장소 Settings → Webhooks에서:
- Railway webhook이 활성화되어 있는지 확인
- 필요시 webhook 삭제 후 Railway에서 다시 연결

## 4. 현재 상태

- 최신 커밋: `91d486f - Test Railway auto-deployment trigger`
- 포함된 중요 변경사항:
  - 데이터베이스 마이그레이션 (storeName 컬럼 추가)
  - 자동 마이그레이션 start 명령어 (`prisma migrate deploy && node dist/index.js`)
  - Railway.json 설정 파일

## 5. 배포 확인 방법

배포 성공 후 확인:
- 설문 템플릿 API: `https://backend-production-xxxx.up.railway.app/api/surveys/templates`
- 로그에서 `storeName` 컬럼 오류 해결 확인

## 6. 마이그레이션 수동 실행 (필요시)

Railway 콘솔에서 직접 실행:
```bash
npx prisma migrate deploy
```