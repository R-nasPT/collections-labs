"use client";

import { cn } from "@/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  errors?: string | boolean;
  required?: boolean;
  className?: string;
  icon?: React.ReactNode;
  description?: string;
  containerClassName?: string;
  requiredClassName?: string;
  descriptionClassName?: string;
  iconClassName?: string;
}

export default function Label({
  label,
  errors,
  required,
  className,
  description,
  icon,
  containerClassName,
  requiredClassName,
  descriptionClassName,
  iconClassName,
  ...props
}: LabelProps) {
  return (
    <div className={cn("mb-1", containerClassName)}>
      <label
        className={cn(
          "text-sm font-medium flex items-center",
          errors ? "text-[#ff3506]" : "text-midnight-indigo",
          className
        )}
        {...props}
      >
        {icon && <span className={cn("mr-2", iconClassName)}>{icon}</span>}
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
