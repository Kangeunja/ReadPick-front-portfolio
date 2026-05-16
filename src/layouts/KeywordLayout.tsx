// react
import { useEffect, useState } from "react";

// Router
import { useLocation } from "react-router-dom";

// components
import TopMenu from "./TopMenu";
import KeywordNav from "./KeywordNav";

// hooks
import { useKeywordQuery } from "../hooks/queries/useKeywordQuery";

interface KeywordLayoutProps {
  onBsClick: (bsIdx: number) => void;
  onBssClick: (bssIdx: number) => void;
}

const KeywordLayout = ({ onBsClick, onBssClick }: KeywordLayoutProps) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  // URL 파라미터 추출 및 숫자 변환
  const bsIdx = query.get("bsIdx");
  const bssIdx = query.get("bssIdx");
  const bsIdxNumber = bsIdx ? Number(bsIdx) : null;
  const bssIdxNumber = bssIdx ? Number(bssIdx) : null;

  // 데이터 상태 관리
  const [keywordToggle, setKeywordToggle] = useState<number | null>(null); // 현재 펼쳐진 중분류 ID

  // 키워드 가져오기
  const { data: keywordList = [] } = useKeywordQuery();

  // URL 파라미터 변경 시 토글 상태 동기화
  useEffect(() => {
    setKeywordToggle(bsIdxNumber);
  }, [bsIdxNumber]);

  return (
    <>
      <TopMenu
        keywordList={keywordList}
        selectedBsIdx={bsIdxNumber}
        selectedBssIdx={bssIdxNumber}
        onBsClick={onBsClick}
        onBssClick={onBssClick}
      />
      <KeywordNav
        keywordList={keywordList}
        onBsClick={onBsClick}
        onBssClick={onBssClick}
        keywordToggle={keywordToggle}
        selectedBssIdx={bssIdxNumber}
      />
    </>
  );
};
export default KeywordLayout;
