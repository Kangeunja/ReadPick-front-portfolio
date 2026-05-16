import { RefObject, useEffect } from "react";

interface UseOutsideClickProps<T extends HTMLElement> {
  ref: RefObject<T | null>;
  handler: () => void;
}

const useOutsideClick = <T extends HTMLElement>({
  ref,
  handler,
}: UseOutsideClickProps<T>) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
};

export default useOutsideClick;
