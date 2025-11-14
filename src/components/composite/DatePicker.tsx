import type { ComponentProps } from 'react';
import type { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { Button } from './Button';
import { Calendar } from './Calendar';
import { cn } from '@/shared/lib';

type CalendarProps = ComponentProps<typeof Calendar>;

interface DatePickerSingle {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
}

interface DatePickerRange {
  selected?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
}

type SingleDatePickerProps = DatePickerSingle & {
  mode?: 'single';
  placeholder?: string;
  className?: string;
} & Omit<CalendarProps, 'mode' | 'selected' | 'onSelect'>;

type RangeDatePickerProps = DatePickerRange & {
  mode: 'range';
  placeholder?: string;
  className?: string;
} & Omit<CalendarProps, 'mode' | 'selected' | 'onSelect'>;

type OmitDateProps<T> = Omit<
  T,
  'mode' | 'selected' | 'onSelect' | 'placeholder' | 'className' | 'disabled'
>;

type DatePickerProps = SingleDatePickerProps | RangeDatePickerProps;

export function DatePicker({
  mode = 'single',
  placeholder,
  className = 'w-[280px]',
  disabled,
  selected,
  onSelect,
  ...props
}: DatePickerProps) {
  const getDisplayText = () => {
    if (mode === 'single') {
      if (selected && selected instanceof Date) {
        return format(selected, 'PPP');
      }
      return placeholder || 'Pick a date';
    } else {
      const rangeValue = selected as DatePickerRange['selected'];
      if (rangeValue?.from) {
        if (rangeValue.to) {
          return `${format(rangeValue.from, 'PPP')} - ${format(rangeValue.to, 'PPP')}`;
        }
        return format(rangeValue.from, 'PPP');
      }
      return placeholder || 'Pick a date range';
    }
  };

  const isEmpty =
    mode === 'single'
      ? !selected
      : !(selected as DatePickerRange['selected'])?.from;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={isEmpty}
          disabled={typeof disabled === 'boolean' ? disabled : false}
          className={cn(
            'justify-start text-left font-normal data-[empty=true]:text-muted-foreground',
            className
          )}
        >
          <CalendarIcon />
          <span className="block truncate">{getDisplayText()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        {mode === 'single' ? (
          <Calendar
            mode="single"
            selected={selected as DatePickerSingle['selected']}
            onSelect={onSelect as DatePickerSingle['onSelect']}
            disabled={disabled}
            {...(props as OmitDateProps<SingleDatePickerProps>)}
          />
        ) : (
          <Calendar
            mode="range"
            selected={selected as DatePickerRange['selected']}
            onSelect={onSelect as DatePickerRange['onSelect']}
            disabled={disabled}
            {...(props as OmitDateProps<RangeDatePickerProps>)}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}

/* 
==========================================
ตัวอย่างการใช้งาน
==========================================

1. แบบปกติ (Uncontrolled):
------------------------------------------
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

function MyComponent() {
  const [date, setDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<DateRange>();

  return (
    <>
      <DatePicker mode="single" selected={date} onSelect={setDate} />
      <DatePicker mode="range" selected={dateRange} onSelect={setDateRange} />
    </>
  );
}


2. ใช้กับ React Hook Form:
------------------------------------------
import { useForm, Controller } from 'react-hook-form';
import type { DateRange } from 'react-day-picker';

interface FormData {
  singleDate: Date;
  dateRange: DateRange;
}

function MyForm() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Single Date */}
      <Controller
        name="singleDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            placeholder="เลือกวันที่"
          />
        )}
      />

      {/* Date Range */}
      <Controller
        name="dateRange"
        control={control}
        render={({ field }) => (
          <DatePicker
            mode="range"
            selected={field.value}
            onSelect={field.onChange}
            placeholder="เลือกช่วงวันที่"
          />
        )}
      />

      <button type="submit">Submit</button>
    </form>
  );
}


3. ตัวอย่างเพิ่มเติม:
------------------------------------------
// ส่ง props อื่นๆ ของ Calendar ได้หมด
<DatePicker 
  mode="single" 
  selected={date} 
  onSelect={setDate}
  captionLayout="dropdown-months"
  fromYear={2000}
  toYear={2030}
/>

// กำหนด disabled dates
<DatePicker 
  mode="single" 
  selected={date} 
  onSelect={setDate}
  disabled={[
    { from: new Date(2024, 0, 1), to: new Date(2024, 0, 10) }
  ]}
/>

// Custom placeholder และ className
<DatePicker 
  mode="single" 
  selected={date} 
  onSelect={setDate}
  placeholder="กรุณาเลือกวันที่เกิด"
  className="w-[400px]"
/>

// Date Range with custom months
<DatePicker 
  mode="range" 
  selected={dateRange} 
  onSelect={setDateRange}
  numberOfMonths={3}
/>
*/
