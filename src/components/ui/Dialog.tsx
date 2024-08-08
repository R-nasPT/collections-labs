interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  desktop?: "sm" | "md" | "lg";
  mobile?: "sm" | "md" | "lg";
}

export default function Dialog({
  open,
  onClose,
  children,
  desktop,
  mobile,
}: DialogProps) {
  const getDesktopDialogSize = () => {
    switch (desktop) {
      case "sm":
        return "max-w-[30%]";
      case "md":
        return "max-w-[40%]";
      case "lg":
        return "max-w-[60%]";
      default:
        return "max-w-[50%]";
    }
  };

  const getMobileDialogSize = () => {
    switch (mobile) {
      case "sm":
        return "h-[60%]";
      case "md":
        return "h-[70%]";
      case "lg":
        return "h-[80%]";
      default:
        return "h-[50%]";
    }
  };

  return (
    <>
      <div
        className={`fixed z-[100] inset-0 flex justify-center items-center transition-colors ${
          open ? "visible bg-black/20 backdrop-blur-[2px]" : "invisible"
        }`}
        onClick={onClose}
      >
        {/* Desktop */}
        <section
          className={`hidden lg:flex justify-center items-center transition-all rounded-3xl overflow-hidden ${
            open ? "scale-125 opacity-100" : "scale-100 opacity-0"
          } ${getDesktopDialogSize()}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </section>

        {/* Mobile */}
        <section
          className={`fixed bottom-0 left-0 right-0 h-1/2 rounded-t-2xl overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          } ${getMobileDialogSize()}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </section>
      </div>
    </>
  );
}
