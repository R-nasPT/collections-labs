import { useEffect, useState } from "react";
import Toast from "./toast";

interface ToastData {
  id: number;
  content: React.ReactNode | ((props: { onClose: () => void }) => React.ReactNode);
  duration?: number; // ระยะเวลาในมิลลิวินาที, undefined หมายถึงแสดงตลอด
  isClosing?: boolean;
  animationDuration?: number;
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (options: Omit<ToastData, 'id'>) => {
    const id = Date.now();
    setToasts((prevToasts) => [{ id, ...options }, ...prevToasts]);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => 
      prevToasts.map((toast) => 
        toast.id === id ? { ...toast, isClosing: true } : toast
      )
    );
    
    // ลบ toast หลังจาก animation เสร็จสิ้น
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 500);
  };

  useEffect(() => {
    const container = document.getElementById("toast-container");
    const handleAddToast = (event: CustomEvent<{ options: Omit<ToastData, 'id'> }>) => {
      addToast(event.detail.options);
    };
    container?.addEventListener("addToast", handleAddToast as EventListener);
    return () => container?.removeEventListener("addToast", handleAddToast as EventListener);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 flex flex-col items-center z-[9999] pt-4">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          content={toast.content}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
          animationDuration={toast.animationDuration}
        />
      ))}
    </div>
  );
}
