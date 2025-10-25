"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { InfoTooltip } from "@/components/ui/info-tooltip"

interface WeekOverviewProps {
  habits: {
    id: string
    name: string
    color: string
    logs: {
      date: Date
      completed: boolean
    }[]
  }[]
}

export function WeekOverview({ habits }: WeekOverviewProps) {
  // Get last 7 days
  const getDaysOfWeek = () => {
    const days = []
    const today = new Date()
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      date.setHours(0, 0, 0, 0)
      days.push(date)
    }
    return days
  }

  const daysOfWeek = getDaysOfWeek()

  const getDayName = (date: Date) => {
    const names = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"]
    return names[date.getDay()]
  }

  const isCompleted = (habit: any, date: Date) => {
    const dateStr = date.toDateString()
    return habit.logs.some(
      (log: any) => new Date(log.date).toDateString() === dateStr && log.completed
    )
  }

  if (habits.length === 0) {
    return null
  }

  // Calculate weekly completion rate
  const calculateWeeklyRate = () => {
    let totalCompleted = 0
    let totalPossible = 0

    habits.forEach((habit) => {
      const weekLogs = daysOfWeek.map((day) => isCompleted(habit, day))
      totalCompleted += weekLogs.filter(Boolean).length
      totalPossible += 7
    })

    return totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0
  }

  const weeklyRate = calculateWeeklyRate()

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Týdenní přehled
            </CardTitle>
            <InfoTooltip
              title="Týdenní přehled"
              content="Vizualizace vašich posledních 7 dní. Zelené čtverečky = splněno, červené okraje = vynecháno. Sledujte vzory a konzistenci!"
              side="top"
            />
          </div>
          <Badge variant="secondary" className="gap-1 sm:gap-2 text-xs sm:text-sm">
            {weeklyRate}% úspěšnost
          </Badge>
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
                <span className="sm:hidden">{habit.name.substring(0, 8)}{habit.name.length > 8 ? '...' : ''}</span>
              </div>
              {daysOfWeek.map((day, index) => {
                const completed = isCompleted(habit, day)
                const isFuture = day > new Date()
                const isToday = day.toDateString() === new Date().toDateString()

                return (
                  <div
                    key={index}
                    className={cn(
                      "aspect-square rounded-sm sm:rounded-md transition-all hover:scale-110 relative",
                      completed && "shadow-sm",
                      !completed && !isFuture && "border border-red-500/30 bg-red-500/5 sm:border-2",
                      isFuture && "bg-muted/50",
                      isToday && "ring-1 ring-primary ring-offset-1 sm:ring-2 sm:ring-offset-2"
                    )}
                    style={
                      completed
                        ? { backgroundColor: habit.color }
                        : {}
                    }
                  />
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
  )
}
