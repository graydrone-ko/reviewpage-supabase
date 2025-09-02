// 설문 응답 검증 유틸리티 함수들

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

// 주관식 텍스트 답변 검증
export const validateTextAnswer = (
  answer: string, 
  questionType: string,
  customMinLength?: number
): ValidationResult => {
  
  if (questionType !== 'TEXT' && questionType !== 'text') {
    return { isValid: true, message: '' };
  }
  
  const minLength = customMinLength || 20; // 기본 20자
  const trimmedAnswer = answer?.trim() || '';
  
  if (trimmedAnswer.length === 0) {
    return {
      isValid: false,
      message: '답변을 입력해주세요'
    };
  }
  
  if (trimmedAnswer.length < minLength) {
    return {
      isValid: false,
      message: `최소 ${minLength}자 이상 작성해주세요 (현재: ${trimmedAnswer.length}자)`
    };
  }
  
  return { isValid: true, message: '작성 완료' };
};

// 필수 질문 검증
export const validateRequiredAnswer = (answer: any, isRequired: boolean): ValidationResult => {
  if (!isRequired) {
    return { isValid: true, message: '' };
  }
  
  if (answer === undefined || answer === null || answer === '') {
    return {
      isValid: false,
      message: '필수 답변입니다'
    };
  }
  
  // 배열 타입 답변 (객관식 등)의 경우
  if (Array.isArray(answer) && answer.length === 0) {
    return {
      isValid: false,
      message: '답변을 선택해주세요'
    };
  }
  
  return { isValid: true, message: '' };
};

// 설문 전체 제출 전 검증
export const validateSurveySubmission = (answers: any[], questions: any[]): string[] => {
  const errors: string[] = [];
  
  questions.forEach((question, index) => {
    const answer = answers[index];
    
    // 필수 답변 검증
    const requiredValidation = validateRequiredAnswer(answer, question.required);
    if (!requiredValidation.isValid) {
      errors.push(`질문 ${index + 1}: ${requiredValidation.message}`);
      return; // 필수 답변이 없으면 다른 검증은 스킵
    }
    
    // 주관식 질문 검증 (답변이 있는 경우에만)
    if (answer && (question.type === 'TEXT' || question.type === 'text')) {
      const textValidation = validateTextAnswer(answer, question.type, question.minLength);
      if (!textValidation.isValid) {
        errors.push(`질문 ${index + 1}: ${textValidation.message}`);
      }
    }
  });
  
  return errors;
};

// 실시간 입력 검증을 위한 헬퍼
export const getTextInputStatus = (
  value: string, 
  minLength: number = 20
): { isValid: boolean; remaining: number; message: string } => {
  const currentLength = value?.trim().length || 0;
  const isValid = currentLength >= minLength;
  const remaining = Math.max(0, minLength - currentLength);
  
  let message = '';
  if (isValid) {
    message = '✓ 작성 완료';
  } else if (currentLength === 0) {
    message = `${minLength}자 이상 작성해주세요`;
  } else {
    message = `${remaining}자 더 필요`;
  }
  
  return { isValid, remaining, message };
};