"use client"

import { cn } from "@/lib/utils"
import { Check, X, MessageSquare } from "lucide-react"

interface CalendarWeekViewProps {
  currentDate: Date
  logs: Array<{
    date: Date
    completed: boolean
    note?: string | null
  }>
  onCellClick: (date: Date) => void
}

export function CalendarWeekView({ currentDate, logs, onCellClick }: CalendarWeekViewProps) {
  // Get start of week (Monday)
  const getWeekStart = (date: Date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Adjust for Monday start
    d.setDate(diff)
    d.setHours(0, 0, 0, 0)
    return d
  }

  const startOfWeek = getWeekStart(currentDate)

  // Generate 7 days
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    return date
  })

  // Create logs map for quick lookup
  const logsMap = new Map(
    logs.map((log) => {
      const dateStr = new Date(log.date).toDateString()
      return [dateStr, { completed: log.completed, note: log.note }]
    })
  )

  const getDayStatus = (date: Date): "completed" | "missed" | "future" | "today" => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)

    // Check if it's today
    if (checkDate.getTime() === today.getTime()) {
      const log = logsMap.get(checkDate.toDateString())
      return log?.completed ? "completed" : "today"
    }

    // Future days
    if (checkDate > today) {
      return "future"
    }

    // Past days
    const log = logsMap.get(checkDate.toDateString())
    return log?.completed ? "completed" : "missed"
  }

  const hasNote = (date: Date): boolean => {
    const log = logsMap.get(date.toDateString())
    return !!(log?.note && log.note.trim().length > 0)
  }

  const getNote = (date: Date): string | undefined => {
    const log = logsMap.get(date.toDateString())
    return log?.note || undefined
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Week days grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3">
        {weekDays.map((date, index) => {
          const status = getDayStatus(date)
          const showNote = hasNote(date)
          const noteText = getNote(date)

          const dayName = date.toLocaleDateString("cs-CZ", { weekday: "short" })
          const dayNumber = date.getDate()

          return (
            <button
              key={index}
              onClick={() => onCellClick(date)}
              className={cn(
                "relative flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 md:p-4 rounded-md sm:rounded-lg transition-all",
                "hover:ring-2 hover:ring-primary hover:scale-105 cursor-pointer",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                "min-h-[90px] sm:min-h-[110px] md:min-h-[120px]",
                status === "completed" && "bg-green-500/10 border-2 border-green-500",
                status === "missed" && "bg-red-500/10 border-2 border-red-500/50",
                status === "today" &&
                  "bg-blue-500/10 border-2 border-blue-500 ring-2 ring-blue-400",
                status === "future" && "bg-yellow-500/10 border-2 border-yellow-500/30"
              )}
            >
              {/* Day name */}
              <div className="text-[9px] sm:text-xs font-medium text-muted-foreground uppercase">
                {dayName}
              </div>

              {/* Day number */}
              <div
                className={cn(
                  "text-lg sm:text-xl md:text-2xl font-bold",
                  status === "completed" && "text-green-600",
                  status === "missed" && "text-red-600",
                  status === "today" && "text-blue-600",
                  status === "future" && "text-yellow-700"
                )}
              >
                {dayNumber}
              </div>

              {/* Status icon */}
              <div className="flex items-center justify-center">
                {status === "completed" && (
                  <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-green-500">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                  </div>
                )}
                {status === "missed" && (
                  <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-red-500/20">
                    <X className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-red-600" />
                  </div>
                )}
                {status === "today" && !logsMap.get(date.toDateString()) && (
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 border-dashed border-blue-400" />
                )}
              </div>

              {/* Note indicator */}
              {showNote && (
                <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-orange-500 rounded-sm sm:rounded-md p-0.5 sm:p-1">
                  <MessageSquare className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                </div>
              )}

              {/* Note preview (if exists) */}
              {noteText && (
                <div className="hidden sm:block text-xs text-muted-foreground line-clamp-2 text-center px-2">
                  {noteText}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 pt-2 text-xs border-t">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-green-500 bg-green-500/10" />
          <span className="text-muted-foreground">Splněno</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-red-500/50 bg-red-500/10" />
          <span className="text-muted-foreground">Nesplněno</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-blue-500 bg-blue-500/10" />
          <span className="text-muted-foreground">Dnes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 rounded-md p-0.5">
            <MessageSquare className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="text-muted-foreground">S poznámkou</span>
        </div>
      </div>
    </div>
  )
}
