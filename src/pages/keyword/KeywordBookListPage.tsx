import KeywordLayout from '../../component/keyword/KeywordLayout';
import BookCard from '../../component/keyword/BookCard';
import { useKeywordBookList } from './hooks/useKeywordBookList';

const KeywordBookListPage = () => {
  const { handleCategoryChange, goToDetail, books, images, isLoading, keywordText, bsIdx, bssIdx } = useKeywordBookList();

  return (
    <div className="w-full">
      <div className="mx-auto w-main-w laptop-lg:w-[1240px]">
        <KeywordLayout
          selectedBsIdx={bsIdx ? Number(bsIdx) : null}
          selectedBssIdx={bssIdx ? Number(bssIdx) : null}
          onBsClick={(idx) => handleCategoryChange('bs', idx)}
          onBssClick={(idx) => handleCategoryChange('bss', idx)}
        />

        <div className="float-right w-[980px]">
          <div className="mb-[20px] w-full border-b border-borderLineColor pb-[5px] font-medium">
            <p className="text-[14px]">
              전체<span className="text-pointColor font-bold">{books.length}</span>건
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
                <p className="mp-[100px] w-full text-center">
                  {keywordText ? '검색 결과가 없습니다.' : '도서를 불러오는 중이거나 데이터가 없습니다.'}
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
