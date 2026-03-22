export interface CreateLogData {
  habitId: string
  date?: string
  completed: boolean
  note?: string
}

export interface DeleteLogData {
  habitId: string
  date: string
}
