import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isMain = location.pathname === "/";
  return (
    <div className={`layout ${isMain ? "layout--main" : ""}`}>
      {/* 헤더 */}
      <Header />
      <main className="content-wrap">
        <Outlet />
      </main>
      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default Layout;
