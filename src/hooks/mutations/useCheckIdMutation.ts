import { useMutation } from '@tanstack/react-query';
import { checkIdApi } from '../../api/authApi';

export const useCheckIdMutation = () => {
  return useMutation({
    mutationFn: checkIdApi,
  });
};
