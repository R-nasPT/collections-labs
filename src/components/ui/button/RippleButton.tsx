import { cn } from '@/utils';
import { ButtonHTMLAttributes, MouseEvent, ReactNode, useCallback, useState } from 'react';

interface RippleType {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: ReactNode;
  colorScheme?: 'green' | 'red' | 'purple' | 'cyan' | 'outline-red' | 'outline-green' | 'outline-purple' | 'outline-cyan';
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
  const [ripples, setRipples] = useState<RippleType[]>([]);

  const handleRipple = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const button = event.currentTarget.getBoundingClientRect();
    const diameter = Math.max(button.width, button.height);
    const radius = diameter / 2;

    const ripple = {
      id: Date.now(),
      left: event.clientX - button.left - radius,
      top: event.clientY - button.top - radius,
      width: diameter,
      height: diameter,
    };

    setRipples((prevRipples) => [...prevRipples, ripple]);

    // Clean up ripple after animation
    setTimeout(() => {
      setRipples((prevRipples) => 
        prevRipples.filter((item) => item.id !== ripple.id)
      );
    }, 600);

    // Call the original onClick handler if provided
    onClick?.(event);
  }, [disabled, onClick]);

  const baseClasses = "relative p-1 rounded-md transition-smooth overflow-hidden";

  const colorSchemes: Record<string, string> = {
    red: "bg-red-500 enabled:hover:bg-red-600 text-white",
    green: "bg-green-500 enabled:hover:bg-green-600 text-white",
    purple: "bg-[#6134bd] enabled:hover:bg-[#794cd3] text-white",
    cyan: "bg-[#1fc7d4] enabled:hover:bg-[#2ea5ad] text-white",
    'outline-red': "text-[#d32f2f] border border-[#d32f2f] enabled:hover:bg-[#faf1f1]",
    'outline-green': "text-green-500 border border-green-500 enabled:hover:bg-green-100",
    'outline-purple': "text-[#7645d9] border border-[#7645d9] enabled:hover:bg-purple-100",
    'outline-cyan': "border border-[#1fc7d4] text-[#1fc7d4] enabled:hover:bg-[#e6fafb]",
  };

  const disabledClasses: Record<string, string> = {
    red: "bg-red-300",
    green: "bg-green-300",
    purple: "bg-[#9a7bd1]",
    cyan: "bg-[#a7e8ed]",
    'outline-red': "text-red-300 border-red-300",
    'outline-green': "text-green-300 border-green-300",
    'outline-purple': "text-[#bca7e6] border-[#e4d7ff]",
    'outline-cyan': "text-[#a7e8ed] border-[#a7e8ed]",
  };

  const grayDisabledClasses = "bg-[#dedede] text-[#98989a]";

  const buttonClasses = cn(
    baseClasses,
    colorSchemes[colorScheme],
    disabled && (useGrayDisabled ? grayDisabledClasses : disabledClasses[colorScheme]),
    disabled && !useGrayDisabled && "opacity-50",
    disabled && "cursor-not-allowed",
    className
  );

  const getRippleColor = () => {
    // Define ripple colors for each button type
    const rippleColors: Record<string, string> = {
      // Filled buttons - lighter version of button color
      // red: "bg-red-400/40",
      // green: "bg-green-400/40",
      // purple: "bg-[#794cd3]/40",
      // cyan: "bg-[#2ea5ad]/40",
      // Outline buttons - matching color with lower opacity
      'outline-red': "bg-[#F0BABA]",
      'outline-green': "bg-green-500/10",
      'outline-purple': "bg-[#DEB8E5]",
      'outline-cyan': "bg-[#1fc7d4]/10"
    };

    return rippleColors[colorScheme] || "bg-white/30"; // Fallback to white ripple
  };

  return (
    <button
      className={buttonClasses}
      onClick={handleRipple}
      disabled={disabled}
      {...props}
    >
      <span className="absolute inset-0 z-0">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className={cn(
              "absolute block rounded-full pointer-events-none animate-ripple",
              getRippleColor(),
            )}
            style={{
              left: ripple.left,
              top: ripple.top,
              width: ripple.width,
              height: ripple.height,
              transform: "scale(0)",
            }}
          />
        ))}
      </span>
      
      {/* Content wrapper with higher z-index */}
      <span className="relative z-10">
        {children}
      </span>
    </button>
  );
};

export default Button;

// ---- tailwind.config.ts ----
theme: {
    extend: {
      keyframes: {
        ripple: {
          to: {
            transform: 'scale(4)',
            opacity: '0'
          }
        }
      },
      animation: {
        ripple: 'ripple 600ms linear'
      }
    },
  },
