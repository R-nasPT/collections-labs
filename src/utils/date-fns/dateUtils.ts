import { format } from "date-fns";
import { th, enUS } from "date-fns/locale";
import { useTranslations } from "next-intl";

export const formatDate = (date: Date, localeCode: string): string => {
  const locale = localeCode === "th" ? th : enUS;
  
  // ฟังก์ชันสำหรับแปลงปี คริสตศักราช เป็น พุทธศักราช
  const toBuddhistYear = (year: number) => year + 543;

  // การจัดรูปแบบวันที่
  const formattedDate = format(date, "dd/MM/yyyy", { locale });
  
  // แยกปีออกมา
  const [day, month, year] = formattedDate.split("/");

  if (localeCode === "th") {
    // แปลงปีเป็น พุทธศักราช
    const buddhistYear = toBuddhistYear(parseInt(year, 10));
    return `${day}/${month}/${buddhistYear}`;
  } else {
    // สำหรับภาษาอังกฤษ ใช้ คริสตศักราช
    return formattedDate;
  }
};

export const formatDateShort = (date: Date, localeCode: string): string => {
  const locale = localeCode === "th" ? th : enUS;
  
  // ฟังก์ชันสำหรับแปลงปี คริสตศักราช เป็น พุทธศักราช
  const toBuddhistYear = (year: number) => year + 543;

  // รูปแบบวันที่สำหรับภาษาไทย
  const thaiMonthNames = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
  ];
  
  if (localeCode === "th") {
    const day = format(date, "d", { locale: th });
    const month = format(date, "M", { locale: th });
    const year = format(date, "yyyy", { locale: th });
    const buddhistYear = toBuddhistYear(parseInt(year, 10));
    return `${day} ${thaiMonthNames[parseInt(month, 10) - 1]} ${buddhistYear}`;
  } else {
    // รูปแบบวันที่สำหรับภาษาอังกฤษ
    return format(date, "d MMM yyyy", { locale: enUS });
  }
};

export const formatTime = (date: Date, localeCode: string): string => {
  if (localeCode === "th") {
    // สำหรับภาษาไทย ใช้รูปแบบ 24 ชั่วโมงและเพิ่ม "น." หลังเวลา
    return format(date, "HH:mm 'น.'", { locale: th });
  } else {
    // สำหรับภาษาอังกฤษ ใช้รูปแบบ 24 ชั่วโมง
    return format(date, "HH:mm 'hrs.'", { locale: enUS });
  }
};
