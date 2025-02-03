import { useState } from "react";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  children: React.ReactNode;
  title: string;
  position?: TooltipPosition;
}

export default function Tooltip({
  children,
  title,
  position = "top",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const getPositionClasses = (): string => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 -translate-y-1/2 ml-2";
      default:
        return "bottom-full left-1/2 -translate-x-1/2 mb-2";
    }
  };

  const getTooltipAnimation = (): string => {
    switch (position) {
      case "top":
        return `${isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`;
      case "bottom":
        return `${isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`;
      case "left":
        return `${isVisible ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"}`;
      case "right":
        return `${isVisible ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`;
      default:
        return `${isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`;
    }
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>

      <div
        className={`absolute z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg whitespace-nowrap transform transition-all duration-200 ease-in-out ${getPositionClasses()} ${getTooltipAnimation()}`}
        role="tooltip"
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        {title}
        <div
          className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 transition-all duration-200 ${
            position === "top"
              ? "bottom-[-4px] left-1/2 -translate-x-1/2"
              : position === "bottom"
              ? "top-[-4px] left-1/2 -translate-x-1/2"
              : position === "left"
              ? "right-[-4px] top-1/2 -translate-y-1/2"
              : "left-[-4px] top-1/2 -translate-y-1/2"
          }`}
        />
      </div>
    </div>
  );
}
