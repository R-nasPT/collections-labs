============= hook ==============
import { useMutation } from '@tanstack/react-query';

const mergePdfs = async (pdfUrls: string[]) => {
  const response = await fetch('/api/merge-pdfs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pdfUrls }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Failed to merge PDFs: ${errorData.error || response.statusText}`
    );
  }

  // รับ merged PDF blob
  const mergedBlob = await response.blob();

  if (mergedBlob.size === 0) {
    throw new Error('ไฟล์ PDF ที่ merge แล้วมีขนาด 0 bytes');
  }

  return mergedBlob;
};

export const useMergePdfs = () => {
  return useMutation<Blob, Error, string[]>({
    mutationFn: mergePdfs,
    onSuccess: (data) => {
      console.info('PDF merge successful, blob size:', data.size);
    },
    onError: (error) => {
      console.error('Error during PDF merge:', error);
    },
  });
};


================== component ======================
'use client';

import type { DeliveryOrderTypes } from '@/types';
import { Button} from '@/components/ui';
import { useEffect, useRef, useState } from 'react';
import { LoadingIcon } from '@/lib/icons';


export default function BatchPickContainer() {

  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  const printRef = useRef<HTMLIFrameElement>(null);




  // ฟังก์ชันสำหรับการพิมพ์
  const handlePrint = async () => {
  if (!orders || orders.length === 0) {
    showNotification('ไม่พบข้อมูล orders', 'error');
    return;
  }

  try {
    // เก็บ URL ของ PDF ที่ต้องการ merge
    console.log('Collecting PDF URLs from orders...');
    
    const pdfUrls = orders
      .map(order => {
        if (order.attachments && 
            Array.isArray(order.attachments) && 
            order.attachments.length > 0 && 
            order.attachments[0]?.link) {
          
          console.log(`Added PDF URL for order ${order.id}`);
          return order.attachments[0].link;
        } else {
          console.warn(`Order ${order.id} has no valid attachment link`);
          showNotification(`Order ${order.id} ไม่มีไฟล์ PDF แนบ`, 'warning');
          return null;
        }
      })
      .filter(url => url !== null);

    if (pdfUrls.length === 0) {
      showNotification('ไม่พบไฟล์ PDF ที่จะพิมพ์', 'error');
      return;
    }

    console.log(`Found ${pdfUrls.length} PDF URLs to merge`);

    /// ใช้ hook สำหรับ merge PDFs
      const mergedBlob = await mergePdfs(pdfUrls);

    // สร้าง URL สำหรับ merged PDF
    const url = URL.createObjectURL(mergedBlob);
    setMergedPdfUrl(url);
    console.log('Created object URL for merged PDF');

    // เปิด PDF ใน iframe และพิมพ์
    setTimeout(() => {
      if (printRef.current) {
        printRef.current.onload = () => {
          console.log('PDF loaded in iframe, triggering print...');
          printRef.current?.contentWindow?.print();
        };
      }
    }, 1000);
showNotification(`พิมพ์ไฟล์ PDF สำเร็จ (${pdfUrls.length} ไฟล์)`, 'success');
  } catch (error) {
    console.error('Error during print process:', error);
    showNotification(`เกิดข้อผิดพลาดในการพิมพ์: ${error.message}`, 'error');
  }
};
  // ทำความสะอาด URL เมื่อ component unmount
  useEffect(() => {
    return () => {
      if (mergedPdfUrl) {
        URL.revokeObjectURL(mergedPdfUrl);
      }
    };
  }, [mergedPdfUrl]);

  return (
    <>
      


          <Button
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
            onClick={handlePrint}
            disabled={!orders || orders.length === 0 || isPrinting}
          >
            {isPrinting ? (
              <LoadingIcon className="h-4 w-4 animate-spin" />
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            )}
            {isPrinting ? 'กำลังพิมพ์...' : 'พิมพ์เอกสาร'}
          </Button>
  

  

      {mergedPdfUrl && (
        <iframe
          ref={printRef}
          src={mergedPdfUrl}
          // style={{ display: 'none' }}
          title="Print Document"
        />
      )}


    </>
  );
}
