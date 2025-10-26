import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

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
    throw new Error("Failed to fetch WOOP plans")
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
    throw new Error("Failed to create WOOP plan")
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
    throw new Error("Failed to update WOOP plan")
  }
  return res.json()
}

// Delete WOOP plan
async function deleteWoopPlan(habitId: string, woopId: string): Promise<void> {
  const res = await fetch(`/api/habits/${habitId}/woop/${woopId}`, {
    method: "DELETE",
  })
  if (!res.ok) {
    throw new Error("Failed to delete WOOP plan")
  }
}

// Hook: Fetch all WOOP plans for a habit
export function useWoopPlans(habitId: string) {
  return useQuery({
    queryKey: ["woop", habitId],
    queryFn: () => fetchWoopPlans(habitId),
    enabled: !!habitId,
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
      toast.error(error.message || "Failed to create WOOP plan")
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
      toast.error(error.message || "Failed to update WOOP plan")
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
      toast.success("WOOP plan deleted successfully!")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete WOOP plan")
    },
  })
}
