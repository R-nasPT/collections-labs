import { cn } from '@/utils';
import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: ReactNode;
  colorScheme?: 'red' | 'green' | 'purple' | 'outline-red' | 'outline-green' | 'outline-purple' | 'cyan' | 'outline-cyan' | 'gray';
  className?: string;
}

function Button({ 
  onClick, 
  disabled = false, 
  children, 
  colorScheme = 'green', 
  className = '', 
  ...props
}: ButtonProps) {
  const baseClasses = "py-1 px-1 text-white rounded-md transition-smooth";

  const colorSchemes: Record<typeof colorScheme, string> = {
    red: "bg-red-500 enabled:hover:bg-red-600 disabled:bg-red-300 text-white",
    green: "bg-green-500 enabled:hover:bg-green-600 disabled:bg-green-300 text-white",
    purple: "bg-[#6134bd] enabled:hover:bg-[#794cd3] disabled:bg-[#9a7bd1] text-white",
    cyan: "bg-[#1fc7d4] enabled:hover:bg-[#2ea5ad] disabled:bg-[#a7e8ed] text-white",
    gray: "bg-[#dedede] text-[#98989a] enabled:hover:bg-[#cacaca] disabled:bg-[#f0f0f0] disabled:text-[#c0c0c2]",
    'outline-red': "text-red-500 border border-red-500 enabled:hover:bg-red-100 disabled:text-red-300 disabled:border-red-300",
    'outline-green': "text-green-500 border border-green-500 enabled:hover:bg-green-100 disabled:text-green-300 disabled:border-green-300",
    'outline-purple': "text-[#7645d9] border border-[#7645d9] enabled:hover:bg-purple-100 disabled:text-[#bca7e6] disabled:border-[#e4d7ff]",
    'outline-cyan': "border border-[#1fc7d4] text-[#1fc7d4] enabled:hover:bg-[#e6fafb] disabled:text-[#a7e8ed] disabled:border-[#a7e8ed]",
  };

  const buttonClasses = cn(
    baseClasses,
    colorSchemes[colorScheme],
    disabled && "cursor-not-allowed opacity-50",
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
