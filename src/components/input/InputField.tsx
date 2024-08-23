import { useNoScroll } from "@/hooks";
import { cn } from "@/utils/cn";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface FormValues {
  [key: string]: any;
}import { useNoScroll } from "@/hooks";
import { cn } from "@/utils/cn";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface FormValues {
  [key: string]: any;
}

interface InputFieldProps {
  name: string;
  placeholder: string;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  type?: string;
  required?: boolean;
  className?: string;
}

export default function InputField({
  name,
  placeholder,
  register,
  type = "text",
  errors,
  required = true,
  className,
}: InputFieldProps) {
  const handleNoScroll = useNoScroll();

  return (
    <div className="relative">
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
        required={required}
        {...register(name)}
      />

      <label
        htmlFor={name}
        className={cn(
          "absolute top-[23%] left-5 px-1 rounded-full text-[#433958] transition-all duration-300",
          "peer-focus:-top-2 peer-focus:text-[#531ae3] peer-focus:text-xs",
          "peer-valid:-top-2 peer-valid:text-xs",
          "pointer-events-none peer-focus:font-medium",
          errors?.[name] ? "text-[#ff3000]" : "text-gray-800 bg-white"
        )}
      >
        {placeholder}
      </label>

      <p className="text-[#ff3506] text-xs h-1 pl-2">
        {errors?.[name] && `${placeholder.toLowerCase()} is a required field`}
      </p>
    </div>
  );
}


interface InputFieldProps {
  name: string;
  placeholder: string;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  type?: string;
  className?: string;
}

export default function InputField({ name, placeholder, register, type = "text", errors, className }: InputFieldProps) {
  const handleNoScroll = useNoScroll();

  return (
    <div className={cn("relative", className)}>
      <input
        id={name}
        className={`peer py-3 pl-5 rounded-2xl w-full text-base border rm-arrow-spin ${
          errors?.[name]
            ? "border-[#ff3506] focus:outline-[#ff3506]"
            : "border-[#24075c] hover:border-[#531ae3] focus:outline-[#531ae3] text-[#280d5f]"
        }`}
        type={type}
        onWheel={handleNoScroll}
        required
        {...register(name)}
      />

      <label
        htmlFor={name}
        className={`absolute top-[23%] left-5 px-1 text-[#433958] transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-valid:-top-2 peer-valid:text-xs pointer-events-none peer-focus:font-medium ${
          errors?.[name] ? "text-[#ff3000]" : "text-gray-800 bg-white"
        }`}
      >
        {placeholder}
      </label>

      <p className="text-[#ff3506] text-xs h-1 pl-2">
        {errors?.[name] && `${placeholder.toLowerCase()} is a required field`}
      </p>
    </div>
  );
}
