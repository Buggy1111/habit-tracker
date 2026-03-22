export type { ImplementationIntention, IntentionTemplate } from "./types"
export { RANO_TEMPLATES } from "./rano"
export { PRACE_TEMPLATES } from "./prace"
export { VECER_TEMPLATES } from "./vecer"
export { FITNESS_TEMPLATES } from "./fitness"
export { ZDRAVI_TEMPLATES } from "./zdravi"
export { STRES_TEMPLATES } from "./stres"
export { UCENI_TEMPLATES } from "./uceni"
export { FINANCE_TEMPLATES } from "./finance"
export {
  INTENTION_CATEGORIES,
  WHEN_SUGGESTIONS,
  formatIntention,
  validateIntention,
} from "./utils"
export type { IntentionCategory } from "./utils"

import { IntentionTemplate } from "./types"
import { RANO_TEMPLATES } from "./rano"
import { PRACE_TEMPLATES } from "./prace"
import { VECER_TEMPLATES } from "./vecer"
import { FITNESS_TEMPLATES } from "./fitness"
import { ZDRAVI_TEMPLATES } from "./zdravi"
import { STRES_TEMPLATES } from "./stres"
import { UCENI_TEMPLATES } from "./uceni"
import { FINANCE_TEMPLATES } from "./finance"

export const INTENTION_TEMPLATES: IntentionTemplate[] = [
  ...RANO_TEMPLATES,
  ...PRACE_TEMPLATES,
  ...VECER_TEMPLATES,
  ...FITNESS_TEMPLATES,
  ...ZDRAVI_TEMPLATES,
  ...STRES_TEMPLATES,
  ...UCENI_TEMPLATES,
  ...FINANCE_TEMPLATES,
]
