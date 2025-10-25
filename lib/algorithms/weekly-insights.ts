import { Habit, HabitLog } from "@prisma/client"
import { startOfWeek, endOfWeek, subWeeks, isWithinInterval, differenceInDays } from "date-fns"

export interface HabitWeekData {
  habit: Habit
  completions: number
  totalDays: number
  completionRate: number
}

export interface WeeklyInsights {
  weekStart: Date
  weekEnd: Date
  completionRate: number
  improvement: number
  activeDays: number
  topHabit: HabitWeekData | null
  strugglingHabit: HabitWeekData | null
  trends: "improving" | "stable" | "declining"
  suggestions: string[]
  celebration: string | null
}

export function calculateWeeklyInsights(
  habits: Habit[],
  logs: HabitLog[],
  weekStart: Date,
  weekEnd: Date
): WeeklyInsights {
  const weekLogs = logs.filter((log) =>
    isWithinInterval(log.date, { start: weekStart, end: weekEnd })
  )

  // Previous week for comparison
  const prevWeekStart = subWeeks(weekStart, 1)
  const prevWeekEnd = subWeeks(weekEnd, 1)
  const prevWeekLogs = logs.filter((log) =>
    isWithinInterval(log.date, { start: prevWeekStart, end: prevWeekEnd })
  )

  // Calculate habit-specific data
  const habitData: HabitWeekData[] = habits.map((habit) => {
    const habitLogs = weekLogs.filter((log) => log.habitId === habit.id && log.completed)
    const totalDays = differenceInDays(weekEnd, weekStart) + 1
    const completions = habitLogs.length
    const completionRate = (completions / totalDays) * 100

    return { habit, completions, totalDays, completionRate }
  })

  // Overall completion rate
  const totalPossible = habits.length * (differenceInDays(weekEnd, weekStart) + 1)
  const totalCompletions = weekLogs.filter((log) => log.completed).length
  const completionRate =
    totalPossible > 0 ? Math.round((totalCompletions / totalPossible) * 100) : 0

  // Previous week completion rate
  const prevTotalPossible = habits.length * (differenceInDays(prevWeekEnd, prevWeekStart) + 1)
  const prevTotalCompletions = prevWeekLogs.filter((log) => log.completed).length
  const prevCompletionRate =
    prevTotalPossible > 0 ? Math.round((prevTotalCompletions / prevTotalPossible) * 100) : 0

  // Improvement
  const improvement = completionRate - prevCompletionRate

  // Active days (days with at least 1 completion)
  const activeDaysSet = new Set(
    weekLogs.filter((log) => log.completed).map((log) => log.date.toISOString().split("T")[0])
  )
  const activeDays = activeDaysSet.size

  // Top and struggling habits
  const topHabit = habitData.sort((a, b) => b.completionRate - a.completionRate)[0] || null
  const strugglingHabit = habitData.sort((a, b) => a.completionRate - b.completionRate)[0] || null

  // Trends
  let trends: "improving" | "stable" | "declining" = "stable"
  if (improvement > 10) trends = "improving"
  else if (improvement < -10) trends = "declining"

  // Suggestions
  const suggestions = generateSuggestions(habitData, completionRate, trends)

  // Celebration
  const celebration = generateCelebration(completionRate, improvement, activeDays)

  return {
    weekStart,
    weekEnd,
    completionRate,
    improvement,
    activeDays,
    topHabit,
    strugglingHabit,
    trends,
    suggestions,
    celebration,
  }
}

function generateSuggestions(
  habitData: HabitWeekData[],
  completionRate: number,
  trends: "improving" | "stable" | "declining"
): string[] {
  const suggestions: string[] = []

  // Low completion rate
  if (completionRate < 50) {
    suggestions.push(
      "Zvaž zjednodušení návyků nebo snížení jejich počtu na zvládnutelnější úroveň."
    )
  }

  // Struggling habits
  const struggling = habitData.filter((h) => h.completionRate < 40)
  if (struggling.length > 0) {
    suggestions.push(
      `Návyk "${struggling[0].habit.name}" má nízkou úspěšnost. Zkus použít WOOP metodu pro překonání překážek.`
    )
  }

  // Declining trend
  if (trends === "declining") {
    suggestions.push(
      "Tvůj pokrok klesá. Může jít o Extinction Burst - je to normální! Drž se plánu."
    )
  }

  // High completion rate
  if (completionRate > 80) {
    suggestions.push("Skvělá práce! Zvažuješ přidání nového návyku do své rutiny?")
  }

  // No suggestions
  if (suggestions.length === 0) {
    suggestions.push("Pokračuj v tom, co děláš. Konzistence je klíčem k dlouhodobému úspěchu.")
  }

  return suggestions
}

function generateCelebration(
  completionRate: number,
  improvement: number,
  activeDays: number
): string | null {
  if (completionRate === 100) {
    return "Perfektní týden! 100% dokončených návyků! 🎉"
  }

  if (improvement >= 20) {
    return `Wow! Zlepšení o ${improvement}% oproti minulému týdnu! 🚀`
  }

  if (activeDays === 7) {
    return "Pracoval jsi na návycích každý den tento týden! 💪"
  }

  if (completionRate >= 80) {
    return "Skvělý týden! Udržuješ si vysokou konzistenci! ⭐"
  }

  return null
}

// Helper: Get week start (Monday)
export function getWeekStart(date: Date = new Date()): Date {
  return startOfWeek(date, { weekStartsOn: 1 }) // 1 = Monday
}

// Helper: Get week end (Sunday)
export function getWeekEnd(date: Date = new Date()): Date {
  return endOfWeek(date, { weekStartsOn: 1 })
}

// Helper: Should prompt for weekly review?
export function shouldPromptWeeklyReview(lastReviewDate: Date | null): boolean {
  if (!lastReviewDate) return true // Never reviewed

  const weeksSinceReview = differenceInDays(new Date(), lastReviewDate) / 7
  return weeksSinceReview >= 1 // Review every week
}
