// 실제 프로덕션 백엔드에 기본 템플릿 생성하는 스크립트
const https = require('https');

const BACKEND_API = 'https://reviewpage-production.up.railway.app/api';

// 5단계 21질문 기본 템플릿 데이터
const defaultTemplateData = {
  name: "기본 상품 상세페이지 평가 템플릿",
  description: "5단계로 구성된 상품 상세페이지 평가를 위한 기본 템플릿",
  isDefault: true,
  steps: [
    {
      stepNumber: 1,
      title: "첫인상 및 관심도",
      description: "상세페이지의 첫인상과 관심 유발 정도를 평가합니다",
      questions: [
        {
          questionNumber: 1,
          text: "상세페이지의 첫인상은 어떠셨나요?",
          type: "MULTIPLE_CHOICE",
          required: true,
          options: [
            { optionNumber: 1, text: "매우 좋음" },
            { optionNumber: 2, text: "좋음" },
            { optionNumber: 3, text: "보통" },
            { optionNumber: 4, text: "나쁨" },
            { optionNumber: 5, text: "매우 나쁨" }
          ]
        },
        {
          questionNumber: 2,
          text: "이 상품에 대한 관심도는?",
          type: "SCORE",
          required: true
        },
        {
          questionNumber: 3,
          text: "페이지를 보고 가장 먼저 눈에 들어온 것은?",
          type: "TEXT",
          required: true
        }
      ]
    },
    {
      stepNumber: 2,
      title: "상품 정보 이해도",
      description: "상품 정보의 명확성과 이해 용이성을 평가합니다",
      questions: [
        {
          questionNumber: 4,
          text: "상품의 주요 특징을 명확히 이해할 수 있었나요?",
          type: "YES_NO",
          required: true
        },
        {
          questionNumber: 5,
          text: "상품 정보가 충분히 제공되었나요?",
          type: "MULTIPLE_CHOICE",
          required: true,
          options: [
            { optionNumber: 1, text: "매우 충분함" },
            { optionNumber: 2, text: "충분함" },
            { optionNumber: 3, text: "보통" },
            { optionNumber: 4, text: "부족함" },
            { optionNumber: 5, text: "매우 부족함" }
          ]
        },
        {
          questionNumber: 6,
          text: "추가로 알고 싶은 정보가 있다면?",
          type: "TEXT",
          required: false
        },
        {
          questionNumber: 7,
          text: "상품 설명의 이해도를 10점 만점으로 평가해주세요",
          type: "SCORE",
          required: true
        }
      ]
    },
    {
      stepNumber: 3,
      title: "시각적 디자인",
      description: "상세페이지의 디자인과 이미지 품질을 평가합니다",
      questions: [
        {
          questionNumber: 8,
          text: "상품 이미지의 품질은 어떠셨나요?",
          type: "MULTIPLE_CHOICE",
          required: true,
          options: [
            { optionNumber: 1, text: "매우 고품질" },
            { optionNumber: 2, text: "고품질" },
            { optionNumber: 3, text: "보통" },
            { optionNumber: 4, text: "저품질" },
            { optionNumber: 5, text: "매우 저품질" }
          ]
        },
        {
          questionNumber: 9,
          text: "페이지 전체적인 디자인이 매력적인가요?",
          type: "YES_NO",
          required: true
        },
        {
          questionNumber: 10,
          text: "색상과 폰트 선택이 적절한가요?",
          type: "MULTIPLE_CHOICE",
          required: true,
          options: [
            { optionNumber: 1, text: "매우 적절함" },
            { optionNumber: 2, text: "적절함" },
            { optionNumber: 3, text: "보통" },
            { optionNumber: 4, text: "부적절함" },
            { optionNumber: 5, text: "매우 부적절함" }
          ]
        },
        {
          questionNumber: 11,
          text: "이미지 배치와 구성이 보기 편한가요?",
          type: "YES_NO",
          required: true
        }
      ]
    },
    {
      stepNumber: 4,
      title: "사용성 및 기능",
      description: "페이지의 사용 편의성과 기능성을 평가합니다",
      questions: [
        {
          questionNumber: 12,
          text: "원하는 정보를 쉽게 찾을 수 있었나요?",
          type: "YES_NO",
          required: true
        },
        {
          questionNumber: 13,
          text: "페이지 로딩 속도는 어떠셨나요?",
          type: "MULTIPLE_CHOICE",
          required: true,
          options: [
            { optionNumber: 1, text: "매우 빠름" },
            { optionNumber: 2, text: "빠름" },
            { optionNumber: 3, text: "보통" },
            { optionNumber: 4, text: "느림" },
            { optionNumber: 5, text: "매우 느림" }
          ]
        },
        {
          questionNumber: 14,
          text: "모바일에서 보기 편한가요?",
          type: "YES_NO",
          required: true
        },
        {
          questionNumber: 15,
          text: "전반적인 사용성을 10점 만점으로 평가해주세요",
          type: "SCORE",
          required: true
        },
        {
          questionNumber: 16,
          text: "개선이 필요한 부분이 있다면?",
          type: "TEXT",
          required: false
        }
      ]
    },
    {
      stepNumber: 5,
      title: "구매 의향 및 종합 평가",
      description: "최종 구매 의향과 종합적인 평가를 합니다",
      questions: [
        {
          questionNumber: 17,
          text: "이 페이지를 본 후 구매 의향이 생기셨나요?",
          type: "YES_NO",
          required: true
        },
        {
          questionNumber: 18,
          text: "이 상품을 다른 사람에게 추천하시겠나요?",
          type: "MULTIPLE_CHOICE",
          required: true,
          options: [
            { optionNumber: 1, text: "적극 추천" },
            { optionNumber: 2, text: "추천" },
            { optionNumber: 3, text: "보통" },
            { optionNumber: 4, text: "비추천" },
            { optionNumber: 5, text: "적극 비추천" }
          ]
        },
        {
          questionNumber: 19,
          text: "전체적인 상세페이지 만족도는?",
          type: "SCORE",
          required: true
        },
        {
          questionNumber: 20,
          text: "가장 좋았던 부분은?",
          type: "TEXT",
          required: false
        },
        {
          questionNumber: 21,
          text: "추가 의견이나 제안사항이 있으시면 자유롭게 작성해주세요",
          type: "TEXT",
          required: false
        }
      ]
    }
  ]
};

