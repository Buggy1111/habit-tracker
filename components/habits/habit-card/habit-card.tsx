"use client"

import { useState, useCallback, useMemo, memo } from "react"
import { useRouter } from "next/navigation"
import {
  Check,
  Flame,
  MoreVertical,
  Target,
  Sparkles,
  Brain,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useCompleteHabit, useDeleteHabit, type Habit } from "@/hooks/use-habits"
import { EditHabitDialog } from "../edit-habit-dialog"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { useHelpContent } from "@/hooks/use-help-content"

interface HabitCardProps {
  habit: Habit
}

export const HabitCard = memo(function HabitCard({ habit }: HabitCardProps) {
  const HELP_CONTENT = useHelpContent()
  const router = useRouter()
  const t = useTranslations("habits.card")
  const tDelete = useTranslations("habits.deleteDialog")
  const tCommon = useTranslations("common")
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const { mutate: completeHabit, isPending } = useCompleteHabit()
  const { mutate: deleteHabit, isPending: isDeleting } = useDeleteHabit()

  const handleComplete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation() // Prevent card click
      if (!habit.completed && !isPending) {
        completeHabit(habit.id)
      }
    },
    [habit.completed, habit.id, isPending, completeHabit]
  )

  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    setEditDialogOpen(true)
  }, [])

  const handleDeleteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    setDeleteDialogOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    deleteHabit(habit.id)
    setDeleteDialogOpen(false)
  }, [habit.id, deleteHabit])

  const handleCardClick = useCallback(() => {
    router.push(`/habits/${habit.id}`)
  }, [habit.id, router])

  // Format implementation intention - memoized
  const { hasIntention, intentionText } = useMemo(() => {
    const hasIntention = !!(habit.trigger || habit.action)
    const intentionText = [habit.trigger, habit.action, habit.context ? `v ${habit.context}` : null]
      .filter(Boolean)
      .join(", ")
    return { hasIntention, intentionText }
  }, [habit.trigger, habit.action, habit.context])

  return (
    <Card
      className="relative overflow-hidden transition-shadow hover:shadow-lg cursor-pointer"
      onClick={handleCardClick}
      role="article"
      aria-label={t("ariaLabel", { name: habit.name, status: habit.completed ? t("ariaCompleted") : t("ariaIncomplete") })}
    >
      <div className="absolute left-0 top-0 h-1 w-full" style={{ backgroundColor: habit.color }} />
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div
              className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg flex-shrink-0"
              style={{ backgroundColor: `${habit.color}20` }}
              aria-hidden="true"
            >
              <Target className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: habit.color }} />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-sm sm:text-base lg:text-lg truncate">
                {habit.name}
              </CardTitle>
              {habit.description && (
                <CardDescription className="text-xs sm:text-sm line-clamp-2">
                  {habit.description}
                </CardDescription>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => e.stopPropagation()}
                aria-label={t("optionsAria", { name: habit.name })}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>{tCommon("edit")}</DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={handleDeleteClick}
                disabled={isDeleting}
              >
                {tCommon("delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {hasIntention && (
          <div
            className="rounded-lg bg-primary/10 border border-primary/20 p-2 sm:p-3"
            role="region"
            aria-label={t("implementationIntention")}
          >
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-xs sm:text-sm text-primary">{intentionText}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div
            className="flex items-center space-x-2"
            role="status"
            aria-label={`${t("streak")}: ${habit.streak} ${habit.streak === 1 ? tCommon("day") : habit.streak < 5 ? tCommon("days2to4") : tCommon("days5plus")}`}
          >
            <Flame className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" aria-hidden="true" />
            <span className="text-xs sm:text-sm lg:text-base font-medium">
              {habit.streak} {habit.streak === 1 ? tCommon("day") : habit.streak < 5 ? tCommon("days2to4") : tCommon("days5plus")}
            </span>
            <InfoTooltip
              title={HELP_CONTENT.currentStreak.title}
              content={HELP_CONTENT.currentStreak.short}
              side="top"
              className="ml-1"
            />
          </div>
          <Badge variant={habit.completed ? "default" : "outline"} className="text-xs sm:text-sm">
            {habit.completed ? tCommon("completedLabel") : tCommon("pendingLabel")}
          </Badge>
        </div>

        {/* Science-based metrics */}
        <div
          className="grid grid-cols-2 gap-2 sm:gap-3"
          role="region"
          aria-label={t("scienceMetrics")}
        >
          {/* Habit Strength */}
          {habit.habitStrength !== undefined && habit.strengthLevel && (
            <div
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
              role="status"
              aria-label={`${t("strength")}: ${habit.habitStrength}/100`}
            >
              <TrendingUp
                className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0"
                style={{ color: habit.strengthLevel.color }}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{t("strength")}</p>
                  <InfoTooltip
                    title={HELP_CONTENT.habitStrength.title}
                    content={HELP_CONTENT.habitStrength.short}
                    learnMoreLink={HELP_CONTENT.habitStrength.learnMoreLink}
                    side="top"
                  />
                </div>
                <p
                  className="text-xs sm:text-sm font-semibold truncate"
                  style={{ color: habit.strengthLevel.color }}
                >
                  {habit.habitStrength}/100
                </p>
              </div>
            </div>
          )}

          {/* Neuroplasticity Phase */}
          {habit.neuroplasticityPhase && (
            <div
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20"
              role="status"
              aria-label={`${t("phase")}: ${habit.neuroplasticityPhase.phase}/4`}
            >
              <Brain
                className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 text-purple-500"
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{t("phase")}</p>
                  <InfoTooltip
                    title={HELP_CONTENT.neuroplasticity.title}
                    content={HELP_CONTENT.neuroplasticity.short}
                    learnMoreLink={HELP_CONTENT.neuroplasticity.learnMoreLink}
                    side="top"
                  />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400 truncate">
                  {habit.neuroplasticityPhase.phase}/4
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Extinction Burst Warning */}
        {habit.extinctionBurst?.detected && (
          <div
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30"
            role="alert"
            aria-live="polite"
          >
            <AlertTriangle
              className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 text-orange-500"
              aria-hidden="true"
            />
            <p className="text-[10px] sm:text-xs font-medium text-orange-600 dark:text-orange-400">
              {t("extinctionBurstDetected")}
            </p>
          </div>
        )}

        <Progress
          value={habit.completed ? 100 : 0}
          className="h-2 sm:h-2.5"
          aria-label={`${habit.completed ? tCommon("completedLabel") : tCommon("pendingLabel")}`}
        />

        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                className="w-full text-xs sm:text-sm lg:text-base"
                size="default"
                variant={habit.completed ? "outline" : "default"}
                onClick={handleComplete}
                disabled={habit.completed || isPending}
                aria-label={
                  habit.completed
                    ? `${habit.name} - ${t("completedToday")}`
                    : isPending
                      ? t("marking")
                      : t("markAsDone")
                }
              >
                {habit.completed ? (
                  <>
                    <Check className="mr-2 h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                    {t("completedToday")}
                  </>
                ) : isPending ? (
                  <>{t("marking")}</>
                ) : (
                  <>
                    <Check className="mr-2 h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                    {t("markAsDone")}
                  </>
                )}
              </Button>
            </TooltipTrigger>
            {!habit.completed && (
              <TooltipContent side="top" className="max-w-xs">
                <p className="font-semibold text-sm">{HELP_CONTENT.completeHabit.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {HELP_CONTENT.completeHabit.short}
                </p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </CardContent>

      <EditHabitDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} habit={habit} />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{tDelete("title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {tDelete("description", { name: habit.name })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{tCommon("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? tDelete("deleting") : tDelete("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
})
