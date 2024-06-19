  export const noScrollWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    ;(e.target as HTMLElement).blur()

    setTimeout(() => {
      ;(e.target as HTMLElement).focus()
    }, 0)
  }
