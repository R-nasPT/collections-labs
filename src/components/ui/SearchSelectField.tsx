import React from "react";
import AsyncSelect from "react-select/async";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { useOutsideClick } from "@/hooks";
import { cn } from "@/utils/cn";

interface Option {
  value: string;
  label: string;
}

interface SearchSelectFieldProps {
  name: string;
  placeholder: string;
  control: Control<any>;
  errors: FieldErrors;
  loadOptions: (inputValue: string) => Promise<Option[]>;
  className?: string;
  showArrow?: boolean;
  clearIndicator?: boolean;
}

export default function SearchSelectField({ name, placeholder, control, errors, loadOptions, className, showArrow = true, clearIndicator = true }: SearchSelectFieldProps) {
  const { ref, toggleOpen, onClose } = useOutsideClick(false);

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: errors[name] ? "#ff3506" : state.isFocused ? "#531ae3" : "#24075c",
      "&:hover": {
        borderColor: "#531ae3",
      },
      boxShadow: "none",
      borderRadius: "1rem",
      padding: "0.25rem 0.5rem",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#433958",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#8761d3" : state.isFocused ? "#f3f4f6" : "white",
      color: state.isSelected ? "white" : "#280d5f",
      "&:hover": {
        backgroundColor: state.isSelected ? "#794fcc" : "#f3f4f6",
        color: state.isSelected ? "white" : "#280d5f",
      },
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      display: showArrow ? "flex" : "none",
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      display: clearIndicator ? "flex" : "none",
    }),
  };

  return (
    <div className={cn("relative", className)} ref={ref}>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <AsyncSelect
            {...field}
            loadOptions={loadOptions}
            styles={customStyles}
            placeholder={placeholder}
            onMenuOpen={toggleOpen}
            onMenuClose={onClose}
            className="react-select-container"
            classNamePrefix="react-select"
            cacheOptions
            defaultOptions
            isClearable={clearIndicator}
          />
        )}
      />
      {errors?.[name] && (
        <p className="text-[#ff3506] text-xs h-1 pl-2 mt-1">
          {`${placeholder.toLowerCase()} is a required field`}
        </p>
      )}
    </div>
  );
}

// วิธีใช้ -----------
const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => console.log(data);

  const loadOptionsFunction = async (inputValue: string) => {
    // สมมติว่านี่คือการเรียก API
    const response = await fetch(`https://api.example.com/search?q=${inputValue}`);
    const data = await response.json();
    return data.map((item: any) => ({ value: item.id, label: item.name }));
  };

// --------
const loadOptionsFunction = async (inputValue: string) => {
    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ];

    return options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

    <SearchSelectField
        name="exampleSelect"
        placeholder="Select an option"
        control={control}
        errors={errors}
        loadOptions={loadOptionsFunction}
        showArrow={false}
        clearIndicator={false}
      />
