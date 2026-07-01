import KeywordLayout from './components/KeywordLayout';
import BookCard from './components/BookCard';

import { useKeywordBookList } from './hooks/useKeywordBookList';

const KeywordBookListPage = () => {
  const { bsIdx, bssIdx, keyword, books, images, isLoading, handleCategoryChange, goToDetail } = useKeywordBookList();

  return (
    <div className="w-full">
      <div className="mx-auto w-main-w laptop-lg:w-[1240px]">
        <KeywordLayout
          selectedBsIdx={bsIdx}
          selectedBssIdx={bssIdx}
          onBsClick={(idx) => handleCategoryChange('bs', idx)}
          onBssClick={(idx) => handleCategoryChange('bss', idx)}
        />

        <div className="float-right w-[980px]">
          <div className="mb-[20px] w-full border-b border-borderGrayColor pb-[5px] font-medium">
            <p className="text-[14px]">
              전체<span className="font-bold text-pointColor">{books.length}</span>건
            </p>
          </div>
          {isLoading ? (
            <p className="w-full py-[100px] text-center text-gray-500">도서를 불러오는 중입니다... 📚</p>
          ) : (
            <div className="mb-[200px] flex flex-wrap gap-[45px]">
              {books.length > 0 ? (
                books.map((item, idx) => (
                  <BookCard
                    key={idx}
                    item={item}
                    imgUrl={item.bookImageName || images[idx]?.fileName}
                    onCardClick={() => goToDetail(item.bookIdx)}
                  />
                ))
              ) : (
                <p className="mp-[100px] w-full text-center text-[14px] text-[#555555]">
                  {keyword ? '검색 결과가 없습니다.' : '도서 데이터가 없습니다.'}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default KeywordBookListPage;
