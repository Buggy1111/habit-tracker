import { type HabitLog } from "../extinction-burst"

/**
 * Shared test utilities for extinction burst tests
 */

let today: Date

export function getToday(): Date {
  return today
}

export function resetToday(): void {
  today = new Date()
  today.setHours(0, 0, 0, 0)
}

export const createLogs = (pattern: boolean[]): HabitLog[] => {
  const t = getToday()
  return pattern.map((completed, index) => {
    const date = new Date(t)
    date.setDate(t.getDate() - (pattern.length - 1 - index))
    return { date, completed }
  })
}
