export default function InputSelect({
  label,
  options,
  register,
  errors,
  required = false,
}: any) {
  return (
    <>
      <div className="relative">
        <select
          required
          {...register(label, { required })}
          className={`peer py-4 px-3 rounded-lg text-base border border-solid ${
            errors?.[label]
              ? "border-[#ff3506] focus:outline-[#ff3506]"
              : "border-[#bfc0c2] hover:border-black focus:outline-black"
          }`}
        >
            <option selected disabled value=""></option>
          {options.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label
          className={`peer-floating peer-focus:font-medium ${
            errors?.[label]
              ? "text-[#ff3000]"
              : "text-gray-800 peer-focus:text-white peer-valid:text-white"
          }`}
        >
          {label}
        </label>

        <p className="text-[#ff3506] text-xs h-1 pl-2">
          {errors?.[label] && `${label.toLowerCase()} is a required field`}
        </p>
      </div>
    </>
  );
}
