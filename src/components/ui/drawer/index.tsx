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
  const [isScrolling, setIsScrolling] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

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
    // ถ้าการแตะเริ่มที่ handle ให้เริ่มการลากทันที
    if (
      handleRef.current &&
      (handleRef.current === e.target || handleRef.current.contains(e.target as Node))
    ) {
      setIsDragging(true);
      setStartY(e.touches[0].clientY);
      setCurrentY(e.touches[0].clientY);
      return;
    }

    // สำหรับการแตะที่คอนเทนท์
    const content = contentRef.current;
    if (!content) return;

    // If we're not at the top of the content, this is a scroll
    if (content.scrollTop > 0) {
      setIsScrolling(true);
      return;
    }

    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isScrolling) return;
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
    if (isScrolling) {
      setIsScrolling(false);
      return;
    }
    
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
          {showHandle && (
            <div ref={handleRef}>
              <div
                className={cn(
                  "mx-auto mt-4 mb-2 h-2 w-[100px] rounded-full",
                  "bg-[#f4f4f5]"
                )}
                role="presentation"
                aria-hidden="true"
              />
            </div>
          )}
          <div className="flex-1 overflow-auto hide-scrollbar">{children}</div>
        </section>
      </aside>
    </>
  );
}
