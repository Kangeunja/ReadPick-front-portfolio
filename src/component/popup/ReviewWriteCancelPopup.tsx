import "../../assets/css/ReviewWriteCancelPopup.css";

const ReviewWriteCancelPopup = ({ onConfirm, onClose }: any) => {
  return (
    <div className="review-popup__cancel">
      <div className="review-popup__cancel-box">
        <div className="review-popup__cancel-header">작성을 취소할까요?</div>
        <div className="review-popup__cancel-info">
          작성한 내용은 저장되지 않습니다.
        </div>

        <div className="review-popup__cancel-actions">
          <button
            className="review-cancel__popup-btn review-cancel__btn"
            onClick={onConfirm}
          >
            작성취소
          </button>
          <button
            className="review-cancel__popup-btn review-check__btn"
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
