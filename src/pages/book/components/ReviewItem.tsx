import { MutableRefObject } from 'react';

import { Review } from 'types/review';
import { User } from 'types/user';

import { ReviewActionMenu } from 'components/review/ReviewActionMenu';

type ReviewItemProps = {
  item: Review;
  user: User | null;
  moreMenuRef: MutableRefObject<HTMLDivElement | null>;
  onToggleMoreMenu: (rvIdx: number) => void;
  openMoreReviewId: number | null;
  handleOpenPopup: (type: 'EDIT' | 'DELETE', review: Review) => void;
  handleReportReview: (rvIdx: number) => void;
};

const ReviewItem = ({
  item,
  user,
  moreMenuRef,
  onToggleMoreMenu,
  openMoreReviewId,
  handleOpenPopup,
  handleReportReview,
}: ReviewItemProps) => {
  return (
    <div className="relative mb-[23px] box-border flex w-[700px] justify-normal border border-borderGrayColor p-[20px]">
      <div
        className={`mr-[10px] flex h-[40px] w-[40px] items-center justify-center rounded-[50px] ${
          item.fileName === 'default' ? 'border border-[#1b1b1b]' : ''
        }`}
      >
        {item.fileName === 'default' ? (
          <div className="h-[20px] w-[20px] bg-icon-default" />
        ) : (
          <img src={item.fileName} alt="프로필 이미지" className="h-[40px] w-[40px] rounded-[50px]" />
        )}
      </div>
      <div className="w-[600px]">
        <div className="flex h-[40px] items-center justify-between text-[15px]">
          <div className="flex items-center">
            <p className="mr-[10px]">{item.nickName}</p>
            <p className="mr-[10px]">
              {item.userIdx === user?.userIdx ? (
                <span className="rounded-[10px] border border-[#248f8f] px-[6px] py-[2px] text-[12px] text-[#248f8f]">내 리뷰</span>
              ) : null}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-memberColor mr-[5px] text-[12px] leading-[20px]">{item.regDate}</p>
            <div
              className="more-btn relative h-[20px] w-[20px] cursor-pointer bg-icon-add bg-center bg-no-repeat"
              onClick={(e) => {
                e.stopPropagation();
                onToggleMoreMenu(item.rvIdx);
              }}
            ></div>
          </div>
        </div>

        {openMoreReviewId === item.rvIdx &&
          (item.userIdx === user?.userIdx ? (
            <div className="absolute right-[45px] top-[30px]">
              <ReviewActionMenu item={item} currentUserIdx={user?.userIdx} moreMenuRef={moreMenuRef} handleOpenPopup={handleOpenPopup} />
            </div>
          ) : (
            <div
              className="absolute right-[45px] top-[30px] z-10 w-[83px] rounded-[5px] bg-white p-[5px] text-center text-[12px] leading-[28px] shadow-[3px_2px_6px_1px_rgba(0,0,0,0.15)]"
              ref={moreMenuRef}
            >
              <button className="cursor-pointer border-none bg-transparent text-gray-700" onClick={() => handleReportReview(item.rvIdx)}>
                신고하기
              </button>
            </div>
          ))}

        <div className="text-[13px] text-gray-700">{item.content}</div>
      </div>
    </div>
  );
};

export default ReviewItem;
