import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { reportReview } from 'api/reviewApi';
import { toggleBookmark, toggleRecommend } from 'api/userPickApi';

export const useBookActionsMutation = () => {
  const queryClient = useQueryClient();

  const { bookIdx } = useParams();
  const bookIdxNumber = bookIdx ? Number(bookIdx) : 0;

  // 추천 mutation
  const { mutate: recommendMutation } = useMutation({
    mutationFn: () => toggleRecommend(bookIdxNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isRecommend', bookIdxNumber] });
      queryClient.invalidateQueries({ queryKey: ['recommedCount', bookIdxNumber] });
    },
  });

  // 찜 mutation
  const { mutate: bookmarkMutation } = useMutation({
    mutationFn: () => toggleBookmark(bookIdxNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isBookmark', bookIdxNumber] });
    },
  });

  // 신고 mutation
  const { mutate: reportReviewMutation } = useMutation({
    mutationFn: (rvIdx: number) => reportReview(rvIdx),
    onSuccess: () => {},
    onError: (error) => {
      console.error('신고 실패:', error);
    },
  });

  return { recommendMutation, bookmarkMutation, reportReviewMutation };
};
