export const TUTORIAL_COMPLETED_KEY = "habit-tracker-first-habit-tutorial"

export const EXAMPLE_HABIT_KEYS = [
  {
    nameKey: "drinkWater",
    triggerKey: "drinkWaterTrigger",
    actionKey: "drinkWaterAction",
    contextKey: "drinkWaterContext",
    icon: "\u{1F4A7}",
  },
  {
    nameKey: "morningMeditation",
    triggerKey: "meditationTrigger",
    actionKey: "meditationAction",
    contextKey: "meditationContext",
    icon: "\u{1F9D8}",
  },
  {
    nameKey: "eveningReading",
    triggerKey: "readingTrigger",
    actionKey: "readingAction",
    contextKey: "readingContext",
    icon: "\u{1F4DA}",
  },
  {
    nameKey: "stretching",
    triggerKey: "stretchingTrigger",
    actionKey: "stretchingAction",
    contextKey: "stretchingContext",
    icon: "\u{1F938}",
  },
] as const

export interface ExampleHabit {
  name: string
  trigger: string
  action: string
  context: string
  icon: string
}

export type ExampleHabitKey = (typeof EXAMPLE_HABIT_KEYS)[number]
