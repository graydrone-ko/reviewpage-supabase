import express from 'express';
import path from 'path';

const router = express.Router();

// 메인 페이지들을 위한 라우트
const pages = [
  '/',
  '/login',
  '/register', 
  '/dashboard',
  '/surveys',
  '/create-survey',
  '/rewards',
  '/admin',
  '/admin/dashboard',
  '/admin/users',
  '/admin/surveys',
  '/admin/rewards',
  '/admin/responses',
  '/admin/finance',
  '/admin/cancellation-requests',
  '/admin/withdrawal-requests'
];

// 각 페이지에 대해 기본 HTML 반환
pages.forEach(page => {
  router.get(page === '/' ? '/' : page, (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="ko">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>ReviewPage - 상세페이지 설문조사로 돈벌기</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
          <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        </head>
        <body>
          <div id="root">
            <div class="min-h-screen bg-gray-50">
              <!-- Header -->
              <nav class="bg-white shadow-lg">
                <div class="max-w-7xl mx-auto px-4">
                  <div class="flex justify-between h-16">
                    <div class="flex items-center">
                      <a href="/" class="text-xl font-bold text-blue-600">ReviewPage</a>
                    </div>
                    <div class="flex items-center space-x-4">
                      <a href="/login" class="text-gray-700 hover:text-blue-600">로그인</a>
                      <a href="/register" class="bg-blue-600 text-white px-4 py-2 rounded">회원가입</a>
                    </div>
                  </div>
                </div>
              </nav>
              
              <!-- Main Content -->
              <main class="max-w-7xl mx-auto py-6 px-4">
                <div class="text-center py-12">
                  <h1 class="text-4xl font-bold text-gray-900 mb-4">
                    ${getPageTitle(page)}
                  </h1>
                  <p class="text-xl text-gray-600 mb-8">
                    ${getPageDescription(page)}
                  </p>
                  <div class="space-x-4">
                    <a href="/register" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                      시작하기
                    </a>
                    <a href="/surveys" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                      설문 참여하기
                    </a>
                  </div>
                </div>
              </main>
              
              <!-- Footer -->
              <footer class="bg-gray-800 text-white py-8">
                <div class="max-w-7xl mx-auto px-4 text-center">
                  <p>&copy; 2024 ReviewPage. All rights reserved.</p>
                </div>
              </footer>
            </div>
          </div>
          
          <script>
            // API 설정
            window.API_BASE_URL = '/api';
            
            // 기본 API 호출 함수들
            window.api = {
              get: async (url) => {
                const token = localStorage.getItem('token');
                return axios.get(window.API_BASE_URL + url, {
                  headers: token ? { Authorization: 'Bearer ' + token } : {}
                });
              },
              post: async (url, data) => {
                const token = localStorage.getItem('token');
                return axios.post(window.API_BASE_URL + url, data, {
                  headers: token ? { Authorization: 'Bearer ' + token } : {}
                });
              }
            };
            
            // 페이지별 특별 기능
            ${getPageScript(page)}
          </script>
        </body>
      </html>
    `);
  });
});

function getPageTitle(page: string): string {
  const titles: { [key: string]: string } = {
    '/': '상세페이지 설문조사로 돈벌기',
    '/login': '로그인',
    '/register': '회원가입',
    '/dashboard': '대시보드',
    '/surveys': '설문 목록',
    '/create-survey': '설문 생성',
    '/rewards': '리워드',
    '/admin': '관리자',
    '/admin/dashboard': '관리자 대시보드',
    '/admin/users': '사용자 관리',
    '/admin/surveys': '설문 관리',
    '/admin/rewards': '리워드 관리',
    '/admin/responses': '응답 관리',
    '/admin/finance': '재정 관리',
    '/admin/cancellation-requests': '취소 요청 관리',
    '/admin/withdrawal-requests': '출금 요청 관리'
  };
  return titles[page] || 'ReviewPage';
}

function getPageDescription(page: string): string {
  const descriptions: { [key: string]: string } = {
    '/': '제품 피드백 설문으로 현금 리워드를 받으세요!',
    '/login': '계정에 로그인하세요',
    '/register': '새 계정을 만드세요',
    '/dashboard': '나의 활동 현황을 확인하세요',
    '/surveys': '참여 가능한 설문을 찾아보세요',
    '/create-survey': '새로운 설문을 만드세요',
    '/rewards': '획득한 리워드를 확인하세요'
  };
  return descriptions[page] || '설문조사 플랫폼 ReviewPage';
}

function getPageScript(page: string): string {
  if (page === '/login') {
    return `
      // 로그인 폼 추가
      document.querySelector('main').innerHTML = \`
        <div class="max-w-md mx-auto">
          <h2 class="text-2xl font-bold mb-6">로그인</h2>
          <form id="loginForm">
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">이메일</label>
              <input type="email" id="email" required class="w-full p-3 border border-gray-300 rounded">
            </div>
            <div class="mb-6">
              <label class="block text-sm font-medium mb-2">비밀번호</label>
              <input type="password" id="password" required class="w-full p-3 border border-gray-300 rounded">
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
              로그인
            </button>
          </form>
        </div>
      \`;
      
      document.getElementById('loginForm').onsubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await window.api.post('/auth/login', {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
          });
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          window.location.href = '/dashboard';
        } catch (error) {
          alert('로그인 실패: ' + (error.response?.data?.message || error.message));
        }
      };
    `;
  }
  
  if (page === '/register') {
    return `
      // 회원가입 폼 추가
      document.querySelector('main').innerHTML = \`
        <div class="max-w-md mx-auto">
          <h2 class="text-2xl font-bold mb-6">회원가입</h2>
          <form id="registerForm">
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">이메일</label>
              <input type="email" id="email" required class="w-full p-3 border border-gray-300 rounded">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">비밀번호</label>
              <input type="password" id="password" required class="w-full p-3 border border-gray-300 rounded">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">이름</label>
              <input type="text" id="name" required class="w-full p-3 border border-gray-300 rounded">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">역할</label>
              <select id="role" class="w-full p-3 border border-gray-300 rounded">
                <option value="CONSUMER">소비자</option>
                <option value="SELLER">판매자</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">생년월일 (YYMMDD)</label>
              <input type="text" id="birthDate" required pattern="[0-9]{6}" placeholder="901215" class="w-full p-3 border border-gray-300 rounded">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">성별</label>
              <select id="gender" class="w-full p-3 border border-gray-300 rounded">
                <option value="MALE">남성</option>
                <option value="FEMALE">여성</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">휴대폰 번호</label>
              <input type="tel" id="phoneNumber" required placeholder="01012345678" class="w-full p-3 border border-gray-300 rounded">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">은행 코드</label>
              <select id="bankCode" class="w-full p-3 border border-gray-300 rounded">
                <option value="KB">KB국민은행</option>
                <option value="SH">신한은행</option>
                <option value="WR">우리은행</option>
                <option value="HN">하나은행</option>
                <option value="NH">농협은행</option>
              </select>
            </div>
            <div class="mb-6">
              <label class="block text-sm font-medium mb-2">계좌번호</label>
              <input type="text" id="accountNumber" required placeholder="123456789012" class="w-full p-3 border border-gray-300 rounded">
            </div>
            <button type="submit" class="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
              회원가입
            </button>
          </form>
          <p class="mt-4 text-center">
            이미 계정이 있으신가요? <a href="/login" class="text-blue-600 hover:underline">로그인</a>
          </p>
        </div>
      \`;
      
      document.getElementById('registerForm').onsubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await window.api.post('/auth/register', {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            name: document.getElementById('name').value,
            role: document.getElementById('role').value,
            birthDate: document.getElementById('birthDate').value,
            gender: document.getElementById('gender').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            bankCode: document.getElementById('bankCode').value,
            accountNumber: document.getElementById('accountNumber').value
          });
          
          alert('회원가입이 완료되었습니다!');
          window.location.href = '/login';
        } catch (error) {
          alert('회원가입 실패: ' + (error.response?.data?.message || error.message));
        }
      };
    `;
  }
  
  if (page === '/surveys') {
    return `
      // 설문 목록 로드
      document.addEventListener('DOMContentLoaded', async () => {
        try {
          const response = await window.api.get('/surveys');
          const surveys = response.data.surveys;
          document.querySelector('main').innerHTML = \`
            <h2 class="text-2xl font-bold mb-6">설문 목록</h2>
            <div class="grid gap-4">
              \${surveys.map(survey => \`
                <div class="bg-white p-6 rounded-lg shadow">
                  <h3 class="text-xl font-bold mb-2">\${survey.title}</h3>
                  <p class="text-gray-600 mb-4">\${survey.description || ''}</p>
                  <div class="flex justify-between items-center">
                    <span class="text-green-600 font-bold">리워드: \${survey.reward}원</span>
                    <a href="/surveys/\${survey.id}" class="bg-blue-600 text-white px-4 py-2 rounded">참여하기</a>
                  </div>
                </div>
              \`).join('')}
            </div>
          \`;
        } catch (error) {
          console.error('Failed to load surveys:', error);
        }
      });
    `;
  }
  
  if (page === '/dashboard') {
    return `
      // 대시보드 페이지
      document.addEventListener('DOMContentLoaded', async () => {
        // 로그인 확인
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (!token || !user) {
          alert('로그인이 필요합니다.');
          window.location.href = '/login';
          return;
        }
        
        document.querySelector('main').innerHTML = \`
          <div class="max-w-6xl mx-auto">
            <h2 class="text-2xl font-bold mb-6">안녕하세요, \${user.name}님!</h2>
            
            <!-- 사용자 역할별 메뉴 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              \${user.role === 'SELLER' ? \`
                <div class="bg-blue-600 text-white p-6 rounded-lg shadow">
                  <h3 class="text-xl font-bold mb-2">새 설문 생성</h3>
                  <p class="mb-4">제품에 대한 피드백을 받아보세요</p>
                  <a href="/create-survey" class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100">
                    설문 만들기
                  </a>
                </div>
                <div class="bg-green-600 text-white p-6 rounded-lg shadow">
                  <h3 class="text-xl font-bold mb-2">내 설문 관리</h3>
                  <p class="mb-4">진행중인 설문을 관리하세요</p>
                  <a href="/surveys?my=true" class="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100">
                    관리하기
                  </a>
                </div>
              \` : \`
                <div class="bg-purple-600 text-white p-6 rounded-lg shadow">
                  <h3 class="text-xl font-bold mb-2">설문 참여하기</h3>
                  <p class="mb-4">설문에 참여하고 리워드를 받으세요</p>
                  <a href="/surveys" class="bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-100">
                    참여하기
                  </a>
                </div>
              \`}
              
              <div class="bg-yellow-600 text-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-bold mb-2">리워드</h3>
                <p class="mb-4">획득한 리워드를 확인하세요</p>
                <a href="/rewards" class="bg-white text-yellow-600 px-4 py-2 rounded hover:bg-gray-100">
                  확인하기
                </a>
              </div>
              
              \${user.role === 'ADMIN' ? \`
                <div class="bg-red-600 text-white p-6 rounded-lg shadow">
                  <h3 class="text-xl font-bold mb-2">관리자 패널</h3>
                  <p class="mb-4">시스템을 관리하세요</p>
                  <a href="/admin" class="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-100">
                    관리하기
                  </a>
                </div>
              \` : ''}
            </div>
          </div>
        \`;
      });
    `;
  }
  
  if (page === '/create-survey') {
    return `
      // 설문 생성 페이지
      document.addEventListener('DOMContentLoaded', async () => {
        // 로그인 확인
        const token = localStorage.getItem('token');
        if (!token) {
          alert('로그인이 필요합니다.');
          window.location.href = '/login';
          return;
        }
        
        try {
          // 설문 템플릿 로드
          console.log('📝 설문 템플릿을 불러오는 중...');
          const templatesResponse = await window.api.get('/surveys/templates');
          const templates = templatesResponse.data.templates || [];
          
          document.querySelector('main').innerHTML = \`
            <div class="max-w-4xl mx-auto">
              <h2 class="text-2xl font-bold mb-6">새 설문 생성</h2>
              
              <!-- 기본 정보 입력 -->
              <div class="bg-white p-6 rounded-lg shadow mb-6">
                <h3 class="text-lg font-bold mb-4">기본 정보</h3>
                <form id="surveyForm">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium mb-2">설문 제목</label>
                      <input type="text" id="title" required class="w-full p-3 border border-gray-300 rounded">
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">상품 URL</label>
                      <input type="url" id="url" required class="w-full p-3 border border-gray-300 rounded">
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">리워드 (원)</label>
                      <input type="number" id="reward" min="1000" required class="w-full p-3 border border-gray-300 rounded" value="5000">
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">최대 참가자</label>
                      <input type="number" id="maxParticipants" min="10" required class="w-full p-3 border border-gray-300 rounded" value="50">
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">최소 연령</label>
                      <input type="number" id="targetAgeMin" min="18" required class="w-full p-3 border border-gray-300 rounded" value="20">
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">최대 연령</label>
                      <input type="number" id="targetAgeMax" max="80" required class="w-full p-3 border border-gray-300 rounded" value="60">
                    </div>
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium mb-2">대상 성별</label>
                      <select id="targetGender" class="w-full p-3 border border-gray-300 rounded">
                        <option value="ALL">전체</option>
                        <option value="MALE">남성</option>
                        <option value="FEMALE">여성</option>
                      </select>
                    </div>
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium mb-2">설문 설명</label>
                      <textarea id="description" rows="3" class="w-full p-3 border border-gray-300 rounded"></textarea>
                    </div>
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium mb-2">종료일</label>
                      <input type="date" id="endDate" required class="w-full p-3 border border-gray-300 rounded">
                    </div>
                  </div>
                  
                  <!-- 템플릿 선택 -->
                  <div class="mt-6">
                    <h4 class="text-md font-bold mb-4">설문 템플릿 선택</h4>
                    <div id="templatesList" class="grid gap-4">
                      \${templates.length > 0 ? 
                        templates.map(template => \`
                          <div class="border rounded-lg p-4 cursor-pointer hover:bg-gray-50" data-template-id="\${template.id}">
                            <h5 class="font-bold">\${template.name}</h5>
                            <p class="text-gray-600 text-sm">\${template.description || ''}</p>
                            <p class="text-sm text-blue-600 mt-2">\${template.steps?.length || 0}단계, 총 질문 수: \${template.steps?.reduce((total, step) => total + (step.questions?.length || 0), 0) || 0}개</p>
                          </div>
                        \`).join('') 
                        : '<div class="text-center py-8 text-gray-500">템플릿을 불러오는 중입니다...</div>'
                      }
                    </div>
                  </div>
                  
                  <button type="submit" class="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                    설문 생성
                  </button>
                </form>
              </div>
            </div>
          \`;
          
          // 오늘부터 30일 후를 기본 종료일로 설정
          const endDateInput = document.getElementById('endDate');
          const thirtyDaysLater = new Date();
          thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
          endDateInput.value = thirtyDaysLater.toISOString().split('T')[0];
          
          // 템플릿 선택 이벤트
          let selectedTemplateId = null;
          document.querySelectorAll('[data-template-id]').forEach(templateDiv => {
            templateDiv.addEventListener('click', (e) => {
              // 기존 선택 제거
              document.querySelectorAll('[data-template-id]').forEach(div => {
                div.classList.remove('bg-blue-100', 'border-blue-500');
              });
              // 새 선택 적용
              templateDiv.classList.add('bg-blue-100', 'border-blue-500');
              selectedTemplateId = templateDiv.dataset.templateId;
            });
          });
          
          // 기본 템플릿이 있으면 자동 선택
          if (templates.length > 0) {
            const defaultTemplate = templates.find(t => t.isDefault) || templates[0];
            const defaultTemplateDiv = document.querySelector(\`[data-template-id="\${defaultTemplate.id}"]\`);
            if (defaultTemplateDiv) {
              defaultTemplateDiv.click();
            }
          }
          
          // 폼 제출 이벤트
          document.getElementById('surveyForm').onsubmit = async (e) => {
            e.preventDefault();
            
            if (!selectedTemplateId) {
              alert('템플릿을 선택해주세요.');
              return;
            }
            
            try {
              const formData = {
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                url: document.getElementById('url').value,
                reward: parseFloat(document.getElementById('reward').value),
                maxParticipants: parseInt(document.getElementById('maxParticipants').value),
                targetAgeMin: parseInt(document.getElementById('targetAgeMin').value),
                targetAgeMax: parseInt(document.getElementById('targetAgeMax').value),
                targetGender: document.getElementById('targetGender').value,
                endDate: document.getElementById('endDate').value,
                templateId: selectedTemplateId
              };
              
              console.log('📝 설문 생성 요청:', formData);
              const response = await window.api.post('/surveys', formData);
              console.log('✅ 설문 생성 완료:', response.data);
              
              alert('설문이 성공적으로 생성되었습니다!');
              window.location.href = '/dashboard';
            } catch (error) {
              console.error('❌ 설문 생성 실패:', error);
              alert('설문 생성에 실패했습니다: ' + (error.response?.data?.message || error.message));
            }
          };
          
        } catch (error) {
          console.error('❌ 템플릿 로드 실패:', error);
          document.querySelector('main').innerHTML = \`
            <div class="text-center py-12">
              <h2 class="text-2xl font-bold text-red-600 mb-4">템플릿을 불러올 수 없습니다</h2>
              <p class="text-gray-600 mb-4">오류: \${error.response?.data?.message || error.message}</p>
              <button onclick="window.location.reload()" class="bg-blue-600 text-white px-4 py-2 rounded">
                다시 시도
              </button>
            </div>
          \`;
        }
      });
    `;
  }
  
  return '';
}

export default router;