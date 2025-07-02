// 1. Generic sort by any property
export const sortBy = <T, K extends keyof T>(
  items: T[],
  key: K,
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  if (!items) return [];
  return [...items].sort((a, b) => {
    const valueA = a[key] || '';
    const valueB = b[key] || '';
    const result = String(valueA).localeCompare(String(valueB));
    return direction === 'desc' ? -result : result;
  });
};

// 2. Sort by nested property path
export const sortByPath = <T>(
  items: T[],
  path: string,
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  if (!items) return [];
  return [...items].sort((a, b) => {
    const valueA = getNestedValue(a, path) || '';
    const valueB = getNestedValue(b, path) || '';
    const result = String(valueA).localeCompare(String(valueB));
    return direction === 'desc' ? -result : result;
  });
};

// Helper function to get nested value
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// 3. Sort with custom comparison function
export const sortWith = <T>(
  items: T[],
  compareFn: (a: T, b: T) => number
): T[] => {
  if (!items) return [];
  return [...items].sort(compareFn);
};

// 4. Multiple criteria sorting
export const sortByMultiple = <T>(
  items: T[],
  criteria: Array<{
    key: keyof T;
    direction?: 'asc' | 'desc';
  }>
): T[] => {
  if (!items) return [];
  return [...items].sort((a, b) => {
    for (const { key, direction = 'asc' } of criteria) {
      const valueA = a[key] || '';
      const valueB = b[key] || '';
      const result = String(valueA).localeCompare(String(valueB));
      
      if (result !== 0) {
        return direction === 'desc' ? -result : result;
      }
    }
    return 0;
  });
};

// 5. Sort with custom getter function
export const sortByGetter = <T, R>(
  items: T[],
  getter: (item: T) => R,
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  if (!items) return [];
  return [...items].sort((a, b) => {
    const valueA = getter(a) || '';
    const valueB = getter(b) || '';
    const result = String(valueA).localeCompare(String(valueB));
    return direction === 'desc' ? -result : result;
  });
};

// 6. Numeric sorting
export const sortByNumber = <T, K extends keyof T>(
  items: T[],
  key: K,
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  if (!items) return [];
  return [...items].sort((a, b) => {
    const valueA = Number(a[key]) || 0;
    const valueB = Number(b[key]) || 0;
    const result = valueA - valueB;
    return direction === 'desc' ? -result : result;
  });
};

// 7. Date sorting
export const sortByDate = <T, K extends keyof T>(
  items: T[],
  key: K extends keyof T
    ? T[K] extends string | number | Date | null | undefined
      ? K
      : never
    : never,
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  if (!items) return [];

  return [...items].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    const dateA = valueA instanceof Date ? valueA : new Date(valueA as string | number);
    const dateB = valueB instanceof Date ? valueB : new Date(valueB as string | number);

    const timeA = !isNaN(dateA.getTime()) ? dateA.getTime() : 0;
    const timeB = !isNaN(dateB.getTime()) ? dateB.getTime() : 0;

    const result = timeA - timeB;
    return direction === 'desc' ? -result : result;
  });
};

// 8. Original function as specific case
export const sortItemsByInternalCode = <T extends { internalCode?: string }>(
  items: T[],
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  return sortBy(items, 'internalCode' as keyof T, direction);
};

// Usage Examples:
/*
// Basic property sorting
const users = [{ name: 'John' }, { name: 'Alice' }];
sortBy(users, 'name');
sortBy(users, 'name', 'desc');

// Nested path sorting
const products = [
  { info: { code: 'B001' } },
  { info: { code: 'A001' } }
];
sortByPath(products, 'info.code');

// Multiple criteria
const items = [
  { category: 'A', priority: 2 },
  { category: 'A', priority: 1 },
  { category: 'B', priority: 1 }
];
sortByMultiple(items, [
  { key: 'category' },
  { key: 'priority', direction: 'desc' }
]);

// Custom getter
const orders = [
  { id: 'ORD-123', total: 100 },
  { id: 'ORD-456', total: 50 }
];
sortByGetter(orders, (order) => order.id.split('-')[1]);

// Numeric sorting
const scores = [{ score: 85 }, { score: 92 }, { score: 78 }];
sortByNumber(scores, 'score', 'desc');

// Date sorting
const events = [
  { date: '2024-01-15' },
  { date: '2024-01-10' }
];
sortByDate(events, 'date', 'desc');
*/




