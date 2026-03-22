"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, Trophy, AlertCircle, Lightbulb } from "lucide-react"
import { WeeklyInsights } from "@/lib/algorithms/weekly-insights"
import { useTranslations } from "next-intl"

interface WeeklyInsightsCardProps {
  insights: WeeklyInsights
}

export function WeeklyInsightsCard({ insights }: WeeklyInsightsCardProps) {
  const t = useTranslations("review")
  const getTrendIcon = () => {
    if (insights.trends === "improving") return <TrendingUp className="h-4 w-4 text-green-500" />
    if (insights.trends === "declining") return <TrendingDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-yellow-500" />
  }

  const getTrendColor = () => {
    if (insights.trends === "improving") return "text-green-600 dark:text-green-400"
    if (insights.trends === "declining") return "text-red-600 dark:text-red-400"
    return "text-yellow-600 dark:text-yellow-400"
  }

  const getTrendLabel = () => {
    if (insights.trends === "improving") return t("improving")
    if (insights.trends === "declining") return t("declining")
    return t("stable")
  }

  return (
    <div className="space-y-6">
      {/* Celebration */}
      {insights.celebration && (
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-300 dark:border-yellow-700">
          <div className="flex items-start gap-3">
            <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
            <p className="font-medium text-yellow-900 dark:text-yellow-100">
              {insights.celebration}
            </p>
          </div>
        </Card>
      )}

      {/* Overall Stats */}
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold text-lg">{t("insightsWeekOverview")}</h3>

        {/* Completion Rate */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t("completionRate")}</span>
            <span className="text-2xl font-bold">{insights.completionRate}%</span>
          </div>
          <Progress value={insights.completionRate} className="h-2" />
        </div>

        {/* Improvement */}
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-sm text-muted-foreground">{t("improvementLabel")}</span>
          <div className="flex items-center gap-2">
            <span className={`text-lg font-semibold ${getTrendColor()}`}>
              {insights.improvement > 0 ? "+" : ""}
              {insights.improvement}%
            </span>
            {getTrendIcon()}
          </div>
        </div>

        {/* Active Days */}
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-sm text-muted-foreground">{t("activeDays")}</span>
          <span className="text-lg font-semibold">{insights.activeDays}/7</span>
        </div>

        {/* Trend Badge */}
        <div className="flex justify-center pt-2">
          <Badge variant="outline" className="gap-2">
            {getTrendIcon()}
            <span>{getTrendLabel()}</span>
          </Badge>
        </div>
      </Card>

      {/* Top & Struggling Habits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Habit */}
        {insights.topHabit && insights.topHabit.completionRate > 0 && (
          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-300 dark:border-green-700">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-900 dark:text-green-100">
                  {t("topHabit")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: insights.topHabit.habit.color }}
                />
                <p className="font-semibold text-green-900 dark:text-green-100">
                  {insights.topHabit.habit.name}
                </p>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                {t("daysCount", { completions: insights.topHabit.completions, total: insights.topHabit.totalDays, rate: Math.round(insights.topHabit.completionRate) })}
                {Math.round(insights.topHabit.completionRate)}%)
              </p>
            </div>
          </Card>
        )}

        {/* Struggling Habit */}
        {insights.strugglingHabit && insights.strugglingHabit.completionRate < 50 && (
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-300 dark:border-orange-700">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-medium text-orange-900 dark:text-orange-100">
                  {t("needsAttention")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: insights.strugglingHabit.habit.color }}
                />
                <p className="font-semibold text-orange-900 dark:text-orange-100">
                  {insights.strugglingHabit.habit.name}
                </p>
              </div>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                {t("daysCount", { completions: insights.strugglingHabit.completions, total: insights.strugglingHabit.totalDays, rate: Math.round(insights.strugglingHabit.completionRate) })}
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Suggestions */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-semibold text-lg">{t("recommendations")}</h3>
        </div>
        <ul className="space-y-3">
          {insights.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{suggestion}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
