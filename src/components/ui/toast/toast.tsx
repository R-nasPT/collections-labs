import { useEffect, useRef, useState } from "react";

interface ToastProps {
  content: React.ReactNode | ((props: { onClose: () => void }) => React.ReactNode);
  duration?: number;
  onClose: () => void;
  onHeightChange: (height: number) => void;
}

export default function Toast({ content, duration, onClose, onHeightChange  }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);
    const toastRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      setTimeout(() => setIsVisible(true), 10);
      
      if (duration !== undefined) {
        const timer = setTimeout(closeToast, duration);
        return () => clearTimeout(timer);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [duration]);
  
    useEffect(() => {
      if (toastRef.current) {
        onHeightChange(toastRef.current.offsetHeight);
      }
    }, [onHeightChange]);
  
    const closeToast = () => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    };
  

  const renderContent = () => {
    if (typeof content === 'function') {
      return content({ onClose: closeToast });
    }
    return content;
  };

  return (
    <div
      className={`
        transform transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        `}
    >
      {renderContent()}
    </div>
  );
}
