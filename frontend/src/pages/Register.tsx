import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService, RegisterData } from '../services/api';
import { calculateAge, validateBirthDate, formatBirthDate, formatPhoneNumber, validatePhoneNumber } from '../utils/age';
import { koreanBanks } from '../utils/banks';
import { useSEO } from '../hooks/useSEO';

const Register: React.FC = () => {
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://reviewpage-frontend3.vercel.app';
  // SEO 최적화
  useSEO({
    title: '회원가입 - ReviewPage | 설문조사 돈벌기 무료 가입',
    description: 'ReviewPage 무료 회원가입으로 설문조사 돈벌기를 시작하세요. 제품 피드백 설문 참여로 현금 리워드를 받을 수 있습니다.',
    keywords: '회원가입,설문조사회원가입,돈벌기가입,리워드사이트가입,무료가입',
    canonical: `${siteUrl}/register`
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center min-h-full">
        <div className="max-w-lg w-full">
          {/* 로고 영역 */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              ReviewPage
            </h1>
            <p className="text-gray-600">설문조사로 돈벌기</p>
          </div>

          {/* 회원가입 폼 카드 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
                회원가입
              </h2>
              <p className="text-center text-gray-600">
                무료 가입하고 설문조사로 리워드를 받아보세요
              </p>
            </div>
        
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* 에러 메시지 */}
              {error && (
                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-6 py-4 rounded-2xl shadow-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}
              
              {validationErrors.length > 0 && (
                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-6 py-4 rounded-2xl shadow-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <ul className="list-disc list-inside space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index} className="text-sm">{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
          
              <div className="space-y-4">
                {/* 사용자 유형 */}
                <div>
                  <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                    사용자 유형 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80 appearance-none"
                      required
                    >
                      <option value="CONSUMER">🙋‍♂️ 소비자 (설문 참여)</option>
                      <option value="SELLER">🏪 판매자 (설문 생성)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 이름 */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                      placeholder="이름을 입력하세요"
                      required
                    />
                  </div>
                </div>

                {/* 이메일 */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border rounded-2xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/80 ${
                        emailError 
                          ? 'border-red-300 focus:ring-red-500' 
                          : formData.email.includes('@') && formData.email.includes('.') && !emailError && !isEmailChecking
                          ? 'border-green-300 focus:ring-green-500'
                          : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
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
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    비밀번호 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                      placeholder="비밀번호를 입력하세요 (최소 6자)"
                      required
                    />
                  </div>
            </div>

                {/* 생년월일 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    생년월일 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={formatBirthDate(birthDateInput)}
                      onChange={handleBirthDateChange}
                      placeholder="예: 820101 (82년 1월 1일)"
                      maxLength={8}
                      className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                      required
                    />
                  </div>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    성별 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80 appearance-none"
                      required
                    >
                      <option value="MALE">👨 남성</option>
                      <option value="FEMALE">👩 여성</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 핸드폰 번호 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    휴대폰 번호 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={formatPhoneNumber(phoneNumberInput)}
                      onChange={handlePhoneNumberChange}
                      placeholder="010-1234-5678"
                      maxLength={13}
                      className={`w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border rounded-2xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/80 ${
                        phoneError 
                          ? 'border-red-300 focus:ring-red-500' 
                          : phoneNumberInput.length === 11 && !phoneError && !isPhoneChecking
                          ? 'border-green-300 focus:ring-green-500'
                          : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    은행명 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="bankCode"
                      value={formData.bankCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80 appearance-none"
                      required
                    >
                      <option value="">🏦 은행을 선택해주세요</option>
                      {koreanBanks.map(bank => (
                        <option key={bank.code} value={bank.code}>
                          {bank.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 계좌번호 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    계좌번호 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={formData.accountNumber}
                      onChange={handleAccountNumberChange}
                      placeholder="숫자만 입력해주세요"
                      className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                      required
                    />
                  </div>
              <p className="mt-1 text-xs text-gray-500">
                출금 및 환불 처리를 위해 본인 명의의 계좌번호를 입력해주세요
              </p>
            </div>
          </div>

              {/* 가입 버튼 */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg"
                >
                  <div className="flex items-center justify-center">
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        가입 중...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        회원가입
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>

            {/* 로그인 링크 */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                이미 계정이 있으신가요?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  로그인하기
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
