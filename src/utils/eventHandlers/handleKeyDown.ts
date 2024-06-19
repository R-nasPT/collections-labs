export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === ' ' && !e.currentTarget.value.trim()) {
        e.preventDefault()
      }
    }
