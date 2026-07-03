import { useState } from 'react';

import { useLockBodyScroll } from 'hooks/useLockBodyScroll';
import { useInsertReviewMutation } from 'hooks/mutations/useReviewMutations';
import { useAutoFocus } from 'hooks/useAutoFocus';
import { BookDetail } from 'types/book';
import { getLargeBookImage } from 'utils/image';

import ReviewWriteCancelPopup from 'components/popup/ReviewWriteCancelPopup';

type ReviewWritePopupProps = {
  onClose: () => void;
  onSuccess: () => void;
  bookDetail: BookDetail;
};

const ReviewWritePopup = ({ onClose, onSuccess, bookDetail }: ReviewWritePopupProps) => {
  const { mutate: insertMutate, isPending } = useInsertReviewMutation();

  const [text, setText] = useState(''); // 텍스트 빈값으로 저장
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false); // 리뷰 작성취소 팝업

  const textAreaRef = useAutoFocus<HTMLTextAreaElement>(isCancelPopupOpen);

  // 10자 이상 체크 변수
  const isSubmitEnabled = text.trim().length >= 10 && !isPending;

  // 스크롤 방지
  useLockBodyScroll();

  // 리뷰 작성 취소 버튼 클릭 시
  const handleCancelClick = () => {
    if (text.trim() !== '') {
      setIsCancelPopupOpen(true);
    } else {
      onClose();
    }
  };

  // 등록하기
  const handleSubmitReview = () => {
    insertMutate(
      {
        bookIdx: bookDetail.bookIdx,
        content: text,
      },
      {
        onSuccess: () => {
          onSuccess();
        },
      },
    );
  };

  return (
    <>
      <div className="animation-popup">
        <div className="animation-review-box">
          <div className="mb-[20px] flex justify-between text-[17px] font-medium">
            <p>리뷰 작성하기</p>
            <button
              type="button"
              className="h-[16px] w-[16px] cursor-pointer border-none bg-icon-cancel"
              onClick={handleCancelClick}
            ></button>
          </div>

          <div className="mb-[44px] flex">
            {bookDetail.bookImageName && (
              <img
                src={getLargeBookImage(bookDetail.bookImageName)}
                alt="책 이미지"
                className="mr-[56px] block h-[148px] w-[119px] border border-[#ededed]"
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
              value={text}
              className="relative box-border h-[240px] w-full resize-none border border-borderGrayColor p-[15px] font-noto text-[15px] font-medium leading-[1.5] tracking-[0.015em] text-[#333] placeholder:text-[#898989] focus:border focus:border-textGrayColor focus:outline-none"
              placeholder="내용을 10자 이상 적어주세요. 주제와 무관한 문의, 악플등의 글은 임의 삭제될수 있습니다."
              maxLength={200}
              onChange={(e) => setText(e.target.value)}
            />
            <p className="absolute bottom-[15px] right-[15px] text-[13px] text-textGrayColor">{text.length} / 200</p>
          </div>

          <button
            type="button"
            className={`mx-auto mt-[20px] block h-[40px] w-[140px] text-[13px] text-white ${isSubmitEnabled ? 'bg-pointColor' : 'cursor-not-allowed bg-[rgba(84,84,84,0.5)]'}`}
            disabled={!isSubmitEnabled}
            onClick={handleSubmitReview}
          >
            등록하기
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

export default ReviewWritePopup;
