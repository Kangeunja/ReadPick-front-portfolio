import { useEffect, useRef, useState } from "react";
import "../../assets/css/memberKeywordDetail.css";
import TopMenu from "../../layouts/topMenu/TopMenu";
import axiosInstance from "../../api/axiosInstance";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SpinnerIcon from "../../icon/SpinnerIcon";
import MemberKeywordDetailReviewPopup from "../popup/MemberKeywordDetailReviewPopup";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../recoil/userInfoState";
import LoginRequiredPopup from "../popup/LoginRequiredPopup";
import MemberKeywordDetailEditPopup from "../popup/MemberKeywordDetailEditPopup";
import ReviewDeletePopup from "../popup/ReviewDeletePopup";
import ReviewCompletePopup from "../popup/MessagePopup";

interface BookDetail {
  author: string;
  bookName: string;
  bookContent: string;
  bookIdx: number;
  link: string;
}

interface Review {
  content: string;
  regDate: string;
  nickName: string;
  bookIdx: number;
  rvIdx: number;
  fileName: string;
  userIdx: number;
}

const MemberKeywordDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  // 유저 정보
  const [user] = useRecoilState(userInfoState);

  // 스크롤 포커싱
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // 마우스 포커싱
  const moreMenuRef = useRef<HTMLDivElement | null>(null);

  // URL에서 bsIdx 쿼리 파라미터 값 추출
  const bsIdx = Number(query.get("bsIdx")) || null;
  const bssIdx = Number(query.get("bssIdx")) || null;

  const { bookIdx } = useParams();
  const bookIdxNumber = bookIdx ? Number(bookIdx) : null;

  // 키워드 중분류 안에 소분류 리스트
  const [keyword, setKeyword] = useState([]);

  // 책 대표 이미지
  const [bookImg, setBookImg] = useState({
    fileName: "",
  });

  // 책 상세 정보
  const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);

  // 책 줄거리 유무
  const [isContent, setIsContent] = useState(false);

  // 리뷰 없을 때 메세지
  const [hasNoReviews, setHasNoReviews] = useState(false);

  // 리뷰 리스트
  const [review, setReview] = useState<Review[]>([]);

  // 마지막 리뷰의 rvIdx
  const [lastRvIdx, setLastRvIdx] = useState(null);

  // 로딩바 상태
  const [loading, setLoading] = useState(false);

  // 무한 스크롤 콘텐츠 유무
  const [hasMore, setHasMore] = useState(true);

  // 로그인 팝업
  const [isLoginPopup, setIsLoginPopup] = useState(false);

  // 리뷰 작성 팝업
  const [isReviewPopup, setIsReviewPopup] = useState(false);

  // 더보기란 상태바
  const [openMoreReviewId, setOpenMoreReviewId] = useState<number | null>(null);

  // 선택된 리뷰내용
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  // 리뷰 수정 팝업
  const [isReviewEditPopup, setIsReviewEditPopup] = useState(false);

  // 리뷰 삭제 팝업
  const [isReviewClosePopup, setIsReviewClosePopup] = useState(false);

  // 추천 완료 유무
  const [isGood, setIsGood] = useState(false);

  // 책 추천수
  const [checkCount, setCheckCount] = useState(0);

  // 찜 유무
  const [isBookMark, setIsBookMark] = useState(false);

  // 완료 팝업 메시지 상태
  const [completeMessage, setCompleteMessage] = useState<string | null>(null);

  // 총 리뷰 개수
  const [totalReviewCount, setTotalReviewCount] = useState(0);

  // 작성자가 리뷰 작성되었는지 유무
  const hasMyReview = !!review.find((rv) => rv.userIdx === user?.userIdx);

  // 페이지 진입시 맨처음 실행되는 코드
  useEffect(() => {
    keywordList();

    if (bookIdxNumber !== null) {
      bookDetailImg(bookIdxNumber);
      handleBookDetail(bookIdxNumber);
      reviewList(bookIdxNumber);
    }
    checkIsRecommended();
    handleCheckGood();
    bookMarkCheck();
    reviewCount();
  }, [bookIdxNumber]);

  // 총 리뷰 개수 api
  const reviewCount = () => {
    axiosInstance
      .get("/reviewCount", {
        params: { bookIdx: bookIdx },
      })
      .then((res) => {
        // console.log(res.data);
        setTotalReviewCount(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 추천 여부 확인 api
  const checkIsRecommended = () => {
    axiosInstance
      .get("/isRec", {
        params: { bookIdx: bookIdx },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data === "Y") {
          setIsGood(true);
        } else {
          setIsGood(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 책 추천수 api
  const handleCheckGood = () => {
    if (!bookIdxNumber) return;
    axiosInstance
      .get("/recCount", {
        params: {
          bookIdx: bookIdxNumber,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setCheckCount(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 찜 여부 확인 api
  const bookMarkCheck = () => {
    axiosInstance
      .get("/isBookmark", {
        params: { bookIdx: bookIdx },
      })
      .then((res) => {
        if (res.data === "Y") {
          console.log(res.data);
          setIsBookMark(true);
        } else {
          setIsBookMark(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(e.target as Node)
      ) {
        setOpenMoreReviewId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMoreReviewId]);

  // 메인페이지에서 선택한 중분류의 소분류 리스트 api
  const keywordList = () => {
    axiosInstance
      .get("/bssListByBsIdx")
      .then((res) => {
        setKeyword(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 키워드 리스트 토글 상태
  const handleBsClick = (bsIdx: number) => {
    navigate(`/member/keyword?bsIdx=${bsIdx}`);
  };

  // 유저가 선택한 소분류 정보 api
  const handleBssClick = (bssIdx: number) => {
    navigate(`/member/keyword?bsIdx=${bsIdx}&bssIdx=${bssIdx}`);
  };

  // 책 대표 이미지 api
  const bookDetailImg = (bookIdx: number) => {
    axiosInstance
      .get("/bookImageOne", {
        params: {
          bookIdx: bookIdx,
        },
      })
      .then((res) => {
        setBookImg(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 책 상세정보 api
  const handleBookDetail = (bookIdx: number) => {
    axiosInstance
      .get("/bookOne", {
        params: {
          bookIdx: bookIdx,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBookDetail(res.data);
        if (!res.data.bookContent || res.data.bookContent.trim() === "") {
          setIsContent(true);
        } else {
          setIsContent(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 리뷰 리스트 api
  const reviewList = (bookIdx: number) => {
    axiosInstance
      .get("/reviewList", {
        params: {
          bookIdx: bookIdx,
        },
      })
      .then((res) => {
        setReview(res.data);
        setHasNoReviews(res.data.length === 0);

        if (res.data.length > 0) {
          setLastRvIdx(res.data[res.data.length - 1].rvIdx); // 마지막 리뷰의 rvIdx 저장
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 리뷰 작성하기 X버튼
  const handleOpenReviewPopup = () => {
    if (user) {
      setIsReviewPopup(true);
    } else {
      setIsLoginPopup(true);
    }
  };

  useEffect(() => {
    if (totalReviewCount === 0) return;
    setHasMore(review.length < totalReviewCount);
  }, [totalReviewCount, review.length]);
  console.log(hasMore);

  const fetchMoreReview = async () => {
    if (!hasMore || loading || lastRvIdx === null) return;

    setLoading(true);

    try {
      const res = await axiosInstance.get("/reviewMore", {
        params: { rvIdx: lastRvIdx },
      });

      if (res.data.length === 0) {
        setHasMore(false);
        return;
      }
      setTimeout(() => {
        setReview((prev) => [...prev, ...res.data]);
        setLastRvIdx(res.data[res.data.length - 1].rvIdx);

        if (review.length + res.data.length >= totalReviewCount) {
          setHasMore(false);
        }
        setLoading(false);
      }, 2000);
    } catch (e) {
      console.error(e);
    }
    // finally {
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 200);
    //   // setLoading(false);
    // }
  };

  // 무한스크롤
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!scrollRef.current && loading && !more) return;

  //     const scrollContainer = scrollRef.current as HTMLDivElement;
  //     const { scrollTop, clientHeight, scrollHeight } = scrollContainer;

  //     if (scrollTop + clientHeight >= scrollHeight - 200) {
  //       fetchMoreReview();
  //     }
  //   };

  //   if (scrollRef.current) {
  //     scrollRef.current.addEventListener("scroll", handleScroll);
  //   }

  //   return () => {
  //     if (scrollRef.current) {
  //       scrollRef.current.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // }, [more, loading, lastRvIdx]);

  // 다음 리뷰리스트 api
  // const fetchMoreReview = async () => {
  //   if (!more || loading || lastRvIdx === null) return;
  //   setLoading(true);

  //   try {
  //     const res = await axiosInstance.get("/reviewMore", {
  //       params: {
  //         rvIdx: lastRvIdx,
  //       },
  //     });

  //     if (res.data.length > 0) {
  //       await new Promise((resolve) => setTimeout(resolve, 900)); // 다음 틱으로 넘기기
  //       setReview((prev) => [...prev, ...res.data]);
  //       setLastRvIdx(res.data[res.data.length - 1].rvIdx);
  //     } else {
  //       setMore(false);
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  // 더보기 버튼 클릭 시 토글
  const handleToggleMoreMenu = (rvIdx: number) => {
    setOpenMoreReviewId((prev) => (prev === rvIdx ? null : rvIdx));
  };

  // 수정하기 버튼
  const handleReviewUpdate = (rvIdx: number) => {
    const targetReview = review.find((item) => item.rvIdx === rvIdx) || null;
    setSelectedReview(targetReview);
    setIsReviewEditPopup(true);

    setOpenMoreReviewId(null);
  };

  // 책 추천해요 버튼
  const handleIsGood = () => {
    if (!user) {
      setIsLoginPopup(true);
      return;
    } else {
      axiosInstance
        .post(`/recommend?bookIdx=${bookIdx}`)
        .then((res) => {
          if (res.data.message === "추천완료") {
            setIsGood(true);
          } else {
            setIsGood(false);
          }
          handleCheckGood();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // 신고하기 버튼
  const handleIsReport = (rvIdx: number) => {
    if (!user) {
      setIsLoginPopup(true);
      return;
    } else {
      axiosInstance
        .get("/reportReview", {
          params: { rvIdx: rvIdx },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // 이 책 찜해요 버튼
  const handleIsBookMark = () => {
    if (!user) {
      setIsLoginPopup(true);
      return;
    } else {
      axiosInstance
        .post(`/bookmark?bookIdx=${bookIdx}`)
        .then((res) => {
          if (res.data.message === "북마크추가완료") {
            setIsBookMark(true);
          } else {
            setIsBookMark(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // 삭제하기 버튼
  const handleReviewDelete = () => {
    setIsReviewClosePopup(true);
    setOpenMoreReviewId(null);
  };

  const handleReviewSuccess = (message: string) => {
    setCompleteMessage(message);

    // 완료 팝업 유지
    setTimeout(() => {
      setCompleteMessage(null);

      // 작성/수정 팝업 닫기
      setIsReviewPopup(false);
      setIsReviewEditPopup(false);

      // 그 다음 데이터 갱신
      if (bookIdxNumber) {
        reviewList(bookIdxNumber);
        reviewCount();
      }
    }, 2000);
  };

  return (
    <>
      <div className="keyword-detail-page">
        <div className="keyword-detail__container">
          <TopMenu
            keywordList={keyword}
            selectedBsIdx={bsIdx}
            selectedBssIdx={bssIdx}
            onBsClick={handleBsClick}
            onBssClick={handleBssClick}
          />

          <div className="book-detail-page">
            <div className="book-detail">
              <div className="book-detail__image">
                {bookImg && (
                  <img
                    src={bookImg.fileName.replace("coversum", "cover500")}
                    alt="책 이미지"
                  />
                )}
              </div>

              <div className="book-detail__actions">
                <button
                  className={
                    isGood
                      ? "book-detail__recommend-btn hover"
                      : "book-detail__recommend-btn"
                  }
                  onClick={handleIsGood}
                >
                  <div
                    className={
                      isGood
                        ? "book-detail__recommend-icon hover"
                        : "book-detail__recommend-icon"
                    }
                  ></div>
                  <p>{`이 책 추천해요 ${checkCount}`}</p>
                </button>

                <button
                  className={
                    isBookMark
                      ? "book-detail__bookmark-btn hover"
                      : "book-detail__bookmark-btn"
                  }
                  onClick={handleIsBookMark}
                >
                  <div className="book-detail__bookmark-icon"></div>
                  <p>{isBookMark ? "찜했어요" : "이 책 찜해요"}</p>
                </button>
              </div>
            </div>

            <div className="book-detail__info">
              {bookDetail && (
                <>
                  <div className="book-detail__info-text">
                    <p>{bookDetail.bookName}</p>
                    <p>{bookDetail.author}</p>
                  </div>

                  <div className="book-detail__description">
                    <div className="book-detail__description-title">
                      책 소개
                    </div>
                    <div className="book-detail__description-text">
                      {isContent ? (
                        <p>이 책의 줄거리는 아직 준비 중이에요.</p>
                      ) : (
                        <p>{bookDetail.bookContent}</p>
                      )}
                    </div>
                  </div>

                  <button
                    className="book-detail__buy-button"
                    onClick={() =>
                      (window.location.href = `${bookDetail.link}`)
                    }
                  >
                    <div className="book-detail__buy-icon"></div>
                    <p>이 책 사고싶어요.</p>
                  </button>
                </>
              )}

              <div className="book-detail__reviews">
                <div className="book-detail__reviews-header">
                  {`이 책을 읽은 사람들의 리뷰(${totalReviewCount})`}
                </div>
                {!hasMyReview ? (
                  <button
                    className="book-detail__reviews-btn"
                    onClick={handleOpenReviewPopup}
                  >
                    <div className="book-detail__reviews-icon"></div>
                    <p>리뷰 작성하기</p>
                  </button>
                ) : (
                  <button className="book-detail__reviews-btn done">
                    <div className="book-detail__reviews-icon--done"></div>
                    <p>리뷰 작성완료</p>
                  </button>
                )}
              </div>

              <div className="book-detail__reviews-scroll" ref={scrollRef}>
                {!hasNoReviews ? (
                  <>
                    {review.map((item) => (
                      <>
                        <div
                          className="book-detail__reviews-list"
                          key={item.rvIdx}
                        >
                          <div
                            className={`book-detail__reviews-img ${
                              item.fileName === "default"
                                ? "book-detail__review-img-has-default"
                                : ""
                            }`}
                          >
                            {item.fileName === "default" ? (
                              <div className="book-detail__reviews-img--default" />
                            ) : (
                              <img src={item.fileName} alt="프로필 이미지" />
                            )}
                          </div>
                          <div className="book-detail__reviews-text-wrap">
                            <div className="book-detail__reviews-info">
                              <p className="book-detail__reviews-nickname">
                                {item.nickName}
                                {item.userIdx === user?.userIdx ? (
                                  <span className="book-detail__reviews-mine-label">
                                    내 리뷰
                                  </span>
                                ) : null}
                              </p>
                              <div className="book-detail__reviews-meta">
                                <p>{item.regDate}</p>
                                <div
                                  className="book-detail__review-add--btn"
                                  onClick={() =>
                                    handleToggleMoreMenu(item.rvIdx)
                                  }
                                ></div>
                              </div>
                            </div>
                            {openMoreReviewId === item.rvIdx && (
                              <div
                                className="book-detail__review-more--menu"
                                ref={
                                  openMoreReviewId === item.rvIdx
                                    ? moreMenuRef
                                    : null
                                }
                              >
                                {item.userIdx === user?.userIdx ? (
                                  <>
                                    <button
                                      className="book-detail__review-more-item"
                                      onClick={() =>
                                        handleReviewUpdate(item.rvIdx)
                                      }
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
                                ) : (
                                  <button
                                    className="book-detail__review-more-item"
                                    onClick={() => handleIsReport(item.rvIdx)}
                                  >
                                    신고하기
                                  </button>
                                )}
                              </div>
                            )}

                            <div className="book-detail__reviews-content">
                              {item.content}
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                    <div className="book-detail__reviews-more">
                      {loading && <SpinnerIcon />}
                      {!loading && hasMore && (
                        <button onClick={fetchMoreReview}>리뷰 더보기</button>
                      )}
                      {/* {loading ? (
                        <SpinnerIcon />
                      ) : (
                        more && (
                          <button onClick={fetchMoreReview}>리뷰 더보기</button>
                        )
                      )} */}
                    </div>
                  </>
                ) : (
                  <p className="book-detail__reviews-empty">
                    등록된 리뷰가 없습니다.
                    <br />
                    첫번째 리뷰를 남겨보세요!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoginPopup && (
        <LoginRequiredPopup onClose={() => setIsLoginPopup(false)} />
      )}

      {isReviewPopup && (
        <MemberKeywordDetailReviewPopup
          onSuccess={() => handleReviewSuccess("리뷰 작성이 완료되었습니다.")}
          onClose={() => setIsReviewPopup(false)}
          bookDetail={bookDetail}
          reviewList={reviewList}
          bookImg={bookImg}
        />
      )}

      {isReviewEditPopup && (
        <MemberKeywordDetailEditPopup
          onSuccess={() => handleReviewSuccess("리뷰 수정이 완료되었습니다.")}
          onClose={() => setIsReviewEditPopup(false)}
          selectedReview={selectedReview}
          bookDetail={bookDetail}
          bookImg={bookImg}
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
          reviewList={reviewList}
          bookDetail={bookDetail}
        />
      )}
    </>
  );
};

export default MemberKeywordDetail;
