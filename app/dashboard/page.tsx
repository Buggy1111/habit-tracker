"use client"

import { ArrowRight, Target, Calendar, ListTodo, TrendingUp, Sparkles } from "lucide-react"
import Link from "next/link"
import { useHabits } from "@/hooks/use-habits"
import { useIdentities } from "@/hooks/use-identities"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

// Lazy load heavy components
const DashboardHero = dynamic(
  () => import("@/components/dashboard/dashboard-hero").then(mod => ({ default: mod.DashboardHero })),
  { loading: () => <Skeleton className="h-48 w-full rounded-2xl" /> }
)

const StatsOverview = dynamic(
  () => import("@/components/dashboard/stats-overview").then(mod => ({ default: mod.StatsOverview })),
  { loading: () => <div className="grid gap-4 sm:grid-cols-4"><Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" /></div> }
)

const ExtinctionBurstAlert = dynamic(
  () => import("@/components/habits/extinction-burst-alert").then(mod => ({ default: mod.ExtinctionBurstAlert })),
  { ssr: false }
)

export default function DashboardPage() {
  const router = useRouter()
  const { data: habits, isLoading } = useHabits()
  const { data: identities } = useIdentities()

  // Calculate stats
  const totalHabits = habits?.length || 0
  const completedToday = habits?.filter((h) => h.completed).length || 0
  const totalIdentities = identities?.length || 0

  // Find habits with extinction burst
  const habitsWithExtinctionBurst = habits?.filter(
    (h) => h.extinctionBurst?.detected
  ) || []

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

  const weeklyCompletionRate = calculateWeeklyRate()

  const quickLinks = [
    {
      title: "Dnešní úkoly",
      description: "Zaměř se na dnešní návyky",
      href: "/dashboard/today",
      icon: Target,
      gradient: "from-blue-500 to-cyan-500",
      stats: `${completedToday}/${totalHabits} splněno`
    },
    {
      title: "Identity Designer",
      description: "Kým se chceš stát?",
      href: "/dashboard/identity",
      icon: Sparkles,
      gradient: "from-purple-500 to-pink-500",
      stats: `${totalIdentities} ${totalIdentities === 1 ? "identita" : totalIdentities < 5 ? "identity" : "identit"}`
    },
    {
      title: "Týdenní přehled",
      description: "Sleduj svůj pokrok za týden",
      href: "/dashboard/week",
      icon: Calendar,
      gradient: "from-indigo-500 to-purple-500",
      stats: `${weeklyCompletionRate}% úspěšnost`
    },
    {
      title: "Všechny návyky",
      description: "Spravuj všechny své návyky",
      href: "/dashboard/habits",
      icon: ListTodo,
      gradient: "from-green-500 to-emerald-500",
      stats: `${totalHabits} aktivních`
    },
    {
      title: "Statistiky",
      description: "Detailní analýza pokroku",
      href: "/dashboard/analytics",
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-500",
      stats: `${longestStreak} nejdelší série`
    }
  ]

  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">

      {/* Hero Section - Full width banner with animation */}
      <motion.section
        className="mb-8 lg:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!isLoading && (
          <DashboardHero
            completedToday={completedToday}
            totalHabits={totalHabits}
            currentStreak={currentStreak}
          />
        )}
      </motion.section>

      {/* Extinction Burst Alerts */}
      {!isLoading && habitsWithExtinctionBurst.length > 0 && (
        <motion.section
          className="mb-8 lg:mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {habitsWithExtinctionBurst.map((habit, index) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
            >
              <ExtinctionBurstAlert
                result={habit.extinctionBurst!}
                habitName={habit.name}
                onLearnMore={() => router.push(`/habits/${habit.id}`)}
              />
            </motion.div>
          ))}
        </motion.section>
      )}

      {/* Stats Section - Cards with stagger animation */}
      <motion.section
        className="mb-8 lg:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
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

      {/* Quick Links Section */}
      <motion.section
        className="mb-8 lg:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Rychlý přístup</h2>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {quickLinks.map((link, index) => {
            const Icon = link.icon

            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Link href={link.href}>
                  <div className="relative group h-full rounded-2xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    {/* Gradient accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${link.gradient}`} />

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    {/* Content */}
                    <div className="relative p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${link.gradient} bg-opacity-20`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform duration-300" />
                      </div>

                      <h3 className="text-lg font-semibold mb-2">{link.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{link.description}</p>

                      <div className={`text-sm font-medium bg-gradient-to-r ${link.gradient} bg-clip-text text-transparent`}>
                        {link.stats}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.section>
    </div>
  )
}
