import api from './axiosInstance';
import { insertReviewParams, Review, UpdateReviewParams } from '../types/review';

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
