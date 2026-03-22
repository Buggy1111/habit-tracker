import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { PartialPreferencesFormData } from "@/lib/validations/settings"

export interface UserPreferences {
  id: string
  userId: string
  theme: string
  language: string
  emailNotifications: boolean
  weeklyReviewReminder: boolean
  extinctionBurstAlerts: boolean
  milestoneNotifications: boolean
  analyticsEnabled: boolean
  dataCollectionConsent: boolean
  timezone: string
  dateFormat: string
  createdAt: Date
  updatedAt: Date
}

async function fetchUserPreferences(): Promise<UserPreferences> {
  const res = await fetch("/api/user/preferences")
  if (!res.ok) {
    throw new Error("Failed to fetch user preferences")
  }
  const data = await res.json()
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  }
}

async function updateUserPreferences(data: PartialPreferencesFormData): Promise<UserPreferences> {
  const res = await fetch("/api/user/preferences", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || "Failed to update preferences")
  }
  const result = await res.json()
  return {
    ...result,
    createdAt: new Date(result.createdAt),
    updatedAt: new Date(result.updatedAt),
  }
}

export function useUserPreferences() {
  return useQuery({
    queryKey: ["user", "preferences"],
    queryFn: fetchUserPreferences,
  })
}

export function useUpdateUserPreferences(options?: { showToast?: boolean }) {
  const queryClient = useQueryClient()
  const showToast = options?.showToast ?? true

  return useMutation({
    mutationFn: updateUserPreferences,
    onMutate: async (newPreferences) => {
      await queryClient.cancelQueries({ queryKey: ["user", "preferences"] })

      const previousPreferences = queryClient.getQueryData<UserPreferences>(["user", "preferences"])

      queryClient.setQueryData<UserPreferences>(["user", "preferences"], (old) =>
        old ? { ...old, ...newPreferences, updatedAt: new Date() } : old
      )

      return { previousPreferences }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user", "preferences"], data)
      if (showToast) {
        toast.success("Settings saved")
      }
    },
    onError: (error: Error, _variables, context) => {
      if (context?.previousPreferences) {
        queryClient.setQueryData(["user", "preferences"], context.previousPreferences)
      }
      toast.error("Failed to save settings: " + error.message)
    },
  })
}
