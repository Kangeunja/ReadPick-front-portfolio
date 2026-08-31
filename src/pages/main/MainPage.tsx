import { lazy, Suspense } from 'react';

import { MainFeatures } from './components/MainFeatures';
import KeywordChips from './components/KeywordChips';
import RankingSection from './components/RankingSection';
import CtaBanner from './components/CtaBanner';

import { useMainData } from './hooks/useMainData';
import { getLargeBookImage } from 'utils/image';
import skeletonImg from 'assets/img/skeleton-cover.png';

const ReviewSection = lazy(() => import('./components/ReviewSection'));

const MainPage = () => {
  const {
    isLogin,
    todayBookData,
    keywordListData,
    genreBookData,
    realtimeData,
    isRealLoading,
    isGenreLoading,
    isMainLoading,
    selectedKeywordIdx,
    gotoDetail,
    handleChipClick,
    handleCtaClick,
  } = useMainData();

  return (
    <div className="w-full">
      <section
        role="button"
        tabIndex={0}
        aria-label="오늘의 추천 도서 상세보기"
        className="relative mx-auto box-border flex h-[400px] w-main-w cursor-pointer rounded-[15px] bg-[#2b9e9e] p-[30px]"
        onClick={() => {
          if (todayBookData) {
            gotoDetail(todayBookData.bookIdx, todayBookData.bsIdx);
          }
        }}
      >
        <div className="absolute bottom-[30px] flex items-end">
          <div className="h-[180px] w-[160px] bg-main-book" />
          <div className="text-white">
            <p>READPICK이 추천하는 </p>
            <p className="mb-[5px] font-gowun text-[45px]">오늘의 도서</p>
          </div>
        </div>

        {!isMainLoading && !todayBookData ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-center font-gowun text-[20px] font-medium text-white">오늘의 책이 아직 준비되어 있지 않았어요! 📚</p>
          </div>
        ) : (
          <div className="absolute right-[180px] h-[340px] w-[234px] shadow-[0_4px_17.2px_rgba(0,0,0,0.5)]">
            {isMainLoading && (
              <div className="absolute inset-0 z-0 flex h-full w-full animate-pulse flex-col justify-between bg-gray-200/20 p-6">
                <div className="flex flex-col gap-3">
                  <div className="h-5 w-1/3 rounded bg-white/20" />
                  <div className="h-8 w-4/5 rounded bg-white/30" />
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="h-20 w-20 rounded-full bg-white/20" />
                  <div className="h-4 w-2/3 rounded bg-white/20" />
                  <div className="h-3 w-1/2 rounded bg-white/10" />
                </div>
              </div>
            )}

            <img
              className={`relative z-10 aspect-[234/340] h-full w-full object-cover transition-opacity duration-300 ${isMainLoading ? 'opacity-0' : 'opacity-100'}`}
              src={todayBookData ? getLargeBookImage(todayBookData.bookImageName) : skeletonImg}
              alt={todayBookData ? todayBookData.bookName : '오늘의 도서 로딩 중'}
              {...({ fetchpriority: 'high' } as React.ImgHTMLAttributes<HTMLImageElement>)}
              loading="eager"
              decoding="async"
            />
          </div>
        )}
      </section>

      <KeywordChips
        keywordListData={keywordListData}
        isMainLoading={isMainLoading}
        selectedKeywordIdx={selectedKeywordIdx}
        handleChipClick={handleChipClick}
      />

      <MainFeatures />

      <Suspense fallback={null}>
        <ReviewSection isRealLoading={isRealLoading} realtimeData={realtimeData} />
      </Suspense>

      <RankingSection isGenreLoading={isGenreLoading} genreBookData={genreBookData} isLogin={isLogin} gotoDetail={gotoDetail} />

      <CtaBanner handleCtaClick={handleCtaClick} isLogin={isLogin} />
    </div>
  );
};

export default MainPage;
