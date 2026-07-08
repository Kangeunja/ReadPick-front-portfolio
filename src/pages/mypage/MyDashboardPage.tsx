import { useMemo } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { useCarousel } from 'hooks/useCarousel';
import { useFavoritImgQuery, useFavoritQuery } from './hooks/useUserInfoQueries';
import { ROUTES } from 'constants/routes';
import type { MyPageOutletContext } from 'types/mypage';
import { BookDetail } from 'types/book';
import { getProfileImage } from 'utils/image';

import FavoriteBookCard from './components/FavoriteBookCard';

const MyDashboardPage = () => {
  const navigate = useNavigate();

  const { userInfo } = useOutletContext<MyPageOutletContext>();
  const { listRef, canScrollLeft, canScrollRight, scroll, handleScroll } = useCarousel();

  const { data: favoriteBooks = [] } = useFavoritQuery();
  const { data: favoriteBooksImg = [] } = useFavoritImgQuery();

  const isDefaultImage = userInfo.fileName === 'default';

  // 값 계산결과를 기억
  const imageMap = useMemo(() => {
    if (!Array.isArray(favoriteBooksImg) || favoriteBooksImg.length === 0) {
      return new Map<number, string>();
    }
    return new Map(favoriteBooksImg.map((img) => [img.bookIdx, img.fileName]));
  }, [favoriteBooksImg]);

  // 찜 목록중에 선택한 책 상세정보 이동
  const goToBookDetail = (bookIdx: number, bsIdx: number) => {
    navigate(`${ROUTES.KEYWORD}/detail/${bookIdx}?bsIdx=${bsIdx}`);
  };

  return (
    <div className="mx-auto w-container-w">
      <div className="flex justify-between">
        <div className="flex">
          <div>
            <div
              className={`flex h-[80px] w-[80px] items-center justify-center rounded-[50px] ${isDefaultImage ? 'border border-[#1b1b1b]' : ''}`}
            >
              {isDefaultImage ? (
                <div className="h-[30px] w-[30px] bg-icon-default bg-cover object-cover" />
              ) : (
                <img className="h-[80px] w-[80px] rounded-[50px]" src={getProfileImage(userInfo.fileName)} alt="프로필 이미지" />
              )}
            </div>
            <div
              className="relative bottom-[30px] left-[60px] flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[50px] border border-white bg-[#7a7a7a] hover:bg-btnhoverColor"
              onClick={() => navigate(ROUTES.PROFILE)}
            >
              <div className="h-[14px] w-[16px] bg-icon-camera bg-cover"></div>
            </div>
          </div>

          <div className="ml-[30px]">
            <div className="flex h-[80px] flex-col justify-center text-[15px] text-[#3a3a3a]">
              <p>
                <span className="text-[18px] font-bold">{userInfo?.nickName}</span>님
              </p>
              <p className="">마이페이지에 오신걸 환영합니다!</p>
            </div>

            <div className="flex items-center gap-[10px]">
              <button className="mypage-home-btn hover:underline" onClick={() => navigate(ROUTES.MYPAGEREVIEW)}>
                내리뷰
              </button>
              <div className="h-[11px] w-[2px] bg-[#454545]" />
              <button className="mypage-home-btn hover:underline" onClick={() => navigate(ROUTES.PWCONFIRM)}>
                내 정보 관리
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-5 text-left text-lg">찜목록</div>

          <div className="relative">
            {canScrollLeft && (
              <button
                type="button"
                className="mypage-nav-arrow pointer-events-auto left-[-50px] cursor-pointer"
                onClick={() => scroll('left')}
              >
                ◀
              </button>
            )}

            <div className="flex w-[700px] gap-[18px] overflow-x-hidden scroll-smooth" ref={listRef} onScroll={handleScroll}>
              {favoriteBooks.length > 0 ? (
                favoriteBooks.map((item: BookDetail) => (
                  <FavoriteBookCard
                    key={item.bookIdx}
                    item={item}
                    imageFile={imageMap.get(item.bookIdx)}
                    onClick={() => goToBookDetail(item.bookIdx, item.bsIdx)}
                  />
                ))
              ) : (
                <p className="box-border w-[700px] border border-borderGrayColor p-5 text-[14px] text-[#555555]">
                  아직 찜한 책이 없어요.
                  <br />
                  마음에 드는 책을 찜해보세요.
                </p>
              )}
            </div>

            {canScrollRight && favoriteBooks.length > 0 && (
              <button
                type="button"
                className="mypage-nav-arrow pointer-events-auto right-[-50px] cursor-pointer"
                onClick={() => scroll('right')}
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

export default MyDashboardPage;
