import { useQuery } from '@tanstack/react-query';
import {
  checkBookmark,
  checkRecommend,
  getBookDetail,
  getBookImages,
  getBookRecommendCount,
  getReviewCount,
} from '../../api/bookDetailApi';

export const useBookDetailQueries = (bookIdx: number) => {
  const enabled = !!bookIdx && !isNaN(bookIdx);

  const bookDetail = useQuery({
    queryKey: ['bookDetail', bookIdx],
    queryFn: async () => getBookDetail(bookIdx),
    enabled,
  });

  const bookImg = useQuery({
    queryKey: ['bookImg', bookIdx],
    queryFn: async () => getBookImages(bookIdx),
    enabled,
  });

  // 책 추천 여부 쿼리
  const isRecommend = useQuery({
    queryKey: ['isRecommend', bookIdx],
    queryFn: async () => checkRecommend(bookIdx),
  });

  // 책 추천 수 쿼리
  const recommedCount = useQuery({
    queryKey: ['recommedCount', bookIdx],
    queryFn: async () => getBookRecommendCount(bookIdx),
    enabled,
  });

  // 찜 여부 쿼리
  const isBookmark = useQuery({
    queryKey: ['isBookmark', bookIdx],
    queryFn: async () => checkBookmark(bookIdx),
    enabled,
  });

  const reviewCount = useQuery({
    queryKey: ['reviewCount', bookIdx],
    queryFn: async () => getReviewCount(bookIdx),
  });

  return {
    bookDetail,
    bookImg,
    isRecommend,
    recommedCount,
    isBookmark,
    reviewCount,
  };
};
