import { useDeleteReviewMutation } from '../../hooks/mutations/useDeleteReviewMutation';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import { BookDetail } from '../../types/book';
import { Review } from '../../types/review';

interface ReviewDeletePopupProps {
  onClose: () => void;
  onSuccess: () => void;
  bookDetail: BookDetail | Review;
}

const ReviewDeletePopup = ({ onClose, onSuccess, bookDetail }: ReviewDeletePopupProps) => {
  const { mutate: deleteMutate } = useDeleteReviewMutation();

  // 팝업 오픈시 스크롤 방지
  useLockBodyScroll();

  const handleReviewDelete = () => {
    if (!bookDetail?.bookIdx) return;

    deleteMutate(bookDetail.bookIdx, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <div className="animation-popup overflow-hidden">
      <div className="animation-box w-[360px] animate-popup rounded-[15px]">
        <div className="mb-4 text-[20px] font-medium">정말로 삭제하시겠습니까?</div>
        <div className="text-[14px] text-[#333333]">삭제된 리뷰는 복구되지 않습니다.</div>

        <div className="mt-[36px] flex justify-center gap-[15px]">
          <button
            className="h-[43px] w-[111px] cursor-pointer rounded-[5px] border-none bg-[#b6b6b6] text-[rgb(0,0,0)]"
            onClick={() => onClose()}
          >
            취소
          </button>
          <button
            className="review-del__btn h-[43px] w-[111px] cursor-pointer rounded-[5px] border-none bg-[#ec1818] text-white"
            onClick={handleReviewDelete}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDeletePopup;
