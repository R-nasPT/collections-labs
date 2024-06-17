"use client";

// ============= Special Button ==============

import { ReactNode, useRef, useState } from "react";

interface SpecialButtonProps {
  children: ReactNode;
  text: string;
  color?: string;
  [key: string]: any;
}

export default function SpecialButton({ children, text, color, ...props }: SpecialButtonProps) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        flex p-2 items-center rounded-lg
        text-white ${color || "bg-gray-600"}
      `}
      {...props}
    >
      {children}
      <div
        style={{ width: hovered ? ref.current?.offsetWidth || 0 : 0 }}
        className="overflow-x-hidden transition-all duration-300 ease-out"
      >
        <span ref={ref} className="px-1.5">
          {text}
        </span>
      </div>
    </button>
  );
}

// ============= First ==============

export function ButtonFirstStyle() {
  return (
    <button className="relative group overflow-hidden px-6 h-12 rounded-full flex space-x-2 items-center bg-gradient-to-r from-pink-500 to-purple-500 hover:to-purple-600">
      <span className="relative text-sm text-white">Get Started</span>
      <div className="flex items-center -space-x-3 translate-x-3">
        <div className="w-3 h-[1.7px] rounded bg-white origin-left scale-x-0 transition duration-300 group-hover:scale-x-100"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 stroke-white -translate-x-2 transition duration-300 group-hover:translate-x-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}

// ============= Second ==============

export function ButtonSecondStyle() {
  return (
    <button className="relative group overflow-hidden pl-6 h-14 flex space-x-6 items-center bg-blue-500">
      <span className="relative uppercase text-base text-white">Download</span>
      <div
        aria-hidden="true"
        className="w-14 bg-blue-600 transition duration-300 -translate-y-7 group-hover:translate-y-7"
      >
        <div className="h-14 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 m-auto fill-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="h-14 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 m-auto fill-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}

// ============= Third ==============

export function ButtonThirdStyle() {
  return (
    <button className="relative group overflow-hidden px-6 h-12 border border-purple-200 rounded-full">
      <div
        aria-hidden="true"
        className="transition duration-300 group-hover:-translate-y-12"
      >
        <div className="h-12 flex items-center justify-center">
          <span className="text-purple-700">Share</span>
        </div>
        <div className="h-12 flex items-center justify-center">
          <span className="text-purple-700">Partager</span>
        </div>
      </div>
    </button>
  );
}

// ============= Fourth ==============

export function ButtonFourthStyle() {
  return (
    <button
      className="relative group px-8 h-14 bg-red-500
                      before:absolute 
                      before:inset-0 
                      before:bg-red-700 
                      before:scale-x-0 
                      before:origin-right
                      before:transition
                      before:duration-300
                      hover:before:scale-x-100
                      hover:before:origin-left
                      "
    >
      <span className="relative uppercase text-base text-white">Shop now</span>
    </button>
  );
}

// ============= Fifth ==============

export function ButtonFifthStyle() {
  return (
    <button
      className="relative group overflow-hidden px-8 h-12 rounded-md bg-lime-500
                      before:absolute 
                      before:inset-0 
                      before:bg-lime-600 
                      before:scale-y-[0.1] 
                      before:origin-bottom
                      before:transition
                      before:duration-300
                      hover:before:scale-y-100
                      "
    >
      <span className="relative uppercase text-base text-white">Play now</span>
    </button>
  );
}
