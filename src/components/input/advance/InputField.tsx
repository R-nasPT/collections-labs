"use client";

import { InputHTMLAttributes } from "react";
import { cn } from "@/utils";
import { useNoScroll } from "@/hooks";

interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
  type?: "text" | "search" | "tel" | "url" | "email" | "number";
  error?: string;
  containerClassName?: string;
}

export default function InputField({
  ref,
  error,
  containerClassName,
  className,
  ...restProps
}: InputFieldProps) {
  const handleNoScroll = useNoScroll();

  return (
    <div className={cn("relative", containerClassName)}>
      <input
        ref={ref}
        className={cn(
          "py-3 pl-5 rounded-2xl w-full text-base border rm-arrow-spin placeholder:italic",
          error
            ? "border-[#ff3506] focus:outline-[#ff3506]"
            : "border-[#24075c] hover:border-[#531ae3] focus:outline-[#531ae3] text-midnight-indigo",
            restProps.disabled && "bg-[#ebebeb] opacity-75 border-[#646464] hover:border-[#646464]",
          className
        )}
        onWheel={restProps.type === "number" ? handleNoScroll : undefined}
        {...restProps}
      />

      {error && <p className="text-[#ff3506] text-xs pl-3">{error}</p>}
    </div>
  );
}
