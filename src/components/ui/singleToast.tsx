import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, duration = 3000, onClose }: ToastProps) {
  const [isMount, setIsMount] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsMount(true);
    const showTimer = setTimeout(() => setIsVisible(true), 10);
    
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIsMount(false);
        onClose();
      }, 500);
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  if (!isMount) return null;

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center z-[9999]">
      <div
        className={`
          bg-gray-800 text-white px-4 py-2 rounded-md mt-4
          transform transition-all duration-500 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        `}
      >
        {message}
      </div>
    </div>
  );
}
// ---------------------

const [showToast, setShowToast] = useState(false);
<button onClick={()=> setShowToast(true)}>show</button>
{showToast && (
        <Toast 
          message="นี่คือข้อความ Toast!" 
          onClose={()=> setShowToast(false)}
        />
      )}
