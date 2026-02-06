import { useEffect, useRef, useState } from "react";

interface BsItem {
  bsIdx: number;
  bsName: string;
  bssList: {
    bssIdx: number;
    bssName: string;
  }[];
}

interface TopMenuProps {
  keywordList: BsItem[];
  selectedBsIdx: number | null;
  selectedBssIdx?: number | null;

  onBsClick: (bsIdx: number) => void;
  onBssClick: (bssIdx: number) => void;
}

const TopMenu = ({
  keywordList,
  selectedBsIdx,
  selectedBssIdx,
  onBsClick,
  onBssClick,
}: TopMenuProps) => {
  const [open, setOpen] = useState(false);
  const subMenuRef = useRef<HTMLDivElement | null>(null);

  const selectedBs = keywordList.find((item) => item.bsIdx === selectedBsIdx);
  const selectedBss = selectedBs?.bssList.find(
    (item) => item.bssIdx === selectedBssIdx
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        open &&
        subMenuRef.current &&
        !subMenuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="keyword-header">
      <div className="keyword-icon"></div>

      {selectedBs && (
        <div
          className="keyword-header__title"
          onClick={() => onBsClick(selectedBs.bsIdx)}
        >
          {selectedBs.bsName}
        </div>
      )}

      {selectedBss && (
        <>
          <div className="keyword-header-icon"></div>
          <div
            className="keyword-header-sub-box"
            ref={subMenuRef}
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="keyword-header-sub__title">
              {selectedBss?.bssName}
            </div>
            <div className={`keyword-header-icon-box ${open ? "open" : ""}`}>
              <div className="keyword-header-down-icon"></div>
            </div>

            {open && (
              <ul className="keyword-header-sub-menu">
                {/* {selectedBs?.bssList
              .filter((item) => item.bssIdx !== bssIdxNumber)
              .map((item, index) => (
                <li key={index}>{item.bssName}</li>
              ))} */}
                {selectedBs?.bssList.map((item: any, index: any) => (
                  <li
                    key={index}
                    className={
                      item.bssIdx === selectedBssIdx
                        ? "keyword-header-sub-menu-item active"
                        : "keyword-header-sub-menu-item"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      onBssClick(item.bssIdx);
                      // onBssClick(bssList.bssIdx)
                      setOpen(false);
                    }}
                  >
                    {item.bssName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default TopMenu;
