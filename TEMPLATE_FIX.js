// 템플릿 생성을 위한 직접 API 호출 스크립트 (Node.js 내장 모듈만 사용)
const https = require('https');
const { URL } = require('url');

// 가능한 백엔드 URL들
const possibleUrls = [
  'https://reviewpage-production.up.railway.app',
  'https://backend-production-a55d.up.railway.app',
  'https://reviewpage-backend-production.up.railway.app',
  'https://reviewpage-platform-backend-production.up.railway.app',
  // 프론트엔드와 같은 도메인 확인
  'https://frontend-production-a55d.up.railway.app'
];

// HTTP GET 요청 함수
function makeGetRequest(fullUrl) {
  return new Promise((resolve, reject) => {
    const url = new URL(fullUrl);
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function testAndCreateTemplate() {
  for (const baseUrl of possibleUrls) {
    try {
      const testUrl = `${baseUrl}/api/surveys/templates`;
      console.log(`Testing: ${testUrl}`);
      
      // 1. 먼저 템플릿 목록 확인
      const response = await makeGetRequest(testUrl);
      
      if (response.status === 200) {
        console.log(`✅ 성공! ${baseUrl}`);
        console.log('현재 템플릿 개수:', response.data.templates?.length || 0);
        
        if (response.data.templates?.length === 0) {
          console.log('템플릿이 없습니다. 생성이 필요합니다.');
          
          try {
            // 기본 템플릿 생성을 위한 더미 설문 생성 (이것이 템플릿 자동생성을 트리거함)
            console.log('템플릿 자동 생성을 위해 API 재호출...');
            const retryResponse = await makeGetRequest(testUrl);
            console.log('재호출 후 템플릿 개수:', retryResponse.data.templates?.length || 0);
          } catch (retryError) {
            console.log('재호출 실패:', retryError.message);
          }
        }
        
        return baseUrl;
      } else {
        console.log(`❌ 실패: ${baseUrl} - Status ${response.status}`);
        console.log('Response:', response.data);
      }
      
    } catch (error) {
      console.log(`❌ 실패: ${baseUrl} - ${error.message}`);
    }
  }
  
  console.log('모든 URL에서 API 접근 실패');
  return null;
}

// 실행
testAndCreateTemplate().then(workingUrl => {
  if (workingUrl) {
    console.log('\n🎯 작동하는 백엔드 URL:', workingUrl);
    console.log('\n📋 해결방법:');
    console.log('1. 프론트엔드의 API 설정을 이 URL로 변경');
    console.log('2. 또는 이 URL/create-survey 페이지를 직접 사용');
  } else {
    console.log('\n❌ 백엔드 서버를 찾을 수 없습니다. Railway 배포를 확인하세요.');
  }
});