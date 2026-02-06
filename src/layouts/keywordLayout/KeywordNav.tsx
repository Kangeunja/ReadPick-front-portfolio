interface BsItem {
  bsIdx: number;
  bsName: string;
  bssList: {
    bssIdx: number;
    bssName: string;
  }[];
}

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
    <div className="keyword-nav">
      {keywordList.map((item) => (
        <div key={item.bsIdx}>
          <div
            className="keyword-nav__title"
            onClick={() => onBsClick(item.bsIdx)}
          >
            {item.bsName}
          </div>
          {keywordToggle === item.bsIdx && (
            <ul
              className={`keyword-nav__sub-list ${
                keywordToggle === item.bsIdx ? "open" : ""
              }`}
            >
              {item.bssList.map((bssList, index) => (
                <li
                  key={index}
                  onClick={() => onBssClick(bssList.bssIdx)}
                  className={
                    selectedBssIdx === bssList.bssIdx
                      ? "keyword-nav__sub-item active"
                      : "keyword-nav__sub-item"
                  }
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
