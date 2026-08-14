import { DependencyList, useEffect, useRef, useState } from 'react';

export const useHorizontalScroll = (deps: DependencyList = []) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const updateArrowVisibility = () => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    const isScrollable = container.scrollWidth > container.clientWidth + 1;
    const atLeft = container.scrollLeft <= 1;
    const atRight = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

    setShowLeftArrow(isScrollable && !atLeft);
    setShowRightArrow(isScrollable && !atRight);
  };

  useEffect(() => {
    updateArrowVisibility();

    const container = scrollRef.current;
    if (!container) return undefined;

    container.addEventListener('scroll', updateArrowVisibility, { passive: true });
    window.addEventListener('resize', updateArrowVisibility);

    return () => {
      container.removeEventListener('scroll', updateArrowVisibility);
      window.removeEventListener('resize', updateArrowVisibility);
    };
  }, deps);

  const handleScrollButtonClick = (direction: -1 | 1) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({ left: direction * 200, behavior: 'smooth' });
  };

  return { scrollRef, showLeftArrow, showRightArrow, handleScrollButtonClick };
};
