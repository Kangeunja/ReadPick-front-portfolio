import { useMutation } from '@tanstack/react-query';
import { deleteReview, insertReview, updateReview } from 'api/reviewApi';

// 리뷰 작성 훅
export const useInsertReviewMutation = () => {
  return useMutation({
    mutationFn: insertReview,
  });
};

// 리뷰 수정 훅
export const useUpdateReviewMutation = () => {
  return useMutation({
    mutationFn: updateReview,
  });
};

// 리뷰 삭제 훅
export const useDeleteReviewMutation = () => {
  return useMutation({
    mutationFn: deleteReview,
  });
};
