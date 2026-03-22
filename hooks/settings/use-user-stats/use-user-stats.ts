import { useQuery } from "@tanstack/react-query"

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

export function useUserStats() {
  return useQuery({
    queryKey: ["user", "stats"],
    queryFn: fetchUserStats,
  })
}
