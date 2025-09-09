// 생년월일(YYMMDD)로부터 나이를 계산하는 유틸리티 함수

export const calculateAge = (birthDate: string): number => {
  if (birthDate.length !== 6) return 0;
  
  const year = parseInt(birthDate.slice(0, 2));
  const month = parseInt(birthDate.slice(2, 4));
  const day = parseInt(birthDate.slice(4, 6));
  
  // 2000년대/1900년대 구분 (30 미만은 2000년대로 가정)
  const fullYear = year < 30 ? 2000 + year : 1900 + year;
  
  const birth = new Date(fullYear, month - 1, day);
  const today = new Date();
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

// 생년월일 형식 검증
export const validateBirthDate = (birthDate: string): boolean => {
  if (birthDate.length !== 6) return false;
  
  const year = parseInt(birthDate.slice(0, 2));
  const month = parseInt(birthDate.slice(2, 4));
  const day = parseInt(birthDate.slice(4, 6));
  
  // 월 검증
  if (month < 1 || month > 12) return false;
  
  // 일 검증 (간단한 검증)
  if (day < 1 || day > 31) return false;
  
  // 2월 29일 같은 경우는 여기서는 간단히 처리
  if (month === 2 && day > 29) return false;
  if ([4, 6, 9, 11].includes(month) && day > 30) return false;
  
  return true;
};

// 생년월일 포맷팅 (YY.MM.DD)
export const formatBirthDate = (value: string): string => {
  if (value.length <= 2) return value;
  if (value.length <= 4) return `${value.slice(0, 2)}.${value.slice(2)}`;
  return `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(4, 6)}`;
};

// 핸드폰 번호 포맷팅
export const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};

// 핸드폰 번호 검증
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  return phoneNumber.length === 11 && /^010\d{8}$/.test(phoneNumber);
};