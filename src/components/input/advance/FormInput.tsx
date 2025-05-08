"use client";

import { useNoScroll } from "@/hooks";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { cn } from "@/utils";

type NestedError = {
  message?: string;
  [key: string]: NestedError | string | undefined;
};

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type?: "text" | "number" | "email" | "password" | "tel";
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
}

export default function FormInput<T extends FieldValues>({
  name,
  register,
  type = "text",
  errors,
  placeholder,
  className,
  containerClassName,
  disabled,
}: FormInputProps<T>) {
  const handleNoScroll = useNoScroll();

  const getErrorMessage = (): string | undefined => {
  if (typeof name === "string") {
    const error = name.split(".")
      .reduce((error: NestedError | undefined, part) => 
        error && typeof error === 'object' ? error[part] as NestedError | undefined : undefined, 
        errors as unknown as NestedError);
    return error?.message;
  }
  return errors[name]?.message as string | undefined;
};

  const errorMessage = getErrorMessage();
  const hasError = !!errorMessage;

  return (
    <div className={cn("relative", containerClassName)}>
      <input
        id={String(name)}
        className={cn(
          "py-3 pl-5 rounded-2xl w-full text-base border rm-arrow-spin placeholder:italic",
          hasError
            ? "border-[#ff3506] focus:outline-[#ff3506]"
            : "border-[#24075c] hover:border-[#531ae3] focus:outline-[#531ae3] text-midnight-indigo",
          disabled && "bg-[#ebebeb] opacity-75 border-[#646464] hover:border-[#646464]",
          className
        )}
        type={type}
        disabled={disabled}
        onWheel={type === "number" ? handleNoScroll : undefined}
        placeholder={placeholder}
        {...register(name)}
      />

      <p className="text-[#ff3506] text-xs h-5 pl-3 mt-1">
        {hasError && errorMessage}
      </p>
    </div>
  );
}
