export interface BaseBook {
  bookIdx: number;
  bookName: string;
  bookImageName: string;
  author: string;
}

export interface BookItem extends BaseBook {
  bsIdx: number;
  bsName: string;
}

export interface BookDetail extends BaseBook {
  bookContent: string;
  link: string;
  bookImageName: string;
}

export interface BaseBookImg {}
export interface BookImg {
  bookIdx: number;
  fileName: string;
}

// export interface BookImg {
//   bookIdx: number;
//   fileIdx: number;
//   fileName: string;
//   fileType: string | null;
//   bookImageName?: string;
// }

export interface Book {
  bookIdx: number;
  bookName: string;
  author: string;
  bsIdx: number;
  bookImageName: string;
}
