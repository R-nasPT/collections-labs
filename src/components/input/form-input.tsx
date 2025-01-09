"use client";

import { useNoScroll } from "@/hooks";
import { useEffect, useState } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { cn } from "@/utils";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  control: Control<T>;
  type?: "text" | "number" | "email" | "password" | "tel";
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
  disabled?: boolean;
}

export default function FormInput<T extends FieldValues>({
  name,
  placeholder,
  register,
  type = "text",
  errors,
  control,
  className,
  labelClassName,
  containerClassName,
  disabled,
}: FormInputProps<T>) {
  const [isFilled, setIsFilled] = useState(false);
  const handleNoScroll = useNoScroll();
  const fieldValue = useWatch<T>({ name, control });

  useEffect(() => {
    setIsFilled(!!fieldValue);
  }, [fieldValue]);

  return (
    <div className={cn("relative", containerClassName)}>
      <input
        id={String(name)}
        className={cn(
          "peer py-3 pl-5 rounded-2xl w-full text-base border rm-arrow-spin",
          errors?.[name]
            ? "border-[#ff3506] focus:outline-[#ff3506]"
            : "border-[#24075c] hover:border-[#531ae3] focus:outline-[#531ae3] text-midnight-indigo",
          disabled && "bg-[#ebebeb] opacity-75 border-[#646464] hover:border-[#646464]",
          className
        )}
        type={type}
        disabled={disabled}
        onWheel={type === "number" ? handleNoScroll : undefined}
        {...register(name)}
      />

      <label
        htmlFor={String(name)}
        className={cn(
          "absolute top-[18%] left-5 px-1.5 bg-white rounded-full transition-all duration-300 italic",
          "peer-focus:-top-2 peer-focus:text-xs",
          isFilled && "-top-2 lg:-top-2 text-xs",
          "pointer-events-none peer-focus:font-medium",
          errors?.[name]
            ? "text-[#fa8383] peer-focus:text-[#ff0606]"
            : "text-gray-400 peer-focus:text-[#531ae3]",
          disabled &&
            (isFilled || fieldValue
              ? "bg-gradient-to-b from-white to-[#ebebeb]"
              : "bg-[#ebebeb]"),
          labelClassName
        )}
      >
        {placeholder}
      </label>

      <p className="text-[#ff3506] text-xs h-5 pl-3 mt-1">
        {errors?.[name] && (errors?.[name]?.message as string | undefined)}
      </p>
    </div>
  );
}
