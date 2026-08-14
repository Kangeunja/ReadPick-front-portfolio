import api from './axiosInstance';
import { BookBuddyRequest, BookBuddyResponse } from 'types/chat';
import {
  Review,
  insertReviewParams,
  UpdateReviewParams,
  ReviewSummaryResponse,
  ReviewArrayRequest,
  ReviewRealtimeParams,
} from 'types/review';

// export interface TagRecommendResponse {
//   tags: string[];
// }

// export interface SingleReviewRequest {
//   reviewText: string;
//   title?: string;
//   author?: string;
//   genre?: string;
// }

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

// 리뷰 더보기 api
export const getMoreReviewList = async (lastRvIdx: number): Promise<Review[]> => {
  const res = await api.get('/reviewMore', { params: { rvIdx: lastRvIdx } });
  return res.data;
};

// 내 리뷰 조회 api
export const getUserReviews = async (): Promise<Review[]> => {
  const res = await api.get('/userReviewBook');
  return res.data;
};

// 리뷰 작성 api
export const insertReview = async (data: insertReviewParams) => {
  const res = await api.post('/reviewInsert', data);
  return res.data;
};

// 리뷰 수정 api
export const updateReview = async (data: UpdateReviewParams) => {
  const res = await api.post('/reviewUpdate', data);
  return res.data;
};

// 리뷰 삭제 api
export const deleteReview = async (bookIdx: number) => {
  const res = await api.get('/reviewDelete', {
    params: { bookIdx },
  });
  return res.data;
};

// 리뷰 신고 api
export const reportReview = async (rvIdx: number) => {
  const res = await api.get('/reportReview', { params: { rvIdx: rvIdx } });
  return res.data;
};

// 리뷰 요약 API
export const getReviewSummary = async (data: ReviewArrayRequest): Promise<ReviewSummaryResponse> => {
  const res = await api.post('/review/summary-all', data);
  return res.data.data;
  // try {
  //   return res.data?.data || { summary: '', tags: [] };
  // } catch (error: any) {
  //   const status = error?.response?.status;

  //   if (status === 429) {
  //     return {
  //       summary: '리뷰 요약을 잠시 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.',
  //       tags: [],
  //     };
  //   }

  //   return {
  //     summary: '리뷰 요약을 불러올 수 없습니다.',
  //     tags: [],
  //   };
  // }
};

// AI 북버디 Q&A API
export const getBookBuddyReply = async (data: BookBuddyRequest): Promise<BookBuddyResponse> => {
  const res = await api.post('/review/book-buddy', data);
  return res.data.data;
};

// 실시간 리뷰 조회 api
export const getRealtimeReviews = async (): Promise<ReviewRealtimeParams[]> => {
  const res = await api.get('/review/realtime');
  return res.data.data;
};
