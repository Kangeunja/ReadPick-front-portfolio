import { useEffect, useRef, useState } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import useAuthStore from '../../../store/authStore';

import { useBookDetailQueries } from './useBookDetailQueries';
import { useBookActionsMutation } from './useBookActionsMutation';
import { useReviewListQuery } from './useReviewListQuery';

import { Review } from '../../../types/review';

import { useKeywordQuery } from '../../../hooks/queries/useKeywordQueries';
import { useOutsideClick } from '../../../hooks/useOutsideClick';

export const useKeywordBookDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const bottomObserverRef = useRef<HTMLDivElement | null>(null);

  // URL 쿼리 스트링에서 대분류(bsIdx) 및 소분류(bssIdx) ID 추출
  const queryParams = new URLSearchParams(location.search);
  const bsIdx = Number(queryParams.get('bsIdx')) || null;
  const bssIdx = Number(queryParams.get('bssIdx')) || null;

  const { bookIdx } = useParams();
  const bookIdxNumber = bookIdx ? Number(bookIdx) : null;

  // 소분류 키워드 목록 조회
  const { data: keywordList } = useKeywordQuery();
  const {
    bookDetail: bookDetailQuery,
    bookImg: bookImgQuery,
    isRecommend: isRecommendQuery,
    recommedCount: recommedCountQuery,
    isBookmark: isBookmarkQuery,
    reviewCount: reviewCountQuery,
  } = useBookDetailQueries(bookIdxNumber || 0);
  const { recommendMutation, bookmarkMutation, reportReviewMutation } = useBookActionsMutation(bookIdxNumber || 0);
  const {
    data: reviewPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useReviewListQuery(bookIdxNumber || 0, reviewCountQuery.data || 0);

  const [openMoreReviewId, setOpenMoreReviewId] = useState<number | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [completeMessage, setCompleteMessage] = useState<string | null>(null);
  const [popup, setPopup] = useState<'LOGIN' | 'WRITE' | 'EDIT' | 'DELETE' | 'REPORT' | null>(null);
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  const reviews = reviewPages?.pages.flat() || [];
  const myReview = reviews.find((rv) => rv.userIdx === user?.userIdx);
  const hasMyReview = !!myReview;

  const moreMenuRef = useOutsideClick(() => setOpenMoreReviewId(null));

  const fetchMoreReview = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    setIsLocalLoading(true);

    setTimeout(() => {
      fetchNextPage();
      setIsLocalLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || isLocalLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreReview();
        }
      },
      { threshold: 0.1 },
    );

    if (bottomObserverRef.current) {
      observer.observe(bottomObserverRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, isLocalLoading, fetchMoreReview]);

  const handleBsClick = (bsIdx: number) => {
    navigate(`/member/keyword?bsIdx=${bsIdx}`);
  };

  const handleBssClick = (bssIdx: number) => {
    navigate(`/member/keyword?bsIdx=${bsIdx}&bssIdx=${bssIdx}`);
  };

  const handleIsGood = () => {
    if (!user) {
      setPopup('LOGIN');
      return;
    }
    recommendMutation();
  };

  const handleIsBookMark = () => {
    if (!user) {
      setPopup('LOGIN');
      return;
    }
    bookmarkMutation();
  };

  const handleOpenReviewPopup = () => {
    if (!user) return setPopup('LOGIN');
    if (!bookDetailQuery.data) return;

    if (hasMyReview) {
      setSelectedReview(myReview);
      setPopup('EDIT');
    } else {
      setPopup('WRITE');
    }
  };

  const handleToggleMoreMenu = (rvIdx: number) => {
    setOpenMoreReviewId((prev) => (prev === rvIdx ? null : rvIdx));
  };

  const handleOpenPopup = (type: 'EDIT' | 'DELETE' | 'REPORT', review: Review) => {
    setSelectedReview(review);
    setPopup(type);
    setOpenMoreReviewId(null);
  };

  const handleReviewSuccess = (message: string, bookIdx: number) => {
    setCompleteMessage(message);

    setTimeout(() => {
      if (bookIdx || bookIdxNumber) {
        queryClient.invalidateQueries({ queryKey: ['myReviews'] });
        queryClient.invalidateQueries({ queryKey: ['reviewList', bookIdx] });
        queryClient.invalidateQueries({ queryKey: ['reviewCount', bookIdx] });
        queryClient.invalidateQueries({ queryKey: ['bookDetail', bookIdx] });
      }
      setPopup(null);
      setCompleteMessage(null);

      // 리액트 쿼리 mutation 파트에서 자동으로 캐시를 무효화 시켜서
      // 화면에 새 데이터가 저절로 호출됨
    }, 500);
  };

  const handleIsReport = (rvIdx: number) => {
    if (!user) {
      setPopup('LOGIN');
      setOpenMoreReviewId(null);
    } else {
      reportReviewMutation(rvIdx);
      setOpenMoreReviewId(null);
    }
  };

  return {
    user,
    keywordList: keywordList || [],
    bsIdx,
    bssIdx,
    handleBsClick,
    handleBssClick,
    bookDetail: bookDetailQuery.data,
    bookImg: bookImgQuery.data,
    isRecommend: isRecommendQuery.data,
    handleIsGood,
    recommedCount: recommedCountQuery.data,
    isBookmark: isBookmarkQuery.data,
    handleIsBookMark,
    reviewCount: reviewCountQuery.data,
    handleOpenReviewPopup,
    setPopup,
    popup,
    reviews,
    fetchMoreReview,
    hasMore: hasNextPage,
    loading: isFetchingNextPage || isLocalLoading,
    openMoreReviewId,
    handleToggleMoreMenu,
    handleOpenPopup,
    selectedReview,
    completeMessage,
    handleReviewSuccess,
    handleIsReport,
    moreMenuRef,
    hasMyReview,
    bottomObserverRef,
  };
};
