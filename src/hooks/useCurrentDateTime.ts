import { useState, useEffect, useCallback } from "react";
import { formatDate, formatSeconds, formatTime } from "@/utils";

const useCurrentDateTime = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [seconds, setSeconds] = useState("");

  const updateDateTime = useCallback(() => {
    const now = new Date();
    setCurrentDate(formatDate(now));
    setCurrentTime(formatTime(now));
    setSeconds(formatSeconds(now));
  }, []);

  useEffect(() => {
    updateDateTime(); // อัพเดตครั้งแรกทันที
    const interval = setInterval(updateDateTime, 1000);
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
