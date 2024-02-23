import * as XLSX from "xlsx";

const exportToExcel = (data: unknown[], name: string): void => {
  const currentDate: string = new Date().toISOString().split("T")[0];
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, `${name}, ${currentDate}.xlsx`);
};

export default exportToExcel;