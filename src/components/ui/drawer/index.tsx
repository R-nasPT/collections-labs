import { cn } from "@/utils/cn";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  desktop?: 'sm' | 'md' | 'lg' | 'full';
  mobile?: 'sm' | 'md' | 'lg' | 'full';
}

export default function Drawer({ isOpen, onClose, children, desktop, mobile }: DrawerProps) {
  const getDesktopDialogSize = () => {
    switch (desktop) {
      case "sm": return "w-[60%]";
      case "md": return "w-[70%]";
      case "lg": return "w-[80%]";
      case "full": return "w-full";
      default: return "w-[50%]";
    }
  };

  const getMobileDialogSize = () => {
    switch (mobile) {
      case "sm": return "h-[70%]";
      case "md": return "h-[80%]";
      case "lg": return "h-[90%]";
      case "full": return "h-full";
      default: return "h-[60%]";
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[90]"
          onClick={onClose}
        ></div>
      )}

      {/* ----- Desktop ----- */}
      <aside
        className={cn(
          "fixed z-[100] transition-all duration-300 ease-in-out hidden lg:block",
          "h-full bottom-0 right-0 top-0 bg-white shadow-xl",
          isOpen ? "translate-x-0" : "translate-x-full",
          getDesktopDialogSize(),
        )}
      >
        <div className="h-full overflow-auto">{children}</div>
      </aside>

      {/* ----- Mobile ----- */}
      <aside
        className={cn(
          "fixed z-[100] transition-all duration-300 ease-in-out lg:hidden",
          "w-full bottom-0 left-0 bg-white shadow-xl",
          getMobileDialogSize(),
          mobile !== "full" && "rounded-t-2xl",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <section className="h-full flex flex-col">
          <div
            className="flex justify-center p-2 bg-gray-50 rounded-t-2xl"
            onClick={onClose}
          >
            <div className="py-1 w-14 bg-slate-400 rounded-full"></div>
          </div>
          <div className="flex-1 overflow-auto hide-scrollbar">{children}</div>
        </section>
      </aside>
    </>
  );
}
