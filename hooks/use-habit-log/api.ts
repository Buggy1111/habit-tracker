import type { CreateLogData, DeleteLogData } from "./types"

export async function createOrUpdateLog(data: CreateLogData) {
  const response = await fetch(`/api/habits/${data.habitId}/logs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date: data.date,
      completed: data.completed,
      note: data.note,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to save log")
  }

  return response.json()
}

export async function deleteLog(data: DeleteLogData) {
  const response = await fetch(
    `/api/habits/${data.habitId}/logs?date=${encodeURIComponent(data.date)}`,
    { method: "DELETE" }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to delete log")
  }

  return response.json()
}
