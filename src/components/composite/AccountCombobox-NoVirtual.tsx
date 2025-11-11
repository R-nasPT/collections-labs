import { useEffect, useMemo, useState, type JSX } from 'react';
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
import type { Account } from '@/shared/types';

type AccountValue = Pick<Account, 'id' | 'name'>;

/* ---------- Shared props type ---------- */
interface AccountComboboxProps<T extends boolean = false> {
  value?: T extends true ? AccountValue | null : string | null; // รับได้ทั้ง string และ object
  onChange?: T extends true
    ? (account: AccountValue | null) => void
    : (accountId: string) => void; // ส่งได้ทั้ง 2 แบบ
  disabled?: boolean;
  returnObject?: T; // บอกว่าจะ return object หรือ string
}

/* ---------- Function overload declarations ---------- ไม่มีก็ยังไม่เห็นปัญหานะ น่าจะไม่มีก็ได้*/ 
export function AccountCombobox(
  props: AccountComboboxProps<false>
): JSX.Element;
export function AccountCombobox(
  props: AccountComboboxProps<true>
): JSX.Element;

export default function AccountCombobox<T extends boolean = false>({
  value,
  onChange,
  disabled,
  returnObject,
}: AccountComboboxProps<T>) {
  const [open, setOpen] = useState(false);
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

  // แปลง value เป็น id
  const selectedId = useMemo(() => {
    if (!value) return null;
    return typeof value === 'string' ? value : value.id;
  }, [value]);

  // หา account จาก id
  const selectedAccount = useMemo(() => {
    if (!selectedId) return null;
    return accounts.find((account) => account.id === selectedId);
  }, [selectedId, accounts]);

  const handleSelect = (account: AccountValue) => {
    if (selectedId === account.id) {
      // Clear selection
      if (returnObject) {
        (onChange as (account: AccountValue | null) => void)?.(null);
      } else {
        (onChange as (accountId: string) => void)?.('');
      }
    } else {
      // Select new account
      if (returnObject) {
        (onChange as (account: AccountValue | null) => void)?.({
          id: account.id,
          name: account.name,
        });
      } else {
        (onChange as (accountId: string) => void)?.(account.id);
      }
    }
    setOpen(false);
  };

  // Handle scroll for infinite loading
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollPercentage =
      (target.scrollTop + target.clientHeight) / target.scrollHeight;

    // Load more when scrolled to 80%
    if (scrollPercentage > 0.8 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

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
          disabled={disabled}
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
                    onSelect={() => handleSelect(account)}
                  >
                    <CheckIcon
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedId === account.id ? 'opacity-100' : 'opacity-0'
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
