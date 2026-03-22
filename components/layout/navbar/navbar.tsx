"use client"

import {
  Brain,
  LogOut,
  Settings,
  User,
  BarChart3,
  Target,
  Calendar,
  Sparkles,
  HelpCircle,
  Moon,
  Sun,
  Book,
  TrendingUp,
  Zap,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LiveClock } from "../live-clock"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"

export function Navbar() {
  const { data: session } = useSession()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const t = useTranslations("nav")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/login",
      redirect: true,
    })
  }

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    if (email) {
      return email[0].toUpperCase()
    }
    return "U"
  }

  const userInitials = getInitials(session?.user?.name, session?.user?.email)
  const userName = session?.user?.name || t("userFallback")
  const userEmail = session?.user?.email || "user@example.com"

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
          <LiveClock />

          <div className="flex items-center space-x-2 sm:space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 rounded-full"
                >
                  <Avatar className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10">
                    <AvatarImage src={session?.user?.image || undefined} alt={userName} />
                    <AvatarFallback className="text-xs sm:text-sm lg:text-base bg-primary/10 text-primary font-semibold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" forceMount>
                <div className="px-2 py-1.5 text-xs text-center text-muted-foreground/70 italic border-b">
                  {t("sidebarFooter")}
                </div>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <Target className="mr-2 h-4 w-4" />
                    <span>{t("dashboard")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/habits")}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    <span>{t("myHabits")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/identity")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>{t("identityMenu")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/analytics")}>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <span>{t("statsMenu")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/week")}>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{t("weeklyOverviewMenu")}</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push("/settings")}>
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
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Book className="mr-2 h-4 w-4" />
                      <span>{t("quickHelp")}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => router.push("/help/getting-started")}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        <span>{t("gettingStarted")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push("/help/implementation-intentions")}
                      >
                        <Zap className="mr-2 h-4 w-4" />
                        <span>{t("ifThenPlans")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push("/help/habit-strength")}>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        <span>{t("habitStrength")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push("/help/neuroplasticity")}>
                        <Brain className="mr-2 h-4 w-4" />
                        <span>{t("66dayScience")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push("/help/woop")}>
                        <Award className="mr-2 h-4 w-4" />
                        <span>{t("woopMethod")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push("/help")}>
                        <HelpCircle className="mr-2 h-4 w-4" />
                        <span>{t("allHelp")}</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
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
        </div>
      </div>
    </header>
  )
}
