import { useQuery } from '@tanstack/react-query';
import { fetchBooksByBsIdx, fetchBooksByBssIdx, getKeywordList, getMainKeywordList, searchBooks } from '../../api/keywordApi';
import { KeywordParams } from '../../types/keyword';

// 소분류 키워드 전체 목록 조회
export const useKeywordQuery = () => {
  return useQuery({
    queryKey: ['keyword'],
    queryFn: getKeywordList,
  });
};

// 대분류 키워드 전체 목록 조회
export const useBsListQuery = () => {
  return useQuery({
    queryKey: ['bsList'],
    queryFn: getMainKeywordList,
  });
};

// 키워드/검색 기반 책 목록 조회
export const useKeywordBooksQuery = ({ bssIdx, bsIdx, option, keywordText }: KeywordParams) => {
  return useQuery({
    queryKey: ['keywordBooks', { bssIdx, bsIdx, option, keywordText }],
    queryFn: async () => {
      // 검색 옵션과 키워드가 모두 존재할 때만 검색 API 호출
      if (option && keywordText) {
        const books = await searchBooks(option, keywordText);
        return { books, images: [] }; // 검색 결과에는 이미지가 없으므로 빈 배열 반환
      }
      if (bssIdx) {
        return await fetchBooksByBssIdx(Number(bssIdx));
      }

      if (bsIdx) {
        return await fetchBooksByBsIdx(Number(bsIdx));
      }
      return { books: [], images: [] }; // 기본값으로 빈 배열 반환
    },
  });
};
