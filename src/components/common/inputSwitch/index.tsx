"use client";
import { ChangeEventHandler, forwardRef, InputHTMLAttributes } from "react";
import Check from "./check";
import Close from "./close";

export default function InputSwitch() {
  return (
    <label
      htmlFor="check"
      className="flex bg-gray-100 cursor-pointer relative w-20 h-10 rounded-full transition has-[:checked]:bg-rose-200"
    >
      <input type="checkbox" id="check" className="sr-only peer" />
      <span className="w-2/5 h-4/5 bg-rose-300 absolute rounded-full left-1 top-1 peer-checked:bg-rose-600 peer-checked:left-11 transition-all duration-500" />
    </label>
  );
}

// ======================= Step Two ============================

// forwardRef คือการทำให้ component สามารถรับ refs จาก component แม่ ได้ 
interface SwitchRefProps extends InputHTMLAttributes<HTMLInputElement> {}

export const SwitchRef = forwardRef<HTMLInputElement, SwitchRefProps>(
  (props, ref) => (
    <label className="cursor-pointer">
      <input type="checkbox" className="hidden" ref={ref} {...props} />
      <div
        className={`w-14 p-1 rounded-full ${
          props.checked ? "bg-blue-200" : "bg-gray-200"
        }`}
      >
        <div
          className={`w-fit p-0.5 shadow-sm rounded-full transition-all duration-300 text-white ${
            props.checked
              ? "bg-blue-500 translate-x-6"
              : "bg-gray-400 -rotate-180"
          }`}
        >
          {props.checked ? <Check /> : <Close />}
        </div>
      </div>
    </label>
  )
);
// เพิ่ม display name เพื่อการดีบัก
SwitchRef.displayName = "SwitchRef";

// ======================= Step Three ============================

interface ToggleSwitchProps {
  selected: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function ToggleSwitch({ selected, onChange }: ToggleSwitchProps) {
  return (
    <label
      htmlFor="toggle-check"
      className={`flex cursor-pointer relative w-20 h-8 transition-colors duration-300 rounded-full ${
        selected ? "bg-rose-200" : "bg-gray-100"
      }`}
    >
      <input
        type="checkbox"
        id="toggle-check"
        className="sr-only"
        onChange={onChange}
      />
      <div
                                // inset-y-0 start-0 size-6 m-1
        className={`p-0.5 absolute left-1 top-1 shadow-sm rounded-full transition-all duration-300 text-white ${
                                 // start-6
          selected ? "bg-rose-600 left-12" : "bg-rose-300 -rotate-180"
        }`}
      >
        {selected ? <Check /> : <Close />}
      </div>
    </label>
  );
}
