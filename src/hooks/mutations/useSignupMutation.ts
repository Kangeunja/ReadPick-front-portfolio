import { useMutation } from '@tanstack/react-query';
import { signup } from '../../api/authApi';

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signup,
  });
};
