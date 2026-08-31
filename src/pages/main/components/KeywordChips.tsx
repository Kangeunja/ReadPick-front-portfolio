import React from 'react';

import { useHorizontalScroll } from 'hooks/useHorizontalScroll';

import mainArrowLeft from 'assets/img/main-arrow-left.png';
import mainArrowRight from 'assets/img/main-arrow-right.png';
import { keywordSubtitles, SearchCategory } from 'types/keyword';

type KeywordChipsData = {
  keywordListData: SearchCategory[];
  isMainLoading: boolean;
  selectedKeywordIdx: number | null;
  handleChipClick: (bsIdx: number) => void;
};

const KEYWORD_SKELETON_WIDTHS = ['w-[157px]', 'w-[179px]', 'w-[179px]'];

const KeywordChips = React.memo(({ keywordListData, isMainLoading, selectedKeywordIdx, handleChipClick }: KeywordChipsData) => {
  const { scrollRef, showLeftArrow, showRightArrow, handleScrollButtonClick } = useHorizontalScroll([keywordListData]);

  return (
    <div className="w-full pt-[60px]">
      <div className="mx-auto w-container-w">
        <div className="mb-[30px]">
          <h2 className="sub-title-label">키워드로 골라보는 추천 책</h2>
          <p className="sub-title-p">관심 있는 주제를 선택하면 관련 도서를 볼 수 있어요</p>
        </div>

        <div className="group relative">
          {showLeftArrow && (
            <button
              type="button"
              aria-label="이전 키워드 보기"
              onClick={() => handleScrollButtonClick(-1)}
              className="absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white opacity-0 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg group-hover:opacity-100"
            >
              <img src={mainArrowLeft} alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex w-full gap-[12px] overflow-x-auto pb-2 pr-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {isMainLoading
              ? KEYWORD_SKELETON_WIDTHS.map((widthClass, idx) => (
                  <div
                    key={`keyword-skel-${idx}`}
                    className={`h-[58px] flex-shrink-0 ${widthClass} flex animate-pulse flex-col justify-center gap-1.5 rounded-full border border-gray-200 bg-gray-100 px-[18px] py-[10px]`}
                  >
                    <div className="h-[9px] w-2/5 rounded bg-gray-200" />
                    <div className="h-[14px] w-4/5 rounded bg-gray-300" />
                  </div>
                ))
              : keywordListData.map((item) => {
                  const isActive = selectedKeywordIdx === item.bsIdx;

                  return (
                    <button
                      key={item.bsIdx}
                      type="button"
                      aria-pressed={isActive}
                      className={`flex-shrink-0 rounded-full border px-[18px] py-[10px] text-left font-inter transition-all duration-300 ease-out ${
                        isActive
                          ? 'scale-[1.02] border-pointColor bg-pointColor text-white shadow-[0_8px_20px_rgba(0,0,0,0.16)]'
                          : 'border-[#d8d8d8] bg-white text-[#4d4d4d] hover:border-pointColor hover:bg-[#f7f4ff] hover:text-pointColor'
                      }`}
                      onClick={() => handleChipClick(item.bsIdx)}
                    >
                      <p className={`text-[11px] uppercase tracking-[0.08em] ${isActive ? 'text-white/80' : 'text-[#8c8c8c]'}`}>
                        {keywordSubtitles[item.bsName]}
                      </p>
                      <p className="mt-[2px] text-[15px] font-semibold">{item.bsName}</p>
                    </button>
                  );
                })}
          </div>

          {showRightArrow && (
            <button
              type="button"
              aria-label="다음 키워드 보기"
              onClick={() => handleScrollButtonClick(1)}
              className="absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white opacity-0 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg group-hover:opacity-100"
            >
              <img src={mainArrowRight} alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
            </button>
          )}

          {showLeftArrow && (
            <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white via-white/70 to-transparent" />
          )}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white via-white/70 to-transparent" />
        </div>
      </div>
    </div>
  );
});

export default KeywordChips;
