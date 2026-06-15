import { useNavigate } from 'react-router-dom';

import { useTodayBookQuery } from '../../../hooks/queries/useTodayBookQuery';

import { useGenreBooksQuery } from '../../../hooks/queries/useGenreBooksQuery';
import { ROUTES } from '../../../constants/routes';
import useAuthStore from '../../../store/authStore';
import { useBsListQuery } from '../../../hooks/queries/useKeywordQueries';

export const useMainData = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLogin = !!user?.userIdx; // 사용자 로그인 여부

  // 메인페이지 진입 시 필요한 데이터들을 한 번에 불러오는 함수
  const { data: todayBookData, isLoading: isTodayLoading } = useTodayBookQuery();
  const { data: keywordListData = [], isLoading: isKeywordLoading } = useBsListQuery();
  const { data: genreBookData = [], isLoading: isGenreLoading } = useGenreBooksQuery(isLogin);

  const isLoading = isTodayLoading || isKeywordLoading || (isLogin && isGenreLoading); // 로그인한 사용자에 대해서만 장르별 도서 로딩 상태 고려

  // 상세 페이지 이동함수
  const gotoDetail = (bookIdx: number, bsIdx: number) => {
    if (!bookIdx || !bsIdx) return;
    navigate(`${ROUTES.KEYWORD}/detail/${bookIdx}?bsIdx=${bsIdx}`);
  };

  // 키워드별 페이지이동
  const handleKeyWordIdx = (bsIdx: number) => {
    navigate(`${ROUTES.KEYWORD}/?bsIdx=${bsIdx}`);
  };

  return {
    isLogin,
    todayBookData,
    keywordListData,
    genreBookData,
    isLoading,
    gotoDetail,
    handleKeyWordIdx,
  };
};
