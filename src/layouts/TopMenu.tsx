// react
import { useEffect, useRef, useState } from "react";

// types
import { BsItem } from "../types/keyword";

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
  const [isOpen, setIsOpen] = useState(false);
  const subMenuRef = useRef<HTMLDivElement | null>(null);

  // 현재 선택된 데이터 추출
  const selectedBs = keywordList.find((item) => item.bsIdx === selectedBsIdx);
  const selectedBss = selectedBs?.bssList.find(
    (item) => item.bssIdx === selectedBssIdx,
  );

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        subMenuRef.current &&
        !subMenuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="py-5 box-border flex">
      <div className="w-3 h-[13px] bg-keyword-home mr-[10px] mt-[5px]"></div>

      {selectedBs && (
        <div
          className="text-[15px] text-[#454545] mr-[10px] hover:underline cursor-pointer"
          onClick={() => onBsClick(selectedBs.bsIdx)}
        >
          {selectedBs.bsName}
        </div>
      )}

      {selectedBss && (
        <>
          <div className="w-3 h-3 bg-keyword-arrow mt-[5px]"></div>
          <div
            className="flex relative cursor-pointer"
            ref={subMenuRef}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <div className="text-[15px] mr-[5px]">{selectedBss.bssName}</div>
            <div
              className={`w-[14px] h-[14px] border border-[#dcdcdc]
              rounded-full mt-[5px] flex items-center justify-center
              ${isOpen ? "open" : ""}`}
            >
              <div
                className={`w-[5px] h-[5px] border-r-2 border-b-2 border-gray-400 mb-[3px]  
                ${
                  isOpen
                    ? "rotate-[-135deg] mt-[3px] mb-0"
                    : "rotate-45 mb-[3px] mt-0"
                }
                `}
              ></div>
            </div>

            {isOpen && (
              <ul
                className="w-[160px] bg-white border border-[#248f8f] absolute
                top-[30px] left-[-10px] p-[15px] box-border text-[14px] text-[#3d3d3d]
              "
              >
                {selectedBs?.bssList.map((item) => (
                  <li
                    key={item.bssIdx}
                    className={`hover:underline cursor-pointer
                      ${item.bssIdx === selectedBssIdx ? "font-bold" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onBssClick(item.bssIdx);
                      setIsOpen(false);
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
