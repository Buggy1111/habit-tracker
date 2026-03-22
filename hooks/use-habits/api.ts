import type { Habit, CreateHabitInput, UpdateHabitInput } from "./types"

/**
 * Parse habit data from API (convert date strings to Date objects)
 * Metrics are pre-computed on server, no client-side calculations
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseHabit(habit: any): Habit {
  return {
    ...habit,
    startDate: new Date(habit.startDate),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logs: habit.logs.map((log: any) => ({
      ...log,
      date: new Date(log.date),
      createdAt: new Date(log.createdAt),
    })),
  }
}

export async function fetchHabits(): Promise<Habit[]> {
  const res = await fetch("/api/habits")
  if (!res.ok) {
    const error = new Error("Failed to fetch habits")
    ;(error as { status?: number }).status = res.status
    throw error
  }
  const data = await res.json()
  return data.map(parseHabit)
}

export async function createHabit(data: CreateHabitInput): Promise<Habit> {
  const res = await fetch("/api/habits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = new Error("Failed to create habit")
    ;(error as { status?: number }).status = res.status
    throw error
  }
  return res.json()
}

export async function completeHabit(habitId: string): Promise<void> {
  const res = await fetch(`/api/habits/${habitId}/complete`, {
    method: "POST",
  })
  if (!res.ok) {
    const error = new Error("Failed to complete habit")
    ;(error as { status?: number }).status = res.status
    throw error
  }
}

export async function updateHabit(habitId: string, data: UpdateHabitInput): Promise<Habit> {
  const res = await fetch(`/api/habits/${habitId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = new Error("Failed to update habit")
    ;(error as { status?: number }).status = res.status
    throw error
  }
  return res.json()
}

export async function deleteHabit(habitId: string): Promise<void> {
  const res = await fetch(`/api/habits/${habitId}`, {
    method: "DELETE",
  })
  if (!res.ok) {
    const error = new Error("Failed to delete habit")
    ;(error as { status?: number }).status = res.status
    throw error
  }
}
