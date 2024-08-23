type KeyMapping = {
  value: string;
  label: string;
};

export const generateOptions = <T extends Record<string, any>>(
  data: T[],
  inputValue: string,
  keyMapping: KeyMapping = { value: "id", label: "name" }
) => {
  if (!data || data.length === 0) {
    console.log("No data available or data is empty");
    return [];
  }

  const allOptions = data.map((item) => ({
    value: item[keyMapping.value],
    label: item[keyMapping.label],
  }));

  const filteredOptions = allOptions.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return filteredOptions;
};

// -----------------------------------------------------
const productOptions = async (inputValue: string) => {
  if (!products) return [];
  return generateOptions(products, inputValue, { value: 'sku', label: 'productName' });
};

const accountOptions = async (inputValue: string) => {
  if (!account) return [];
  return generateOptions(account, inputValue);
};
