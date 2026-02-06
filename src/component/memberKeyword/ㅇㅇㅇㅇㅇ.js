// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import { useRecoilState } from "recoil";
// import MemberKeywordDetailPopup from "../popup/MemberKeywordDetailPopup";
// import { userInfoState } from "../../recoil/userInfoState";
// import { bookmarkState } from "../../recoil/bookmarkState";
// import { isGoodState } from "../../recoil/isGoodState";
// import axiosInstance from "../../api/axiosInstance";
// import "../../assets/css/memberKeywordDetail.css";
// import MemberKeywordDetailReviewPopup from "../popup/MemberKeywordDetailReviewPopup";
// import SpinnerIcon from "../../icon/SpinnerIcon";
// import profileDefaultImg from "../../assets/img/icon-profile.png";
// import KeywordLayout from "../../layouts/keywordLayout/KeywordLayout";
// import TopMenu from "../../layouts/topMenu/TopMenu";

// interface BookDetail {
//   author: string;
//   bookName: string;
//   bookContent: string;
//   bookIdx: number;
//   link: string;
// }

// interface Review {
//   content: string;
//   regDate: string;
//   nickName: string;
//   bookIdx: number;
//   rvIdx: number;
//   fileName: string;
// }

// interface SubBookNames {
//   bookName: string;
//   author: string;
//   bookIdx: number;
// }

// interface SearchResult {
//   author: string;
//   bookName: string;
//   bookImageName: String;
//   bookIdx: number;
// }

// interface BookNames {
//   bookName: string;
//   author: string;
//   bookIdx: number;
// }

// const MemberKeywordDetail = () => {
//   const navigate = useNavigate();

//   // 유저 정보
//   const [user] = useRecoilState(userInfoState);

//   // URL에서 bookIdx 쿼리 파라미터 값 추출
//   const { bookIdx } = useParams();
//   const bookIdxNumber = bookIdx ? parseInt(bookIdx, 10) : null;

//   // 로딩바 상태
//   // const [loading, setLoading] = useState(false);

//   // 스크롤 포커싱
//   // const scrollRef = useRef<HTMLDivElement | null>(null);

//   // 책 대표 이미지
//   // const [bookImg, setBookImg] = useState({
//   //   fileName: "",
//   // });

//   // 북마크 유무
//   // const [isBookMark, setIsBookMark] = useRecoilState(bookmarkState);

//   // 책 상세 정보
//   // const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);

//   // 책 줄거리 유무
//   // const [isContent, setIsContent] = useState(false);

//   // 리뷰 없을 때 메세지
//   // const [reviewMessage, setReviewMessage] = useState(false);

//   // 리뷰 리스트
//   // const [review, setReview] = useState<Review[]>([]);

//   // 마지막 리뷰의 rvIdx
//   // const [lastRvIdx, setLastRvIdx] = useState(null);

//   // 선택된 리뷰내용
//   // const [selectedReview, setSelectedReview] = useState<Review | null>(null);

//   // 리뷰 수정 팝업
//   // const [isPopup, setIsPopup] = useState(false);

//   // 추천 완료 유무
//   // const [isGood, setIsGood] = useRecoilState(isGoodState);

//   // 책 추천수
//   // const [checkCount, setCheckCount] = useState(0);

//   // 무한 스크롤 콘텐츠 유무
//   // const [more, setMore] = useState(true);

//   // 리뷰작성 팝업
//   // const [isReviewPopup, setIsReviewPopup] = useState(false);

//   // 키워드
//   const [keyword, setKeyword] = useState([]);

//   // 소분류 책 리스트
//   // const [subBookList, setSubBookList] = useState<SubBookNames[]>([]);

//   // 메인페이지에서 선택한 중분류의 소분류 리스트 api
//   const keywordList = () => {
//     axiosInstance
//       .get("/bssListByBsIdx")
//       .then((res) => {
//         console.log(res.data);
//         setKeyword(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // 키워드 리스트 토글 상태
//   const handleClickTitle = (bsIdx: number) => {
//     setSubBookList([]);
//     setSearchResultList([]);
//     setKeywordToggle(bsIdx);
//     fetchSetClick(bsIdx);
//     bookListImg(bsIdx);
//     navigate(`/member/keyword?bsIdx=${bsIdx}`);
//   };

