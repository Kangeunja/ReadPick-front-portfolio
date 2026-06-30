import { SearchCategory } from 'types/keyword';

type BsItemProps = {
  keywordToggle: number | null;
  keywordList: SearchCategory[];
  selectedBssIdx: number | null;
  onBsClick: (bsIdx: number) => void;
  onBssClick: (bssIdx: number) => void;
  onToggleClick: (bsIdx: number) => void;
};

const KeywordNav = ({ keywordToggle, keywordList, selectedBssIdx, onBsClick, onBssClick, onToggleClick }: BsItemProps) => {
  return (
    <div className="float-left mb-[150px] box-border border border-borderGrayColor bg-[#f9f9f9] p-[40px]">
      {keywordList.map((item) => (
        <div key={item.bsIdx}>
          <div
            className="mb-[5px] cursor-pointer font-bold hover:underline"
            onClick={() => {
              onBsClick(item.bsIdx);
              onToggleClick(item.bsIdx);
            }}
          >
            {item.bsName}
          </div>
          {keywordToggle === item.bsIdx && (
            <ul className={`mb-[5px] flex flex-col overflow-hidden text-textGrayColor transition-[max-height] duration-[0.3s] ease-in-out`}>
              {item.bssList.map((bssList) => (
                <li
                  key={bssList.bssIdx}
                  onClick={() => onBssClick(bssList.bssIdx)}
                  className={`mb-[5px] cursor-pointer text-[13px] font-normal hover:underline ${selectedBssIdx === bssList.bssIdx ? 'font-semibold text-pointColor' : ''}`}
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
