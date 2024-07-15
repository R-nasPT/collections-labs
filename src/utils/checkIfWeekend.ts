function checkIfWeekend(date) {
  // สร้าง Date object จากวันที่ที่ต้องการตรวจสอบ
  const day = new Date(date).getDay();
  
  // ตรวจสอบว่าวันที่เป็นวันเสาร์หรือวันอาทิตย์หรือไม่
  // day === 0 หมายถึงวันอาทิตย์ และ day === 6 หมายถึงวันเสาร์
  return day === 0 || day === 6;
}
