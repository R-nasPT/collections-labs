"use client";
import InputSwitch, { SwitchRef, ToggleSwitch } from "@/components/inputSwitch";
import Switch from "@/components/switch";
import { useState } from "react";

export default function Home() {
  const [enabled, setEnabled] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <div className="bg-[#f4e7e7] h-screen flex justify-center items-center">
      <div className="flex justify-center items-center max-w-xs">
        <Switch />
        <InputSwitch />
        <SwitchRef
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <ToggleSwitch
          selected={selected}
          onChange={(e) => setSelected(e.target.checked)}
        />
      </div>
    </div>
  );
}
