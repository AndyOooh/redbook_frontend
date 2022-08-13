import { useCallback } from 'react';

export const useHoverHandler = () => {
  const hoverHandler = useCallback((setShow, show = true, delay = 500) => {
    setTimeout(() => {
      setShow(show);
    }, delay);
  }, []);
  return hoverHandler;
};
