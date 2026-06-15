import { BsItem } from '../../types/keyword';

interface BsItemProps {
  keywordList: BsItem[];
  keywordToggle: number | null;
  selectedBssIdx: number | null;
  onBsClick: (bsIdx: number) => void;
  onBssClick: (bssIdx: number) => void;
}

const KeywordNav = ({ keywordList, keywordToggle, selectedBssIdx, onBsClick, onBssClick }: BsItemProps) => {
  return (
    <div className="float-left mb-[200px] box-border border border-borderLineColor bg-[#f9f9f9] p-[40px]">
      {keywordList.map((item) => (
        <div key={item.bsIdx}>
          <div className="mb-[5px] cursor-pointer font-bold hover:underline" onClick={() => onBsClick(item.bsIdx)}>
            {item.bsName}
          </div>
          {keywordToggle === item.bsIdx && (
            <ul
              className={`mb-[5px] flex-col overflow-hidden text-[#3d3d3d] transition-[max-height] duration-[0.3s] ease-in-out ${keywordToggle === item.bsIdx ? 'open' : ''}`}
            >
              {item.bssList.map((bssList, index) => (
                <li
                  key={index}
                  onClick={() => onBssClick(bssList.bssIdx)}
                  className={`mb-[5px] cursor-pointer text-[13px] font-normal hover:underline ${selectedBssIdx === bssList.bssIdx ? 'text-pointColor font-semibold' : ''}`}
                >
                  {bssList.bssName}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default KeywordNav;
