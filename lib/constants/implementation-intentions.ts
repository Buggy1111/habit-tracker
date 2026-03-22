/**
 * Barrel re-export from split implementation-intentions directory.
 * Kept for backward compatibility with existing imports.
 */
export {
  INTENTION_TEMPLATES,
  INTENTION_CATEGORIES,
  WHEN_SUGGESTIONS,
  formatIntention,
  validateIntention,
  RANO_TEMPLATES,
  PRACE_TEMPLATES,
  VECER_TEMPLATES,
  FITNESS_TEMPLATES,
  ZDRAVI_TEMPLATES,
  STRES_TEMPLATES,
  UCENI_TEMPLATES,
  FINANCE_TEMPLATES,
} from "./implementation-intentions/index"

export type {
  ImplementationIntention,
  IntentionTemplate,
  IntentionCategory,
} from "./implementation-intentions/index"
