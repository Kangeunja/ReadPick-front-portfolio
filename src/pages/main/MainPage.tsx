import { useEffect, useRef, useState } from 'react';

import { MainBookCard } from './components/MainBookCard';
import { MainFeatures } from './components/MainFeatures';

import { useMainData } from './hooks/useMainData';
import { getLargeBookImage } from 'utils/image';
import { keywordSubtitles, SearchCategory } from 'types/keyword';
import { BookItem } from 'types/book';
import mainArrowLeft from 'assets/img/main-arrow-left.png';
import mainArrowRight from 'assets/img/main-arrow-right.png';

type MockReviewItem = {
  id: number;
  bookTitle: string;
  bookCoverUrl: string;
  rating: number;
  reviewText: string;
  userProfileUrl: string;
  userNickname: string;
  createdAt: string;
};

const mockRealtimeReviews: MockReviewItem[] = [
  {
    id: 1,
    bookTitle: '아주 작은 습관의 힘',
    bookCoverUrl: 'https://image.aladin.co.kr/product/29236/40/cover500/8901265859_1.jpg',
    rating: 3,
    reviewText: '작은 습관 하나로 삶이 달라질 수 있다는 걸 느꼈어요.',
    userProfileUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    userNickname: '책벌레민지',
    createdAt: '2분 전',
  },
  {
    id: 2,
    bookTitle: '마음의 정원',
    bookCoverUrl: 'https://image.aladin.co.kr/product/32988/49/cover500/k272936015_1.jpg',
    rating: 4,
    reviewText: '잔잔한 문장에 몰입해서 읽는 내내 힐링됐어요.',
    userProfileUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    userNickname: '도서관요정',
    createdAt: '11분 전',
  },
  {
    id: 3,
    bookTitle: '불편한 편의점',
    bookCoverUrl: 'https://image.aladin.co.kr/product/30225/24/cover500/k742836431_1.jpg',
    rating: 5,
    reviewText: '무심한 듯 따뜻한 이야기라서 마음이 많이 위로됐어요.',
    userProfileUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    userNickname: '리뷰수집가',
    createdAt: '25분 전',
  },
  {
    id: 4,
    bookTitle: '아침의 기적',
    bookCoverUrl: 'https://image.aladin.co.kr/product/28758/83/cover500/8965701234_1.jpg',
    rating: 4,
    reviewText: '매일의 루틴을 다시 생각해보게 된 책이었어요.',
    userProfileUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    userNickname: '새벽독서러',
    createdAt: '40분 전',
  },
];

const duplicatedReviews = [...mockRealtimeReviews, ...mockRealtimeReviews];