//   // 책 정보 api
//   const fetchSetClick = (bsIdx: number) => {
//     axiosInstance
//       .get("/bookListByBsIdx", {
//         params: {
//           bsIdx: bsIdx,
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//         setBookList(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // 유저가 선택한 중분류의 책 이미지 리스트 api
//   const bookListImg = (bsIdx: number) => {
//     axiosInstance
//       .get("/bsImageList", {
//         params: {
//           bsIdx: bsIdx,
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//         setBookImg(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // 유저가 선택한 소분류 정보 api
//   const handleClickSubTitle = (bssIdx: number) => {
//     setBookList([]);
//     setSearchResultList([]);
//     subBookListImg(bssIdx);
//     axiosInstance
//       .get("/bookListByBssIdx", { params: { bssIdx: bssIdx } })
//       .then((res) => {
//         console.log(res.data);
//         setSubBookList(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     // navigate(`/member/keyword?bsIdx=${bsIdxNumber}&bssIdx=${bssIdx}`);
//   };

//   // 유저가 선택한 소분류 책 이미지 리스트 api
//   const subBookListImg = (bssIdx: number) => {
//     axiosInstance
//       .get("/bssImageList", {
//         params: {
//           bssIdx: bssIdx,
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//         setSubBookImg(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // 페이지 로드시 api호출
//   // useEffect(() => {
//   //   if (bookIdxNumber !== null) {
//   //     handleBookDetail(bookIdxNumber);
//   //     bookDetailImg(bookIdxNumber);
//   //     reviewList(bookIdxNumber);
//   //     handleCheckGood();
//   //   }
//   //   if (user) {
//   //     bookMarkCheck();
//   //     goodCheck();
//   //   }
//   // }, [bookIdxNumber]);

//   // 책 대표 이미지 api
//   // const bookDetailImg = (bookIdx: number) => {
//   //   axiosInstance
//   //     .get("/bookImageOne", {
//   //       params: {
//   //         bookIdx: bookIdx,
//   //       },
//   //     })
//   //     .then((res) => {
//   //       console.log(res.data);
//   //       setBookImg(res.data);
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //     });
//   // };

//   // 책 상세정보 api
//   // const handleBookDetail = (bookIdx: number) => {
//   //   axiosInstance
//   //     .get("/bookOne", {
//   //       params: {
//   //         bookIdx: bookIdx,
//   //       },
//   //     })
//   //     .then((res) => {
//   //       console.log(res.data);
//   //       setBookDetail(res.data);
//   //       if (!res.data.bookContent || res.data.bookContent.trim() === "") {
//   //         setIsContent(true);
//   //       } else {
//   //         setIsContent(false);
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //     });
//   // };

//   // 북마크 확인 api
//   // const bookMarkCheck = () => {
//   //   axiosInstance
//   //     .get("/isBookmark", {
//   //       params: { bookIdx: bookIdx },
//   //     })
//   //     .then((res) => {
//   //       console.log(res.data);
//   //       if (res.data === "Y") {
//   //         setIsBookMark(true);
//   //       } else {
//   //         setIsBookMark(false);
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //     });
//   // };

//   // 추천 확인 api
//   // const goodCheck = () => {
//   //   axiosInstance
//   //     .get("/isRec", {
//   //       params: { bookIdx: bookIdx },
//   //     })
//   //     .then((res) => {
//   //       console.log(res.data);
//   //       if (res.data === "Y") {
//   //         setIsGood(true);
//   //       } else {
//   //         setIsGood(false);
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //     });
//   // };

//   // 북마크 추가 api
//   // const handleIsBookMark = () => {
//   //   if (!user) {
//   //     alert("로그인이 필요한 서비스입니다.");
//   //     navigate("/login");
//   //     return;
//   //   }

//   //   if (bookDetail?.bookIdx && bookDetail?.bookIdx > 0) {
//   //     axiosInstance
//   //       .post(`/bookmark?bookIdx=${bookIdx}`)
//   //       .then((res) => {
//   //         console.log(res.data);
//   //         if (res.data.message === "로그인필요.") {
//   //           alert("로그인이 필요한 서비스입니다.");
//   //           navigate("/login");
//   //         } else if (res.data.message === "북마크추가완료") {
//   //           alert("찜목록에 추가되었습니다.");
//   //           setIsBookMark(true);
//   //           if (window.confirm("찜목록으로 이동하시겠습니까?")) {
//   //             navigate("/mypage");
//   //           }
//   //         } else {
//   //           alert("찜목록에 해제되었습니다.");
//   //           setIsBookMark(false);
//   //         }
//   //       })
//   //       .catch((error) => {
//   //         console.log(error);
//   //       });
//   //   }
//   // };

//   // 책 추천 api
//   // const handleIsGood = () => {
//   //   axiosInstance
//   //     .post(`/recommend?bookIdx=${bookIdx}`)
//   //     .then((res) => {
//   //       console.log(res.data);
//   //       if (res.data.message === "로그인필요.") {
//   //         alert("로그인이 필요한 서비스입니다.");
//   //         navigate("/login");
//   //       }
//   //       if (res.data.message === "추천완료") {
//   //         setIsGood(true);
//   //       } else {
//   //         setIsGood(false);
//   //       }
//   //       handleCheckGood();
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //     });
//   // };

