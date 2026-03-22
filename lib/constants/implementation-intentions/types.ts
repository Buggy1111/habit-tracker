/**
 * Implementation Intention Templates
 * Research: Peter Gollwitzer, effect size d=0.65
 *
 * Structure: "When [situation], I will [action], in [context]"
 */

export interface ImplementationIntention {
  when: string
  action: string
  context?: string
}

export interface IntentionTemplate {
  id: string
  category: string
  when: string
  action: string
  context?: string
  habit: string // Suggested habit name
}
