import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { ProfileFormData } from "@/lib/validations/settings"

// Types
export interface UserProfile {
  id: string
  name: string | null
  email: string
  bio: string | null
  avatarUrl: string | null
  timezone: string
  emailVerified: Date | null
  createdAt: Date
  lastLoginAt: Date | null
  lastActivityAt: Date | null
}

// Fetch user profile
async function fetchUserProfile(): Promise<UserProfile> {
  const res = await fetch("/api/user/profile")
  if (!res.ok) {
    throw new Error("Failed to fetch user profile")
  }
  const data = await res.json()
  return {
    ...data,
    emailVerified: data.emailVerified ? new Date(data.emailVerified) : null,
    createdAt: new Date(data.createdAt),
    lastLoginAt: data.lastLoginAt ? new Date(data.lastLoginAt) : null,
    lastActivityAt: data.lastActivityAt ? new Date(data.lastActivityAt) : null,
  }
}

// Update user profile
async function updateUserProfile(data: ProfileFormData): Promise<UserProfile> {
  const res = await fetch("/api/user/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || "Failed to update profile")
  }
  const result = await res.json()
  return {
    ...result,
    emailVerified: result.emailVerified ? new Date(result.emailVerified) : null,
    createdAt: new Date(result.createdAt),
    lastLoginAt: result.lastLoginAt ? new Date(result.lastLoginAt) : null,
    lastActivityAt: result.lastActivityAt ? new Date(result.lastActivityAt) : null,
  }
}

// Hook: Fetch user profile
export function useUserProfile() {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: fetchUserProfile,
  })
}

// Hook: Update user profile
export function useUpdateUserProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["user", "profile"], data)
      toast.success("Profil byl úspěšně uložen!")
    },
    onError: (error: Error) => {
      toast.error("Nepodařilo se uložit profil: " + error.message)
    },
  })
}