export const sortBy = <T, K extends keyof T>(
  items: T[],
  key: K,
  direction: 'asc' | 'desc' = 'asc',
  options?: {
    nullAs?: 'min' | 'max'; // กำหนดให้ `null/undefined` ถูกเรียงไว้ต้นสุดหรือท้ายสุด
    compareFn?: (a: T[K], b: T[K]) => number; // ฟังก์ชันเปรียบเทียบแบบกำหนดเอง
  }
): T[] => {
  if (!items) return [];

  return [...items].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    // 1. จัดการ `null/undefined` ตาม options
    if (valueA == null || valueB == null) {
      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return options?.nullAs === 'max' ? 1 : -1;
      if (valueB == null) return options?.nullAs === 'max' ? -1 : 1;
    }

    // 2. ใช้ compareFn ที่ผู้ใช้กำหนด (ถ้ามี)
    if (options?.compareFn) {
      return direction === 'desc' 
        ? -options.compareFn(valueA, valueB) 
        : options.compareFn(valueA, valueB);
    }

    // 3. เปรียบเทียบตามประเภทข้อมูลอัตโนมัติ
    let result: number;
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      result = valueA - valueB;
    } else if (valueA instanceof Date && valueB instanceof Date) {
      result = valueA.getTime() - valueB.getTime();
    } else {
      result = String(valueA).localeCompare(String(valueB));
    }

    return direction === 'desc' ? -result : result;
  });
};
// ---- examp ----
/*
  const numbers = [{ id: 3 }, { id: 1 }, { id: 2 }];
  const sorted = sortBy(numbers, 'id'); // [{ id: 1 }, { id: 2 }, { id: 3 }]

  const dates = [
  { date: new Date('2023-01-01') },
  { date: new Date('2022-01-01') },
];
  const sorted = sortBy(dates, 'date'); // เรียงจากวันที่เก่าที่สุด

  const data = [
  { name: 'B', age: null },
  { name: 'A', age: 20 },
];
  const sorted = sortBy(data, 'age', 'asc', { nullAs: 'max' });
  // ผลลัพธ์: [{ name: 'A', age: 20 }, { name: 'B', age: null }]

  const users = [
  { name: 'John', role: 'admin' },
  { name: 'Jane', role: 'user' },
];
  const sorted = sortBy(users, 'role', 'asc', {
    compareFn: (a, b) => {
      const priority = { admin: 1, user: 2 };
      return priority[a] - priority[b];
    },
  });
  // ผลลัพธ์: [{ name: 'John', role: 'admin' }, { name: 'Jane', role: 'user' }]
*/


// =========== perfect ===========
// Type helpers for strict typing
type SortableValue = string | number | boolean | null | undefined;

type SortableKey<T> = {
  [K in keyof T]: T[K] extends SortableValue ? K : never;
}[keyof T];

export const sortBy = <T, K extends SortableKey<T>>(
  items: T[],
  key: K,
  direction: 'asc' | 'desc' = 'asc',
  nullPosition: 'first' | 'last' = 'last'
): T[] => {
  if (!items) return [];
  
  return [...items].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    // Handle null/undefined values
    if (valueA === null && valueB === null) return 0;
    if (valueA === undefined && valueB === undefined) return 0;
    if (valueA === null || valueA === undefined) return nullPosition === 'first' ? -1 : 1;
    if (valueB === null || valueB === undefined) return nullPosition === 'first' ? 1 : -1;

    let result: number;
    
    // Number comparison
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      result = valueA - valueB;
    }
    // Boolean comparison
    else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
      result = valueA === valueB ? 0 : valueA ? 1 : -1;
    }
    // String comparison (fallback)
    else {
      result = String(valueA).localeCompare(String(valueB));
    }
    
    return direction === 'desc' ? -result : result;
  });
};
