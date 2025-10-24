"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface HabitCalendarProps {
  habitId: string
  habitName: string
  logs: {
    date: Date
    completed: boolean
  }[]
}

export function HabitCalendar({ habitId, habitName, logs }: HabitCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Get first and last day of current month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

  // Get day of week for first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const startDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1 // Convert to Monday = 0

  // Total days in month
  const daysInMonth = lastDayOfMonth.getDate()

  // Create array of days
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Create logs map for quick lookup
  const logsMap = new Map(
    logs.map((log) => {
      const dateStr = new Date(log.date).toDateString()
      return [dateStr, log.completed]
    })
  )

  const getDayStatus = (day: number): "completed" | "missed" | "future" | "today" => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    date.setHours(0, 0, 0, 0)

    // Check if it's today
    if (date.getTime() === today.getTime()) {
      const completed = logsMap.get(date.toDateString())
      return completed ? "completed" : "today"
    }

    // Future days
    if (date > today) {
      return "future"
    }

    // Past days
    const completed = logsMap.get(date.toDateString())
    return completed ? "completed" : "missed"
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const monthName = currentDate.toLocaleDateString("cs-CZ", { month: "long", year: "numeric" })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{habitName}</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth("prev")}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[140px] text-center capitalize">
              {monthName}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth("next")}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Po", "Út", "St", "Čt", "Pá", "So", "Ne"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Actual days */}
          {days.map((day) => {
            const status = getDayStatus(day)
            return (
              <div
                key={day}
                className={cn(
                  "aspect-square flex items-center justify-center rounded-md text-sm font-medium transition-colors",
                  status === "completed" && "bg-green-500 text-white",
                  status === "missed" && "bg-red-500/20 text-red-600",
                  status === "today" && "bg-blue-500 text-white ring-2 ring-blue-400",
                  status === "future" && "bg-muted text-muted-foreground"
                )}
              >
                {day}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span className="text-muted-foreground">Splněno</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500/50" />
            <span className="text-muted-foreground">Nesplněno</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500 ring-2 ring-blue-400" />
            <span className="text-muted-foreground">Dnes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted" />
            <span className="text-muted-foreground">Budoucnost</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
