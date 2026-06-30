import { useEffect, useRef } from 'react';

export const useAutoFocus = <T extends HTMLInputElement | HTMLTextAreaElement>(trigger?: any) => {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    if (trigger === true) return;

    const el = elementRef.current;
    if (el) {
      el.focus();

      if (el.value) {
        const length = el.value.length;
        el.setSelectionRange(length, length);
      }
    }
  }, [trigger]);

  return elementRef;
};
