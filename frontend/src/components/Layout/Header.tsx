import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  user?: {
    name: string;
    role: string;
  };
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary-600">
              ReviewPage
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* 판매자 네비게이션 - 항상 표시 */}
                {(user.role === 'seller' || user.role === 'SELLER') && (
                  <div className="hidden md:flex items-center space-x-4">
                    <Link 
                      to="/dashboard" 
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      대시보드
                    </Link>
                    <Link 
                      to="/surveys/create" 
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      새 설문 생성
                    </Link>
                  </div>
                )}

                {/* 소비자 네비게이션 - 항상 표시 */}
                {(user.role === 'consumer' || user.role === 'CONSUMER') && (
                  <div className="hidden md:flex items-center space-x-4">
                    <Link 
                      to="/surveys" 
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200"
                    >
                      📋 설문 참여
                    </Link>
                    <Link 
                      to="/rewards" 
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200"
                    >
                      🎁 리워드
                    </Link>
                  </div>
                )}

                {/* 관리자 네비게이션 - 항상 표시 */}
                {(user.role === 'admin' || user.role === 'ADMIN') && (
                  <div className="hidden md:flex items-center space-x-4">
                    <Link 
                      to="/admin/dashboard" 
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      관리자 대시보드
                    </Link>
                    <Link 
                      to="/admin/surveys" 
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      설문 승인
                    </Link>
                    <Link 
                      to="/admin/users" 
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                      사용자 관리
                    </Link>
                    <Link 
                      to="/admin/rewards" 
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      리워드 관리
                    </Link>
                  </div>
                )}

                {/* 사용자 메뉴 */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-2 py-1"
                  >
                    <span>안녕하세요, {user.name}님</span>
                    <svg className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                      <button
                        onClick={() => {
                          onLogout?.();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600"
                >
                  로그인
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
                >
                  회원가입
                </Link>
              </>
            )}

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <div className="space-y-1">
              {(user?.role === 'seller' || user?.role === 'SELLER') && (
                <>
                  <Link 
                    to="/dashboard"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    📊 대시보드
                  </Link>
                  <Link 
                    to="/surveys/create"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ➕ 새 설문 생성
                  </Link>
                </>
              )}
              {(user?.role === 'consumer' || user?.role === 'CONSUMER') && (
                <>
                  <Link 
                    to="/surveys"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    📋 설문 참여
                  </Link>
                  <Link 
                    to="/rewards"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    🎁 리워드
                  </Link>
                </>
              )}
              {(user?.role === 'admin' || user?.role === 'ADMIN') && (
                <>
                  <Link 
                    to="/admin/dashboard"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    📊 관리자 대시보드
                  </Link>
                  <Link 
                    to="/admin/surveys"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    📝 설문 승인
                  </Link>
                  <Link 
                    to="/admin/users"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    👥 사용자 관리
                  </Link>
                  <Link 
                    to="/admin/rewards"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    💰 리워드 관리
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;