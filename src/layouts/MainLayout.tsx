import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useAuthQuery } from 'hooks/queries/useAuthQuery';
import { useAuthStore } from 'store/authStore';

import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  const location = useLocation();
  const isMain = location.pathname === '/';

  const isInitialized = useAuthStore((state) => state.isInitialized);
  const setInitialized = useAuthStore((state) => state.setInitialized);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  // 앱 시작시 로그인 상태 검증
  const { data, isSuccess, isError, isFetching } = useAuthQuery();

  useEffect(() => {
    // 로그인을 안한 유저 상태
    if (!data && !isSuccess && !isError && !isFetching) {
      logout();
      setInitialized(true);
      return;
    }

    // 로그인을 한 유저 상태
    if (isSuccess && data) {
      setUser(data);
    }

    // 세션이 만료되었거나 서버가 터진 상태
    if (isError) {
      logout();
    }
  }, [data, isSuccess, isError, isFetching, setUser, logout, setInitialized]);

  // 전역 장치
  if (!isInitialized || isFetching) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="font-gowun text-[20px] text-[#454545]">로그인 상태 확인 중... 🔐</p>
      </div>
    );
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
