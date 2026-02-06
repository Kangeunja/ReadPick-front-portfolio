import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import KeywordLayout from "../../layouts/keywordLayout/KeywordLayout";
import { BookNames, SearchResult, SubBookNames } from "../../types/book";
import "../../assets/css/memberKeyword.css";
import { BookImg } from "../../types/bookImg";

const MemberKeyword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // URL에서 bsIdx 쿼리 파라미터 값 추출
  const bsIdx = queryParams.get("bsIdx");
  const bsIdxNumber = bsIdx ? Number(bsIdx) : null;

  // URL에서 bssIdx 쿼리 파라미터 값 추출
  const bssIdx = queryParams.get("bssIdx");
  const bssIdxNumber = bssIdx ? Number(bssIdx) : null;

  // URL에서 검색 옵션 파라미터 값 추출
  const option = queryParams.get("option");
  const keywordText = queryParams.get("keyword");

  // 중분류 카테고리에 대한 책 리스트 정보
  const [bookList, setBookList] = useState<BookNames[]>([]);

  // 소분류 카테고리에 대한 책 리스트 정보
  const [subBookList, setSubBookList] = useState<SubBookNames[]>([]);

  // 중분류 카테고리에 대한 책 리스트 이미지
  const [bookImg, setBookImg] = useState<BookImg[]>([]);

  // 소분류 카테고리에 대한 책 리스트 이미지
  const [subBookImg, setSubBookImg] = useState<BookImg[]>([]);

  // 검색결과 리스트 정보
  const [searchResultList, setSearchResultList] = useState<SearchResult[]>([]);

  // 각 카테고리 클릭시 전체 책 건수
  const totalBookCount =
    searchResultList.length || subBookList.length || bookList.length || 0;

  // 페이지 로드시 api호출
  useEffect(() => {
    // 공통 초기화
    setBookList([]);
    setSubBookList([]);
    setSearchResultList([]);

    // 검색
    if (option && keywordText) {
      if (option === "도서명") fetchBooksByTitle();
      if (option === "작가명") fetchBooksByAuthor();
    }

    // 소분류 선택시
    if (bssIdxNumber !== null) {
      fetchBooksBySubCategory(bssIdxNumber);
      fetchSubCategoryBookImages(bssIdxNumber);
      return;
    }

    // 중분류만 선택시
    if (bsIdxNumber !== null) {
      fetchBooksByCategory(bsIdxNumber);
      fetchCategoryBookImages(bsIdxNumber);
    }
  }, [option, keywordText, bssIdxNumber, bsIdxNumber]);

  // 유저가 선택한 중분류 카테고리 클릭시 함수
  const handleCategoryClick = (bsIdx: number) => {
    setSubBookList([]);
    setSearchResultList([]);
    fetchBooksByCategory(bsIdx);
    fetchCategoryBookImages(bsIdx);
    navigate(`/member/keyword?bsIdx=${bsIdx}`);
  };

  // 유저가 선택한 중분류 카테고리에 대한 책 리스트 api
  const fetchBooksByCategory = (bsIdx: number) => {
    axiosInstance
      .get("/bookListByBsIdx", {
        params: {
          bsIdx: bsIdx,
        },
      })
      .then((res) => {
        setBookList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 유저가 선택한 중분류의 카테고리에 대한 책 이미지 리스트 api
  const fetchCategoryBookImages = (bsIdx: number) => {
    axiosInstance
      .get("/bsImageList", {
        params: {
          bsIdx: bsIdx,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBookImg(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 유저가 선택한 소분류 카테고리 클릭시 함수
  const handleSubCategoryClick = (bssIdx: number) => {
    setBookList([]);
    setSearchResultList([]);
    fetchBooksBySubCategory(bssIdx);
    fetchSubCategoryBookImages(bssIdx);
    navigate(`/member/keyword?bsIdx=${bsIdxNumber}&bssIdx=${bssIdx}`);
  };

  // 유저가 선택한 소분류 카테고리에 대한 책 리스트 api
  const fetchBooksBySubCategory = (bssIdx: number) => {
    axiosInstance
      .get("/bookListByBssIdx", { params: { bssIdx: bssIdx } })
      .then((res) => {
        setSubBookList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 유저가 선택한 소분류 카테고리에 대한 책 이미지 리스트 api
  const fetchSubCategoryBookImages = (bssIdx: number) => {
    axiosInstance
      .get("/bssImageList", {
        params: {
          bssIdx: bssIdx,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSubBookImg(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 책 상세정보 페이지이동
  const navigateToBookDetail = (bookIdx: number) => {
    let url = `/member/keyword/detail/${bookIdx}?bsIdx=${bsIdx}`;
    if (bssIdx !== null) {
      url += `&bssIdx=${bssIdx}`;
    }
    navigate(url);
  };

  // 도서명으로 검색한 결과 리스트 api
  const fetchBooksByTitle = () => {
    setBookList([]);
    setSubBookList([]);
    axiosInstance
      .get("/bookNameSearch", {
        params: { bookName: keywordText },
      })
      .then((res) => {
        setSearchResultList(res.data);
      })
      .catch((error) => console.log(error));
  };

  // 작가명으로 검색한 결과 리스트 api
  const fetchBooksByAuthor = () => {
    setBookList([]);
    setSubBookList([]);
    axiosInstance
      .get("/authorSearch", {
        params: { author: keywordText },
      })
      .then((res) => {
        setSearchResultList(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="keyword__page">
      <div className="keyword__container">
        <KeywordLayout
          onBsClick={handleCategoryClick}
          onBssClick={handleSubCategoryClick}
        />

        <div className=" keyword__content">
          <div className="keyword__count">
            <p>
              전체<span>{totalBookCount}</span>건
            </p>
          </div>
          <div className="keyword__list">
            {searchResultList.length > 0 ? (
              searchResultList.map((item, index) => (
                <div
                  className="keyword-card"
                  key={index}
                  onClick={() => navigateToBookDetail(item.bookIdx)}
                >
                  <div className="keyword-card__image">
                    <img
                      src={item.bookImageName.replace("coversum", "cover500")}
                      alt="책 이미지"
                    />
                  </div>
                  <div className="keyword-card__info">
                    <p className="keyword-card__title">{item.bookName}</p>
                    <p className="keyword-card__author">{item.author}</p>
                  </div>
                </div>
              ))
            ) : keywordText ? (
              <p className="keyword__empty">검색 결과가 없습니다.</p>
            ) : bookList.length > 0 ? (
              bookList.map((item, index) => (
                <div
                  className="keyword-card"
                  key={index}
                  onClick={() => navigateToBookDetail(item.bookIdx)}
                >
                  <div className="keyword-card__image">
                    {bookImg[index] && (
                      <img
                        src={bookImg[index]?.fileName.replace(
                          "coversum",
                          "cover500"
                        )}
                        alt="책 이미지"
                      />
                    )}
                  </div>
                  <div className="keyword-card__info">
                    <p className="keyword-card__title">{item.bookName}</p>
                    <p className="keyword-card__author">{item.author}</p>
                  </div>
                </div>
              ))
            ) : subBookList.length > 0 ? (
              subBookList.map((item, index) => (
                <div
                  className="keyword-card"
                  key={index}
                  onClick={() => navigateToBookDetail(item.bookIdx)}
                >
                  <div className="keyword-card__image ">
                    {subBookImg[index] && (
                      <img
                        src={subBookImg[index]?.fileName.replace(
                          "coversum",
                          "cover500"
                        )}
                        alt="책 이미지"
                      />
                    )}
                  </div>
                  <div className="keyword-card__info">
                    <p className="keyword-card__title">{item.bookName}</p>
                    <p className="keyword-card__author">{item.author}</p>
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MemberKeyword;
