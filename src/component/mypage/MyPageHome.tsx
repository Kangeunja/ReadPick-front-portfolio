// react
import { useMemo, useRef, useState } from "react";

// router
import { useNavigate, useOutletContext } from "react-router-dom";

// hooks
import { useFavoritQuery } from "../../hooks/queries/useFavoritQuery";
import { useFavoritImgQuery } from "../../hooks/queries/useFavoritImgQuery";

// constants
import { ROUTES } from "../../constants/routes";

// types
import type { MyPageOutletContext } from "../../types/mypage";

const MyPageHome = () => {
  const navigate = useNavigate();
  const { userInfo } = useOutletContext<MyPageOutletContext>();

  // 상태 관리
  const listRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // query
  const { data: favoriteBooks = [] } = useFavoritQuery();
  const { data: favoriteBooksImg = [] } = useFavoritImgQuery();

  const isDefaultProfile = userInfo?.fileName === "default";

  // 값 계산결과를 기억
  const imageMap = useMemo(() => {
    return new Map(favoriteBooksImg.map((img) => [img.bookIdx, img.fileName]));
  }, [favoriteBooksImg]);

  // 이벤트
  const scrollList = (direction: "left" | "right") => {
    // 좌/우 버튼 클릭시 3칸씩 스크롤
    if (!listRef.current) return;
    const moveAmount = 180 * 3;

    listRef.current.scrollBy({
      left: direction === "right" ? moveAmount : -moveAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    // 스크롤 위치에 따른 화살표 표시 여부 갱신
    if (!listRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  // 찜 목록중에 선택한 책 상세정보 이동
  const goToBookDetail = (bookIdx: number, bsIdx: number) => {
    navigate(`${ROUTES.KEYWORD}/detail/${bookIdx}?bsIdx=${bsIdx}`);
  };

  return (
    <div className="w-full">
      <div className="w-main-w mx-auto">
        <div className="flex justify-between">
          <div className="flex">
            <div>
              <div
                className={`
                  w-[80px] h-[80px] 
                  flex rounded-[50px] justify-center 
                  items-center 
                  ${isDefaultProfile ? "border border-[#1b1b1b]" : ""}`}
              >
                {isDefaultProfile ? (
                  <div className="w-[30px] h-[30px] bg-profile.png bg-cover" />
                ) : (
                  <img
                    className="w-[30px] h-[30px] rounded-[50px]"
                    src={userInfo?.fileName}
                    alt="프로필 이미지"
                  />
                )}
              </div>
              <div
                className="
                w-[30px] h-[30px] bg-[#7a7a7a] 
                border border-white
                rounded-[50px] flex 
                justify-center items-center 
                relative bottom-[30px] left-[60px]
                cursor-pointer
                hover:bg-[#1e7373]
                "
                onClick={() => navigate(ROUTES.PROFILE)}
              >
                <div className="w-[16px] h-[14px] bg-camera.png bg-cover"></div>
              </div>
            </div>

            <div className="ml-[30px]">
              <div className="text-[#3a3a3a] h-[80px] flex flex-col justify-center">
                <p>
                  <span className="text-xl font-bold">
                    {userInfo?.nickName}
                  </span>
                  님
                </p>
                <p>마이페이지에 오신걸 환영합니다!</p>
              </div>

              <div className="flex gap-[10px] items-center">
                <button
                  className="mypage-home-btn
                  hover:underline
                "
                  onClick={() => navigate(ROUTES.MYPAGEREVIEW)}
                >
                  내리뷰
                </button>
                <div className="w-[2px] h-[11px] bg-[#454545]" />
                <button
                  className="mypage-home-btn
                  hover:underline
                "
                  onClick={() => navigate(ROUTES.PWCONFIRM)}
                >
                  내 정보 관리
                </button>
              </div>
            </div>
          </div>

          <div className="relative group">
            {canScrollLeft && (
              <button
                type="button"
                className="mypage-nav-arrow left
                group-hover:opacity-1 pointer-events-auto cursor-pointer
                "
                onClick={() => scrollList("left")}
              >
                ◀
              </button>
            )}

            <div>
              <div className="text-lg text-left mb-5">찜목록</div>

              <div
                className="w-[700px] flex gap-[18px] overflow-x-hidden"
                ref={listRef}
                onScroll={handleScroll}
              >
                {favoriteBooks.length > 0 ? (
                  favoriteBooks.map((item) => {
                    const imageFile = imageMap.get(item.bookIdx);

                    return (
                      <div
                        key={item.bookIdx}
                        className="cursor-pointer"
                        onClick={() => goToBookDetail(item.bookIdx, item.bsIdx)}
                      >
                        <div className="w-[119px] h-[148px] mb-[14px]">
                          <div className="mypage-home__favorites-img">
                            {imageFile && (
                              <img
                                src={imageFile?.replace("coversum", "cover500")}
                                alt="책 이미지"
                                className="w-[119px] h-[148px] 
                              rounded-[12px]
                              border border-[#d9d9d9] 
                              box-border
                              "
                              />
                            )}
                          </div>
                        </div>
                        <div className="w-[119px]">
                          <p
                            className="text-[14px] whitespace-nowrap
                          text-ellipsis overflow-hidden
                        "
                          >
                            {item.bookName}
                          </p>
                          <p className="text-xs text-[#555555]">
                            {item.author}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p
                    className="
                    w-[700px] border border-[#eaeaea] 
                    p-5 box-border 
                    text-[#555555] text-[14px]"
                  >
                    아직 찜한 책이 없어요.
                    <br />
                    마음에 드는 책을 찜해보세요.
                  </p>
                )}
              </div>
            </div>
            {canScrollRight && favoriteBooks.length > 5 && (
              <button
                type="button"
                className="
                mypage-nav-arrow right-[-40px]
                group-hover:opacity-1 
                pointer-events-auto 
                cursor-pointer
                "
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
