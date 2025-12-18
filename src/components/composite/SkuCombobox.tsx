import { Package } from 'lucide-react';
import { useSkuWithAccountInfinite, type SkuWithAccountInfinite } from '@/shared/services/queries/sku.queries';
import { cn } from '@/shared/lib';
import Combobox, { type ComboboxProps, type ComboboxReturnMode } from '../ui/Combobox';

interface SkuComboboxProps<TReturnObject extends ComboboxReturnMode = undefined>
  extends Omit<
    ComboboxProps<TReturnObject, ReturnType<typeof useSkuWithAccountInfinite>>,
    | 'useInfiniteQuery'
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
      icon={Package}
      placeholder="Select SKU..."
      searchPlaceholder="Search SKU..."
      emptyMessage="No SKU found"
      loadingMessage="Loading SKUs..."
      errorMessage="Error loading SKUs"
      disabled={!accountId || props.disabled}
      renderItem={defaultRenderItem}
      useInfiniteQuery={(searchName, selectedId) =>
        useSkuWithAccountInfinite(accountId, searchName, selectedId)
      }
      {...props}
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


// ==================== API ========================

import type { Sku } from '@/shared/types';
import { skuKeys } from '@/shared/keys';
import { apiClient, endpoints } from '@/shared/services/api';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

export type SkuWithAccountInfinite = Pick<
  Sku,
  'id' | 'name' | 'info' | 'code' | 'internalCode' | 'barcode'
>[];

const PER_PAGE = 50;
const INITIAL_PAGE = 1;

const fetchSkuWithAccount = async (
  pageParam: number,
  accountId: string,
  searchName?: string
  selectedId?: string | null
) => {
  const baseFilter = `active eq true and startswith(id,'${accountId}')`;

  // ถ้ามี selectedId แต่ไม่มี search → fetch list ปกติ + fetch selectedId แยก
  if (selectedId && !searchName) {
    const [listResponse, selectedResponse] = await Promise.all([
      apiClient.get<SkuWithAccountInfinite>(endpoints.sku.getAll, {
        params: {
          $select: 'id,code,name,internalCode,barcode',
          $expand: 'info',
          $skip: (pageParam - 1) * PER_PAGE,
          $top: PER_PAGE,
          $orderby: 'name asc',
          $filter: baseFilter,
        },
      }),
      apiClient.get<SkuWithAccountInfinite>(endpoints.sku.getAll, {
        params: {
          $select: 'id,code,name,internalCode,barcode',
          $expand: 'info',
          $filter: `${baseFilter} and id eq '${selectedId}'`,
          $top: 1,
        },
      }),
    ]);

    const listData = listResponse.data;
    const selectedData = selectedResponse.data;

    const combined = [...listData];
    if (selectedData.length > 0 && !listData.some((item) => item.id === selectedId)) {
      combined.unshift(selectedData[0]);
    }

    return {
      data: combined,
      nextPage: listData.length === PER_PAGE ? pageParam + 1 : undefined,
    };
  }

  // ถ้ามี search → filter by name (+ selectedId ถ้ามี)
  let filter = baseFilter;
  if (searchName && selectedId) {
    filter += ` and (contains(name,'${searchName}') or id eq '${selectedId}')`;
  } else if (searchName) {
    filter += ` and contains(name,'${searchName}')`;
  }

  const params: Record<string, unknown> = {
    $select: 'id,code,name,internalCode,barcode',
    $expand: 'info',
    $skip: (pageParam - 1) * PER_PAGE,
    $top: PER_PAGE,
    $orderby: 'name asc',
    $filter: filter,
  };

  const response = await apiClient.get<SkuWithAccountInfinite>(
    endpoints.sku.getAll,
    { params }
  );

  return {
    data: response.data,
    nextPage: response.data.length === PER_PAGE ? pageParam + 1 : undefined,
  };
};

export const useSkuWithAccountInfinite = (
  accountId: string,
  searchName?: string,
  selectedId?: string | null
) => {
  return useInfiniteQuery({
    queryKey: skuKeys.accountId(accountId, searchName, selectedId),
    queryFn: ({ pageParam }) =>
      fetchSkuWithAccount(pageParam, accountId, searchName, selectedId),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: INITIAL_PAGE,
    enabled: !!accountId,
  });
};
