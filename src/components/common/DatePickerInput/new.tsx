"use client";

import { cn } from "@/utils";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { useController, Control, FieldError, Message } from "react-hook-form";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

interface DatePickerInputProps {
  name: string;
  control: Control<any>;
  className?: string;
  containerClassName?: string;
  wrapperClassName?: string;
  placeholder?: string;
  disabled?: boolean
}

interface DatePickerFieldError extends FieldError {
  startDate: { message: Message };
}

export default function DatePickerInput({
  name,
  control,
  className,
  containerClassName,
  wrapperClassName,
  placeholder,
  disabled,
}: DatePickerInputProps) {
  const locale = useLocale();
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [dateValue, setDateValue] = useState<DateValueType>(
    value || {
      startDate: null,
      endDate: null,
    }
  );

  const handleDateChange = (newValue: DateValueType) => {
    if (newValue) {
      const processedValue = {
        startDate: newValue.startDate,
        endDate: newValue.startDate,
      };
      setDateValue(processedValue);
      onChange(processedValue);
    } else {
      setDateValue({
        startDate: null,
        endDate: null,
      });
      onChange(null);
    }
  };

  useEffect(() => {
    if (value) {
      setDateValue(value);
    }
  }, [value]);

  return (
    <div className={cn("w-full", wrapperClassName)}>
      <Datepicker
        primaryColor={error ? "red" : "purple"}
        inputId={name}
        inputName={name}
        value={dateValue}
        onChange={handleDateChange}
        i18n={locale}
        useRange={false}
        asSingle={true}
        displayFormat="DD/MM/YYYY"
        placeholder={placeholder}
        disabled={disabled}
        containerClassName={cn(
          "relative",
          error ? "border-red-500" : "border-gray-300",
          containerClassName
        )}
        toggleClassName={cn(
          error ? "absolute text-red-500 right-0 h-full px-3" : ""
        )}
        inputClassName={cn(
          "relative transition-all duration-300 py-3 pl-4 pr-14 w-full border",
          "rounded-2xl tracking-wide font-light bg-white",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20 focus:outline-[#ff0606] placeholder-red-400"
            : "border-[#24075c] hover:border-[#531ae3] focus:outline-[#531ae3] text-midnight-indigo placeholder-gray-400",
          disabled && "bg-[#ebebeb] opacity-75 border-[#646464] hover:border-[#646464]",
          className
        )}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {(error as DatePickerFieldError).startDate.message}
        </p>
      )}
    </div>
  );
}
