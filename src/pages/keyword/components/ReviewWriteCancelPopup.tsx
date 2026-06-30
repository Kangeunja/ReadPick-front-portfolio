interface ReviewWriteCancelPopupProps {
  onConfirm: () => void;
  onClose: () => void;
}

const ReviewWriteCancelPopup = ({ onConfirm, onClose }: ReviewWriteCancelPopupProps) => {
  return (
    <div className="animation-fadeIn-popup">
      <div className="animation-fadeIn-box">
        <div className="mb-[16px] text-xl font-medium">작성을 취소할까요?</div>
        <div className="text-[14px] text-[#333333]">작성한 내용은 저장되지 않습니다.</div>

        <div className="mt-[36px] flex justify-center gap-[15px]">
          <button className="h-[43px] w-[111px] cursor-pointer rounded-[5px] border-none bg-[#545454] text-white" onClick={onConfirm}>
            작성취소
          </button>
          <button
            className="h-[43px] w-[111px] cursor-pointer rounded-[5px] border-none bg-pointColor text-white hover:bg-btnhoverColor"
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
