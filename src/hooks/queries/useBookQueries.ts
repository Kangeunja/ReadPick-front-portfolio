import { getTodayBook, getUserGenreBooks } from 'api/bookApi';
import { useQuery } from '@tanstack/react-query';

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