const MainPage = () => {
  const { isLogin, todayBookData, keywordListData, genreBookData, isLoading, selectedKeywordIdx, handleChipClick, gotoDetail } =
    useMainData();

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const reviewScrollRef = useRef<HTMLDivElement | null>(null);
  const isHoveredRef = useRef(false);

  const updateArrowVisibility = () => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    const isScrollable = container.scrollWidth > container.clientWidth + 1;
    const atLeft = container.scrollLeft <= 1;
    const atRight = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

    setShowLeftArrow(isScrollable && !atLeft);
    setShowRightArrow(isScrollable && !atRight);
  };

  const handleScrollButtonClick = (direction: -1 | 1) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({ left: direction * 200, behavior: 'smooth' });
  };

  useEffect(() => {
    updateArrowVisibility();

    const container = scrollRef.current;
    if (!container) return undefined;

    container.addEventListener('scroll', updateArrowVisibility, { passive: true });
    window.addEventListener('resize', updateArrowVisibility);

    return () => {
      container.removeEventListener('scroll', updateArrowVisibility);
      window.removeEventListener('resize', updateArrowVisibility);
    };
  }, [keywordListData]);

  useEffect(() => {
    const container = reviewScrollRef.current;

    if (!container) return undefined;

    let animationFrameId: number;
    const speed = 0.6; // 자동 스크롤 속도 조절

    const scroll = () => {
      if (!isHoveredRef.current && container) {
        const halfWidth = container.scrollWidth / 2;

        container.scrollLeft += speed;

        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [duplicatedReviews]);

  // const [selectedKeywordIdx, setSelectedKeywordIdx] = useState<number | null>(null);

  // const handleChipClick = (bsIdx: number) => {
  //   setSelectedKeywordIdx(bsIdx);
  //   handleKeyWordIdx(bsIdx);
  // };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="font-gowun text-[20px]">READPICK이 책을 고르고 있어요... 📚</p>
      </div>
    );
  }

  return (
    <div className="w-full pt-5">
      <div
        className="relative mx-auto mb-[80px] box-border h-[400px] w-main-w cursor-pointer rounded-[20px] bg-pointColor p-[30px]"
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

      <div className="mb-[150px] w-full">
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
                className="absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition hover:scale-105"
              >
                <img
                  src={mainArrowLeft}
                  alt=""
                  className="h-5 w-5 object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
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
                className="absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition hover:scale-105"
              >
                <img
                  src={mainArrowRight}
                  alt=""
                  className="h-5 w-5 object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
              </button>
            )}

            {showLeftArrow && (
              <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white via-white/70 to-transparent" />
            )}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white via-white/70 to-transparent" />
          </div>
        </div>
      </div>

      <div className="mb-[150px] w-full">
        <div className="mx-auto w-container-w">
          <div className="mb-[30px]">
            <p className="sub-title-label">ReadPick 독자들의 실시간 리뷰</p>
            <p className="sub-title-p">지금 이 순간 올라온 독자 리뷰를 한눈에 확인해보세요</p>
          </div>

          <div
            ref={reviewScrollRef}
            className="flex gap-[20px] overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
            }}
          >
            {duplicatedReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="min-w-[280px] max-w-[280px] flex-shrink-0 rounded-[20px] border border-[#e8e2f4] bg-white p-[18px] shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
              >
                <div className="mb-[14px] flex items-start gap-[12px]">
                  <img src={review.bookCoverUrl} alt={review.bookTitle} className="h-[90px] w-[64px] rounded-[8px] object-cover" />
                  <div className="min-w-0">
                    <p className="mb-[6px] text-[13px] font-semibold text-[#2f2f2f]">{review.bookTitle}</p>
                    <p className="text-[12px] text-[#8a8a8a]">{review.createdAt}</p>
                    <p className="mt-[4px] text-[12px] text-[#ffb400]">
                      {'★'.repeat(Math.round(review.rating))}
                      {'☆'.repeat(5 - Math.round(review.rating))}
                    </p>
                  </div>
                </div>

                <p className="mb-[18px] line-clamp-3 text-[14px] leading-[1.6] text-[#4d4d4d]">“{review.reviewText}”</p>

                <div className="flex items-center gap-[10px] border-t border-[#f0ebf9] pt-[12px]">
                  <img src={review.userProfileUrl} alt={review.userNickname} className="h-[36px] w-[36px] rounded-full object-cover" />
                  <p className="text-[13px] font-medium text-[#2f2f2f]">{review.userNickname}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-[150px] w-full">
        <div className="mx-auto w-container-w">
          <div className="mb-[30px]">
            <p className="sub-title-label">지금 읽기 좋은 책</p>
            <p className="sub-title-p">READ PICK이 선택한 관심사를 바탕으로 추천했어요</p>
          </div>

          {genreBookData.length > 0 ? (
            <div className="flex w-full flex-wrap gap-x-[30px] gap-y-[30px]">
              {genreBookData.map((item: BookItem) => (
                <MainBookCard key={item.bookIdx} item={item} gotoDetail={gotoDetail} />
              ))}
            </div>
          ) : (
            <div className="flex h-40 w-container-w items-center justify-center rounded-[15px] border border-borderLightColor text-center text-[12px]">
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

      <MainFeatures />
    </div>
  );
};

export default MainPage;
