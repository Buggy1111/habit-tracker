import { getStrengthLevel } from "@/lib/algorithms/habit-strength"
import { getNeuroplasticityPhase } from "@/lib/algorithms/neuroplasticity-phase"
import { detectExtinctionBurst } from "@/lib/algorithms/extinction-burst"
import { AdaptationRecommendation } from "@/lib/algorithms/difficulty-adaptation"
import { HabitDifficultyLog } from "@prisma/client"

export interface Habit {
  id: string
  userId: string
  name: string
  description: string | null
  color: string
  icon: string
  frequency: string
  goal: number
  trigger: string | null
  action: string | null
  context: string | null
  startDate: Date
  isActive: boolean
  streak: number
  completed: boolean
  // Computed fields
  habitStrength?: number
  strengthLevel?: ReturnType<typeof getStrengthLevel>
  neuroplasticityPhase?: ReturnType<typeof getNeuroplasticityPhase>
  daysUntilNextPhase?: number | null
  extinctionBurst?: ReturnType<typeof detectExtinctionBurst>
  longestStreak?: number
  // Difficulty tracking & adaptation
  difficultyLogs?: HabitDifficultyLog[]
  adaptationAnalysis?: AdaptationRecommendation
  logs: {
    id: string
    habitId: string
    userId: string
    date: Date
    completed: boolean
    note: string | null
    createdAt: Date
  }[]
}

export interface CreateHabitInput {
  name: string
  description?: string
  color: string
  icon?: string
  frequency?: string
  goal?: number
  trigger?: string
  action?: string
  context?: string
  identityId?: string
}

export interface UpdateHabitInput {
  name?: string
  description?: string
  color?: string
  icon?: string
  frequency?: string
  goal?: number
  trigger?: string
  action?: string
  context?: string
}
