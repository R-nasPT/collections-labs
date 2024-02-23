import React from 'react'

function LoadingRow() {
  return (
    <tr>
      <td className='w-1/2 p-3'>
        <div className='flex gap-4'>
          <div className='h-[72px] w-[72px] animate-pulse rounded-lg bg-[#e1e1e1]'></div>
          <div className='flex w-full flex-col justify-center gap-3'>
            <div className='h-6 max-w-72 animate-pulse rounded-md bg-[#e1e1e1]'></div>
            <div className='h-6 max-w-64 animate-pulse rounded-md bg-[#e1e1e1]'></div>
          </div>
        </div>
      </td>
      {[10, 10, 10, 12, 10, 14].map((width, index) => (
        <td key={index} className='p-1'>
          <div className={`h-4 w-${width} animate-pulse rounded-md bg-[#e1e1e1]`}></div>
        </td>
      ))}
      
      {/* Mobile */}
      <td className='block lg:hidden'>
        <div className='flex justify-between px-4'>
          {[...Array(3)].map((_, index) => (
            <div key={index} className='h-4 w-11 animate-pulse rounded-md bg-[#e1e1e1]'></div>
          ))}
        </div>
      </td>
      <hr className='my-2 border border-solid border-[#e8e8e8] lg:hidden' />
      <td className='block lg:hidden'>
        <div className='flex justify-between px-2'>
          {Array.from({ length: 2 }, (_, index) => (
            <div key={index} className='h-4 w-14 animate-pulse rounded-md bg-[#e1e1e1]'></div>
          ))}
        </div>
      </td>
    </tr>
  )
}

export default function ListLoading() {
  return (
    <>
      {[...Array(5)].map((_, index) => ( <LoadingRow key={index} /> ))}

      {Array.from({ length: 5 }, (_, index) => <LoadingRow key={index} />)} {/* <------ หรืออันนี้ก็ได้ */}
    </>
  )
}
