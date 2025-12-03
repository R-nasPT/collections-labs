import { useState } from "react";

type NotificationType = "info" | "success" | "warning" | "error";

interface Notification {
  type?: NotificationType;
  title?: string;
  message: React.ReactNode;
  isOpen: boolean;
}

interface ShowNotificationParams {
  type?: NotificationType;
  title?: string;
  message: React.ReactNode;
  duration?: number;
}

const useNotification = () => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (
    typeOrParams: NotificationType | ShowNotificationParams,
    message?: React.ReactNode,
    duration?: number
  ) => {
    let config: ShowNotificationParams;

    if (typeof typeOrParams === 'object' && 'message' in typeOrParams) {
      config = typeOrParams;
    } else {
      config = {
        type: typeOrParams as NotificationType,
        message: message!,
        duration,
      };
    }

    const { type = 'info', title, message: msg, duration: dur } = config;
    
    setNotification({ message: msg, type, title, isOpen: true });

    // Optional: Auto-close notification after specified duration
    if (dur !== undefined && dur > 0) {
      setTimeout(() => {
        setNotification((prev) => (prev ? { ...prev, isOpen: false } : null));
      }, dur);
    }
  };

  const hideNotification = () => {
    setNotification((prev) => (prev ? { ...prev, isOpen: false } : null));
  };

  return {
    notification,
    showNotification,
    hideNotification,
  };
};

export default useNotification;
