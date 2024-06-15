"use client";
import { ReactNode, useState } from "react";

interface CollapseProps {
    title: ReactNode;
    children: ReactNode;
  }

export default function Collapse({ title, children }: CollapseProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`w-[280px] p-5 bg-[#e9e9e9] border border-[#c9c6c655] rounded-md mb-5 duration-500 group ${
        // open ? "is-active bg-white" : ""        //<--- is-active คือการตั่งชื่อ class เพื่อเอาไปใช้เวลา group
        open ? "bg-white" : ""
      }`}
    >
      <div className="flex items-center cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
        {/* <div className="w-full group-[.is-active]:font-bold">  */}
        <div className={`w-full ${open ? 'font-bold': ''}`}>
          {title}
        </div>
        <span 
        //className="shrink-0 transition duration-500 group-[.is-active]:-rotate-180"   //<-- หรือจะใช้ แบบนี้ก็ได้ถ้าใช้การตั่งชื่อ class แล้วเอามา group
          className={`shrink-0 transition duration-500 ${open ? '-rotate-180': ''}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </div>

      {/* Collapse */}
      {/* <div className="overflow-hidden duration-500 max-h-0 group-[.is-active]:max-h-[100px]"> */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-[500px]': 'max-h-0'}`}>
        <div className="p-4">
            {children}
        </div>
      </div>
    </div>
  );
}
