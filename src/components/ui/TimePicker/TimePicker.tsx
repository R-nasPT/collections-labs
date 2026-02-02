import { useEffect, useRef } from 'react';
import { Clock, Check } from 'lucide-react';
import { cn } from '@/shared/lib';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { Button } from './Button';
import { ScrollArea } from './ScrollArea';

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  interval?: 1 | 5 | 15 | 30 | 60;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  'aria-invalid'?: boolean;
}

function generateTimeSlots(interval: number): string[] {
  const totalMinutes = 24 * 60;
  return Array.from({ length: Math.floor(totalMinutes / interval) }, (_, i) => {
    const m = i * interval;
    const hours = Math.floor(m / 60);
    const mins = m % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  });
}

export function TimePicker({
  value,
  onChange,
  interval = 15,
  placeholder = 'Pick a time',
  disabled = false,
  className,
  'aria-invalid': ariaInvalid,
}: TimePickerProps) {
  const selectedRef = useRef<HTMLButtonElement>(null);

  const timeSlots = generateTimeSlots(interval);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ block: 'center' });
    }
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          data-empty={!value}
          aria-invalid={ariaInvalid}
          className={cn(
            'justify-start text-left font-normal data-[empty=true]:text-muted-foreground',
            'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
            className
          )}
        >
          <Clock className="size-4" />
          <span>{value || placeholder}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[calc(var(--radix-popover-trigger-width))] overflow-hidden p-0"
        align="start"
      >
        <ScrollArea className="h-64">
          <div className="py-1">
            {timeSlots.map((time) => {
              const isSelected = time === value;
              return (
                <button
                  key={time}
                  ref={isSelected ? selectedRef : null}
                  onClick={() => onChange?.(time)}
                  className={cn(
                    'relative flex w-full cursor-pointer items-center justify-center rounded-none py-1.5 pr-8 pl-3 text-sm transition-colors',
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <span className="font-mono">{time}</span>
                  {isSelected && <Check className="absolute right-3 size-4" />}
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