//   // 책 추천수 api
//   // const handleCheckGood = () => {
//   //   if (!bookIdxNumber) return;
//   //   axiosInstance
//   //     .get("/recCount", {
//   //       params: {
//   //         bookIdx: bookIdxNumber,
//   //       },
//   //     })
//   //     .then((res) => {
//   //       console.log(res.data);
//   //       setCheckCount(res.data);
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //     });
//   // };

//   // 리뷰 리스트 api
//   // const reviewList = (bookIdx: number) => {
//   //   axiosInstance
//   //     .get("/reviewList", {
//   //       params: {
//   //         bookIdx: bookIdx,
//   //       },
//   //     })
//   //     .then((res) => {
//   //       console.log(res.data);
//   //       setReview(res.data);
//   //       if (res.data.length > 0) {
//   //         setLastRvIdx(res.data[res.data.length - 1].rvIdx); // 마지막 리뷰의 rvIdx 저장
//   //       }
//   //       setReviewMessage(res.data.length === 0);
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //     });
//   // };

//   // 리뷰 신고버튼 api
//   // const handleDeclaration = (rvIdx: number) => {
//   //   if (window.confirm("신고하시겠습니까?")) {
//   //     axiosInstance
//   //       .get("/reportReview", {
//   //         params: { rvIdx: rvIdx },
//   //       })
//   //       .then((res) => {
//   //         console.log(res.data);
//   //         if (res.data === "reportReview:success") {
//   //           alert("신고 완료되었습니다.");
//   //         } else {
//   //           alert("이미 신고된 이력이 있습니다.");
//   //         }
//   //       })
//   //       .catch((error) => {
//   //         console.log(error);
//   //       });
//   //   }
//   // };

//   // 리뷰 수정버튼  api
//   // const handleReviewUpdate = (rvIdx: number) => {
//   //   const reviewNumber = review.find((item) => item.rvIdx === rvIdx) || null;
//   //   setSelectedReview(reviewNumber);
//   //   setIsPopup(true);
//   // };

//   // 리뷰 삭제버튼 api
//   // const handleReviewDelete = () => {
//   //   if (window.confirm("정말로 해당 리뷰를 삭제하시겠습니까?")) {
//   //     axiosInstance
//   //       .get("/reviewDelete", {
//   //         params: {
//   //           bookIdx: bookDetail?.bookIdx,
//   //         },
//   //       })
//   //       .then((res) => {
//   //         console.log(res);
//   //         if (res.data === "success") {
//   //           alert("해당 리뷰가 삭제되었습니다.");
//   //           reviewList(bookDetail?.bookIdx!);
//   //         }
//   //       })
//   //       .catch((error) => {
//   //         console.log(error);
//   //       });
//   //   }
//   // };

//   // 무한스크롤
//   // useEffect(() => {
//   //   const handleScroll = () => {
//   //     if (!scrollRef.current && loading && !more) return;

//   //     const scrollContainer = scrollRef.current as HTMLDivElement;
//   //     const { scrollTop, clientHeight, scrollHeight } = scrollContainer;

//   //     if (scrollTop + clientHeight >= scrollHeight - 200) {
//   //       fetchMoreReview();
//   //     }
//   //   };

//   //   if (scrollRef.current) {
//   //     scrollRef.current.addEventListener("scroll", handleScroll);
//   //   }

//   //   return () => {
//   //     if (scrollRef.current) {
//   //       scrollRef.current.removeEventListener("scroll", handleScroll);
//   //     }
//   //   };
//   // }, [more, loading, lastRvIdx]);

//   // 다음 리뷰리스트 api
//   // const fetchMoreReview = async () => {
//   //   if (!more || loading || lastRvIdx === null) return;
//   //   setLoading(true);

//   //   try {
//   //     const res = await axiosInstance.get("/reviewMore", {
//   //       params: {
//   //         rvIdx: lastRvIdx,
//   //       },
//   //     });

//   //     if (res.data.length > 0) {
//   //       await new Promise((resolve) => setTimeout(resolve, 900)); // 다음 틱으로 넘기기
//   //       setReview((prev) => [...prev, ...res.data]);
//   //       setLastRvIdx(res.data[res.data.length - 1].rvIdx);
//   //     } else {
//   //       setMore(false);
//   //     }
//   //     setLoading(false);
//   //   } catch (error) {
//   //     console.log(error);
//   //     setLoading(false);
//   //   }
//   // };

//   // 공통 프로필 이미지 렌더링 함수
//   // const renderProfileImg = (fileName: string) => (
//   //   <img
//   //     src={fileName === "default" ? profileDefaultImg : fileName}
//   //     className={
//   //       fileName === "default"
//   //         ? "keyword-detail-review-default-img"
//   //         : "keyword-detail-review-set-img"
//   //     }
//   //     alt="이미지"
//   //   />
//   // );

