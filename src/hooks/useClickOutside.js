import { useEffect } from 'react';

export const useClickOutside = (ref, func) => {
  useEffect(() => {
    const listener = e => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      // This seems like a hack. Ask somewhere about two listeners on the same event. be specific about the case.
      setTimeout(() => {
        func();
      }, 200);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref]);
};
