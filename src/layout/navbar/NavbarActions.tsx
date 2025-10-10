import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from '@/shared/components';
import { ModeToggle } from './ModeToggle';
import { Bell, LogOut, Settings, User } from 'lucide-react';

export default function NavbarActions() {
  return (
    <div className="ml-auto flex items-center gap-1">
      {/* Theme Toggle - ซ่อนบน mobile */}
      <div className="hidden sm:block">
        <ModeToggle />
      </div>

      {/* Settings - ซ่อนบน mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="hidden rounded-full text-muted-foreground sm:flex"
      >
        <Settings className="h-5 w-5 animate-spin [animation-duration:4000ms]" />
      </Button>

      {/* Notifications */}
      <Button
        variant="ghost"
        size="icon"
        className="relative shrink-0 rounded-full"
      >
        <Bell className="h-5 w-5 text-muted-foreground" />
        <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
          9
        </span>
      </Button>

      <Separator
        orientation="vertical"
        className="mx-2 shrink-0 data-[orientation=vertical]:h-6"
      />

      {/* Account Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 shrink-0 gap-2 rounded-full pr-3 pl-1 hover:bg-accent"
          >
            <Avatar className="h-9 w-9 border-2 border-border">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            {/* ซ่อนชื่อบน mobile */}
            <span className="hidden text-sm font-medium sm:inline">
              Alex...
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60 p-0">
          {/* User Info Section */}
          <div className="p-4 pb-3">
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12 shrink-0 border-2 border-border shadow-sm">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback className="text-base font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5">
                <p className="truncate text-sm leading-none font-semibold">
                  Alex Doe
                </p>
                <p className="mt-1 truncate text-xs leading-none text-muted-foreground">
                  alex.doe@example.com
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Menu Items */}
          <div className="p-1">
            <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2.5 font-medium">
              <User className="mr-3 h-4 w-4 shrink-0" />
              <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2.5 font-medium">
              <Settings className="mr-3 h-4 w-4 shrink-0" />
              <span>Settings</span>
            </DropdownMenuItem>

            <ModeToggle variant="menuitem" />
          </div>

          <Separator />

          <div className="p-1">
            <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2.5 font-medium">
              <LogOut className="mr-3 h-4 w-4 shrink-0" />
              <span>Logout</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
