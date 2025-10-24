import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { IdentityMilestone } from "./use-identities"

export interface CreateMilestoneInput {
  title: string
}

export interface UpdateMilestoneInput {
  achieved: boolean
}

// Create milestone
async function createMilestone(
  identityId: string,
  data: CreateMilestoneInput
): Promise<IdentityMilestone> {
  const res = await fetch(`/api/identities/${identityId}/milestones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error("Failed to create milestone")
  }
  return res.json()
}

// Toggle milestone achievement
async function toggleMilestone(
  identityId: string,
  milestoneId: string,
  achieved: boolean
): Promise<IdentityMilestone> {
  const res = await fetch(
    `/api/identities/${identityId}/milestones/${milestoneId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ achieved }),
    }
  )
  if (!res.ok) {
    throw new Error("Failed to toggle milestone")
  }
  return res.json()
}

// Delete milestone
async function deleteMilestone(
  identityId: string,
  milestoneId: string
): Promise<void> {
  const res = await fetch(
    `/api/identities/${identityId}/milestones/${milestoneId}`,
    {
      method: "DELETE",
    }
  )
  if (!res.ok) {
    throw new Error("Failed to delete milestone")
  }
}

// Hook: Create milestone
export function useCreateMilestone() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ identityId, data }: { identityId: string; data: CreateMilestoneInput }) =>
      createMilestone(identityId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identities"] })
      toast.success("Milestone byl úspěšně vytvořen!")
    },
    onError: (error: Error) => {
      toast.error("Nepodařilo se vytvořit milestone: " + error.message)
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
        toast.success("Gratulujeme! Milestone splněn! 🎉")
      } else {
        toast.success("Milestone označen jako nesplněný")
      }
    },
    onError: (error: Error) => {
      toast.error("Nepodařilo se upravit milestone: " + error.message)
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
      toast.success("Milestone byl smazán")
    },
    onError: (error: Error) => {
      toast.error("Nepodařilo se smazat milestone: " + error.message)
    },
  })
}
