import { useEffect } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import { useAuthQuery } from '../hooks/queries/useAuthQuery';

import useAuthStore from '../store/authStore';

const MainLayout = () => {
  const location = useLocation();
  const isMain = location.pathname === '/';

  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  // 앱 시작시 로그인 상태 검증
  const { data, isSuccess, isError } = useAuthQuery();

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }

    if (isError) {
      logout();
    }
  }, [data, isSuccess, isError, setUser, logout]);

  return (
    <div className={`group flex h-screen flex-col ${isMain ? 'layout--main' : ''}`}>
      {/* 헤더 */}
      <Header className="group-[.layout--main]:border-none" />

      <main className="flex-1">
        <Outlet />
      </main>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default MainLayout;
