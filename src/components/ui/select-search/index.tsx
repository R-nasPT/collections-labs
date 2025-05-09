"use client";

import AsyncSelect from "react-select/async";
import Select, { MenuPosition, StylesConfig } from 'react-select'
import AsyncCreatableSelect from "react-select/async-creatable"
import CreatableSelect from "react-select/creatable"
import { useEffect, useState } from "react";
import { Controller, Control, FieldErrors, ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { useOutsideClick } from "@/hooks";
import { cn } from "@/utils";

type NestedError = {
  message?: string;
  [key: string]: NestedError | string | undefined;
};

interface Option {
  value: string;
  label: string;
}

interface SearchSelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  control?: Control<T>;
  errors?: FieldErrors<T>;
  className?: string;
  errorClassName?: string;
  value?: Option;
  defaultValue?: Option;
  onChange?: (option: Option | null) => void;
  loadingMessage?: string;
  minHeight?: string;
  padding?: string;
  rounded?: string;
  fontSize?: string;
  showIndicators?: boolean;
  indicatorsSpacing?: string;
  isCreatable?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  options?: Option[];
  loadOptions?: (inputValue: string) => Promise<Option[]>;
  onCreateOption?: (inputValue: string) => void;
}

export default function SearchSelectField<T extends FieldValues>({
  name,
  placeholder,
  control,
  errors,
  className,
  errorClassName,
  value,
  defaultValue,
  onChange,
  loadingMessage = "Loading...",
  minHeight = "38px",
  padding = "0.25rem 0.5rem",
  rounded = "1rem",
  fontSize = "16px",
  showIndicators = true,
  indicatorsSpacing,
  isCreatable = false,
  isLoading,
  isDisabled = false,
  options,
  loadOptions,
  onCreateOption
}: SearchSelectFieldProps<T>) {
  const { ref, toggleOpen, onClose } = useOutsideClick(false);
  const [hydrated, setHydrated] = useState(false);

  const getErrorMessage = (): string | undefined => {
    if (!errors) return undefined;
    
    if (typeof name === "string") {
      const error = name.split(".")
        .reduce((error: NestedError | undefined, part) => 
          error && typeof error === 'object' ? error[part] as NestedError | undefined : undefined, 
          errors as unknown as NestedError);
      return error?.message;
    }
    return errors[name]?.message as string | undefined;
  };

  const errorMessage = getErrorMessage();
  const hasError = !!errorMessage;

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  if (!loadOptions && !options) {
    console.warn('Either loadOptions or options must be provided to SearchSelectField');
    return null;
  }

  const customStyles: StylesConfig<Option, false> = {
    control: (provided, state) => ({
      ...provided,
      minHeight,
      width: '100%',
      minWidth: '150px',
      borderColor: hasError ? "#ff3506" : state.isFocused ? "#531ae3" : "#24075c",
      "&:hover": {
        borderColor: "#531ae3",
      },
      boxShadow: "none",
      borderRadius: rounded,
      padding: padding,
      fontSize: fontSize
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#433958",
      fontSize: fontSize
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#a855f7" : state.isFocused ? "#f3f4f6" : "white",
      color: state.isSelected ? "white" : "#280d5f",
      "&:hover": {
        backgroundColor: state.isSelected ? "#9333ea" : "#f3f4f6",
        color: state.isSelected ? "white" : "#280d5f",
      },
    }),
    indicatorsContainer: (base) => ({
      ...base,
      display: showIndicators ? "flex" : "none",
      gap: indicatorsSpacing || "8px",
      paddingRight: indicatorsSpacing || "8px"
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0px"
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: "0px"
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    loadingMessage: () => ({
      color: "#43395b",
      textAlign: "center",
      fontStyle: "italic",
    }),
  };

  const renderSelect = (field?: ControllerRenderProps<T, Path<T>>) => {
    const commonProps = {
      styles: customStyles,
      placeholder,
      onMenuOpen: toggleOpen,
      onMenuClose: onClose,
      className: "react-select-container",
      classNamePrefix: "react-select",
      isClearable: true,
      defaultValue: defaultValue,
      menuPortalTarget: document.body,
      menuPosition: 'fixed' as MenuPosition,
      isLoading: isLoading,
      loadingMessage: () => loadingMessage,
      isDisabled,
      ...(field ? field : { value, onChange }),
    };

    if (isCreatable && loadOptions) {
      return <AsyncCreatableSelect {...commonProps} loadOptions={loadOptions} cacheOptions defaultOptions onCreateOption={onCreateOption}/>;
    } else if (isCreatable) {
      return <CreatableSelect {...commonProps} options={options} onCreateOption={onCreateOption}/>;
    } else if (loadOptions) {
      return <AsyncSelect {...commonProps} cacheOptions defaultOptions loadOptions={loadOptions} />;
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
          control={control}
          render={({ field }) => renderSelect(field)}
        />
      ) : (
        renderSelect()
      )}

      {control && hasError && (
        <p className={cn("text-[#ff3506] text-xs pl-3", errorClassName)}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
