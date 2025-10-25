import { HabitDifficultyLog } from "@prisma/client"

export interface AdaptationRecommendation {
  needsAdaptation: boolean
  weeksOfHighDifficulty: number
  averageDifficulty: number
  suggestions: string[]
  urgencyLevel: "low" | "medium" | "high"
}

/**
 * Analyze difficulty logs and determine if habit needs adaptation
 * Based on BJ Fogg's Behavior Model: If Ability is low (high difficulty),
 * we need to make the habit easier
 */
export function analyzeHabitDifficulty(
  difficultyLogs: HabitDifficultyLog[],
  habitName: string
): AdaptationRecommendation {
  // Need at least 3 weeks of data
  if (difficultyLogs.length < 3) {
    return {
      needsAdaptation: false,
      weeksOfHighDifficulty: 0,
      averageDifficulty: 0,
      suggestions: [],
      urgencyLevel: "low",
    }
  }

  // Sort by date (newest first)
  const sortedLogs = [...difficultyLogs].sort(
    (a, b) => new Date(b.weekStart).getTime() - new Date(a.weekStart).getTime()
  )

  // Get most recent 6 weeks (or all available)
  const recentLogs = sortedLogs.slice(0, 6)

  // Calculate average difficulty
  const totalDifficulty = recentLogs.reduce((sum, log) => sum + log.rating, 0)
  const averageDifficulty = totalDifficulty / recentLogs.length

  // Count consecutive weeks of high difficulty (4-5)
  let weeksOfHighDifficulty = 0
  for (const log of recentLogs) {
    if (log.rating >= 4) {
      weeksOfHighDifficulty++
    } else {
      break // Stop at first non-high difficulty week
    }
  }

  // Determine if adaptation is needed
  const needsAdaptation = weeksOfHighDifficulty >= 3

  // Determine urgency
  let urgencyLevel: "low" | "medium" | "high" = "low"
  if (weeksOfHighDifficulty >= 5) urgencyLevel = "high"
  else if (weeksOfHighDifficulty >= 4) urgencyLevel = "medium"
  else if (weeksOfHighDifficulty >= 3) urgencyLevel = "medium"

  // Generate suggestions based on BJ Fogg's model
  const suggestions: string[] = []

  if (needsAdaptation) {
    suggestions.push(
      `Tento návyk je pro tebe opakovaně obtížný. Podle BJ Fogga je důležité návyk zjednodušit, ne zvýšit motivaci.`
    )

    // Specific suggestions based on difficulty level
    if (averageDifficulty >= 4.5) {
      suggestions.push(
        `Zkus návyk drasticky zmenšit: místo "${habitName}" zkus "udělat jen první krok" (např. místo "30 minut cvičení" jen "obléct se do sportovního oblečení").`
      )
    } else {
      suggestions.push(
        `Zvaž zmenšení návyku na polovinu nebo třetinu: místo "${habitName}" zkus méně náročnou verzi.`
      )
    }

    suggestions.push(
      "Odstraň překážky: Co ti brání? Můžeš to připravit předem? (Např. připravit si oblečení večer předem)"
    )

    suggestions.push(
      'Použij "Habit Stacking": Napoj návyk na něco, co už děláš automaticky. (Např. "Po čištění zubů udělám 5 dřepů")'
    )

    if (weeksOfHighDifficulty >= 5) {
      suggestions.push(
        "⚠️ URGENTNÍ: Tento návyk je dlouhodobě neudržitelný. Důrazně doporučujeme zjednodušit NYNÍ, jinak riskuješ úplné vzdání."
      )
    }
  }

  return {
    needsAdaptation,
    weeksOfHighDifficulty,
    averageDifficulty,
    suggestions,
    urgencyLevel,
  }
}

/**
 * Generate difficulty trend description
 */
export function getDifficultyTrend(
  difficultyLogs: HabitDifficultyLog[]
): "improving" | "stable" | "worsening" | "unknown" {
  if (difficultyLogs.length < 2) return "unknown"

  const sortedLogs = [...difficultyLogs].sort(
    (a, b) => new Date(a.weekStart).getTime() - new Date(b.weekStart).getTime()
  )

  const recentLogs = sortedLogs.slice(-4) // Last 4 weeks

  if (recentLogs.length < 2) return "unknown"

  const firstHalf = recentLogs.slice(0, Math.ceil(recentLogs.length / 2))
  const secondHalf = recentLogs.slice(Math.ceil(recentLogs.length / 2))

  const firstAvg = firstHalf.reduce((sum, log) => sum + log.rating, 0) / firstHalf.length
  const secondAvg = secondHalf.reduce((sum, log) => sum + log.rating, 0) / secondHalf.length

  const difference = secondAvg - firstAvg

  if (difference < -0.5) return "improving" // Getting easier
  if (difference > 0.5) return "worsening" // Getting harder
  return "stable"
}

/**
 * Format difficulty rating as emoji + text
 */
export function formatDifficultyRating(rating: number): {
  emoji: string
  label: string
  color: string
} {
  const ratings = [
    { value: 1, emoji: "😄", label: "Velmi snadné", color: "text-green-600" },
    { value: 2, emoji: "🙂", label: "Snadné", color: "text-lime-600" },
    { value: 3, emoji: "😐", label: "Středně obtížné", color: "text-yellow-600" },
    { value: 4, emoji: "😟", label: "Obtížné", color: "text-orange-600" },
    { value: 5, emoji: "😫", label: "Velmi obtížné", color: "text-red-600" },
  ]

  return ratings.find((r) => r.value === rating) || ratings[2]
}
