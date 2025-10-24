/**
 * Habit Strength Score Algorithm
 *
 * Inspired by Loop Habit Tracker
 * Research backing: weighted scoring > simple streak counting
 *
 * Key principles:
 * - Recent completions matter more than old ones
 * - Exponential decay with 30-day half-life
 * - Occasional misses don't destroy progress
 * - Returns 0-100 score
 */

export interface HabitLog {
  date: Date
  completed: boolean
}

/**
 * Calculate habit strength score (0-100)
 *
 * @param logs - Array of habit completion logs
 * @param startDate - When the habit was started
 * @returns Score from 0 to 100
 */
export function calculateHabitStrength(
  logs: HabitLog[],
  startDate: Date
): number {
  if (logs.length === 0) return 0

  const today = new Date()
  let score = 0
  let totalWeight = 0

  // Calculate weighted score
  logs.forEach((log) => {
    const daysAgo = daysBetween(log.date, today)
    // Exponential decay: recent days have more weight
    // 30-day half-life means a completion 30 days ago has 50% weight
    const weight = Math.exp(-daysAgo / 30)

    if (log.completed) {
      score += weight
    }
    totalWeight += weight
  })

  // Normalize to 0-100 scale
  const strength = totalWeight > 0 ? (score / totalWeight) * 100 : 0

  return Math.round(strength)
}

/**
 * Calculate days between two dates
 */
function daysBetween(date1: Date, date2: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())
  return Math.abs(Math.floor((utc2 - utc1) / msPerDay))
}

/**
 * Get strength level description based on score
 */
export function getStrengthLevel(score: number): {
  level: string
  description: string
  color: string
} {
  if (score >= 90) {
    return {
      level: "Extrémně silný",
      description: "Tento návyk je plně automatický!",
      color: "#10B981", // green-500
    }
  } else if (score >= 70) {
    return {
      level: "Silný",
      description: "Skvělá práce! Držíš se toho konzistentně.",
      color: "#3B82F6", // blue-500
    }
  } else if (score >= 50) {
    return {
      level: "Střední",
      description: "Dobrý start. Pokračuj v budování!",
      color: "#F59E0B", // amber-500
    }
  } else if (score >= 25) {
    return {
      level: "Slabý",
      description: "Potřebuješ více konzistence.",
      color: "#EF4444", // red-500
    }
  } else {
    return {
      level: "Velmi slabý",
      description: "Začínáš. Každý den se počítá!",
      color: "#6B7280", // gray-500
    }
  }
}

/**
 * Calculate current streak (consecutive days)
 */
export function calculateCurrentStreak(logs: HabitLog[]): number {
  if (logs.length === 0) return 0

  // Sort logs by date descending
  const sortedLogs = [...logs].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  )

  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Check from today backwards
  for (let i = 0; i < sortedLogs.length; i++) {
    const logDate = new Date(sortedLogs[i].date)
    logDate.setHours(0, 0, 0, 0)

    const expectedDate = new Date(today)
    expectedDate.setDate(today.getDate() - i)

    // If log matches expected date and is completed
    if (
      logDate.getTime() === expectedDate.getTime() &&
      sortedLogs[i].completed
    ) {
      streak++
    } else {
      break
    }
  }

  return streak
}

/**
 * Calculate longest streak ever
 */
export function calculateLongestStreak(logs: HabitLog[]): number {
  if (logs.length === 0) return 0

  const sortedLogs = [...logs].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  )

  let longestStreak = 0
  let currentStreak = 0
  let lastDate: Date | null = null

  sortedLogs.forEach((log) => {
    if (!log.completed) {
      currentStreak = 0
      lastDate = null
      return
    }

    if (lastDate === null) {
      currentStreak = 1
    } else {
      const dayDiff = daysBetween(lastDate, log.date)
      if (dayDiff === 1) {
        currentStreak++
      } else {
        currentStreak = 1
      }
    }

    lastDate = log.date
    longestStreak = Math.max(longestStreak, currentStreak)
  })

  return longestStreak
}
