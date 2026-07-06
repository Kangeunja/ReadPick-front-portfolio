import { useQuery } from '@tanstack/react-query';
import { getAuthUser } from 'api/authApi';

export const useAuthQuery = () => {
  const hasSessionHint = localStorage.getItem('isLoggedInHint') === 'true';

  return useQuery({
    queryKey: ['auth'],
    queryFn: getAuthUser,
    enabled: hasSessionHint,
    retry: false, // 인증 에러는 재시도할 필요가 없기 때문에 false
    refetchOnWindowFocus: true,
    meta: {
      silentError: true,
    },
    staleTime: 0,
    gcTime: 1000 * 60 * 60,
  });
};
