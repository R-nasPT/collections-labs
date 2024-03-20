import { Typography } from '@mui/material'
import { MouseEvent, ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  disabled?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  pressed?: boolean
  size?: string
}

export default function ButtonFilledBlack({ onClick, children, pressed, disabled, size }: ButtonProps) {
  return (
    <button
      className={`w-full rounded border-0 px-4 py-2 transition-colors duration-300 ${
        pressed ? 'bg-[#000000]' : disabled ? 'bg-[#D9D9D9]' : 'cursor-pointer bg-[#1B1B1B] hover:bg-[#5A5A5A]'
      } `}
      onClick={onClick}
      disabled={disabled}
    >
      <Typography className={`font-medium text-[${size}] ${disabled ? 'text-[#969696]' : 'text-white'}`}>
        {children}
      </Typography>
    </button>
  )
}
