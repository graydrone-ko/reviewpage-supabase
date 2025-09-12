import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService, RegisterData } from '../services/api';
import { calculateAge, validateBirthDate, formatBirthDate, formatPhoneNumber, validatePhoneNumber } from '../utils/age';
import { koreanBanks } from '../utils/banks';
import { useSEO } from '../hooks/useSEO';

const Register: React.FC = () => {
  // SEO 최적화
  useSEO({
    title: '회원가입 - ReviewPage | 설문조사 돈벌기 무료 가입',
    description: 'ReviewPage 무료 회원가입으로 설문조사 돈벌기를 시작하세요. 제품 피드백 설문 참여로 현금 리워드를 받을 수 있습니다.',
    keywords: '회원가입,설문조사회원가입,돈벌기가입,리워드사이트가입,무료가입',
    canonical: 'https://reviewpage.co.kr/register'
  });

  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    name: '',
    role: 'CONSUMER',
    birthDate: '',
    gender: 'MALE',
    phoneNumber: '',
    bankCode: '',
    accountNumber: '',
  });

  // 입력 필드 상태 (포맷팅용)
  const [birthDateInput, setBirthDateInput] = useState('');
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  // 중복 검사 상태
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isPhoneChecking, setIsPhoneChecking] = useState(false);
  const [isEmailChecking, setIsEmailChecking] = useState(false);
  
  const navigate = useNavigate();

  // 중복 검사 함수들
  const checkDuplicate = async (type: 'email' | 'phone', value: string) => {
    try {
      const response = await fetch('/api/auth/check-duplicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, value })
      });
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('중복 검사 실패:', error);
      return { exists: false, error: '중복 검사 중 오류가 발생했습니다' };
    }
  };

  const checkEmailDuplicate = async (email: string) => {
    if (!email.includes('@')) return;
    
    setIsEmailChecking(true);
    try {
      const result = await checkDuplicate('email', email);
      if (result.exists) {
        setEmailError('이미 사용 중인 이메일입니다');
      } else {
        setEmailError('');
      }
    } finally {
      setIsEmailChecking(false);
    }
  };

  const checkPhoneDuplicate = async (phone: string) => {
    const normalizedPhone = phone.replace(/\D/g, '');
    if (normalizedPhone.length !== 11) return;
    
    setIsPhoneChecking(true);
    try {
      const result = await checkDuplicate('phone', normalizedPhone);
      if (result.exists) {
        setPhoneError('이미 사용 중인 전화번호입니다');
      } else {
        setPhoneError('');
      }
    } finally {
      setIsPhoneChecking(false);
    }
  };

  // 폼 검증
  const validateForm = (): string[] => {
    const errors: string[] = [];
    
    if (!formData.name.trim()) {
      errors.push('이름을 입력해주세요');
    }
    
    if (!formData.email.trim()) {
      errors.push('이메일을 입력해주세요');
    }
    
    if (formData.password.length < 6) {
      errors.push('비밀번호는 6자 이상이어야 합니다');
    }
    
    if (!validateBirthDate(formData.birthDate)) {
      errors.push('생년월일을 정확히 입력해주세요 (YYMMDD)');
    }
    
    if (!validatePhoneNumber(formData.phoneNumber)) {
      errors.push('핸드폰 번호를 정확히 입력해주세요 (010으로 시작하는 11자리)');
    }
    
    if (!formData.bankCode) {
      errors.push('은행을 선택해주세요');
    }
    
    if (!formData.accountNumber.trim()) {
      errors.push('계좌번호를 입력해주세요');
    }
    
    // 중복 검사 에러 확인
    if (phoneError) {
      errors.push('전화번호 중복을 해결해주세요');
    }
    
    if (emailError) {
      errors.push('이메일 중복을 해결해주세요');
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setLoading(true);
    setError('');
    setValidationErrors([]);

    try {
      const response = await authService.register(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Trigger user update event
      window.dispatchEvent(new Event('userUpdate'));
      
      // Redirect based on user role
      if (response.data.user.role === 'SELLER') {
        navigate('/dashboard');
      } else if (response.data.user.role === 'CONSUMER') {
        navigate('/surveys');
      } else {
        // Default fallback to home page
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || '회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 생년월일 입력 핸들러
  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setBirthDateInput(value);
      setFormData({ ...formData, birthDate: value });
    }
  };

  // 핸드폰 번호 입력 핸들러
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      setPhoneNumberInput(value);
      setFormData({ ...formData, phoneNumber: value });
      
      // 11자리 입력 완료 시 중복 검사
      if (value.length === 11) {
        setPhoneError(''); // 입력 중에는 에러 메시지 초기화
        setTimeout(() => checkPhoneDuplicate(value), 500); // 500ms 지연 후 검사
      } else {
        setPhoneError(''); // 11자리 미만일 때는 에러 메시지 제거
      }
    }
  };

  // 계좌번호 입력 핸들러
  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, accountNumber: value });
  };

  // 일반 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // 이메일 입력 시 중복 검사
    if (name === 'email' && value.includes('@') && value.includes('.')) {
      setEmailError(''); // 입력 중에는 에러 메시지 초기화
      setTimeout(() => checkEmailDuplicate(value), 500); // 500ms 지연 후 검사
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              로그인하기
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* 에러 메시지 */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          {validationErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              <ul className="list-disc list-inside space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index} className="text-sm">{error}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="space-y-4">
            {/* 사용자 유형 */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                사용자 유형 <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="CONSUMER">소비자 (설문 참여)</option>
                <option value="SELLER">판매자 (설문 생성)</option>
              </select>
            </div>

            {/* 이름 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="이름을 입력하세요"
                required
              />
            </div>

            {/* 이메일 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                이메일 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    emailError 
                      ? 'border-red-300 focus:ring-red-500' 
                      : formData.email.includes('@') && formData.email.includes('.') && !emailError && !isEmailChecking
                      ? 'border-green-300 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="이메일을 입력하세요"
                  required
                />
                {isEmailChecking && (
                  <div className="absolute right-3 top-2.5">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  </div>
                )}
              </div>
              {emailError && (
                <p className="mt-1 text-xs text-red-600">{emailError}</p>
              )}
              {!emailError && formData.email.includes('@') && formData.email.includes('.') && !isEmailChecking && (
                <p className="mt-1 text-xs text-green-600">사용 가능한 이메일입니다</p>
              )}
            </div>
            
            {/* 비밀번호 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="비밀번호를 입력하세요 (최소 6자)"
                required
              />
            </div>

            {/* 생년월일 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                생년월일 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formatBirthDate(birthDateInput)}
                onChange={handleBirthDateChange}
                placeholder="예: 820101 (82년 1월 1일)"
                maxLength={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                YYMMDD 형식으로 입력해주세요 (예: 820101)
              </p>
              {birthDateInput.length === 6 && validateBirthDate(birthDateInput) && (
                <p className="mt-1 text-xs text-blue-600">
                  만 {calculateAge(birthDateInput)}세
                </p>
              )}
            </div>

            {/* 성별 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                성별 <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="MALE">남성</option>
                <option value="FEMALE">여성</option>
              </select>
            </div>

            {/* 핸드폰 번호 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                휴대폰 번호 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formatPhoneNumber(phoneNumberInput)}
                  onChange={handlePhoneNumberChange}
                  placeholder="010-1234-5678"
                  maxLength={13}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    phoneError 
                      ? 'border-red-300 focus:ring-red-500' 
                      : phoneNumberInput.length === 11 && !phoneError && !isPhoneChecking
                      ? 'border-green-300 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  required
                />
                {isPhoneChecking && (
                  <div className="absolute right-3 top-2.5">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  </div>
                )}
              </div>
              {phoneError && (
                <p className="mt-1 text-xs text-red-600">{phoneError}</p>
              )}
              {!phoneError && phoneNumberInput.length === 11 && !isPhoneChecking && (
                <p className="mt-1 text-xs text-green-600">사용 가능한 전화번호입니다</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                알림톡 발송 및 고객지원을 위해 사용됩니다
              </p>
            </div>

            {/* 은행명 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                은행명 <span className="text-red-500">*</span>
              </label>
              <select
                name="bankCode"
                value={formData.bankCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">은행을 선택해주세요</option>
                {koreanBanks.map(bank => (
                  <option key={bank.code} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 계좌번호 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                계좌번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={handleAccountNumberChange}
                placeholder="숫자만 입력해주세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                출금 및 환불 처리를 위해 본인 명의의 계좌번호를 입력해주세요
              </p>
            </div>
          </div>

          {/* 가입 버튼 */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? '가입 중...' : '회원가입'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;