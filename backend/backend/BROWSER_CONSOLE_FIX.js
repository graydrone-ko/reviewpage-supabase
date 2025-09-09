// 🔧 ReviewPage 템플릿 로드 수정 스크립트 (프론트엔드 페이지용)
// 스크린샷의 페이지에서 F12 -> Console에서 이 코드를 붙여넣고 실행하세요

console.log('🔧 ReviewPage 템플릿 로드 수정 스크립트 시작...');

// 1. 올바른 API URL 설정 (테스트를 통해 확인된 URL)
const CORRECT_API_URL = 'https://frontend-production-a55d.up.railway.app/api';

// 2. 현재 페이지의 API 호출을 올바른 URL로 교체
if (window.api && window.API_BASE_URL) {
  console.log(`기존 API URL: ${window.API_BASE_URL}`);
  window.API_BASE_URL = CORRECT_API_URL;
  console.log(`새로운 API URL: ${window.API_BASE_URL}`);
}

// 3. API 함수들 재정의 (혹시 모를 CORS 이슈 대비)
window.api = {
  get: async (url) => {
    const fullUrl = CORRECT_API_URL + url;
    console.log(`GET 요청: ${fullUrl}`);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error(`API GET 실패 (${fullUrl}):`, error);
      throw error;
    }
  },
  
  post: async (url, body) => {
    const fullUrl = CORRECT_API_URL + url;
    console.log(`POST 요청: ${fullUrl}`, body);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error(`API POST 실패 (${fullUrl}):`, error);
      throw error;
    }
  }
};

// 4. 템플릿 로드 함수
async function loadTemplatesFixed() {
  console.log('📝 템플릿 로드 시작...');
  
  try {
    const response = await window.api.get('/surveys/templates');
    const templates = response.data.templates || [];
    
    console.log('✅ 템플릿 로드 성공:', templates.length, '개');
    
    if (templates.length === 0) {
      console.log('⚠️ 템플릿이 없습니다. 자동 생성 트리거를 위해 재시도...');
      
      // 템플릿 자동 생성 트리거를 위해 몇 초 후 재시도
      await new Promise(resolve => setTimeout(resolve, 2000));
      const retryResponse = await window.api.get('/surveys/templates');
      const retryTemplates = retryResponse.data.templates || [];
      
      console.log('재시도 결과:', retryTemplates.length, '개 템플릿');
      updateTemplateSection(retryTemplates);
      return retryTemplates;
    }
    
    updateTemplateSection(templates);
    return templates;
    
  } catch (error) {
    console.error('❌ 템플릿 로드 실패:', error);
    showErrorMessage(error.message);
    return [];
  }
}

