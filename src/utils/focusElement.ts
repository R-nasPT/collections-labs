/**
 * Focus an element using querySelector or getElementById
 * @param selector - CSS selector string or element ID
 * @param useId - If true, uses getElementById, otherwise uses querySelector
 * @returns boolean - true if element was found and focused, false otherwise
 */

interface FocusOptions {
  useId?: boolean;
  scroll?: boolean;
  scrollOptions?: ScrollIntoViewOptions;
  focusDelay?: number;
}

export const focusElement = (
  selector: string,
  options?: FocusOptions
): boolean => {
  try {
    const element = options?.useId
      ? (document.getElementById(selector) as HTMLElement)
      : (document.querySelector(selector) as HTMLElement);

    if (!element) {
      console.warn(`Element not found: ${selector}`);
      return false;
    }

    if (options?.scroll) {
      element.scrollIntoView(
        options.scrollOptions || {
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        }
      );

      setTimeout(() => {
        element.focus();
      }, options.focusDelay || 300);
    } else {
      element.focus();
    }

    return true;
  } catch (error) {
    console.error('Error focusing element:', error);
    return false;
  }
};





// ใช้ querySelector (default)
focusElement('input[placeholder="Barcode สินค้า"]');

// ใช้ getElementById
focusElement('barcode-input', { useId: true, scroll: true );

// ตัวอย่างอื่นๆ
focusElement('input[name="username"]');           // querySelector
focusElement('[data-testid="search-input"]');     // querySelector
focusElement('.my-input');                        // querySelector
focusElement('my-element-id', { useId: true });   // getElementById
