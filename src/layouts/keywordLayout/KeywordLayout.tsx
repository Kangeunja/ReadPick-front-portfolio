import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopMenu from "../topMenu/TopMenu";
import axiosInstance from "../../api/axiosInstance";
import KeywordNav from "./KeywordNav";
import "../../assets/css/topmenu.css";
import "../../assets/css/keywordNav.css";

interface KeywrodLayoutProps {
  onBsClick: (bsIdx: number) => void;
  onBssClick: (bssIdx: number) => void;
}

const KeywordLayout = ({ onBsClick, onBssClick }: KeywrodLayoutProps) => {
  const location = useLocation();

  // URL에서 bsIdx 쿼리 파라미터 값 추출
  const query = new URLSearchParams(location.search);
  const bsIdx = query.get("bsIdx");
  const bssIdx = query.get("bssIdx");

  const bsIdxNumber = bsIdx ? parseInt(bsIdx, 10) : null;
  const bssIdxNumber = bssIdx ? Number(bssIdx) : null;

  const [keyword, setKeyword] = useState([]);

  // 키워드 리스트 토글 유무
  const [keywordToggle, setKeywordToggle] = useState<number | null>(null);

  useEffect(() => {
    keywordList();
  }, []);

  // 메인페이지에서 선택한 중분류의 소분류 리스트 api
  const keywordList = () => {
    axiosInstance
      .get("/bssListByBsIdx")
      .then((res) => {
        console.log(res.data);
        setKeyword(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (bssIdxNumber !== null) {
      setKeywordToggle(bsIdxNumber);
    }

    if (bsIdxNumber !== null) {
      setKeywordToggle(bsIdxNumber);
    }
  }, [bssIdxNumber, bsIdxNumber]);

  return (
    <>
      <TopMenu
        keywordList={keyword}
        selectedBsIdx={bsIdxNumber}
        selectedBssIdx={bssIdxNumber}
        onBsClick={onBsClick}
        onBssClick={onBssClick}
      />
      <KeywordNav
        keywordList={keyword}
        onBsClick={onBsClick}
        onBssClick={onBssClick}
        keywordToggle={keywordToggle}
        selectedBssIdx={bssIdxNumber}
      />
    </>
  );
};
export default KeywordLayout;
