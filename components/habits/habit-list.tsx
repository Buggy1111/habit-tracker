"use client"

import { memo } from "react"
import { HabitCard } from "./habit-card"
import { HabitsEmptyState } from "./habits-empty-state"
import { useHabits } from "@/hooks/use-habits"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

interface HabitListProps {
  onCreateHabit?: () => void
}

export const HabitList = memo(function HabitList({ onCreateHabit }: HabitListProps) {
  const { data: habits, isLoading, error } = useHabits()

  // Loading state
  if (isLoading) {
    return (
      <div className="grid gap-3 sm:gap-4 md:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-destructive p-8 text-center">
        <h3 className="text-lg font-semibold text-destructive">Chyba při načítání</h3>
        <p className="text-sm text-muted-foreground mt-2">
          {error.message || "Nepodařilo se načíst návyky"}
        </p>
      </div>
    )
  }

  if (!habits || habits.length === 0) {
    return onCreateHabit ? (
      <HabitsEmptyState onCreateHabit={onCreateHabit} />
    ) : (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center">
          <h3 className="mt-4 text-lg font-semibold">Zatím žádné návyky</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            Začni budovat lepší návyky přidáním toho prvního.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-3 sm:gap-4 md:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  )
})
