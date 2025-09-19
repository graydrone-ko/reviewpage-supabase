# Search Console 등록 가이드

ReviewPage Vercel 배포 사이트를 구글·네이버 검색 콘솔에 등록하는 방법을 처음부터 끝까지 설명합니다. 커스텀 도메인 없이 제공되는 Vercel 주소(`https://reviewpage-frontend3.vercel.app/`)를 기준으로 작성했으며, DNS 설정을 건드릴 필요가 없습니다.

## 사전 준비
- 구글 계정, 네이버 계정 각각 1개
- 준비된 사이트맵: `https://reviewpage-frontend3.vercel.app/sitemap.xml`
- 최신 `robots.txt`: `https://reviewpage-frontend3.vercel.app/robots.txt`

## 1. Google Search Console 등록
1. [Google Search Console](https://search.google.com/search-console/about)에 접속해 구글 계정으로 로그인합니다.
2. "속성 추가" 버튼을 눌러 **URL 접두어** 유형에 `https://reviewpage-frontend3.vercel.app`를 입력합니다.
3. 소유권 확인 방법에서 **HTML 파일** 또는 **HTML 태그** 중 편한 방식을 선택합니다.
   - HTML 파일 방식: Search Console이 제공하는 `googleXXXX.html` 파일을 다운로드해 `frontend/public/`에 복사한 뒤 커밋/배포합니다. (CRA 프로젝트는 `public` 폴더 파일이 그대로 정적 배포됩니다.)
   - HTML 태그 방식: 제공되는 `<meta name="google-site-verification" ...>` 태그를 `frontend/public/index.html`의 `<head>` 영역에 붙여 넣고 배포합니다.
4. Vercel에 새 커밋을 배포한 후 Search Console으로 돌아가 **확인** 버튼을 눌러 소유권을 검증합니다.
5. 왼쪽 메뉴 **설정 → 소유권 확인**에서 상태가 `확인됨`으로 표시되는지 확인합니다.
6. 왼쪽 메뉴 **색인 생성 → 사이트맵**을 열고 `https://reviewpage-frontend3.vercel.app/sitemap.xml`을 입력해 제출합니다.
7. **색인 생성 → 페이지**에서 “크롤링됨” URL이 늘어나는지 주기적으로 확인하고, 문제 URL이 있다면 `검토 요청`을 눌러 재색인을 요청합니다.

## 2. Naver Search Advisor 등록
1. [네이버 서치어드바이저](https://searchadvisor.naver.com/)에 접속해 네이버 아이디로 로그인합니다.
2. 대시보드에서 **웹마스터 도구 등록**을 클릭하고 사이트 주소에 `https://reviewpage-frontend3.vercel.app`를 입력한 뒤 **확인**을 누릅니다.
3. 인증 방법에서 **HTML 태그**를 선택하고 `<meta name="naver-site-verification" ...>` 값을 복사합니다.
4. `frontend/public/index.html`의 `<head>` 영역(예: 다른 메타 태그 아래)에 복사한 메타 태그를 붙여 넣고 커밋/배포합니다. (추후 토큰이 바뀌면 같은 위치에서 교체하면 됩니다.)
   - HTML 파일 방식을 선택한 경우, 제공된 파일을 `frontend/public/`에 추가한 뒤 배포하면 됩니다.
5. 배포가 완료되면 서치어드바이저 화면으로 돌아가 **확인**을 눌러 소유권을 검증합니다.
6. 등록이 완료되면 왼쪽 메뉴 **요청 → 사이트맵 제출**에서 `https://reviewpage-frontend3.vercel.app/sitemap.xml`을 입력하고 **확인**합니다.
7. **모바일 친화성**, **웹사이트 분석** 리포트에서 오류가 표시되면 상세 설명을 따라 수정 후 재검사 버튼을 눌러 상태를 `양호`로 만들어요.

## 3. 추가 체크리스트
- `robots.txt` 파일에 `Sitemap: https://reviewpage-frontend3.vercel.app/sitemap.xml`이 선언되어 있어야 합니다. (현재 선언되어 있음)
- Search Console에서 `색인 가능` 상태가 아닌 URL은 사유(예: `robots.txt에 의해 차단`)를 확인하고 필요하다면 `robots.txt`의 허용/차단 규칙을 조정합니다.
- 구조화 데이터가 정상 반영됐는지 Google Rich Results Test, Naver Search Advisor의 구조화 마크업 검사 도구로 점검하세요.
- 새로운 페이지를 공개할 때마다 `sitemap.xml` 업데이트 후 Search Console/서치어드바이저에서 "색인 생성 요청"을 실행하면 반영 속도를 높일 수 있습니다.
