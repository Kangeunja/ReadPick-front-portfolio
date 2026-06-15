import { MutableRefObject } from 'react';

import { getLargeBookImage } from '../../../utils/image';

import { Review } from '../../../types/review';
import { UserInfo } from '../../../types/user';
import { ReviewActionMenu } from './ReviewActionMenu';

interface Prop {
  item: Review;
  openMoreReviewId: number | null;
  moreMenuRef: MutableRefObject<HTMLDivElement | null>;
  userInfo: UserInfo;
  onToggleMenu: (rvIdx: number) => void;
  onCloseMenu: () => void;
  handleOpenPopup: (type: 'EDIT' | 'DELETE', review: Review) => void;
}

const MyReviewItem = ({ item, openMoreReviewId, moreMenuRef, userInfo, onToggleMenu, handleOpenPopup }: Prop) => {
  return (
    <div className="relative mb-[60px]" ref={openMoreReviewId === item.rvIdx ? moreMenuRef : null}>
      <div className="mb-[11px] flex">
        <div
          className={`mr-[11px] flex h-[28px] w-[28px] flex-shrink-0 items-center justify-center rounded-[50px] ${userInfo.fileName === 'default' ? 'border border-[#1b1b1b]' : ''}`}
        >
          {userInfo.fileName === 'default' ? (
            <div className="h-[15px] w-[15px] bg-icon-default bg-cover" />
          ) : (
            <img className="h-[28px] w-[28px] rounded-[50px]" src={userInfo.fileName} alt="프로필 이미지" />
          )}
        </div>
        <div className="flex w-full justify-between leading-[30px]">
          <p className="text-[14px] text-[#333333]">{item.nickName}</p>
          <p className="text-[12px] text-memberColor">{item.regDate}</p>
        </div>
        <div
          className="b mt-[4px] h-5 w-5 cursor-pointer bg-icon-add bg-center bg-no-repeat"
          onClick={(e) => {
            e.stopPropagation();
            onToggleMenu(item.rvIdx);
          }}
        ></div>
      </div>
      {openMoreReviewId === item.rvIdx && <ReviewActionMenu item={item} userIdx={userInfo.userIdx} handleOpenPopup={handleOpenPopup} />}

      <div className="mb-3 box-border flex w-full items-center rounded-[5px] border border-[#f3f3f3] p-[10px]">
        <div className="mr-5 h-[75px] w-[60px] flex-shrink-0 rounded-[12px]">
          <img src={getLargeBookImage(item.bookImageName)} alt="책 이미지" className="h-[75px] w-[60px] rounded-[12px]" />
        </div>
        <div className="flex flex-col">
          <p className="text-[14px] font-bold">{item.bookName}</p>
          <p className="text-xs text-[#343434]">{item.author}</p>
        </div>
      </div>

      <div className="text-[13px] text-[#333333]">{item.content}</div>
    </div>
  );
};

export default MyReviewItem;
