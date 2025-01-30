import { cn } from "@/utils";
import { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("p-1 rounded-md transition-smooth", {
  variants: {
    colorScheme: {
      outline: "border text-current hover:bg-gray-100",
      green: "bg-green-500 hover:bg-green-600 text-white disabled:bg-green-300",
      "outline-green": "text-green-500 border border-green-500 hover:bg-green-50 disabled:text-green-300 disabled:border-green-300",
      red: "bg-red-500 hover:bg-red-600 text-white disabled:bg-red-300",
      "outline-red": "text-[#d32f2f] border border-[#d32f2f] hover:bg-[#faf1f1] disabled:text-red-300 disabled:border-red-300",
      purple: "bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-300",
      "outline-purple": "text-purple-600 border border-purple-600 hover:bg-purple-50 disabled:text-[#bca7e6] disabled:border-[#e4d7ff]",
      "light-purple": "text-purple-700 bg-purple-100 hover:bg-purple-200 disabled:text-[#b19cd9] disabled:bg-[#f4ebfa]",
      cyan: "bg-[#1fc7d4] hover:bg-[#2ea5ad] text-white disabled:bg-[#a7e8ed]",
      "outline-cyan": "border border-[#1fc7d4] text-[#1fc7d4] hover:bg-[#e6fafb] disabled:text-[#a7e8ed] disabled:border-[#a7e8ed]",
      blue: "bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300",
      "outline-blue": "border border-blue-500 text-blue-500 hover:bg-blue-50 disabled:border-blue-300 disabled:text-blue-300",
      "light-blue": "text-blue-700 bg-blue-100 hover:bg-blue-200",
      gray: "bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:bg-gray-50 disabled:text-gray-500",
    },
    useGrayDisabled: {
      true: "",
      false: "disabled:opacity-50",
    },
  },
  compoundVariants: [
    {
      useGrayDisabled: true,
      colorScheme: [
        "outline",
        "outline-green",
        "outline-red",
        "outline-purple",
        "outline-cyan",
        "outline-blue",
      ],
      className: "disabled:border-pale-gray disabled:text-[#c0c0c0]",
    },
    {
      useGrayDisabled: true,
      colorScheme: [
        "green",
        "red",
        "purple",
        "cyan",
        "blue",
        "gray",
        "light-purple",
        "light-blue",
      ],
      className: "disabled:bg-pale-gray disabled:text-[#98989a]",
    },
  ],
  defaultVariants: {
    colorScheme: "green",
    useGrayDisabled: false,
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({
  colorScheme,
  className,
  useGrayDisabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ colorScheme, useGrayDisabled, className })
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
