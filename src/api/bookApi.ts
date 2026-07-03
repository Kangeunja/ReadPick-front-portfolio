import api from './axiosInstance';
import { BookItem, BookDetail, BookImg } from 'types/book';

// 오늘의 책 api
export const getTodayBook = async (): Promise<BookItem> => {
  const res = await api.get('/todayBook');
  return res.data;
};

// 추천 책 api
export const getUserGenreBooks = async (): Promise<BookItem[]> => {
  const res = await api.get('/userGenreBook');
  return res.data;
};

// 책 상세 정보 api
export const getBookDetail = async (bookIdx: number): Promise<BookDetail> => {
  const res = await api.get(`/bookOne`, { params: { bookIdx } });
  return res.data;
};

// 책 이미지 api
export const getBookImages = async (bookIdx: number): Promise<BookImg> => {
  const res = await api.get(`/bookImageOne`, { params: { bookIdx } });
  return res.data;
};

// 책 추천 여부 api (Y/N)
export const checkRecommend = async (bookIdx: number): Promise<boolean> => {
  const res = await api.get(`/isRec`, { params: { bookIdx } });
  return res.data === 'Y';
};

// 책 추천 수 api
export const getBookRecommendCount = async (bookIdx: number) => {
  const res = await api.get(`/recCount`, { params: { bookIdx } });
  return res.data;
};

// 찜 여부 확인 api (Y/N)
export const checkBookmark = async (bookIdx: number): Promise<boolean> => {
  const res = await api.get(`/isBookmark`, { params: { bookIdx } });
  return res.data === 'Y';
};

// 책 추천해요 토글 api
export const toggleRecommend = async (bookIdx: number): Promise<boolean> => {
  const res = await api.post(`/recommend`, null, { params: { bookIdx } });
  return res.data === '추천완료';
};

// 찜해요 토클 api
export const toggleBookmark = async (bookIdx: number): Promise<boolean> => {
  const res = await api.post(`/bookmark`, null, { params: { bookIdx } });
  return res.data === '북마크추가완료';
};
