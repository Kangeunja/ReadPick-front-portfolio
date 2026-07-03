import { useState } from 'react';

import { useAutoFocus } from 'hooks/useAutoFocus';
import { useLockBodyScroll } from 'hooks/useLockBodyScroll';
import { useUpdateReviewMutation } from 'hooks/mutations/useReviewMutations';
import { Review } from 'types/review';
import { BookDetail } from 'types/book';
import { getLargeBookImage } from 'utils/image';

import ReviewWriteCancelPopup from 'components/popup/ReviewWriteCancelPopup';

type ReviewEditPopupProps = {
  onClose: () => void;
  onSuccess: () => void;
  selectedReview: Review;
  bookDetail: BookDetail | Review;
};

const ReviewEditPopup = ({ onClose, onSuccess, selectedReview, bookDetail }: ReviewEditPopupProps) => {
  // 서버 데이터 조회
  const { mutate: updateMutate, isPending } = useUpdateReviewMutation();

  // 로컬 상태
  const [content, setContent] = useState(selectedReview.content);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);

  const textAreaRef = useAutoFocus<HTMLTextAreaElement>(isCancelPopupOpen);

  // 팝업 오픈시 스크롤 방지
  useLockBodyScroll();

  // 변수 및 핸들러 정리
  const trimmedContent = content.trim();
  const trimmedOriginal = selectedReview.content.trim();

  // 수정 버튼 활성화 조건
  const isSubmitEnabled = trimmedContent.length >= 10 && trimmedContent !== trimmedOriginal && !isPending;

  const handleCancelClick = () => {
    if (content.trim() === selectedReview.content.trim()) {
      onClose();
    } else {
      setIsCancelPopupOpen(true);
    }
  };

  // 이벤트 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 수정하기
  const handleEditReview = () => {
    if (isPending) return;

    updateMutate(
      { bookIdx: selectedReview.bookIdx, content: content },
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
      <div className="animation-popup">
        <div className="animation-review-box">
          <div className="mb-[20px] flex justify-between text-[17px] font-medium">
            <p>리뷰 수정하기</p>
            <button
              type="button"
              className="h-[16px] w-[16px] cursor-pointer border-none bg-icon-cancel"
              onClick={handleCancelClick}
            ></button>
          </div>

          <div className="mb-11 flex">
            {bookDetail && bookDetail.bookIdx && (
              <img
                src={getLargeBookImage(bookDetail.bookImageName)}
                alt="책 이미지"
                className="mr-[56px] block h-[148px] w-[119px] border border-[#ededed]"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="flex flex-col justify-center">
              <p className="mb-[5px] text-[14px] font-bold">{bookDetail.bookName}</p>
              <p className="text-[12px] text-[#343434]">{bookDetail.author}</p>
            </div>
          </div>

          <div className="relative">
            <label htmlFor="review-content" className="sr-only">
              리뷰 내용
            </label>

            <textarea
              id="review-content"
              ref={textAreaRef}
              value={content}
              className="relative box-border h-[240px] w-full resize-none border border-borderGrayColor p-[15px] font-noto text-[15px] font-medium leading-[1.5] tracking-[0.015em] text-[#333] focus:border focus:border-textGrayColor focus:outline-none"
              maxLength={200}
              onChange={handleInputChange}
            />
            <p className="absolute bottom-[15px] right-[15px] text-[13px] text-textGrayColor">{content.length} / 200</p>
          </div>

          <button
            type="button"
            className={`mx-auto mt-[20px] block h-[40px] w-[140px] bg-[rgba(36,143,143,0.5)] text-[13px] text-white ${isSubmitEnabled ? 'bg-pointColor' : 'cursor-not-allowed bg-[rgba(84,84,84,0.5)]'}`}
            disabled={!isSubmitEnabled}
            onClick={handleEditReview}
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
export default ReviewEditPopup;
