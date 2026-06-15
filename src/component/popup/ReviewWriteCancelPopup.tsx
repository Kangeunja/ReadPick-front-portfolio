interface ReviewWriteCancelPopupProps {
  onConfirm: () => void;
  onClose: () => void;
}

const ReviewWriteCancelPopup = ({ onConfirm, onClose }: ReviewWriteCancelPopupProps) => {
  return (
    <div className="animate-popup-bg-fade fixed bottom-0 left-0 right-0 top-0 z-[99] flex h-full w-full items-center justify-center bg-black/40 opacity-0">
      <div className="animate-popup-box-fade fixed box-border flex w-[360px] flex-col justify-center rounded-[5px] bg-white p-[30px] text-center opacity-0 delay-[0.05s]">
        <div className="mb-[16px] text-xl font-medium">작성을 취소할까요?</div>
        <div className="text-[14px] text-[#333333]">작성한 내용은 저장되지 않습니다.</div>

        <div className="mt-[36px] flex justify-center gap-[15px]">
          <button className="h-[43px] w-[111px] cursor-pointer rounded-[5px] border-none bg-[#545454] text-white" onClick={onConfirm}>
            작성취소
          </button>
          <button
            className="review-check__btn h-[43px] w-[111px] cursor-pointer rounded-[5px] border-none bg-[#248f8f] text-white hover:bg-[#1e7373]"
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
