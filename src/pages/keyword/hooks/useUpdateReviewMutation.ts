import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReview } from '../../../api/reviewApi';

export const useUpdateReviewMutation = (bookIdx: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReview,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['myReviews'] });
    //   queryClient.invalidateQueries({ queryKey: ['reviewList', bookIdx] });
    //   queryClient.invalidateQueries({ queryKey: ['bookDetail', bookIdx] });
    // },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ['myReviews'],
    //   });
    //   queryClient.invalidateQueries({ queryKey: ['reviewList', bookIdx] });
    // },
  });
};
