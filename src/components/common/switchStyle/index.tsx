"use client";

// ============= First ==============

export function SwitchFirstStyle() {
  return (
    <label
      htmlFor="AcceptConditions"
      className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
    >
      <input
        type="checkbox"
        id="AcceptConditions"
        className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
      />

      <span className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-6 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600">
        <svg
          data-unchecked-icon
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>

        <svg
          data-checked-icon
          xmlns="http://www.w3.org/2000/svg"
          className="hidden h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </label>
  );
}

// ============= Second ==============

export function SwitchSecondStyle() {
  return (
    <label
      htmlFor="AcceptConditions2"
      className="relative inline-block h-8 w-12 cursor-pointer [-webkit-tap-highlight-color:_transparent]"
    >
      <input type="checkbox" id="AcceptConditions2" className="peer sr-only" />

      <span className="absolute inset-0 m-auto h-2 rounded-full bg-gray-300"></span>

      <span className="absolute inset-y-0 start-0 m-auto size-6 rounded-full bg-gray-500 transition-all peer-checked:start-6 peer-checked:[&_>_*]:scale-0">
        <span className="absolute inset-0 m-auto size-4 rounded-full bg-gray-200 transition"></span>
      </span>
    </label>
  );
}
// ============= Third ==============

export function SwitchThirdStyle() {
  return (
    <label
      htmlFor="AcceptConditions3"
      className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-blue-500"
    >
      <input type="checkbox" id="AcceptConditions3" className="peer sr-only" />

      <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
    </label>
  );
}

// ============= Fourth ==============

export function SwitchFourthStyle() {
  return (
    <div className="inline-flex items-center">
      <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
        <input
          id="switch-component"
          type="checkbox"
          className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-[#cfd8dc] checked:bg-[#e91e63] peer-checked:border-[#e91e63] "
          defaultChecked
        />
        <label
          htmlFor="switch-component"
          className="absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-[#cfd8dc] bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-[#e91e63] peer-checked:before:bg-[#e91e63]"
        >
          <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"></div>
        </label>
      </div>
    </div>
  );
}

// ============= Fifth ==============

export function SwitchFifthStyle() {
  return (
    <label className="relative cursor-pointer">
      <input type="checkbox" className="sr-only peer" />
      <div className="w-[53px] h-7 flex items-center bg-gray-300 rounded-full text-[9px] peer-checked:text-[#007bff] text-gray-300 font-extrabold after:flex after:items-center after:justify-center peer after:content-['Off'] peer-checked:after:content-['On'] peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#007bff]"></div>
    </label>
  );
}

// ============= Sixth ==============

export function SwitchSixthStyle() {
  return (
    <label className="relative cursor-pointer">
      <input type="checkbox" className="sr-only peer" />
      <div className="w-14 h-8 flex items-center bg-transparent border-[3px] border-gray-300 peer-checked:border-[#007bff] rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[5px] peer-checked:after:left-[10px] peer-checked:after:border-[#007bff] after:bg-transparent after:border-4 after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
    </label>
  );
}

// ============= Seventh ==============

export function SwitchSeventhStyle() {
  return (
    <>
      <input type="checkbox" id="switch" className="peer invisible h-0 w-0" />{" "}
      <label
        htmlFor="switch" // after: คือลูก กลมๆ ด้านใน
        className="cursor-pointer -indent-[-9999px] bg-[#808080] block rounded-full relative w-20 h-7 after:absolute after:w-5 after:h-5 active:after:w-10 after:top-[4px] after:left-[5px] after:bg-white after:rounded-full after:transition-[0.3s] peer-checked:bg-[#bada55] peer-checked:after:left-[calc(100%_-_5px)] peer-checked:after:-translate-x-full"
      ></label>
    </>
  );
}

// ============= Eighth ==============

export function SwitchEighthStyle() {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" />
      <div className="peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-12 h-12  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-10 after:w-10 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0"></div>
    </label>
  );
}

// ============= Ninth ==============

export function SwitchNinthStyle() {
  return (
    <div className="flex flex-wrap justify-center items-center select-none gap-2 max-w-[500px]">
      <label className="text-slate-400">
        <input
          type="checkbox"
          className="h-[1px] opacity-0 overflow-hidden absolute whitespace-nowrap w-[1px] peer"
        />
        <span className="peer-checked:border-blue-500 peer-checked:shadow-blue-500/10 peer-checked:text-blue-500 peer-checked:before:border-blue-500 peer-checked:before:bg-blue-500 peer-checked:before:opacity-100 peer-checked:before:scale-100 peer-checked:before:content-['✓'] flex flex-col items-center justify-center w-28 min-h-[7rem] rounded-lg shadow-lg transition-all duration-200 cursor-pointer relative border-slate-300 border-[3px] bg-white before:absolute before:block before:w-5 before:h-5 before:border-[3px]  before:rounded-full before:top-1 before:left-1 before:opacity-0 before:transition-transform before:scale-0 before:text-white before:text-xs before:flex before:items-center before:justify-center hover:border-blue-500 hover:before:scale-100 hover:before:opacity-100">
          <span className="transition-all duration-100">
            {/* สามารถเอารูปอื่นมาใส่แทนได้ */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <circle
                cx="162"
                cy="128"
                r="34"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
              ></circle>
              <path
                d="M128,94V26.00089H94a34,34,0,0,0,0,68Z"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
              ></path>
              <path
                d="M128,161.99911V94H94a34,34,0,0,0,0,68Z"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
              ></path>
              <path
                d="M128,94V26.00089h34a34,34,0,0,1,0,68Z"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
              ></path>
              <path
                d="M128,161.99911v34.00044A34,34,0,1,1,94,162Z"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
              ></path>
            </svg>
          </span>
          <span className="transition-all duration-300 text-center">Figma</span>
        </span>
      </label>
    </div>
  );
}

// ============= Tenth ==============

export function SwitchTenthStyle() {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" />
      <div className="group peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-300 w-24 h-12  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-10 after:w-10 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-hover:after:scale-95">
        <svg
          className="absolute  top-1 left-12 stroke-gray-900 w-10 h-10"
          height="100"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 100 100"
          width="100"
          x="0"
          xmlns="http://www.w3.org/2000/svg"
          y="0"
        >
          <path
            className="svg-fill-primary"
            d="M50,18A19.9,19.9,0,0,0,30,38v8a8,8,0,0,0-8,8V74a8,8,0,0,0,8,8H70a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H38V38a12,12,0,0,1,23.6-3,4,4,0,1,0,7.8-2A20.1,20.1,0,0,0,50,18Z"
          ></path>
        </svg>
        <svg
          className="absolute top-1 left-1 stroke-gray-900  w-10 h-10"
          height="100"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 100 100"
          width="100"
          x="0"
          xmlns="http://www.w3.org/2000/svg"
          y="0"
        >
          <path
            d="M30,46V38a20,20,0,0,1,40,0v8a8,8,0,0,1,8,8V74a8,8,0,0,1-8,8H30a8,8,0,0,1-8-8V54A8,8,0,0,1,30,46Zm32-8v8H38V38a12,12,0,0,1,24,0Z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </div>
    </label>
  );
}

// ============= Eleventh ==============

export function SwitchEleventhStyle() {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" />
      <div className="group peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-300 w-24 h-12  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-10 after:w-10 after:top-1 after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0"></div>
    </label>
  );
}
