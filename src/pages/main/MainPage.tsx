import { useMemo } from 'react';

import { MainBookCard } from './components/MainBookCard';
import { MainFeatures } from './components/MainFeatures';
import { useHorizontalScroll } from 'hooks/useHorizontalScroll';

import { useMainData } from './hooks/useMainData';
import { getLargeBookImage, getProfileImage } from 'utils/image';
import { keywordSubtitles, SearchCategory } from 'types/keyword';
import { BookItem } from 'types/book';
import mainArrowLeft from 'assets/img/main-arrow-left.png';
import mainArrowRight from 'assets/img/main-arrow-right.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

const MainPage = () => {
  const {
    isLogin,
    todayBookData,
    keywordListData,
    genreBookData,
    realtimeData,
    isLoading,
    selectedKeywordIdx,
    gotoDetail,
    handleChipClick,
    handleCtaClick,
  } = useMainData();

  const { scrollRef, showLeftArrow, showRightArrow, handleScrollButtonClick } = useHorizontalScroll([keywordListData]);

  // 💡 데이터가 적을 때 무한 루프가 끊기는 것을 방지하기 위해 확장
  const displayReviews = useMemo(() => {
    if (!realtimeData || realtimeData.length === 0) return [];
    return realtimeData.length < 12 ? [...realtimeData, ...realtimeData, ...realtimeData, ...realtimeData] : realtimeData;
  }, [realtimeData]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="font-gowun text-[20px]">READPICK이 책을 고르고 있어요... 📚</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className="relative mx-auto box-border h-[400px] w-main-w cursor-pointer rounded-[15px] bg-[#2b9e9e] p-[30px]"
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

        {todayBookData ? (
          <div className="absolute right-[180px] h-[340px] w-[234px] shadow-[0_4px_17.2px_rgba(0,0,0,0.5)]">
            <img className="h-full w-full" src={getLargeBookImage(todayBookData.bookImageName)} alt={todayBookData.bookName} />
          </div>
        ) : (
          <p className="absolute right-[180px] h-[340px] w-[234px] text-center leading-[340px] text-white">오늘의 책을 준비 중이에요 📚</p>
        )}
      </div>

      <div className="w-full pt-[60px]">
        <div className="mx-auto w-container-w">
          <div className="mb-[30px]">
            <p className="sub-title-label">키워드로 골라보는 추천 책</p>
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
                <img src={mainArrowLeft} alt="" className="h-5 w-5 object-contain" />
              </button>
            )}

            <div
              ref={scrollRef}
              className="flex w-full gap-[12px] overflow-x-auto pb-2 pr-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {keywordListData.map((item: SearchCategory) => {
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
                <img src={mainArrowRight} alt="" className="h-5 w-5 object-contain" />
              </button>
            )}

            {showLeftArrow && (
              <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white via-white/70 to-transparent" />
            )}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white via-white/70 to-transparent" />
          </div>
        </div>
      </div>

      <MainFeatures />

      <div className="w-full bg-[#181b1f] p-[60px]">
        <div className="mx-auto w-container-w">
          <div className="mb-[30px] text-center">
            <p className="sub-title-label text-white">ReadPick 독자들의 실시간 리뷰</p>
            <p className="sub-title-p text-purple-200/80">지금 이 순간 올라온 독자 리뷰를 한눈에 확인해보세요</p>
          </div>

          <Swiper
            modules={[Autoplay, FreeMode]}
            direction="horizontal"
            slidesPerView="auto"
            spaceBetween={20}
            loop={true}
            loopAdditionalSlides={4}
            freeMode={{
              enabled: true,
              momentum: false,
            }}
            speed={6000}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            allowTouchMove={false}
            simulateTouch={false}
            className="pointer-events-none w-full !py-2"
          >
            {displayReviews?.map((review: any, index: number) => (
              <SwiperSlide key={`${review.id}-${index}`} className="!w-auto">
                <div className="min-w-[280px] max-w-[280px] flex-shrink-0 rounded-[20px] border border-[#e8e2f4] bg-white p-[18px] shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                  <div className="mb-[14px] flex items-start gap-[12px]">
                    <img src={review.bookCoverUrl} alt={review.bookTitle} className="h-[90px] w-[64px] rounded-[8px] object-cover" />
                    <div className="min-w-0">
                      <p className="mb-[6px] line-clamp-2 h-[39px] text-[13px] font-semibold text-[#2f2f2f]">{review.bookTitle}</p>
                      <p className="text-[12px] text-[#8a8a8a]">{review.createdAt}</p>
                      {/* <p className="mt-[4px] text-[12px] text-[#ffb400]">
                      {'★'.repeat(Math.round(review.rating))}
                      {'☆'.repeat(5 - Math.round(review.rating))}
                    </p> */}
                    </div>
                  </div>

                  <p className="mb-[18px] line-clamp-3 text-[14px] leading-[1.6] text-[#4d4d4d]">“{review.reviewText}”</p>

                  <div className={`flex items-center gap-[10px] border-t border-[#f0ebf9] pt-[12px]`}>
                    {review.userProfileUrl === 'default' ? (
                      <div className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-[50px] border border-[#292929]">
                        <div className="h-[15px] w-[15px] bg-icon-default bg-cover" />
                      </div>
                    ) : (
                      <img
                        src={getProfileImage(review.userProfileUrl)}
                        alt={review.userNickname}
                        className="h-[36px] w-[36px] rounded-full object-cover"
                      />
                    )}
                    <p className="text-[13px] font-medium text-[#2f2f2f]">{review.userNickname}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="w-full pt-[130px]">
        <div className="mx-auto w-container-w">
          <div className="mb-[30px]">
            <p className="sub-title-label">실시간 추천순 랭킹</p>
            <p className="sub-title-p">높은 추천 점수를 기록한 인기 도서들을 순서대로 보여드려요.</p>
          </div>

          {genreBookData && genreBookData.length > 0 ? (
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
                // <p>
                //   로그인하고 관심사를 선택하면 <br />
                //   맞춤 추천을 받아볼 수 있어요
                // </p>
              )}
            </div>
          )}
        </div>
      </div>

      <section className="mb-[150px] w-full pt-[100px]">
        <div className="mx-auto w-container-w">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#918bef] via-[#716aca] to-[#544db0] p-[50px] text-white shadow-[0_20px_50px_rgba(76,29,149,0.25)]">
            <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-[600px]">
                <span className="mb-3 inline-block rounded-full bg-white/10 px-[14px] py-[4px] text-[12px] font-medium tracking-wide text-purple-200">
                  📖 ReadPick과 함께하는 스마트한 독서 생활
                </span>

                <h2 className="text-[28px] font-bold leading-[1.35] tracking-tight text-white lg:text-[32px]">
                  흩어지는 생각들을 모아, <br />
                  <span className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                    나만의 특별한 독서 서재
                  </span>
                  를 시작해보세요
                </h2>

                <div className="mt-6 flex flex-wrap gap-x-[24px] gap-y-[8px] text-[13px] text-purple-100/80">
                  <span className="flex items-center gap-1.5">
                    <span className="text-purple-300">✓</span> 감상평 및 평점 기록
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-purple-300">✓</span> 실시간 독자 추천 랭킹
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-purple-300">✓</span> 나만의 취향별 서재 관리
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 sm:items-end">
                <button
                  type="button"
                  onClick={handleCtaClick}
                  className="group flex items-center gap-2 rounded-[14px] bg-white px-[28px] py-[16px] text-[15px] font-bold text-[#311b92] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-50 hover:shadow-purple-900/30 active:translate-y-0"
                >
                  <span>{isLogin ? '지금 첫 독서 기록하기' : 'ReadPick 시작하기'}</span>
                  <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>

                <p className="text-[12px] text-purple-200/60">
                  {isLogin ? '오늘 읽은 책의 감상평을 남겨보세요' : '무료로 시작하는 나만의 서재'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
