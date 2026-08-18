import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview, insertReview, updateReview } from 'api/reviewApi';

// 리뷰 작성 훅
export const useInsertReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mainData'] });
    },
  });
};

// 리뷰 수정 훅
export const useUpdateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mainData'] });
    },
  });
};

// 리뷰 삭제 훅
export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mainData'] });
    },
  });
};
