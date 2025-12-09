import { Store } from 'lucide-react';
import { useAccountsInfinite } from '@/shared/services/queries/account.queries';
import Combobox, {
  type ComboboxProps,
  type ComboboxReturnMode,
} from '../ui/Combobox';

type AccountComboboxProps<TReturnObject extends ComboboxReturnMode = undefined> = Omit<
  ComboboxProps<TReturnObject, ReturnType<typeof useAccountsInfinite>>,
  | 'icon'
  | 'placeholder'
  | 'searchPlaceholder'
  | 'emptyMessage'
  | 'loadingMessage'
  | 'errorMessage'
  | 'useInfiniteQuery'
>;

export default function AccountCombobox<
  TReturnObject extends ComboboxReturnMode = undefined,
>(props: AccountComboboxProps<TReturnObject>) {
  return (
    <Combobox
      {...props}
      icon={Store}
      placeholder="ร้านค้า..."
      searchPlaceholder="ค้นหา ร้านค้า..."
      emptyMessage="No account found"
      loadingMessage="Loading accounts..."
      errorMessage="Error loading accounts"
      useInfiniteQuery={useAccountsInfinite}
    />
  );
}

// ====================== api =============================

type AccountsInfinite = Pick<Account, 'id' | 'name'>[];

const PER_PAGE = 50;
const INITIAL_PAGE = 1;

const fetchAccounts = async (
  pageParam: number,
  searchName?: string,
  selectedId?: string | null
) => {
  const params: Record<string, unknown> = {
    $select: 'id,name',
    $skip: (pageParam - 1) * PER_PAGE,
    $top: PER_PAGE,
    $orderby: 'name asc',
  };

  // ถ้ามี search → filter by name
  // ถ้ามี selectedId → เพิ่ม or เพื่อให้ได้ item นั้นด้วย
  if (searchName && selectedId) {
    params.$filter = `contains(name,'${searchName}') or id eq '${selectedId}'`;
  } else if (searchName) {
    params.$filter = `contains(name,'${searchName}')`;
  } else if (selectedId) {
    // ไม่มี search แต่มี selectedId → ไม่ filter เลย (ได้ list ปกติ + selectedId อาจอยู่ในนั้น)
    // แต่ต้องเพิ่ม selectedId เข้าไปด้วยเผื่อไม่อยู่ใน page แรก
    params.$filter = `id eq '${selectedId}'`;

    // ดึง list ปกติ + item ที่เลือกแยกกัน
    const [listResponse, selectedResponse] = await Promise.all([
      apiClient.get<AccountsInfinite>(endpoints.account.getAll, {
        params: {
          $select: 'id,name',
          $skip: (pageParam - 1) * PER_PAGE,
          $top: PER_PAGE,
          $orderby: 'name asc',
        },
      }),
      apiClient.get<AccountsInfinite>(endpoints.account.getAll, {
        params: {
          $select: 'id,name',
          $filter: `id eq '${selectedId}'`,
          $top: 1,
        },
      }),
    ]);

    const listData = listResponse.data;
    const selectedData = selectedResponse.data;

    // รวม selectedItem เข้าไปถ้าไม่อยู่ใน list
    const combined = [...listData];
    if (selectedData.length > 0 && !listData.some((item) => item.id === selectedId)) {
      combined.unshift(selectedData[0]);
    }

    return {
      data: combined,
      nextPage: listData.length === PER_PAGE ? pageParam + 1 : undefined,
    };
  }

  const response = await apiClient.get<AccountsInfinite>(
    endpoints.account.getAll,
    { params }
  );

  return {
    data: response.data,
    nextPage: response.data.length === PER_PAGE ? pageParam + 1 : undefined,
  };
};

export const useAccountsInfinite = (
  searchName: string | undefined,
  selectedId?: string | null
) => {
  return useInfiniteQuery({
    queryKey: accountKeys.infiniteList(searchName, selectedId),
    queryFn: ({ pageParam }) => fetchAccounts(pageParam, searchName, selectedId),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: INITIAL_PAGE,
  });
};
