import { useRouter } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

interface FilterState {
  [key: string]: string | number | null;
}

interface UseUrlFiltersOptions {
  initialFilters: FilterState;
  updateAllowed?: boolean;
  updateMethod?: "push" | "replace";
}

const useUrlFilters = ({ initialFilters, updateAllowed = true, updateMethod = "push" }: UseUrlFiltersOptions) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // รองรับพารามิเตอร์จาก URL: เมื่อเปิดหน้าที่มีพารามิเตอร์ใน URL เช่น ?page=1&category=books, 
  // ตัวกรองจะถูกตั้งค่าเริ่มต้นให้ตรงกับค่าที่อยู่ใน URL ทำให้ค่าที่แสดงใน UI ตรงกับสถานะ URL นั้น ๆ
  //  ช่วยให้ระบบกรองข้อมูลสามารถดึงข้อมูลจาก URL และค่าเริ่มต้นจาก initialFilters ได้พร้อมกัน 
  // ซึ่งช่วยให้รองรับการทำงานกับ URL ที่บันทึกไว้หรือถูกแชร์ได้ง่ายขึ้น
//   const [filters, setFilters] = useState<FilterState>(() => {
//     const urlFilters = Object.fromEntries(searchParams.entries());
//     return { ...initialFilters, ...urlFilters };
//   });
  // เหมาะสำหรับกรณีที่คุณไม่สนใจค่าจาก URL และต้องการการตั้งค่าเริ่มต้นง่าย ๆ โดยตรงจาก initialFilters
  // การตั้งค่า filters จะรวดเร็ว เพราะดึงค่าจากตัวแปร initialFilters ที่เป็นค่าเริ่มต้นเพียงอย่างเดียว ไม่ต้องคำนวณเพิ่มเติม
const [filters, setFilters] = useState<FilterState>(initialFilters);
  
console.log(Object.fromEntries(searchParams.entries()))
  const updateURL = useCallback(() => { 
    if (updateAllowed) { // ตรวจสอบว่าการอัปเดต URL ได้รับอนุญาตหรือไม่
      const params = new URLSearchParams();
      // แบบเก่า จัดรูปแบบไม่ได้
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== "" && value !== undefined) {
          params.append(key, value.toString());
        }
      });

      // ------ จัดรูปแบบได้ -----
      // แบบที่ 1
      // สร้างอาร์เรย์คีย์ที่ต้องใช้ในการเพิ่มพารามิเตอร์
      const keysToUse = parameterOrder.length > 0 ? parameterOrder : Object.keys(filters);

      // เพิ่มพารามิเตอร์ทั้งหมดในลูปเดียว
      keysToUse.forEach((key) => {
        const value = filters[key];
        if (value !== null && value !== "" && value !== undefined) {
          params.append(key, value.toString());
        }
      });

      // แบบที่ 2
      // ฟังก์ชันเพิ่มพารามิเตอร์ใน URL
      const addParameter = (key: string) => {
        const value = filters[key];
        if (value !== null && value !== "" && value !== undefined) {
          params.append(key, value.toString()); // แปลงค่าเป็นสตริงและเพิ่มใน URL
        }
      };

      // เพิ่มพารามิเตอร์ตามลำดับที่กำหนด
      parameterOrder.forEach(addParameter);

      // เพิ่มพารามิเตอร์ที่เหลืออยู่ที่ไม่ได้อยู่ในลำดับที่กำหนด
      Object.keys(filters).forEach(key => {
        if (!parameterOrder.includes(key)) {
          addParameter(key); // เพิ่มพารามิเตอร์ที่เหลือเข้าไปใน URL
        }
      });

      if (updateMethod === "replace") {
        router.replace(`?${params.toString()}`, { scroll: false });
      } else {
        router.push(`?${params.toString()}`, { scroll: false });
      }
    }
  }, [updateAllowed, parameterOrder, filters, updateMethod, router]);

  const handleFilterChange = useCallback((key: string, value: string | number | null) => {
      setFilters((prev) => {
        const newFilters = { ...prev, [key]: value };
        if (key !== "page" && newFilters.page !== undefined) {
          newFilters.page = 1;
        }
        return newFilters;
      });
    }, []);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  return {
    filters,
    handleFilterChange,
    setFilters,
  };
};

export default useUrlFilters;
