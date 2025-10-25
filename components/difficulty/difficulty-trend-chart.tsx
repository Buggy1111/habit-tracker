"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HabitDifficultyLog } from "@prisma/client"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { formatDifficultyRating, getDifficultyTrend } from "@/lib/algorithms/difficulty-adaptation"
import { format } from "date-fns"
import { cs } from "date-fns/locale"

interface DifficultyTrendChartProps {
  difficultyLogs: HabitDifficultyLog[]
}

export function DifficultyTrendChart({ difficultyLogs }: DifficultyTrendChartProps) {
  if (difficultyLogs.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground text-center">
          Zatím žádná data o obtížnosti. Vyplň týdenní reflexi pro sledování trendu.
        </p>
      </Card>
    )
  }

  // Sort by date (oldest first for chart)
  const sortedLogs = [...difficultyLogs].sort(
    (a, b) => new Date(a.weekStart).getTime() - new Date(b.weekStart).getTime()
  )

  // Get trend
  const trend = getDifficultyTrend(difficultyLogs)

  const getTrendIcon = () => {
    if (trend === "improving") return <TrendingDown className="h-4 w-4 text-green-500" />
    if (trend === "worsening") return <TrendingUp className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-yellow-500" />
  }

  const getTrendLabel = () => {
    if (trend === "improving") return "Zlepšuje se"
    if (trend === "worsening") return "Zhoršuje se"
    if (trend === "stable") return "Stabilní"
    return "Nedostatek dat"
  }

  const getTrendColor = () => {
    if (trend === "improving")
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
    if (trend === "worsening") return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
  }

  // Calculate average
  const averageDifficulty = sortedLogs.reduce((sum, log) => sum + log.rating, 0) / sortedLogs.length

  return (
    <Card className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Trend obtížnosti</h3>
        <Badge variant="outline" className={`gap-2 ${getTrendColor()}`}>
          {getTrendIcon()}
          <span>{getTrendLabel()}</span>
        </Badge>
      </div>

      {/* Chart (simple bar chart) */}
      <div className="space-y-4">
        {sortedLogs.map((log) => {
          const { emoji, color } = formatDifficultyRating(log.rating)
          const percentage = (log.rating / 5) * 100

          return (
            <div key={log.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {format(new Date(log.weekStart), "d. MMM yyyy", { locale: cs })}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{emoji}</span>
                  <span className={`font-medium ${color}`}>{log.rating}/5</span>
                </div>
              </div>

              {/* Bar */}
              <div className="relative h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    log.rating >= 4
                      ? "bg-red-500"
                      : log.rating >= 3
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Note */}
              {log.note && (
                <p className="text-xs text-muted-foreground italic pl-2 border-l-2 border-gray-300 dark:border-gray-700">
                  &ldquo;{log.note}&rdquo;
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="pt-4 border-t space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Průměrná obtížnost</span>
          <span className="text-lg font-semibold">{averageDifficulty.toFixed(1)}/5.0</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Počet týdnů</span>
          <span className="text-lg font-semibold">{sortedLogs.length}</span>
        </div>
      </div>

      {/* Interpretation */}
      <div className="p-4 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          💡 <strong>Interpretace:</strong>{" "}
          {averageDifficulty >= 4
            ? "Tento návyk je pro tebe velmi náročný. Zvažuješ zjednodušení?"
            : averageDifficulty >= 3
              ? "Návyk je středně náročný, což je v pořádku. Sleduj, zda se trend nezhoršuje."
              : "Skvělé! Návyk je pro tebe snadno zvládnutelný."}
        </p>
      </div>
    </Card>
  )
}
