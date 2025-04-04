import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/cn";
import { FieldErrors, Controller, Control } from "react-hook-form";
import { MdKeyboardArrowDown } from "@/libs/icons";

interface FormValues {
  [key: string]: any;
}

interface SelectFieldProps {
  name: string;
  placeholder: string;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  options: { value: string; label: string }[];
  className?: string;
}

export default function SelectField({ name, placeholder, control, errors, options, className }: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <div className={cn("relative", className)} ref={dropdownRef}>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`peer py-3 pl-5 pr-10 rounded-2xl w-full text-base border cursor-pointer ${
              errors?.[name]
                ? "border-[#ff3506] focus:outline-[#ff3506]"
                : "border-[#24075c] hover:border-[#531ae3] focus:outline-[#531ae3] text-[#280d5f]"
            }`}
          >
            {selectedOption || placeholder}
          </div>

          <label
            className={`absolute top-[23%] left-5 px-1 rounded-full text-[#433958] transition-all duration-300 peer-focus:-top-2 peer-focus:text-[#531ae3] peer-focus:text-xs pointer-events-none ${
              selectedOption ? "-top-[8px] text-xs" : ""
            } ${errors?.[name] ? "text-[#ff3000]" : "text-gray-800 bg-white"}`}
          >
            {placeholder}
          </label>

          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <MdKeyboardArrowDown
              className={`w-6 h-6 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          <div
            className={`absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen
                ? "max-h-60 opacity-100"
                : "max-h-0 opacity-0 pointer-events-none"
            }`}
          >
            <div className="py-1">
              {options.map((option) => (
                <div
                  key={option.value}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                  onClick={() => {
                    setSelectedOption(option.label);
                    field.onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>

          <p className="text-[#ff3506] text-xs h-1 pl-2 mt-1">
            {errors?.[name] &&
              `${placeholder.toLowerCase()} is a required field`}
          </p>
        </div>
      )}
    />
  );
}
