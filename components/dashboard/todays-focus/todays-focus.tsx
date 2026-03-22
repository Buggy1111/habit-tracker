"use client"

import { Check, Circle, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCompleteHabit } from "@/hooks/use-habits"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { useTranslations } from "next-intl"

interface TodaysFocusProps {
  habits: {
    id: string
    name: string
    color: string
    completed: boolean
    trigger?: string | null
    action?: string | null
    context?: string | null
  }[]
}

export function TodaysFocus({ habits }: TodaysFocusProps) {
  const { mutate: completeHabit, isPending } = useCompleteHabit()
  const t = useTranslations("habits.todaysFocus")

  const handleComplete = (habitId: string) => {
    completeHabit(habitId)
  }

  const pendingHabits = habits.filter((h) => !h.completed)
  const completedHabits = habits.filter((h) => h.completed)

  if (habits.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              {t("title")}
            </CardTitle>
            <InfoTooltip
              title={t("title")}
              content={t("help")}
              side="top"
            />
          </div>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            {completedHabits.length}/{habits.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3 p-4 sm:p-6 pt-0">
        {/* Pending habits */}
        {pendingHabits.map((habit) => {
          const hasIntention = habit.trigger || habit.action
          const intentionText = [habit.trigger, habit.action, habit.context]
            .filter(Boolean)
            .join(", ")

          return (
            <div
              key={habit.id}
              className="group flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div
                className="h-2 w-2 sm:h-3 sm:w-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: habit.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-xs sm:text-sm">{habit.name}</div>
                {hasIntention && (
                  <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
                    <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground flex-shrink-0" />
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                      {intentionText}
                    </p>
                  </div>
                )}
              </div>
              <Button
                size="sm"
                onClick={() => handleComplete(habit.id)}
                disabled={isPending}
                className="flex-shrink-0 h-7 sm:h-8 text-xs sm:text-sm px-2 sm:px-3"
              >
                <Check className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                <span className="hidden sm:inline">{t("complete")}</span>
              </Button>
            </div>
          )
        })}

        {/* Completed habits */}
        {completedHabits.length > 0 && (
          <>
            {pendingHabits.length > 0 && (
              <div className="border-t pt-2 sm:pt-3 mt-2 sm:mt-3">
                <p className="text-xs text-muted-foreground mb-2">{t("completed")}</p>
              </div>
            )}
            {completedHabits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-green-500/10 border border-green-500/20"
              >
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-xs sm:text-sm text-muted-foreground line-through">
                    {habit.name}
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="flex-shrink-0 bg-green-500/20 text-green-700 dark:text-green-300 text-xs"
                >
                  {t("completed")}
                </Badge>
              </div>
            ))}
          </>
        )}

        {/* All done state */}
        {pendingHabits.length === 0 && completedHabits.length > 0 && (
          <div className="text-center py-4 sm:py-6 space-y-2">
            <div className="text-3xl sm:text-4xl">🎉</div>
            <p className="font-semibold text-sm sm:text-base">{t("allDone")}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t("allDoneMessage")}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
