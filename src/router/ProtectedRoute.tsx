import { ReactNode } from "react";

import { Navigate } from "react-router-dom";

import useAuthStore from "../store/authStore";

import { ROUTES } from "../constants/routes";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((state) => state.user);

  // 인증 실패
  if (!user) {
    return <Navigate to={ROUTES.MAIN} replace />;
  }

  // 인증 성공
  return <>{children}</>;
};

export default ProtectedRoute;
