/**
 * Focus an element using querySelector or getElementById
 * @param selector - CSS selector string or element ID
 * @param useId - If true, uses getElementById, otherwise uses querySelector
 * @returns boolean - true if element was found and focused, false otherwise
 */
export const focusElement = (selector: string, useId: boolean = false): boolean => {
  try {
    const element = useId 
      ? document.getElementById(selector) as HTMLElement
      : document.querySelector(selector) as HTMLElement;
    
    if (!element) {
      console.warn(`Element not found: ${selector}`);
      return false;
    }
    
    element.focus();
    return true;
  } catch (error) {
    console.error('Error focusing element:', error);
    return false;
  }
};



// ใช้ querySelector (default)
focusElement('input[placeholder="Barcode สินค้า"]');

// ใช้ getElementById
focusElement('barcode-input', true);

// ตัวอย่างอื่นๆ
focusElement('input[name="username"]');           // querySelector
focusElement('[data-testid="search-input"]');     // querySelector
focusElement('.my-input');                        // querySelector
focusElement('my-element-id', true);              // getElementById
