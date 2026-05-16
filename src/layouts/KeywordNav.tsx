import { BsItem } from "../types/keyword";

interface BsItemProps {
  keywordList: BsItem[];
  keywordToggle: number | null;
  selectedBssIdx: number | null;

  onBsClick: (bsIdx: number) => void;
  onBssClick: (bssIdx: number) => void;
}

const KeywordNav = ({
  keywordList,
  keywordToggle,
  selectedBssIdx,
  onBsClick,
  onBssClick,
}: BsItemProps) => {
  return (
    <div
      className="float-left mb-[200px] bg-[#f9f9f9] border border-[#eaeaea]
      p-[50px] box-border
    "
    >
      {keywordList.map((item) => (
        <div key={item.bsIdx}>
          <div
            className="font-bold mb-[5px] cursor-pointer hover:underline"
            onClick={() => onBsClick(item.bsIdx)}
          >
            {item.bsName}
          </div>
          {keywordToggle === item.bsIdx && (
            <ul
              className={`overflow-hidden flex-col transition-[max-height]
                duration-[0.3s] ease-in-out text-[#3d3d3d] mb-[5px]
                ${keywordToggle === item.bsIdx ? "open" : ""}`}
            >
              {item.bssList.map((bssList, index) => (
                <li
                  key={index}
                  onClick={() => onBssClick(bssList.bssIdx)}
                  className={`font-normal text-[13px] cursor-pointer mb-[5px] hover:underline
                    ${selectedBssIdx === bssList.bssIdx ? "font-bold text-[#248f8f]" : ""}`}
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
