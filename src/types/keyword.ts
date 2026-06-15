export interface BsItem {
  bsIdx: number;
  bsName: string;
  bssList: {
    bssIdx: number;
    bssName: string;
  }[];
}

export interface KeywordParams {
  bsIdx: string | null;
  bssIdx: string | null;
  option: string | null;
  keywordText: string | null;
}
