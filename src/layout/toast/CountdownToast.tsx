import { useEffect, useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { LuClock, LuLoader } from 'react-icons/lu';

interface CountdownToastProps {
  onClose: () => void;
  isSigningOut?: boolean;
}

export default function CountdownToast({ onClose, isSigningOut = false }: CountdownToastProps) {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (isSigningOut) return;

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onClose, isSigningOut]);

  if (isSigningOut) {
    return (
      <div className="flex min-w-80 items-center gap-3 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 shadow-lg">
        <div className="flex-shrink-0">
          <LuLoader className="h-6 w-6 animate-spin text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-900">
            กำลังออกจากระบบ...
          </p>
          <p className="mt-1 text-xs text-blue-700">โปรดรอสักครู่</p>
        </div>
        <div className="flex-shrink-0">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-w-80 overflow-hidden rounded-lg border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 shadow-lg">
      {/* Progress bar */}
      <div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-1000 ease-linear"
        style={{ width: `${(countdown / 10) * 100}%` }}
      />

      <div className="flex items-center gap-3 p-4">
        <div className="flex-shrink-0">
          <div className="relative">
            <FiAlertTriangle className="h-6 w-6 text-red-600" />
            <div className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-red-500" />
          </div>
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-red-900">Token หมดอายุแล้ว!</p>
          <p className="mt-1 text-xs text-red-700">ระบบจะออกจากระบบอัตโนมัติ</p>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2">
          <LuClock className="h-4 w-4 text-red-600" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-red-300 bg-red-100">
            <span className="text-sm font-bold text-red-700">{countdown}</span>
          </div>
        </div>
      </div>

      {/* Animated dots */}
      <div className="absolute right-4 bottom-1 flex gap-1">
        <div
          className="h-1 w-1 animate-bounce rounded-full bg-red-400"
          style={{ animationDelay: '0ms' }}
        />
        <div
          className="h-1 w-1 animate-bounce rounded-full bg-red-400"
          style={{ animationDelay: '150ms' }}
        />
        <div
          className="h-1 w-1 animate-bounce rounded-full bg-red-400"
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  );
}
