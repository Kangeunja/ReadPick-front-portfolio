import { useState } from 'react';

import TopMenu from './TopMenu';
import KeywordNav from './KeywordNav';

import { useKeywordQuery } from 'hooks/queries/useKeywordQueries';

type KeywordLayoutProps = {
  selectedBsIdx: number | null;
  selectedBssIdx: number | null;
  onBsClick: (bsIdx: number) => void;
  onBssClick: (bssIdx: number) => void;
};

const KeywordLayout = ({ selectedBsIdx, selectedBssIdx, onBsClick, onBssClick }: KeywordLayoutProps) => {
  // 현재 펼쳐진 대분류 ID
  const [keywordToggle, setKeywordToggle] = useState<number | null>(selectedBsIdx);
  const [prevSelectedBsIdx, setPrevSelectedBsIdx] = useState<number | null>(selectedBsIdx);

  const { data: keywordList = [] } = useKeywordQuery();

  if (selectedBsIdx !== prevSelectedBsIdx) {
    setKeywordToggle(selectedBsIdx);
    setPrevSelectedBsIdx(selectedBsIdx);
  }

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
        keywordToggle={keywordToggle}
        keywordList={keywordList}
        selectedBssIdx={selectedBssIdx}
        onBsClick={onBsClick}
        onBssClick={onBssClick}
        onToggleClick={(bsIdx: number) => setKeywordToggle((prev) => (prev === bsIdx ? null : bsIdx))}
      />
    </>
  );
};
export default KeywordLayout;
