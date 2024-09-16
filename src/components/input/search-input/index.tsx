import { cn } from "@/utils";
import { useState } from "react";
import { FaSearch } from "@/libs/icons";

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
  onEnterPress?: () => void;
  onClearClick?: () => void;
  icon?: boolean;
  className?: string;
}

export default function SearchInput({
  placeholder,
  value,
  onChange,
  onEnterPress,
  onClearClick,
  icon,
  className,
}: SearchInputProps) {
  const [searchValue, setSearchValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress();
    }
  };

  const handleClearClick = () => {
    setSearchValue("");
    if (onClearClick) {
      onClearClick();
    }
  };

  return (
    <div className="relative flex-1">
      <input
        className={cn(
          "px-5 py-2 rounded-full border border-[#7b6a9d] focus:outline-none w-full placeholder:italic",
          icon && "pl-9",
          className
        )}
        type="text"
        value={searchValue}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {searchValue && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={handleClearClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      {icon && (
        <FaSearch className="absolute left-3 top-[12px] text-gray-400" />
      )}
    </div>
  );
}
