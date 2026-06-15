import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reportReview, toggleBookmark, toggleRecommend } from '../../api/bookDetailApi';

export const useBookActionsMutation = (bookIdx: number) => {
  const queryClient = useQueryClient();

  // 추천 mutation
  const { mutate: recommendMutation } = useMutation({
    mutationFn: () => toggleRecommend(bookIdx),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isRecommend', bookIdx] });
      queryClient.invalidateQueries({ queryKey: ['recommedCount', bookIdx] });
    },
  });

  // 찜 mutation
  const { mutate: bookmarkMutation } = useMutation({
    mutationFn: () => toggleBookmark(bookIdx),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isBookmark', bookIdx] });
    },
  });

  // 신고 mutation
  const { mutate: reportReviewMutation } = useMutation({
    mutationFn: (rvIdx: number) => reportReview(rvIdx),
    onSuccess: () => {
      alert('신고가 정상적으로 접수되었습니다.');
    },
    onError: (error) => {
      console.error('신고 실패:', error);
    },
  });

  return { recommendMutation, bookmarkMutation, reportReviewMutation };
};
