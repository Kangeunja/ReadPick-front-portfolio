import { useState } from 'react';

import { BsItem } from '../../types/keyword';
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface TopMenuProps {
  keywordList: BsItem[];
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

  return (
    <div className="box-border flex py-5">
      <div className="mr-[10px] mt-[3px] h-[13px] w-3 bg-icon-home"></div>

      {selectedBs && (
        <div className="mr-[10px] cursor-pointer text-[14px] text-[#454545] hover:underline" onClick={() => onBsClick(selectedBs.bsIdx)}>
          {selectedBs.bsName}
        </div>
      )}

      {selectedBss && (
        <>
          <div className="mt-[5px] h-3 w-3 bg-icon-arrow"></div>
          <div className="relative flex cursor-pointer" ref={subMenuRef} onClick={() => setIsOpen((prev) => !prev)}>
            <div className="mr-[5px] text-[14px] font-bold">{selectedBss.bssName}</div>
            <div
              className={`mt-[5px] flex h-[14px] w-[14px] items-center justify-center rounded-[50px] border border-[#dcdcdc] ${isOpen ? 'open' : ''}`}
            >
              <div
                className={`mb-[3px] h-[5px] w-[5px] border-b-2 border-r-2 border-gray-400 ${
                  isOpen ? 'mb-0 mt-[3px] rotate-[-135deg]' : 'mb-[3px] mt-0 rotate-45'
                } `}
              ></div>
            </div>

            {isOpen && (
              <ul className="border-pointColor absolute left-[-10px] top-[30px] box-border w-[140px] border bg-white p-[15px] text-[13px] text-[#4a4a4a]">
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
    </div>
  );
};
export default TopMenu;
