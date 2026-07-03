import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useSubCategoryQuery } from 'hooks/queries/useKeywordQueries';
import { useOutsideClick } from 'hooks/useOutsideClick';
import { useBookSearchParams } from 'hooks/useBookSearchParams';
import { useBookDetailQueries } from 'hooks/queries/useBookQueries';
import { useBookActionsMutation } from './useBookActionsMutation';
import { useReviewListQuery } from './useReviewListQuery';
import { useAuthStore } from 'store/authStore';
import { usePopupStore } from 'store/popupStore';
import { ROUTES } from 'constants/routes';
import { Review } from 'types/review';

export const useKeywordBookDetail = () => {
  // 외부 라이브러리 및 내장 훅
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const bottomObserverRef = useRef<HTMLDivElement | null>(null);

  // 전역 상태 스토어
  const user = useAuthStore((state) => state.user);
  const openPopup = usePopupStore((state) => state.openPopup);

  // URL 쿼리 스트링 및 파라미터 추출
  const { bsIdx, bssIdx } = useBookSearchParams();

  // 서버 데이터 조회
  const { data: keywordList } = useSubCategoryQuery();
  const {
    bookDetail: bookDetailQuery,
    bookImg: bookImgQuery,
    isRecommend: isRecommendQuery,
    recommedCount: recommedCountQuery,
    isBookmark: isBookmarkQuery,
    reviewCount: reviewCountQuery,
  } = useBookDetailQueries();
  const { data: reviewPages, fetchNextPage, hasNextPage, isFetchingNextPage } = useReviewListQuery(reviewCountQuery.data);

  // 서버 데이터 변경
  const { reportReviewMutation } = useBookActionsMutation();

  // 로컬 상태
  const [popup, setPopup] = useState<'LOGIN' | 'WRITE' | 'EDIT' | 'DELETE' | 'REPORT' | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [openMoreReviewId, setOpenMoreReviewId] = useState<number | null>(null);
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  // 데이터 기반으로 가공한 변수
  const reviews = reviewPages?.pages.flat() || [];
  const myReview = reviews.find((rv) => rv.userIdx === user?.userIdx);
  const hasMyReview = !!myReview;

  const moreMenuRef = useOutsideClick(() => setOpenMoreReviewId(null));

  const fetchMoreReview = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    setIsLocalLoading(true);

    setTimeout(() => {
      fetchNextPage();
      setIsLocalLoading(false);
    }, 1000);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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

  // ===== 이벤트 핸들러 =====
  const handleCategoryChange = (type: string, idx: number) => {
    const path = type === 'bs' ? `${ROUTES.KEYWORD}?bsIdx=${idx}` : `${ROUTES.KEYWORD}?bsIdx=${bsIdx}&bssIdx=${idx}`;
    navigate(path);
  };

  // ===== 책 추천, 찜 액션 버튼 클릭 시 로그인 여부 확인 후 액션 수행 =====
  const handleActionClick = (action: () => void) => {
    if (!user) {
      setPopup('LOGIN');
      return;
    }
    action();
  };

  // ===== 리뷰 작성 버튼 클릭 시 로그인 여부 확인 후 팝업 오픈 =====
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

  // ===== 리뷰 더보기 메뉴 토글 =====
  const handleToggleMoreMenu = (rvIdx: number) => {
    setOpenMoreReviewId((prev) => (prev === rvIdx ? null : rvIdx));
  };

  // ===== 리뷰 팝업 오픈 =====
  const handleOpenPopup = (type: 'EDIT' | 'DELETE', review: Review) => {
    setSelectedReview(review);
    setPopup(type);
    setOpenMoreReviewId(null);
  };

  // ===== 리뷰 신고 처리 =====
  const handleReportReview = (rvIdx: number) => {
    if (!user) {
      setPopup('LOGIN');
      setOpenMoreReviewId(null);
      return;
    }

    reportReviewMutation(rvIdx, {
      onSuccess: (res) => {
        if (res === 'reportReview:fail') {
          openPopup('이미 신고하셨거나 처리할 수 없는 리뷰입니다.');
        } else {
          openPopup('신고가 접수되었습니다.');
        }

        setOpenMoreReviewId(null);
      },
      onError: () => {
        alert('신고 처리 중 오류가 발생했습니다.');
      },
    });
  };

  // ===== 리뷰 작성, 수정, 삭제 후 성공 시 처리 =====
  const handleReviewSuccess = (message: string, bookIdx: number) => {
    openPopup(message);

    if (bookIdx) {
      queryClient.invalidateQueries({ queryKey: ['myReviews'] });
      queryClient.invalidateQueries({ queryKey: ['reviewList', bookIdx] });
      queryClient.invalidateQueries({ queryKey: ['reviewCount', bookIdx] });
      queryClient.invalidateQueries({ queryKey: ['bookDetail', bookIdx] });
    }
    setPopup(null);

    // 리액트 쿼리 mutation 파트에서 자동으로 캐시를 무효화 시켜서
    // 화면에 새 데이터가 저절로 호출됨
  };

  // ===== 팝업 닫기 =====
  const handleClosePopup = () => {
    setPopup(null);
  };

  return {
    user,
    keywordList: keywordList || [],
    bsIdx,
    bssIdx,
    handleCategoryChange,
    bookDetail: bookDetailQuery.data,
    bookImg: bookImgQuery.data,
    isRecommend: isRecommendQuery.data,
    recommedCount: recommedCountQuery.data,
    isBookmark: isBookmarkQuery.data,
    reviewCount: reviewCountQuery.data,
    handleActionClick,
    handleOpenReviewPopup,
    hasMyReview,
    reviews,
    moreMenuRef,
    openMoreReviewId,
    handleToggleMoreMenu,
    handleOpenPopup,
    loading: isFetchingNextPage || isLocalLoading,
    bottomObserverRef,
    hasMore: hasNextPage,
    popup,
    handleClosePopup,
    handleReviewSuccess,
    selectedReview,
    handleReportReview,
  };
};
