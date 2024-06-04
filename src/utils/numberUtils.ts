// Utility functions for number manipulations

export const formatCurrency = (num: number): string => {
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };
  
  export const toFixed = (num: number, decimals: number): string => {
    return num.toFixed(decimals);
  };
  
  export const isEven = (num: number): boolean => {
    return num % 2 === 0;
  };
  
  export const isOdd = (num: number): boolean => {
    return num % 2 !== 0;
  };
  