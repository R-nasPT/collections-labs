import { useState, useCallback } from 'react';

const useCopyToClipboard = (timeout = 2000) => {
  const [copiedItems, setCopiedItems] = useState<{ [key: string]: boolean }>({});

  const copyToClipboard = useCallback((content: string, key?: string) => {
    // Copy content to clipboard
    navigator.clipboard.writeText(content);

    // Mark the specific item as copied
    setCopiedItems((prev) => ({
      ...prev,
      [key || 'default']: true,
    }));

    // Reset the copied state after timeout
    setTimeout(() => {
      setCopiedItems((prev) => ({
        ...prev,
        [key || 'default']: false,
      }));
    }, timeout);
  }, [timeout]);

  const isCopied = useCallback((key?: string) => {
    return copiedItems[key || 'default'] || false;
  }, [copiedItems]);

  return { copyToClipboard, isCopied };
};

export default useCopyToClipboard;

// -------------- example ----------------
import React from 'react';
import { useCopyToClipboard } from './useCopyToClipboard';

const CopyExample = () => {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <div>
      <button
        onClick={() => copyToClipboard('Hello, world!')}
      >
        {isCopied() ? 'Copied!' : 'Copy Text'}
      </button>
    </div>
  );
};

export default CopyExample;

// -------------- example Multiple Items ----------------
import React from 'react';
import { useCopyToClipboard } from './useCopyToClipboard';

const MultiCopyExample = () => {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <div>
      {['Item 1', 'Item 2', 'Item 3'].map((item, index) => (
        <button
          key={index}
          onClick={() => copyToClipboard(item, `item-${index}`)}
        >
          {isCopied(`item-${index}`) ? 'Copied!' : `Copy ${item}`}
        </button>
      ))}
    </div>
  );
};

export default MultiCopyExample;
