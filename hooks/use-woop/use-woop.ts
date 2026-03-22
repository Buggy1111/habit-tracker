import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage, getRetryDelay } from "@/lib/utils/error-handler"
import { fetchWoopPlans, createWoopPlan, updateWoopPlan, deleteWoopPlan } from "./api"
import type { CreateWoopInput, UpdateWoopInput } from "./types"

// Hook: Fetch all WOOP plans for a habit with retry logic
export function useWoopPlans(habitId: string) {
  return useQuery({
    queryKey: ["woop", habitId],
    queryFn: () => fetchWoopPlans(habitId),
    enabled: !!habitId,
    retry: 2,
    retryDelay: getRetryDelay,
  })
}

// Hook: Create WOOP plan
export function useCreateWoop(habitId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateWoopInput) => createWoopPlan(habitId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["woop", habitId] })
      toast.success("WOOP plan created successfully!")
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

// Hook: Update WOOP plan
export function useUpdateWoop(habitId: string, woopId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateWoopInput) => updateWoopPlan(habitId, woopId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["woop", habitId] })
      toast.success("WOOP plan updated successfully!")
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

// Hook: Delete WOOP plan
export function useDeleteWoop(habitId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (woopId: string) => deleteWoopPlan(habitId, woopId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["woop", habitId] })
      toast.success("WOOP plan deleted!")
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error))
    },
  })
}
