import { getLargeBookImage } from 'utils/image';

import { useHover } from 'hooks/useHover';

import { Book } from 'types/book';

type BookCardProps = {
  item: Book;
  imgUrl?: string;
  onCardClick: (id: number) => void;
};

const BookCard = ({ item, imgUrl, onCardClick }: BookCardProps) => {
  const [isHovered, hoverProps] = useHover();

  return (
    <div className="w-[160px] cursor-pointer" onClick={() => onCardClick(item.bookIdx)} {...hoverProps}>
      <img
        className={`mb-[15px] h-[200px] w-[160px] border border-solid border-borderLightColor object-cover transition-all duration-[0.3s] ease-in-out ${isHovered ? '-translate-y-1 shadow-[3px_2px_9.6px_1px_rgba(193,193,193,1)]' : 'translate-y-0 shadow-none'} `}
        src={getLargeBookImage(imgUrl)}
        alt={item.bookName}
      />
      <div className="keyword-card__info">
        <p className="w-[160px] overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-bold">{item.bookName}</p>
        <p className="text-[11px] text-[#373737]">{item.author}</p>
      </div>
    </div>
  );
};

export default BookCard;
