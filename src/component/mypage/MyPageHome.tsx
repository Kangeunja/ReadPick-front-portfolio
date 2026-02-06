import { useEffect, useRef, useState } from "react";
import "../../assets/css/mypageHome.css";
import { Book } from "../../types/book";
import { BookImg } from "../../types/bookImg";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useOutletContext } from "react-router-dom";
import { MyPageOutletContext } from "../../types/mypage";

const MyPageHome = () => {
  const navigate = useNavigate();
  // interface 함수
  const { userInfo } = useOutletContext<MyPageOutletContext>();

  // 스크롤 함수
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(true);

  // 유저가 선택한 찜 리스트 정보
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);

  // 유저가 선택한 찜 리스트들의 책 이미지 정보
  const [favoriteBooksImg, setFavoriteBooksImg] = useState<BookImg[]>([]);

  useEffect(() => {
    fetchFavoriteBooks();
    fetchFavoriteBooksImg();
  }, []);

  // 유저가 선택한 찜 리스트 api
  const fetchFavoriteBooks = () => {
    axiosInstance
      .post("/myPage/userPickBookList", {})
      .then((res) => {
        setFavoriteBooks(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 유저가 선택한 찜 리스트들의 책 이미지 api
  const fetchFavoriteBooksImg = () => {
    axiosInstance
      .post("/myPage/bookmarkImageList", {})
      .then((res) => {
        setFavoriteBooksImg(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 좌/우 버튼 각각 클릭시 3칸씩 스크롤하는 함수
  const scrollList = (direction: "left" | "right") => {
    if (!listRef.current) return;

    const cardWidth = 180;
    const moveAmount = cardWidth * 3;

    listRef.current.scrollBy({
      left: direction === "right" ? moveAmount : -moveAmount,
      behavior: "smooth",
    });
  };

  // 현재 스크롤 위치를 기준으로 좌/우 스크롤 가능 여부를 판단
  const handleScroll = () => {
    if (!listRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = listRef.current;

    setScrollLeft(scrollLeft > 0);
    setScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  // 찜 목록중에 선택한 책 상세정보 이동
  const goToBookDetail = (bookIdx: number) => {
    navigate(`/member/keyword/detail/${bookIdx}`);
  };

  // 마이페이지에 프로필관리로 이동
  const goToProfileManage = () => {
    navigate("/mypage/profile");
  };

  // 마이페이지에 내 정보관리로 이동
  const goToMyInfo = () => {
    navigate("/mypage/myInfo");
  };

  const goToMyReview = () => {
    navigate("/mypage/myReview");
  };

  return (
    <div className="mypage-home">
      <div className="mypage-container">
        <div className="mypage-home__con-wrap">
          <div className="mypage-home__img-wrap">
            <div>
              <div
                className={`mypage-home__img ${
                  userInfo.fileName === "default"
                    ? "mypage-home__img-has-default"
                    : ""
                }`}
              >
                {userInfo.fileName === "default" ? (
                  <div className="mypage-home__img--default" />
                ) : (
                  <img src={userInfo.fileName} alt="프로필 이미지" />
                )}
              </div>
              <div className="mypage-home__img-box" onClick={goToProfileManage}>
                <div className="mypage-home__icon"></div>
              </div>
            </div>

            <div className="mypage-home__info-wrap">
              <div className="mypage-home__info">
                <p>
                  <span>{userInfo.nickName}</span>님
                </p>
                <p>마이페이지에 오신걸 환영합니다!</p>
              </div>

              <div className="mypage-home__btn-wrap">
                <button onClick={goToMyReview}>내리뷰</button>
                <button onClick={goToMyInfo}>내 정보 관리</button>
              </div>
            </div>
          </div>

          <div className="mypage-home__favorites-container">
            {scrollLeft && (
              <button
                className="mypage-home__nav-arrow left"
                onClick={() => scrollList("left")}
              >
                ◀
              </button>
            )}

            <div className="mypage-home__favorites-wrap">
              <div className="mypage-home__favorites-title">찜목록</div>

              <div
                className="mypage-home__favorites-box--wrap"
                ref={listRef}
                onScroll={handleScroll}
              >
                {favoriteBooks.length > 0 ? (
                  favoriteBooks.map((item, index) => (
                    <div
                      key={index}
                      className="mypage-home__favorites-box"
                      onClick={() => goToBookDetail(item.bookIdx)}
                    >
                      <div className="mypage-home__favorites-con">
                        <div className="mypage-home__favorites-img">
                          {favoriteBooksImg[index] && (
                            <img
                              src={favoriteBooksImg[index]?.fileName.replace(
                                "coversum",
                                "cover500"
                              )}
                              alt="책 이미지"
                            />
                          )}
                        </div>
                      </div>
                      <div className="mypage-home__favorites-info">
                        <p>{item.bookName}</p>
                        <p>{item.author}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="mypage-home__favorites-empty">
                    아직 찜한 책이 없어요.
                    <br />
                    마음에 드는 책을 찜해보세요.
                  </p>
                )}
              </div>
            </div>
            {scrollRight && favoriteBooks.length > 5 && (
              <button
                className="mypage-home__nav-arrow right"
                onClick={() => scrollList("right")}
              >
                ▶
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageHome;
