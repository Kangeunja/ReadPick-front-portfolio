import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertReview } from '../../api/reviewApi';

export const useInsertReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertReview,
    onSuccess: () => {
      // if (res === 'success') {
      //   queryClient.invalidateQueries({
      //     queryKey: ['reviewList', bookIdx],
      //   });
      //   queryClient.invalidateQueries({
      //     queryKey: ['bookDetail', bookIdx],
      //   });
      // }
    },
  });
};
