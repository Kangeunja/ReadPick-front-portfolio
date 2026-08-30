import React from 'react';

type CtaBannerData = {
  handleCtaClick: () => void;
  isLogin: boolean;
};

const CtaBanner = React.memo(({ handleCtaClick, isLogin }: CtaBannerData) => {
  return (
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
                <span className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">나만의 특별한 독서 서재</span>
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
  );
});

export default CtaBanner;
