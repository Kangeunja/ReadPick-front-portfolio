import api from './axiosInstance';

import { SearchCategory } from 'types/keyword';
import { BookItem, BookImg } from 'types/book';

// 소분류 키워드 리스트 조회 api
export const getSubCategoryList = async () => {
  const res = await api.get('/bssListByBsIdx');
  return res.data;
};

export const getMainKeywordList = async (): Promise<SearchCategory[]> => {
  const res = await api.get('/bsList');
  return res.data;
};

// 검색 api
export const searchBooks = async (option: string, keyword: string): Promise<BookItem[]> => {
  const point = option === '도서명' ? '/bookNameSearch' : '/authorSearch';
  const params = option === '도서명' ? { bookName: keyword } : { author: keyword };
  const res = await api.get(point, { params });
  return res.data;
};

// 대분류 api
export const fetchBooksByBsIdx = async (bsIdx: number): Promise<{ books: BookItem[]; images: BookImg[] }> => {
  const [listRes, imgRes] = await Promise.all([
    api.get('/bookListByBsIdx', { params: { bsIdx } }),
    api.get('/bsImageList', { params: { bsIdx } }),
  ]);
  return { books: listRes.data, images: imgRes.data };
};

// 소분류 api
export const fetchBooksByBssIdx = async (bssIdx: number): Promise<{ books: BookItem[]; images: BookImg[] }> => {
  const [listRes, imgRes] = await Promise.all([
    api.get('/bookListByBssIdx', { params: { bssIdx } }),
    api.get('/bssImageList', { params: { bssIdx } }),
  ]);
  return { books: listRes.data, images: imgRes.data };
};
