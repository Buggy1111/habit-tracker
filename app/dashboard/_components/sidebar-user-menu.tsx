"use client"

import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { LogOut, Settings, HelpCircle, Moon, Sun } from "lucide-react"
import { signOut } from "next-auth/react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"

interface SidebarUserMenuProps {
  userName: string
  userEmail: string
  userInitials: string
  userImage?: string | null
  mounted: boolean
}

export function SidebarUserMenu({
  userName,
  userEmail,
  userInitials,
  userImage,
  mounted,
}: SidebarUserMenuProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const t = useTranslations("nav")

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login", redirect: true })
  }

  return (
    <div className="mb-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-auto p-3 hover:bg-primary/10"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={userImage || undefined} alt={userName} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-left flex-1 min-w-0">
              <p className="text-sm font-medium leading-none truncate w-full">{userName}</p>
              <p className="text-xs text-muted-foreground truncate w-full mt-1">{userEmail}</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userName}</p>
              <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>{t("settings")}</span>
            </DropdownMenuItem>
            {mounted && (
              <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? (
                  <Sun className="mr-2 h-4 w-4" />
                ) : (
                  <Moon className="mr-2 h-4 w-4" />
                )}
                <span>{theme === "dark" ? t("lightMode") : t("darkMode")}</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => router.push("/help")}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>{t("help")}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleSignOut}
            className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t("signOut")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
