import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage, getRetryDelay } from "@/lib/utils/error-handler"
import { fetchIdentities, createIdentity, updateIdentity, deleteIdentity } from "./api"
import type { Identity, UpdateIdentityInput } from "./types"

// Hook: Fetch all identities with retry logic
export function useIdentities() {
  return useQuery({
    queryKey: ["identities"],
    queryFn: fetchIdentities,
    retry: 2,
    retryDelay: getRetryDelay,
  })
}

// Hook: Create identity
export function useCreateIdentity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createIdentity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identities"] })
      toast.success("Identity created successfully!")
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error))
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
      toast.success("Identity updated successfully!")
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

// Hook: Delete identity
export function useDeleteIdentity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteIdentity,
    onMutate: async (identityId) => {
      await queryClient.cancelQueries({ queryKey: ["identities"] })

      const previousIdentities = queryClient.getQueryData<Identity[]>(["identities"])

      queryClient.setQueryData<Identity[]>(["identities"], (old) =>
        old?.filter((identity) => identity.id !== identityId)
      )

      return { previousIdentities }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identities"] })
      queryClient.invalidateQueries({ queryKey: ["habits"] })
      toast.success("Identity deleted")
    },
    onError: (error: Error, _identityId, context) => {
      queryClient.setQueryData(["identities"], context?.previousIdentities)
      toast.error(getErrorMessage(error))
    },
  })
}
