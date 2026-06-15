import { FeatureBook } from '../../../types/main';

export const MainFeatures = () => {
  // 기능 소개 영역에 사용할 기본(더미) 도서 데이터 3개 생성
  const DUMMY_FEATURE_BOOKS: FeatureBook[] = Array.from({ length: 3 }, () => ({
    book: '책제목',
    author: '지은이',
  }));

  return (
    <div className="mx-auto mb-[150px] w-container-w">
      <div className="mb-[30px]">
        <p className="sub-title-label">도서 탐색과 리뷰 기능을 제공해요</p>
        <p className="sub-title-p">책의 줄거리와 리뷰를 통해 관심 있는 도서를 살펴볼 수 있어요</p>
      </div>

      <div className="flex w-container-w justify-between">
        <div className="bg-mainBoxColor box-border flex w-[450px] flex-col items-center justify-center p-[20px]">
          <div className="mb-[30px] text-center">
            <p className="feature-title-label">찜기능 & 찜목록</p>
            <p className="feature-title-p">
              책의 리뷰와 줄거리를 통해 맘에 들면 저장할수 있고, 찜목록을 통해 저장한 책을 확인할수 있습니다.
            </p>
          </div>
          <div className="h-[150px]">
            <div className="flex w-[400px] justify-between">
              <div className="relative w-[100px]">
                <div className="border-borderLightColor mb-[10px] h-[127px] w-[100px] border bg-white"></div>
                <div className="absolute h-[15px] w-[15px] bg-icon-recommend-none bg-cover"></div>
                <div className="absolute right-0 h-[15px] w-[15px] bg-icon-bookmark-color bg-cover"></div>
              </div>
              <p className="mt-[50px]">&</p>
              <div className="shadow-card-shadow border-borderLightColor box-border w-[216px] border bg-white p-[15px]">
                <span className="text-[11px]">찜목록</span>
                <div className="mt-[5px] flex justify-between">
                  {DUMMY_FEATURE_BOOKS.map((item, index) => (
                    <div key={index}>
                      <div className="mb-[3px] h-[56px] w-[50px] border border-borderLightGray"></div>
                      <div className="main-wishlist-info">
                        <p className="text-[8px]">{item.book}</p>
                        <p className="text-[6px] text-[#373737]">{item.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-mainBoxColor box-border flex w-[350px] flex-col items-center justify-center p-[20px]">
          <div className="mb-[30px] text-center">
            <p className="feature-title-label">리뷰기능</p>
            <p className="feature-title-p">다른사람에게 후기를 남겨주고 싶을때 해당 기능을 통해 리뷰를 남길수 있습니다.</p>
          </div>
          <div className="h-[150px]">
            <div className="border-borderLightColor box-border flex w-[260px] border bg-white p-[20px]">
              <div className="bg-borderLightColor mr-[15px] h-[30px] w-[30px] rounded-[35px]"></div>
              <div>
                <p className="text-[12px] font-medium leading-[35px]">아이디</p>
                <p className="w-[160px] text-[10px]">이 책은 이제 막 취업 준비하는 준비생들에게 도움이 많이될것같다.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-mainBoxColor box-border flex w-[350px] flex-col items-center justify-center p-[20px]">
          <div className="mb-[30px] text-center">
            <p className="feature-title-label">추천기능</p>
            <p className="feature-title-p">다른사람에게 책을 추천하고 싶을때 해당 기능을 통해 추천할수 있습니다.</p>
          </div>

          <div className="h-[150px]">
            <div className="relative w-[100px]">
              <div className="border-borderLightColor mb-[10px] h-[127px] w-[100px] border bg-white"></div>
              <div className="absolute h-[15px] w-[15px] bg-icon-recommend-color bg-cover"></div>
              <div className="absolute right-0 h-[15px] w-[15px] bg-icon-bookmark-line bg-cover"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
