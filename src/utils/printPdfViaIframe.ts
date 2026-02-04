export const printPdfViaIframe = async (url: string): Promise<void> => {
  // ถ้าเป็น blob: URL อยู่แล้ว ใช้เลย
  // ถ้าไม่ใช่ (cross-origin) ให้ fetch มาสร้าง blob ก่อน
  const printUrl = url.startsWith('blob:') 
    ? url 
    : await fetchAsBlobUrl(url);

  return new Promise((resolve, reject) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = printUrl;
    document.body.appendChild(iframe);

    iframe.onload = () => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        
        const cleanup = () => {
          setTimeout(() => {
            document.body.removeChild(iframe);
            if (!url.startsWith('blob:')) URL.revokeObjectURL(printUrl);
            resolve();
          }, 100);
        };

        iframe.contentWindow?.addEventListener('afterprint', cleanup, { once: true });
      } catch (error) {
        reject(error);
      }
    };

    iframe.onerror = () => {
      document.body.removeChild(iframe);
      if (!url.startsWith('blob:')) URL.revokeObjectURL(printUrl);
      reject(new Error('Failed to load PDF'));
    };
  });
};

const fetchAsBlobUrl = async (url: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch PDF');
  const blob = await response.blob();
  
  // สร้าง blob ใหม่ force type เป็น PDF
  const pdfBlob = new Blob([blob], { type: 'application/pdf' });
  return URL.createObjectURL(pdfBlob);
};
