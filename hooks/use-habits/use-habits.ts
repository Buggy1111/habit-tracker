import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage, getRetryDelay } from "@/lib/utils/error-handler"
import { fetchHabits, createHabit, completeHabit, updateHabit, deleteHabit } from "./api"
import type { Habit, UpdateHabitInput } from "./types"

// Hook: Fetch all habits with retry logic
export function useHabits() {
  return useQuery({
    queryKey: ["habits"],
    queryFn: fetchHabits,
    retry: 2,
    retryDelay: getRetryDelay,
  })
}

// Hook: Create habit
export function useCreateHabit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] })
      toast.success("Habit created successfully!")
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
      await queryClient.cancelQueries({ queryKey: ["habits"] })

      const previousHabits = queryClient.getQueryData<Habit[]>(["habits"])

      queryClient.setQueryData<Habit[]>(["habits"], (old) =>
        old?.map((habit) => (habit.id === habitId ? { ...habit, completed: true } : habit))
      )

      return { previousHabits }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] })
      toast.success("Habit completed! 🎉")
    },
    onError: (error: Error, _habitId, context) => {
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
      toast.success("Habit updated successfully!")
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
      await queryClient.cancelQueries({ queryKey: ["habits"] })

      const previousHabits = queryClient.getQueryData<Habit[]>(["habits"])

      queryClient.setQueryData<Habit[]>(["habits"], (old) =>
        old?.filter((habit) => habit.id !== habitId)
      )

      return { previousHabits }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] })
      toast.success("Habit deleted")
    },
    onError: (error: Error, _habitId, context) => {
      queryClient.setQueryData(["habits"], context?.previousHabits)
      toast.error(getErrorMessage(error))
    },
  })
}
