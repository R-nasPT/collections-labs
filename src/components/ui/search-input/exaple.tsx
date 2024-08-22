const [searchValue, setSearchValue] = useState<string>("");

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
