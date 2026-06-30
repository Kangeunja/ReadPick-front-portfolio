import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview } from '../../api/reviewApi';

export const useDeleteReviewMutation = (bookIdx: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,

    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['myReviews'] });
    //   queryClient.invalidateQueries({ queryKey: ['bookDetail', bookIdx] });
    //   queryClient.invalidateQueries({ queryKey: ['reviewCount', bookIdx] });

    //   queryClient.resetQueries({
    //     queryKey: ['reviewList', bookIdx],
    //     exact: true,
    //   });
    // },
  });
};
