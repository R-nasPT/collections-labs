import { cn } from "@/utils";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  desktop?: "sm" | "md" | "lg";
}

export default function Dialog({
  open,
  onClose,
  children,
  desktop,
}: DialogProps) {
  const getDesktopDialogSize = () => {
    switch (desktop) {
      case "sm":
        return "lg:w-[30%]";
      case "md":
        return "lg:w-[40%]";
      case "lg":
        return "lg:w-[60%]";
      default:
        return "lg:w-[50%]";
    }
  };

  return (
      <div
        className={cn('fixed z-[100] inset-0 flex justify-center items-center transition-colors', {
            'visible bg-black/30 backdrop-blur-[2px]': open,
            invisible: !open,
          })}
        onClick={onClose}
      >
        <section
          className={cn('flex justify-center items-center transition-all rounded-3xl overflow-hidden w-[75%] md:w-[50%]', {
            'scale-125 opacity-100': open,
            'scale-100 opacity-0': !open,
          }, getDesktopDialogSize())}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </section>
      </div>
  );
}
