<SearchSelectField
  name="example"
  placeholder="Select an option"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
  defaultValue={{ value: 'option1', label: 'Option 1' }}
/>

const [selectedOption, setSelectedOption] = useState(null);

<SearchSelectField
  name="controlledField"
  placeholder="Select an option"
  options={options} // หรือใช้ loadOptions={loadOptionsFunction}
  value={selectedOption}
  onChange={(option) => setSelectedOption(option)}
/>

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

<SearchSelectField
  name="staticField"
  placeholder="Select a static option"
  control={control}
  errors={errors}
  options={options}
/>
