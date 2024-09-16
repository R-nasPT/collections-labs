import { useAccount } from "@/services";
import { SearchInput, SearchSelectField } from "../ui";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface OrderSearchProps {
  handleMerchantChange: (newPerPage: string) => void;
  handleSearchChange: (newSearch: string) => void;
  handleFieldChange: (newField: string) => void;
}

export default function OrderSearch({
  handleMerchantChange,
  handleSearchChange,
  handleFieldChange,
}: OrderSearchProps) {
  const t = useTranslations("INDEX");
  const { data: account, isLoading } = useAccount();
  const [searchValue, setSearchValue] = useState<string>("");

  const searchOptions = [
    { value: "code", label: "Document Code" },
    { value: "reference", label: "Reference" },
    { value: "customerName", label: "Customer Name" },
    { value: "courier/name", label: "Courier" },
  ];

  const accountOptions = async (inputValue: string) => {
    if (!account || account.length === 0) {
      console.log("No account data available or account is empty");
      return [];
    }

    const allOptions = account.map((acc) => ({
      value: acc.id,
      label: acc.name,
    }));

    const filteredOptions = allOptions.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    return filteredOptions;
  };

  return (
    <section className="flex flex-col lg:flex-row justify-between lg:items-center gap-2 lg:gap-5">
      <SearchInput
        placeholder={t("ORDER_SEARCH_FIELD")}
        value={searchValue}
        onChange={(newValue) => setSearchValue(newValue)}
        onEnterPress={() => handleSearchChange(searchValue)}
        onClearClick={() => {
          setSearchValue("");
          handleSearchChange("");
        }}
      />
      {isLoading ? (
        <div className="bg-slate-200 p-5 flex-1 rounded-full animate-pulse"></div>
      ) : (
        <SearchSelectField
          className="flex-1"
          name="field"
          placeholder={t("OTHERS")}
          options={searchOptions}
          rounded="100px"
          padding="1.5px 5px"
          onChange={(selectedOption) =>
            handleFieldChange(selectedOption?.value!)
          }
        />
      )}
      {isLoading ? (
        <div className="bg-slate-200 p-5 flex-1 rounded-full animate-pulse"></div>
      ) : (
        <SearchSelectField
          className="flex-1"
          name="merchant"
          placeholder={isLoading ? "Loading" : t("MERCHANT")}
          loadOptions={accountOptions}
          isLoading={isLoading}
          rounded="100px"
          padding="1.5px 5px"
          onChange={(selectedOption) =>
            handleMerchantChange(selectedOption?.value!)
          }
        />
      )}
    </section>
  );
}
