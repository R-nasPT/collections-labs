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
