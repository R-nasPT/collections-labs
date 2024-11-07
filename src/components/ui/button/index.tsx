import { cn } from '@/utils';
import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: ReactNode;
  colorScheme?: 'green' | 'red' | 'purple' | 'cyan' | 'gray' | 'outline-red' | 'outline-green' | 'outline-purple' | 'outline-cyan';
  className?: string;
  useGrayDisabled?: 'filled' | 'outline' | false;
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
    red: "bg-red-600 enabled:hover:bg-red-500 text-white",
    green: "bg-green-500 enabled:hover:bg-green-600 text-white",
    purple: "bg-[#6134bd] enabled:hover:bg-[#794cd3] text-white",
    cyan: "bg-[#1fc7d4] enabled:hover:bg-[#2ea5ad] text-white",
    gray: "bg-gray-100 enabled:hover:bg-gray-200 text-gray-700",
    'outline-red': "text-[#d32f2f] border border-[#d32f2f] enabled:hover:bg-[#faf1f1]",
    'outline-green': "text-green-600 border border-green-600 enabled:hover:bg-green-50",
    'outline-purple': "text-[#7645d9] border border-[#7645d9] enabled:hover:bg-purple-50",
    'outline-cyan': "border border-[#1fc7d4] text-[#1fc7d4] enabled:hover:bg-[#e6fafb]",
  };

  const disabledClasses: Record<string, string> = {
    red: "bg-red-300",
    green: "bg-green-300",
    purple: "bg-[#9a7bd1]",
    cyan: "bg-[#a7e8ed]",
    gray: "bg-gray-50 text-gray-500",
    'outline-red': "text-red-300 border-red-300",
    'outline-green': "text-green-300 border-green-300",
    'outline-purple': "text-[#bca7e6] border-[#e4d7ff]",
    'outline-cyan': "text-[#a7e8ed] border-[#a7e8ed]",
  };

  const grayDisabledClasses = {
    filled: "bg-[#dedede] text-[#98989a]",
    outline: "border border-[#dedede] text-[#c0c0c0]"
  };

  const buttonClasses = cn(
    baseClasses,
    (!disabled || !useGrayDisabled) && colorSchemes[colorScheme],
    disabled && (useGrayDisabled ? grayDisabledClasses[useGrayDisabled] : disabledClasses[colorScheme]),
    disabled && !useGrayDisabled && "opacity-50",
    disabled && "cursor-not-allowed",
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
