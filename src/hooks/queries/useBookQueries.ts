import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
  getTodayBook,
  getUserGenreBooks,
  getBookDetail,
  getBookImages,
  checkRecommend,
  getBookRecommendCount,
  checkBookmark,
} from 'api/bookApi';
import { getReviewCount } from 'api/reviewApi';

// 오늘의 책
export const useTodayBookQuery = () => {
  return useQuery({
    queryKey: ['todayBook'],
    queryFn: getTodayBook,
  });
};

// 추천 책
export const useGenreBooksQuery = (isLogin: boolean) => {
  return useQuery({
    queryKey: ['userGenreBook'],
    queryFn: getUserGenreBooks,
    enabled: isLogin, // 로그인한 사용자에 대해서만 쿼리 실행
  });
};

// 책 상세 페이지 통합 쿼리
export const useBookDetailQueries = () => {
  const { bookIdx } = useParams();
  const bookIdxNumber = bookIdx ? Number(bookIdx) : 0;

  const enabled = !!bookIdx && !isNaN(bookIdxNumber);

  // 책 상세 정보 쿼리
  const bookDetail = useQuery({
    queryKey: ['bookDetail', bookIdxNumber],
    queryFn: async () => getBookDetail(bookIdxNumber),
    enabled,
  });

  // 책 이미지 쿼리
  const bookImg = useQuery({
    queryKey: ['bookImg', bookIdxNumber],
    queryFn: async () => getBookImages(bookIdxNumber),
    enabled,
  });

  // 책 추천 여부 쿼리
  const isRecommend = useQuery({
    queryKey: ['isRecommend', bookIdxNumber],
    queryFn: async () => checkRecommend(bookIdxNumber),
    enabled,
  });

  // 책 추천 수 쿼리
  const recommedCount = useQuery({
    queryKey: ['recommedCount', bookIdxNumber],
    queryFn: async () => getBookRecommendCount(bookIdxNumber),
    enabled,
  });

  // 찜 여부 쿼리
  const isBookmark = useQuery({
    queryKey: ['isBookmark', bookIdxNumber],
    queryFn: async () => checkBookmark(bookIdxNumber),
    enabled,
  });

  // 리뷰 수 쿼리
  const reviewCount = useQuery({
    queryKey: ['reviewCount', bookIdxNumber],
    queryFn: async () => getReviewCount(bookIdxNumber),
    enabled,
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
