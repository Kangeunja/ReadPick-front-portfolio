 export interface BookItem {
  bookIdx: number;
  bsIdx: number;
  bookName: string;
  bookImageName: string;
  bsName: string;
  author?: string;
}

export interface FeatureBook {
  book: string;
  author: string;
}