import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getStrengthLevel } from "@/lib/algorithms/habit-strength"
import { getNeuroplasticityPhase } from "@/lib/algorithms/neuroplasticity-phase"
import { detectExtinctionBurst } from "@/lib/algorithms/extinction-burst"
import { AdaptationRecommendation } from "@/lib/algorithms/difficulty-adaptation"
import { HabitDifficultyLog } from "@prisma/client"
import { getErrorMessage, getRetryDelay } from "@/lib/utils/error-handler"

// Note: All metric calculations (habitStrength, neuroplasticityPhase, etc.) are now done on server
// Client only imports types for TypeScript

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
  // Difficulty tracking & adaptation
  difficultyLogs?: HabitDifficultyLog[]
  adaptationAnalysis?: AdaptationRecommendation
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
  identityId?: string
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
 * Parse habit data from API (convert date strings to Date objects)
 * ✅ OPTIMIZED: Metrics are now pre-computed on server, no client-side calculations!
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
    // All metrics (habitStrength, neuroplasticityPhase, etc.) are already computed on server!
  }
}

// Fetch all habits (metrics pre-computed on server)
async function fetchHabits(): Promise<Habit[]> {
  const res = await fetch("/api/habits")
  if (!res.ok) {
    const error = new Error("Failed to fetch habits")
    ;(error as { status?: number }).status = res.status
    throw error
  }
  const data = await res.json()
  // Just parse dates, all metrics are already computed on server
  return data.map(parseHabit)
}

// Create new habit
async function createHabit(data: CreateHabitInput): Promise<Habit> {
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

// Complete habit (mark as done today)
async function completeHabit(habitId: string): Promise<void> {
  const res = await fetch(`/api/habits/${habitId}/complete`, {
    method: "POST",
  })
  if (!res.ok) {
    const error = new Error("Failed to complete habit")
    ;(error as { status?: number }).status = res.status
    throw error
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
    const error = new Error("Failed to update habit")
    ;(error as { status?: number }).status = res.status
    throw error
  }
  return res.json()
}

// Delete habit
async function deleteHabit(habitId: string): Promise<void> {
  const res = await fetch(`/api/habits/${habitId}`, {
    method: "DELETE",
  })
  if (!res.ok) {
    const error = new Error("Failed to delete habit")
    ;(error as { status?: number }).status = res.status
    throw error
  }
}

// Hook: Fetch all habits with retry logic
export function useHabits() {
  return useQuery({
    queryKey: ["habits"],
    queryFn: fetchHabits,
    retry: 2, // Retry failed requests 2 times
    retryDelay: getRetryDelay, // Exponential backoff
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
      toast.error(getErrorMessage(error))
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
        old?.map((habit) => (habit.id === habitId ? { ...habit, completed: true } : habit))
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
      toast.error(getErrorMessage(error))
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
      toast.error(getErrorMessage(error))
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
      toast.error(getErrorMessage(error))
    },
  })
}
