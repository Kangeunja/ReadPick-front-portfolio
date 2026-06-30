import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertReview } from '../../api/reviewApi';

export const useInsertReviewMutation = (bookIdx: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertReview,

    // onSuccess: async () => {
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   queryClient.invalidateQueries({ queryKey: ['myReviews'] });
    //   queryClient.invalidateQueries({ queryKey: ['reviewList', bookIdx] });
    //   queryClient.invalidateQueries({ queryKey: ['bookDetail', bookIdx] });
    //   // if (res === 'success') {
    //   //   queryClient.invalidateQueries({
    //   //     queryKey: ['reviewList', bookIdx],
    //   //   });
    //   //   queryClient.invalidateQueries({
    //   //     queryKey: ['bookDetail', bookIdx],
    //   //   });
    //   // }
    // },
  });
};
