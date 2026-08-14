import { getLargeBookImage } from 'utils/image';

import { useHover } from 'hooks/useHover';
import { BookItem } from 'types/book';

type MainBookCardProps = {
  item: BookItem;
  gotoDetail: (bookIdx: number, bsIdx: number) => void;
  rank: number;
};

export const MainBookCard = ({ item, gotoDetail, rank }: MainBookCardProps) => {
  const [isHovered, hoverProps] = useHover();
  return (
    <div
      className="relative mb-[15px] w-[130px] cursor-pointer bg-white"
      onClick={() => gotoDetail(item.bookIdx, item.bsIdx)}
      {...hoverProps}
    >
      <div
        className={`relative w-[130px] transform-gpu transition-all duration-[0.3s] ease-in-out ${
          isHovered ? '-translate-y-1' : 'translate-y-0'
        }`}
      >
        {rank && (
          <div
            className={`absolute left-0 top-0 z-10 flex h-[26px] min-w-[26px] items-center justify-center rounded-br-[8px] rounded-tl-[5px] px-1.5 text-[12px] font-bold text-white shadow-md ${
              rank === 1 ? 'bg-[#b45309]' : rank <= 3 ? 'bg-[#6b7280]' : 'bg-[#9ca3af]'
            }`}
          >
            {rank}위
          </div>
        )}

        <img
          className={`mb-[8px] h-[170px] w-[130px] transform-gpu rounded-[5px] object-cover transition-all duration-[0.3s] ease-in-out ${isHovered ? 'shadow-[0_12px_25px_rgba(0,0,0,0.12)]' : 'shadow-none'}`}
          src={getLargeBookImage(item.bookImageName)}
          alt={item.bookName}
        />
      </div>

      <div className="pointer-events-none w-[130px]">
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-[13px] font-semibold">{item.bookName}</p>
        <p className="text-[10px] text-[#4d4d4d]">{item.author}</p>
      </div>
    </div>
  );
};
