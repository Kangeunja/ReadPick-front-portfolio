import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import KeywordLayout from "../../layouts/KeywordLayout";
import { Book, BookImg } from "../../types/book";
import BookCard from "./BookCard";

const MemberKeyword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // URL 파라미터 추출
  const bsIdx = queryParams.get("bsIdx");
  const bssIdx = queryParams.get("bssIdx");
  const option = queryParams.get("option");
  const keywordText = queryParams.get("keyword");

  // 데이터 상태 관리
  const [books, setBooks] = useState<Book[]>([]); // 현재 화면에 보여줄 도서 리스트
  const [images, setImages] = useState<BookImg[]>([]); // 도서 이미지 리스트

  // 데이터 로직 로딩
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (option && keywordText) {
          const point =
            option === "도서명" ? "/bookNameSearch" : "/authorSearch";
          const res = await axiosInstance.get(point, {
            params:
              option === "도서명"
                ? { bookName: keywordText }
                : { author: keywordText },
          });
          setBooks(res.data);
        } else if (bssIdx) {
          const [listRes, imgRes] = await Promise.all([
            axiosInstance.get("/bookListByBssIdx", { params: { bssIdx } }),
            axiosInstance.get("/bssImageList", { params: { bssIdx } }),
          ]);
          setBooks(listRes.data);
          setImages(imgRes.data);
        } else if (bsIdx) {
          const [listRes, imgRes] = await Promise.all([
            axiosInstance.get("/bookListByBsIdx", { params: { bsIdx } }),
            axiosInstance.get("/bsImageList", { params: { bsIdx } }),
          ]);
          setBooks(listRes.data);
          setImages(imgRes.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [option, keywordText, bssIdx, bsIdx]);

  // 이벤트 핸들러
  const handleCategoryChange = (type: string, idx: number) => {
    const path =
      type === "bs"
        ? `/member/keyword?bsIdx=${idx}`
        : `/member/keyword?bsIdx=${bsIdx}&bssIdx=${idx}`;
    navigate(path);
  };

  const goToDetail = (bookIdx: number) => {
    const detailPath = `/member/keyword/detail/${bookIdx}?bsIdx=${bsIdx}${bssIdx ? `&bssIdx=${bssIdx}` : ""}`;
    navigate(detailPath);
  };

  return (
    <div className="w-full">
      <div className="w-main-w mx-auto">
        <KeywordLayout
          onBsClick={(idx) => handleCategoryChange("bs", idx)}
          onBssClick={(idx) => handleCategoryChange("bss", idx)}
        />

        <div className="w-[980px] float-right">
          <div
            className="w-full pb-[10px] border-b border-[#eaeaea]
          font-medium mb-[40px]
          "
          >
            <p>
              전체<span className="text-[#248f8f]">{books.length}</span>건
            </p>
          </div>
          <div className="flex flex-wrap gap-[45px] mb-[200px]">
            {books.length > 0 ? (
              books.map((item, idx) => (
                <BookCard
                  key={idx}
                  item={item}
                  imgUrl={item.bookImageName || images[idx]?.fileName}
                  onCardClick={goToDetail}
                />
              ))
            ) : (
              <p className="w-full text-center mp-[100px]">
                {keywordText
                  ? "검색 결과가 없습니다."
                  : "도서를 불러오는 중이거나 데이터가 없습니다."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MemberKeyword;
