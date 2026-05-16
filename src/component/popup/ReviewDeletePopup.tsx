import { useDeleteReviewMutation } from "../../hooks/mutations/useDeleteReviewMutation";

interface ReviewDeletePopupProps {
  onClose: () => void;
  bookDetail: {
    bookIdx: number;
    [key: string]: any;
  } | null;
}

const ReviewDeletePopup = ({ onClose, bookDetail }: ReviewDeletePopupProps) => {
  const { mutate: deleteMutate } = useDeleteReviewMutation();

  const handleReviewDelete = () => {
    if (!bookDetail?.bookIdx) return;

    deleteMutate(bookDetail.bookIdx, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div
      className="fixed w-full h-full top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.4)]
      z-[99] overflow-hidden
      "
    >
      <div
        className="w-[360px] bg-white fixed z-[100]
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        rounded-[15px] p-[30px] box-border text-center flex
        flex-col justify-center opacity-0 animate-popup
      "
      >
        <div className="text-[20px] font-medium mb-4">
          정말로 삭제하시겠습니까?
        </div>
        <div className="text-[14px] text-[#333333]">
          삭제된 리뷰는 복구되지 않습니다.
        </div>

        <div className="mt-[36px] flex justify-center gap-[15px]">
          <button
            className="w-[111px] h-[43px] rounded-[5px] border-none
            bg-[#b6b6b6] text-[rgb(0,0,0)] cursor-pointer
            "
            onClick={() => onClose()}
          >
            취소
          </button>
          <button
            className="w-[111px] h-[43px] bg-[#ec1818] rounded-[5px]
            border-none text-white cursor-pointer
            review-del__btn"
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
