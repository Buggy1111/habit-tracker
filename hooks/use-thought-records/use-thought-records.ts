import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage, getRetryDelay } from "@/lib/utils/error-handler"
import { fetchThoughtRecords, createThoughtRecord, deleteThoughtRecord } from "./api"

// Hook: Fetch all thought records
export function useThoughtRecords() {
  return useQuery({
    queryKey: ["thought-records"],
    queryFn: fetchThoughtRecords,
    retry: 2,
    retryDelay: getRetryDelay,
  })
}

// Hook: Create thought record
export function useCreateThoughtRecord() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createThoughtRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["thought-records"] })
      toast.success("Thought record created successfully!")
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

// Hook: Delete thought record
export function useDeleteThoughtRecord() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteThoughtRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["thought-records"] })
      toast.success("Thought record deleted!")
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error))
    },
  })
}
