import { Review } from '../../../types/review';

interface ReviewActionMenuProps {
  item: Review;
  userIdx: number;
  handleOpenPopup: (type: 'EDIT' | 'DELETE', review: Review) => void;
}

export const ReviewActionMenu = ({ item, userIdx, handleOpenPopup }: ReviewActionMenuProps) => {
  return (
    <div
      className="absolute right-[18px] top-0 box-border w-[83px] rounded-[3px] bg-white p-[5px] text-center text-[12px] leading-[28px] shadow-[3px_2px_6px_1px_rgba(0,0,0,0.15)]"
      onClick={(e) => e.stopPropagation()}
    >
      {item.userIdx === userIdx && (
        <>
          <button onClick={() => handleOpenPopup('EDIT', item)}>수정하기</button>
          <button onClick={() => handleOpenPopup('DELETE', item)}>삭제하기</button>
        </>
      )}
    </div>
  );
};
