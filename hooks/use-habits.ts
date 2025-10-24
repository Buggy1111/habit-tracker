import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  calculateHabitStrength,
  calculateCurrentStreak,
  calculateLongestStreak,
  getStrengthLevel,
} from "@/lib/algorithms/habit-strength"
import { getNeuroplasticityPhase, daysUntilNextPhase } from "@/lib/algorithms/neuroplasticity-phase"
import { detectExtinctionBurst } from "@/lib/algorithms/extinction-burst"

// Types
export interface Habit {
  id: string
  userId: string
  name: string
  description: string | null
  color: string
  icon: string
  frequency: string
  goal: number
  trigger: string | null
  action: string | null
  context: string | null
  startDate: Date
  isActive: boolean
  streak: number
  completed: boolean
  // Computed fields
  habitStrength?: number
  strengthLevel?: ReturnType<typeof getStrengthLevel>
  neuroplasticityPhase?: ReturnType<typeof getNeuroplasticityPhase>
  daysUntilNextPhase?: number | null
  extinctionBurst?: ReturnType<typeof detectExtinctionBurst>
  longestStreak?: number
  logs: {
    id: string
    habitId: string
    userId: string
    date: Date
    completed: boolean
    note: string | null
    createdAt: Date
  }[]
}

export interface CreateHabitInput {
  name: string
  description?: string
  color: string
  icon?: string
  frequency?: string
  goal?: number
  trigger?: string
  action?: string
  context?: string
}

export interface UpdateHabitInput {
  name?: string
  description?: string
  color?: string
  icon?: string
  frequency?: string
  goal?: number
  trigger?: string
  action?: string
  context?: string
}

/**
 * Calculate days since start
 */
function daysSinceStart(startDate: Date): number {
  const today = new Date()
  const start = new Date(startDate)
  const diffTime = Math.abs(today.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

/**
 * Enrich habit with computed science-based metrics
 */
function enrichHabit(habit: any): Habit {
  const logs = habit.logs.map((log: any) => ({
    ...log,
    date: new Date(log.date),
    createdAt: new Date(log.createdAt),
  }))

  const days = daysSinceStart(habit.startDate)
  const habitStrength = calculateHabitStrength(logs, new Date(habit.startDate))
  const strengthLevel = getStrengthLevel(habitStrength)
  const neuroplasticityPhase = getNeuroplasticityPhase(days)
  const nextPhase = daysUntilNextPhase(days)
  const extinctionBurst = detectExtinctionBurst(logs)
  const currentStreak = calculateCurrentStreak(logs)
  const longestStreak = calculateLongestStreak(logs)

  return {
    ...habit,
    startDate: new Date(habit.startDate),
    streak: currentStreak,
    habitStrength,
    strengthLevel,
    neuroplasticityPhase,
    daysUntilNextPhase: nextPhase,
    extinctionBurst,
    longestStreak,
    logs,
  }
}

// Fetch all habits
async function fetchHabits(): Promise<Habit[]> {
  const res = await fetch("/api/habits")
  if (!res.ok) {
    throw new Error("Failed to fetch habits")
  }
  const data = await res.json()
  return data.map(enrichHabit)
}

// Create new habit
async function createHabit(data: CreateHabitInput): Promise<Habit> {
  const res = await fetch("/api/habits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error("Failed to create habit")
  }
  return res.json()
}

// Complete habit (mark as done today)
async function completeHabit(habitId: string): Promise<void> {
  const res = await fetch(`/api/habits/${habitId}/complete`, {
    method: "POST",
  })
  if (!res.ok) {
    throw new Error("Failed to complete habit")
  }
}

// Update habit
async function updateHabit(habitId: string, data: UpdateHabitInput): Promise<Habit> {
  const res = await fetch(`/api/habits/${habitId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error("Failed to update habit")
  }
  return res.json()
}

// Delete habit
async function deleteHabit(habitId: string): Promise<void> {
  const res = await fetch(`/api/habits/${habitId}`, {
    method: "DELETE",
  })
  if (!res.ok) {
    throw new Error("Failed to delete habit")
  }
}

// Hook: Fetch all habits
export function useHabits() {
  return useQuery({
    queryKey: ["habits"],
    queryFn: fetchHabits,
  })
}

// Hook: Create habit
export function useCreateHabit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] })
      toast.success("Návyk byl úspěšně vytvořen!")
    },
    onError: (error: Error) => {
      toast.error("Nepodařilo se vytvořit návyk: " + error.message)
    },
  })
}

// Hook: Complete habit
export function useCompleteHabit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: completeHabit,
    onMutate: async (habitId) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ["habits"] })

      const previousHabits = queryClient.getQueryData<Habit[]>(["habits"])

      queryClient.setQueryData<Habit[]>(["habits"], (old) =>
        old?.map((habit) =>
          habit.id === habitId ? { ...habit, completed: true } : habit
        )
      )

      return { previousHabits }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] })
      toast.success("Návyk splněn! 🎉")
    },
    onError: (error: Error, _habitId, context) => {
      // Rollback on error
      queryClient.setQueryData(["habits"], context?.previousHabits)
      toast.error("Nepodařilo se označit návyk: " + error.message)
    },
  })
}

// Hook: Update habit
export function useUpdateHabit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ habitId, data }: { habitId: string; data: UpdateHabitInput }) =>
      updateHabit(habitId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] })
      toast.success("Návyk byl úspěšně upraven!")
    },
    onError: (error: Error) => {
      toast.error("Nepodařilo se upravit návyk: " + error.message)
    },
  })
}

// Hook: Delete habit
export function useDeleteHabit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteHabit,
    onMutate: async (habitId) => {
      // Optimistic update - remove from list
      await queryClient.cancelQueries({ queryKey: ["habits"] })

      const previousHabits = queryClient.getQueryData<Habit[]>(["habits"])

      queryClient.setQueryData<Habit[]>(["habits"], (old) =>
        old?.filter((habit) => habit.id !== habitId)
      )

      return { previousHabits }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] })
      toast.success("Návyk byl smazán")
    },
    onError: (error: Error, _habitId, context) => {
      // Rollback on error
      queryClient.setQueryData(["habits"], context?.previousHabits)
      toast.error("Nepodařilo se smazat návyk: " + error.message)
    },
  })
}
