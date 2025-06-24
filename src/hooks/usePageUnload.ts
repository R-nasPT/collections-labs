// hooks/usePageUnload.ts
import { useEffect } from "react";
import { useAnalytics } from "@/hooks";

export const usePageUnload = () => {
  const { track } = useAnalytics();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // ตรวจสอบว่าไม่ใช่การ sign out แบบปกติ
      const isSigningOut = localStorage.getItem("is_signing_out") === "true";
      
      if (!isSigningOut) {
        // ใช้ useAnalytics ที่มีอยู่แล้ว
        track("session_ended", {
          reason: "browser_closed",
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const isSigningOut = localStorage.getItem("is_signing_out") === "true";
        
        if (!isSigningOut) {
          track("session_ended", {
            reason: "browser_closed",
          });
        }
      }
    };

    // เพิ่ม event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [track]);
};

// Alternative: สำหรับใช้กับ specific components
export const usePageUnloadTracking = (enabled: boolean = true) => {
  const { track } = useAnalytics();

  useEffect(() => {
    if (!enabled) return;

    const handlePageHide = () => {
      const isSigningOut = localStorage.getItem("is_signing_out") === "true";
      
      if (!isSigningOut) {
        track("session_ended", {
          reason: "browser_closed",
        });
      }
    };

    // pagehide event เป็น event ที่เชื่อถือได้ที่สุดสำหรับการปิด tab/browser
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [track, enabled]);
};
