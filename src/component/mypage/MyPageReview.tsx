import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "../../assets/css/mypageReview.css";
import { useOutletContext } from "react-router-dom";
import { MyPageOutletContext } from "../../types/mypage";
import MemberKeywordDetailEditPopup from "../popup/MemberKeywordDetailEditPopup";
import ReviewDeletePopup from "../popup/ReviewDeletePopup";
import ReviewCompletePopup from "../popup/MessagePopup";

interface Review {
  nickName: string;
  regDate: string;
  fileName: string;
  rvIdx: number;
  userIdx: number;
  bookIdx: number;
  bookName: string;
  author: string;
  content: string;
  bookImageName: string;
}

const MyPageReview = () => {
  // interface 함수
  const { userInfo } = useOutletContext<MyPageOutletContext>();

  // 마우스 포커싱
  const moreMenuRef = useRef<HTMLDivElement | null>(null);

  // 내 리뷰 리스트 데이터 정보
  const [reviewListData, setReviewListData] = useState<Review[]>([]);

  // 내리뷰 리스트 총 데이터 수
  const [reviewListLength, setReviewListLength] = useState(0);

  // 더보기란 상태바
  const [openMoreReviewId, setOpenMoreReviewId] = useState<number | null>(null);

  // 리뷰 수정 팝업 상태
  const [isReviewEditPopup, setIsReviewEditPopup] = useState(false);

  // 리뷰 삭제 팝업 상태
  const [isReviewClosePopup, setIsReviewClosePopup] = useState(false);

  // 완료 팝업 메시지 상태
  const [completeMessage, setCompleteMessage] = useState<string | null>(null);

  // 선택된 리뷰내용
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    // reviewList();
    reviewListBookData();
  }, []);

  // 내 리뷰 api
  // const reviewList = () => {
  //   axiosInstance
  //     .get("/myReview", {
  //       params: {},
  //     })
  //     .then((res) => {
  //       setReviewListData(res.data);
  //       setReviewListLength(res.data.length);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // 내가 쓴 리뷰 리스트 정보
  const reviewListBookData = () => {
    axiosInstance
      .get("/userReviewBook", {
        params: {},
      })
      .then((res) => {
        console.log(res.data);
        setReviewListData(res.data);
        setReviewListLength(res.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.closest(".myage-review__add-btn") ||
        target.closest(".mypage-review__more-menu")
      ) {
        return;
      }
      setOpenMoreReviewId(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMoreReviewId]);

  // 리뷰 수정하기 버튼
  const handleReviewUpdate = (rvIdx: number) => {
    const review = reviewListData.find((r) => r.rvIdx === rvIdx) || null;
    setSelectedReview(review);
    setIsReviewEditPopup(true);
    setOpenMoreReviewId(null);
  };

  // 리뷰 삭제하기 버튼
  const handleReviewDelete = () => {
    setIsReviewClosePopup(true);
    setOpenMoreReviewId(null);
  };

  return (
    <>
      <div className="mypage-review">
        <div className="mypage-review__container">
          <div className="mypage-review__count">전체({reviewListLength})</div>

          {reviewListData.map((item) => (
            <div className="mypage-review__con-wrap" key={item.rvIdx}>
              <div className="mypage-review__info-wrap">
                <div
                  className={`mypage-review__img ${
                    userInfo.fileName === "default"
                      ? "mypage-review__img-has-default"
                      : ""
                  }`}
                >
                  {userInfo.fileName === "default" ? (
                    <div className="mypage-review__img--default" />
                  ) : (
                    <img src={userInfo.fileName} alt="프로필 이미지" />
                  )}
                </div>
                <div className="mypage-review__info">
                  <p>{item.nickName}</p>
                  <p>{item.regDate}</p>
                </div>
                <div
                  className="myage-review__add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMoreReviewId((prev) =>
                      prev === item.rvIdx ? null : item.rvIdx
                    );
                  }}
                ></div>
              </div>
              {openMoreReviewId === item.rvIdx && (
                <div
                  className="mypage-review__more-menu"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.userIdx === userInfo.userIdx && (
                    <>
                      <button
                        className="book-detail__review-more-item"
                        onClick={() => handleReviewUpdate(item.rvIdx)}
                      >
                        수정하기
                      </button>
                      <button
                        className="book-detail__review-more-item"
                        onClick={handleReviewDelete}
                      >
                        삭제하기
                      </button>
                    </>
                  )}
                </div>
              )}

              <div className="mypage-review__box">
                <div className="mypage-review__book-img">
                  <img
                    src={item.bookImageName.replace("coversum", "cover500")}
                    alt="책 이미지"
                  />
                </div>
                <div className="mypage-review__book-info">
                  <p>{item.bookName}</p>
                  <p>{item.author}</p>
                </div>
              </div>

              <div className="mypage-review__book-content">{item.content}</div>
            </div>
          ))}
        </div>
      </div>

      {isReviewEditPopup && (
        <MemberKeywordDetailEditPopup
          onSuccess={() => {
            setCompleteMessage("리뷰 수정이 완료되었습니다.");
            setTimeout(() => {
              setCompleteMessage(null);
              setIsReviewEditPopup(false);
              reviewListBookData();
            }, 2000);
          }}
          onClose={() => setIsReviewEditPopup(false)}
          selectedReview={selectedReview}
          bookDetail={selectedReview}
          bookImg={selectedReview}
        />
      )}

      {completeMessage && (
        <ReviewCompletePopup
          message={completeMessage}
          onFinish={() => setCompleteMessage(null)}
        />
      )}

      {isReviewClosePopup && (
        <ReviewDeletePopup
          onClose={() => setIsReviewClosePopup(false)}
          bookDetail={selectedReview}
          reviewList={reviewListBookData}
        />
      )}
    </>
  );
};

export default MyPageReview;
