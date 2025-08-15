import type { MediaUploadResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState, useRef, useEffect } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';
import { NEXT_PUBLIC_AZURE_STORAGE_CONNECTION_STRING, NEXT_PUBLIC_AZURE_STORAGE_CONTAINER_NAME } from '@/config/env';

export const useVideoUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const progressRef = useRef(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Cleanup function ที่ใช้ทั่วไป
  const cleanup = useCallback(() => {
    if (animationFrameRef.current !== undefined) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
    progressRef.current = 0;
    setUploadProgress(0);
  }, []);

  // Cleanup เมื่อ component unmount
  useEffect(() => {
    return cleanup; // จะถูกเรียกเมื่อ component unmount
  }, [cleanup]);

  const smoothUpdateProgress = useCallback((targetProgress: number) => {
    // หยุด animation เก่าก่อนเริ่มใหม่
    if (animationFrameRef.current !== undefined) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const animate = () => {
      const currentProgress = progressRef.current;
      const diff = targetProgress - currentProgress;
      
      if (Math.abs(diff) < 0.1) {
        progressRef.current = targetProgress;
        setUploadProgress(Math.round(targetProgress));
        animationFrameRef.current = undefined; // เคลียร์เมื่อจบ
        return;
      }

      // ใช้ easing เพื่อให้การเคลื่อนไหวดูเป็นธรรมชาติ
      const step = diff * 0.05; // ลดความเร็วให้ช้าลงอีก
      progressRef.current = currentProgress + step;
      setUploadProgress(Math.round(progressRef.current));
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const mutation = useMutation<MediaUploadResponse, Error, File>({
    mutationFn: async (file: File) => {
      try {
        // Reset progress และ cleanup animation เก่า
        cleanup();
        progressRef.current = 0;
        setUploadProgress(0);

        // Phase 1: เริ่มต้น (0-10%)
        smoothUpdateProgress(5);
        await new Promise(resolve => setTimeout(resolve, 300));
        smoothUpdateProgress(10);
        
        const blobServiceClient = BlobServiceClient.fromConnectionString(NEXT_PUBLIC_AZURE_STORAGE_CONNECTION_STRING!);
        const containerClient = blobServiceClient.getContainerClient(NEXT_PUBLIC_AZURE_STORAGE_CONTAINER_NAME!);
        const blockBlobClient = containerClient.getBlockBlobClient(file.name);

        const arrayBuffer = await file.arrayBuffer();
        const totalBytes = arrayBuffer.byteLength;

        // Phase 2: เตรียมการอัปโหลด (10-20%)
        smoothUpdateProgress(15);
        await new Promise(resolve => setTimeout(resolve, 200));
        smoothUpdateProgress(20);

        // คำนวณเวลาขั้นต่ำตามขนาดไฟล์
        const fileSizeMB = file.size / (1024 * 1024);
        const baseTime = 2000; // 2 วินาทีพื้นฐาน
        const additionalTime = Math.min(fileSizeMB * 200, 8000); // เพิ่มสูงสุด 8 วินาที
        const minUploadDuration = baseTime + additionalTime;
        
        console.log(`File size: ${fileSizeMB.toFixed(1)}MB, Min duration: ${minUploadDuration}ms`);
        
        const uploadStartTime = Date.now();
        let lastAzureProgress = 0;

        await blockBlobClient.uploadData(arrayBuffer, {
          blobHTTPHeaders: { 
            blobContentType: file.type,
            blobCacheControl: 'public, max-age=31536000',
          },
          metadata: {
            uploadedby: 'webapp-v12-15',
            timestamp: Date.now().toString(),
            originalname: file.name,
            filesize: file.size.toString(),
          },
          onProgress: (progress) => {
            if (progress.loadedBytes && totalBytes) {
              const azurePercent = Math.round((progress.loadedBytes / totalBytes) * 100);
              
              // คำนวณ progress ที่จะแสดง (20-75%) 
              const displayPercent = 20 + (azurePercent * 0.55);
              
              // ใช้เวลาที่ผ่านไปควบคุม progress ด้วย (สำหรับไฟล์เล็ก)
              const elapsedTime = Date.now() - uploadStartTime;
              const timeBasedProgress = Math.min((elapsedTime / minUploadDuration) * 55, 55) + 20;
              
              // สำหรับไฟล์ใหญ่ ให้ใช้ Azure progress เป็นหลัก
              const isLargeFile = fileSizeMB > 5; // ไฟล์ใหญ่กว่า 5MB
              const targetProgress = isLargeFile 
                ? Math.min(displayPercent, 75) // ไฟล์ใหญ่ใช้ Azure progress
                : Math.min(Math.max(displayPercent, timeBasedProgress), 75); // ไฟล์เล็กใช้ time-based
              
              // อัพเดทเฉพาะเมื่อมีการเปลี่ยนแปลง
              if (targetProgress > lastAzureProgress + 0.3) {
                smoothUpdateProgress(targetProgress);
                lastAzureProgress = targetProgress;
              }
            }
          },
          blockSize: 4 * 1024 * 1024,
          concurrency: 3,
          maxSingleShotSize: 32 * 1024 * 1024,
        });

        // รอให้ครบเวลาขั้นต่ำถ้ายังไม่ครบ (เฉพาะไฟล์เล็ก)
        const remainingTime = minUploadDuration - (Date.now() - uploadStartTime);
        if (remainingTime > 0 && fileSizeMB <= 5) {
          // ขยับ progress ช้าๆ ระหว่างรอ (เฉพาะไฟล์เล็ก)
          const currentProgress = progressRef.current;
          const targetBeforeWait = Math.min(currentProgress + 3, 78);
          smoothUpdateProgress(targetBeforeWait);
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }

        // Phase 3: เสร็จสิ้นการอัปโหลด (75-90%)
        smoothUpdateProgress(82);
        await new Promise(resolve => setTimeout(resolve, 600));
        smoothUpdateProgress(90);
        await new Promise(resolve => setTimeout(resolve, 400));

        // Phase 4: ขั้นตอนสุดท้าย (90-100%) - บังคับให้เห็น 100%
        smoothUpdateProgress(95);
        await new Promise(resolve => setTimeout(resolve, 600));
        smoothUpdateProgress(98);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // บังคับให้ไปถึง 100% และรอให้ animation จบ
        smoothUpdateProgress(100);
        
        // รอให้ smooth animation ทำงานจนจบ และเห็น 100% ชัดๆ
        await new Promise(resolve => {
          const checkProgress = () => {
            if (Math.round(progressRef.current) >= 100) {
              // รอเพิ่มอีก 1 วินาทีหลังเห็น 100%
              setTimeout(resolve, 1000);
            } else {
              // ตรวจสอบทุก 50ms จนกว่าจะถึง 100%
              setTimeout(checkProgress, 50);
            }
          };
          checkProgress();
        });

        const { origin, pathname } = new URL(blockBlobClient.url);

        return {
          contentType: file.type,
          filename: file.name,
          link: `${origin}${pathname}`,
        };

      } catch (error) {
        console.error('❌ Azure SDK upload error:', error);
        cleanup(); // cleanup เมื่อเกิด error
        throw new Error('Header issue persists. Try older Azure SDK version (12.27.0 or older)');
      }
    },
    onSuccess: (data) => {
      console.info('🎉 Upload succeeded with clean Azure SDK:', data);
      // รอให้ user เห็น 100% นานหน่อย แล้วค่อย cleanup
      setTimeout(() => {
        cleanup();
      }, 2000); // เพิ่มเวลาให้เห็น 100% นานขึ้น
    },
    onError: (error) => {
      console.error('💥 Upload failed:', error);
      setTimeout(() => {
        cleanup();
      }, 1000);
    },
  });

  return {
    ...mutation,
    uploadProgress,
  };
};
