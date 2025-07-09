import { type NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  console.log('=== PDF Merge API Called ===');
  
  try {
    const { pdfUrls } = await request.json();
    
    if (!pdfUrls || !Array.isArray(pdfUrls) || pdfUrls.length === 0) {
      return NextResponse.json({ error: 'PDF URLs array is required' }, { status: 400 });
    }
    
    console.log('Number of URLs to process:', pdfUrls.length);
    
    // ตรวจสอบ URL แรกเพื่อดูว่าเป็น PDF หรือ HTML
    const firstUrl = pdfUrls[0];
    let isPdf = false;
    
    try {
      const response = await fetch(firstUrl, { method: 'HEAD' });
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/pdf')) {
        isPdf = true;
      } else if (firstUrl.includes('zortout.com/Logistics/LabelShopeeP')) {
        isPdf = true;
      }
    } catch (error) {
      console.error('Error checking first URL:', error);
    }
    
    if (isPdf) {
      // จัดการเป็น PDF เหมือนเดิม
      const mergedPdf = await PDFDocument.create();
      // วนลูปแต่ละ URL และดาวน์โหลด + รวมเข้าด้วยกัน
      for (let i = 0; i < pdfUrls.length; i++) {
        const url = pdfUrls[i];
        console.log(`Processing PDF ${i + 1}/${pdfUrls.length} from: ${url}`);
        
        try {
           // ดาวน์โหลด PDF จาก URL
          const response = await fetch(url);
          
          if (!response.ok) {
            console.error(`Failed to download PDF from ${url}:`, response.status, response.statusText);
            continue; // ข้าม PDF นี้และทำต่อ
          }
          
          // อ่านข้อมูล PDF
          const pdfBytes = await response.arrayBuffer();
          
          if (pdfBytes.byteLength === 0) {
            console.error(`Downloaded PDF from ${url} is empty`);
            continue;
          }
          
          const pdf = await PDFDocument.load(pdfBytes);
          // คัดลอกหน้าทั้งหมดจาก PDF นี้
          const pageIndices = pdf.getPageIndices();
          const copiedPages = await mergedPdf.copyPages(pdf, pageIndices);
          
          // เพิ่มหน้าที่คัดลอกแล้วเข้าไปใน merged PDF
          copiedPages.forEach((page) => mergedPdf.addPage(page));
          
          console.log(`Successfully merged ${pageIndices.length} pages from URL ${i + 1}`);
          
        } catch (error) {
          console.error(`Error processing PDF from ${url}:`, error);
          // ไม่ throw error เพื่อให้ PDF อื่นๆ ที่เหลือยังทำงานได้
          continue;
        }
      }
      
      // ตรวจสอบว่ามี PDF ที่ merge สำเร็จหรือไม่
      const pageCount = mergedPdf.getPageCount();
      if (pageCount === 0) {
        return NextResponse.json({ 
          error: 'No PDFs could be merged successfully' 
        }, { status: 400 });
      }
      
      // สร้าง PDF ที่รวมแล้วเป็น bytes
      const mergedPdfBytes = await mergedPdf.save();
      const mergedPdfBuffer = Buffer.from(mergedPdfBytes);
      
      console.log('Merged PDF size:', mergedPdfBytes.length, 'bytes');
      console.log('Total pages in merged PDF:', pageCount);
      
      // ส่งกลับ PDF ที่รวมแล้ว
      return new NextResponse(mergedPdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Length': mergedPdfBytes.length.toString(),
          'Content-Disposition': 'attachment; filename="merged.pdf"',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
        },
      });
      
    } else {
      // จัดการเป็น HTML เหมือน PHP
      const pages: string[] = [];
      
      for (let i = 0; i < pdfUrls.length; i++) {
        const url = pdfUrls[i];
        console.log(`Processing HTML ${i + 1}/${pdfUrls.length} from: ${url}`);
        
        try {
          const response = await fetch(url);
          
          if (!response.ok) {
            console.error(`Failed to download HTML from ${url}:`, response.status, response.statusText);
            continue;
          }
          
          let content = await response.text();
          
          // ถ้าเป็น redirect จัดการเหมือน PHP
          if (response.status >= 300 && response.status <= 399) {
            const location = response.headers.get('location');
            if (location) {
              const redirectResponse = await fetch(location);
              if (redirectResponse.ok) {
                content = await redirectResponse.text();
              }
            }
          }
          
          // ดึงเฉพาะ body content เหมือน PHP
          const bodyMatch = content.match(/<body.*?>(.*?)<\/body>/s);
          if (bodyMatch) {
            pages.push(bodyMatch[1]);
          }
          
        } catch (error) {
          console.error(`Error processing HTML from ${url}:`, error);
          continue;
        }
      }
      
      if (pages.length === 0) {
        return NextResponse.json({ 
          error: 'No HTML pages could be processed successfully' 
        }, { status: 400 });
      }
      
      // สร้าง HTML ตามรูปแบบ PHP (ไม่มี script auto-print)
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Print Attachment - Siam Outlet</title>
    <style>
        @media only screen {
            body {
                background: #f8f9fa;
                padding: 20px;
            }

            .page {
                background: white;
                box-shadow: 3px 3px 6px 0 rgba(0, 0, 0, 0.4);
                margin-bottom: 20px;
            }
        }

        @media only print {
            .dont-print {
                display: none !important;
            }
        }
    </style>

    <style>
        @page {
            size: 105mm 148mm;
            margin: 0;
        }

        .page {
            width: 105mm;
            height: 148mm;
            page-break-after: always;
            overflow: hidden;
        }
    </style>
</head>
<body>
${pages.map(page => `    <div class="page">${page}</div>`).join('\n')}
</body>
</html>`;
      
      console.log('Generated HTML with', pages.length, 'pages');
      
      return new NextResponse(htmlContent, {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
    
  } catch (error) {
    console.error('Error processing files:', error);
    return NextResponse.json({ 
      error: 'Failed to process files', 
      details: error.message 
    }, { status: 500 });
  }
}
