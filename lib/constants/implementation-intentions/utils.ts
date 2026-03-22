import { ImplementationIntention } from "./types"

export const INTENTION_CATEGORIES = [
  "Všechny",
  "Ráno",
  "Práce",
  "Večer",
  "Fitness",
  "Zdraví",
  "Stres",
  "Učení",
  "Finance",
] as const

export type IntentionCategory = typeof INTENTION_CATEGORIES[number]

/**
 * Common trigger patterns for custom intentions
 */
export const WHEN_SUGGESTIONS = [
  "Když vstanu z postele",
  "Poté co vypiju ranní kávu",
  "Po snídani",
  "Když se posadím k počítači",
  "V poledne",
  "Po práci",
  "Po večeři",
  "V 21:00",
  "30 minut před spaním",
  "Když se vrátím domů",
  "Když se cítím stresovaný",
  "Po hodině práce",
]

/**
 * Format implementation intention for display
 */
export function formatIntention(intention: ImplementationIntention): string {
  const parts = [
    intention.when,
    intention.action,
    intention.context ? `v ${intention.context}` : null,
  ].filter(Boolean)

  return parts.join(", ")
}

/**
 * Validate implementation intention
 */
export function validateIntention(intention: ImplementationIntention): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!intention.when || intention.when.length < 3) {
    errors.push("Spouštěč 'Kdy' musí být vyplněný")
  }

  if (!intention.action || intention.action.length < 3) {
    errors.push("Akce 'Co udělám' musí být vyplněná")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
