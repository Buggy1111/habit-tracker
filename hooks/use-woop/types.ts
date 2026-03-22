export interface WoopPlan {
  id: string
  habitId: string
  wish: string
  outcome: string
  obstacle: string
  plan: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateWoopInput {
  wish: string
  outcome: string
  obstacle: string
  plan: string
}

export interface UpdateWoopInput {
  wish?: string
  outcome?: string
  obstacle?: string
  plan?: string
}
