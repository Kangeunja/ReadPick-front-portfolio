import { useRef, useState } from 'react';
import ReviewWriteCancelPopup from './ReviewWriteCancelPopup';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import { Book, BookDetail } from '../../types/book';
import { getLargeBookImage } from '../../utils/image';
import { useInsertReviewMutation } from '../../hooks/mutations/useInsertReviewMutation';

interface MemberKeywordDetailReviewPopupProps {
  onClose: () => void;
  onSuccess: () => void;
  bookDetail: BookDetail | Book;
}

const MemberKeywordDetailReviewPopup = ({ onClose, onSuccess, bookDetail }: MemberKeywordDetailReviewPopupProps) => {
  const { mutate: insertMutate } = useInsertReviewMutation();

  // 텍스트 빈값으로 저장
  const [text, setText] = useState('');

  // 리뷰 작성취소 팝업
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);

  // 텍스트 포커싱
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useLockBodyScroll();

  // 취소(X) 버튼
  const handleCancelWrite = () => {
    if (text !== '') {
      setIsCancelPopupOpen(true);
    } else {
      onClose();
    }
  };

  // 작성취소 버튼
  const handleCloseWritePopup = () => {
    setIsCancelPopupOpen(false);
    onClose();
  };

  // 등록하기 버튼
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

  // 리뷰 내용
  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setText(value);
  };

  // 등록하기 disabled 변수
  const isSubmitEnabled = text.trim().length >= 10;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-[99] h-full w-full bg-[rgba(0,_0,_0,_0.4)]">
        <div className="fixed left-1/2 top-1/2 box-border w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white p-[30px]">
          <div className="mb-[20px] flex justify-between text-[17px] font-medium">
            <p>리뷰 작성하기</p>
            <button
              className="h-[16px] w-[16px] cursor-pointer border-none bg-transparent bg-popup-cancel"
              onClick={handleCancelWrite}
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
            <label htmlFor="review-content" className="absolute h-[1px] w-[1px] overflow-hidden whitespace-nowrap [clip:rect(0,0,0,0)]">
              리뷰 내용
            </label>

            <textarea
              id="review-content"
              ref={textAreaRef}
              value={text}
              className="relative box-border h-[240px] w-full resize-none border border-[#eaeaea] p-[15px] font-noto text-[15px] font-medium leading-[1.5] tracking-[0.015em] text-[#333] placeholder:text-[#898989] focus:border focus:border-[#555555] focus:outline-none"
              placeholder="내용을 10자 이상 적어주세요. 주제와 무관한 문의, 악플등의 글은 임의 삭제될수 있습니다."
              maxLength={200}
              onChange={handleInputChange}
            />
            <p className="absolute bottom-[15px] right-[15px] text-[13px] text-[#555555]">{text.length} / 200</p>
          </div>

          <button
            type="button"
            className={`mx-auto mt-[20px] block h-[40px] w-[140px] bg-[rgba(36,143,143,0.5)] text-[13px] text-white ${isSubmitEnabled ? 'bg-[rgba(36,143,143,1)]' : 'cursor-not-allowed bg-[rgba(36,143,143,0.5)]'}`}
            disabled={!isSubmitEnabled}
            onClick={handleSubmitReview}
          >
            등록하기
          </button>
        </div>
      </div>

      {isCancelPopupOpen && <ReviewWriteCancelPopup onConfirm={handleCloseWritePopup} onClose={() => setIsCancelPopupOpen(false)} />}
    </>
  );
};

export default MemberKeywordDetailReviewPopup;
