import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getReviewList, getMoreReviewList } from 'api/reviewApi';

// 리뷰 목록 조회 쿼리
export const useReviewListQuery = (totalCount: number = 0) => {
  const { bookIdx } = useParams();
  const bookIdxNumber = bookIdx ? Number(bookIdx) : 0;

  return useInfiniteQuery({
    queryKey: ['reviewList', bookIdxNumber],
    queryFn: async ({ pageParam }) => {
      if (pageParam === null) {
        return getReviewList(bookIdxNumber); // 첫 페이지 요청
      }
      return getMoreReviewList(pageParam); // 추가 페이지 요청
    },

    initialPageParam: null as number | null,

    getNextPageParam: (lastPage, allPage) => {
      if (!lastPage || lastPage.length === 0) return null;
      const totalFetchedReviews = allPage.reduce((sum, page) => sum + page.length, 0);

      if (totalFetchedReviews >= totalCount) {
        return null;
      }
      // 다음 페이지를 불러올 때 사용할 열쇠로 마지막 리뷰의 rvIdx를 지정
      return lastPage[lastPage.length - 1].rvIdx;
    },
    enabled: bookIdx !== null,
  });
};
