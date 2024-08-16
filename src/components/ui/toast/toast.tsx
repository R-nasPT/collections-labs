import { useEffect, useState } from "react";

interface ToastProps {
  content: React.ReactNode | ((props: { onClose: () => void }) => React.ReactNode);
  duration?: number;
  onClose: () => void;
}

export default function Toast({ content, duration, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    
    const closeToast = () => {
      setIsClosing(true);
      setIsVisible(false);
      setTimeout(onClose, 500); // รอให้ animation เสร็จสิ้นก่อนเรียก onClose
    };
    
    useEffect(() => {
      setIsVisible(true);
      if (duration !== undefined) {
        const timer = setTimeout(() => {
          closeToast();
        }, duration);
        return () => clearTimeout(timer);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [duration]);
  

  const renderContent = () => {
    if (typeof content === 'function') {
      return content({ onClose });
    }
    return content;
  };

  return (
    <div
      className={`
        transform transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        ${isClosing ? 'pointer-events-none' : ''}
      `}
    >
      {renderContent()}
    </div>
  );
}
