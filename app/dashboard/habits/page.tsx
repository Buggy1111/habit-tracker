"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HabitList } from "@/components/habits/habit-list"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"
import { useHabits } from "@/hooks/use-habits"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useHelpContent } from "@/hooks/use-help-content"
import { useTranslations } from "next-intl"

// Lazy load heavy components
const AddHabitDialog = dynamic(
  () =>
    import("@/components/habits/add-habit-dialog").then((mod) => ({ default: mod.AddHabitDialog })),
  { ssr: false }
)

export default function HabitsPage() {
  const HELP_CONTENT = useHelpContent()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { data: habits, isLoading } = useHabits()
  const t = useTranslations("habits")

  const totalHabits = habits?.length || 0
  const completedToday = habits?.filter((h) => h.completed).length || 0
  const activeHabits = habits?.filter((h) => h.isActive).length || 0

  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      {/* Page Header */}
      <motion.div
        className="mb-8 flex items-start justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("subtitle", { count: totalHabits })}
          </p>
        </div>
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                size="lg"
                className="relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <Plus className="mr-2 h-5 w-5" />
                  {t("newHabit")}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <p className="font-semibold text-sm">{HELP_CONTENT.createHabit.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{HELP_CONTENT.createHabit.short}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="rounded-xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-xl p-6">
          <div className="text-sm text-muted-foreground mb-1">{t("totalHabits")}</div>
          {isLoading ? (
            <Skeleton className="h-9 w-16 mt-1" />
          ) : (
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              {totalHabits}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-xl p-6">
          <div className="text-sm text-muted-foreground mb-1">{t("activeHabits")}</div>
          {isLoading ? (
            <Skeleton className="h-9 w-16 mt-1" />
          ) : (
            <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              {activeHabits}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-xl p-6">
          <div className="text-sm text-muted-foreground mb-1">{t("completedToday")}</div>
          {isLoading ? (
            <Skeleton className="h-9 w-16 mt-1" />
          ) : (
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {completedToday}
            </div>
          )}
        </div>
      </motion.div>

      {/* All Habits Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-2xl shadow-primary/5 overflow-hidden relative group hover:shadow-primary/10 transition-all duration-500">
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          {/* Content */}
          <div className="relative p-6">
            <HabitList onCreateHabit={() => setIsAddDialogOpen(true)} />
          </div>
        </div>
      </motion.section>

      <AddHabitDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  )
}
