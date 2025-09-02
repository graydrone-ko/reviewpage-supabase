// 한국 주요 은행 목록

export interface Bank {
  code: string;
  name: string;
}

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