type KeyMapping = {
  value: string;
  label: string;
};

export const generateOptions = async <T extends Record<string, any>>(
  data: T[] | Promise<T[]>,
  inputValue: string,
  keyMapping: KeyMapping = { value: "id", label: "name" },
  delay?: number
): Promise<Array<{ value: string; label: string }>> => {
  try {
    if (delay) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    // รอให้ data resolve ถ้าเป็น Promise
    const resolvedData = await (data instanceof Promise ? data : Promise.resolve(data));

    if (!resolvedData || resolvedData.length === 0) {
      console.log("No data available or data is empty");
      return [];
    }

    const allOptions = resolvedData.map((item) => ({
      value: String(item[keyMapping.value]),
      label: String(item[keyMapping.label]),
    }));

    const filteredOptions = allOptions.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    return filteredOptions;
  } catch (error) {
    console.error("Error in generateOptions:", error);
    return [];
  }
};
