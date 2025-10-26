import { useQuery } from "@tanstack/react-query"

// Types
export interface UserStats {
  habits: {
    total: number
    active: number
    archived: number
  }
  logs: {
    total: number
    thisMonth: number
  }
  identities: {
    total: number
  }
  woopPlans: {
    total: number
  }
  thoughtRecords: {
    total: number
  }
  dataSize: string
  memberSince: Date
}

// Fetch user statistics
async function fetchUserStats(): Promise<UserStats> {
  const res = await fetch("/api/user/stats")
  if (!res.ok) {
    throw new Error("Failed to fetch user stats")
  }
  const data = await res.json()
  return {
    ...data,
    memberSince: new Date(data.memberSince),
  }
}

// Hook: Fetch user statistics
export function useUserStats() {
  return useQuery({
    queryKey: ["user", "stats"],
    queryFn: fetchUserStats,
  })
}
