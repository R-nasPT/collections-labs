export const calculateSum = (array: (number | unknown)[]): number => {
  return array
    .filter((item): item is number => typeof item === "number") // กรองเฉพาะตัวเลข
    .reduce((acc, num) => acc + num, 0); // รวมตัวเลขทั้งหมด
};
