import type { ThoughtRecord, CreateThoughtRecordInput } from "./types"

export async function fetchThoughtRecords(): Promise<ThoughtRecord[]> {
  const res = await fetch("/api/thought-records")
  if (!res.ok) {
    const error = new Error("Failed to fetch thought records")
    ;(error as { status?: number }).status = res.status
    throw error
  }
  const data = await res.json()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((record: any) => ({
    ...record,
    createdAt: new Date(record.createdAt),
  }))
}

export async function createThoughtRecord(data: CreateThoughtRecordInput): Promise<ThoughtRecord> {
  const res = await fetch("/api/thought-records", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = new Error("Failed to create thought record")
    ;(error as { status?: number }).status = res.status
    throw error
  }
  return res.json()
}

export async function deleteThoughtRecord(recordId: string): Promise<void> {
  const res = await fetch(`/api/thought-records/${recordId}`, {
    method: "DELETE",
  })
  if (!res.ok) {
    const error = new Error("Failed to delete thought record")
    ;(error as { status?: number }).status = res.status
    throw error
  }
}
