import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage, getRetryDelay } from "@/lib/utils/error-handler"

// Types
export interface WoopPlan {
  id: string
  habitId: string
  wish: string
  outcome: string
  obstacle: string
  plan: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateWoopInput {
  wish: string
  outcome: string
  obstacle: string
  plan: string
}

export interface UpdateWoopInput {
  wish?: string
  outcome?: string
  obstacle?: string
  plan?: string
}

// Fetch all WOOP plans for a habit
async function fetchWoopPlans(habitId: string): Promise<WoopPlan[]> {
  const res = await fetch(`/api/habits/${habitId}/woop`)
  if (!res.ok) {
    const error = new Error("Failed to fetch WOOP plans")
    ;(error as { status?: number }).status = res.status
    throw error
  }
  const data = await res.json()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((woop: any) => ({
    ...woop,
    createdAt: new Date(woop.createdAt),
    updatedAt: new Date(woop.updatedAt),
  }))
}

// Create new WOOP plan
async function createWoopPlan(habitId: string, data: CreateWoopInput): Promise<WoopPlan> {
  const res = await fetch(`/api/habits/${habitId}/woop`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = new Error("Failed to create WOOP plan")
    ;(error as { status?: number }).status = res.status
    throw error
  }
  return res.json()
}

// Update WOOP plan
async function updateWoopPlan(
  habitId: string,
  woopId: string,
  data: UpdateWoopInput
): Promise<WoopPlan> {
  const res = await fetch(`/api/habits/${habitId}/woop/${woopId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = new Error("Failed to update WOOP plan")
    ;(error as { status?: number }).status = res.status
    throw error
  }
  return res.json()
}

// Delete WOOP plan
async function deleteWoopPlan(habitId: string, woopId: string): Promise<void> {
  const res = await fetch(`/api/habits/${habitId}/woop/${woopId}`, {
    method: "DELETE",
  })
  if (!res.ok) {
    const error = new Error("Failed to delete WOOP plan")
    ;(error as { status?: number }).status = res.status
    throw error
  }
}

// Hook: Fetch all WOOP plans for a habit with retry logic
export function useWoopPlans(habitId: string) {
  return useQuery({
    queryKey: ["woop", habitId],
    queryFn: () => fetchWoopPlans(habitId),
    enabled: !!habitId,
    retry: 2, // Retry failed requests 2 times
    retryDelay: getRetryDelay, // Exponential backoff
  })
}

// Hook: Create WOOP plan
export function useCreateWoop(habitId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateWoopInput) => createWoopPlan(habitId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["woop", habitId] })
      toast.success("WOOP plán byl úspěšně vytvořen!")
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
      toast.success("WOOP plán byl úspěšně upraven!")
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
      toast.success("WOOP plán byl smazán!")
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error))
    },
  })
}
