import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getUserReviews } from '../../api/reviewApi';
import { getMoreReviewList, getReviewList } from '../../api/bookDetailApi';

export const useReviewQuery = () => {
  return useQuery({
    queryKey: ['myReviews'],
    queryFn: getUserReviews,
  });
};

export const useReviewListQuery = (bookIdx: number, reviewCount: number) => {
  return useInfiniteQuery({
    queryKey: ['reviewList', bookIdx],
    queryFn: async ({ pageParam }) => {
      if (pageParam === null) {
        return getReviewList(bookIdx);
      }
      return getMoreReviewList(pageParam);
    },
    initialPageParam: null as number | null,

    getNextPageParam: (lastPage, allPage) => {
      if (!lastPage || lastPage.length === 0) return null;
      const totalFetchedReviews = allPage.reduce((sum, page) => sum + page.length, 0);

      if (totalFetchedReviews >= reviewCount) {
        return null;
      }
      // 다음 페이지를 불러올 때 사용할 열쇠로 마지막 리뷰의 rvIdx를 지정
      return lastPage[lastPage.length - 1].rvIdx;
    },
    enabled: bookIdx !== null,
  });
};
