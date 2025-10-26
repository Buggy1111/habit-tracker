import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

// Types
export interface Identity {
  id: string
  userId: string
  title: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  habits: {
    id: string
    name: string
    icon: string
    color: string
  }[]
  milestones: IdentityMilestone[]
}

export interface IdentityMilestone {
  id: string
  identityId: string
  title: string
  achieved: boolean
  achievedAt: Date | null
  createdAt: Date
}

export interface CreateIdentityInput {
  title: string
  description?: string
}

export interface UpdateIdentityInput {
  title?: string
  description?: string
}

// Fetch all identities
async function fetchIdentities(): Promise<Identity[]> {
  const res = await fetch("/api/identities")
  if (!res.ok) {
    throw new Error("Failed to fetch identities")
  }
  const data = await res.json()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((identity: any) => ({
    ...identity,
    createdAt: new Date(identity.createdAt),
    updatedAt: new Date(identity.updatedAt),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    milestones: identity.milestones.map((m: any) => ({
      ...m,
      createdAt: new Date(m.createdAt),
      achievedAt: m.achievedAt ? new Date(m.achievedAt) : null,
    })),
  }))
}

// Create new identity
async function createIdentity(data: CreateIdentityInput): Promise<Identity> {
  const res = await fetch("/api/identities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error("Failed to create identity")
  }
  return res.json()
}

// Update identity
async function updateIdentity(identityId: string, data: UpdateIdentityInput): Promise<Identity> {
  const res = await fetch(`/api/identities/${identityId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error("Failed to update identity")
  }
  return res.json()
}

// Delete identity
async function deleteIdentity(identityId: string): Promise<void> {
  const res = await fetch(`/api/identities/${identityId}`, {
    method: "DELETE",
  })
  if (!res.ok) {
    throw new Error("Failed to delete identity")
  }
}

// Hook: Fetch all identities
export function useIdentities() {
  return useQuery({
    queryKey: ["identities"],
    queryFn: fetchIdentities,
  })
}

// Hook: Create identity
export function useCreateIdentity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createIdentity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identities"] })
      toast.success("Identita byla úspěšně vytvořena!")
    },
    onError: (error: Error) => {
      toast.error("Nepodařilo se vytvořit identitu: " + error.message)
    },
  })
}

// Hook: Update identity
export function useUpdateIdentity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ identityId, data }: { identityId: string; data: UpdateIdentityInput }) =>
      updateIdentity(identityId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identities"] })
      toast.success("Identita byla úspěšně upravena!")
    },
    onError: (error: Error) => {
      toast.error("Nepodařilo se upravit identitu: " + error.message)
    },
  })
}

// Hook: Delete identity
export function useDeleteIdentity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteIdentity,
    onMutate: async (identityId) => {
      // Optimistic update - remove from list
      await queryClient.cancelQueries({ queryKey: ["identities"] })

      const previousIdentities = queryClient.getQueryData<Identity[]>(["identities"])

      queryClient.setQueryData<Identity[]>(["identities"], (old) =>
        old?.filter((identity) => identity.id !== identityId)
      )

      return { previousIdentities }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identities"] })
      queryClient.invalidateQueries({ queryKey: ["habits"] }) // Refresh habits too
      toast.success("Identita byla smazána")
    },
    onError: (error: Error, _identityId, context) => {
      // Rollback on error
      queryClient.setQueryData(["identities"], context?.previousIdentities)
      toast.error("Nepodařilo se smazat identitu: " + error.message)
    },
  })
}
