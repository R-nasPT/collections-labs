import { cn } from "@/utils";

interface SwitchProps {
  defaultChecked?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}

const sizeConfig = {
  sm: {
    switch: "w-6 h-3",
    thumb: "h-4 w-4",
    thumbLeft: "-left-0.5",
  },
  md: {
    switch: "w-8 h-4",
    thumb: "h-5 w-5",
    thumbLeft: "-left-1",
  },
  lg: {
    switch: "w-10 h-5",
    thumb: "h-6 w-6",
    thumbLeft: "-left-1",
  },
};

export default function Switch({
  size = "md",
  onChange,
  disabled = false,
  color = "purple",
  id = "switch-component",
  defaultChecked = false,
}: SwitchProps) {
  const colorMap = {
    purple: "checked:bg-purple-600 peer-checked:border-purple-600",
    blue: "checked:bg-blue-600 peer-checked:border-blue-600",
    green: "checked:bg-green-600 peer-checked:border-green-600",
    red: "checked:bg-red-600 peer-checked:border-red-600",
  };

  const selectedColor = colorMap[color as keyof typeof colorMap] || colorMap.purple;
  const config = sizeConfig[size];

  return (
    <div className="inline-flex items-center">
      <div
        className={cn(
          "relative inline-block rounded-full cursor-pointer",
          config.switch,
          disabled && "opacity-50"
        )}
      >
        <input
          id={id}
          type="checkbox"
          className={cn(
            "absolute w-8 h-4 transition-smooth rounded-full appearance-none cursor-pointer",
            "peer bg-[#cfd8dc]",
            selectedColor,
            config.switch,
            disabled && "cursor-not-allowed"
          )}
          defaultChecked={defaultChecked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute top-2/4 -translate-y-2/4 cursor-pointer rounded-full border border-[#cfd8dc]",
            "bg-white shadow-md transition-smooth",
            "before:absolute before:top-2/4 before:left-2/4 before:block before:h-10",
            "before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full",
            "before:bg-gray-600 before:opacity-0 before:transition-opacity peer-enabled:hover:before:opacity-10",
            "peer-checked:translate-x-full peer-checked:border-purple-600",
            "peer-checked:before:bg-purple-600",
            config.thumbLeft,
            config.thumb,
            disabled && "cursor-not-allowed"
          )}
        >
          <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"></div>
        </label>
      </div>
    </div>
  );
}
