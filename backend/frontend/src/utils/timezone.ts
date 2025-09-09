// 한국시간(KST) 처리 유틸리티

const KST_TIMEZONE = 'Asia/Seoul';

/**
 * 현재 한국시간 기준으로 Date 객체 반환
 */
export function getKoreanTime(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: KST_TIMEZONE }));
}

/**
 * 현재 한국시간 기준으로 지정된 일수만큼 후의 날짜 반환
 * @param days 추가할 일수
 */
export function getKoreanTimeAfter(days: number): Date {
  const koreanTime = getKoreanTime();
  koreanTime.setDate(koreanTime.getDate() + days);
  return koreanTime;
}

/**
 * datetime-local input에 사용할 형식으로 한국시간 변환
 * @param date Date 객체 또는 undefined (현재시간 사용)
 */
export function toKoreanDateTimeLocal(date?: Date): string {
  const targetDate = date || getKoreanTime();
  // 한국시간으로 변환
  const koreanTimeStr = targetDate.toLocaleString('sv-SE', { timeZone: KST_TIMEZONE });
  return koreanTimeStr.slice(0, 16); // YYYY-MM-DDTHH:mm 형식
}

/**
 * datetime-local input 값을 한국시간 기준 Date로 변환
 * @param dateTimeLocal YYYY-MM-DDTHH:mm 형식 문자열
 */
export function fromKoreanDateTimeLocal(dateTimeLocal: string): Date {
  // datetime-local 값은 이미 사용자의 로컬 시간대로 인식됨
  // 한국시간대로 해석하려면 timezone 정보를 추가
  return new Date(dateTimeLocal + '+09:00');
}

/**
 * 두 날짜 간의 차이를 계산 (한국시간 기준)
 * @param date1 첫 번째 날짜
 * @param date2 두 번째 날짜
 * @returns 밀리초 단위 차이
 */
export function getKoreanTimeDiff(date1: Date, date2: Date): number {
  const kst1 = new Date(date1.toLocaleString('en-US', { timeZone: KST_TIMEZONE }));
  const kst2 = new Date(date2.toLocaleString('en-US', { timeZone: KST_TIMEZONE }));
  return kst2.getTime() - kst1.getTime();
}

/**
 * 현재 한국시간 기준으로 지정된 시간이 몇 시간/일 후인지 확인
 * @param targetDate 확인할 날짜
 * @returns { days: number, hours: number, isValid: boolean }
 */
export function getTimeFromNowKST(targetDate: Date): {
  days: number;
  hours: number;
  isValid: boolean;
  totalHours: number;
} {
  const now = getKoreanTime();
  const diff = getKoreanTimeDiff(now, targetDate);
  
  const totalHours = diff / (1000 * 60 * 60);
  const days = Math.floor(totalHours / 24);
  const hours = Math.floor(totalHours % 24);
  
  return {
    days,
    hours,
    isValid: diff > 0,
    totalHours
  };
}

/**
 * 한국시간 기준으로 날짜 포맷팅
 * @param date Date 객체
 * @param format 'full' | 'date' | 'time' | 'datetime'
 */
export function formatKoreanTime(date: Date, format: 'full' | 'date' | 'time' | 'datetime' = 'datetime'): string {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: KST_TIMEZONE
  };

  switch (format) {
    case 'full':
      options.year = 'numeric';
      options.month = 'long';
      options.day = 'numeric';
      options.weekday = 'long';
      options.hour = '2-digit';
      options.minute = '2-digit';
      break;
    case 'date':
      options.year = 'numeric';
      options.month = '2-digit';
      options.day = '2-digit';
      break;
    case 'time':
      options.hour = '2-digit';
      options.minute = '2-digit';
      break;
    case 'datetime':
      options.year = 'numeric';
      options.month = '2-digit';
      options.day = '2-digit';
      options.hour = '2-digit';
      options.minute = '2-digit';
      break;
  }

  return date.toLocaleString('ko-KR', options);
}