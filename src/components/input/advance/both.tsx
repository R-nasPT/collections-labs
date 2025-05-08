"use client";

import { InputHTMLAttributes, Ref } from "react";
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

interface InputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
  name?: Path<T>;
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T> | string;
  type?: "text" | "tel" | "url" | "email" | "number" | "password";
  containerClassName?: string;
}

export default function Input<T extends FieldValues>({
  ref,
  name,
  register,
  errors,
  type = "text",
  containerClassName,
  className,
  onWheel,
  ...restProps
}: InputProps<T>) {
  const handleNoScroll = useNoScroll();

  const getErrorMessage = (): string | undefined => {
    if (name && errors && typeof name === "string") {
      const error = name.split(".")
        .reduce((error: NestedError | undefined, part) =>
          error && typeof error === "object" ? (error[part] as NestedError | undefined) : undefined,
          errors as unknown as NestedError
        );
      return error?.message;
    }
    return undefined;
  };

  let errorMessage: string | undefined;
  if (typeof errors === "string") {
    errorMessage = errors;
  } else {
    errorMessage = getErrorMessage();
  }

  const hasError = !!errorMessage;

  const formProps = register && name ? register(name) : {};

  return (
    <div className={cn("relative", containerClassName)}>
      <input
        ref={
          ref ||
          ("ref" in formProps
            ? (formProps.ref as Ref<HTMLInputElement>)
            : undefined)
        }
        className={cn(
          "py-3 pl-5 rounded-2xl w-full text-base border rm-arrow-spin placeholder:italic",
          hasError
            ? "border-[#ff3506] focus:outline-[#ff3506]"
            : "border-[#24075c] hover:border-[#531ae3] focus:outline-[#531ae3] text-midnight-indigo",
          restProps.disabled &&
            "bg-[#ebebeb] opacity-75 border-[#646464] hover:border-[#646464]",
          className
        )}
        type={type}
        onWheel={type === "number" ? handleNoScroll : onWheel}
        {...formProps}
        {...restProps}
      />

      {hasError && <p className="text-[#ff3506] text-xs pl-3">{errorMessage}</p>}
    </div>
  );
}
