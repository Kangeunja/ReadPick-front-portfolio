import SpinnerIcon from '../../assets/icon/SpinnerIcon';

import TopMenu from '../../component/keyword/TopMenu';
import MemberKeywordDetailReviewPopup from '../../component/popup/MemberKeywordDetailReviewPopup';
import LoginRequiredPopup from '../../component/popup/LoginRequiredPopup';
import MemberKeywordDetailEditPopup from '../../component/popup/MemberKeywordDetailEditPopup';
import ReviewDeletePopup from '../../component/popup/ReviewDeletePopup';
import ReviewCompletePopup from '../../component/popup/MessagePopup';

import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useKeywordBookDetail } from './hooks/useKeywordBookDetail';
import ReviewItem from '../../component/review/ReviewItem';
import { getLargeBookImage } from '../../utils/image';

const KeywordBookDetailPage = () => {
  const {
    user,
    keywordList,
    bsIdx,
    bssIdx,
    handleBsClick,
    handleBssClick,
    bookDetail,
    bookImg,
    isRecommend,
    handleIsGood,
    recommedCount,
    isBookmark,
    handleIsBookMark,
    reviewCount,
    handleOpenReviewPopup,
    setPopup,
    popup,
    review,
    fetchMoreReview,
    hasMore,
    loading,
    openMoreReviewId,
    handleToggleMoreMenu,
    handleReviewUpdate,
    selectedReview,
    handleReviewDelete,
    completeMessage,
    handleReviewSuccess,
    handleIsReport,
    moreMenuRef,
    hasMyReview,
  } = useKeywordBookDetail();

  const isContentEmpty = !bookDetail?.bookContent || bookDetail.bookContent.trim() === '';

  return (
    <>
      <div className="w-full">
        <div className="mx-auto w-container-w">
          <TopMenu
            keywordList={keywordList}
            selectedBsIdx={bsIdx}
            selectedBssIdx={bssIdx}
            onBsClick={handleBsClick}
            onBssClick={handleBssClick}
          />

          <div className="flex justify-between">
            <div className="book-detail">
              <div className="mb-[25px] h-[450px] w-[340px] shadow-[3px_2px_15.6px_1px_rgba(193,193,193,1)]">
                {bookImg && <img className="h-full w-full" src={getLargeBookImage(bookImg.fileName)} alt="책 이미지" />}
              </div>

              <div className="flex w-[340px] justify-between">
                <button
                  className={`flex h-[38px] w-[160px] cursor-pointer items-center justify-center rounded-[5px] border-none text-[12px] text-white hover:bg-bgColor ${isRecommend ? 'bg-bgColor' : 'bg-pointColor'} `}
                  onClick={handleIsGood}
                >
                  <div
                    className={`mr-3 h-[20px] w-[20px] bg-cover ${isRecommend ? 'bg-icon-recommend-white' : 'bg-icon-recommend-line'} `}
                  ></div>
                  <p>{`이 책 추천해요 ${recommedCount}`}</p>
                </button>

                <button
                  className={`flex h-[38px] w-[160px] cursor-pointer items-center justify-center rounded-[5px] border-none text-[12px] text-white hover:bg-bgColor ${isBookmark ? 'bg-bgColor' : 'bg-pointColor'} `}
                  onClick={handleIsBookMark}
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
                      <div className="mr-[12px] h-[12px] w-[11px] bg-buy-icon"></div>
                      <p>이 책 사고싶어요.</p>
                    </a>
                  </button>
                </>
              )}

              <div className="mb-[18px] flex items-end justify-between">
                <div className="font-medium">{`이 책을 읽은 사람들의 리뷰(${reviewCount})`}</div>
                <button
                  className="flex h-[36px] items-center justify-center border border-[#248f8f] p-[10px] text-[12px] text-[#248f8f] hover:underline"
                  onClick={handleOpenReviewPopup}
                >
                  <div className="mr-[5px] h-[15px] w-[15px] bg-review-icon"></div>
                  <p>{!hasMyReview ? '리뷰 작성하기' : '리뷰 수정하기'}</p>
                </button>
              </div>

              <div className="mb-[200px]">
                {review.length !== 0 ? (
                  <>
                    {review.map((item) => (
                      <ReviewItem
                        key={item.rvIdx}
                        item={item}
                        user={user}
                        onToggleMoreMenu={handleToggleMoreMenu}
                        openMoreReviewId={openMoreReviewId}
                        moreMenuRef={moreMenuRef}
                        handleReviewUpdate={handleReviewUpdate}
                        handleReviewDelete={handleReviewDelete}
                        handleIsReport={handleIsReport}
                      />
                    ))}
                    <div className="w-full cursor-pointer text-center">
                      {loading && <SpinnerIcon />}
                      {!loading && hasMore && <button onClick={fetchMoreReview}>리뷰 더보기</button>}
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
      </div>

      {popup === 'LOGIN' && <LoginRequiredPopup onClose={() => setPopup(null)} />}
      {completeMessage && <ReviewCompletePopup message={completeMessage} onFinish={() => setPopup(null)} />}

      {bookDetail && (
        <>
          {popup === 'WRITE' && (
            <MemberKeywordDetailReviewPopup
              onSuccess={() => handleReviewSuccess('리뷰 작성이 완료되었습니다.', bookDetail.bookIdx)}
              onClose={() => setPopup(null)}
              bookDetail={bookDetail}
            />
          )}

          {popup === 'EDIT' && selectedReview && (
            <MemberKeywordDetailEditPopup
              onSuccess={() => handleReviewSuccess('리뷰 수정이 완료되었습니다.', bookDetail.bookIdx)}
              onClose={() => setPopup(null)}
              selectedReview={selectedReview}
              bookDetail={bookDetail}
            />
          )}

          {popup === 'DELETE' && (
            <ReviewDeletePopup
              onSuccess={() => handleReviewSuccess('리뷰가 삭제되었습니다.', bookDetail.bookIdx)}
              onClose={() => setPopup(null)}
              bookDetail={bookDetail}
            />
          )}
        </>
      )}
    </>
  );
};

export default KeywordBookDetailPage;
