import { useState, useEffect, useRef, RefObject } from "react";

interface UseOutsideClickResult {
  ref: RefObject<HTMLDivElement>;
  isOpen: boolean;
  toggleOpen: () => void;
  open: () => void;
  onClose: () => void;
}

const useOutsideClick = (
  initialIsOpen: boolean = false
): UseOutsideClickResult => {
  const [isOpen, setIsOpen] = useState<boolean>(initialIsOpen);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const open = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return { ref, isOpen, toggleOpen, open, onClose };
};

export default useOutsideClick;
