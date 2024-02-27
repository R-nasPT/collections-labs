/* eslint-disable @typescript-eslint/no-explicit-any */
interface InputFloatNumberProps {
  label: string;
  register: any; // Adjust the type if possible
  errors: Record<string, any>; // Adjust the type if possible
  message: string;
  required?: boolean;
}

export default function InputFloatNumber({ label, register, errors, message, required }: InputFloatNumberProps) {

    // -- function ห้ามไม่ให้ เพิ่ม-ลด จำนวนตัวเลขตอน สกอร์ --
  const noScroll = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLElement).blur()

    setTimeout(() => {
      (e.target as HTMLElement).focus()
    }, 0)
  }

  return (
    <>
      <div className='relative'>
        <input
          className={`peer py-4 px-3 rounded-lg border border-solid text-base ${
            errors?.[label] 
            ? 'border-[#ff3000] text-[#ff3000] focus:outline-[#ff3506]' 
            : 'border-[#bfc0c2] hover:border-black focus:outline-black'
          } rm-arrow-spin `}
          required
          onWheel={noScroll}
          type='number'
          {...register(label, { required })}
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
  )
}
