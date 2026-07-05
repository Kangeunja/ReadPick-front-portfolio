import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthStore } from 'store/authStore';

import { ROUTES } from 'constants/routes';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  const hasSessionHint = localStorage.getItem('isLoggedInHint') === 'true';
  // const hasToken = !!localStorage.getItem('accessToken');

  if (hasSessionHint && !user) {
    return <div>권한 확인 중...</div>;
  }

  // 인증 실패
  if (!user && !hasSessionHint) {
    return <Navigate to={ROUTES.MAIN} replace />;
  }

  // 인증 성공
  return <>{children}</>;
};

export default ProtectedRoute;
