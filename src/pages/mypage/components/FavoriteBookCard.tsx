import { getLargeBookImage } from '../../../utils/image';

interface FavoriteBookCardProps {
  item: { bookIdx: number; bsIdx: number; bookName: string; author: string };
  imageFile?: string;
  onClick: (bookIdx: number, bsIdx: number) => void;
}

const FavoriteBookCard = ({ item, imageFile, onClick }: FavoriteBookCardProps) => {
  return (
    <div key={item.bookIdx} className="shrink-0 cursor-pointer" onClick={() => onClick(item.bookIdx, item.bsIdx)}>
      <div className="mb-[14px] h-[148px] w-[119px]">
        {imageFile ? (
          <img
            src={getLargeBookImage(imageFile)}
            alt={item.bookName}
            className="box-border h-[148px] w-[119px] rounded-[12px] border border-borderLightColor"
          />
        ) : (
          <div className="h-full w-full animate-pulse bg-gray-200" />
        )}
      </div>
      <div className="w-[119px]">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-bold">{item.bookName}</p>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-[#555555]">{item.author}</p>
      </div>
    </div>
  );
};

export default FavoriteBookCard;
