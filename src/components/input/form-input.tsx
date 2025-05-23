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

type NestedError = {
  message?: string;
  [key: string]: NestedError | string | undefined;
};

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
  floatingLabelClassName?: string;
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
  floatingLabelClassName,
  disabled,
}: FormInputProps<T>) {
  const [isFilled, setIsFilled] = useState(false);
  const handleNoScroll = useNoScroll();
  const fieldValue = useWatch<T>({ name, control });

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

  useEffect(() => {
    setIsFilled(!!fieldValue);
  }, [fieldValue]);

  return (
    <div className={cn("relative", containerClassName)}>
      <input
        id={String(name)}
        className={cn(
          "peer py-3 pl-5 rounded-2xl w-full text-base border rm-arrow-spin",
          hasError
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
          "pointer-events-none peer-focus:font-medium",
          hasError
            ? "text-[#fa8383] peer-focus:text-[#ff0606]"
            : "text-gray-400 peer-focus:text-[#531ae3]",
          disabled &&
            (isFilled || fieldValue
              ? "bg-gradient-to-b from-white to-[#ebebeb]"
              : "bg-[#f0f0f0]"),
          labelClassName,
          isFilled && ["-top-2 md:-top-2 lg:-top-2 text-xs", floatingLabelClassName]
        )}
      >
        {placeholder}
      </label>

      <p className="text-[#ff3506] text-xs h-5 pl-3 mt-1">
        {hasError && errorMessage}
      </p>
    </div>
  );
}

// -----------------------------------------

     <FormInput
        control={control}
        name={`items.${index}.returnCourierTrackingCode`}
        placeholder="Returned Tracking Code"
        register={register}
        errors={errors}
        containerClassName="md:w-[40%]"
        labelClassName="md:top-[15%] text-[10px] left-3 peer-focus:text-[8px] peer-focus:-top-1.5"
        floatingLabelClassName="text-[8px] -top-1.5 md:-top-1.5 lg:-top-1.5"
        className="py-2 px-4 text-xs rounded-xl"
      />
