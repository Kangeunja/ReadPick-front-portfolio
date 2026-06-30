import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import useAuthStore from '../store/authStore';

import { ROUTES } from '../constants/routes';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  const hasToken = !!localStorage.getItem('accessToken');
  console.log(user);
  console.log(hasToken);

  if (hasToken && !user) {
    return <div>권한 확인 중...</div>;
  }

  // 인증 실패
  if (!user && !hasToken) {
    return <Navigate to={ROUTES.MAIN} replace />;
  }

  if (!user && hasToken) {
    return <div>권한 확인 중...</div>;
  }

  // 인증 성공
  return <>{children}</>;
};

export default ProtectedRoute;
