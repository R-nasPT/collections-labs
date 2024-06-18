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
        <button onClick={() => setOpenTop(!openTop)}>1</button>
        <button onClick={() => setOpenRight(!openRight)}>2</button>
        <button onClick={() => setOpenLeft(!openLeft)}>3</button>
        <button onClick={() => setOpenBottom(!openBottom)}>4</button>
      </div>
      
    </div>
  );
}
