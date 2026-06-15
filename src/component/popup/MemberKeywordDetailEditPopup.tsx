//react
import { useState } from 'react';

// Components
import ReviewWriteCancelPopup from './ReviewWriteCancelPopup';

// hooks
import { useUpdateReviewMutation } from '../../hooks/mutations/useUpdateReviewMutation';

// hooks
import useLockBodyScroll from '../../hooks/useLockBodyScroll';

// types
import { Review } from '../../types/review';

// utils
import { getLargeBookImage } from '../../utils/image';
import { Book, BookDetail } from '../../types/book';

interface MemberKeywordDetailEditPopupProps {
  onClose: () => void;
  onSuccess: () => void;
  selectedReview: Review;
  bookDetail: BookDetail | Book | Review;
}

const MemberKeywordDetailEditPopup = ({ onClose, onSuccess, selectedReview, bookDetail }: MemberKeywordDetailEditPopupProps) => {
  // 상태 관리
  const [editedReview, setEditedReview] = useState<Review>(selectedReview); // 리뷰 내용
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false); // 리뷰 작성취소 팝업

  const { mutate: updateMutate } = useUpdateReviewMutation();

  // 수정 버튼 활성화 조건
  const isSubmitEnabled = editedReview.content.trim().length >= 10 && editedReview.content !== selectedReview.content;

  const submitButtonStyle = isSubmitEnabled ? 'bg-[rgba(36,143,143,1)] cursor-pointer' : 'bg-[rgba(36,143,143,0.5)] cursor-not-allowed';

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
          alert('리뷰 수정에 실패했습니다.');
        },
      },
    );
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-[99] h-full w-full bg-black/40">
        <div className="fixed left-1/2 top-1/2 box-border w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white p-[30px]">
          <div className="mb-[20px] flex justify-between text-[17px]">
            <p>리뷰 수정하기</p>
            <button
              type="button"
              className="h-4 w-4 cursor-pointer border-none bg-transparent bg-popup-cancel"
              onClick={(e) => {
                e.stopPropagation();
                handleCancelClick();
              }}
            ></button>
          </div>

          <div className="mb-11 flex">
            <img
              src={getLargeBookImage(bookDetail.bookImageName)}
              alt="책 이미지"
              className="mr-[56px] block h-[148px] w-[119px] border border-[#ededed]"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col justify-center">
              <p className="mb-[5px] text-[14px] font-bold">{bookDetail.bookName}</p>
              <p className="text-[12px] text-[#343434]">{bookDetail.author}</p>
            </div>
          </div>

          <div className="relative">
            <label htmlFor="review-content" className="absolute hidden h-[1px] w-[1px] whitespace-nowrap [clip:rect(0,0,0,0)]">
              리뷰 내용
            </label>

            <textarea
              id="review-content"
              value={editedReview.content}
              className="relative box-border h-[240px] w-full resize-none border border-[#eaeaea] p-[15px] font-noto text-[15px] font-medium leading-[1.5] tracking-[0.015em] text-[#333] focus:border focus:border-[#555555] focus:outline-none"
              maxLength={200}
              onChange={handleContentChange}
            />
            <p className="absolute bottom-[15px] right-[15px] text-[13px] text-[#555555]">{editedReview.content.length} / 200</p>
          </div>

          <button
            type="button"
            className={`mx-auto mt-[20px] block h-[40px] w-[140px] bg-[rgba(36,143,143,0.5)] text-[13px] text-white ${submitButtonStyle}`}
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
