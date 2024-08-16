import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

interface ToastProps {
  content: React.ReactNode | ((props: { onClose: () => void }) => React.ReactNode);
  duration?: number;
  onClose: () => void;
  animationDuration?: number;
}

export default function Toast({ content, duration, onClose, animationDuration = 500 }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);
    
    const closeToast = () => {
      setIsVisible(false);
      setTimeout(onClose, animationDuration); // รอให้ animation เสร็จสิ้นก่อนเรียก onClose
    };
    
    useEffect(() => {
        setTimeout(() => setIsVisible(true), 10);
        
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
      return content({ onClose: closeToast });
    }
    return content;
  };

  return (
    <div
      className={cn(
        `transform transition-all ease-out`,
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      )}
      style={{ transitionDuration: `${animationDuration}ms` }} //<-- ไม่สามารถกำหนด ใน tailwind ได้
    >
      {renderContent()}
    </div>
  );
}
