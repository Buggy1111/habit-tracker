export interface ThoughtRecord {
  id: string
  userId: string
  habitId: string | null
  habit: { id: string; name: string; icon: string; color: string } | null
  adversity: string
  belief: string
  consequence: string
  evidence: string | null
  alternative: string | null
  permanence: string | null
  pervasiveness: string | null
  personalization: string | null
  createdAt: Date
}

export interface CreateThoughtRecordInput {
  habitId?: string
  adversity: string
  belief: string
  consequence: string
  evidence?: string
  alternative?: string
  permanence?: string
  pervasiveness?: string
  personalization?: string
}
