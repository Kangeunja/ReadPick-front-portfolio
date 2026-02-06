import axiosInstance from "../../api/axiosInstance";
import "../../assets/css/ReviewDeletePopup.css";

const ReviewDeletePopup = ({ onClose, reviewList, bookDetail }: any) => {
  const handleReviewDelete = () => {
    axiosInstance
      .get("/reviewDelete", {
        params: {
          bookIdx: bookDetail?.bookIdx,
        },
      })
      .then((res) => {
        if (res.data === "success") {
          reviewList(bookDetail?.bookIdx!);
          onClose();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="review-popup__del">
      <div className="review-popup__del-box">
        <div className="review-popup__del-header">정말로 삭제하시겠습니까?</div>
        <div className="review-popup__del-info">
          삭제된 리뷰는 복구되지 않습니다.
        </div>

        <div className="review-popup__del-actions">
          <button
            className="review-del__popup-btn review-del__cancel-btn"
            onClick={() => onClose()}
          >
            취소
          </button>
          <button
            className="review-del__popup-btn review-del__btn"
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
