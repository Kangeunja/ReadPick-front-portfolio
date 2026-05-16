import { useEffect } from "react";

const useLockBodyScroll = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden"; // 팝업이 열릴 때 body의 스크롤 막기
    return () => {
      document.body.style.overflow = "auto"; // 팝업이 닫힐 때 스크롤 복구
    };
  }, []);
};

export default useLockBodyScroll;
