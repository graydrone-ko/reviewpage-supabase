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
  
  return '';
}

export default router;