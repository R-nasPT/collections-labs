export default function InputFloatText({ label, message, register, errors, required = false } : any) {

  // -- function การห้ามเว้นว่างตัวอักษรแรก กด space bar ไม่ได้ --
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === ' ' && !e.currentTarget.value.trim()) {
        e.preventDefault()
      }
    }

  return (
    <>
      <div className='relative'>
        <input
          className={`peer py-4 px-3 rounded-lg text-base border border-solid ${
            errors?.[label]
              ? "border-[#ff3506] focus:outline-[#ff3506]"
              : "border-[#bfc0c2] hover:border-black focus:outline-black"
          }`}
          type="text"
          required
          {...register(label, { required })}
          onKeyDown={handleKeyDown}
        />

        <label
          className={`peer-floating peer-focus:font-medium ${
            errors?.[label] ? 'text-[#ff3000]' : 'text-gray-800 peer-focus:text-white peer-valid:text-white'
          }`}
        >
          {message}
        </label>

        <p className="text-[#ff3506] text-xs h-1 pl-2">
          {errors?.[label] && `${message.toLowerCase()} is a required field`}
        </p>
      </div>
    </>
  );
}
