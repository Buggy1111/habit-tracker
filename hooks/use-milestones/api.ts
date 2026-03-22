import type { IdentityMilestone } from "../use-identities"
import type { CreateMilestoneInput } from "./types"

export async function createMilestone(
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

export async function toggleMilestone(
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

export async function deleteMilestone(
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
