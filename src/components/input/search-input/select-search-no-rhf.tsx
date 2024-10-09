"use client";

import { useOutsideClick } from "@/hooks";
import { cn } from "@/utils";
import { useEffect, useRef, useState } from "react";
import ClearInputIcon from "@/assets/icons/ClearInputIcon";
import DropdownIcon from "@/assets/icons/DropdownIcon";

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
  onChange: (option: Option | null) => void;
  className?: string;
  wrapperClassName?: string;
  placeholder?: string;
  defaultValue?: string;
  textSize?: TextSize | ResponsiveTextSize;
  isCreatable?: boolean;
}

export default function InputSelect({
  options,
  onChange,
  className,
  wrapperClassName,
  placeholder = "Select an option",
  defaultValue = "",
  textSize = { mobile: "base", desktop: "base" },
  isCreatable = false,
}: InputSelectProps) {
  const { ref, isOpen, open, onClose } = useOutsideClick(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find((option) => option.value === defaultValue) || null
  );
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (searchTerm) {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
    setFocusedIndex(0);
  }, [searchTerm, options]);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setSearchTerm("");
    onChange(option);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (selectedOption && e.target.value !== selectedOption.label) {
      setSelectedOption(null);
      onChange(null);
    }
    open();
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    open();
  };

  const handleClearInput = () => {
    setSearchTerm("");
    setSelectedOption(null);
    onChange(null);
    inputRef.current?.focus();
    open();
  };

  const handleCreateOption = () => {
    if (isCreatable && searchTerm) {
      const newOption: Option = { value: searchTerm, label: searchTerm };
      setSelectedOption(newOption);
      onChange(newOption);
      setSearchTerm("");
      onClose();
    }
  };

  const showCreateOption =
    isCreatable &&
    searchTerm &&
    !filteredOptions.some(
      (option) => option.label.toLowerCase() === searchTerm.toLowerCase()
    );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        open();
        return;
      }
    }

    const optionsLength = filteredOptions.length + (showCreateOption ? 1 : 0);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prevIndex) => (prevIndex + 1) % optionsLength);
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex(
          (prevIndex) => (prevIndex - 1 + optionsLength) % optionsLength
        );
        break;
      case "Enter":
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          handleOptionClick(filteredOptions[focusedIndex]);
        } else if (
          showCreateOption &&
          focusedIndex === filteredOptions.length
        ) {
          handleCreateOption();
        }
        inputRef.current?.blur();
        break;
      case "Escape":
        onClose();
        break;
    }
  };

  useEffect(() => {
    if (isOpen && listRef.current && focusedIndex >= 0) {
      const focusedElement = listRef.current.children[
        focusedIndex
      ] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [focusedIndex, isOpen]);

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

  const textSizeClass =
    typeof textSize === "string"
      ? getTextSizeClass(textSize, textSize)
      : getTextSizeClass(textSize.mobile, textSize.desktop);

  return (
    <div className={cn("relative w-64", wrapperClassName)} ref={ref}>
      <div
        className={cn(
          "relative flex pl-2.5 text-[#280d5f] border rounded-lg shadow-sm hover:border-[#531ae3] min-h-[30px]",
          "transition-colors duration-300",
          isFocused ? "border-[#531ae3]" : "border-[#24075c]"
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <input
          id="input-select"
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex-1 bg-transparent focus:outline-none",
            textSizeClass,
            className
          )}
        />
        <div className="flex items-center">
          {(searchTerm || selectedOption) && (
            <button
              onClick={handleClearInput}
              type="button"
              className={cn(
                "flex items-center p-2",
                "transition-colors duration-200",
                isFocused
                  ? "text-purple-700 hover:text-purple-900"
                  : "text-gray-300 hover:text-gray-400"
              )}
            >
              <ClearInputIcon />
            </button>
          )}
          <span className="h-5 border-l-[1.5px] border-gray-300"></span>
          <button
            type="button"
            className={cn(
              "flex items-center p-2",
              "transition-colors duration-200",
              isFocused
                ? "text-purple-700 hover:text-purple-900"
                : "text-gray-300 hover:text-gray-400"
            )}
          >
            <DropdownIcon />
          </button>
        </div>
        {!searchTerm && selectedOption && (
          <label
            htmlFor="input-select"
            className={cn("absolute top-1/2 -translate-y-1/2 left-2.5 pointer-events-none",
              textSizeClass
            )}
          >
            {selectedOption.label}
          </label>
        )}
        {!searchTerm && !selectedOption && (
          <label
            htmlFor="input-select"
            className={cn("absolute top-1/2 -translate-y-1/2 left-2.5 pointer-events-none text-gray-400",
              textSizeClass
            )}
          >
            {placeholder}
          </label>
        )}
      </div>
      <div
        className={cn(
          "absolute z-10 w-full mt-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] rounded-[5px] transition-all duration-200 ease-in-out overflow-hidden",
          textSizeClass,
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0 pointer-events-none"
        )}
      >
        <ul ref={listRef} className="max-h-60 overflow-y-auto py-1">
          {filteredOptions.map((option, index) => (
            <li
              key={option.value}
              className={cn(
                "px-4 py-1.5 cursor-pointer transition-colors duration-200",
                selectedOption?.value === option.value
                  ? "bg-[#f0e9fc] hover:bg-[#e4dafb]"
                  : "hover:bg-gray-100",
                focusedIndex === index &&
                  (selectedOption?.value === option.value
                    ? "bg-[#e4dafb]"
                    : "bg-gray-100")
              )}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
          {showCreateOption && (
            <li
              className={cn(
                "px-4 py-1.5 cursor-pointer transition-colors duration-200 hover:bg-gray-100 text-purple-600 font-semibold",
                focusedIndex === filteredOptions.length && "bg-gray-100"
              )}
              onClick={handleCreateOption}
            >
              Create &quot;{searchTerm}&ldquo;
            </li>
          )}
          {!isCreatable && filteredOptions.length === 0 && (
            <li
              className={cn(
                "px-4 py-1.5 text-center cursor-default transition-colors duration-200 text-gray-500"
              )}
            >
              No options
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
