import { ReactNode, useState } from "react";
import { ArrowIcon, PlusIcon, WertyIcon } from "./AccordionIcons";

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
  text?: string;
  arrow?: boolean;
  plus?: boolean;
  werty?: boolean;
}

export default function Accordion({
  title,
  children,
  className = "",
  ...props
}: AccordionProps) {
  const [open, setOpen] = useState(false);
  const { text, arrow, plus, werty } = props;

  return (
    <div>
      <button
        className={`flex justify-between items-center w-full ${className}`}
        onClick={() => setOpen(!open)}
      >
        <div>{title}</div>
        {text && <p>{text}</p>}
        {arrow && <ArrowIcon open={open} />}
        {plus && <PlusIcon open={open} />}
        {werty && <WertyIcon open={open} />}
      </button>
      
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
