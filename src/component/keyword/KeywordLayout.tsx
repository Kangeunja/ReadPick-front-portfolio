import { useEffect, useState } from 'react';

import TopMenu from './TopMenu';
import KeywordNav from './KeywordNav';
import { useKeywordQuery } from '../../hooks/queries/useKeywordQueries';

interface KeywordLayoutProps {
  selectedBsIdx: number | null;
  selectedBssIdx: number | null;
  onBsClick: (bsIdx: number) => void;
  onBssClick: (bssIdx: number) => void;
}

const KeywordLayout = ({ selectedBsIdx, selectedBssIdx, onBsClick, onBssClick }: KeywordLayoutProps) => {
  const [keywordToggle, setKeywordToggle] = useState<number | null>(null); // 현재 펼쳐진 중분류 ID

  // 키워드 가져오기
  const { data: keywordList = [] } = useKeywordQuery();

  // URL 파라미터 변경 시 토글 상태 동기화
  useEffect(() => {
    setKeywordToggle(selectedBsIdx);
  }, [selectedBsIdx]);

  return (
    <>
      <TopMenu
        keywordList={keywordList}
        selectedBsIdx={selectedBsIdx}
        selectedBssIdx={selectedBssIdx}
        onBsClick={onBsClick}
        onBssClick={onBssClick}
      />
      <KeywordNav
        keywordList={keywordList}
        onBsClick={onBsClick}
        onBssClick={onBssClick}
        keywordToggle={keywordToggle}
        selectedBssIdx={selectedBssIdx}
      />
    </>
  );
};
export default KeywordLayout;
