import { useNavigate } from 'react-router-dom';

import { useKeywordBooksQuery } from 'hooks/queries/useKeywordQueries';
import { useBookSearchParams } from 'hooks/useBookSearchParams';
import { ROUTES } from 'constants/routes';

export const useKeywordBookList = () => {
  const navigate = useNavigate();

  // URL 파라미터 추출
  const { bsIdx, bssIdx, option, keyword } = useBookSearchParams();
  const { data, isLoading } = useKeywordBooksQuery({ bsIdx, bssIdx, option, keyword });

  // ===== 이벤트 핸들러 =====
  const handleCategoryChange = (type: string, idx: number) => {
    const path = type === 'bs' ? `${ROUTES.KEYWORD}/?bsIdx=${idx}` : `/member/keyword?bsIdx=${bsIdx}&bssIdx=${idx}`;
    navigate(path);
  };

  // ===== 상세 페이지 이동 =====
  const goToDetail = (bookIdx: number) => {
    const detailPath = `${ROUTES.KEYWORD}/detail/${bookIdx}?bsIdx=${bsIdx}${bssIdx ? `&bssIdx=${bssIdx}` : ''}`;
    navigate(detailPath);
  };

  return {
    bsIdx,
    bssIdx,
    keyword,
    books: data?.books || [],
    images: data?.images || [],
    isLoading,
    handleCategoryChange,
    goToDetail,
  };
};
