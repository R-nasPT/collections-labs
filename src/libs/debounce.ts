export const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
};

// วิธีใช้ ----

import { debounce } from './libs/debounce';

const handleInputChange = (event) => {
  console.log('Input changed:', event.target.value);
};

const debouncedHandleInputChange = debounce(handleInputChange, 300);

// ใน component
<input type="text" onChange={debouncedHandleInputChange} />
  
//เมื่อผู้ใช้พิมพ์ข้อความในช่อง input debouncedHandleInputChange จะถูกเรียกใช้ แต่จริงๆ 
//แล้ว handleInputChange จะถูกเรียกใช้หลังจากที่ผู้ใช้หยุดพิมพ์ไป 300 มิลลิวินาที (หรือ 0.3 วินาที) เท่านั้น 
//ทำให้ลดจำนวนการเรียกใช้ฟังก์ชันที่ไม่จำเป็นลงได้มาก
