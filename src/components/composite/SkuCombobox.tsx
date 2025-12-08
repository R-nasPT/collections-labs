import { Package } from 'lucide-react';
import { useSkuWithAccountInfinite, type SkuWithAccountInfinite } from '@/shared/services/queries/sku.queries';
import { cn } from '@/shared/lib';
import Combobox, { type ComboboxProps, type ComboboxReturnMode } from '../ui/Combobox';

interface SkuComboboxProps<TReturnObject extends ComboboxReturnMode = undefined>
  extends Omit<
    ComboboxProps<TReturnObject, ReturnType<typeof useSkuWithAccountInfinite>>,
    | 'useInfiniteQuery'
    | 'placeholder'
    | 'searchPlaceholder'
    | 'emptyMessage'
    | 'loadingMessage'
    | 'errorMessage'
    | 'icon'
  > {
  accountId: string;
}

export default function SkuCombobox<TReturnObject extends ComboboxReturnMode = undefined>({
  accountId,
  ...props
}: SkuComboboxProps<TReturnObject>) {
  const defaultRenderItem = (item: SkuWithAccountInfinite[number]) => {
    if (item.info?.available !== undefined) {
      const available = item.info.available;
      const isNegative = available < 0;
      return (
        <div className="flex flex-col w-full">
          <span>{item.name}</span>
          <span
            className={cn(
              'text-sm font-medium',
              isNegative
                ? 'text-red-600 dark:text-red-400'
                : 'text-green-600 dark:text-green-400'
            )}
          >
            ({available})
          </span>
        </div>
      );
    }
    return item.name || '';
  };

  return (
    <Combobox
      {...props}
      icon={Package}
      placeholder="Select SKU..."
      searchPlaceholder="Search SKU..."
      emptyMessage="No SKU found"
      loadingMessage="Loading SKUs..."
      errorMessage="Error loading SKUs"
      disabled={!accountId || props.disabled}
      renderItem={defaultRenderItem}
      useInfiniteQuery={(search) =>
        useSkuWithAccountInfinite(accountId, search)
      }
    />
  );
}

// ==================== Example ========================

// 1. ไม่ส่ง returnObject → ได้ string (id only)
<SkuCombobox
  accountId={accountId}
  value={filters.skuId}
  onChange={(skuId: string) => console.log(skuId)}
/>

// 2. returnObject="id-name" → ได้แค่ { id, name }
<SkuCombobox
  accountId={accountId}
  value={{ id: '001', name: 'SKU' }}
  onChange={(sku: { id?: string; name?: string } | null) => console.log(sku)}
  returnObject="id-name"
/>

// 3. returnObject="all-fields" → ได้ทุก fields (id, name, internalCode, code, barcode, info)
<SkuCombobox
  accountId={accountId}
  value={{ id: '001', name: 'SKU' }}
  onChange={(sku: SkuIdentity | null) => {
    // ได้ครบทุก field!
    console.log(sku?.internalCode);
    console.log(sku?.code);
    console.log(sku?.barcode);
    console.log(sku?.info);
  }}
  returnObject="all-fields"
/>
