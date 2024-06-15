"use client";

import { useState } from "react";

export default function Switch() {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div
      onClick={() => setIsSelected((prev) => !prev)}
      className={`flex w-20 h-10  rounded-full cursor-pointer transition-all duration-500 ${
        isSelected ? "bg-green-500" : "bg-gray-600"
      }`}
    >
      <span
        className={`h-10 w-10 rounded-full bg-white transition-all duration-500 shadow-lg ${
          isSelected ? "ml-10" : ""
        }`}
      ></span>
    </div>
  );
}
