import { useState } from "react";

export default function Dropdown() {
  const [show, setShow] = useState(false);
  const cars = ["BMW", "Mercedes", "Audi", "Volvo"];

  return (
    <section className="relative">
      <button
        className={`text-white font-bold bg-red-500 px-4 py-2 rounded`}
        onClick={() => setShow(!show)}
      >
        Dropdown Menu
      </button>

      {/* {show && ( */}
      {/* <div
        className={`transition-all ${
          show
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } bg-red-500 text-white mt-1 rounded absolute z-10 shadow-lg w-40 max-w-xs`}
        style={{
          maxHeight: show ? "1000px" : "0px", // กำหนดความสูงสูงสุดเพื่อให้มันขยายหรือยุบ
          overflow: "hidden", // ซ่อนเนื้อหาที่เกินขอบเขตของตัวเอง
          transition: "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out", // เพิ่ม transition
        }}
      > */}
      <div className={`dropdown-menu ${show ? "show" : ""}`}>
        <ul>
          {cars.map((car, index) => (
            <li key={index}>
              <a href="" className={`flex py-2 px-4`}>
                {car}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* )} */}
    </section>
  );
}
