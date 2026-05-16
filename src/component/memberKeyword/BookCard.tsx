import { Book } from "../../types/book";

interface BookCardProps {
  item: Book;
  imgUrl?: string;
  onCardClick: (id: number) => void;
}

const BookCard = ({ item, imgUrl, onCardClick }: BookCardProps) => {
  return (
    <div
      className="w-[160px] cursor-pointer"
      onClick={() => onCardClick(item.bookIdx)}
    >
      <div
        className="w-[160px] h-[200px] border border-[#d9d9d9] mb-[15px]
                    transition-all duration-[0.3s] ease-in-out
                    hover:-translate-y-1 hover:shadow-[3px_2px_9.6px_1px_rgba(193,193,193,1)]
                  "
      >
        <img
          className="w-full h-full"
          src={imgUrl?.replace("coversum", "cover500")}
          alt="책 이미지"
        />
      </div>
      <div className="keyword-card__info">
        <p
          className="w-[160px] whitespace-nowrap text-ellipsis
                    overflow-hidden font-bold text-[15px]"
        >
          {item.bookName}
        </p>
        <p className="text-[12px] text-[#373737]">{item.author}</p>
      </div>
    </div>
  );
};

export default BookCard;
