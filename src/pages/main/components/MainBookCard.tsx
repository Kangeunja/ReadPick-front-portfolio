import { useHover } from '../../../hooks/useHover';

import { getLargeBookImage } from '../../../utils/image';

import { BookItem } from '../../../types/main';

interface MainBookCardProps {
  item: BookItem;
  gotoDetail: (bookIdx: number, bsIdx: number) => void;
}

export const MainBookCard = ({ item, gotoDetail }: MainBookCardProps) => {
  const [isHovered, hoverProps] = useHover();
  return (
    <div className="mb-[15px] w-[130px] cursor-pointer bg-white" onClick={() => gotoDetail(item.bookIdx, item.bsIdx)} {...hoverProps}>
      <img
        className={`mb-[8px] h-[170px] w-[130px] transform-gpu rounded-[5px] object-cover transition-all duration-[0.3s] ease-in-out ${isHovered ? '-translate-y-1 shadow-[0_12px_25px_rgba(0,0,0,0.12)]' : 'translate-y-0 shadow-none'}`}
        src={getLargeBookImage(item.bookImageName)}
        alt={item.bookName}
      />

      <div className="pointer-events-none w-[130px]">
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-[13px] font-semibold">{item.bookName}</p>
        <p className="text-[10px] text-[#4d4d4d]">{item.author}</p>
      </div>
    </div>
  );
};
