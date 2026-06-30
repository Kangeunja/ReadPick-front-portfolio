import api from './axiosInstance';
import { BookItem, BookDetail, BookImg } from '../types/book';

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
