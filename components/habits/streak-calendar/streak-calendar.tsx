"use client"

import { Flame } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StreakCalendarProps {
  habitId: string
  logs: Array<{ date: Date; completed: boolean }>
}

export function StreakCalendar({ logs }: StreakCalendarProps) {
  // Calculate current streak
  const calculateStreak = () => {
    let streak = 0
    const sortedLogs = [...logs].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    for (let i = 0; i < sortedLogs.length; i++) {
      if (sortedLogs[i].completed) {
        streak++
      } else {
        break
      }
    }

    return streak
  }

  const streak = calculateStreak()

  // Generate last 30 days
  const generateLast30Days = () => {
    const days = []
    const today = new Date()

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)

      const log = logs.find(
        (l) => new Date(l.date).toDateString() === date.toDateString()
      )

      days.push({
        date,
        completed: log?.completed || false,
        dayOfWeek: date.toLocaleDateString("en-US", { weekday: "short" }),
        dayOfMonth: date.getDate(),
      })
    }

    return days
  }

  const last30Days = generateLast30Days()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Activity</CardTitle>
          <div className="flex items-center space-x-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">{streak} day streak</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-10 gap-1">
          {last30Days.map((day, index) => (
            <div
              key={index}
              className="group relative aspect-square"
              title={`${day.date.toLocaleDateString()}: ${
                day.completed ? "Completed" : "Not completed"
              }`}
            >
              <div
                className={`h-full w-full rounded-sm transition-all ${
                  day.completed
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-muted hover:bg-muted/70"
                }`}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </CardContent>
    </Card>
  )
}
