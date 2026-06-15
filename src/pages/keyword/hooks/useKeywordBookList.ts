import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';

import { useKeywordBooksQuery } from '../../../hooks/queries/useKeywordQueries';

export const useKeywordBookList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // URL 파라미터 추출
  const bsIdx = queryParams.get('bsIdx');
  const bssIdx = queryParams.get('bssIdx');
  const option = queryParams.get('option');
  const keywordText = queryParams.get('keyword');

  const { data, isLoading } = useKeywordBooksQuery({ bssIdx, bsIdx, option, keywordText });

  // 이벤트 핸들러
  const handleCategoryChange = (type: string, idx: number) => {
    const path = type === 'bs' ? `${ROUTES.KEYWORD}/?bsIdx=${idx}` : `/member/keyword?bsIdx=${bsIdx}&bssIdx=${idx}`;
    navigate(path);
  };

  const goToDetail = (bookIdx: number) => {
    const detailPath = `${ROUTES.KEYWORD}/detail/${bookIdx}?bsIdx=${bsIdx}${bssIdx ? `&bssIdx=${bssIdx}` : ''}`;
    navigate(detailPath);
  };

  return {
    handleCategoryChange,
    goToDetail,
    books: data?.books || [],
    images: data?.images || [],
    isLoading,
    keywordText,
    bsIdx,
    bssIdx,
  };
};
