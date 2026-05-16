export interface Book {
  bookIdx: number;
  bookName: string;
  author: string;
  bsIdx: number;
  bookImageName?: string;
}

export interface BookImg {
  bookIdx: number;
  fileIdx: number;
  fileName: string;
  fileType: string | null;
  bookImageName?: string;
}
