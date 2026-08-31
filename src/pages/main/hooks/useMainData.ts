import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import axiosInstance from 'api/axiosInstance';

import { ROUTES } from 'constants/routes';
import { useAuthStore } from 'store/authStore';

import { useGenreBooksQuery } from 'hooks/queries/useBookQueries';
import { useReviewRealtimeQuery } from './useReviewRealtimeQuery';

export const useMainData = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLogin = !!user?.userIdx; // 사용자 로그인 여부

  const [selectedKeywordIdx, setSelectedKeywordIdx] = useState<number | null>(null);

  // const { data: todayBookData, isLoading: isTodayLoading } = useTodayBookQuery();
  // const { data: keywordListData = [], isLoading: isKeywordLoading } = useBsListQuery();

  const { data: mainContentData, isLoading: isMainLoading } = useQuery({
    queryKey: ['mainData'],
    queryFn: async () => {
      const res = await axiosInstance.get('/main');
      return res.data.data;
    },
  });
  const { data: realtimeData = [], isLoading: isRealLoading } = useReviewRealtimeQuery(); // 실시간 리뷰 데이터
  const { data: genreBookData = [], isLoading: isGenreLoading } = useGenreBooksQuery(isLogin); // 추천 도서 데이터

  const todayBookData = mainContentData?.todayBook; // 오늘의 책 데이터
  const keywordListData = useMemo(() => mainContentData?.bsList || [], [mainContentData?.bsList]); // 키워드 리스트 데이터

  // 상세 페이지 이동함수
  const gotoDetail = useCallback(
    (bookIdx: number, bsIdx: number) => {
      if (!bookIdx || !bsIdx) return;
      navigate(`${ROUTES.KEYWORD}/detail/${bookIdx}?bsIdx=${bsIdx}`);
    },
    [navigate],
  );

  // 키워드별 페이지이동
  const handleChipClick = useCallback(
    (bsIdx: number) => {
      setSelectedKeywordIdx(bsIdx);
      navigate(`${ROUTES.KEYWORD}/?bsIdx=${bsIdx}`);
    },
    [navigate],
  );

  const handleCtaClick = useCallback(() => {
    if (!isLogin) {
      navigate(ROUTES.LOGIN);
    } else {
      handleChipClick(keywordListData[0]?.bsIdx);
    }
  }, [isLogin, navigate, keywordListData, handleChipClick]);

  return {
    isLogin,
    todayBookData,
    keywordListData,
    genreBookData,
    realtimeData,
    isRealLoading,
    isGenreLoading,
    isMainLoading,
    selectedKeywordIdx,
    gotoDetail,
    handleChipClick,
    handleCtaClick,
  };
};
