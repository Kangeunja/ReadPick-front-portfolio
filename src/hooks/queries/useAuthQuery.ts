import { useQuery } from '@tanstack/react-query';
import { getAuthUser } from 'api/authApi';

export const useAuthQuery = () => {
  // 토큰이 있을 때만 서버에 로그인 연장/검증 요청
  // const hasToken = !!localStorage.getItem('accessToken');

  return useQuery({
    queryKey: ['auth'],
    queryFn: getAuthUser,
    enabled: true,
    retry: false, // 인증 에러는 재시도할 필요가 없기 때문에 false
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 1000 * 60 * 60,
  });
};
