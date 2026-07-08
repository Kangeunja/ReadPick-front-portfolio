import { MainBookCard } from './components/MainBookCard';
import { MainFeatures } from './components/MainFeatures';

import { useMainData } from './hooks/useMainData';
import { getLargeBookImage } from 'utils/image';
import { keywordSubtitles, SearchCategory } from 'types/keyword';
import { BookItem } from 'types/book';

const MainPage = () => {
  const { isLogin, todayBookData, keywordListData, genreBookData, isLoading, gotoDetail, handleKeyWordIdx } = useMainData();

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

          <div className="flex w-full flex-wrap gap-x-[50px] gap-y-[20px]">
            {keywordListData.map((item: SearchCategory) => (
              <div
                key={item.bsIdx}
                className="box-border flex h-[80px] w-[200px] cursor-pointer flex-col items-center justify-center rounded-[8px] border border-[#cbcbcb] font-inter transition-all duration-[0.25s] ease-in-out hover:-translate-y-1 hover:border-pointColor hover:shadow-borderShadow"
                onClick={() => handleKeyWordIdx(item.bsIdx)}
              >
                <p className="text-[12px]">{keywordSubtitles[item.bsName]}</p>
                <p className="text-[17px]">{item.bsName}</p>
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
