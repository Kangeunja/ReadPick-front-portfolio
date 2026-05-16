import { useCallback, useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";

import { BsItem, SelectedItem } from "../../types/userPick";

interface Props {
  onClose: () => void;
}

const MemberLoginPopup = ({ onClose }: Props) => {
  const [bsData, setBsData] = useState<BsItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  // 관심사 목록 가져오기
  const fetchUserPicks = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/userPick");
      setBsData(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchUserPicks();
    document.body.style.overflow = "hidden"; // 팝업이 열릴 때 body의 스크롤 막기
    return () => {
      document.body.style.overflow = "auto"; // 팝업이 닫힐 때 스크롤 복구
    };
  }, [fetchUserPicks]);

  // 항목 선택/해제 핸들러
  const handleSelect = (item: SelectedItem) => {
    setSelectedItems((prev) => {
      const isAlreadySelected = prev.some(
        (selected) => selected.bssIdx === item.bssIdx,
      );

      if (isAlreadySelected) {
        return prev.filter((selected) => selected.bssIdx !== item.bssIdx); // 이미 선택 항목이면 제거
      }

      if (prev.length < 4) {
        return [...prev, item];
      }

      return prev;
    });
  };

  // 선택 완료 제출
  const handleSelectedItems = async () => {
    if (selectedItems.length === 0) return alert("관심사를 선택해주세요.");
    if (selectedItems.length < 4) return;

    const formattedData = selectedItems.map((item) => [
      item.bsIdx,
      item.bssIdx,
    ]);

    try {
      const res = await axiosInstance.post("/userPickResult", formattedData);
      if (res.data === "success") onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="fixed w-full h-full top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.4)]
        z-[99] 
      "
      >
        <div
          className=" h-[500px] bg-white fixed z-[100] 
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-[40px] px-[25px] box-border
        "
        >
          <div className="h-[30px] flex mb-[10px]">
            <div className="text-xl font-bold mr-[15px]">관심사 PICK</div>
            <div className="text-xs text-[#878787]">
              <p>관심사 키워드를 통해 오늘의 책 또는 관련책을 추천해줍니다.</p>
              <p> (최대4개까지 선택해주세요.)</p>
            </div>
          </div>
          <div
            className="h-[350px] overflow-auto mb-[10px] scrollbar-thin 
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            {bsData.map((item) => (
              <div key={item.bsName}>
                <div className="text-[17px] mb-[15px]">{`# ${item.bsName}`}</div>
                <ul className="w-[580px] mb-5 flex flex-wrap gap-[10px]">
                  {item.bssList.map((item) => (
                    <li
                      key={item.bssIdx}
                      onClick={() =>
                        handleSelect({
                          bsIdx: item.bsIdx,
                          bssIdx: item.bssIdx,
                        })
                      }
                      className={`w-[130px] h-[35px] border border-[#c9c9c9] rounded-[5px] text-[11px] text-center
                          mb-[10px] flex justify-center items-center cursor-pointer
                          hover:border-[#248f8f] 
                          hover:shadow-[0_8px_20px_rgba(36,143,143,0.15)]
                          "
                        ${
                          selectedItems.some(
                            (selected) => selected.bssIdx === item.bssIdx,
                          )
                            ? "bg-[#008314] text-white"
                            : "bg-gray-50 text-black"
                        }`}
                    >
                      {item.bssName}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button
            className={`w-[90px] h-10 border border-[#c9c9c9] text-[14px] float-right ${
              selectedItems.length === 4
                ? "bg-[#008314] text-white"
                : "bg-gray-50 text-black cursor-not-allowed"
            }`}
            onClick={handleSelectedItems}
          >
            선택완료
          </button>
        </div>
      </div>
    </>
  );
};
export default MemberLoginPopup;
