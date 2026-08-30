import React from 'react';
import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { getProfileImage } from 'utils/image';
import { ReviewRealtimeParams } from 'types/review';

type ReviewSectionData = {
  isMainLoading: boolean;
  realtimeData: ReviewRealtimeParams[];
};

const SKELETON_COUNT = [1, 2, 3, 4, 5];

const ReviewSection = React.memo(({ isMainLoading, realtimeData }: ReviewSectionData) => {
  // 💡 데이터가 적을 때 무한 루프가 끊기는 것을 방지하기 위해 확장
  const displayReviews = useMemo(() => {
    if (!realtimeData || realtimeData.length === 0) return [];
    return realtimeData.length < 12 ? [...realtimeData, ...realtimeData, ...realtimeData, ...realtimeData] : realtimeData;
  }, [realtimeData]);

  return (
    <div className="w-full bg-[#181b1f] p-[60px]">
      <div className="mx-auto w-container-w">
        <div className="mb-[30px] text-center">
          <h2 className="sub-title-label text-white">ReadPick 독자들의 실시간 리뷰</h2>
          <p className="sub-title-p text-purple-200/80">지금 이 순간 올라온 독자 리뷰를 한눈에 확인해보세요</p>
        </div>
        {isMainLoading ? (
          <div className="flex w-full gap-[20px] overflow-hidden !py-2">
            {SKELETON_COUNT.map((idx) => (
              <div
                key={`review-skel-${idx}`}
                className="min-w-[280px] max-w-[280px] flex-shrink-0 animate-pulse rounded-[20px] border border-[#2a2d32] bg-[#22262c] p-[18px]"
              >
                <div className="mb-[14px] flex items-start gap-[12px]">
                  <div className="h-[90px] w-[64px] flex-shrink-0 rounded-[8px] bg-[#2e333b]" />
                  <div className="flex flex-1 flex-col gap-2 pt-1">
                    <div className="h-[14px] w-full rounded bg-[#2e333b]" />
                    <div className="h-[14px] w-2/3 rounded bg-[#2e333b]" />
                    <div className="mt-1 h-[11px] w-1/2 rounded bg-[#2a2d32]" />
                  </div>
                </div>

                <div className="mb-[18px] flex flex-col gap-2">
                  <div className="h-[13px] w-full rounded bg-[#2a2d32]" />
                  <div className="h-[13px] w-5/6 rounded bg-[#2a2d32]" />
                  <div className="h-[13px] w-2/3 rounded bg-[#2a2d32]" />
                </div>

                <div className="flex items-center gap-[10px] border-t border-[#2e333b] pt-[12px]">
                  <div className="h-[36px] w-[36px] flex-shrink-0 rounded-full bg-[#2e333b]" />
                  <div className="h-[13px] w-20 rounded bg-[#2e333b]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
            {displayReviews.map((review, index: number) => (
              <SwiperSlide key={`review-${review.id}-${index}`} className="!w-auto">
                <div className="min-w-[280px] max-w-[280px] flex-shrink-0 rounded-[20px] border border-[#e8e2f4] bg-white p-[18px] shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                  <div className="mb-[14px] flex items-start gap-[12px]">
                    <img
                      src={review.bookCoverUrl}
                      alt={review.bookTitle}
                      className="h-[90px] w-[64px] rounded-[8px] object-cover"
                      loading="lazy"
                      decoding="async"
                    />
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
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <p className="text-[13px] font-medium text-[#2f2f2f]">{review.userNickname}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
});

export default ReviewSection;