// 5. 템플릿 섹션 UI 업데이트
function updateTemplateSection(templates) {
  // 기존 템플릿 영역 찾기
  let templateSection = document.getElementById('templatesList');
  
  if (!templateSection) {
    // 템플릿 목록 영역이 없으면 생성
    templateSection = document.createElement('div');
    templateSection.id = 'templatesList';
    templateSection.className = 'grid gap-4 mt-4';
    
    // 적절한 위치에 삽입
    const form = document.querySelector('form');
    if (form) {
      const titleElement = document.createElement('h4');
      titleElement.className = 'text-md font-bold mb-4';
      titleElement.textContent = '설문 템플릿 선택 (수정됨)';
      
      form.appendChild(titleElement);
      form.appendChild(templateSection);
    } else {
      document.querySelector('main').appendChild(templateSection);
    }
  }
  
  if (templates.length === 0) {
    templateSection.innerHTML = `
      <div style="text-align: center; padding: 20px; border: 2px dashed #e5e5e5; border-radius: 8px; background: #f9f9f9;">
        <p style="color: #666; margin-bottom: 16px;">⚠️ 템플릿이 없습니다</p>
        <button onclick="window.loadTemplatesFixed()" 
                style="background: #3b82f6; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer;">
          다시 로드
        </button>
        <p style="font-size: 12px; color: #999; margin-top: 8px;">
          템플릿이 자동 생성되는 중일 수 있습니다. 잠시 후 다시 시도해주세요.
        </p>
      </div>
    `;
  } else {
    templateSection.innerHTML = templates.map(template => `
      <div class="template-item border rounded-lg p-4 cursor-pointer hover:bg-gray-50" 
           data-template-id="${template.id}"
           style="border: 1px solid #e5e5e5; padding: 16px; margin: 8px 0; border-radius: 8px; cursor: pointer; background: white;">
        <h5 style="font-weight: bold; margin-bottom: 8px;">${template.name}</h5>
        <p style="color: #666; font-size: 14px; margin-bottom: 8px;">${template.description || ''}</p>
        <p style="font-size: 12px; color: #3b82f6;">
          ${template.steps?.length || 0}단계, 총 질문: ${template.steps?.reduce((total, step) => total + (step.questions?.length || 0), 0) || 0}개
        </p>
      </div>
    `).join('');
    
    // 템플릿 선택 이벤트 추가
    document.querySelectorAll('.template-item').forEach(item => {
      item.addEventListener('click', function() {
        // 기존 선택 해제
        document.querySelectorAll('.template-item').forEach(el => {
          el.style.background = 'white';
          el.style.borderColor = '#e5e5e5';
        });
        
        // 현재 선택 표시
        this.style.background = '#eff6ff';
        this.style.borderColor = '#3b82f6';
        
        // 전역 변수에 저장
        window.selectedTemplateId = this.dataset.templateId;
        console.log('템플릿 선택됨:', window.selectedTemplateId);
      });
    });
    
    // 첫 번째 템플릿 자동 선택
    const firstTemplate = document.querySelector('.template-item');
    if (firstTemplate) {
      firstTemplate.click();
    }
  }
  
  console.log(`✅ 템플릿 섹션 업데이트 완료 (${templates.length}개)`);
}

// 6. 에러 메시지 표시
function showErrorMessage(message) {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed; 
    top: 20px; 
    right: 20px; 
    background: #fee; 
    border: 1px solid #fcc; 
    padding: 16px; 
    border-radius: 8px; 
    max-width: 400px;
    z-index: 9999;
  `;
  errorDiv.innerHTML = `
    <h4 style="color: #c33; margin: 0 0 8px 0;">템플릿 로드 실패</h4>
    <p style="margin: 0; font-size: 14px;">${message}</p>
    <button onclick="this.parentElement.remove(); window.loadTemplatesFixed();" 
            style="margin-top: 8px; background: #3b82f6; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">
      다시 시도
    </button>
  `;
  document.body.appendChild(errorDiv);
  
  // 5초 후 자동 제거
  setTimeout(() => errorDiv.remove(), 5000);
}

// 7. 전역에서 접근 가능하도록 설정
window.loadTemplatesFixed = loadTemplatesFixed;

// 8. MutationObserver 에러 수정
if (typeof MutationObserver !== 'undefined') {
  const originalObserve = MutationObserver.prototype.observe;
  MutationObserver.prototype.observe = function(target, options) {
    try {
      if (target && target.nodeType === Node.ELEMENT_NODE) {
        return originalObserve.call(this, target, options);
      } else {
        console.warn('MutationObserver: Invalid target node');
      }
    } catch (error) {
      console.warn('MutationObserver error caught and ignored:', error);
    }
  };
}

// 9. 즉시 실행
console.log('🚀 템플릿 로드 실행...');
loadTemplatesFixed();

console.log(`
✨ 사용법:
1. 위 스크립트가 자동으로 올바른 API (${CORRECT_API_URL})에서 템플릿을 로드합니다
2. 템플릿이 표시되면 클릭하여 선택하세요
3. 문제가 있으면 콘솔에서 loadTemplatesFixed() 를 다시 실행하세요
4. 선택된 템플릿 ID는 window.selectedTemplateId 에 저장됩니다

🔧 수정 사항:
- API URL을 올바른 백엔드로 변경: ${CORRECT_API_URL}
- MutationObserver 에러 방지 코드 추가
- 템플릿 자동 생성 트리거 로직 추가
- 에러 핸들링 및 재시도 로직 강화
`);