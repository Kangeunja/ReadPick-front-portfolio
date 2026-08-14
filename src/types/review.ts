import { BookDetail, BookImg } from './book';

export interface Review {
  nickName: string;
  regDate: string;
  fileName: string;
  rvIdx: number;
  userIdx: number;
  bookImageName: string;
  bookName: string;
  author: string;
  bookIdx: number;
  content: string;
  book: BookDetail;
  bookImage: BookImg;
}

export interface insertReviewParams {
  bookIdx: number;
  content: string;
}

export interface UpdateReviewParams {
  bookIdx: number;
  content: string;
}

// export interface ReviewAnalysisRequest {
//   reviewText: string;
//   title?: string;
//   author?: string;
//   genre?: string;
// }

export interface ReviewArrayRequest {
  reviews: string[];
  title?: string;
  author?: string;
  genre?: string;
}

export interface ReviewSummaryResponse {
  summary: string;
  tags: string[];
}

export interface ReviewRealtimeParams {
  id: number;
  bookIdx: number;
  bookTitle: string;
  bookCoverUrl: string;
  reviewText: string;
  userProfileUrl: string;
  userNickname: string;
  createdAt: string;
}
