import type { Identity } from '@/shared/types';
import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import { useEffect, useMemo, useState, type JSX } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover';
import { Button } from '../ui/Button';
import {
  CheckIcon,
  ChevronsUpDownIcon,
  Loader2,
  type LucideIcon,
} from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/Command';
import { cn } from '@/shared/lib';

/* ---------- Shared props type ---------- */
type ComboboxValue<T extends boolean> = T extends true
  ? Identity | null
  : string | null;

type ComboboxOnChange<T extends boolean> = T extends true
  ? (item: Identity | null) => void
  : (itemId: string) => void;

export interface ComboboxProps<T extends boolean = false> {
  id?: string;
  value?: ComboboxValue<T>;
  onChange?: ComboboxOnChange<T>;
  disabled?: boolean;
  icon?: LucideIcon;
  returnObject?: T;
  className?: string;
  'aria-invalid'?: boolean;
  renderItem?: (item: Identity) => string | ReactNode;
}

interface GenericComboboxProps<T extends boolean = false> extends ComboboxProps<T> {
  // Customization props
  placeholder: string;
  searchPlaceholder: string;
  emptyMessage: string;
  loadingMessage: string;
  errorMessage: string;

  // Query hook
  useInfiniteQuery: (search: string) => UseInfiniteQueryResult<{
    pages: Array<{ data: Identity[] }>;
  }>;
}

/* ---------- Function overload declarations ---------- ไม่มีก็ยังไม่เห็นปัญหานะ น่าจะไม่มีก็ได้*/ 
export function Combobox(
  props: GenericComboboxProps<false>
): JSX.Element;
export function Combobox(
  props: GenericComboboxProps<true>
): JSX.Element;

export default function Combobox<T extends boolean = false>({
  id,
  value,
  onChange,
  disabled,
  returnObject,
  className,
  icon: Icon,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  loadingMessage,
  errorMessage,
  'aria-invalid': ariaInvalid,
  renderItem,
  useInfiniteQuery,
}: GenericComboboxProps<T>) {
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
  } = useInfiniteQuery(debouncedSearch);

  // Flatten all pages into a single array
  const items = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  // แปลง value เป็น id
  const selectedId = useMemo(() => {
    if (!value) return null;
    return typeof value === 'string' ? value : value.id;
  }, [value]);

  // หา item จาก id
  const selectedItem = useMemo(() => {
    if (!selectedId) return null;
    return items.find((item) => item.id === selectedId);
  }, [selectedId, items]);

  const handleSelect = (item: Identity) => {
    // Clear selection
    if (selectedId === item.id) {
      if (returnObject) {
        (onChange as (item: Identity | null) => void)?.(null);
      } else {
        (onChange as (itemId: string) => void)?.('');
      }
    } else {
      // Select new account
      if (returnObject) {
        (onChange as (item: Identity | null) => void)?.({
          id: item.id,
          name: item.name,
        });
      } else {
        (onChange as (itemId: string) => void)?.(item.id);
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
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-invalid={ariaInvalid}
          className={cn(
            'w-[200px] justify-between transition-all duration-200',
            'hover:shadow-sm focus:ring-2 focus:ring-primary/20',
            'border-border/60 hover:border-border',
            'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
            className,
            disabled && 'cursor-not-allowed opacity-50',
            selectedItem && 'border-primary/30 bg-secondary/50'
          )}
          disabled={disabled}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {Icon && <Icon className="size-4 shrink-0 text-muted-foreground" />}

            <span
              className={cn(
                'flex-1 truncate text-left',
                selectedItem
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {selectedItem ? selectedItem.name : placeholder}
            </span>
          </div>

          <ChevronsUpDownIcon
            aria-invalid={ariaInvalid}
            className={cn(
              'h-4 w-4 shrink-0 opacity-60 transition-transform duration-200 aria-invalid:text-destructive',
              open && 'rotate-180'
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            value={searchName}
            onValueChange={setSearchName}
          />
          <CommandList onScrollCapture={handleScroll}>
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">
                  {loadingMessage}
                </span>
              </div>
            )}

            {isError && (
              <CommandEmpty className="py-6">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-destructive">{errorMessage}</span>
                  <span className="text-xs text-muted-foreground">
                    Please try again
                  </span>
                </div>
              </CommandEmpty>
            )}

            {!isLoading && items.length === 0 && (
              <CommandEmpty className="py-6">
                <div className="flex flex-col items-center gap-2">
                  {Icon && <Icon className="h-8 w-8 text-muted-foreground" />}
                  <span className="text-sm text-muted-foreground">
                    {emptyMessage}
                  </span>
                </div>
              </CommandEmpty>
            )}

            {!isLoading && items.length > 0 && (
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={() => handleSelect(item)}
                    className="cursor-pointer"
                  >
                    <CheckIcon
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedId === item.id ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {renderItem ? renderItem(item) : item.name}
                  </CommandItem>
                ))}

                {isFetchingNextPage && (
                  <div className="flex items-center justify-center py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-xs text-muted-foreground">
                      Loading more...
                    </span>
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
