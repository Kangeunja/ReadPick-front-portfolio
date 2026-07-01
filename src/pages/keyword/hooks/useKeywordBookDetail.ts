import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useBookDetailQueries } from './useBookDetailQueries';
import { useBookActionsMutation } from './useBookActionsMutation';
import { useReviewListQuery } from './useReviewListQuery';

import useAuthStore from 'store/authStore';

import { ROUTES } from 'constants/routes';

import { Review } from 'types/review';

import { useSubCategoryQuery } from 'hooks/queries/useKeywordQueries';
import { useOutsideClick } from 'hooks/useOutsideClick';
import { useBookSearchParams } from 'hooks/useBookSearchParams';

export const useKeywordBookDetail = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const bottomObserverRef = useRef<HTMLDivElement | null>(null);

  // URL 쿼리 스트링에서 대분류(bsIdx) 및 소분류(bssIdx) ID 추출
  const { bsIdx, bssIdx } = useBookSearchParams();

  const { bookIdx } = useParams();
  const bookIdxNumber = bookIdx ? Number(bookIdx) : null;

  // 소분류 키워드 목록 조회
  const { data: keywordList } = useSubCategoryQuery();
  const {
    bookDetail: bookDetailQuery,
    bookImg: bookImgQuery,
    isRecommend: isRecommendQuery,
    recommedCount: recommedCountQuery,
    isBookmark: isBookmarkQuery,
    reviewCount: reviewCountQuery,
  } = useBookDetailQueries();
  const { reportReviewMutation } = useBookActionsMutation();
  const { data: reviewPages, fetchNextPage, hasNextPage, isFetchingNextPage } = useReviewListQuery(reviewCountQuery.data);

  const [openMoreReviewId, setOpenMoreReviewId] = useState<number | null>(null);
  const [isLocalLoading, setIsLocalLoading] = useState(false);
  const [popup, setPopup] = useState<'LOGIN' | 'WRITE' | 'EDIT' | 'DELETE' | 'REPORT' | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const [completeMessage, setCompleteMessage] = useState<string | null>(null);

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

  // ===== 이벤트 핸들러 =====
  const handleCategoryChange = (type: string, idx: number) => {
    const path = type === 'bs' ? `${ROUTES.KEYWORD}?bsIdx=${idx}` : `${ROUTES.KEYWORD}?bsIdx=${bsIdx}&bssIdx=${idx}}`;
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
          setCompleteMessage('이미 신고하셨거나 처리할 수 없는 리뷰입니다.');
        } else {
          setCompleteMessage('신고가 접수되었습니다.');
        }

        setOpenMoreReviewId(null);

        setTimeout(() => {
          setCompleteMessage(null);
        }, 2000);
      },
      onError: () => {
        alert('신고 처리 중 오류가 발생했습니다.');
      },
    });
  };

  // ===== 리뷰 작성, 수정, 삭제 후 성공 시 처리 =====
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
    completeMessage,
    handleClosePopup,
    handleReviewSuccess,
    selectedReview,
    handleReportReview,
  };
};
