import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "../../assets/css/memberKeywordDetailReviewPopup.css";
import ReviewWriteCancelPopup from "./ReviewWriteCancelPopup";

const MemberKeywordDetailReviewPopup = ({
  onClose,
  bookDetail,
  reviewList,
  bookImg,
  onSuccess,
}: any) => {
  // 텍스트 빈값으로 저장
  const [text, setText] = useState("");

  // 리뷰 작성취소 팝업
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);

  // 텍스트 포커싱
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

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
    if (text !== "") {
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
    axiosInstance
      .post("/reviewInsert", {
        bookIdx: bookDetail?.bookIdx,
        content: text,
      })
      .then((res) => {
        if (res.data === "success") {
          // reviewList(bookDetail?.bookIdx!);
          // onClose();
          onSuccess();
          // onClose();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // if (user) {
    //   if (text !== "") {
    //     axiosInstance
    //       .post("/reviewInsert", {
    //         bookIdx: bookDetail?.bookIdx,
    //         content: text,
    //       })
    //       .then((res) => {
    //         console.log(res);
    //         if (res.data === "reviewInsert:fail") {
    //           alert("리뷰는 책 한 권당 1개만 작성가능합니다.");
    //           onClose();
    //           // return;
    //         } else {
    //           alert("리뷰가 작성완료되었습니다.");
    //           reviewList(bookDetail?.bookIdx!);
    //           setText("");
    //           textAreaRef.current?.focus();
    //           onClose();
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   } else {
    //     alert("내용을 작성해주세요");
    //     textAreaRef.current?.focus();
    //   }
    // } else {
    //   alert("로그인이 필요한 서비스입니다.");
    //   navigate("/login");
    // }
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
      <div className="review-popup__write">
        <div className="review-popup__write-box">
          <div className="review-popup__header">
            <p>리뷰 작성하기</p>
            <button
              className="review-popup__btn review-popup__btn-cancel"
              onClick={handleCancelWrite}
            ></button>
          </div>

          <div className="review-popup__book">
            {bookImg && (
              <img
                src={bookImg.fileName.replace("coversum", "cover500")}
                alt="책 이미지"
              />
            )}
            <div className="review-popup__book-info">
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
              ref={textAreaRef}
              value={text}
              className="review-popup__textarea"
              placeholder="내용을 10자 이상 적어주세요. 주제와 무관한 문의, 악플등의 글은 임의 삭제될수 있습니다."
              maxLength={200}
              onChange={handleInputChange}
            />
            <p className="review-popup__count">{text.length} / 200</p>
          </div>

          <button
            className={`review-popup__btn review-popup__btn-submit ${
              isSubmitEnabled ? "is-active" : ""
            }`}
            disabled={!isSubmitEnabled}
            onClick={handleSubmitReview}
          >
            등록하기
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

export default MemberKeywordDetailReviewPopup;
