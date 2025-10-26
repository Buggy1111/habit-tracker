"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface CreateLogData {
  habitId: string
  date?: string // ISO 8601 date string
  completed: boolean
  note?: string
}

interface DeleteLogData {
  habitId: string
  date: string // ISO 8601 date string (required for delete)
}

export function useHabitLog() {
  const queryClient = useQueryClient()

  // Create or update log
  const createOrUpdateLog = useMutation({
    mutationFn: async (data: CreateLogData) => {
      const response = await fetch(`/api/habits/${data.habitId}/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: data.date,
          completed: data.completed,
          note: data.note,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to save log")
      }

      return response.json()
    },
    onSuccess: () => {
      // Invalidate habits query to refetch with updated logs
      queryClient.invalidateQueries({ queryKey: ["habits"] })
      toast.success("Záznam uložen")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Nepodařilo se uložit záznam")
    },
  })

  // Delete log
  const deleteLog = useMutation({
    mutationFn: async (data: DeleteLogData) => {
      const response = await fetch(
        `/api/habits/${data.habitId}/logs?date=${encodeURIComponent(data.date)}`,
        {
          method: "DELETE",
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete log")
      }

      return response.json()
    },
    onSuccess: () => {
      // Invalidate habits query to refetch with updated logs
      queryClient.invalidateQueries({ queryKey: ["habits"] })
      toast.success("Záznam smazán")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Nepodařilo se smazat záznam")
    },
  })

  return {
    createOrUpdateLog: createOrUpdateLog.mutate,
    isCreating: createOrUpdateLog.isPending,
    deleteLog: deleteLog.mutate,
    isDeleting: deleteLog.isPending,
  }
}
