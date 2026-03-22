export interface Identity {
  id: string
  userId: string
  title: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  habits: {
    id: string
    name: string
    icon: string
    color: string
  }[]
  milestones: IdentityMilestone[]
}

export interface IdentityMilestone {
  id: string
  identityId: string
  title: string
  achieved: boolean
  achievedAt: Date | null
  createdAt: Date
}

export interface CreateIdentityInput {
  title: string
  description?: string
}

export interface UpdateIdentityInput {
  title?: string
  description?: string
}
