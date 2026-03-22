"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createOrUpdateLog, deleteLog } from "./api"

export function useHabitLog() {
  const queryClient = useQueryClient()

  const createOrUpdateLogMutation = useMutation({
    mutationFn: createOrUpdateLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] })
      toast.success("Entry saved")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to save entry")
    },
  })

  const deleteLogMutation = useMutation({
    mutationFn: deleteLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] })
      toast.success("Entry deleted")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete entry")
    },
  })

  return {
    createOrUpdateLog: createOrUpdateLogMutation.mutate,
    isCreating: createOrUpdateLogMutation.isPending,
    deleteLog: deleteLogMutation.mutate,
    isDeleting: deleteLogMutation.isPending,
  }
}
