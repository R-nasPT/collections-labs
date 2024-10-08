import ExcelJS from "exceljs";
interface Column {
  header: string;
  key: string;
  width: number;
  style?: Partial<ExcelJS.Style>;
}

interface ExportOptions {
  data: any[];
  columns: Column[];
  sheetName?: string;
  filename?: string;
  headerStyle?: Partial<ExcelJS.Style>;
  rowStyle?: Partial<ExcelJS.Style>;
}

const defaultHeaderStyle: Partial<ExcelJS.Style> = {
  fill: {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4F81BD' },  // สีพื้นหลัง
  },
  font: {
    bold: true,
    color: { argb: 'FFFFFFFF' }, // สีตัวอักษร
  },
  alignment: {
    vertical: 'middle',
    horizontal: 'center',
  },
};

const defaultRowStyle: Partial<ExcelJS.Style> = {
  alignment: {
    vertical: 'middle',
    horizontal: 'left',
  },
  border: {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' },
  },
};

export const exportToExcel = async ({
  data,
  columns,
  sheetName = 'Sheet1',
  filename = 'export.xlsx',
  headerStyle = defaultHeaderStyle,
  rowStyle = defaultRowStyle,
}: ExportOptions) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  // กำหนดคอลัมน์
  worksheet.columns = columns;

  // จัดรูปแบบหัวคอลัมน์
  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell, colNumber) => {
    //  colNumber is index
    // cell.fill = headerStyle.fill as ExcelJS.Fill;
    // cell.font = headerStyle.font as ExcelJS.Font;
    // cell.alignment = headerStyle.alignment as ExcelJS.Alignment;
    // cell.border = headerStyle.border as ExcelJS.Border;
    Object.assign(cell, headerStyle);
    const columnStyle = columns[colNumber - 1].style;
    if (columnStyle) {
      Object.assign(cell, columnStyle);
    }
  });

  // เพิ่มข้อมูล
  data.forEach((item) => {
    const row = worksheet.addRow(item);
    // ปรับแต่งขอบเซลล์
    row.eachCell((cell, colNumber) => {
      //   cell.fill = rowStyle.fill as ExcelJS.Fill;
      //   cell.font = rowStyle.font as ExcelJS.Font;
      //   cell.alignment = rowStyle.alignment as ExcelJS.Alignment;
      //   cell.border = rowStyle.border as ExcelJS.Border;
      Object.assign(cell, rowStyle);
      const columnStyle = columns[colNumber - 1].style;
      if (columnStyle) {
        Object.assign(cell, columnStyle);
      }
    });
  });

  // สร้าง buffer
  const buffer = await workbook.xlsx.writeBuffer();

  // สร้าง Blob และ URL สำหรับดาวน์โหลด
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = window.URL.createObjectURL(blob);

  // สร้างลิงก์ดาวน์โหลดและคลิกอัตโนมัติ
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();

  // ทำความสะอาด URL object
  window.URL.revokeObjectURL(url);
};

// ---------------------------------------------

const handleExport = () => {
      const columns = [
      { header: "Document Code", key: "documentCode", width: 20 },
      { header: "Reference", key: "reference", width: 30 },      // ด้านล่างนี้คือตัวอย่างการกำหนดสไตล์เฉพาะคอลัมน์
      { header: "Customer Name", key: "customerName", width: 30, style: { fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0000FF' } } as ExcelJS.FillPattern } },
      { header: "Tracking Code", key: "trackingCode", width: 20 },
      { header: "Courier", key: "courier", width: 30, style: { alignment: { horizontal: 'right' as 'right' } } },
      { header: "Status", key: "status", width: 15 },
      { header: "Item Count", key: "itemCount", width: 10 },
      { header: "Note", key: "note", width: 30 },
      { header: "Last Update", key: "lastUpdate", width: 20 },
    ];

  const dataTransform = (order: any) => ({
    documentCode: order.code,
    reference: order.reference,
    customerName: order.customerName,
    trackingCode: order.courierTrackingCode,
    courier: order.courier.name,
    status: order.status,
    itemCount: order.itemCount,
    note: order.note,
    lastUpdate: formatDateLong(order.updatedDate),
  });

  exportToExcel({
    data: orders,
    columns,
    sheetName: "Orders",
    filename: "orders.xlsx",
    dataTransform,
    headerStyle: {
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF00FF00' } }, // ตัวอย่างการกำหนดสไตล์ส่วนหัว
    },
    rowStyle: {
      font: { name: 'Arial', size: 12 }, // ตัวอย่างการกำหนดสไตล์แถว
    },
  });
};







// ================= แบบไม่ reuse ====================
const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Orders");
    // กำหนดหัวคอลัมน์
    worksheet.columns = [
      { header: "Document Code", key: "documentCode", width: 15 },
      { header: "Reference", key: "reference", width: 30 },
      { header: "Customer Name", key: "customerName", width: 30 },
      { header: "Tracking Code", key: "trackingCode", width: 20 },
      { header: "Courier", key: "courier", width: 30 },
      { header: "Status", key: "status", width: 15 },
      { header: "Item Count", key: "itemCount", width: 10 },
      { header: "Note", key: "note", width: 30 },
      { header: "Last Update", key: "lastUpdate", width: 20 },
    ];

    // จัดรูปแบบหัวคอลัมน์
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF4F81BD" }, // สีพื้นหลัง
      };
      cell.font = {
        bold: true,
        color: { argb: "FFFFFFFF" }, // สีตัวอักษร
      };
      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    });

    // เพิ่มข้อมูลลงในแต่ละแถว
    orders.forEach((order) => {
      worksheet.addRow({
        documentCode: order.code,
        reference: order.reference,
        customerName: order.customerName,
        trackingCode: order.courierTrackingCode,
        courier: order.courier.name,
        status: order.status,
        itemCount: order.itemCount,
        lastUpdate: formatDateLong(order.updatedDate),
      });
    });

    // ปรับแต่งขอบเซลล์
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // สร้าง buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // สร้าง Blob และ URL สำหรับดาวน์โหลด
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);

    // สร้างลิงก์ดาวน์โหลดและคลิกอัตโนมัติ
    const link = document.createElement("a");
    link.href = url;
    link.download = "orders.xlsx";
    link.click();

    // ทำความสะอาด URL object
    window.URL.revokeObjectURL(url);
  };
