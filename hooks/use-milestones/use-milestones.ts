import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createMilestone, toggleMilestone, deleteMilestone } from "./api"
import type { CreateMilestoneInput } from "./types"

// Hook: Create milestone
export function useCreateMilestone() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ identityId, data }: { identityId: string; data: CreateMilestoneInput }) =>
      createMilestone(identityId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identities"] })
      toast.success("Milestone created successfully!")
    },
    onError: (error: Error) => {
      toast.error("Failed to create milestone: " + error.message)
    },
  })
}

// Hook: Toggle milestone achievement
export function useToggleMilestone() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      identityId,
      milestoneId,
      achieved,
    }: {
      identityId: string
      milestoneId: string
      achieved: boolean
    }) => toggleMilestone(identityId, milestoneId, achieved),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["identities"] })
      if (variables.achieved) {
        toast.success("Congratulations! Milestone achieved! 🎉")
      } else {
        toast.success("Milestone marked as not achieved")
      }
    },
    onError: (error: Error) => {
      toast.error("Failed to update milestone: " + error.message)
    },
  })
}

// Hook: Delete milestone
export function useDeleteMilestone() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ identityId, milestoneId }: { identityId: string; milestoneId: string }) =>
      deleteMilestone(identityId, milestoneId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identities"] })
      toast.success("Milestone deleted")
    },
    onError: (error: Error) => {
      toast.error("Failed to delete milestone: " + error.message)
    },
  })
}
