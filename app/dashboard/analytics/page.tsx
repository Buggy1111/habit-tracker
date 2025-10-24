"use client"

import { StatsOverview } from "@/components/dashboard/stats-overview"
import { useHabits } from "@/hooks/use-habits"
import { motion } from "framer-motion"
import { TrendingUp, Target, Calendar, Award } from "lucide-react"

export default function AnalyticsPage() {
  const { data: habits, isLoading } = useHabits()

  // Calculate stats
  const totalHabits = habits?.length || 0
  const completedToday = habits?.filter((h) => h.completed).length || 0

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

  // Get current streak (max streak from habits)
  const currentStreak = habits?.reduce((max, habit) => Math.max(max, habit.streak), 0) || 0

  // Get longest streak
  const longestStreak = currentStreak

  // Calculate monthly completion rate
  const calculateMonthlyRate = () => {
    if (!habits || habits.length === 0) return 0

    const last30Days = new Date()
    last30Days.setDate(last30Days.getDate() - 30)

    let totalPossible = 0
    let totalCompleted = 0

    habits.forEach((habit) => {
      const recentLogs = habit.logs.filter(
        (log) => new Date(log.date) >= last30Days
      )
      totalPossible += 30
      totalCompleted += recentLogs.filter((log) => log.completed).length
    })

    return totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0
  }

  const weeklyCompletionRate = calculateWeeklyRate()
  const monthlyCompletionRate = calculateMonthlyRate()

  // Calculate total completions
  const totalCompletions = habits?.reduce((sum, habit) => {
    return sum + habit.logs.filter(log => log.completed).length
  }, 0) || 0

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
          Statistiky & Analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          Detailní přehled tvého pokroku a výkonnosti
        </p>
      </motion.div>

      {/* Main Stats Overview */}
      <motion.section
        className="mb-8 lg:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {!isLoading && (
          <StatsOverview
            totalHabits={totalHabits}
            completedToday={completedToday}
            weeklyCompletionRate={weeklyCompletionRate}
            longestStreak={longestStreak}
          />
        )}
      </motion.section>

      {/* Additional Analytics */}
      <motion.div
        className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Monthly Performance */}
        <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-2xl overflow-hidden relative group hover:shadow-primary/10 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <div className="relative p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20">
                <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Měsíční výkon</h3>
                <p className="text-sm text-muted-foreground">Posledních 30 dní</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Úspěšnost</span>
                  <span className="text-sm font-medium">{monthlyCompletionRate}%</span>
                </div>
                <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
                    style={{ width: `${monthlyCompletionRate}%` }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  {totalCompletions}
                </div>
                <div className="text-sm text-muted-foreground">Celkem dokončeno</div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Habit */}
        <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-2xl overflow-hidden relative group hover:shadow-primary/10 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <div className="relative p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
                <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Nejlepší návyk</h3>
                <p className="text-sm text-muted-foreground">Největší série</p>
              </div>
            </div>

            {habits && habits.length > 0 ? (
              <div className="space-y-4">
                {(() => {
                  const bestHabit = habits.reduce((best, habit) =>
                    habit.streak > best.streak ? habit : best
                  , habits[0])

                  return (
                    <>
                      <div className="flex items-center gap-3">
                        <div
                          className="h-10 w-10 rounded-full flex items-center justify-center text-2xl"
                          style={{ backgroundColor: bestHabit.color + '20' }}
                        >
                          {bestHabit.icon || '🎯'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{bestHabit.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Aktuální série: {bestHabit.streak} {bestHabit.streak === 1 ? 'den' : bestHabit.streak < 5 ? 'dny' : 'dní'}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <div className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                          {Math.round((bestHabit.logs.filter(l => l.completed).length / Math.max(bestHabit.logs.length, 1)) * 100)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Celková úspěšnost</div>
                      </div>
                    </>
                  )
                })()}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground text-center py-4">
                Zatím žádné návyky
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Insights Section */}
      <motion.section
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <div className="relative p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Insights & Doporučení</h3>
                <p className="text-sm text-muted-foreground">Personalizované tipy pro zlepšení</p>
              </div>
            </div>

            <div className="space-y-4">
              {weeklyCompletionRate >= 80 ? (
                <div className="flex gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl">🎉</div>
                  <div className="flex-1">
                    <div className="font-medium text-green-700 dark:text-green-300">Skvělá práce!</div>
                    <div className="text-sm text-muted-foreground">
                      Tvoje úspěšnost je nad 80%. Pokračuj v tomhle trendu!
                    </div>
                  </div>
                </div>
              ) : weeklyCompletionRate >= 50 ? (
                <div className="flex gap-3 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <div className="text-2xl">💪</div>
                  <div className="flex-1">
                    <div className="font-medium text-orange-700 dark:text-orange-300">Dobrá práce!</div>
                    <div className="text-sm text-muted-foreground">
                      Máš slušnou úspěšnost. Zkus se zaměřit na konzistenci.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-2xl">🌱</div>
                  <div className="flex-1">
                    <div className="font-medium text-blue-700 dark:text-blue-300">Začínáš</div>
                    <div className="text-sm text-muted-foreground">
                      Každý začátek je těžký. Soustřeď se na malé kroky každý den.
                    </div>
                  </div>
                </div>
              )}

              {currentStreak > 0 && (
                <div className="flex gap-3 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="text-2xl">🔥</div>
                  <div className="flex-1">
                    <div className="font-medium text-purple-700 dark:text-purple-300">Máš aktivní sérii!</div>
                    <div className="text-sm text-muted-foreground">
                      {currentStreak} {currentStreak === 1 ? 'den' : currentStreak < 5 ? 'dny' : 'dní'} v řadě. Neuhasni plamen!
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
