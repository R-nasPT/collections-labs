// function ที่ใช้สำหรับการกดที่นอกกล่อง
import { useEffect, useRef } from "react";

export default function useClickOutside(callbackFn: () => void) {
  // สร้างตัวแปร domNodeRef ที่ใช้ useRef เพื่อเก็บ reference ของ DOM node
  let domNodeRef = useRef<HTMLDivElement | null>(null);
  //   let domNodeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // สร้าง handler function ที่จะตรวจสอบว่า event เกิดขึ้นภายนอก domNodeRef หรือไม่
    let handler = (event: MouseEvent) => {
      // ถ้า event target ไม่ได้อยู่ภายใน domNodeRef, ให้เรียก callback function
      if (!domNodeRef.current?.contains(event.target as Node)) {
        callbackFn();
      }
    };

    // เพิ่ม event listener ที่จะเรียกใช้ handler เมื่อมี mousedown event
    document.addEventListener("mousedown", handler);

    // คืนค่า cleanup function เพื่อเอา event listener ออกเมื่อ component ถูก unmount
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [callbackFn]); // ใช้ callbackFn เป็น dependency เพื่อให้แน่ใจว่าค่า callbackFn ที่ถูกใช้เป็นค่าใหม่เสมอ

  // คืนค่า domNodeRef เพื่อให้ component ที่ใช้ hook นี้สามารถใช้อ้างอิง DOM node ได้
  return domNodeRef;
}
