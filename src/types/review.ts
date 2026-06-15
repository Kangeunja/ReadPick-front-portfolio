import { Book, BookImg } from './book';

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

  book: Book;
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
