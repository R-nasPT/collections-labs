import { cn } from '@/utils';
import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

type ColorScheme =
  | "outline"
  | "green"
  | "outline-green"
  | "red"
  | "outline-red"
  | "purple"
  | "outline-purple"
  | "purple-light"
  | "cyan"
  | "outline-cyan"
  | "blue"
  | "outline-blue"
  | "light-blue"
  | "gray";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: ReactNode;
  colorScheme?: ColorScheme;
  className?: string;
  useGrayDisabled?: boolean;
}

function Button({
  onClick,
  disabled = false,
  children,
  colorScheme = 'green',
  className = '',
  useGrayDisabled = false,
  ...props
}: ButtonProps) {
  const baseClasses = "p-1 rounded-md transition-smooth";

  const colorSchemes: Record<string, string> = {
    outline: "border text-current enabled:hover:bg-gray-100",
    green: "bg-green-500 enabled:hover:bg-green-600 text-white",
    'outline-green': "text-green-500 border border-green-500 enabled:hover:bg-green-50",
    red: "bg-red-500 enabled:hover:bg-red-600 text-white",
    'outline-red': "text-[#d32f2f] border border-[#d32f2f] enabled:hover:bg-[#faf1f1]",
    purple: "bg-purple-600 enabled:hover:bg-purple-700 text-white",
    'outline-purple': "text-purple-600 border border-purple-600 enabled:hover:bg-purple-50",
    "purple-light": "text-purple-700 bg-purple-100 enabled:hover:bg-purple-200",
    cyan: "bg-[#1fc7d4] enabled:hover:bg-[#2ea5ad] text-white",
    'outline-cyan': "border border-[#1fc7d4] text-[#1fc7d4] enabled:hover:bg-[#e6fafb]",
    blue: "bg-blue-500 enabled:hover:bg-blue-600 text-white",
    'outline-blue': "border border-blue-500 text-blue-500 enabled:hover:bg-blue-50",
    "light-blue": "text-blue-700 bg-blue-100 enabled:hover:bg-blue-200",
    gray: "bg-gray-100 enabled:hover:bg-gray-200 text-gray-700",
  };

  const disabledClasses: Record<string, string> = {
    green: "bg-green-300",
    'outline-green': "text-green-300 border-green-300",
    red: "bg-red-300",
    'outline-red': "text-red-300 border-red-300",
    purple: "bg-purple-300",
    'outline-purple': "text-[#bca7e6] border-[#e4d7ff]",
    "purple-light": "text-[#b19cd9] bg-[#f4ebfa]",
    cyan: "bg-[#a7e8ed]",
    'outline-cyan': "text-[#a7e8ed] border-[#a7e8ed]",
    gray: "bg-gray-50 text-gray-500",
  };

  const grayDisabledClasses = colorScheme.startsWith("outline")
    ? "border border-pale-gray text-[#c0c0c0]"
    : "bg-pale-gray text-[#98989a]";

  const buttonClasses = cn(
    baseClasses,
    (!disabled || !useGrayDisabled) && colorSchemes[colorScheme],
    disabled && (useGrayDisabled ? grayDisabledClasses : disabledClasses[colorScheme]),
    disabled && !useGrayDisabled && "opacity-50",
    className
  );

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
