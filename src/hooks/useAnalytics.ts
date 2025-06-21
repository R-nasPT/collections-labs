"use client";

import { usePathname } from "@/navigation";
import { useCallback } from "react";

type AnalyticsValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | string[]
  | number[]
  | boolean[]
  | Record<string, unknown>;

type AnalyticsData<T = Record<string, AnalyticsValue>> = {
  [K in keyof T]: T[K];
};

interface UseAnalyticsReturn {
  track: <T extends Record<string, AnalyticsValue>>(
    event: string,
    additionalData?: AnalyticsData<T>
  ) => void;
}

        // ================================================ Log ================================================

const logToConsole = useCallback((event: string, data: Record<string, AnalyticsValue>, pathname: string) => {
    // ตรวจสอบว่าอยู่ในโหมด development
    if (process.env.NODE_ENV === 'development') {
      const timestamp = new Date().toLocaleString('th-TH', {
        timeZone: 'Asia/Bangkok',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      // สีสันแบบสุ่มสำหรับแต่ละ event
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8', '#fdcb6e', '#6c5ce7'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      // ASCII Art Header
      const asciiArt = `
   ░█████╗░███╗░░██╗░█████╗░██╗░░░░░██╗░░░██╗████████╗██╗░█████╗░░██████╗
   ██╔══██╗████╗░██║██╔══██╗██║░░░░░╚██╗░██╔╝╚══██╔══╝██║██╔══██╗██╔════╝
   ███████║██╔██╗██║███████║██║░░░░░░╚████╔╝░░░░██║░░░██║██║░░╚═╝╚█████╗░
   ██╔══██║██║╚████║██╔══██║██║░░░░░░░╚██╔╝░░░░░██║░░░██║██║░░██╗░╚═══██╗
   ██║░░██║██║░╚███║██║░░██║███████╗░░░██║░░░░░░██║░░░██║╚█████╔╝██████╔╝
   ╚═╝░░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝╚══════╝░░░╚═╝░░░░░░╚═╝░░░╚═╝░╚════╝░╚═════╝░`;

      // แสดง ASCII Art (เฉพาะครั้งแรกหรือเมื่อต้องการ)
      if (Math.random() < 0.1) { // 10% chance แสดง ASCII Art
        console.log(`%c${asciiArt}`, `color: ${randomColor}; font-weight: bold; font-size: 8px;`);
      }

      // แสดงผลแบบสวยงาม
    //   console.log(`%c🚀 ✨ ANALYTICS EVENT TRACKED ✨ 🚀`, `background: linear-gradient(45deg, ${randomColor}, ${randomColor}dd); color: white; padding: 12px 20px; border-radius: 8px 8px 0 0; font-weight: bold; font-size: 16px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);`);
      
      console.log(
        `%c🚀 ✨ ANALYTICS EVENT TRACKED ✨ 🚀`,
        `background: ${randomColor}; color: white; padding: 10px 20px; border-radius: 25px; font-weight: bold; font-size: 16px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.2);`
      );
      
      console.log(
        `%c📊 ${event.toUpperCase()}`,
        `color: ${randomColor}; font-size: 20px; font-weight: bold; margin: 10px 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);`
      );
      
      console.log(
        `%c🌐 ${pathname} %c⏰ ${timestamp}`,
        `color: #3498db; font-weight: bold; background: rgba(52, 152, 219, 0.1); padding: 4px 8px; border-radius: 12px;`,
        `color: #e67e22; font-weight: bold; background: rgba(230, 126, 34, 0.1); padding: 4px 8px; border-radius: 12px; margin-left: 10px;`
      );
      
      if (Object.keys(data).length > 0) {
        console.log(
          `%c📋 ${Object.keys(data).length} properties`,
          `color: #27ae60; font-weight: bold; background: rgba(39, 174, 96, 0.1); padding: 4px 8px; border-radius: 12px;`
        );
      }

      // แสดงข้อมูลเพิ่มเติมถ้ามี
      if (Object.keys(data).length > 0) {
        console.log(`%c📊 DATA TABLE:`, `color: ${randomColor}; font-weight: bold; font-size: 14px; margin-top: 10px;`);
        console.table(data);
      }

      const sparkles = ['✨', '⭐', '🌟', '💫', '🔥', '🎯', '🎪', '🎨'];
      const randomSparkle = sparkles[Math.floor(Math.random() * sparkles.length)];
      
      console.log(`%c${randomSparkle} ${'═'.repeat(50)} ${randomSparkle}`, `color: ${randomColor}; font-weight: bold; font-size: 12px;`);
      
      console.group(`%c📦 Raw JSON Data`, `color: ${randomColor}; font-weight: bold; font-size: 14px;`);
      console.log(`%c${JSON.stringify({
        event,
        url: pathname,
        timestamp: new Date().toISOString(),
        ...data,
      }, null, 2)}`, 'color: #2c3e50; font-family: Monaco, monospace; background: #ecf0f1; padding: 10px; border-radius: 4px;');
      console.groupEnd();

      // Performance info
      console.log(`%c⚡ Tracked in ${performance.now().toFixed(2)}ms`, 'color: #27ae60; font-weight: bold; font-style: italic;');

    } else {
      // สำหรับ production ใช้ console ธรรมดา
      console.info('📊 Analytics:', {
        event,
        url: pathname,
        timestamp: new Date().toISOString(),
        ...data,
      });
    }
  }, [pathname]);
        // ================================================ Log End ================================================

        // ================================================ Analytics ================================================
const useAnalytics = (): UseAnalyticsReturn => {
  const pathname = usePathname();

  const track = useCallback(
    <T extends Record<string, AnalyticsValue>>(
      event: string,
      additionalData: AnalyticsData<T> = {} as AnalyticsData<T>
    ) => {
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event,
          url: pathname,
          timestamp: new Date().toISOString(),
          ...additionalData,
        });
        logToConsole(event, additionalData, pathname);
      }
    },
    [pathname]
  );

  return { track };
};
      // ================================================ Analytics ================================================

export default useAnalytics;
export type { AnalyticsData, AnalyticsValue };
