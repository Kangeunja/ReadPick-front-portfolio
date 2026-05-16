//react
import { useState } from "react";

// Components
import ReviewWriteCancelPopup from "./ReviewWriteCancelPopup";

// hooks
import { useUpdateReviewMutation } from "../../hooks/mutations/useUpdateReviewMutation";

// hooks
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

// types
import { Review } from "../../types/review";

// utils
import { getLargeBookImage } from "../../utils/image";
import { Book, BookImg } from "../../types/book";

interface MemberKeywordDetailEditPopupProps {
  onClose: () => void;
  onSuccess: () => void;
  selectedReview: Review;
  bookDetail: Book;
  bookImg: BookImg;
}

const MemberKeywordDetailEditPopup = ({
  onClose,
  onSuccess,
  selectedReview,
  bookDetail,
  bookImg,
}: MemberKeywordDetailEditPopupProps) => {
  // 상태 관리
  const [editedReview, setEditedReview] = useState<Review>(selectedReview); // 리뷰 내용
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false); // 리뷰 작성취소 팝업

  const { mutate: updateMutate } = useUpdateReviewMutation();

  // 수정 버튼 활성화 조건
  const isSubmitEnabled =
    editedReview.content.trim().length >= 10 &&
    editedReview.content !== selectedReview.content;

  const submitButtonStyle = isSubmitEnabled
    ? "bg-[rgba(36,143,143,1)] cursor-pointer"
    : "bg-[rgba(36,143,143,0.5)] cursor-not-allowed";

  const imageSrc = bookImg.bookImageName
    ? getLargeBookImage(bookImg.bookImageName)
    : getLargeBookImage(bookImg.fileName);

  // 팝업 오픈시 스크롤 방지
  useLockBodyScroll();

  // 이벤트 핸들러
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedReview((prev) => ({ ...prev, content: e.target.value }));
  };

  // 취소(X) 버튼
  const handleCancelClick = () => {
    if (editedReview.content === selectedReview.content) {
      onClose();
    } else {
      setIsCancelPopupOpen(true);
    }
  };

  // 수정하기 버튼
  const handleSave = () => {
    updateMutate(
      { bookIdx: editedReview.bookIdx, content: editedReview.content },
      {
        onSuccess: () => {
          onSuccess();
        },

        onError: () => {
          alert("리뷰 수정에 실패했습니다.");
        },
      },
    );
  };

  return (
    <>
      <div
        className="
        fixed w-full h-full 
        top-0 bottom-0 left-0 right-0
        bg-[rgba(0,_0,_0,_0.4)] 
        z-[99] 
        "
      >
        <div
          className="
          w-[600px] h-[650px] 
          bg-white fixed z-[100]
          top-1/2 left-1/2 -translate-x-1/2 
          -translate-y-1/2 p-10
          box-border rounded-[25px]
          "
        >
          <div
            className="
            text-[20px] 
            flex justify-between 
            mb-[34px] 
            font-medium
            "
          >
            <p>리뷰 수정하기</p>
            <button
              type="button"
              className="
              border-none bg-transparent 
              w-4 h-4 
              bg-popup-cancel 
              cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleCancelClick();
              }}
            ></button>
          </div>

          <div className="flex mb-11">
            <img
              src={imageSrc}
              alt="책 이미지"
              className="
                w-[119px] h-[148px] 
                border border-[#ededed] 
                bg-[#004f14]
                block mr-[56px]
                "
            />
            <div className="flex flex-col justify-center">
              <p className="text-[20px] font-medium mb-[5px]">
                {bookDetail.bookName}
              </p>
              <p className="text-[13px] text-[#343434]">{bookDetail.author}</p>
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="review-content"
              className="absolute w-[1px] h-[1px] hidden
              [clip:rect(0,0,0,0)] whitespace-nowrap
              "
            >
              리뷰 내용
            </label>

            <textarea
              id="review-content"
              value={editedReview.content}
              className="
              w-full h-[240px] 
              border border-[#eaeaea] 
              p-[15px] box-border
              relative resize-none 
              text-[15px] text-[#333] 
              leading-[1.5] font-medium
              tracking-[0.015em] font-noto 
              focus:outline-none 
              focus:border 
              focus:border-[#555555]
              "
              maxLength={200}
              onChange={handleContentChange}
            />
            <p
              className="
              absolute 
              right-[15px] bottom-[15px] 
              text-[13px] 
              text-[#555555]
              "
            >
              {editedReview.content.length} / 200
            </p>
          </div>

          <button
            type="button"
            className={`
              w-[167px] h-[51px] 
              text-white rounded-[5px] 
              block mx-auto my-[25px]
              bg-[rgba(36,143,143,0.5)] 
              ${submitButtonStyle}`}
            disabled={!isSubmitEnabled}
            onClick={handleSave}
          >
            수정하기
          </button>
        </div>
      </div>

      {isCancelPopupOpen && (
        <ReviewWriteCancelPopup
          onConfirm={() => {
            setIsCancelPopupOpen(false);
            onClose();
          }}
          onClose={() => setIsCancelPopupOpen(false)}
        />
      )}
    </>
  );
};
export default MemberKeywordDetailEditPopup;
