import { useState, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

type TooltipPosition = "top" | "bottom" | "left" | "right";

const tooltipVariants = cva(
  "absolute z-50 transform transition-all shadow-lg",
  {
    variants: {
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
      },
      size: {
        xs: "px-1.5 py-0.5 text-xs max-w-xs",
        sm: "px-2 py-1 text-xs max-w-sm",
        md: "px-3 py-2 text-sm max-w-md",
        lg: "px-4 py-3 text-base max-w-lg",
        xl: "px-6 py-4 text-lg max-w-xl",
      },
      colorSchemes: {
        default: "bg-gray-800 text-white",
        primary: "bg-blue-600 text-white",
        success: "bg-green-600 text-white",
        warning: "bg-yellow-500 text-black",
        danger: "bg-red-600 text-white",
        info: "bg-cyan-600 text-white",
        light: "bg-white text-gray-900 border border-gray-200",
        dark: "bg-gray-900 text-white",
      },
      animation: {
        fade: "",
        scale: "transition-transform",
        bounce: "transition-transform",
        slide: "transition-transform",
        elastic: "transition-transform",
        zoom: "transition-transform",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      isVisible: {
        true: "opacity-100",
        false: "opacity-0",
      },
      interactive: {
        true: "pointer-events-auto",
        false: "pointer-events-none",
      },
    },
    compoundVariants: [
      // Position + Visibility Animations
      {
        position: "top",
        isVisible: true,
        className: "translate-y-0",
      },
      {
        position: "top",
        isVisible: false,
        className: "translate-y-2",
      },
      {
        position: "bottom",
        isVisible: true,
        className: "translate-y-0",
      },
      {
        position: "bottom",
        isVisible: false,
        className: "-translate-y-2",
      },
      {
        position: "left",
        isVisible: true,
        className: "translate-x-0",
      },
      {
        position: "left",
        isVisible: false,
        className: "translate-x-2",
      },
      {
        position: "right",
        isVisible: true,
        className: "translate-x-0",
      },
      {
        position: "right",
        isVisible: false,
        className: "-translate-x-2",
      },
      // Animation Variants
      {
        animation: "scale",
        isVisible: true,
        className: "scale-100",
      },
      {
        animation: "scale",
        isVisible: false,
        className: "scale-95",
      },
      {
        animation: "bounce",
        isVisible: true,
        className: "scale-100 animate-bounce",
      },
      {
        animation: "bounce",
        isVisible: false,
        className: "scale-95",
      },
      {
        animation: "slide",
        isVisible: true,
        className: "translate-y-0",
      },
      {
        animation: "slide",
        isVisible: false,
        className: "translate-y-4",
      },
      {
        animation: "elastic",
        isVisible: true,
        className: "scale-100 animate-wiggle",
      },
      {
        animation: "elastic",
        isVisible: false,
        className: "scale-90",
      },
      {
        animation: "zoom",
        isVisible: true,
        className: "scale-100",
      },
      {
        animation: "zoom",
        isVisible: false,
        className: "scale-50",
      },
    ],
    defaultVariants: {
      position: "top",
      size: "md",
      colorSchemes: "default",
      animation: "fade",
      rounded: "md",
      isVisible: false,
      interactive: false,
    },
  }
);

const arrowVariants = cva(
  "absolute w-2 h-2 transform rotate-45 transition-all duration-200",
  {
    variants: {
      position: {
        top: "bottom-[-4px] left-1/2 -translate-x-1/2",
        bottom: "top-[-4px] left-1/2 -translate-x-1/2",
        left: "right-[-4px] top-1/2 -translate-y-1/2",
        right: "left-[-4px] top-1/2 -translate-y-1/2",
      },
      colorSchemes: {
        default: "bg-gray-800",
        primary: "bg-blue-600",
        success: "bg-green-600",
        warning: "bg-yellow-500",
        danger: "bg-red-600",
        info: "bg-cyan-600",
        light: "bg-white border-gray-200",
        dark: "bg-gray-900",
      },
    },
    defaultVariants: {
      position: "top",
      colorSchemes: "default",
    },
  }
);

interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  children: ReactNode;
  content: ReactNode;
  position?: TooltipPosition;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  colorSchemes?: "default" | "primary" | "success" | "warning" | "danger" | "info" | "light" | "dark";
  animation?: "fade" | "scale" | "bounce" | "slide" | "elastic" | "zoom";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  interactive?: boolean;
  delayShow?: number;
  delayHide?: number;
  maxWidth?: string;
  disabled?: boolean;
  onShow?: () => void;
  onHide?: () => void;
}

export default function Tooltip({
  children,
  content,
  position = "top",
  size = "md",
  colorSchemes = "default",
  animation = "fade",
  rounded = "md",
  interactive = false,
  delayShow = 0,
  delayHide = 150,
  maxWidth,
  disabled = false,
  onShow,
  onHide,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showTimeout, setShowTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleShow = () => {
    if (disabled) return;
    if (hideTimeout) clearTimeout(hideTimeout);
    const timeout = setTimeout(() => {
      setIsVisible(true);
      onShow?.();
    }, delayShow);
    setShowTimeout(timeout);
  };

  const handleHide = () => {
    if (showTimeout) clearTimeout(showTimeout);
    const timeout = setTimeout(() => {
      setIsVisible(false);
      onHide?.();
    }, delayHide);
    setHideTimeout(timeout);
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={handleShow}
        onMouseLeave={handleHide}
        onTouchStart={handleShow}
        onTouchEnd={handleHide}
        className="inline-block"
      >
        {children}
      </div>

      <div
        className={tooltipVariants({
          position,
          size,
          colorSchemes,
          animation,
          rounded,
          isVisible,
          interactive
        })}
        role="tooltip"
        style={{
          visibility: isVisible ? "visible" : "hidden",
          maxWidth: maxWidth,
        }}
        onMouseEnter={interactive ? handleShow : undefined}
        onMouseLeave={interactive ? handleHide : undefined}
      >
        {content}
        <div className={arrowVariants({ position, colorSchemes })} />
      </div>
    </div>
  );
}

// ----------------- example ------------------------

<Tooltip 
  content={
    <div>
      <h3 className="font-bold">Custom Content</h3>
      <p>With HTML and components!</p>
    </div>
  }
  position="right"
  colorSchemes="warning"
  size="xs"
  animation="scale"
  rounded="lg"
  interactive
  delayShow={200}
  delayHide={200}
  maxWidth="300px"
  onShow={() => console.log('Tooltip shown')}
>
    <button
        className="rounded p-1.5 "
        onClick={() => handlePrint()}
    >
          <RePrint />
      </button>
  </Tooltip>
