import { useEffect, useMemo, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover';
import { Button } from '../ui/Button';
import { CheckIcon, ChevronsUpDownIcon, Loader2 } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/Command';
import { cn } from '@/shared/lib';
import { useAccountsInfinite } from '@/shared/services/queries/account.queries';

export default function AccountCombobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [searchName, setSearchName] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Use the infinite query hook with search parameter
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useAccountsInfinite({
    name: debouncedSearch,
  });

 // Flatten all pages into a single array
  const accounts = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  // Find selected account label
  const selectedAccount = accounts.find((account) => account.id === value);

  // Handle scroll for infinite loading
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const scrollPercentage = 
      (target.scrollTop + target.clientHeight) / target.scrollHeight
    
    // Load more when scrolled to 80%
    if (scrollPercentage > 0.8 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchName);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchName]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedAccount ? selectedAccount.name : 'Select account...'}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search account..."
            value={searchName}
            onValueChange={setSearchName}
          />
          <CommandList onScrollCapture={handleScroll}>
            {isLoading && (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}

            {isError && <CommandEmpty>Error loading accounts.</CommandEmpty>}

            {!isLoading && accounts.length === 0 && (
              <CommandEmpty>No account found.</CommandEmpty>
            )}

            {!isLoading && accounts.length > 0 && (
              <CommandGroup>
                {accounts.map((account) => (
                  <CommandItem
                    key={account.id}
                    value={account.name}
                    onSelect={() => {
                      setValue(value === account.id ? '' : account.id);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === account.id ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {account.name}
                  </CommandItem>
                ))}

                {isFetchingNextPage && (
                  <div className="flex items-center justify-center py-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                )}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// ==================== api ==========================

interface AccountsParams {
  pageParam?: number;
  name?: string;
  per_page?: number;
}

type AccountsInfinite = Pick<Account, 'id' | 'name'>[];

const fetchAccounts = async ({
  pageParam = 1,
  name,
  per_page = 50,
}: AccountsParams) => {
  const params: Record<string, unknown> = {
    $select: 'id,name',
    $skip: (pageParam - 1) * per_page,
    $top: per_page,
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
    nextPage: response.data.length === per_page ? pageParam + 1 : undefined,
  };
};

export const useAccountsInfinite = (params: AccountsParams) => {
  return useInfiniteQuery({
    queryKey: [accountKeys.infiniteList(params.name)],
    queryFn: ({ pageParam }) => fetchAccounts({ ...params, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};
