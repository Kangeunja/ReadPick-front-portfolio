// react
import { useEffect } from "react";

// router
import { Outlet, useLocation } from "react-router-dom";

// components
import Header from "./Header";
import Footer from "./Footer";

// hooks
import { useAuthQuery } from "../hooks/queries/useAuthQuery";

// store
import useAuthStore from "../store/authStore";

const MainLayout = () => {
  const location = useLocation();
  const isMain = location.pathname === "/";

  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  // 앱 시작시 로그인 상태 검증
  const { data, isError } = useAuthQuery();

  useEffect(() => {
    if (data) {
      setUser(data);
    }

    if (isError) {
      logout();
    }
  }, [data, isError, setUser, logout]);

  return (
    <div
      className={`
        flex flex-col 
        h-screen group 
        ${isMain ? "layout--main" : ""}`}
    >
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
