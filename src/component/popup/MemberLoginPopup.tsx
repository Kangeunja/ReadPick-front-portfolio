import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import IsLoginPopup from "./IsLoginPopup";

interface BssItem {
  // bmIdx: string;
  bsIdx: string;
  bssIdx: string;
  bssName: string;
}

interface BsItem {
  bsName: string;
  bssList: BssItem[];
}

interface SelectedItem {
  // bmIdx: string;
  bsIdx: string;
  bssIdx: string;
  // bssName: string;
}

const MemberLoginPopup = ({ onClose }: any) => {
  const [bsName, setBsName] = useState<BsItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/userPick")
      .then((res) => {
        // console.log(res.data);
        setBsName(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // 팝업이 열릴 때 body의 스크롤 막기
    document.body.style.overflow = "hidden";
    return () => {
      // 팝업이 닫힐 때 스크롤 복구
      document.body.style.overflow = "auto";
    };
  }, []);

  // 사용자가 선택한 항목
  const handleSelect = (item: SelectedItem) => {
    // console.log(item);
    setSelectedItems((prev) => {
      const exists = prev.some((selected) => selected.bssIdx === item.bssIdx);
      if (exists) {
        return prev.filter((selected) => selected.bssIdx !== item.bssIdx); // 이미 선택 항목이면 제거
      } else if (prev.length < 4) {
        return [...prev, item];
      }
      return prev;
    });
    // setSelectedItems((prev) =>
    //   prev.includes(bssName)
    //     ? prev.filter((item) => item !== bssName)
    //     : [...prev, bssName]
    // );
    // setSelectedItems((prev) => {
    //   if (prev.includes(bssName)) {
    //     return prev.filter((item) => item !== bssName); // 이미 선택 항목이면 제거
    //   } else if (prev.length < 4) {
    //     return [...prev, bssName];
    //   }
    //   return prev; // 4개 초과시 추가 안함
    // });
  };
  console.log(selectedItems);

  // 선택완료 api
  const handleSelectedItems = () => {
    if (selectedItems.length === 0) {
      alert("관심사를 선택해주세요.");
      return;
    } else if (selectedItems.length < 4) {
      // alert("관심사를 최대 4개까지 선택해주세요.");
      return;
    }
    const formattedData = selectedItems.map((item) => [
      item.bsIdx,
      item.bssIdx,
    ]);
    console.log(formattedData);

    axiosInstance
      .post("/userPickResult", formattedData)
      .then((res) => {
        console.log(res);
        if (res.data === "success") {
          onClose();
          // navigate("/");
        }
        // setLoginPopup(true);
      })
      .catch((error) => {
        console.log("User selected failed", error);
      });
  };

  return (
    <>
      <div className="popup-background">
        <div className="popup-box">
          <div className="popup-title-wrap">
            <div className="popup-title">관심사 PICK</div>
            <div className="popup-sub-p">
              <p>관심사 키워드를 통해 오늘의 책 또는 관련책을 추천해줍니다.</p>
              <p> (최대4개까지 선택해주세요.)</p>
            </div>
          </div>
          <div className="popup-container">
            {bsName.map((item) => (
              <div key={item.bsName}>
                <div className="popup-sub-title">{`# ${item.bsName}`}</div>
                <ul className="popup-con">
                  {item.bssList.map((item) => (
                    <li
                      key={item.bssIdx}
                      onClick={() =>
                        handleSelect({
                          // bmIdx: item.bmIdx,
                          bsIdx: item.bsIdx,
                          bssIdx: item.bssIdx,
                          // bssName: item.bssName,
                        })
                      }
                      className={
                        selectedItems.some(
                          (selected) => selected.bssIdx === item.bssIdx
                        )
                          ? "selected"
                          : ""
                      }
                      // className={
                      //   selectedItems.includes(item.bssName) ? "selected" : ""
                      // }
                    >
                      {item.bssName}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button
            className={`button-pick ${
              selectedItems.length === 4 ? "active" : ""
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
