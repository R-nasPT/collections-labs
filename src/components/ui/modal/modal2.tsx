"use client";

import { useRouter } from "@/navigation";
import { cn } from "@/utils";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "@/libs/icons";

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setOpen(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const modalContent = (
    <div
      className={cn(
        "fixed z-[100] inset-0 flex justify-center items-center transition-colors w-screen bg-black/30 backdrop-blur-[2px]"
      )}
      onClick={handleClose}
    >
      <section
        className={cn(
          "relative flex justify-center items-center transition-all",
          open ? "scale-90 lg:scale-150 opacity-100" : "scale-[2] opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <RxCross2
          className="absolute block top-2 right-3 cursor-pointer hover:text-gray-500 z-10"
          onClick={handleClose}
        />
        {children}
      </section>
    </div>
  );

  if (!mounted) {
    return null;
  }

  return createPortal(modalContent, document.body);
}
