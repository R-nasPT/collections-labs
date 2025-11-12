import type { Identity } from '@/shared/types';
import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
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

type ComboboxValue<T extends boolean> = T extends true
  ? Identity | null
  : string | null;

type ComboboxOnChange<T extends boolean> = T extends true
  ? (item: Identity | null) => void
  : (itemId: string) => void;

export interface ComboboxProps<T extends boolean = false> {
  value?: ComboboxValue<T>;
  onChange?: ComboboxOnChange<T>;
  disabled?: boolean;
  returnObject?: T;
  className?: string;
}

interface GenericComboboxProps<T extends boolean = false> extends ComboboxProps<T> {
  // Customization props
  icon: LucideIcon;
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

export default function Combobox<T extends boolean = false>({
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
  useInfiniteQuery,
}: GenericComboboxProps<T>) {
  const [open, setOpen] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(debouncedSearch);

  const items = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  const selectedId = useMemo(() => {
    if (!value) return null;
    return typeof value === 'string' ? value : value.id;
  }, [value]);

  const selectedItem = useMemo(() => {
    if (!selectedId) return null;
    return items.find((item) => item.id === selectedId);
  }, [selectedId, items]);

  const handleSelect = (item: Identity) => {
    if (selectedId === item.id) {
      if (returnObject) {
        (onChange as (item: Identity | null) => void)?.(null);
      } else {
        (onChange as (itemId: string) => void)?.('');
      }
    } else {
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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollPercentage =
      (target.scrollTop + target.clientHeight) / target.scrollHeight;

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
          className={cn(
            'justify-between transition-all duration-200',
            'hover:shadow-sm focus:ring-2 focus:ring-primary/20',
            'border-border/60 hover:border-border',
            className,
            disabled && 'cursor-not-allowed opacity-50',
            selectedItem && 'border-primary/30 bg-secondary/50'
          )}
          disabled={disabled}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />

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
            className={cn(
              'h-4 w-4 shrink-0 opacity-60 transition-transform duration-200',
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
                  <Icon className="h-8 w-8 text-muted-foreground" />
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
                    {item.name}
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
