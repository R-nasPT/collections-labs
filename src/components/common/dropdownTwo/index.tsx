"use client";

import { useEffect, useRef, useState } from "react";
import list from "./list.json";
import useDropdownOutsideClick from "@/hooks/useDropdownOutsideClick";

export default function DropdownTwo() {
  const [isOpen, setIsOpen] = useState(false);

  // solution
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  //   window.addEventListener("click", (e) => {
  //     // console.log(e.target === menuRef.current);                         <---แบบนี้ก็ได้แต่ไม่ควร
  //     if (e.target !== menuRef.current && e.target !== buttonRef.current) {
  //       setIsOpen(false);
  //     }
  //   });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // const { buttonRef, menuRef } = useDropdownOutsideClick(isOpen, setIsOpen);

  return (
    <div className="relative flex flex-col items-center w-[340px] h-[340px] rounded-lg">
      <button
        ref={buttonRef}
        className="bg-blue-400 p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Dropdown
        <div>{isOpen ? ">" : "^"}</div>
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="bg-blue-400 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full"
        >
          {list.map((item: any, i: number) => (
            <div
              key={i}
              onClick={() => setIsOpen(false)}
              className="flex w-full justify-between p-4 hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4"
            >
              <h3 className="font-bold">{item.city}</h3>
              <h3 className="font-bold">{item.reaction}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
