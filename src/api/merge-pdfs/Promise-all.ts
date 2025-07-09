import { type NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  console.log('=== PDF Merge API Called ===');

  try {
    const { pdfUrls } = await request.json();

    if (!pdfUrls || !Array.isArray(pdfUrls) || pdfUrls.length === 0) {
      return NextResponse.json(
        { error: 'PDF URLs array is required' },
        { status: 400 }
      );
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
      // จัดการเป็น PDF โดยใช้ Promise.all
      const mergedPdf = await PDFDocument.create();

      // สร้าง array ของ promises สำหรับประมวลผล PDF แต่ละไฟล์
      const pdfPromises = pdfUrls.map(async (url, index) => {
        console.log(
          `Processing PDF ${index + 1}/${pdfUrls.length} from: ${url}`
        );

        try {
          // ดาวน์โหลด PDF จาก URL
          const response = await fetch(url);

          if (!response.ok) {
            console.error(`Failed to download PDF from ${url}:`, response.status, response.statusText);
            return null; // ส่งกลับ null สำหรับไฟล์ที่ไม่สำเร็จ
          }

          // อ่านข้อมูล PDF
          const pdfBytes = await response.arrayBuffer();

          if (pdfBytes.byteLength === 0) {
            console.error(`Downloaded PDF from ${url} is empty`);
            return null;
          }

          const pdf = await PDFDocument.load(pdfBytes);
          const pageIndices = pdf.getPageIndices();

          console.log(
            `Successfully loaded ${pageIndices.length} pages from URL ${index + 1}`
          );

          return { pdf, pageIndices, index };
        } catch (error) {
          console.error(`Error processing PDF from ${url}:`, error);
          return null;
        }
      });

      // รอให้ทุก PDF ประมวลผลเสร็จ
      const pdfResults = await Promise.all(pdfPromises);

      // กรอง null values และ sort ตาม index เพื่อให้ลำดับถูกต้อง
      const validPdfs = pdfResults
        .filter(result => result !== null)
        .sort((a, b) => a.index - b.index);

      // รวม PDF ทั้งหมด
      const copyPromises = validPdfs.map(async ({ pdf, pageIndices }) => {
        const copiedPages = await mergedPdf.copyPages(pdf, pageIndices);
        return copiedPages;
      });

      const allCopiedPages = await Promise.all(copyPromises);

      allCopiedPages.forEach(copiedPages => {
        copiedPages.forEach(page => mergedPdf.addPage(page));
      });

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
      // จัดการเป็น HTML โดยใช้ Promise.all
      const htmlPromises = pdfUrls.map(async (url, index) => {
        console.log(
          `Processing HTML ${index + 1}/${pdfUrls.length} from: ${url}`
        );

        try {
          const response = await fetch(url);

          if (!response.ok) {
            console.error(`Failed to download HTML from ${url}:`, response.status, response.statusText);
            return null;
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
          
          //เปลี่ยนจาก flag s เป็น [\s\S]*? ซึ่งจะทำงานเหมือนกัน:
          // s flag = dotall mode (. จับ newline ด้วย)
          // [\s\S]*? = จับทุกตัวอักษรรวมทั้ง whitespace และ non-whitespace (ก็คือทุกอย่างรวม newline)
          // ทั้งสองแบบจะให้ผลเหมือนกัน แต่ [\s\S]*? รองรับใน ES version เก่าๆ ด้วย
          
          const bodyMatch = content.match(/<body.*?>([\s\S]*?)<\/body>/);
          if (bodyMatch) {
            return { content: bodyMatch[1], index };
          }

          return null;
        } catch (error) {
          console.error(`Error processing HTML from ${url}:`, error);
          return null;
        }
      });

      // รอให้ทุก HTML ประมวลผลเสร็จ
      const htmlResults = await Promise.all(htmlPromises);

      // กรอง null values และ sort ตาม index เพื่อให้ลำดับถูกต้อง
      const validPages = htmlResults
        .filter(result => result !== null)
        .sort((a, b) => a.index - b.index)
        .map(result => result.content);

      if (validPages.length === 0) {
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
        ${validPages.map(page => `<div class="page">${page}</div>`).join('\n')}
        </body>
        </html>`;

      console.log('Generated HTML with', validPages.length, 'pages');

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
      details: error 
    }, { status: 500 });
  }
}
