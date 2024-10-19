import { cn } from '@/utils';
import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: ReactNode;
  colorScheme?: 'red' | 'green' | 'purple' | 'light';
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
  const baseClasses = "w-full py-1 text-white rounded-md transition-smooth";

  const colorSchemes: Record<typeof colorScheme, string> = {
    red: "bg-red-500 hover:bg-red-400 disabled:bg-red-300",
    green: "bg-green-500 hover:bg-green-600 disabled:bg-green-300",
    purple: "bg-[#6134bd] hover:bg-[#794cd3] disabled:bg-[#9a7bd1]",
    light: "text-[#7645d9] border-2 border-[#b8a0ea] hover:bg-[#f3eeff] disabled:bg-[#f8f5ff] disabled:text-[#bca7e6]"
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
