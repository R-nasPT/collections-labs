import { useNoScroll } from "@/hooks";
import { useEffect, useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { cn } from "@/utils";

interface FormValues {
  [key: string]: any;
}

interface FormInputProps {
  name: string;
  placeholder: string;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  control: Control<FormValues>;
  type?: string;
  className?: string;
  labelClassName?: string;
  wrapperStyles?: string;
}

export default function FormInput({
  name,
  placeholder,
  register,
  type = "text",
  errors,
  control,
  className,
  labelClassName,
  wrapperStyles,
}: FormInputProps) {
  const [isFilled, setIsFilled] = useState(false);
  const handleNoScroll = useNoScroll();
  const fieldValue = useWatch({ name, control });

  useEffect(() => {
    setIsFilled(!!fieldValue);
  }, [fieldValue]);

  return (
    <div className={cn("relative", wrapperStyles)}>
      <input
        id={name}
        className={cn(
          "peer py-3 pl-5 rounded-2xl w-full text-base border rm-arrow-spin",
          errors?.[name]
            ? "border-[#ff3506] focus:outline-[#ff3506]"
            : "border-[#24075c] hover:border-[#531ae3] focus:outline-[#531ae3] text-[#280d5f]",
          className
        )}
        type={type}
        onWheel={handleNoScroll}
        {...register(name)}
      />

      <label
        htmlFor={name}
        className={cn(
          "absolute top-[18%] left-5 px-1 bg-white rounded-full transition-all duration-300 italic",
          "peer-focus:-top-2 peer-focus:text-xs",
          labelClassName,
          isFilled && "-top-2 text-xs",
          "pointer-events-none peer-focus:font-medium",
          errors?.[name]
            ? "text-[#fa8383] peer-focus:text-[#ff0606]"
            : "text-gray-400 peer-focus:text-[#531ae3]"
        )}
      >
        {placeholder}
      </label>

      <p className="text-[#ff3506] text-xs h-5 pl-3">
        {errors?.[name] && (errors?.[name]?.message as string | undefined)}
      </p>
    </div>
  );
}
