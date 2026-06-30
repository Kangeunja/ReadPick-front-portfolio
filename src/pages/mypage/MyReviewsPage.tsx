import { useEffect, useRef, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import MemberKeywordDetailEditPopup from '../../component/popup/KeywordBookDetailEditPopup';
import ReviewDeletePopup from '../../component/popup/ReviewDeletePopup';
import ReviewCompletePopup from '../../component/common/MessagePopup';
import MyReviewItem from './components/MyReviewItem';

import { MyPageOutletContext } from '../../types/mypage';
import { Review } from '../../types/review';

import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useMyReviewQuery } from './hooks/useMyReviewQuery';

const MyReviewsPage = () => {
  const queryClient = useQueryClient();
  const { userInfo } = useOutletContext<MyPageOutletContext>();

  const [openMoreReviewId, setOpenMoreReviewId] = useState<number | null>(null); // 더보기란 상태바
  const [selectedReview, setSelectedReview] = useState<Review | null>(null); // 선택된 리뷰내용
  // 팝업
  const [completeMessage, setCompleteMessage] = useState<string | null>(null); // 완료 팝업 메시지 상태
  const [popupType, setPopupType] = useState<'EDIT' | 'DELETE' | null>(null);

  // 메모리 누수 방지를 위한 타이머 레퍼런스
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 리뷰 리스트 데이터 호출
  const { data: reviewData = [] } = useMyReviewQuery();

  const moreMenuRef = useOutsideClick(() => setOpenMoreReviewId(null));

  const handleToggleMenu = (rvIdx: number) => {
    setOpenMoreReviewId((prev) => (prev === rvIdx ? null : rvIdx));
  };

  // 수정/삭제 팝업 열기 핸들러
  const handleOpenPopup = (type: 'EDIT' | 'DELETE', review: Review) => {
    setSelectedReview(review);
    setPopupType(type);
    setOpenMoreReviewId(null);
  };

  // 수정/삭제 완료
  const handleReviewSuccess = (message: string) => {
    setCompleteMessage(message);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setPopupType(null);
      setCompleteMessage(null);

      queryClient.invalidateQueries({ queryKey: ['myReviews'] });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <div className="mb-[200px] w-full pt-[50px]">
        <div className="mx-auto w-[613px]">
          <div className="mb-[28px] text-[14px] text-[#333333]">전체({reviewData.length})</div>

          {reviewData.length > 0 ? (
            reviewData.map((item) => (
              <MyReviewItem
                key={item.rvIdx}
                item={item}
                openMoreReviewId={openMoreReviewId}
                moreMenuRef={moreMenuRef}
                userInfo={userInfo}
                onToggleMenu={handleToggleMenu}
                handleOpenPopup={handleOpenPopup}
              />
            ))
          ) : (
            <p className="box-border w-full rounded-[5px] border border-[#f3f3f3] p-[10px] text-[13px] text-[#333333]">
              등록된 리뷰가 없습니다.
              <br />
              첫번째 리뷰를 남겨보세요!
            </p>
          )}
        </div>
      </div>

      {completeMessage && <ReviewCompletePopup message={completeMessage} onFinish={() => setCompleteMessage(null)} />}

      {popupType === 'EDIT' && selectedReview && (
        <MemberKeywordDetailEditPopup
          onSuccess={() => handleReviewSuccess('리뷰 수정이 완료되었습니다.')}
          onClose={() => setPopupType(null)}
          selectedReview={selectedReview}
          bookDetail={selectedReview}
        />
      )}

      {popupType === 'DELETE' && selectedReview && (
        <ReviewDeletePopup
          onSuccess={() => handleReviewSuccess('리뷰가 삭제되었습니다.')}
          onClose={() => setPopupType(null)}
          bookIdx={selectedReview.bookIdx}
        />
      )}
    </>
  );
};

export default MyReviewsPage;
