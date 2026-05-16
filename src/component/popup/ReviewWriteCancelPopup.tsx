interface ReviewWriteCancelPopupProps {
  onConfirm: () => void;
  onClose: () => void;
}

const ReviewWriteCancelPopup = ({
  onConfirm,
  onClose,
}: ReviewWriteCancelPopupProps) => {
  return (
    <div
      className="fixed w-full h-full top-0 bottom-0 left-0 right-0
      bg-[rgba(0,0,0,0.4)] z-[99] overflow-hidden
    "
    >
      <div
        className="w-[360px] bg-white fixed z-[100]
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        rounded-[15px] p-[30px] box-border text-center flex
        flex-col justify-center opacity-0 animate-popup
      "
      >
        <div className="text-xl font-medium mb-4">작성을 취소할까요?</div>
        <div className="text-[14px] text-[#333333]">
          작성한 내용은 저장되지 않습니다.
        </div>

        <div className="mt-[36px] flex justify-center gap-[15px]">
          <button
            className="w-[111px] h-[43px] rounded-[5px] border-none
            bg-transparent text-white bg-[#545454] cursor-pointer"
            onClick={onConfirm}
          >
            작성취소
          </button>
          <button
            className="w-[111px] h-[43px] rounded-[5px] border-none
           text-white review-check__btn bg-[#248f8f] cursor-pointer
            hover:bg-[#1e7373]"
            onClick={() => onClose()}
          >
            계속작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewWriteCancelPopup;
