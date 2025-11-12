import { Store } from 'lucide-react';
import { useAccountsInfinite } from '@/shared/services/queries/account.queries';
import Combobox, { type ComboboxProps } from './Combobox';

export default function AccountCombobox<T extends boolean = false>(
  props: ComboboxProps<T>
) {
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

const fetchAccounts = async (pageParam: number, name?: string) => {
  const params: Record<string, unknown> = {
    $select: 'id,name',
    $skip: (pageParam - 1) * PER_PAGE,
    $top: PER_PAGE,
    $orderby: 'name asc',
  };

  if (name) {
    params.$filter = `contains(name,'${name}')`;
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

export const useAccountsInfinite = (name: string | undefined) => {
  return useInfiniteQuery({
    queryKey: [accountKeys.infiniteList(name)],
    queryFn: ({ pageParam }) => fetchAccounts(pageParam, name),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: INITIAL_PAGE,
  });
};
