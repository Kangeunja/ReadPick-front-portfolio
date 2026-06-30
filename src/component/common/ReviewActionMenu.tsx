import { MutableRefObject } from 'react';
import { Review } from '../../types/review';

interface ReviewActionMenuProps {
  item: Review;
  currentUserIdx: number | undefined;
  moreMenuRef: MutableRefObject<HTMLDivElement | null>;
  handleOpenPopup: (type: 'EDIT' | 'DELETE', review: Review) => void;
}

export const ReviewActionMenu = ({ item, currentUserIdx, moreMenuRef, handleOpenPopup }: ReviewActionMenuProps) => {
  return (
    <div
      className="w-[83px] rounded-[5px] bg-white p-[5px] text-center text-[12px] leading-[28px] shadow-[3px_2px_6px_1px_rgba(0,0,0,0.15)]"
      ref={moreMenuRef}
      onClick={(e) => e.stopPropagation()}
    >
      {item.userIdx === currentUserIdx && (
        <>
          <button onClick={() => handleOpenPopup('EDIT', item)}>수정하기</button>
          <button onClick={() => handleOpenPopup('DELETE', item)}>삭제하기</button>
        </>
      )}
    </div>
  );
};
