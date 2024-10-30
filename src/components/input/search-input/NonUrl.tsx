"use client";

import { useNoScroll } from "@/hooks";
import { cn } from "@/utils";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { InputHTMLAttributes, useEffect, useState } from "react";

interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  containerClassName?: string;
  className?: string;
  clearButtonClassName?: string;
  // type?: React.HTMLInputTypeAttribute;
  type?: "text" | "search" | "tel" | "url" | "email" | "number";
  showSearchIcon?: boolean;
  iconPosition?: "left" | "right";
  triggerOnEnter?: boolean;
}

export default function SearchInput({
  value: externalValue,
  onChange,
  onClear,
  containerClassName = "",
  className = "",
  clearButtonClassName = "",
  type = "text",
  showSearchIcon,
  iconPosition = "left",
  triggerOnEnter = false,
  ...inputProps
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(externalValue || "");
  const handleNoScroll = useNoScroll();

  useEffect(() => {
    if (externalValue !== undefined) {
      setInputValue(externalValue);
    }
  }, [externalValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (!triggerOnEnter) {
      onChange?.(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (triggerOnEnter && e.key === "Enter") {
      onChange?.(inputValue);
    }
  };

  const handleClear = () => {
    setInputValue("");
    onClear?.();
    onChange?.("");
  };
  return (
    <div className={cn("relative", containerClassName)}>
      {showSearchIcon && (
        <FaSearch
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            "text-gray-400 w-4 h-4",
            iconPosition === "left" ? "left-3" : "right-3"
          )}
        />
      )}
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onWheel={type === "number" ? handleNoScroll : undefined}
        className={cn(
          "w-full px-4 py-2 rounded-lg border border-[#7b6a9d] focus:outline-none placeholder:italic rm-arrow-spin",
          "focus:outline-none focus:ring-2 focus:ring-[#531ae3] focus:border-transparent",
          showSearchIcon && iconPosition === "left" ? "pl-10" : "pr-10",
          inputValue &&
            (showSearchIcon && iconPosition === "right" ? "pr-16" : "pr-10"),
          className
        )}
        {...inputProps}
      />
      {iconPosition === "right" && (
        <span className="absolute right-9 top-1/2 -translate-y-1/2 h-5 border-l-[1.5px] border-gray-300"></span>
      )}
      {inputValue && (
        <button
          onClick={handleClear}
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            "p-1 rounded-full transition-colors",
            iconPosition === "right" ? "right-9" : "right-2",
            clearButtonClassName
          )}
          aria-label="ล้างการค้นหา"
        >
          <RxCross2 className="w-5 h-5 text-gray-500 hover:text-gray-400" />
        </button>
      )}
    </div>
  );
}
