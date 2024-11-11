import { cn } from "@/utils";

interface MultiLinkOpenerProps {
  links: string[];
  buttonText?: string;
  buttonClassName?: string;
  layout?: "vertical" | "horizontal";
  heights?: string[];
}

export default function MultiLinkOpener({
  links = [],
  buttonText = "เปิดลิงค์ทั้งหมด",
  buttonClassName = "",
}: MultiLinkOpenerProps) {
  const handleOpenLinks = () => {
    if (links.length === 0) return;

    const newWindow = window.open("", "_blank");

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Documents</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              margin: 0;
              padding: 0;
              width: 100vw;
              height: 100vh;
              overflow: hidden;
            }
            .tab-container {
              width: 100%;
              height: 40px;
              background: #f1f5f9;
              display: flex;
              overflow-x: auto;
              border-bottom: 1px solid #e2e8f0;
            }
            .tab {
              padding: 0 16px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: white;
              border: none;
              border-right: 1px solid #e2e8f0;
              cursor: pointer;
              white-space: nowrap;
              font-family: system-ui, -apple-system, sans-serif;
            }
            .tab.active {
              background: white;
              border-bottom: 2px solid #3b82f6;
            }
            .content {
              width: 100%;
              height: calc(100vh - 40px);
              position: relative;
            }
            .frame-container {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              display: none;
            }
            .frame-container.active {
              display: block;
            }
          </style>
        </head>
        <body>
          <div class="tab-container">
            ${links.map((link, index) => `
              <button class="tab ${index === 0 ? 'active' : ''}" onclick="switchTab(${index})">
                Document ${index + 1}
              </button>
            `).join('')}
          </div>
          <div class="content">
            ${links.map((link, index) => `
              <div class="frame-container ${index === 0 ? 'active' : ''}" id="frame-${index}">
                <iframe
                  src="${link}"
                  style="width: 100%; height: 100%; border: none;"
                  loading="lazy"
                ></iframe>
              </div>
            `).join('')}
          </div>
          <script>
            function switchTab(index) {
              // Remove active class from all tabs and frames
              document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
              document.querySelectorAll('.frame-container').forEach(frame => frame.classList.remove('active'));

              // Add active class to selected tab and frame
              document.querySelectorAll('.tab')[index].classList.add('active');
              document.getElementById('frame-' + index).classList.add('active');
            }
          </script>
        </body>
      </html>
    `;

    newWindow?.document.write(html);
    newWindow?.document.close();
  };

  return (
    <button
      onClick={handleOpenLinks}
      className={cn(
        "px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        buttonClassName
      )}
      disabled={links.length === 0}
    >
      {buttonText}
    </button>
  );
}

// ------ example ------

const links = [
      'https://links-1',
      'https://links-2',
      'https://links-3',
    ];
<MultiLinkOpener links={links} heights={['100vh']} layout="horizontal"/>

