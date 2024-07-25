"use client";
import Checkbox from "@/components/common/checkbox";
import Drawer from "@/components/common/drawer";
import { useState } from "react";

export default function Advices() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_0_3px_rgba(0,0,0,0.3)]">
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Drawer Content</h2>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            ปิด Drawer
          </button>
        </div>
      </Drawer>

      {/* ----- Desktop ----- */}
      <table className="hidden lg:table w-full text-sm text-[#280d5f] text-left">
        <thead>
          <tr className="border-b border-[#e0e0e0]">
            <th className="p-1">
              <Checkbox id={`1`} />
            </th>
            <th className="font-normal p-4">Code</th>
            <th className="font-normal p-4">Reference</th>
            <th className="font-normal p-4">Item Count</th>
            <th className="font-normal p-4">Note</th>
            <th className="font-normal p-4">Last Update</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }, (_, index) => (
            <tr key={index} className="border-b border-[#e0e0e0] hover:bg-gray-100 transition-colors duration-200 cursor-pointer" onClick={() => setIsDrawerOpen(true)}>
              <td className="p-1 cursor-default bg-white" onClick={(e) => e.stopPropagation()}>
                <Checkbox id={`checkbox-${index}`} />
              </td>
              <td className="p-4 flex flex-col gap-1 items-center">
                <div className="flex items-center gap-2 border border-[#a07ee4] text-[#7645d9] text-[13px] cursor-pointer hover:bg-gray-100 pl-1 pr-2 py-[.5px] w-fit rounded-full transition-colors duration-300">
                  <div className="p-[6px] bg-[#ffb864] rounded-full"></div>
                  <span>Pending </span>
                </div>
                <p className="text-[13px] text-[#7c70ab]">31480</p>
              </td>
              <td className="p-4">PO-202407025</td>
              <td className="p-4">23</td>
              <td className="p-4">ค่ารถ + ค่าล่วงเวลา 3,560 บาท</td>
              <td className="p-4">Thu 11 Jul 2024 09:37:17</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ----- Mobile ----- */}
      <table className="w-full lg:hidden">
        <tbody>
          <tr className="border-b border-[#e0e0e0]" onClick={() => setIsDrawerOpen(true)}>
            <td className="p-4">
              <span className="text-[#7a6eaa] text-xs">Document Code</span>
              <p className="text-[#280d5f]">30849</p>
              <div className="flex items-center gap-2 border border-[#a07ee4] text-[#7645d9] text-[13px] cursor-pointer hover:bg-gray-100 pl-1 pr-2 py-[.5px] w-fit rounded-full transition-colors duration-300">
                <div className="p-[6px] bg-[#ffb864] rounded-full"></div>
                <span>Pending </span>
              </div>
            </td>
            <td className="p-4">
              <span className="text-[#7a6eaa] text-xs">Reference</span>
              <p className="text-[#280d5f]">PO-202407025</p>
            </td>
          </tr>
          <tr className="border-b border-[#e0e0e0]">
            <td className="p-4">
              <span className="text-[#7a6eaa] text-xs">Document Code</span>
              <p className="text-[#280d5f]">30849</p>
              <div className="flex items-center gap-2 border border-[#a07ee4] text-[#7645d9] text-[13px] cursor-pointer hover:bg-gray-100 pl-1 pr-2 py-[.5px] w-fit rounded-full transition-colors duration-300">
                <div className="p-[6px] bg-[#ffb864] rounded-full"></div>
                <span>Pending </span>
              </div>
            </td>
            <td className="p-4">
              <span className="text-[#7a6eaa] text-xs">Reference</span>
              <p className="text-[#280d5f]">PO-202407025</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
