import type { Identity, CreateIdentityInput, UpdateIdentityInput } from "./types"

export async function fetchIdentities(): Promise<Identity[]> {
  const res = await fetch("/api/identities")
  if (!res.ok) {
    const error = new Error("Failed to fetch identities")
    ;(error as { status?: number }).status = res.status
    throw error
  }
  const data = await res.json()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((identity: any) => ({
    ...identity,
    createdAt: new Date(identity.createdAt),
    updatedAt: new Date(identity.updatedAt),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    milestones: identity.milestones.map((m: any) => ({
      ...m,
      createdAt: new Date(m.createdAt),
      achievedAt: m.achievedAt ? new Date(m.achievedAt) : null,
    })),
  }))
}

export async function createIdentity(data: CreateIdentityInput): Promise<Identity> {
  const res = await fetch("/api/identities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = new Error("Failed to create identity")
    ;(error as { status?: number }).status = res.status
    throw error
  }
  return res.json()
}

export async function updateIdentity(identityId: string, data: UpdateIdentityInput): Promise<Identity> {
  const res = await fetch(`/api/identities/${identityId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = new Error("Failed to update identity")
    ;(error as { status?: number }).status = res.status
    throw error
  }
  return res.json()
}

export async function deleteIdentity(identityId: string): Promise<void> {
  const res = await fetch(`/api/identities/${identityId}`, {
    method: "DELETE",
  })
  if (!res.ok) {
    const error = new Error("Failed to delete identity")
    ;(error as { status?: number }).status = res.status
    throw error
  }
}
