"use client"

import { Brain, LogOut, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LiveClock } from "./live-clock"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-screen-2xl px-4 sm:px-6 lg:px-8 flex h-14 sm:h-16 items-center">
        <div className="mr-4 flex">
          <a className="mr-4 sm:mr-6 flex items-center space-x-2" href="/dashboard">
            <Brain className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary" />
            <span className="font-bold text-sm sm:text-base lg:text-lg">Habit Tracker</span>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4">
          <div className="hidden md:block">
            <LiveClock />
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 rounded-full">
                <Avatar className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10">
                  <AvatarFallback className="text-xs sm:text-sm lg:text-base">U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Uživatel</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    user@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Nastavení</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Odhlásit se</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
