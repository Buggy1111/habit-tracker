"use client"

import { cn } from "@/lib/utils"
import { MessageSquare } from "lucide-react"

interface CalendarMonthViewProps {
  currentDate: Date
  logs: Array<{
    date: Date
    completed: boolean
    note?: string | null
  }>
  onCellClick: (date: Date) => void
}

export function CalendarMonthView({ currentDate, logs, onCellClick }: CalendarMonthViewProps) {
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
      return [dateStr, { completed: log.completed, note: log.note }]
    })
  )

  const getDayStatus = (day: number): "completed" | "missed" | "future" | "today" => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    date.setHours(0, 0, 0, 0)

    // Check if it's today
    if (date.getTime() === today.getTime()) {
      const log = logsMap.get(date.toDateString())
      return log?.completed ? "completed" : "today"
    }

    // Future days
    if (date > today) {
      return "future"
    }

    // Past days
    const log = logsMap.get(date.toDateString())
    return log?.completed ? "completed" : "missed"
  }

  const hasNote = (day: number): boolean => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const log = logsMap.get(date.toDateString())
    return !!(log?.note && log.note.trim().length > 0)
  }

  const handleDayClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    date.setHours(0, 0, 0, 0)
    onCellClick(date)
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {["Po", "Út", "St", "Čt", "Pá", "So", "Ne"].map((day) => (
          <div
            key={day}
            className="text-center text-[10px] sm:text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Actual days */}
        {days.map((day) => {
          const status = getDayStatus(day)
          const showNote = hasNote(day)

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={cn(
                "relative aspect-square flex items-center justify-center rounded-sm sm:rounded-md text-xs sm:text-sm font-medium transition-all",
                "hover:ring-2 hover:ring-primary hover:scale-105 cursor-pointer",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                status === "completed" && "bg-green-500 text-white hover:bg-green-600",
                status === "missed" && "bg-red-500/20 text-red-600 hover:bg-red-500/30",
                status === "today" &&
                  "bg-blue-500 text-white ring-2 ring-blue-400 hover:bg-blue-600",
                status === "future" &&
                  "bg-yellow-500/10 text-yellow-700 border-2 border-yellow-500/30 hover:bg-yellow-500/20"
              )}
            >
              {day}
              {showNote && (
                <div className="absolute bottom-0.5 right-0.5 bg-orange-500 rounded-sm p-0.5">
                  <MessageSquare className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-white" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 sm:gap-4 pt-2 text-[10px] sm:text-xs border-t">
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
          <div className="w-4 h-4 rounded bg-yellow-500/10 border-2 border-yellow-500/30" />
          <span className="text-muted-foreground">Budoucnost</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 rounded-sm p-0.5">
            <MessageSquare className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="text-muted-foreground">S poznámkou</span>
        </div>
      </div>
    </div>
  )
}
