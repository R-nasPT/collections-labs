"use client";
import Sidebar from "@/components/sidebar";
import Card from "@/components/sidebar/card";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white h-screen w-screen flex flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-5 w-screen">
        <button
          className="bg-green-600 text-white rounded px-4 py-1"
          onClick={() => setIsOpen(true)}
        >
          open
        </button>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}>
          <Card />
          <Card />
          <Card />
        </Sidebar>
      </div>
      
    </div>
  );
}
