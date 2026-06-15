import { useMutation } from '@tanstack/react-query';

import { login } from '../../api/authApi';

import useAuthStore from '../../store/authStore';

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