//   return (
//     <>
//       <div className="keyword-detail-page">
//         <div className="keyword-detail-container">
//           <TopMenu
//             keywordList={keyword}
//             selectedBsIdx={bsIdxNumber}
//             selectedBssIdx={bssIdxNumber}
//             onBsClick={onBsClick}
//             onBssClick={onBssClick}
//           />
//         </div>
//         {/* <div className="keyword-detail-img-wrap">
//           <div className="keyword-detail-img">
//             {bookImg && (
//               <img
//                 src={bookImg.fileName.replace("coversum", "cover500")}
//                 alt="책 이미지"
//               />
//             )}
//           </div>

//           <div className="keyword-detail-icon-wrap">
//             <div
//               className={
//                 isBookMark ? `keyword-detail-save add` : "keyword-detail-save"
//               }
//               onClick={handleIsBookMark}
//             ></div>
//             <div className="keyword-detail-good-wrap">
//               <div className="keyword-detail-good-text">{`추천해요${checkCount}`}</div>
//               <div
//                 className={
//                   isGood ? `keyword-detail-good add` : "keyword-detail-good"
//                 }
//                 onClick={handleIsGood}
//               ></div>
//             </div>
//           </div>
//         </div> */}

//         {/* <div className="keyword-detail-right-con-wrap">
//           {bookDetail && (
//             <>
//               <div className="keyword-detail-right-text">
//                 <p>{bookDetail.bookName}</p>
//                 <p>{bookDetail.author}</p>
//                 {isContent ? (
//                   <p>줄거리가 없습니다.</p>
//                 ) : (
//                   <p>{bookDetail.bookContent}</p>
//                 )}
//               </div>

//               <button
//                 className="keyword-detail-buy-button"
//                 onClick={() => (window.location.href = `${bookDetail.link}`)}
//               >
//                 이 책 사고 싶어요!
//               </button>
//             </>
//           )}

//           <div className="keyword-detail-review-wrap">
//             <div className="keyword-detail-review-text">
//               <p>이 책을 읽은 사람들의 리뷰</p>
//               <button onClick={() => setIsReviewPopup(true)}>
//                 리뷰 남기기
//               </button>
//             </div>

//             <div className="keyword-detail-scroll-container">
//               <div
//                 className={`keyword-detail-scroll-wrap ${
//                   reviewMessage ? "no-review" : ""
//                 }`}
//                 ref={scrollRef}
//               >
//                 {!reviewMessage ? (
//                   <>
//                     {review.map((item, index) => (
//                       <div className="keyword-detail-box-wrap" key={index}>
//                         <div className="keyword-detail-box">
//                           {user?.nickName !== item.nickName ? (
//                             <button
//                               className="keyword-detail-declaration-button"
//                               onClick={() => handleDeclaration(item.rvIdx)}
//                             >
//                               신고
//                             </button>
//                           ) : (
//                             <div className="keyword-detail-button-wrap">
//                               <button
//                                 onClick={() => handleReviewUpdate(item.rvIdx)}
//                               >
//                                 수정
//                               </button>
//                               <button onClick={handleReviewDelete}>삭제</button>
//                             </div>
//                           )}
//                           <div className="keyword-detail-review-img">
//                             {renderProfileImg(item.fileName)}
//                           </div>
//                           <div className="keyword-detail-text-wrap">
//                             <p>{item.nickName}</p>

//                             <textarea
//                               className="keyword-detail-text-select"
//                               value={item.content}
//                               readOnly
//                               maxLength={200}
//                             ></textarea>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                     {loading && more && review.length > 0 && <SpinnerIcon />}
//                   </>
//                 ) : (
//                   <p className="keyword-detail-review-no">
//                     아직 리뷰가 없어요!
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div> */}
//       </div>
//       {/* {isPopup && selectedReview && (
//         <MemberKeywordDetailPopup
//           selectedReview={selectedReview}
//           renderProfileImg={renderProfileImg}
//           onClose={(updatedReview: any) => {
//             setIsPopup(false);
//             if (updatedReview) {
//               setReview((prevReviews) =>
//                 prevReviews.map((review) =>
//                   review.rvIdx === updatedReview.rvIdx
//                     ? { ...review, ...updatedReview }
//                     : review
//                 )
//               );
//             }
//           }}
//         />
//       )} */}
//       {/* {isReviewPopup && (
//         <MemberKeywordDetailReviewPopup
//           onClose={() => setIsReviewPopup(false)}
//           bookDetail={bookDetail}
//           reviewList={reviewList}
//           bookImg={bookImg}
//         />
//       )} */}
//     </>
//   );
// };
// export default MemberKeywordDetail;
