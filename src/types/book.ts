export interface BaseBook {
  bookIdx: number;
  bookName: string;
  bookImageName: string;
  author: string;
  bsIdx: number;
}

export interface BookItem extends BaseBook {
  bsName: string;
}

export interface BookDetail extends BaseBook {
  bookContent: string;
  link: string;
  bookImageName: string;
}

export interface BookImg {
  bookIdx: number;
  fileName: string;
}

export interface Book {
  bookIdx: number;
  bookName: string;
  author: string;
  bsIdx: number;
  bookImageName: string;
}
