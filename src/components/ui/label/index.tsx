"use client";

import { cn } from "@/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  errors?: string;
  required?: boolean;
  className?: string;
  requiredClassName?: string;
  description?: string;
  descriptionClassName?: string;
  containerClassName?: string;
}

export default function Label({
  label,
  errors,
  required,
  className,
  requiredClassName,
  description,
  descriptionClassName,
  containerClassName,
  ...props
}: LabelProps) {
  return (
    <div className={cn("mb-1", containerClassName)}>
      <label
        className={cn(
          "block text-sm font-medium",
          errors ? "text-[#ff3506]" : "text-midnight-indigo",
          className
        )}
        {...props}
      >
        {label}
        {required && (
          <span className={cn("text-[#ff3506] ml-1", requiredClassName)}>
            *
          </span>
        )}
      </label>

      {description && (
        <p className={cn("text-xs text-gray-500 mt-1", descriptionClassName)}>
          {description}
        </p>
      )}
    </div>
  );
}
