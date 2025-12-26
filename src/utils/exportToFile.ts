import { utils, writeFile } from 'xlsx';

interface Column {
  header: string;
  key: string;
}

type DataValue = string | number | boolean | null | undefined;

interface ExportOptions<T extends object> {
  data: T[];
  columns: Column[];
  sheetName?: string;
  filename?: string;
  format?: 'xlsx' | 'csv';
}

export const exportToFile = <T extends object>({
  data = [],
  columns = [],
  sheetName = 'Sheet1',
  filename = 'export-data',
  format = 'xlsx',
}: ExportOptions<T>): boolean => {
  try {
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error('ไม่มีข้อมูลสำหรับส่งออก');
      return false;
    }

    const processedData: DataValue[][] = [];

    if (columns && Array.isArray(columns) && columns.length > 0) {
      const headerRow = columns.map((column) => column.header || column.key);
      processedData.push(headerRow);

      data.forEach((item: T) => {
        const row = columns.map((column) => {
          const fieldName = column.key;
          const value = (item as Record<string, unknown>)[fieldName];
          if (value === undefined) return '';
          if (
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean' ||
            value === null
          ) {
            return value;
          }
          return String(value);
        });
        processedData.push(row);
      });
    } else {
      if (data.length > 0) {
        const headers = Object.keys(data[0]);
        processedData.push(headers);

        data.forEach((item: T) => {
          const row = headers.map((header) => {
            const value = (item as Record<string, unknown>)[header];
            if (value === undefined) return '';
            if (
              typeof value === 'string' ||
              typeof value === 'number' ||
              typeof value === 'boolean' ||
              value === null
            ) {
              return value;
            }
            return String(value);
          });
          processedData.push(row);
        });
      }
    }

    const ws = utils.aoa_to_sheet(processedData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, sheetName);

    if (format.toLowerCase() === 'csv') {
      const csvContent = utils.sheet_to_csv(ws);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      writeFile(wb, `${filename}.xlsx`);
    }

    return true;
  } catch (error) {
    console.error(
      'เกิดข้อผิดพลาดในการส่งออกข้อมูล:',
      error instanceof Error ? error.message : String(error)
    );
    return false;
  }
};

// ================================
ใช้ "xlsx": "https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz",

// ----------------- example -----------------------

const columns = [
  { header: "รหัสออเดอร์", key: "code" },
  { header: "ชื่อลูกค้า", key: "customerName" },
  { header: "สถานะ", key: "status" },
  { header: "อ้างอิง.", key: "reference" },
  { header: "รหัสติดตามพัสดุ*", key: "courierTrackingCode" },
  { header: "ค่าจัดส่ง", key: "deliveryFee" },
  { header: "Dispatch Batch Number", key: "dispatchBatchNumber" },
];

const { data: orders, isLoading, error } = useOrder();

  const onExportToCsv = () => {
    exportToFile({
      data: orders!,
      columns,
      sheetName: "ใบนำส่ง",
      filename: `ใบนำส่ง ${formatDateShort(day)}`,
      format: "csv",
    });
  };
