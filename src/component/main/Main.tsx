import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../recoil/userInfoState";
import "../../assets/css/main.css";
import { keywordSubtitles } from "../../types/keywordSubtitles";

const Main = () => {
  const navigate = useNavigate();

  // 오늘의 책
  const [todayBookData, setTodayBookData] = useState<any | null>(null);

  // 키워드 리스트
  const [keywordList, setKeywordList] = useState<any[]>([]);

  // 추천 도서
  const [genreBook, setGenreBook] = useState<any[]>([]);

  // 로그인 정보
  const [userInfo] = useRecoilState(userInfoState);
  const isLogin = !!userInfo?.userIdx;

  //
  const functionSubtitle = Array.from({ length: 3 }, () => ({
    book: "책제목",
    author: "지은이",
  }));

  // 최초 진입
  useEffect(() => {
    fetchInitData();
  }, []);

  const fetchInitData = () => {
    fetchKeywords();
    fetchTodayBook();
    fetchUserGenreBooks();
  };

  // 오늘의 책 api
  const fetchTodayBook = () => {
    axiosInstance
      .get("/todayBook")
      .then((res) => {
        // console.log(res.data);
        setTodayBookData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 오늘의 책 보러가기
  const handleTodayBook = (bookIdx: number, bsIdx: number) => {
    navigate(`/member/keyword/detail/${bookIdx}?bsIdx=${bsIdx}`);
  };

  // 키워드 중분류 리스트 api
  const fetchKeywords = () => {
    axiosInstance
      .get("/bsList")
      .then((res) => {
        console.log(res.data);
        setKeywordList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 유저 장르별 책 추천 api
  const fetchUserGenreBooks = () => {
    axiosInstance
      .get("/userGenreBook")
      .then((res) => {
        // console.log(res.data);
        setGenreBook(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 키워드별 페이지이동
  const handleKeyWordIdx = (bsIdx: number) => {
    navigate(`/member/keyword?bsIdx=${bsIdx}`);
  };

  // 추천도서별 페이지이동
  const handleBookDetail = (bookIdx: number, bsIdx: number) => {
    navigate(`/member/keyword/detail/${bookIdx}?bsIdx=${bsIdx}`);
  };

  return (
    <div className="main">
      <div
        className="main-today"
        onClick={() =>
          handleTodayBook(todayBookData.bookIdx, todayBookData.bsIdx)
        }
      >
        <div className="main-today-header">
          <div className="main-book-icon" />
          <div className="main-title-wrap">
            <p>READPICK이 추천하는 </p>
            <p>오늘의 도서</p>
          </div>
        </div>

        {todayBookData ? (
          <div className="main-today-img">
            <img
              src={todayBookData.bookImageName.replace("coversum", "cover500")}
              alt={todayBookData.bookName}
            />
          </div>
        ) : (
          <p className="main-none-text">오늘의 책을 준비 중이에요 📚</p>
        )}
      </div>

      <div className="main-keyword-wrap">
        <div className="main-keyword-container">
          <div className="main-keyword-title">
            <p>키워드로 골라보는 추천 책</p>
            <p>관심 있는 주제를 선택하면 관련 도서를 볼 수 있어요</p>
          </div>

          <div className="main-keyword-list">
            {keywordList.map((item) => (
              <div
                key={item.bsIdx}
                className="main-keyword-item"
                onClick={() => handleKeyWordIdx(item.bsIdx)}
              >
                <p>{keywordSubtitles[item.bsName]}</p>
                <p>{item.bsName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="main-interest-wrap">
        <div className="main-interest-container">
          <div className="main-interest-title">
            <p>지금 읽기 좋은 책</p>
            <p>READ PICK이 선택한 관심사를 바탕으로 추천했어요</p>
          </div>

          {genreBook.length > 0 ? (
            genreBook.map((item) => (
              <div
                className="recommend-book"
                key={item.bookIdx}
                onClick={() => handleBookDetail(item.bookIdx, item.bsIdx)}
              >
                <img
                  className="recommend-book-img"
                  src={item.bookImageName.replace("coversum", "cover500")}
                  alt={item.bookName}
                />

                <div className="recommend-book-info">
                  <p>{item.bookName}</p>
                  <p>{item.author}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="main-interest-sub-box">
              {isLogin ? (
                <p>
                  맞춤추천을 준비하고 있어요 <br />
                  관심사를 선택하면 책을 골라드릴게요
                </p>
              ) : (
                <p>
                  로그인하고 관심사를 선택하면 <br />
                  맞춤 추천을 받아볼 수 있어요 🔐
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="main-function-wrap">
        <div className="main-function-container">
          <div className="main-function-title">
            <p>도서 탐색과 리뷰 기능을 제공해요</p>
            <p>책의 줄거리와 리뷰를 통해 관심 있는 도서를 살펴볼 수 있어요</p>
          </div>

          <div className="main-feature-list">
            <div className="main-feature-item">
              <div className="main-feature-text">
                <p>찜기능 & 찜목록</p>
                <p>
                  책의 리뷰와 줄거리를 통해 맘에 들면 저장할수 있고, 찜목록을
                  통해 저장한 책을 확인할수 있습니다.
                </p>
              </div>
              <div className="main-feature-content">
                <div className="main-feature-preview-left">
                  <div className="main-feature-book-card"></div>
                  <div className="main-feature-icon-heart"></div>
                  <div className="main-feature-icon-like"></div>
                  <div></div>
                </div>
                <p className="main-feature-divider">&</p>
                <div className="main-feature-preview-right">
                  <span>찜목록</span>
                  <div className="main-wishlist">
                    {functionSubtitle.map((item) => (
                      <div className="main-wishlist-item">
                        <div className="main-wishlist-thumbnail"></div>
                        <div className="main-wishlist-info">
                          <p>{item.book}</p>
                          <p>{item.author}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="main-feature-review">
              <div className="main-feature-text">
                <p>리뷰기능</p>
                <p>
                  다른사람에게 후기를 남겨주고 싶을때 해당 기능을 통해 리뷰를
                  남길수 있습니다.
                </p>
              </div>

              <div className="main-review-preview">
                <div className="main-review-avatar"></div>
                <div className="main-review-content">
                  <p>아이디</p>
                  <p>
                    이 책은 이제 막 취업 준비하는 준비생들에게 도움이
                    많이될것같다.
                  </p>
                </div>
              </div>
            </div>

            <div className="main-feature-recommend">
              <div className="main-feature-text">
                <p>추천기능</p>
                <p>
                  다른사람에게 책을 추천하고 싶을때 해당 기능을 통해 추천할수
                  있습니다.
                </p>
              </div>

              <div className="main-recommend-preview">
                <div className="main-recommend-book-card"></div>
                <div className="main-recomend-icon-heart"></div>
                <div className="main-recomend-icon-like"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
