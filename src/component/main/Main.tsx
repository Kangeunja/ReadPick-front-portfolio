import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../recoil/userInfoState";
import { keywordSubtitles } from "../../types/keywordSubtitles";

interface BookItem {
  bookIdx: number;
  bsIdx: number;
  bookName: string;
  bookImageName: string;
  bsName: string;
  author?: string;
}

interface FeatureBook {
  book: string;
  author: string;
}

// 기능 소개 영역에 사용할 기본(더미) 도서 데이터 3개 생성
const DUMMY_FEATURE_BOOKS: FeatureBook[] = Array.from({ length: 3 }, () => ({
  book: "책제목",
  author: "지은이",
}));

const Main = () => {
  const navigate = useNavigate();
  const [userInfo] = useRecoilState(userInfoState); // 로그인 사용자 정보
  const isLogin = !!userInfo?.userIdx; // 사용자 로그인 여부

  // 상태 관리
  const [todayBookData, setTodayBookData] = useState<BookItem | null>(null); // 오늘의 책 정보
  const [keywordList, setKeywordList] = useState<BookItem[]>([]); // 키워드 리스트
  const [genreBook, setGenreBook] = useState<BookItem[]>([]); // 추천 도서 리스트
  const [isLoading, setIsLoading] = useState(true);

  const fetchInitData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [keyword, todayBook, userGenre] = await Promise.all([
        axiosInstance.get("bsList"),
        axiosInstance.get("todayBook"),
        axiosInstance.get("userGenreBook"),
      ]);

      setKeywordList(keyword.data);
      setTodayBookData(todayBook.data);
      setGenreBook(userGenre.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 메인페이지 최초 진입 시 필요한 초기 데이터 로드
  useEffect(() => {
    fetchInitData();
  }, []);

  // 상세 페이지 이동함수
  const gotoDetail = (bookIdx: number, bsIdx: number) => {
    if (!bookIdx || !bsIdx) return;
    navigate(`/member/keyword/detail/${bookIdx}?bsIdx=${bsIdx}`);
  };

  // 이미지 경로 변환 함수
  const getCoverImage = (url: string) => url?.replace("coversum", "cover500");

  // 키워드별 페이지이동
  const handleKeyWordIdx = (bsIdx: number) => {
    navigate(`/member/keyword?bsIdx=${bsIdx}`);
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-xl font-gowun">
          READPICK이 책을 고르고 있어요... 📚
        </p>
      </div>
    );
  }
  return (
    <div className="w-full pt-5">
      <div
        className="
        w-main-w h-[400px] bg-[#248f8f] 
        mx-auto p-[30px] rounded-[20px] 
        box-border relative  mb-[150px] 
        cursor-pointer"
        onClick={() => {
          if (todayBookData) {
            gotoDetail(todayBookData.bookIdx, todayBookData.bsIdx);
          }
        }}
      >
        <div className="flex items-end absolute bottom-[30px]">
          <div className="w-40 h-[180px] bg-main-book" />
          <div className="text-white">
            <p>READPICK이 추천하는 </p>
            <p className="text-[45px] font-gowun mb-[5px]">오늘의 도서</p>
          </div>
        </div>

        {todayBookData ? (
          <div
            className="
          w-[234px] h-[340px] 
          shadow-[0_4px_17.2px_rgba(0,0,0,0.5)] 
          absolute right-[180px]"
          >
            <img
              className="w-full h-full"
              src={getCoverImage(todayBookData.bookImageName)}
              alt={todayBookData.bookName}
            />
          </div>
        ) : (
          <p
            className="
              w-[234px] h-[340px] 
              absolute right-[180px] 
              text-center leading-[340px] 
              bg-[rgba(255, 255, 255, 0.6) ] 
              border-[1px_solid_rgba(36,143,143,0.15)]"
          >
            오늘의 책을 준비 중이에요 📚
          </p>
        )}
      </div>

      <div className="w-full mb-[200px]">
        <div className="w-container-w mx-auto">
          <div className="mb-[30px]">
            <p className="sub-title-label">키워드로 골라보는 추천 책</p>
            <p className="sub-title-p">
              관심 있는 주제를 선택하면 관련 도서를 볼 수 있어요
            </p>
          </div>

          <div className="w-full flex-wrap flex gap-y-5 gap-x-[50px]">
            {keywordList.map((item) => (
              <div
                key={item.bsIdx}
                className="
                 w-[200px] h-[90px] rounded-[10px]
                 border border-[#cbcbcb]
                 box-border font-inter flex flex-col
                 justify-center items-center cursor-pointer
                 transition-all duration-[0.25s] ease-in-out

                 hover:-translate-y-1 
                hover:border-[#248f8f] 
                 hover:shadow-[0_8px_20px_rgba(36,143,143,0.15)]
                 "
                onClick={() => handleKeyWordIdx(item.bsIdx)}
              >
                <p className="text-xs">{keywordSubtitles[item.bsName]}</p>
                <p className="text-xl">{item.bsName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full mb-[200px]">
        <div className="w-container-w mx-auto">
          <div className="mb-[30px]">
            <p className="sub-title-label">지금 읽기 좋은 책</p>
            <p className="sub-title-p">
              READ PICK이 선택한 관심사를 바탕으로 추천했어요
            </p>
          </div>

          {genreBook.length > 0 ? (
            genreBook.map((item) => (
              <div
                className="
                w-[157px] h-[220px] bg-white
                border border-[#ededed]
                mb-[15px] cursor-pointer
                transition-transform duration-[0.25s] ease-in-out 
                hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(0,0,0,0.12)]
                "
                key={item.bookIdx}
                onClick={() => gotoDetail(item.bookIdx, item.bsIdx)}
              >
                <img
                  className="w-[157px] h-[220px] rounded-[5px] mb-[5px]"
                  src={getCoverImage(item.bookImageName)}
                  alt={item.bookName}
                />

                <div className="w-40">
                  <p
                    className="
                  text-[13px] font-semibold whitespace-nowrap
                  overflow-ellipsis overflow-hidden
                  "
                  >
                    {item.bookName}
                  </p>
                  <p
                    className="
                  text-[10px] text-[#4d4d4d]
                  "
                  >
                    {item.author}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div
              className="
                w-container-w h-40
                border border-[#e5e5e5]
                rounded-[15px] text-xs flex
                justify-center items-center text-center
              "
            >
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

      <div className="w-full mb-[200px]">
        <div className="w-container-w mx-auto">
          <div className="mb-[30px]">
            <p className="sub-title-label">도서 탐색과 리뷰 기능을 제공해요</p>
            <p className="sub-title-p">
              책의 줄거리와 리뷰를 통해 관심 있는 도서를 살펴볼 수 있어요
            </p>
          </div>

          <div className="w-container-w flex justify-between">
            <div
              className="
                w-[450px] h-[400px] bg-[#f2f2f2]
                px-5 box-border flex items-center
                justify-center flex-col
              "
            >
              <div className="text-center mb-[60px]">
                <p className="feature-title-label">찜기능 & 찜목록</p>
                <p className="feature-title-p">
                  책의 리뷰와 줄거리를 통해 맘에 들면 저장할수 있고, 찜목록을
                  통해 저장한 책을 확인할수 있습니다.
                </p>
              </div>
              <div className="w-[400px] flex justify-between">
                <div className="w-[100px] relative">
                  <div
                    className="
                    w-[100px] h-[127px] border border-[#d9d9d9]
                  bg-white shadow-card-shadow 
                    mb-[10px]
                  "
                  ></div>
                  <div
                    className="
                    w-5 h-5 bg-good-icon
                    bg-cover absolute
                  "
                  ></div>
                  <div
                    className="
                    w-5 h-5 bg-good-line
                    bg-cover float-left absolute right-0
                  "
                  ></div>
                </div>
                <p className="mt-[50px]">&</p>
                <div
                  className="w-[216px]  border border-[#d9d9d9]
                bg-white shadow-card-shadow p-[15px] box-border
                "
                >
                  <span className="text-xs">찜목록</span>
                  <div className="flex justify-between mt-[5px]">
                    {DUMMY_FEATURE_BOOKS.map((item, index) => (
                      <div key={index}>
                        <div className="w-[50px] h-[56px] border border-black"></div>
                        <div className="main-wishlist-info">
                          <p className="text-[10px]">{item.book}</p>
                          <p className="text-[7px] text-[#373737]">
                            {item.author}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="
              w-[350px] h-[400px] bg-[#f2f2f2]
              p-5 box-border flex flex-col justify-center items-center
            "
            >
              <div className="text-center mb-[60px]">
                <p className="feature-title-label">리뷰기능</p>
                <p className="feature-title-p">
                  다른사람에게 후기를 남겨주고 싶을때 해당 기능을 통해 리뷰를
                  남길수 있습니다.
                </p>
              </div>

              <div
                className="w-[230px] h-[127px] border border-[#d9d9d9]
                bg-white shadow-card-shadow mb-[10px] p-[15px] box-border
                flex
              "
              >
                <div className="w-[35px] h-[35px] bg-[#d9d9d9] rounded-[35px] mr-[15px]"></div>
                <div className="w-[140px]">
                  <p className="text-[14px] font-medium leading-[35px]">
                    아이디
                  </p>
                  <p className="text-[11px]">
                    이 책은 이제 막 취업 준비하는 준비생들에게 도움이
                    많이될것같다.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="w-[356px] h-[400px] bg-[#f2f2f2] p-5 box-border
              flex flex-col justify-center items-center
            "
            >
              <div className="text-center mb-[60px]">
                <p className="feature-title-label">추천기능</p>
                <p className="feature-title-p">
                  다른사람에게 책을 추천하고 싶을때 해당 기능을 통해 추천할수
                  있습니다.
                </p>
              </div>

              <div className="w-[100px] relative">
                <div
                  className="w-[100px] h-[127px] border border-[#d9d9d9]
                  bg-white shadow-card-shadow mb-[10px]
                "
                ></div>
                <div className="w-5 h-5 bg-like-line bg-cover absolute"></div>
                <div className="w-5 h-5 bg-like-line-hover bg-cover float-left absolute right-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
