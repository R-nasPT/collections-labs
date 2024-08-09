import { useState, useEffect, useCallback } from "react";
import { formatDate, formatSeconds, formatTime } from "@/utils";

const useCurrentDateTime = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [seconds, setSeconds] = useState("");

  const updateDateTime = useCallback(() => {
    const now = new Date();
    const newDate = formatDate(now);
    const newTime = formatTime(now);
    const newSeconds = formatSeconds(now);

    setCurrentDate(newDate);
    setCurrentTime(newTime);
    setSeconds(newSeconds);
  }, []);

  useEffect(() => {
    updateDateTime(); // อัพเดตครั้งแรกทันที

    const interval = setInterval(() => {
      const now = new Date();
      const newSeconds = formatSeconds(now);
      setSeconds(newSeconds);

      // ตรวจสอบการเปลี่ยนแปลงของวันและชั่วโมง
      if (now.getMinutes() === 0 && now.getSeconds() === 0) {
        // อัพเดตทุกชั่วโมง
        updateDateTime();
      } else if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
        // อัพเดตเมื่อเปลี่ยนวัน
        updateDateTime();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [updateDateTime]);

  return { currentDate, currentTime, seconds };
};

export default useCurrentDateTime;

// ----------------------
export const formatDate = (date: Date | string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

export const formatTime = (date: Date | string) => {
  const newDate = new Date(date);
  return newDate.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatSeconds = (date: Date | string) => {
  const newDate = new Date(date);
  return newDate.toLocaleTimeString("th-TH", {
    second: "2-digit",
  });
};

const { currentDate, currentTime, seconds } = useCurrentDateTime();
<p>{currentDate} {currentTime}:{seconds} </p>
