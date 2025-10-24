"use client"

import { WeekOverview } from "@/components/dashboard/week-overview"
import { useHabits } from "@/hooks/use-habits"
import { motion } from "framer-motion"

export default function WeekPage() {
  const { data: habits, isLoading } = useHabits()

  // Prepare habits for week view
  const habitsForWeek = habits?.map((habit) => ({
    id: habit.id,
    name: habit.name,
    color: habit.color,
    logs: habit.logs,
  })) || []

  // Calculate weekly completion rate
  const calculateWeeklyRate = () => {
    if (!habits || habits.length === 0) return 0

    const last7Days = new Date()
    last7Days.setDate(last7Days.getDate() - 7)

    let totalPossible = 0
    let totalCompleted = 0

    habits.forEach((habit) => {
      const recentLogs = habit.logs.filter(
        (log) => new Date(log.date) >= last7Days
      )
      totalPossible += 7 // 7 days
      totalCompleted += recentLogs.filter((log) => log.completed).length
    })

    return totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0
  }

  const weeklyRate = calculateWeeklyRate()

  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      {/* Page Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Týdenní přehled
        </h1>
        <p className="text-muted-foreground mt-2">
          Tvůj progress za posledních 7 dní
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="rounded-xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-xl p-6">
          <div className="text-sm text-muted-foreground mb-1">Úspěšnost týdne</div>
          <div className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            {weeklyRate}%
          </div>
        </div>

        <div className="rounded-xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-xl p-6">
          <div className="text-sm text-muted-foreground mb-1">Aktivní návyky</div>
          <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
            {habits?.length || 0}
          </div>
        </div>

        <div className="rounded-xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-xl p-6">
          <div className="text-sm text-muted-foreground mb-1">Celkem completions</div>
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {habits?.reduce((sum, habit) => sum + habit.logs.filter(log => {
              const last7Days = new Date()
              last7Days.setDate(last7Days.getDate() - 7)
              return new Date(log.date) >= last7Days && log.completed
            }).length, 0) || 0}
          </div>
        </div>
      </motion.div>

      {/* Week Overview Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {!isLoading && habitsForWeek.length > 0 ? (
          <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-2xl shadow-primary/5 overflow-hidden relative group hover:shadow-primary/10 transition-all duration-500">
            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {/* Content */}
            <div className="relative p-6">
              <WeekOverview habits={habitsForWeek} />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col items-center justify-center p-12">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-lg font-medium text-center mb-2">
                Žádná data k zobrazení
              </p>
              <p className="text-muted-foreground text-center">
                Začni sledovat návyky a uvidíš zde týdenní přehled
              </p>
            </div>
          </div>
        )}
      </motion.section>
    </div>
  )
}
