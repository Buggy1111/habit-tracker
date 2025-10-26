// Habit types
export interface Habit {
  id: string
  userId: string
  name: string
  description?: string | null
  color: string
  icon: string
  frequency: string
  goal: number
  startDate: Date
  isActive: boolean
  trigger?: string | null
  createdAt: Date
  updatedAt: Date
  logs?: HabitLog[]
}

// Habit Log types
export interface HabitLog {
  id: string
  habitId: string
  userId: string
  date: Date
  completed: boolean
  note?: string | null
  createdAt: Date
}

// User types
export interface User {
  id: string
  email: string
  name?: string | null
  image?: string | null
  createdAt: Date
  updatedAt: Date
}

// Habit with computed properties
export interface HabitWithStats extends Habit {
  streak: number
  completedToday: boolean
  completionRate: number
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export type HabitsResponse = ApiResponse<Habit[]>
export type HabitResponse = ApiResponse<Habit>
export type HabitLogResponse = ApiResponse<HabitLog>
