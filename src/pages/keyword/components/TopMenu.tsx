import { useState } from 'react';

import { useOutsideClick } from 'hooks/useOutsideClick';
import { SearchCategory } from 'types/keyword';

interface TopMenuProps {
  keywordList: SearchCategory[];
  selectedBsIdx: number | null;
  selectedBssIdx?: number | null;
  onBsClick: (bsIdx: number) => void;
  onBssClick: (bssIdx: number) => void;
}

const TopMenu = ({ keywordList, selectedBsIdx, selectedBssIdx, onBsClick, onBssClick }: TopMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const subMenuRef = useOutsideClick(() => setIsOpen(false));

  // 현재 선택된 데이터 추출
  const selectedBs = keywordList.find((item) => item.bsIdx === selectedBsIdx);
  const selectedBss = selectedBs?.bssList.find((item) => item.bssIdx === selectedBssIdx);

  const searchParams = new URLSearchParams(window.location.search);
  const currentKeyword = searchParams.get('keyword') || '';

  return (
    <div className="box-border flex items-center py-[20px]">
      {selectedBs && <div className="mr-[10px] h-[13px] w-3 bg-icon-home"></div>}

      {selectedBs && (
        <button
          type="button"
          className="mr-[10px] cursor-pointer text-[14px] text-textGrayColor hover:underline"
          onClick={() => onBsClick(selectedBs.bsIdx)}
        >
          {selectedBs.bsName}
        </button>
      )}

      {selectedBss && (
        <>
          <div className="h-3 w-3 bg-icon-arrow"></div>
          <div className="relative flex cursor-pointer items-center" ref={subMenuRef} onClick={() => setIsOpen((prev) => !prev)}>
            <div className="mr-[5px] text-[14px] font-bold">{selectedBss.bssName}</div>
            <div className={`flex h-[15px] w-[15px] items-center justify-center rounded-[50px] border border-gray-200`}>
              <div
                className={`h-[6px] w-[6px] border-b-2 border-r-2 border-gray-400 ${
                  isOpen ? 'mb-0 mt-[3px] rotate-[-135deg]' : 'mb-[3px] mt-0 rotate-45'
                } `}
              ></div>
            </div>

            {isOpen && (
              <ul className="absolute left-[-10px] top-[30px] z-[10] box-border w-[140px] border border-pointColor bg-white p-[15px] text-[13px] text-textGrayColor">
                {selectedBs?.bssList.map((item) => (
                  <li
                    key={item.bssIdx}
                    className={`cursor-pointer hover:underline ${item.bssIdx === selectedBssIdx ? 'font-bold text-black' : ''}`}
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

      {!selectedBs && currentKeyword && (
        <p className="text-[14px] text-textGrayColor">
          <span className="font-bold text-pointColor">{currentKeyword}</span>에 대한 검색 결과
        </p>
      )}
    </div>
  );
};
export default TopMenu;
