// Utility functions for string manipulations

export const capitalize = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  
  export const truncate = (str: string, length: number): string => {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
  };
  
  export const isEmpty = (str: string): boolean => {
    return !str || str.trim().length === 0;
  };
  