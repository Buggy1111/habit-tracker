"use client"

import { memo } from "react"
import { useTranslations } from "next-intl"
import { HabitCard } from "../habit-card"
import { HabitsEmptyState } from "../habits-empty-state"
import { HabitListSkeleton } from "../habit-list-skeleton"
import { useHabits } from "@/hooks/use-habits"
import { getErrorMessage } from "@/lib/utils/error-handler"

interface HabitListProps {
  onCreateHabit?: () => void
}

export const HabitList = memo(function HabitList({ onCreateHabit }: HabitListProps) {
  const t = useTranslations("habits")
  const tErrors = useTranslations("errors")
  const { data: habits, isLoading, error } = useHabits()

  // Loading state
  if (isLoading) {
    return <HabitListSkeleton />
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-destructive p-8 text-center">
        <h3 className="text-lg font-semibold text-destructive">{tErrors("somethingWentWrong")}</h3>
        <p className="text-sm text-muted-foreground mt-2">{getErrorMessage(error)}</p>
      </div>
    )
  }

  if (!habits || habits.length === 0) {
    return onCreateHabit ? (
      <HabitsEmptyState onCreateHabit={onCreateHabit} />
    ) : (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center">
          <h3 className="mt-4 text-lg font-semibold">{t("noHabits")}</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            {t("noHabitsDesc")}
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
