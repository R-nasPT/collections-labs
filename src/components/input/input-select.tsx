"use client";

import { useOutsideClick } from "@/hooks";
import { cn } from "@/utils";
import { useState } from "react";
import { MdKeyboardArrowDown } from "@/libs/icons";

interface Option {
  value: string;
  label: string;
}

interface InputSelectProps {
  options: Option[];
  className?: string;
  wrapperClassName?: string;
}

export default function InputSelect({
  options,
  className,
  wrapperClassName,
}: InputSelectProps) {
  const { ref, isOpen, toggleOpen, onClose } = useOutsideClick(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onClose();
  };

  return (
    <div className={cn("relative w-64", wrapperClassName)} ref={ref}>
      <button
        className={cn(
          "w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500",
          className
        )}
        onClick={toggleOpen}
      >
        <span>{selectedOption ? selectedOption.label : "เลือกตัวเลือก"}</span>
        <MdKeyboardArrowDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={cn(
          "absolute z-10 w-full mt-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] rounded-md transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        )}
      >
        <ul>
          {options.map((option) => (
            <li
              key={option.value}
              className={cn(
                "px-4 py-2 cursor-pointer transition-colors duration-200",
                selectedOption?.value === option.value
                  ? "bg-[#f0e9fc] hover:bg-[#e4dafb]"
                  : "hover:bg-gray-100"
              )}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
