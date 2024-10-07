"use client";

import { useOutsideClick } from "@/hooks";
import { cn } from "@/utils";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "@/libs/icons";
import { MdSearch } from "react-icons/md";

interface Option {
  value: string;
  label: string;
}

type TextSize = "xs" | "sm" | "base" | "lg" | "xl";

interface ResponsiveTextSize {
  mobile: TextSize;
  desktop: TextSize;
}

interface InputSelectProps {
  options: Option[];
  onChange: (option: Option) => void;
  className?: string;
  wrapperClassName?: string;
  placeholder?: string;
  defaultValue?: string;
  textSize?: TextSize | ResponsiveTextSize;
}

export default function InputSelect({
  options,
  onChange,
  className,
  wrapperClassName,
  placeholder = "Select an option",
  defaultValue = "",
  textSize = { mobile: "base", desktop: "base" },
}: InputSelectProps) {
  const { ref, isOpen, toggleOpen, onClose } = useOutsideClick(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const selectedOption =
    options.find((option) => option.value === defaultValue) || null;

  const handleOptionClick = (option: Option) => {
    onChange(option);
    onClose();
    setSearchTerm("");
  };

  const getTextSizeClass = (mobileSize: TextSize, desktopSize: TextSize) => {
    const mobileClasses = {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    };
    const desktopClasses = {
      xs: "md:text-xs",
      sm: "md:text-sm",
      base: "md:text-base",
      lg: "md:text-lg",
      xl: "md:text-xl",
    };
    return `${mobileClasses[mobileSize]} ${desktopClasses[desktopSize]}`;
  };

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  const textSizeClass = typeof textSize === "string"
      ? getTextSizeClass(textSize, textSize)
      : getTextSizeClass(textSize.mobile, textSize.desktop);

  return (
    <div className={cn("relative w-64", wrapperClassName)} ref={ref}>
      <button
        className={cn(
          "w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500",
          textSizeClass,
          className
        )}
        onClick={toggleOpen}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <MdKeyboardArrowDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={cn(
          "absolute z-10 w-full mt-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] rounded-md transition-all duration-300 ease-in-out overflow-hidden",
          textSizeClass,
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"
        )}
      >
        <div className="p-2 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <MdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <ul className="max-h-60 overflow-y-auto">
          {filteredOptions.map((option) => (
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