// HTTP POST 요청 함수
function makeRequest(hostname, path, data, token = null) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: hostname,
      port: 443,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
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

    req.write(postData);
    req.end();
  });
}

// GET 요청 함수
function makeGetRequest(hostname, path, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: hostname,
      port: 443,
      path: path,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
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

    req.end();
  });
}

async function createTemplate() {
  console.log('🚀 기본 템플릿 생성 시작...');
  
  try {
    // 1. 먼저 로그인 시도 (테스트 계정)
    console.log('1. 테스트 계정으로 로그인 시도...');
    const loginResult = await makeRequest('reviewpage-production.up.railway.app', '/api/auth/login', {
      email: 'testseller@example.com',
      password: 'testpass123'
    });
    
    let token = null;
    if (loginResult.status === 200 && loginResult.data.token) {
      token = loginResult.data.token;
      console.log('✅ 로그인 성공');
    } else {
      console.log('⚠️ 로그인 실패, 토큰 없이 진행:', loginResult.data);
    }
    
    // 2. 현재 템플릿 상태 확인
    console.log('2. 현재 템플릿 상태 확인...');
    const templatesResult = await makeGetRequest('reviewpage-production.up.railway.app', '/api/surveys/templates', token);
    
    if (templatesResult.status === 200) {
      console.log(`현재 템플릿 개수: ${templatesResult.data.templates?.length || 0}`);
      
      if (templatesResult.data.templates && templatesResult.data.templates.length > 0) {
        console.log('✅ 템플릿이 이미 존재합니다!');
        templatesResult.data.templates.forEach(template => {
          console.log(`- ${template.name} (${template.steps?.length || 0}단계)`);
        });
        return;
      }
    } else {
      console.log('템플릿 조회 실패:', templatesResult);
    }
    
    // 3. 관리자 계정으로 템플릿 생성 시도
    console.log('3. 직접 템플릿 생성 시도...');
    const createResult = await makeRequest('reviewpage-production.up.railway.app', '/api/surveys/templates', defaultTemplateData, token);
    
    console.log('템플릿 생성 결과:', createResult);
    
    // 4. 다시 템플릿 상태 확인
    console.log('4. 템플릿 생성 후 상태 재확인...');
    const finalCheck = await makeGetRequest('reviewpage-production.up.railway.app', '/api/surveys/templates', token);
    console.log('최종 템플릿 상태:', finalCheck);
    
  } catch (error) {
    console.error('❌ 오류:', error.message);
  }
}

// 실행
createTemplate();