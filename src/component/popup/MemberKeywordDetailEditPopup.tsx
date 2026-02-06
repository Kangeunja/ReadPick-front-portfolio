import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "../../assets/css/memberkeywordDetailEditPopup.css";
import ReviewWriteCancelPopup from "./ReviewWriteCancelPopup";

const MemberKeywordDetailEditPopup = ({
  onClose,
  bookDetail,
  selectedReview,
  bookImg,
  onSuccess,
}: any) => {
  console.log(bookImg.bookImageName);
  console.log(selectedReview);
  // 리뷰 내용
  const [editedReview, setEditedReview] = useState(selectedReview);

  // 리뷰 작성취소 팝업
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);

  const isSubmitEnabled =
    editedReview.content.trim() !== "" &&
    editedReview.content.trim().length >= 10 &&
    editedReview.content !== selectedReview.content;

  useEffect(() => {
    // 팝업이 열릴 때 body의 스크롤 막기
    document.body.style.overflow = "hidden";
    return () => {
      // 팝업이 닫힐 때 스크롤 복구
      document.body.style.overflow = "auto";
    };
  }, []);

  // 취소(X) 버튼
  const handleCancelWrite = () => {
    if (editedReview.content === selectedReview.content) {
      onClose();
    } else {
      setIsCancelPopupOpen(true);
    }
  };

  const handleDetailPopup = (e: any) => {
    setEditedReview((prev: any) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  // 수정하기 버튼
  const handleDetailPopupSave = () => {
    axiosInstance
      .post("/reviewUpdate", {
        bookIdx: editedReview.bookIdx,
        content: editedReview.content,
      })
      .then((res) => {
        console.log(res);
        if (res.data === "success") {
          // onClose(editedReview);
          onSuccess();
          // onClose();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 작성취소 버튼
  const handleCloseWritePopup = () => {
    setIsCancelPopupOpen(false);
    onClose();
  };

  return (
    <>
      <div className="review-popup__edit">
        <div className="review-popup__edit-box">
          <div className="review-popup__edit-header">
            <p>리뷰 수정하기</p>
            <button
              type="button"
              className="review-popup__btn review-popup__btn-cancel"
              onClick={handleCancelWrite}
            ></button>
          </div>

          <div className="review-popup__edit-book">
            {bookImg.bookImageName ? (
              <img
                src={bookImg.bookImageName.replace("coversum", "cover500")}
                alt="책 이미지"
              />
            ) : (
              <img
                src={bookImg.fileName.replace("coversum", "cover500")}
                alt="책 이미지"
              />
            )}
            <div className="review-popup__edit-info">
              {bookDetail && (
                <>
                  <p>{bookDetail.bookName}</p>
                  <p>{bookDetail.author}</p>
                </>
              )}
            </div>
          </div>

          <div className="review-popup__textarea-wrap">
            <label htmlFor="review-content" className="review-popup__label">
              리뷰 내용
            </label>

            <textarea
              id="review-content"
              value={editedReview.content}
              className="review-popup__edit-textarea"
              maxLength={200}
              onChange={(e) => handleDetailPopup(e)}
            />
            <p className="review-popup__count">
              {editedReview.content.length} / 200
            </p>
          </div>

          <button
            type="button"
            className={`review-popup__btn review-popup__btn-submit ${
              isSubmitEnabled ? "is-active" : ""
            }`}
            disabled={!isSubmitEnabled}
            onClick={handleDetailPopupSave}
          >
            수정하기
          </button>
        </div>
      </div>

      {isCancelPopupOpen && (
        <ReviewWriteCancelPopup
          onConfirm={handleCloseWritePopup}
          onClose={() => setIsCancelPopupOpen(false)}
        />
      )}
    </>
  );
};
export default MemberKeywordDetailEditPopup;
