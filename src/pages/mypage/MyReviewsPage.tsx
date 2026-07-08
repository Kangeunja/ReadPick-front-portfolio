import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useOutsideClick } from 'hooks/useOutsideClick';
import { useMyReviewQuery } from './hooks/useMyReviewQuery';
import { MyPageOutletContext } from 'types/mypage';
import { Review } from 'types/review';
import { usePopupStore } from 'store/popupStore';

import ReviewDeletePopup from 'components/popup/ReviewDeletePopup';
import MyReviewItem from './components/MyReviewItem';
import ReviewEditPopup from 'components/popup/ReviewEditPopup';

const MyReviewsPage = () => {
  const queryClient = useQueryClient();
  const { userInfo } = useOutletContext<MyPageOutletContext>();
  const openPopup = usePopupStore((state) => state.openPopup);

  const { data: reviewData = [] } = useMyReviewQuery();

  const [openMoreReviewId, setOpenMoreReviewId] = useState<number | null>(null); // 더보기란 상태바
  const [selectedReview, setSelectedReview] = useState<Review | null>(null); // 선택된 리뷰내용
  const [popupType, setPopupType] = useState<'EDIT' | 'DELETE' | null>(null);

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
    openPopup(message);
    setPopupType(null);
    queryClient.invalidateQueries({ queryKey: ['myReviews'] });
  };

  return (
    <>
      <div className="mb-[200px] w-full pt-[50px]">
        <div className="mx-auto w-[613px]">
          <div className="mb-[28px] text-[14px] text-[#333333]">전체({reviewData.length})</div>
          {reviewData.length > 0 ? (
            reviewData.map((item: Review) => (
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

      {popupType === 'EDIT' && selectedReview && (
        <ReviewEditPopup
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
