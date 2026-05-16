// react
import { useState } from "react";

// router
import { useOutletContext } from "react-router-dom";

// Components
import MemberKeywordDetailEditPopup from "../popup/MemberKeywordDetailEditPopup";
import ReviewDeletePopup from "../popup/ReviewDeletePopup";
import ReviewCompletePopup from "../popup/MessagePopup";

// hooks
import { useReviewQuery } from "../../hooks/queries/useReviewQuery";

// types
import { MyPageOutletContext } from "../../types/mypage";
import { Review } from "../../types/review";

// utils
import MyReviewItem from "./MyReviewItem";

const MyPageReview = () => {
  const { userInfo } = useOutletContext<MyPageOutletContext>();

  const [openMoreReviewId, setOpenMoreReviewId] = useState<number | null>(null); // 더보기란 상태바
  const [selectedReview, setSelectedReview] = useState<Review | null>(null); // 선택된 리뷰내용

  // 팝업
  const [popupType, setPopupType] = useState<"edit" | "delete" | null>(null);
  const [completeMessage, setCompleteMessage] = useState<string | null>(null); // 완료 팝업 메시지 상태

  // 리뷰 리스트 데이터 호출
  const { data: reviewData = [] } = useReviewQuery();

  const handleToggleMenu = (rvIdx: number) => {
    setOpenMoreReviewId((prev) => (prev === rvIdx ? null : rvIdx));
  };

  const handleCloseMenu = () => {
    setOpenMoreReviewId(null);
  };

  // 수정/삭제 팝업 열기 핸들러
  const handleOpenPopup = (type: "edit" | "delete", review: Review) => {
    setSelectedReview(review);
    setPopupType(type);
    setOpenMoreReviewId(null);
  };

  // 수정 완료
  const handleEditSuccess = () => {
    setCompleteMessage("리뷰 수정이 완료되었습니다.");

    setTimeout(() => {
      setCompleteMessage(null);
      setPopupType("edit");
    }, 2000);
  };

  return (
    <>
      <div className="w-full pt-[50px] mb-[200px]">
        <div className="w-[613px] mx-auto">
          <div className="text-[14px] text-[#333333] mb-[28px]">
            전체({reviewData.length})
          </div>

          {reviewData.length > 0 ? (
            <>
              {reviewData.map((item) => (
                <MyReviewItem
                  key={item.rvIdx}
                  item={item}
                  openMoreReviewId={openMoreReviewId}
                  userInfo={userInfo}
                  onToggleMenu={handleToggleMenu}
                  handleOpenPopup={handleOpenPopup}
                  onCloseMenu={handleCloseMenu}
                />
              ))}
            </>
          ) : (
            <p
              className="
              w-full p-[10px] 
              border border-[#f3f3f3] 
              box-border rounded-[5px] 
              text-[#333333] text-[13px]
            "
            >
              등록된 리뷰가 없습니다.
              <br />
              첫번째 리뷰를 남겨보세요!
            </p>
          )}
        </div>
      </div>

      {popupType === "edit" && selectedReview && (
        <MemberKeywordDetailEditPopup
          onSuccess={handleEditSuccess}
          onClose={() => setPopupType(null)}
          selectedReview={selectedReview}
          bookDetail={selectedReview.book}
          bookImg={selectedReview.bookImage}
        />
      )}

      {completeMessage && (
        <ReviewCompletePopup
          message={completeMessage}
          onFinish={() => setCompleteMessage(null)}
        />
      )}

      {popupType === "delete" && selectedReview && (
        <ReviewDeletePopup
          onClose={() => setPopupType(null)}
          bookDetail={selectedReview.book}
        />
      )}
    </>
  );
};

export default MyPageReview;
