"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/utils";
import { IconType } from "react-icons/lib";

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
  Icon?: IconType;
  iconClassName?: string;
  iconActiveClassName?: string;
  iconInactiveClassName?: string;
  text?: string;
}

export default function Accordion({
  title,
  children,
  className,
  Icon,
  iconClassName,
  iconActiveClassName = "rotate-180",
  iconInactiveClassName,
  text,
}: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className={cn("flex justify-between w-full", className)}
        onClick={() => setOpen(!open)}
        type="button"
      >
        <>{title}</>
        {text && <p>{text}</p>}
        {Icon && (
          <Icon
            className={cn(
              "w-6 h-6 transition-all",
              iconClassName,
              open ? iconActiveClassName : iconInactiveClassName
            )}
          />
        )}
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
