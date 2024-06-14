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
        <div
        //className="text-xl rotate-90 cursor-pointer duration-500 group-[.is-active]:rotate-[270deg]"   //<-- หรือจะใช็ แบบนี้ก็ได้ถ้าใช้การตั่งชื่อ class แล้วเอามา group
          className={`text-xl duration-500 ${open ? 'rotate-90': 'rotate-[270deg]'}`}
        >
          {">"}
        </div>
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
