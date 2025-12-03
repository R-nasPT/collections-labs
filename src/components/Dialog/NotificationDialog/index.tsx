import { ERROR_SOUND_BASE64 } from "@/assets/audio/base64sound";
import { Dialog } from "@/components/ui";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef } from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from "@/lib/icons";

type NotificationType = "info" | "success" | "warning" | "error";

interface NotificationDialogProps {
  message: React.ReactNode;
  type?: NotificationType;
  title?: string;
  open: boolean;
  onClose: () => void;
}

export default function NotificationDialog({
  open,
  type = 'info',
  title,
  onClose,
  message,
}: NotificationDialogProps) {
  const t = useTranslations("BUTTON");
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const playNotificationSound = () => {
    if (!open) return;

    const soundMap: Record<NotificationType, string> = {
      success: "",
      warning: "",
      error: ERROR_SOUND_BASE64,
      info: "",
    };

    const soundSource = soundMap[type as keyof typeof soundMap];

    if (soundSource) {
      try {
        const sound = new Audio(soundSource);
        sound.play().catch((err) => {
          console.error('Failed to play notification sound:', err);
        });
      } catch (error) {
        console.error('Error creating audio:', error);
      }
    }
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter' && open) {
      event.stopPropagation();
      event.preventDefault();
      onClose();
      
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      playNotificationSound();
      buttonRef.current?.focus();

      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleKeyDown, open, type]);

  const getIconConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: FiCheckCircle,
          color: "text-green-500",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          buttonColor: "bg-green-500 hover:bg-green-600 text-white",
        };
      case "warning":
        return {
          icon: FiAlertCircle,
          color: "text-yellow-500",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          buttonColor: "bg-yellow-500 hover:bg-yellow-600 text-white",
        };
      case "error":
        return {
          icon: FiXCircle,
          color: "text-red-500",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          buttonColor: "bg-red-500 hover:bg-red-600 text-white",
        };
      default:
        return {
          icon: FiInfo,
          color: "text-blue-500",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          buttonColor: "bg-blue-500 hover:bg-blue-600 text-white",
        };
    }
  };

  const {
    icon: IconComponent,
    color,
    bgColor,
    borderColor,
    buttonColor,
  } = getIconConfig();

  const getDefaultTitle = () => {
    switch (type) {
      case 'success':
        return 'Success';
      case 'warning':
        return 'Warning';
      case 'error':
        return 'Error';
      default:
        return 'Information';
    }
  };

  const displayTitle = title || getDefaultTitle();

  return (
    <Dialog open={open} onClose={onClose} desktop="sm">
      <div
        ref={containerRef}
        className={cn(
          "p-6 w-full text-center rounded-3xl border focus:outline-none",
          bgColor,
          borderColor
        )}
      >
        <div className="flex justify-center items-center mb-4">
          <div className={cn("rounded-full mb-2", bgColor, color)}>
            <IconComponent className="w-16 h-16" />
          </div>
        </div>

        <h2 className={cn("text-2xl font-bold mb-4", color)}>{displayTitle}</h2>

        <p className="mb-6 text-gray-700 text-base leading-relaxed">
          {message}
        </p>

        <div className="flex justify-center">
          <button
            ref={buttonRef}
            onClick={onClose}
            className={cn(
              "px-8 py-3 rounded-lg",
              "transition-smooth ease-in-out hover:scale-105 shadow-md",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              buttonColor,
              color.replace("text-", "focus:ring-")
            )}
          >
            {t("CLOSE")}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
