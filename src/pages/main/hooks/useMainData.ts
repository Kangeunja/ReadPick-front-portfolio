import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import axiosInstance from 'api/axiosInstance';

import { ROUTES } from 'constants/routes';
import { useAuthStore } from 'store/authStore';

import { useBsListQuery } from 'hooks/queries/useKeywordQueries';
import { useGenreBooksQuery, useTodayBookQuery } from 'hooks/queries/useBookQueries';
import { useReviewRealtimeQuery } from './useReviewRealtimeQuery';

export const useMainData = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLogin = !!user?.userIdx; // 사용자 로그인 여부

  const [selectedKeywordIdx, setSelectedKeywordIdx] = useState<number | null>(null);

  // const { data: todayBookData, isLoading: isTodayLoading } = useTodayBookQuery();
  // const { data: keywordListData = [], isLoading: isKeywordLoading } = useBsListQuery();
  const { data: genreBookData = [], isLoading: isGenreLoading } = useGenreBooksQuery(isLogin);
  const { data, isLoading: isMainLoading } = useQuery({
    queryKey: ['mainData'],
    queryFn: async () => {
      const res = await axiosInstance.get('/main');
      return res.data.data;
    },
  });
  // const { data: realtimeData } = useReviewRealtimeQuery();

  const todayBookData = data?.todayBook;
  const keywordListData = data?.bsList || [];
  const realtimeData = data?.realtime || [];

  const isLoading = isMainLoading || (isLogin && isGenreLoading); // 로그인한 사용자에 대해서만 장르별 도서 로딩 상태 고려

  // 상세 페이지 이동함수
  const gotoDetail = (bookIdx: number, bsIdx: number) => {
    if (!bookIdx || !bsIdx) return;
    navigate(`${ROUTES.KEYWORD}/detail/${bookIdx}?bsIdx=${bsIdx}`);
  };

  // 키워드별 페이지이동
  const handleChipClick = (bsIdx: number) => {
    setSelectedKeywordIdx(bsIdx);
    navigate(`${ROUTES.KEYWORD}/?bsIdx=${bsIdx}`);
  };

  const handleCtaClick = () => {
    if (!isLogin) {
      navigate(ROUTES.LOGIN);
    } else {
      handleChipClick(keywordListData[0]?.bsIdx);
    }
  };

  return {
    isLogin,
    todayBookData,
    keywordListData,
    genreBookData,
    realtimeData,
    isLoading,
    selectedKeywordIdx,
    gotoDetail,
    handleChipClick,
    handleCtaClick,
  };
};
