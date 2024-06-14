import { ReactNode, useState } from "react";

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="flex justify-between w-full"
        onClick={() => setOpen(!open)}
      >
        <div>{title}</div>
        <svg
          className="fill-indigo-500 shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              open && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              open && "!rotate-180"
            }`}
          />
        </svg>
      </button>

      {/* height สร้างแค่ส่วนด้านล่างนี้อย่างเดียวก็ได้ ส่วนด้านบนก็เอาออกไปไว้ข้างนอกก็ได้*/}
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
