import React from 'react';
import { BookItem } from 'types/book';
import { MainBookCard } from './MainBookCard';

type RankingSectionData = {
  isGenreLoading: boolean;
  genreBookData: BookItem[];
  isLogin: boolean;
  gotoDetail: (bookIdx: number, bsIdx: number) => void;
};

const SKELETON_COUNT = [1, 2, 3, 4];

const RankingSection = React.memo(({ isGenreLoading, genreBookData, isLogin, gotoDetail }: RankingSectionData) => {
  return (
    <div className="w-full pt-[130px]">
      <div className="mx-auto w-container-w">
        <div className="mb-[30px]">
          <h2 className="sub-title-label">실시간 추천순 랭킹</h2>
          <p className="sub-title-p">높은 추천 점수를 기록한 인기 도서들을 순서대로 보여드려요.</p>
        </div>
        {isGenreLoading ? (
          <div className="flex w-full flex-wrap gap-x-[30px] gap-y-[30px]">
            {SKELETON_COUNT.map((idx) => (
              <div key={`ranking-skel-${idx}`} className="w-[130px] animate-pulse">
                <div className="h-[150px] w-full rounded-[5px] bg-gray-200" />
                <div className="mt-4 h-[16px] w-3/4 rounded bg-gray-200" />
                <div className="mt-2 h-[12px] w-1/2 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : genreBookData && genreBookData.length > 0 ? (
          <div className="flex w-full flex-wrap gap-x-[30px] gap-y-[30px]">
            {genreBookData.map((item: BookItem, index: number) => (
              <MainBookCard key={item.bookIdx} item={item} gotoDetail={gotoDetail} rank={index + 1} />
            ))}
          </div>
        ) : (
          <div className="flex h-40 w-container-w items-center justify-center rounded-[15px] border border-borderLightColor text-center text-[12px]">
            {isLogin ? (
              <p>
                현재 등록된 추천 도서가 없어요 <br />첫 번째 추천을 남겨 명예의 전당을 채워주세요 🏆
              </p>
            ) : (
              <p>
                현재 추천 도서 목록을 불러올 수 없어요 <br /> 로그인 하시면 실시간 추천 도서 리스트를 확인해보실수 있습니다🔐
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
});
export default RankingSection;
