"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Check, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { LogEntryDialog } from "@/components/habits/log-entry-dialog"

interface WeekOverviewProps {
  habits: {
    id: string
    name: string
    color: string
    logs: {
      date: Date
      completed: boolean
      note?: string | null
    }[]
  }[]
}

export function WeekOverview({ habits }: WeekOverviewProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    const today = new Date()
    const day = today.getDay()
    const diff = today.getDate() - day + (day === 0 ? -6 : 1) // Monday
    const monday = new Date(today)
    monday.setDate(diff)
    monday.setHours(0, 0, 0, 0)
    return monday
  })

  const [selectedCell, setSelectedCell] = useState<{
    habitId: string
    habitName: string
    habitColor: string
    date: Date
  } | null>(null)

  // Get 7 days starting from currentWeekStart (Monday)
  const getDaysOfWeek = () => {
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart)
      date.setDate(currentWeekStart.getDate() + i)
      date.setHours(0, 0, 0, 0)
      days.push(date)
    }
    return days
  }

  const daysOfWeek = getDaysOfWeek()

  // Navigation handlers
  const navigatePrevWeek = () => {
    setCurrentWeekStart((prev) => {
      const newDate = new Date(prev)
      newDate.setDate(prev.getDate() - 7)
      return newDate
    })
  }

  const navigateNextWeek = () => {
    setCurrentWeekStart((prev) => {
      const newDate = new Date(prev)
      newDate.setDate(prev.getDate() + 7)
      return newDate
    })
  }

  const navigateToday = () => {
    const today = new Date()
    const day = today.getDay()
    const diff = today.getDate() - day + (day === 0 ? -6 : 1)
    const monday = new Date(today)
    monday.setDate(diff)
    monday.setHours(0, 0, 0, 0)
    setCurrentWeekStart(monday)
  }

  // Get week range text
  const getWeekRangeText = () => {
    const endDate = new Date(currentWeekStart)
    endDate.setDate(currentWeekStart.getDate() + 6)

    return `${currentWeekStart.toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "short",
    })} - ${endDate.toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}`
  }

  const getDayName = (date: Date) => {
    const names = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"]
    return names[date.getDay()]
  }

  const getLog = (habit: WeekOverviewProps["habits"][number], date: Date) => {
    const dateStr = date.toDateString()
    return habit.logs.find((log) => new Date(log.date).toDateString() === dateStr)
  }

  if (habits.length === 0) {
    return null
  }

  // Calculate weekly completion rate
  const calculateWeeklyRate = () => {
    let totalCompleted = 0
    let totalPossible = 0

    habits.forEach((habit) => {
      const weekLogs = daysOfWeek.map((day) => {
        const log = getLog(habit, day)
        return log?.completed || false
      })
      totalCompleted += weekLogs.filter(Boolean).length
      totalPossible += 7
    })

    return totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0
  }

  const weeklyRate = calculateWeeklyRate()

  return (
    <>
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <div className="space-y-3">
            {/* Top row: Title and Success Rate */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Týdenní přehled
                </CardTitle>
                <InfoTooltip
                  title="Týdenní přehled"
                  content="Vizualizace vašeho týdne. Zelené čtverečky = splněno, červené okraje = vynecháno. Procházejte mezi týdny!"
                  side="top"
                />
              </div>
              <Badge variant="secondary" className="gap-1 sm:gap-2 text-xs sm:text-sm">
                {weeklyRate}% úspěšnost
              </Badge>
            </div>

            {/* Bottom row: Navigation */}
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={navigateToday} className="gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Dnes</span>
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={navigatePrevWeek}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium min-w-[140px] sm:min-w-[180px] text-center">
                  {getWeekRangeText()}
                </span>
                <Button variant="outline" size="icon" onClick={navigateNextWeek}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="w-[72px] sm:w-[88px]" /> {/* Spacer for alignment */}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="space-y-3 sm:space-y-4">
            {/* Header with days */}
            <div className="grid grid-cols-8 gap-1 sm:gap-2">
              <div className="text-xs sm:text-sm font-medium text-muted-foreground"></div>
              {daysOfWeek.map((day, index) => {
                const isToday = day.toDateString() === new Date().toDateString()
                return (
                  <div
                    key={index}
                    className={cn(
                      "text-center text-[10px] sm:text-xs font-medium",
                      isToday ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <div>{getDayName(day)}</div>
                    <div className="mt-0.5 sm:mt-1">{day.getDate()}</div>
                  </div>
                )
              })}
            </div>

            {/* Habits grid */}
            {habits.map((habit, habitIndex) => (
              <div
                key={habit.id}
                className="grid grid-cols-8 gap-1 sm:gap-2 items-center"
                style={{
                  animation: `slideIn 0.4s ease-out ${habitIndex * 0.05}s both`,
                }}
              >
                <div className="text-[10px] sm:text-xs lg:text-sm font-medium truncate flex items-center gap-1 sm:gap-2">
                  <div
                    className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: habit.color }}
                  />
                  <span className="hidden sm:inline">{habit.name}</span>
                  <span className="sm:hidden">
                    {habit.name.substring(0, 8)}
                    {habit.name.length > 8 ? "..." : ""}
                  </span>
                </div>
                {daysOfWeek.map((day, index) => {
                  const log = getLog(habit, day)
                  const completed = log?.completed || false
                  const noteText = log?.note?.trim() || ""
                  const hasNote = noteText.length > 0
                  const isFuture = day > new Date()
                  const isToday = day.toDateString() === new Date().toDateString()

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedCell({
                          habitId: habit.id,
                          habitName: habit.name,
                          habitColor: habit.color,
                          date: day,
                        })
                      }}
                      className={cn(
                        "aspect-square rounded-sm sm:rounded-md transition-all hover:scale-105 relative flex flex-col items-center justify-center group p-0.5 sm:p-1",
                        "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        completed && "shadow-sm",
                        !completed &&
                          !isFuture &&
                          "border border-red-500/30 bg-red-500/5 sm:border-2",
                        isFuture && "bg-yellow-500/10 border border-yellow-500/30 sm:border-2",
                        isToday && "ring-1 ring-primary ring-offset-1 sm:ring-2 sm:ring-offset-2"
                      )}
                      style={completed ? { backgroundColor: habit.color } : {}}
                      title={hasNote ? noteText : "Klikni pro přidání/úpravu záznamu"}
                    >
                      {completed && !hasNote && (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white drop-shadow-md" />
                      )}
                      {hasNote && (
                        <div className="text-white text-[7px] sm:text-[9px] leading-[1.1] text-center line-clamp-2 sm:line-clamp-3 drop-shadow-md font-semibold overflow-hidden pointer-events-none">
                          {noteText}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
          <style jsx>{`
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateX(-20px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}</style>
        </CardContent>
      </Card>

      {/* Log Entry Dialog */}
      {selectedCell && (
        <LogEntryDialog
          open={!!selectedCell}
          onOpenChange={(open) => !open && setSelectedCell(null)}
          habitId={selectedCell.habitId}
          habitName={selectedCell.habitName}
          habitColor={selectedCell.habitColor}
          date={selectedCell.date}
          existingLog={
            habits
              .find((h) => h.id === selectedCell.habitId)
              ?.logs.find(
                (log) => new Date(log.date).toDateString() === selectedCell.date.toDateString()
              ) || null
          }
        />
      )}
    </>
  )
}
