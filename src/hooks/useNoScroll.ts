import { useCallback } from "react";

const useNoScroll = () => {
  const handleNoScroll = useCallback(
    (e: React.WheelEvent<HTMLInputElement>) => {
      const target = e.target as HTMLElement;
      target.blur();

      setTimeout(() => {
        target.focus();
      }, 0);
    }, []);

  return handleNoScroll;
};

export default useNoScroll;
