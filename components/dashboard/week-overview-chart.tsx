"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { type Habit } from "@/hooks/use-habits"

interface WeekOverviewChartProps {
  habits: Habit[]
}

interface DayData {
  day: string
  date: Date
  completionRate: number
  completed: number
  total: number
}

export function WeekOverviewChart({ habits }: WeekOverviewChartProps) {
  const weekData = useMemo(() => {
    const today = new Date()
    const data: DayData[] = []

    // Generate last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)

      // Count completions for this day
      let completed = 0
      let total = habits.length

      habits.forEach((habit) => {
        const log = habit.logs.find((log) => {
          const logDate = new Date(log.date)
          logDate.setHours(0, 0, 0, 0)
          return logDate.getTime() === date.getTime()
        })

        if (log?.completed) {
          completed++
        }
      })

      const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

      data.push({
        day: date.toLocaleDateString("cs-CZ", { weekday: "short" }),
        date,
        completionRate,
        completed,
        total,
      })
    }

    return data
  }, [habits])

  const maxRate = Math.max(...weekData.map((d) => d.completionRate), 1)

  return (
    <div className="space-y-4">
      {/* Chart */}
      <div className="flex items-end justify-between gap-2 h-48 px-2">
        {weekData.map((day, index) => {
          const height = (day.completionRate / maxRate) * 100
          const isToday = day.date.toDateString() === new Date().toDateString()

          return (
            <motion.div
              key={index}
              className="flex-1 flex flex-col items-center gap-2 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Bar */}
              <div className="relative w-full flex flex-col justify-end h-40">
                <motion.div
                  className={`relative w-full rounded-t-lg transition-all duration-300 ${
                    isToday
                      ? "bg-gradient-to-t from-primary to-blue-500"
                      : day.completionRate >= 80
                      ? "bg-gradient-to-t from-green-500 to-emerald-500"
                      : day.completionRate >= 50
                      ? "bg-gradient-to-t from-orange-500 to-yellow-500"
                      : "bg-gradient-to-t from-gray-400 to-gray-500"
                  } group-hover:opacity-80`}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                >
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="bg-popover text-popover-foreground text-xs rounded-lg px-3 py-2 shadow-xl border whitespace-nowrap">
                      <div className="font-semibold">{day.day}</div>
                      <div className="text-muted-foreground">
                        {day.completed}/{day.total} návyků
                      </div>
                      <div className="font-medium text-primary">
                        {day.completionRate}%
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                      <div className="border-4 border-transparent border-t-popover" />
                    </div>
                  </div>

                  {/* Percentage label inside bar */}
                  {day.completionRate > 20 && (
                    <div className="absolute top-2 left-0 right-0 text-center text-xs font-semibold text-white opacity-90">
                      {day.completionRate}%
                    </div>
                  )}
                </motion.div>

                {/* Percentage label below bar if too small */}
                {day.completionRate <= 20 && day.completionRate > 0 && (
                  <div className="absolute -bottom-6 left-0 right-0 text-center text-xs font-medium text-muted-foreground">
                    {day.completionRate}%
                  </div>
                )}
              </div>

              {/* Day label */}
              <div
                className={`text-xs font-medium transition-colors ${
                  isToday
                    ? "text-primary font-bold"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {day.day}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-primary to-blue-500" />
          <span className="text-muted-foreground">Dnes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-green-500 to-emerald-500" />
          <span className="text-muted-foreground">≥80%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-orange-500 to-yellow-500" />
          <span className="text-muted-foreground">50-79%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-gray-400 to-gray-500" />
          <span className="text-muted-foreground">&lt;50%</span>
        </div>
      </div>
    </div>
  )
}
