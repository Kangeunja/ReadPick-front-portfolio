interface MypageImgDeletePopupProps {
  isTempImage: boolean;
  onRemoveTempImage: () => void; // 임시 이미지 업로드 취소
  onSetDeleteState: () => void; // 기존 이미지를 삭제예정 상태로 변경하는 함수
  onClose: () => void;
}

const MypageProfileDeletePopup = ({ isTempImage, onRemoveTempImage, onSetDeleteState, onClose }: MypageImgDeletePopupProps) => {
  const handleDelete = () => {
    if (isTempImage) {
      onRemoveTempImage();
    } else {
      onSetDeleteState();
    }
    onClose();
  };

  return (
    <div className="animation-fadeIn-popup">
      <div className="animation-fadeIn-box">
        <div className="mb-[16px] text-[18px] font-medium">정말로 삭제하시겠습니까?</div>
        <div className="text-[14px] text-[#333333]">삭제한 프로필 이미지는 복구할 수 없습니다.</div>

        <div className="mt-[36px] flex justify-center gap-[15px]">
          <button className="h-[40px] w-[100px] rounded-[5px] border-none bg-[#b6b6b6] text-black" onClick={() => onClose()}>
            취소
          </button>
          <button
            className="h-[40px] w-[100px] rounded-[5px] border-none bg-[#ec1818] text-white disabled:cursor-not-allowed disabled:opacity-[0.4]"
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default MypageProfileDeletePopup;
