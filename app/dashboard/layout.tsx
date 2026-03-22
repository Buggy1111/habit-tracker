"use client"

import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { FloatingHelpButton } from "@/components/common/floating-help-button"
import { WelcomeDialog } from "@/components/onboarding/welcome-dialog"
import { SkipToContent } from "@/components/common/skip-to-content"
import { SidebarUserMenu } from "./_components/sidebar-user-menu"
import { SidebarNav } from "./_components/sidebar-nav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const t = useTranslations("nav")
  const tDashboard = useTranslations("dashboard")

  useEffect(() => {
    setMounted(true)
  }, [])

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    if (email) return email[0].toUpperCase()
    return "U"
  }

  const userInitials = getInitials(session?.user?.name, session?.user?.email)
  const userName = session?.user?.name || tDashboard("user")
  const userEmail = session?.user?.email || "user@example.com"

  const sidebarContent = (
    <>
      <SidebarUserMenu
        userName={userName}
        userEmail={userEmail}
        userInitials={userInitials}
        userImage={session?.user?.image}
        mounted={mounted}
      />

      {/* Logo/Title */}
      <div className="mb-6 pb-4 border-b border-white/10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Habit Tracker
        </h1>
        <p className="text-xs text-muted-foreground mt-1">{t("sidebarTagline")}</p>
      </div>
    </>
  )

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-primary/5 via-30% to-background relative overflow-hidden">
      <SkipToContent />

      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          style={{ willChange: "transform, opacity" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          style={{ willChange: "transform, opacity" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="relative h-full flex flex-col p-6">
            {sidebarContent}
            <SidebarNav animated />
            <div className="mt-auto pt-6 border-t border-white/10">
              <div className="text-xs text-muted-foreground text-center">
                {t("sidebarFooter")}
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Sidebar - Mobile */}
      {isSidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25 }}
            className="lg:hidden fixed left-0 top-0 h-screen w-72 p-4 z-50"
          >
            <div className="w-full h-full rounded-2xl border border-white/20 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-2xl shadow-2xl overflow-hidden">
              <div className="relative h-full flex flex-col p-6">
                {sidebarContent}
                <SidebarNav onItemClick={() => setIsSidebarOpen(false)} />
                <div className="mt-auto pt-6 border-t border-white/10">
                  <div className="text-xs text-muted-foreground text-center">
                    {t("sidebarFooter")}
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}

      {/* Main content */}
      <main id="main-content" className="lg:ml-64 xl:ml-72 relative">
        {children}
      </main>

      <FloatingHelpButton />
      <WelcomeDialog />
    </div>
  )
}
