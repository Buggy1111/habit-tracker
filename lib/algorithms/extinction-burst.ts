/**
 * Extinction Burst Detection Algorithm
 *
 * Research backing: Behavioral psychology
 * 24-36% of people experience extinction burst when changing habits
 *
 * Extinction burst = temporary increase in unwanted behavior
 * before it goes away permanently
 *
 * Pattern: Good streak → Sudden drop → Recovery (if supported)
 *
 * This algorithm detects the pattern and triggers supportive intervention
 */

export interface HabitLog {
  date: Date
  completed: boolean
}

export interface ExtinctionBurstResult {
  detected: boolean
  severity: "low" | "medium" | "high" | null
  previousRate: number
  recentRate: number
  drop: number
  message: string
  supportMessage: string
}

/**
 * Detect extinction burst pattern in habit logs
 *
 * Criteria:
 * 1. Previous 14 days: >= 70% completion (was doing well)
 * 2. Recent 14 days: < 50% completion (sudden drop)
 * 3. Drop: > 30 percentage points
 *
 * @param logs - Array of habit completion logs (must be sorted by date)
 * @returns Detection result with severity and support messages
 */
export function detectExtinctionBurst(logs: HabitLog[]): ExtinctionBurstResult {
  // Need at least 28 days of data
  if (logs.length < 28) {
    return {
      detected: false,
      severity: null,
      previousRate: 0,
      recentRate: 0,
      drop: 0,
      message: "Nedostatek dat pro detekci",
      supportMessage: "",
    }
  }

  // Get last 28 days
  const sortedLogs = [...logs].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 28)

  // Split into two periods: recent 14 days vs previous 14 days
  const recent14 = sortedLogs.slice(0, 14)
  const previous14 = sortedLogs.slice(14, 28)

  // Calculate completion rates
  const recentRate = recent14.filter((log) => log.completed).length / recent14.length
  const previousRate = previous14.filter((log) => log.completed).length / previous14.length

  // Calculate drop
  const drop = previousRate - recentRate

  // Check if extinction burst pattern detected
  const wasGood = previousRate >= 0.7
  const isNowBad = recentRate < 0.5
  const significantDrop = drop > 0.3

  const detected = wasGood && isNowBad && significantDrop

  if (!detected) {
    return {
      detected: false,
      severity: null,
      previousRate: Math.round(previousRate * 100),
      recentRate: Math.round(recentRate * 100),
      drop: Math.round(drop * 100),
      message: "Žádný extinction burst nedetekován",
      supportMessage: "",
    }
  }

  // Determine severity
  let severity: "low" | "medium" | "high"
  if (drop >= 0.5) {
    severity = "high"
  } else if (drop >= 0.4) {
    severity = "medium"
  } else {
    severity = "low"
  }

  // Generate support messages
  const messages = getSupportMessages(severity)

  return {
    detected: true,
    severity,
    previousRate: Math.round(previousRate * 100),
    recentRate: Math.round(recentRate * 100),
    drop: Math.round(drop * 100),
    message: messages.main,
    supportMessage: messages.support,
  }
}

/**
 * Get appropriate support messages based on severity
 */
function getSupportMessages(severity: "low" | "medium" | "high"): {
  main: string
  support: string
} {
  switch (severity) {
    case "high":
      return {
        main: "⚠️ EXTINCTION BURST DETEKOVÁN (Vysoká závažnost)",
        support: `Tvůj mozek se brání změně. TOTO JE NORMÁLNÍ! 🧠

24-36% lidí tímto prochází. Tvůj mozek testuje, jestli to myslíš vážně.

🎯 Co dělat:
1. Uznej, že to je těžké (self-compassion)
2. Vrať se k WOOP plánu
3. Zkontroluj triggery (co změnilo?)
4. Reminder: Neuronální pathway je STÁLE tam
5. Jeden špatný týden ≠ selhání

Výzkum ukazuje: Ti kdo překonají extinction burst, mají 3x vyšší úspěšnost!`,
      }
    case "medium":
      return {
        main: "⚠️ EXTINCTION BURST DETEKOVÁN (Střední závažnost)",
        support: `Všimli jsme si, že máš těžší období.

Dobré zprávy: Toto se očekává! Tvůj mozek prochází adaptací.

💪 Návrat na track:
1. Zkontroluj implementation intention
2. Je trigger stále stejný?
3. Zkus WOOP exercise
4. Připomeň si PROČ tento návyk děláš

Habit strength je stále vysoký - jeden špatný týden to nezničí!`,
      }
    case "low":
      return {
        main: "⚡ Malý pokles detekován",
        support: `Pozorujeme mírný pokles konzistence.

Toto může být začátek extinction burst, nebo jen busy period.

🔍 Rychlá kontrola:
1. Co se změnilo minulý týden?
2. Nové překážky?
3. Potřebuješ upravit trigger?

Jsi stále na dobré cestě! 🎯`,
      }
  }
}

/**
 * Check if user is at risk of extinction burst
 * (has good streak but starting to miss)
 */
export function isAtRisk(logs: HabitLog[]): boolean {
  if (logs.length < 21) return false

  const recent7 = logs.slice(-7)
  const previous14 = logs.slice(-21, -7)

  const recentRate = recent7.filter((log) => log.completed).length / 7
  const previousRate = previous14.filter((log) => log.completed).length / 14

  // At risk if: was good (>70%), recent drop (50-70%), not yet burst
  return previousRate >= 0.7 && recentRate >= 0.5 && recentRate < 0.7
}

/**
 * Calculate risk score (0-100)
 * Higher = more at risk of extinction burst
 */
export function calculateRiskScore(logs: HabitLog[]): number {
  if (logs.length < 14) return 0

  const recent7 = logs.slice(-7)
  const previous14 = logs.slice(-21, -7) || logs.slice(0, 14)

  const recentRate = recent7.filter((log) => log.completed).length / 7
  const previousRate = previous14.filter((log) => log.completed).length / 14

  // Risk is higher when:
  // 1. Previous rate was high
  // 2. Recent rate dropped
  // 3. But not yet critical

  if (previousRate < 0.5) return 0 // Wasn't doing well anyway

  const drop = previousRate - recentRate

  // If improving (negative drop), no risk
  if (drop <= 0) return 0

  const riskScore = drop * 100

  return Math.min(Math.round(riskScore), 100)
}
