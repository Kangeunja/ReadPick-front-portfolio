import { MutableRefObject } from 'react';
import { Review } from '../../types/review';
import { User } from '../../types/user';

interface ReviewItemProps {
  item: Review;
  user: User | null;
  onToggleMoreMenu: (rvIdx: number) => void;
  openMoreReviewId: number | null;
  moreMenuRef: MutableRefObject<HTMLDivElement | null>;
  handleReviewUpdate: (rvIdx: number) => void;
  handleReviewDelete: () => void;
  handleIsReport: (rvIdx: number) => void;
}

const ReviewItem = ({
  item,
  user,
  onToggleMoreMenu,
  openMoreReviewId,
  moreMenuRef,
  handleReviewUpdate,
  handleReviewDelete,
  handleIsReport,
}: ReviewItemProps) => {
  return (
    <>
      <div
        className="relative mb-[23px] box-border flex w-[700px] justify-normal rounded-[10px] border border-[#eaeaea] p-[20px]"
        key={item.rvIdx}
      >
        <div
          className={`mr-[10px] flex h-[40px] w-[40px] items-center justify-center rounded-full ${
            item.fileName === 'default' ? 'border border-[#1b1b1b]' : ''
          }`}
        >
          {item.fileName === 'default' ? (
            <div className="bg-icon-default h-[20px] w-[20px]" />
          ) : (
            <img src={item.fileName} alt="프로필 이미지" />
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
              <p className="mr-[5px] text-[12px] leading-[20px] text-memberColor">{item.regDate}</p>
              <div
                className="bg-icon-add h-[20px] w-[20px] cursor-pointer bg-center bg-no-repeat"
                onClick={() => onToggleMoreMenu(item.rvIdx)}
              ></div>
            </div>
          </div>
          {openMoreReviewId === item.rvIdx && (
            <div
              className="absolute right-[40px] top-[30px] z-10 w-[83px] rounded-[5px] bg-white p-[5px] text-center text-[12px] leading-[28px] shadow-[3px_2px_6px_1px_rgba(0,0,0,0.15)]"
              ref={openMoreReviewId === item.rvIdx ? moreMenuRef : null}
            >
              {item.userIdx === user?.userIdx ? (
                <>
                  <button
                    className="cursor-pointer border-none bg-transparent text-[#333333]"
                    onClick={() => handleReviewUpdate(item.rvIdx)}
                  >
                    수정하기
                  </button>
                  <button className="cursor-pointer border-none bg-transparent text-[#333333]" onClick={handleReviewDelete}>
                    삭제하기
                  </button>
                </>
              ) : (
                <button className="cursor-pointer border-none bg-transparent text-[#333333]" onClick={() => handleIsReport(item.rvIdx)}>
                  신고하기
                </button>
              )}
            </div>
          )}

          <div className="font-[13px] text-[#333333]">{item.content}</div>
        </div>
      </div>
    </>
  );
};

export default ReviewItem;
