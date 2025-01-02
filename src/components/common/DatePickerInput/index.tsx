import { useState } from "react";
import { useController, Control } from "react-hook-form";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

interface DatePickerInputProps {
  name: string;
  control: Control<any>;
  label?: string;
}

const DatePickerInput = ({
  name,
  control,
  label,
}: DatePickerInputProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [dateValue, setDateValue] = useState<DateValueType>(
    value || {
      startDate: null,
      endDate: null,
    }
  );

  const handleDateChange = (newValue: DateValueType) => {
    if (newValue) {
      const processedValue = {
        startDate: newValue.startDate,
        endDate: newValue.startDate,
      };
      setDateValue(processedValue);
      onChange(processedValue);
    } else {
      setDateValue({
        startDate: null,
        endDate: null,
      });
      onChange(null);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {error && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className={`${error ? "border border-red-500 rounded-lg" : ""}`}>
        <Datepicker
          inputId={name}
          inputName={name}
          value={dateValue}
          onChange={handleDateChange}
          useRange={false}
          asSingle={true}
          displayFormat="DD/MM/YYYY"
          placeholder="เลือกวันที่"
          popoverDirection="down"
          toggleClassName="hidden"
          containerClassName={`relative ${error ? "border-red-500" : "border-gray-300"}`}
          inputClassName={`relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full 
            border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 
            rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white 
            focus:ring focus:border-blue-500 focus:ring-blue-500/20
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default DatePickerInput;
