export interface Book {
  bookIdx: number;
  bookName: string;
  author: string;
}

export interface BookNames {
  bookName: string;
  author: string;
  bookIdx: number;
}

export interface SubBookNames {
  bookName: string;
  author: string;
  bookIdx: number;
}

export interface SearchResult {
  author: string;
  bookName: string;
  bookImageName: String;
  bookIdx: number;
}
