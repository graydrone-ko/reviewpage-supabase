// 브라우저 콘솔에서 실행할 템플릿 수정 스크립트
// 스크린샷의 페이지에서 F12 -> Console에서 이 코드를 붙여넣고 실행

console.log('🔧 ReviewPage 템플릿 로드 수정 스크립트');

// 1. API 기본 URL들을 테스트
const possibleApiUrls = [
  'https://backend-production-a55d.up.railway.app/api',
  'https://reviewpage-backend-production.up.railway.app/api',  
  '/api', // 현재 도메인
];

// 2. 템플릿 로드 함수
async function loadTemplates() {
  console.log('📝 템플릿 로드 시작...');
  
  for (const apiUrl of possibleApiUrls) {
    try {
      console.log(`Testing API: ${apiUrl}`);
      
      const response = await fetch(`${apiUrl}/surveys/templates`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 토큰이 있다면 추가
          'Authorization': localStorage.getItem('token') ? 
            `Bearer ${localStorage.getItem('token')}` : ''
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ 성공! API URL: ${apiUrl}`);
        console.log('템플릿 데이터:', data);
        
        // 3. 페이지의 템플릿 영역 업데이트
        updateTemplateSection(data.templates || []);
        
        return data.templates;
      } else {
        console.log(`❌ ${apiUrl}: ${response.status} - ${response.statusText}`);
      }
      
    } catch (error) {
      console.log(`❌ ${apiUrl}: ${error.message}`);
    }
  }
  
  console.log('❌ 모든 API URL에서 템플릿 로드 실패');
  return null;
}

// 4. 템플릿 섹션 UI 업데이트
function updateTemplateSection(templates) {
  const templateSection = document.querySelector('[data-testid="template-section"], .template-section, [class*="template"]');
  
  if (!templateSection) {
    console.log('템플릿 섹션을 찾을 수 없습니다. 수동으로 추가합니다.');
    addTemplateSection(templates);
    return;
  }
  
  if (templates.length === 0) {
    templateSection.innerHTML = `
      <div style="text-align: center; padding: 20px; border: 2px dashed #ccc; border-radius: 8px;">
        <p>⚠️ 템플릿 로드 실패</p>
        <button onclick="window.loadTemplates()" style="background: #007bff; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">
          다시 시도
        </button>
      </div>
    `;
  } else {
    templateSection.innerHTML = `
      <h3>사용 가능한 템플릿 (${templates.length}개)</h3>
      ${templates.map(template => `
        <div onclick="selectTemplate('${template.id}')" 
             style="border: 1px solid #ddd; padding: 16px; margin: 8px 0; border-radius: 8px; cursor: pointer; background: white;"
             data-template-id="${template.id}">
          <h4>${template.name}</h4>
          <p>${template.description || ''}</p>
          <small>단계: ${template.steps?.length || 0}개, 질문: ${template.steps?.reduce((total, step) => total + (step.questions?.length || 0), 0) || 0}개</small>
        </div>
      `).join('')}
    `;
  }
  
  console.log(`✅ 템플릿 섹션 업데이트 완료 (${templates.length}개 템플릿)`);
}

// 5. 템플릿 섹션이 없으면 추가
function addTemplateSection(templates) {
  const form = document.querySelector('form');
  if (form) {
    const templateDiv = document.createElement('div');
    templateDiv.innerHTML = `
      <h3>설문 템플릿 선택</h3>
      <div id="template-list">
        ${templates.length > 0 ? 
          templates.map(template => `
            <div onclick="selectTemplate('${template.id}')" 
                 style="border: 1px solid #ddd; padding: 16px; margin: 8px 0; border-radius: 8px; cursor: pointer;"
                 data-template-id="${template.id}">
              <h4>${template.name}</h4>
              <p>${template.description || ''}</p>
            </div>
          `).join('') : 
          '<p>사용 가능한 템플릿이 없습니다.</p>'
        }
      </div>
    `;
    form.appendChild(templateDiv);
  }
}

// 6. 템플릿 선택 함수
window.selectTemplate = function(templateId) {
  console.log(`템플릿 선택: ${templateId}`);
  
  // 모든 템플릿에서 선택 상태 제거
  document.querySelectorAll('[data-template-id]').forEach(div => {
    div.style.background = 'white';
    div.style.borderColor = '#ddd';
  });
  
  // 선택된 템플릿 하이라이트
  const selectedDiv = document.querySelector(`[data-template-id="${templateId}"]`);
  if (selectedDiv) {
    selectedDiv.style.background = '#e3f2fd';
    selectedDiv.style.borderColor = '#2196f3';
  }
  
  // 전역 변수로 저장
  window.selectedTemplateId = templateId;
};

// 7. 전역에서 접근 가능하게 설정
window.loadTemplates = loadTemplates;

// 8. 즉시 실행
console.log('🚀 템플릿 로드 실행...');
loadTemplates();

console.log(`
✨ 사용법:
1. 위 스크립트가 자동으로 템플릿을 로드합니다
2. 템플릿이 표시되면 클릭하여 선택하세요
3. 문제가 있으면 콘솔에서 loadTemplates() 를 다시 실행하세요
4. 선택된 템플릿 ID는 window.selectedTemplateId 에 저장됩니다

🔧 추가 디버깅:
- localStorage.getItem('token') 으로 로그인 토큰 확인
- loadTemplates() 로 수동 재로드
`);