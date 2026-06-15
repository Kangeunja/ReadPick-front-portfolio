import { useState } from 'react';

import { useUserPickQuery } from '../../mypage/hooks/useUserQueries';
import useLockBodyScroll from '../../../hooks/useLockBodyScroll';
import { useUserPickMutation } from '../../../hooks/mutations/useUserPickMutation';

import { SelectedItem } from '../../../types/userPick';

interface Props {
  onConfirm: () => void;
  onClose: () => void;
}

const MAX_SELECT_COUNT = 4;

const FirstVisitPopup = ({ onConfirm, onClose }: Props) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  // 관심사 목록 가져오기
  const { data = [], isLoading } = useUserPickQuery();

  const { mutate, isPending } = useUserPickMutation();

  useLockBodyScroll();

  // 항목 선택/해제 핸들러
  const handleSelect = (item: SelectedItem) => {
    setSelectedItems((prev) => {
      const isAlreadySelected = prev.some((selected) => selected.bssIdx === item.bssIdx);

      if (isAlreadySelected) {
        return prev.filter((selected) => selected.bssIdx !== item.bssIdx); // 이미 선택 항목이면 제거
      }

      if (prev.length < MAX_SELECT_COUNT) {
        return [...prev, item];
      }

      return prev;
    });
  };

  // 선택 완료 제출
  const handleSubmitPicks = () => {
    if (selectedItems.length < MAX_SELECT_COUNT) {
      return;
    }

    const formattedData = selectedItems.map((item) => [item.bsIdx, item.bssIdx]);

    mutate(formattedData, {
      onSuccess: () => {
        onConfirm();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="animation-popup">
      <div className="fixed box-border rounded-[10px] bg-white px-[25px] py-[30px]">
        <div className="relative mb-[30px] flex h-[30px]">
          <div className="mr-[25px] text-[20px] font-bold">관심사 PICK</div>
          <div className="text-[12px] text-[#878787]">
            <p>관심사 키워드를 통해 오늘의 책 또는 관련책을 추천해줍니다.</p>
            <p> (최대4개까지 선택해주세요.)</p>
          </div>

          <button
            className="absolute right-0 h-[16px] w-[16px] cursor-pointer border-none bg-transparent bg-popup-cancel"
            onClick={() => onClose()}
          ></button>
        </div>
        <div className="scrollbar-thin mb-[30px] h-[350px] overflow-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5">
          {data.map((item) => (
            <div key={item.bsName}>
              <div className="mb-[15px] text-[14px]">{`# ${item.bsName}`}</div>
              <ul className="mb-5 flex w-[580px] flex-wrap gap-[10px]">
                {item.bssList.map((subitem) => {
                  const isSelected = selectedItems.some((selected) => selected.bssIdx === subitem.bssIdx);
                  return (
                    <li
                      key={subitem.bssIdx}
                      onClick={() =>
                        handleSelect({
                          bsIdx: subitem.bsIdx,
                          bssIdx: subitem.bssIdx,
                        })
                      }
                      className={`border-borderLightColor hover:border-pointColor hover:shadow-borderShadow mb-[10px] flex h-[35px] w-[130px] cursor-pointer items-center justify-center rounded-[5px] border text-center text-[11px] ${
                        isSelected ? 'bg-pointColor text-white' : 'bg-gray-50 text-black'
                      } `}
                    >
                      {subitem.bssName}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <button
          type="button"
          className={`border-borderLightColor mx-auto block border px-[30px] py-[8px] text-[13px] ${
            selectedItems.length === MAX_SELECT_COUNT ? 'bg-gray-200 text-gray-700' : 'cursor-not-allowed bg-gray-100 text-gray-400'
          } ${isPending ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={handleSubmitPicks}
          disabled={isPending}
        >
          선택완료
        </button>
      </div>
    </div>
  );
};
export default FirstVisitPopup;
