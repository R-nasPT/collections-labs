import ToastContainer from "@/components/ui/toast/ToastContainer";
import { useEffect, useCallback, useRef } from "react";
import { createRoot } from "react-dom/client";

interface ToastOptions {
  duration?: number;
  content: React.ReactNode | ((props: { onClose: () => void }) => React.ReactNode);
}

interface ToastEvent {
  options: ToastOptions;
}

export const useToast = () => {
  const forceUpdateRef = useRef(() => {});

  useEffect(() => {
    if (!document.getElementById("toast-container")) {
      const containerDiv = document.createElement("div");
      containerDiv.id = "toast-container";
      document.body.appendChild(containerDiv);
      
      const root = createRoot(containerDiv);
      root.render(<ToastContainer />);
      
      forceUpdateRef.current = () => root.render(<ToastContainer />);
    }
  }, []);

  const showToast = useCallback((options: ToastOptions) => {
    const container = document.getElementById("toast-container");
    if (container) {
      const event = new CustomEvent<ToastEvent>("addToast", { 
        detail: { options } 
      });
      container.dispatchEvent(event);
      forceUpdateRef.current();
    }
  }, []);

  return { showToast };
};
