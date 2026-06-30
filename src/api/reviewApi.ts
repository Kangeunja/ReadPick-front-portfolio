import api from './axiosInstance';
import { insertReviewParams, Review, UpdateReviewParams } from '../types/review';

// 총 리뷰 수 api
export const getReviewCount = async (bookIdx: number): Promise<number> => {
  const res = await api.get(`/reviewCount`, { params: { bookIdx } });
  return res.data;
};

// 리뷰 리스트 api
export const getReviewList = async (bookIdx: number): Promise<Review[]> => {
  const res = await api.get('/reviewList', { params: { bookIdx } });
  return res.data;
};

export const getMoreReviewList = async (lastRvIdx: number): Promise<Review[]> => {
  const res = await api.get('/reviewMore', { params: { rvIdx: lastRvIdx } });
  return res.data;
};

export const reportReview = async (rvIdx: number) => {
  const res = await api.get('reportReview', { params: { rvIdx: rvIdx } });
  return res.data;
};

export const getUserReviews = async (): Promise<Review[]> => {
  const res = await api.get('/userReviewBook');
  return res.data;
};

export const insertReview = async (data: insertReviewParams) => {
  const res = await api.post('/reviewInsert', data);
  return res.data;
};

export const updateReview = async (data: UpdateReviewParams) => {
  const res = await api.post('/reviewUpdate', data);
  return res.data;
};

export const deleteReview = async (bookIdx: number) => {
  const res = await api.get('/reviewDelete', {
    params: { bookIdx },
  });
  return res.data;
};
