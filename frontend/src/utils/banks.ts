// 한국 은행 코드 매핑 및 유틸리티

export interface Bank {
  code: string;
  name: string;
  shortName?: string;
}

// 기존 선택용 은행 목록
export const koreanBanks: Bank[] = [
  { code: 'KB', name: 'KB국민은행' },
  { code: 'SH', name: '신한은행' },
  { code: 'WR', name: '우리은행' },
  { code: 'HN', name: '하나은행' },
  { code: 'NH', name: 'NH농협은행' },
  { code: 'IBK', name: 'IBK기업은행' },
  { code: 'SC', name: 'SC제일은행' },
  { code: 'CT', name: '씨티은행' },
  { code: 'KDB', name: 'KDB산업은행' },
  { code: 'SBI', name: 'SBI저축은행' },
  { code: 'KK', name: '카카오뱅크' },
  { code: 'TOSS', name: '토스뱅크' },
  { code: 'K', name: 'K뱅크' },
  { code: 'POST', name: '우체국예금보험' },
  { code: 'SH2', name: '수협은행' },
  { code: 'CR', name: '신협중앙회' },
  { code: 'MG', name: 'MG새마을금고' }
];

// 실제 은행 코드 매핑 (3자리 숫자 코드)
export const KOREAN_BANK_CODES: Record<string, string> = {
  '002': '산업은행',
  '003': '기업은행', 
  '004': '국민은행',
  '007': '수협은행',
  '011': '농협은행',
  '012': '농협회원조합',
  '020': '우리은행',
  '023': 'SC제일은행',
  '027': '한국씨티은행',
  '031': '대구은행',
  '032': '부산은행',
  '034': '광주은행',
  '035': '제주은행',
  '037': '전북은행',
  '039': '경남은행',
  '045': '새마을금고',
  '048': '신협',
  '050': '저축은행',
  '071': '우체국',
  '081': 'KEB하나은행',
  '088': '신한은행',
  '089': 'K뱅크',
  '090': '카카오뱅크',
  '092': '토스뱅크',
  
  // 기존 코드 호환을 위한 매핑
  'KB': 'KB국민은행',
  'SH': '신한은행', 
  'WR': '우리은행',
  'HN': '하나은행',
  'NH': 'NH농협은행',
  'IBK': 'IBK기업은행',
  'SC': 'SC제일은행',
  'CT': '씨티은행',
  'KDB': 'KDB산업은행',
  'SBI': 'SBI저축은행',
  'KK': '카카오뱅크',
  'TOSS': '토스뱅크',
  'K': 'K뱅크',
  'POST': '우체국예금보험',
  'SH2': '수협은행',
  'CR': '신협중앙회',
  'MG': 'MG새마을금고'
};

/**
 * 은행 코드를 은행명으로 변환
 */
export const getBankName = (bankCode: string): string => {
  if (!bankCode) return '';
  
  const bankName = KOREAN_BANK_CODES[bankCode];
  return bankName || `알 수 없는 은행 (${bankCode})`;
};

/**
 * 계좌번호 포맷팅 (마스킹 없이 전체 표시)
 */
export const formatAccountNumber = (accountNumber: string): string => {
  if (!accountNumber) return '';
  
  // 숫자만 추출
  const numbers = accountNumber.replace(/\D/g, '');
  
  // 길이에 따라 다른 포맷 적용
  if (numbers.length <= 6) {
    return numbers;
  } else if (numbers.length <= 10) {
    return numbers.replace(/(\d{3})(\d{2})(\d+)/, '$1-$2-$3');
  } else {
    return numbers.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
  }
};

/**
 * 전화번호 포맷팅
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) return '';
  
  const numbers = phoneNumber.replace(/\D/g, '');
  
  if (numbers.length === 11) {
    return numbers.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (numbers.length === 10) {
    return numbers.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  
  return phoneNumber;
};