"use client";

import { useState, useEffect } from "react";
import { cn } from "@/utils";
import { useNoScroll } from "@/hooks";

interface InputFieldProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  wrapperStyles?: string;
  className?: string;
  labelClassName?: string;
}

export default function InputField({
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  wrapperStyles,
  className,
  labelClassName,
}: InputFieldProps) {
  const [isFilled, setIsFilled] = useState(false);
  const handleNoScroll = useNoScroll();

  useEffect(() => {
    setIsFilled(!!value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn("relative", wrapperStyles)}>
      <input
        id={name}
        className={cn(
          "peer py-3 pl-5 rounded-2xl w-full text-base border rm-arrow-spin",
          error
            ? "border-[#ff3506] focus:outline-[#ff3506]"
            : "border-[#24075c] hover:border-[#531ae3] focus:outline-[#531ae3] text-[#280d5f]",
          className
        )}
        type={type}
        value={value}
        onWheel={type === "number" ? handleNoScroll : undefined}
        onChange={handleChange}
      />

      <label
        htmlFor={name}
        className={cn(
          "absolute top-[18%] left-5 px-1 bg-white rounded-full transition-all duration-300 italic",
          "peer-focus:-top-2 peer-focus:text-xs",
          labelClassName,
          isFilled && "-top-2 text-xs",
          "pointer-events-none peer-focus:font-medium",
          error ? "text-[#fa8383] peer-focus:text-[#ff0606]" : "text-gray-400 peer-focus:text-[#531ae3]"
        )}
      >
        {placeholder}
      </label>
      {error && <p className="text-[#ff3506] text-xs pl-3">{error}</p>}
    </div>
  );
}