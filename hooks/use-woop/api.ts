import type { WoopPlan, CreateWoopInput, UpdateWoopInput } from "./types"

export async function fetchWoopPlans(habitId: string): Promise<WoopPlan[]> {
  const res = await fetch(`/api/habits/${habitId}/woop`)
  if (!res.ok) {
    const error = new Error("Failed to fetch WOOP plans")
    ;(error as { status?: number }).status = res.status
    throw error
  }
  const data = await res.json()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((woop: any) => ({
    ...woop,
    createdAt: new Date(woop.createdAt),
    updatedAt: new Date(woop.updatedAt),
  }))
}

export async function createWoopPlan(habitId: string, data: CreateWoopInput): Promise<WoopPlan> {
  const res = await fetch(`/api/habits/${habitId}/woop`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = new Error("Failed to create WOOP plan")
    ;(error as { status?: number }).status = res.status
    throw error
  }
  return res.json()
}

export async function updateWoopPlan(
  habitId: string,
  woopId: string,
  data: UpdateWoopInput
): Promise<WoopPlan> {
  const res = await fetch(`/api/habits/${habitId}/woop/${woopId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = new Error("Failed to update WOOP plan")
    ;(error as { status?: number }).status = res.status
    throw error
  }
  return res.json()
}

export async function deleteWoopPlan(habitId: string, woopId: string): Promise<void> {
  const res = await fetch(`/api/habits/${habitId}/woop/${woopId}`, {
    method: "DELETE",
  })
  if (!res.ok) {
    const error = new Error("Failed to delete WOOP plan")
    ;(error as { status?: number }).status = res.status
    throw error
  }
}
