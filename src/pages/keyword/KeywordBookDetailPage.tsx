import SpinnerIcon from 'assets/icon/SpinnerIcon';

import TopMenu from './components/TopMenu';
import LoginRequiredPopup from './components/LoginRequiredPopup';
import KeywordBookDetailWritePopup from './components/KeywordBookDetailWritePopup';
import KeywordBookDetailEditPopup from 'component/popup/KeywordBookDetailEditPopup';
import ReviewDeletePopup from 'component/popup/ReviewDeletePopup';
import ReviewCompletePopup from 'component/common/MessagePopup';
import ReviewItem from './components/ReviewItem';

import { getLargeBookImage } from 'utils/image';

import { useKeywordBookDetail } from './hooks/useKeywordBookDetail';
import { useBookActionsMutation } from './hooks/useBookActionsMutation';

const KeywordBookDetailPage = () => {
  const {
    user,
    keywordList,
    bsIdx,
    bssIdx,
    handleCategoryChange,
    bookDetail,
    bookImg,
    isRecommend,
    recommedCount,
    isBookmark,
    reviewCount,
    handleActionClick,
    handleOpenReviewPopup,
    hasMyReview,
    reviews,
    moreMenuRef,
    openMoreReviewId,
    handleToggleMoreMenu,
    handleOpenPopup,
    loading,
    bottomObserverRef,
    hasMore,
    popup,
    completeMessage,
    handleClosePopup,
    handleReviewSuccess,
    selectedReview,
    handleReportReview,
  } = useKeywordBookDetail();

  const { recommendMutation, bookmarkMutation } = useBookActionsMutation();

  const isContentEmpty = !bookDetail?.bookContent || bookDetail.bookContent.trim() === '';

  return (
    <>
      <div className="mx-auto w-container-w">
        <TopMenu
          keywordList={keywordList}
          selectedBsIdx={bsIdx}
          selectedBssIdx={bssIdx}
          onBsClick={(idx) => handleCategoryChange('bs', idx)}
          onBssClick={(idx) => handleCategoryChange('bss', idx)}
        />

        <div className="flex justify-between">
          <div className="book-detail">
            <div className="mb-[25px] h-[450px] w-[340px] shadow-[3px_2px_15.6px_1px_rgba(193,193,193,1)]">
              {bookImg && <img className="h-full w-full" src={getLargeBookImage(bookImg.fileName)} alt="책 이미지" />}
            </div>

            <div className="flex w-[340px] justify-between">
              <button
                className={`flex h-[38px] w-[160px] cursor-pointer items-center justify-center rounded-[5px] border-none text-[12px] text-white hover:bg-pointColor ${isRecommend ? 'bg-pointColor' : 'bg-[rgba(85,85,85,0.5)]'} `}
                onClick={() => handleActionClick(() => recommendMutation())}
              >
                <div
                  className={`mr-3 h-[20px] w-[20px] bg-cover ${isRecommend ? 'bg-icon-recommend-white' : 'bg-icon-recommend-line'} `}
                ></div>
                <p>{`이 책 추천해요 ${recommedCount}`}</p>
              </button>

              <button
                className={`flex h-[38px] w-[160px] cursor-pointer items-center justify-center rounded-[5px] border-none text-[12px] text-white hover:bg-pointColor ${isBookmark ? 'bg-pointColor' : 'bg-[rgba(85,85,85,0.5)]'} `}
                onClick={() => handleActionClick(() => bookmarkMutation())}
              >
                <div className="mr-[12px] h-[20px] w-[20px] bg-bookmark-icon"></div>
                <p>{isBookmark ? '찜했어요' : '이 책 찜해요'}</p>
              </button>
            </div>
          </div>

          <div className="w-[700px]">
            {bookDetail && (
              <>
                <div className="mb-[23px] w-[700px] border-b border-[#eaeaea] pb-[13px]">
                  <p className="mb-[5px] text-[18px] font-bold">{bookDetail.bookName}</p>
                  <p className="text-[13px] text-[#585858]">{bookDetail.author}</p>
                </div>

                <div className="mb-[6px] font-medium">책 소개</div>
                <div className="mb-[50px]">
                  {isContentEmpty ? (
                    <p className="text-[14px] text-[#555555]">이 책의 줄거리는 아직 준비 중이에요.</p>
                  ) : (
                    <p className="text-[14px] text-[#555555]">{bookDetail.bookContent}</p>
                  )}
                </div>

                <button className="mb-[100px] flex h-[38px] w-[157px] cursor-pointer justify-center border border-[#dddddd] bg-[#f5f6f7] text-[13px] text-[#333333] hover:underline">
                  <a href={bookDetail.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <div className="mr-[12px] h-[12px] w-[11px] bg-icon-buy"></div>
                    <p>이 책 사고 싶어요.</p>
                  </a>
                </button>
              </>
            )}

            <div className="mb-[18px] flex items-end justify-between">
              <div className="font-medium">{`이 책을 읽은 사람들의 리뷰(${reviewCount})`}</div>
              <button
                className="flex h-[36px] items-center justify-center border border-pointColor p-[10px] text-[12px] text-pointColor hover:underline"
                onClick={handleOpenReviewPopup}
              >
                <div className="mr-[5px] h-[15px] w-[15px] bg-review-icon"></div>
                <p>{hasMyReview ? '리뷰 수정하기' : '리뷰 작성하기'}</p>
              </button>
            </div>

            <div className="mb-[200px]">
              {reviews.length !== 0 ? (
                <>
                  {reviews.map((item) => (
                    <ReviewItem
                      key={item.rvIdx}
                      item={item}
                      user={user}
                      moreMenuRef={moreMenuRef}
                      openMoreReviewId={openMoreReviewId}
                      onToggleMoreMenu={handleToggleMoreMenu}
                      handleOpenPopup={handleOpenPopup}
                      handleReportReview={handleReportReview}
                    />
                  ))}
                  <div className="mt-6 flex min-h-[40px] w-full flex-col items-center justify-center">
                    {loading && <SpinnerIcon />}

                    <div ref={bottomObserverRef} className="h-2 w-full bg-transparent" />
                    {!hasMore && !loading && reviews.length > 0 && (
                      <div className="flex w-full flex-col items-center justify-center gap-1 py-12">
                        <p className="mt-1 text-sm font-semibold text-gray-500">마지막 페이지입니다.</p>
                        <p className="text-xs text-gray-400">더 이상 불러올 리뷰가 없습니다.</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <p className="box-border w-full border border-[#eaeaea] p-[20px] text-[13px] text-[#555555]">
                  등록된 리뷰가 없습니다.
                  <br />
                  첫번째 리뷰를 남겨보세요!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {popup === 'LOGIN' && <LoginRequiredPopup onClose={handleClosePopup} />}
      {completeMessage && <ReviewCompletePopup message={completeMessage} onFinish={handleClosePopup} />}

      {bookDetail && (
        <>
          {popup === 'WRITE' && (
            <KeywordBookDetailWritePopup
              onSuccess={() => handleReviewSuccess('리뷰 작성이 완료되었습니다.', bookDetail.bookIdx)}
              onClose={handleClosePopup}
              bookDetail={bookDetail}
            />
          )}

          {popup === 'EDIT' && selectedReview && (
            <KeywordBookDetailEditPopup
              onSuccess={() => handleReviewSuccess('리뷰 수정이 완료되었습니다.', bookDetail.bookIdx)}
              onClose={handleClosePopup}
              selectedReview={selectedReview}
              bookDetail={bookDetail}
            />
          )}

          {popup === 'DELETE' && (
            <ReviewDeletePopup
              onSuccess={() => handleReviewSuccess('리뷰가 삭제되었습니다.', bookDetail.bookIdx)}
              onClose={handleClosePopup}
              bookIdx={bookDetail.bookIdx}
            />
          )}
        </>
      )}
    </>
  );
};

export default KeywordBookDetailPage;
