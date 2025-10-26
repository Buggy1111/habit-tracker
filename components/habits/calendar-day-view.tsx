"use client"

import { cn } from "@/lib/utils"
import { Check, X, Edit, Calendar, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CalendarDayViewProps {
  currentDate: Date
  logs: Array<{
    date: Date
    completed: boolean
    note?: string | null
    createdAt?: Date
  }>
  onEditClick: (date: Date) => void
}

export function CalendarDayView({ currentDate, logs, onEditClick }: CalendarDayViewProps) {
  // Normalize current date to start of day
  const normalizedDate = new Date(currentDate)
  normalizedDate.setHours(0, 0, 0, 0)

  // Find log for current date
  const log = logs.find((l) => new Date(l.date).toDateString() === normalizedDate.toDateString())

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const isToday = normalizedDate.getTime() === today.getTime()
  const isFuture = normalizedDate > today
  const isPast = normalizedDate < today

  const status = log?.completed ? "completed" : isFuture ? "future" : isToday ? "today" : "missed"

  const dayName = normalizedDate.toLocaleDateString("cs-CZ", {
    weekday: "long",
  })
  const dayNumber = normalizedDate.getDate()
  const monthYear = normalizedDate.toLocaleDateString("cs-CZ", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Date header */}
      <div className="text-center space-y-1 sm:space-y-2">
        <div className="text-xs sm:text-sm font-medium text-muted-foreground uppercase">
          {dayName}
        </div>
        <div className="text-3xl sm:text-4xl font-bold">{dayNumber}</div>
        <div className="text-xs sm:text-sm text-muted-foreground capitalize">{monthYear}</div>
      </div>

      {/* Status card */}
      <div
        className={cn(
          "rounded-lg p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 border-2",
          status === "completed" && "bg-green-500/10 border-green-500",
          status === "missed" && "bg-red-500/10 border-red-500/50",
          status === "today" && "bg-blue-500/10 border-blue-500",
          status === "future" && "bg-yellow-500/10 border-yellow-500/30"
        )}
      >
        {/* Status indicator */}
        <div className="flex items-center justify-center">
          {status === "completed" && (
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500">
                <Check className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <div className="text-base sm:text-lg font-semibold text-green-600">Splněno</div>
            </div>
          )}

          {status === "missed" && (
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-500/20">
                <X className="h-8 w-8 sm:h-10 sm:w-10 text-red-600" />
              </div>
              <div className="text-base sm:text-lg font-semibold text-red-600">Nesplněno</div>
            </div>
          )}

          {status === "today" && (
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-dashed border-blue-400 flex items-center justify-center">
                <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />
              </div>
              <div className="text-base sm:text-lg font-semibold text-blue-600">Dnes</div>
            </div>
          )}

          {status === "future" && (
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-yellow-500/40 flex items-center justify-center">
                <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-600" />
              </div>
              <div className="text-base sm:text-lg font-semibold text-yellow-700">Budoucnost</div>
            </div>
          )}
        </div>

        {/* Note section */}
        {log?.note && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
              <div className="bg-orange-500 rounded-md p-1">
                <MessageSquare className="h-3 w-3 text-white" />
              </div>
              Poznámka
            </div>
            <div className="bg-background/50 rounded-md p-3 sm:p-4 text-xs sm:text-sm whitespace-pre-wrap">
              {log.note}
            </div>
          </div>
        )}

        {/* Edit button */}
        <div className="flex justify-center pt-2">
          <Button
            onClick={() => onEditClick(normalizedDate)}
            size="lg"
            className="gap-2 text-sm sm:text-base"
          >
            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
            {log ? "Upravit záznam" : "Přidat záznam"}
          </Button>
        </div>

        {/* Created timestamp (if exists) */}
        {log?.createdAt && (
          <div className="text-[10px] sm:text-xs text-center text-muted-foreground pt-2 border-t">
            Vytvořeno:{" "}
            {new Date(log.createdAt).toLocaleString("cs-CZ", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}
      </div>

      {/* Info box */}
      <div className="bg-muted/50 rounded-lg p-3 sm:p-4 space-y-1 sm:space-y-2">
        <div className="text-xs sm:text-sm font-medium">💡 Tip</div>
        <div className="text-[10px] sm:text-xs text-muted-foreground">
          {isFuture
            ? "Tento den ještě nenastal. Až přijde, můžeš zaznamenat své plnění."
            : log
              ? "Klikni na 'Upravit záznam' pro změnu stavu nebo poznámky."
              : "Klikni na 'Přidat záznam' pro označení tohoto dne jako splněného."}
        </div>
      </div>
    </div>
  )
}
