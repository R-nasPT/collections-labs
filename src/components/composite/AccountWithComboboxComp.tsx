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
