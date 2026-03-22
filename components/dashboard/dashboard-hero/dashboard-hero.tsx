"use client"

import { useState, useEffect } from "react"
import { Sparkles, Calendar as CalendarIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

interface DashboardHeroProps {
  userName?: string
  completedToday: number
  totalHabits: number
  currentStreak: number
}

export function DashboardHero({ completedToday, totalHabits, currentStreak }: DashboardHeroProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const t = useTranslations("dashboard")

  useEffect(() => {
    // Update every minute instead of every second (reduces re-renders by 60x)
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000) // 60 seconds

    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentDate.getHours()
    if (hour < 12) return t("greetingMorning")
    if (hour < 18) return t("greetingAfternoon")
    return t("greetingEvening")
  }

  const formatDate = () => {
    return currentDate.toLocaleDateString("cs-CZ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = () => {
    return currentDate.toLocaleTimeString("cs-CZ", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getMotivationalMessage = () => {
    const percentage = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0

    if (percentage === 100) {
      return t("motivationAllDone")
    } else if (percentage >= 75) {
      return t("motivation75")
    } else if (percentage >= 50) {
      return t("motivation50")
    } else if (percentage > 0) {
      return t("motivationStarted")
    } else if (totalHabits > 0) {
      return t("motivationNew")
    } else {
      return t("motivationNoHabits")
    }
  }

  const percentage = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0

  return (
    <Card className="relative overflow-hidden border-white/20 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-2xl shadow-2xl">
      {/* OPTIMIZED: Replaced infinite framer-motion with CSS animation (better performance) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-500/10 to-purple-500/10 animate-gradient-shift"
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      {/* Noise texture overlay for premium feel */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30" />

      {/* Content */}
      <div className="relative p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div className="space-y-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">{getGreeting()}!</h2>
              <div className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="font-medium">{formatDate()}</span>
                </div>
                <span className="hidden sm:inline text-muted-foreground/50">•</span>
                <span className="hidden sm:inline font-mono font-semibold text-primary">
                  {formatTime()}
                </span>
              </div>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              {getMotivationalMessage()}
            </p>
          </div>

          {/* Quick stats with animation */}
          <div className="flex gap-4 sm:gap-6 lg:gap-8">
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            >
              <motion.div
                className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                {percentage}%
              </motion.div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">{t("todayLabel")}</div>
            </motion.div>
            {currentStreak > 0 && (
              <motion.div
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-500 flex items-center gap-1">
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {currentStreak}
                  </motion.span>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                  </motion.div>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">{t("streakLabel")}</div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Animated Progress bar */}
        {totalHabits > 0 && (
          <motion.div
            className="mt-4 sm:mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative h-3 sm:h-4 bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </div>
            <motion.div
              className="flex justify-between mt-2 text-xs sm:text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span className="font-medium">{t("completed", { count: completedToday })}</span>
              <span>{t("remaining", { count: totalHabits - completedToday })}</span>
            </motion.div>
          </motion.div>
        )}
      </div>
    </Card>
  )
}
