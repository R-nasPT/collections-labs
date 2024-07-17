import { ReactNode } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Accordion({
  title,
  children,
  className,
  icon,
  isOpen,
  onToggle,
}: AccordionProps) {
  return (
    <div>
      <button
        className={`flex justify-between w-full ${className}`}
        onClick={onToggle}
      >
        <div>{title}</div>
        {icon}
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

//1. วิธีใช้ Array:
import { useState } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import Accordion from './Accordion';

function AccordionGroup() {
  const [openAccordions, setOpenAccordions] = useState([false, false, false]);

  const toggleAccordion = (index) => {
    setOpenAccordions(prevState => 
      prevState.map((item, i) => i === index ? !item : item)
    );
  };

  const accordionData = [
    { title: "หัวข้อที่ 1", content: "เนื้อหาที่ 1" },
    { title: "หัวข้อที่ 2", content: "เนื้อหาที่ 2" },
    { title: "หัวข้อที่ 3", content: "เนื้อหาที่ 3" },
  ];

  return (
    <div>
      {accordionData.map((item, index) => (
        <Accordion
          key={index}
          title={item.title}
          icon={<MdKeyboardArrowDown className="w-6 h-6" />}
          isOpen={openAccordions[index]}
          onToggle={() => toggleAccordion(index)}
        >
          {item.content}
        </Accordion>
      ))}
    </div>
  );
}

// 2. วิธีใช้ Object:
import { useState } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import Accordion from './Accordion';

function AccordionGroup() {
  const [openAccordions, setOpenAccordions] = useState({
    accordion1: false,
    accordion2: false,
    accordion3: false,
  });

  const toggleAccordion = (id) => {
    setOpenAccordions(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const accordionData = [
    { id: 'accordion1', title: "หัวข้อที่ 1", content: "เนื้อหาที่ 1" },
    { id: 'accordion2', title: "หัวข้อที่ 2", content: "เนื้อหาที่ 2" },
    { id: 'accordion3', title: "หัวข้อที่ 3", content: "เนื้อหาที่ 3" },
  ];

  return (
    <div>
      {accordionData.map((item) => (
        <Accordion
          key={item.id}
          title={item.title}
          icon={<MdKeyboardArrowDown className="w-6 h-6" />}
          isOpen={openAccordions[item.id]}
          onToggle={() => toggleAccordion(item.id)}
        >
          {item.content}
        </Accordion>
      ))}
    </div>
  );
}

//ทั้งสองวิธีนี้มีข้อดีต่างกัน:
//วิธีใช้ Array เหมาะสำหรับกรณีที่ Accordion มีจำนวนคงที่และไม่มีการเพิ่มหรือลบ
//วิธีใช้ Object เหมาะสำหรับกรณีที่ Accordion อาจมีการเพิ่มหรือลบแบบไดนามิก และต้องการอ้างอิงด้วย id แทนตำแหน่ง

// นอกจากนี้ คุณอาจต้องการฟังก์ชันเพิ่มเติม เช่น การเปิดเพียง Accordion เดียวในเวลาเดียวกัน:
const toggleAccordion = (id) => {
  setOpenAccordions(prevState => {
    const newState = Object.keys(prevState).reduce((acc, key) => {
      acc[key] = key === id ? !prevState[key] : false;
      return acc;
    }, {});
    return newState;
  });
};

// วิธีนี้จะปิด Accordion อื่นๆ เมื่อเปิด Accordion ใหม่
