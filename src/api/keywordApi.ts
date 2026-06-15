import api from './axiosInstance';
import { Book, BookImg } from '../types/book';
import { BsItem } from '../types/keyword';

// 소분류 키워드 리스트 조회 api
export const getKeywordList = async () => {
  const res = await api.get('/bssListByBsIdx');
  return res.data;
};

export const getMainKeywordList = async (): Promise<BsItem[]> => {
  const res = await api.get('/bsList');
  return res.data;
};

export const fetchBooksByBsIdx = async (bsIdx: number): Promise<{ books: Book[]; images: BookImg[] }> => {
  const [listRes, imgRes] = await Promise.all([
    api.get('/bookListByBsIdx', { params: { bsIdx } }),
    api.get('/bsImageList', { params: { bsIdx } }),
  ]);
  return { books: listRes.data, images: imgRes.data };
};

export const fetchBooksByBssIdx = async (bssIdx: number): Promise<{ books: Book[]; images: BookImg[] }> => {
  const [listRes, imgRes] = await Promise.all([
    api.get('/bookListByBssIdx', { params: { bssIdx } }),
    api.get('/bssImageList', { params: { bssIdx } }),
  ]);
  return { books: listRes.data, images: imgRes.data };
};

export const searchBooks = async (option: string, keyword: string): Promise<Book[]> => {
  const point = option === '도서명' ? '/bookNameSearch' : '/authorSearch';
  const params = option === '도서명' ? { bookName: keyword } : { author: keyword };
  const res = await api.get(point, { params });
  return res.data;
};
