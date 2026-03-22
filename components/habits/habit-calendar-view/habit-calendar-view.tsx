"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogEntryDialog } from "../log-entry-dialog"
import { CalendarMonthView } from "../calendar-month-view"
import { CalendarWeekView } from "../calendar-week-view"
import { CalendarDayView } from "../calendar-day-view"

type ViewMode = "month" | "week" | "day"

interface HabitCalendarViewProps {
  habitId: string
  habitName: string
  habitColor?: string
  logs: Array<{
    date: Date
    completed: boolean
    note?: string | null
  }>
}

export function HabitCalendarView({
  habitId,
  habitName,
  habitColor = "#6366f1",
  logs,
}: HabitCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Navigation handlers
  const navigatePrev = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (viewMode === "month") {
        newDate.setMonth(prev.getMonth() - 1)
      } else if (viewMode === "week") {
        newDate.setDate(prev.getDate() - 7)
      } else {
        newDate.setDate(prev.getDate() - 1)
      }
      return newDate
    })
  }

  const navigateNext = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (viewMode === "month") {
        newDate.setMonth(prev.getMonth() + 1)
      } else if (viewMode === "week") {
        newDate.setDate(prev.getDate() + 7)
      } else {
        newDate.setDate(prev.getDate() + 1)
      }
      return newDate
    })
  }

  const navigateToday = () => {
    setCurrentDate(new Date())
  }

  // Get header text based on view mode
  const getHeaderText = () => {
    if (viewMode === "month") {
      return currentDate.toLocaleDateString("cs-CZ", {
        month: "long",
        year: "numeric",
      })
    } else if (viewMode === "week") {
      // Get start and end of week
      const startOfWeek = new Date(currentDate)
      const day = startOfWeek.getDay()
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1)
      startOfWeek.setDate(diff)

      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      return `${startOfWeek.toLocaleDateString("cs-CZ", {
        day: "numeric",
        month: "short",
      })} - ${endOfWeek.toLocaleDateString("cs-CZ", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}`
    } else {
      return currentDate.toLocaleDateString("cs-CZ", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    }
  }

  // Handle cell click
  const handleCellClick = (date: Date) => {
    setSelectedDate(date)
  }

  // Find existing log for selected date
  const selectedLog = selectedDate
    ? logs.find((log) => new Date(log.date).toDateString() === selectedDate.toDateString())
    : null

  return (
    <>
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Top row: Title and View Switcher */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <div
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: habitColor }}
                />
                <span className="truncate">{habitName}</span>
              </CardTitle>

              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
                <TabsList className="grid w-full grid-cols-3 sm:w-auto">
                  <TabsTrigger value="month" className="text-xs sm:text-sm">
                    Měsíc
                  </TabsTrigger>
                  <TabsTrigger value="week" className="text-xs sm:text-sm">
                    Týden
                  </TabsTrigger>
                  <TabsTrigger value="day" className="text-xs sm:text-sm">
                    Den
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Bottom row: Navigation */}
            <div className="flex items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={navigateToday}
                className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
              >
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Dnes</span>
              </Button>
              <div className="flex items-center gap-1 sm:gap-2 flex-1 justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-9 sm:w-9"
                  onClick={navigatePrev}
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <span className="text-[10px] sm:text-sm font-medium min-w-[120px] sm:min-w-[180px] text-center capitalize px-1">
                  {getHeaderText()}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-9 sm:w-9"
                  onClick={navigateNext}
                >
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              <div className="w-[48px] sm:w-[72px]" /> {/* Spacer for alignment */}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6">
          {/* Render view based on mode */}
          {viewMode === "month" && (
            <CalendarMonthView
              currentDate={currentDate}
              logs={logs}
              onCellClick={handleCellClick}
            />
          )}
          {viewMode === "week" && (
            <CalendarWeekView currentDate={currentDate} logs={logs} onCellClick={handleCellClick} />
          )}
          {viewMode === "day" && (
            <CalendarDayView currentDate={currentDate} logs={logs} onEditClick={handleCellClick} />
          )}
        </CardContent>
      </Card>

      {/* Log Entry Dialog */}
      {selectedDate && (
        <LogEntryDialog
          open={!!selectedDate}
          onOpenChange={(open) => !open && setSelectedDate(null)}
          habitId={habitId}
          habitName={habitName}
          habitColor={habitColor}
          date={selectedDate}
          existingLog={selectedLog}
        />
      )}
    </>
  )
}
