"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Target,
  Calendar,
  ListTodo,
  Sparkles,
  BarChart3,
  Menu,
  X,
  LogOut,
  Settings,
  User,
  HelpCircle,
  Moon,
  Sun,
} from "lucide-react"
import { cn } from "@/lib/utils"
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
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { FloatingHelpButton } from "@/components/common/floating-help-button"
import { WelcomeDialog } from "@/components/onboarding/welcome-dialog"

const sidebarItems = [
  {
    title: "Přehled",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Hlavní dashboard",
  },
  {
    title: "Dnes",
    href: "/dashboard/today",
    icon: Target,
    description: "Dnešní úkoly",
  },
  {
    title: "Týden",
    href: "/dashboard/week",
    icon: Calendar,
    description: "Týdenní přehled",
  },
  {
    title: "Návyky",
    href: "/dashboard/habits",
    icon: ListTodo,
    description: "Všechny návyky",
  },
  {
    title: "Identita",
    href: "/dashboard/identity",
    icon: Sparkles,
    description: "Kým se chci stát",
  },
  {
    title: "WOOP Metoda",
    href: "/dashboard/woop",
    icon: Sparkles,
    description: "Plánování cílů",
  },
  {
    title: "Statistiky",
    href: "/dashboard/analytics",
    icon: BarChart3,
    description: "Pokročilé statistiky",
  },
  {
    title: "Nastavení",
    href: "/dashboard/settings",
    icon: Settings,
    description: "Účet a preference",
  },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

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
  const userName = session?.user?.name || "Uživatel"
  const userEmail = session?.user?.email || "user@example.com"

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-primary/5 via-30% to-background relative overflow-hidden">
      {/* Animated background blobs - GPU accelerated */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          style={{ willChange: "transform, opacity" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          style={{ willChange: "transform, opacity" }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-card/80 backdrop-blur-xl border-white/20 shadow-xl"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar - Desktop */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex fixed left-0 top-0 h-screen w-64 xl:w-72 p-4 xl:p-6 z-40"
      >
        <div className="w-full h-full rounded-2xl border border-white/20 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-2xl shadow-2xl overflow-hidden relative group">
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          {/* Content */}
          <div className="relative h-full flex flex-col p-6">
            {/* User Menu */}
            <div className="mb-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-auto p-3 hover:bg-primary/10"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={session?.user?.image || undefined} alt={userName} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-left flex-1 min-w-0">
                      <p className="text-sm font-medium leading-none truncate w-full">{userName}</p>
                      <p className="text-xs text-muted-foreground truncate w-full mt-1">
                        {userEmail}
                      </p>
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
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Nastavení</span>
                    </DropdownMenuItem>
                    {mounted && (
                      <DropdownMenuItem
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      >
                        {theme === "dark" ? (
                          <Sun className="mr-2 h-4 w-4" />
                        ) : (
                          <Moon className="mr-2 h-4 w-4" />
                        )}
                        <span>{theme === "dark" ? "Světlý režim" : "Tmavý režim"}</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => router.push("/help")}>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Nápověda</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Odhlásit se</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Logo/Title */}
            <div className="mb-6 pb-4 border-b border-white/10">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Habit Tracker
              </h1>
              <p className="text-xs text-muted-foreground mt-1">Science-based změna návyků</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
              {sidebarItems.map((item, index) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link key={item.href} href={item.href} prefetch={true}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                      style={{ willChange: "transform" }}
                      className={cn(
                        "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group/item",
                        isActive
                          ? "bg-gradient-to-r from-primary/20 to-blue-500/20 text-primary shadow-lg shadow-primary/10"
                          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-blue-500 rounded-r-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}

                      <Icon
                        className={cn(
                          "h-5 w-5 transition-transform duration-300 group-hover/item:scale-110",
                          isActive && "text-primary"
                        )}
                      />

                      <div className="flex-1">
                        <div className={cn("text-sm font-medium", isActive && "text-primary")}>
                          {item.title}
                        </div>
                        {!isActive && (
                          <div className="text-xs text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                )
              })}
            </nav>

            {/* Bottom section */}
            <div className="mt-auto pt-6 border-t border-white/10">
              <div className="text-xs text-muted-foreground text-center">
                Built on behavioral psychology
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Sidebar - Mobile */}
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25 }}
            className="lg:hidden fixed left-0 top-0 h-screen w-72 p-4 z-50"
          >
            <div className="w-full h-full rounded-2xl border border-white/20 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-2xl shadow-2xl overflow-hidden">
              <div className="relative h-full flex flex-col p-6">
                {/* User Menu */}
                <div className="mb-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 h-auto p-3 hover:bg-primary/10"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={session?.user?.image || undefined} alt={userName} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start text-left flex-1 min-w-0">
                          <p className="text-sm font-medium leading-none truncate w-full">
                            {userName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate w-full mt-1">
                            {userEmail}
                          </p>
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
                        <DropdownMenuItem onClick={() => router.push("/settings")}>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Nastavení</span>
                        </DropdownMenuItem>
                        {mounted && (
                          <DropdownMenuItem
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                          >
                            {theme === "dark" ? (
                              <Sun className="mr-2 h-4 w-4" />
                            ) : (
                              <Moon className="mr-2 h-4 w-4" />
                            )}
                            <span>{theme === "dark" ? "Světlý režim" : "Tmavý režim"}</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => router.push("/help")}>
                          <HelpCircle className="mr-2 h-4 w-4" />
                          <span>Nápověda</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Odhlásit se</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Logo/Title */}
                <div className="mb-6 pb-4 border-b border-white/10">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Habit Tracker
                  </h1>
                  <p className="text-xs text-muted-foreground mt-1">Science-based změna návyků</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2">
                  {sidebarItems.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        prefetch={true}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <div
                          className={cn(
                            "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                            isActive
                              ? "bg-gradient-to-r from-primary/20 to-blue-500/20 text-primary shadow-lg shadow-primary/10"
                              : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-blue-500 rounded-r-full" />
                          )}

                          <Icon className={cn("h-5 w-5", isActive && "text-primary")} />

                          <div className="flex-1">
                            <div className={cn("text-sm font-medium", isActive && "text-primary")}>
                              {item.title}
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </nav>

                {/* Bottom section */}
                <div className="mt-auto pt-6 border-t border-white/10">
                  <div className="text-xs text-muted-foreground text-center">
                    Built on behavioral psychology
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}

      {/* Main content */}
      <main className="lg:ml-64 xl:ml-72 relative">{children}</main>

      {/* Floating Help Button */}
      <FloatingHelpButton />

      {/* Welcome/Onboarding Dialog for new users */}
      <WelcomeDialog />
    </div>
  )
}
