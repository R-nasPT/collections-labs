"use client";

import { cn } from "@/utils";
import { useRef, useState } from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  desktop?: "sm" | "md" | "lg" | "full";
  mobile?: "sm" | "md" | "lg" | "full";
}

export default function Drawer({ isOpen, onClose, children, desktop, mobile }: DrawerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const drawerRef = useRef<HTMLDivElement>(null);

  const getDesktopDrawerSize = () => {
    switch (desktop) {
      case "sm": return "w-[60%]";
      case "md": return "w-[70%]";
      case "lg": return "w-[80%]";
      case "full": return "w-full";
      default: return "w-[50%]";
    }
  };

  const getMobileDrawerSize = () => {
    switch (mobile) {
      case "sm": return "h-[70%]";
      case "md": return "h-[80%]";
      case "lg": return "h-[90%]";
      case "full": return "h-full";
      default: return "h-[60%]";
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touchY = e.touches[0].clientY;
    const deltaY = touchY - startY;
    
    // Only allow downward swipe
    if (deltaY < 0) {
      setCurrentY(startY);
      return;
    }
    
    setCurrentY(touchY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const deltaY = currentY - startY;
    const drawerHeight = drawerRef.current?.offsetHeight || 0;

    if (deltaY > drawerHeight * 0.5) { //<--- เลื่อนถึงครึ่งนึงถึงจะปิด สามารถปรับ 0.5 เป็นอย่างอื่นถ้าต้องการให้ปิดเร็วขึ้น เช่น 0.25
      onClose();
    }

    setIsDragging(false);
    setStartY(0);
    setCurrentY(0);
  };

  const getDrawerTransform = () => {
    if (!isDragging) return isOpen ? 'translateY(0)' : 'translateY(100%)';
    
    const deltaY = currentY - startY;
    return `translateY(${Math.max(0, deltaY)}px)`;
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[90]"
          onClick={onClose}
        />
      )}

      {/* ----- Desktop ----- */}
      <aside
        className={cn(
          "fixed z-[100] transition-all duration-300 ease-in-out hidden lg:block",
          "h-full bottom-0 right-0 top-0 bg-white shadow-xl",
          isOpen ? "translate-x-0" : "translate-x-full",
          getDesktopDrawerSize()
        )}
      >
        <div className="h-full overflow-auto">{children}</div>
      </aside>

      {/* ----- Mobile ----- */}
      <aside
        ref={drawerRef}
        style={{
          transform: getDrawerTransform(),
          transition: isDragging ? 'none' : 'transform 300ms ease-in-out'
        }}
        className={cn(
          "fixed z-[100] lg:hidden",
          "w-full bottom-0 left-0 bg-white shadow-xl",
          getMobileDrawerSize(),
          mobile !== "full" && "rounded-t-2xl"
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <section className="h-full flex flex-col">
          <div
            className="flex justify-center p-2 bg-gray-50 rounded-t-2xl cursor-pointer"
            onClick={onClose}
          >
            <div className="py-1 w-14 bg-slate-400 rounded-full" />
          </div>
          <div className="flex-1 overflow-auto hide-scrollbar">{children}</div>
        </section>
      </aside>
    </>
  );
}
