import { useTheme } from '@/core/providers/ThemeProvider';
import { Button, DropdownMenuItem } from '@/shared/components';
import { Moon, Sun } from 'lucide-react';

interface ModeToggleProps {
  variant?: 'button' | 'menuitem';
}

export function ModeToggle({ variant = 'button' }: ModeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (variant === 'menuitem') {
    return (
      <DropdownMenuItem
        className="cursor-pointer rounded-md px-3 py-2.5 font-medium sm:hidden"
        onClick={toggleTheme}
      >
        <Moon className="mr-3 h-4 w-4 shrink-0 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Sun className="absolute left-3 h-4 w-4 shrink-0 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span>Theme</span>
      </DropdownMenuItem>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full text-muted-foreground"
      onClick={toggleTheme}
    >
      <Moon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Sun className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
