import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup, checkIdApi, login, logout } from 'api/authApi';
import { useAuthStore } from 'store/authStore';

// 회원가입
export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signup,
  });
};

// 아이디 중복확인
export const useCheckIdMutation = () => {
  return useMutation({
    mutationFn: checkIdApi,
  });
};

// 로그인
export const useLoginMutation = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (res === 'fail') return;

      const { pw, ...user } = res;
      setUser(user);
    },
  });
};

// 로그아웃
export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const clearUser = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearUser();

      queryClient.clear(); // React Query가 메모리에 들고 있는 다른 api 데이터가 남아있는 잔상을 다 없애려면 사용.
    },
  });
};
