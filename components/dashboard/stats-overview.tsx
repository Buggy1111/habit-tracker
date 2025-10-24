"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, TrendingUp, Calendar, Flame } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface StatsOverviewProps {
  totalHabits: number
  completedToday: number
  weeklyCompletionRate: number
  longestStreak: number
}

export function StatsOverview({
  totalHabits,
  completedToday,
  weeklyCompletionRate,
  longestStreak,
}: StatsOverviewProps) {
  const stats = [
    {
      title: "Aktivní návyky",
      value: totalHabits,
      icon: Target,
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Splněno dnes",
      value: `${completedToday}/${totalHabits}`,
      icon: Calendar,
      gradient: "from-green-500 to-emerald-500",
      iconBg: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Úspěšnost (7 dní)",
      value: `${weeklyCompletionRate}%`,
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500",
      iconBg: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Nejdelší série",
      value: `${longestStreak} ${longestStreak === 1 ? 'den' : longestStreak < 5 ? 'dny' : 'dní'}`,
      icon: Flame,
      gradient: "from-orange-500 to-red-500",
      iconBg: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
  ]

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <Card className="relative overflow-hidden border-white/20 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 group">
            {/* Gradient accent line - animated on hover */}
            <motion.div
              className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", stat.gradient)}
              whileHover={{ height: "4px" }}
              transition={{ duration: 0.3 }}
            />

            {/* Hover shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <motion.div
                className={cn("p-2 sm:p-2.5 rounded-lg sm:rounded-xl", stat.iconBg)}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className={cn("h-4 w-4 sm:h-5 sm:w-5", stat.iconColor)} />
              </motion.div>
            </CardHeader>
            <CardContent className="relative px-4 sm:px-6 pb-4 sm:pb-6">
              <motion.div
                className={cn(
                  "text-2xl sm:text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                  stat.gradient
                )}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring" }}
              >
                {stat.value}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
