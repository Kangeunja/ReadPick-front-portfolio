import { useRef, useState } from 'react';

export const useCarousel = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const listRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    // 좌/우 버튼 클릭시 3칸씩 스크롤
    if (!listRef.current) return;
    const moveAmount = 180 * 3;

    listRef.current.scrollBy({
      left: direction === 'right' ? moveAmount : -moveAmount,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    // 스크롤 위치에 따른 화살표 표시 여부 갱신
    if (!listRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  return { listRef, canScrollLeft, canScrollRight, scroll, handleScroll };
};
