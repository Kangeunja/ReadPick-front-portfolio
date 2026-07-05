import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useAuthQuery } from 'hooks/queries/useAuthQuery';
import { useAuthStore } from 'store/authStore';

import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  const location = useLocation();
  const isMain = location.pathname === '/';

  // const isInitialized = useAuthStore((state) => state.isInitialized);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  // 앱 시작시 로그인 상태 검증
  const { data, isSuccess, isError, isFetching } = useAuthQuery();
  const hasSessionHint = localStorage.getItem('isLoggedInHint') === 'true';

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }

    if (isError) {
      localStorage.removeItem('isLoggedInHint');
      logout();
    }
  }, [data, isSuccess, isError, setUser, logout]);

  if (hasSessionHint || isFetching) {
    return <div>로그인 상태 확인 중... 🔐</div>;
  }

  return (
    <div className="flex h-screen flex-col">
      {/* 헤더 */}
      <Header isMain={isMain} />

      <main className="flex-1">
        <Outlet />
      </main>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default MainLayout;
