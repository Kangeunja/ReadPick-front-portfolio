export interface BookItem {
  bookIdx: number;
  bsIdx: number;
  bookName: string;
  bookImageName: string;
  bsName: string;
  author: string;
}

export interface BookImg {
  bookIdx: number;
  fileIdx: number;
  fileName: string;
  fileType: string | null;
  bookImageName?: string;
}

export interface Book {
  bookIdx: number;
  bookName: string;
  author: string;
  bsIdx: number;
  bookImageName?: string;
}

export interface BookDetail {
  author: string;
  bookName: string;
  bookContent: string;
  bookIdx: number;
  link: string;
  bookImageName: string;
}

export interface BookImg {
  fileName: string;
}
