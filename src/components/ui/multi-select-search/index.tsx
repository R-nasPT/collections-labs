import AsyncSelect from "react-select/async";
import Select from 'react-select'
import AsyncCreatableSelect from "react-select/async-creatable"
import CreatableSelect from "react-select/creatable"
import { useEffect, useState } from "react";
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
  control?: Control<any>;
  errors?: FieldErrors;
  className?: string;
  value?: Option;
  defaultValue?: Option;
  onChange?: (option: Option | null) => void;
  padding?: string; // เพิ่ม prop สำหรับ padding
  showArrow?: boolean;
  clearIndicator?: boolean;
  isCreatable?: boolean;
  options?: Option[];
  loadOptions?: (inputValue: string) => Promise<Option[]>;
  onCreateOption?: (inputValue: string) => void;
}

export default function SearchSelectField({
  name,
  placeholder,
  control,
  errors,
  className,
  value,
  defaultValue,
  onChange,
  padding = "0.25rem 0.5rem", // กำหนดค่าเริ่มต้นสำหรับ padding
    showArrow = true,
  clearIndicator = true,
  isCreatable = false,
  options,
  loadOptions,
  onCreateOption
}: SearchSelectFieldProps) {
  const { ref, toggleOpen, onClose } = useOutsideClick(false);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  if (!loadOptions && !options) {
    console.warn('Either loadOptions or options must be provided to SearchSelectField');
    return null;
  }

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      width: '100%',
      minWidth: '200px',
      borderColor: errors?.[name] ? "#ff3506" : state.isFocused ? "#531ae3" : "#24075c",
      "&:hover": {
        borderColor: "#531ae3",
      },
      boxShadow: "none",
      borderRadius: "1rem",
      padding: padding, // ใช้ padding จาก prop
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
    menu: (provided: any) => ({
      ...provided,
      zIndex: 9999, // กำหนด z-index สูงเพื่อให้ dropdown อยู่ด้านบน
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999, // ใช้ z-index สูงสำหรับ menuPortal
    }),
  };

  const renderSelect = (field?: any) => {
    const commonProps = {
      ...field,
      styles: customStyles,
      placeholder,
      onMenuOpen: toggleOpen,
      onMenuClose: onClose,
      className: "react-select-container",
      classNamePrefix: "react-select",
      isClearable: clearIndicator,
      value,
      defaultValue: defaultValue,
      onChange,
      menuPortalTarget: document.body, // ให้ dropdown อยู่ใน root ของ DOM
      menuPosition: 'fixed', // ใช้ position fixed สำหรับ dropdown
    };

    if (isCreatable && loadOptions) {
      return <AsyncCreatableSelect {...commonProps} loadOptions={loadOptions} onCreateOption={onCreateOption}/>;
    } else if (isCreatable) {
      return <CreatableSelect {...commonProps} options={options} onCreateOption={onCreateOption}/>;
    } else if (loadOptions) {
      return <AsyncSelect {...commonProps} loadOptions={loadOptions} />;
    } else if (options) {
      return <Select {...commonProps} options={options} />;
    }

    return <div>No options available</div>;;
  };

  return (
    <div className={cn("relative", className)} ref={ref}>
      {control ? (
        <Controller
          name={name}
          defaultValue={defaultValue}
          control={control}
          render={({ field }) => renderSelect(field)}
        />
      ) : (
        renderSelect()
      )}

      {errors?.[name] && (
        <p className="text-[#ff3506] text-xs h-1 pl-2 mt-1">
          {`${placeholder.toLowerCase()} is a required field`}
        </p>
      )}
    </div>
  );
}
