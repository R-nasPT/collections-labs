import { format } from "date-fns";
import { th, enUS } from "date-fns/locale";
import { useTranslations } from "next-intl";

export const formatDate1 = (date: Date, localeCode: string): string => {
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
