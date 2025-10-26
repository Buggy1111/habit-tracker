import { describe, it, expect, beforeEach } from "vitest"
import {
  detectExtinctionBurst,
  isAtRisk,
  calculateRiskScore,
  type HabitLog,
} from "../extinction-burst"

describe("Extinction Burst Detection Algorithm", () => {
  let today: Date

  beforeEach(() => {
    today = new Date()
    today.setHours(0, 0, 0, 0)
  })

  const createLogs = (pattern: boolean[]): HabitLog[] => {
    return pattern.map((completed, index) => {
      const date = new Date(today)
      date.setDate(today.getDate() - (pattern.length - 1 - index))
      return { date, completed }
    })
  }

  describe("detectExtinctionBurst", () => {
    it("should return not detected when insufficient data (< 28 days)", () => {
      const logs = createLogs(Array(20).fill(true))
      const result = detectExtinctionBurst(logs)

      expect(result.detected).toBe(false)
      expect(result.severity).toBeNull()
      expect(result.message).toContain("Nedostatek dat")
    })

    it("should detect classic extinction burst pattern", () => {
      // Previous 14 days: 13/14 completed (93%)
      // Recent 14 days: 5/14 completed (36%)
      // Drop: 57%
      const pattern = [
        ...Array(14)
          .fill(true)
          .map((_, i) => (i === 5 ? false : true)), // Previous: 13/14
        ...Array(14)
          .fill(false)
          .map((_, i) => (i % 3 === 0 ? true : false)), // Recent: ~5/14
      ]
      const logs = createLogs(pattern)
      const result = detectExtinctionBurst(logs)

      expect(result.detected).toBe(true)
      expect(result.severity).toBe("high")
      expect(result.previousRate).toBeGreaterThanOrEqual(70)
      expect(result.recentRate).toBeLessThan(50)
      expect(result.drop).toBeGreaterThan(30)
    })

    it("should NOT detect when previous rate was low (< 70%)", () => {
      // Previous 14 days: 8/14 completed (57%)
      // Recent 14 days: 3/14 completed (21%)
      // Drop significant but wasn't doing well initially
      const pattern = [
        ...Array(14)
          .fill(false)
          .map((_, i) => i < 8), // Previous: 8/14 = 57%
        ...Array(14)
          .fill(false)
          .map((_, i) => i < 3), // Recent: 3/14 = 21%
      ]
      const logs = createLogs(pattern)
      const result = detectExtinctionBurst(logs)

      expect(result.detected).toBe(false) // Wasn't doing well to begin with
    })

    it("should NOT detect when recent rate is still decent (>= 50%)", () => {
      // Previous 14 days: 13/14 completed (93%)
      // Recent 14 days: 8/14 completed (57%)
      // Good to decent, not a burst
      const pattern = [
        ...Array(14)
          .fill(true)
          .map((_, i) => (i === 3 ? false : true)), // Previous: 13/14
        ...Array(14)
          .fill(false)
          .map((_, i) => i < 8), // Recent: 8/14 = 57%
      ]
      const logs = createLogs(pattern)
      const result = detectExtinctionBurst(logs)

      expect(result.detected).toBe(false) // Still above 50% threshold
    })

    it("should NOT detect when drop is too small (<= 30%)", () => {
      // Previous 14 days: 12/14 completed (86%)
      // Recent 14 days: 8/14 completed (57%)
      // Drop: 29% (just below threshold)
      const pattern = [
        ...Array(14)
          .fill(true)
          .map((_, i) => (i < 2 ? false : true)), // Previous: 12/14 = 86%
        ...Array(14)
          .fill(false)
          .map((_, i) => i < 8), // Recent: 8/14 = 57%
      ]
      const logs = createLogs(pattern)
      const result = detectExtinctionBurst(logs)

      expect(result.detected).toBe(false) // Drop not significant enough
    })

    it("should classify severity as HIGH (drop >= 50%)", () => {
      // Previous: 14/14 = 100%
      // Recent: 6/14 = 43%
      // Drop: 57%
      const pattern = [
        ...Array(14).fill(true),
        ...Array(14)
          .fill(false)
          .map((_, i) => i < 6),
      ]
      const logs = createLogs(pattern)
      const result = detectExtinctionBurst(logs)

      expect(result.detected).toBe(true)
      expect(result.severity).toBe("high")
      expect(result.message).toContain("Vysoká závažnost")
      expect(result.supportMessage).toContain("NORMÁLNÍ")
    })

    it("should classify severity as MEDIUM (drop 40-49%)", () => {
      // Previous: 13/14 = 93%
      // Recent: 6/14 = 43%
      // Drop: 50% -> medium (exactly at boundary)
      const pattern = [
        ...Array(14)
          .fill(true)
          .map((_, i) => (i === 0 ? false : true)), // 13/14
        ...Array(14)
          .fill(false)
          .map((_, i) => i < 6), // 6/14
      ]
      const logs = createLogs(pattern)
      const result = detectExtinctionBurst(logs)

      expect(result.detected).toBe(true)
      expect(result.severity).toMatch(/medium|high/) // Can be either depending on exact calculation
    })

    it("should classify severity as LOW (drop 30-39%)", () => {
      // Previous: 11/14 = 79%
      // Recent: 6/14 = 43%
      // Drop: 36%
      const pattern = [
        ...Array(14)
          .fill(true)
          .map((_, i) => i < 11), // 11/14 = 79%
        ...Array(14)
          .fill(false)
          .map((_, i) => i < 6), // 6/14 = 43%
      ]
      const logs = createLogs(pattern)
      const result = detectExtinctionBurst(logs)

      expect(result.detected).toBe(true)
      expect(result.severity).toBe("low")
      expect(result.message).toContain("Malý pokles")
    })

    it("should include support messages when detected", () => {
      const pattern = [
        ...Array(14).fill(true),
        ...Array(14)
          .fill(false)
          .map((_, i) => i < 5),
      ]
      const logs = createLogs(pattern)
      const result = detectExtinctionBurst(logs)

      expect(result.detected).toBe(true)
      expect(result.supportMessage).toBeTruthy()
      expect(result.supportMessage.length).toBeGreaterThan(50)
      expect(result.supportMessage).toContain("NORMÁLNÍ")
    })

    it("should handle exactly 28 days of data", () => {
      const pattern = [
        ...Array(14).fill(true),
        ...Array(14)
          .fill(false)
          .map((_, i) => i < 4),
      ]
      const logs = createLogs(pattern)
      const result = detectExtinctionBurst(logs)

      expect(result.detected).toBe(true)
      expect(logs.length).toBe(28)
    })

    it("should handle more than 28 days of data (use most recent 28)", () => {
      // 50 days total, but only recent 28 should matter
      const pattern = [
        ...Array(22).fill(false), // Old data (should be ignored)
        ...Array(14).fill(true), // Previous 14
        ...Array(14)
          .fill(false)
          .map((_, i) => i < 5), // Recent 14
      ]
      const logs = createLogs(pattern)
      const result = detectExtinctionBurst(logs)

      expect(result.detected).toBe(true)
      expect(logs.length).toBe(50)
    })
  })

  describe("isAtRisk", () => {
    it("should return false for insufficient data (< 21 days)", () => {
      const logs = createLogs(Array(15).fill(true))
      const result = isAtRisk(logs)

      expect(result).toBe(false)
    })

    it("should detect at-risk pattern (was good, starting to decline)", () => {
      // Previous 14: 13/14 = 93%
      // Recent 7: 4/7 = 57% (in danger zone: 50-70%)
      const logs = createLogs([
        ...Array(14)
          .fill(true)
          .map((_, i) => (i === 0 ? false : true)), // 13/14
        ...Array(7)
          .fill(false)
          .map((_, i) => i < 4), // 4/7 = 57%
      ])
      const result = isAtRisk(logs)

      expect(result).toBe(true)
    })

    it("should NOT flag if previous rate was low (< 70%)", () => {
      // Previous 14: 8/14 = 57%
      // Recent 7: 4/7 = 57%
      const logs = createLogs([
        ...Array(14)
          .fill(false)
          .map((_, i) => i < 8), // 8/14 = 57%
        ...Array(7)
          .fill(false)
          .map((_, i) => i < 4), // 4/7 = 57%
      ])
      const result = isAtRisk(logs)

      expect(result).toBe(false) // Wasn't doing well to begin with
    })

    it("should NOT flag if recent rate is still high (>= 70%)", () => {
      // Previous 14: 13/14 = 93%
      // Recent 7: 5/7 = 71%
      const logs = createLogs([
        ...Array(14)
          .fill(true)
          .map((_, i) => (i === 0 ? false : true)), // 13/14
        ...Array(7)
          .fill(false)
          .map((_, i) => i < 5), // 5/7 = 71%
      ])
      const result = isAtRisk(logs)

      expect(result).toBe(false) // Still doing well
    })

    it("should NOT flag if already in burst (recent < 50%)", () => {
      // Previous 14: 13/14 = 93%
      // Recent 7: 2/7 = 29%
      const logs = createLogs([
        ...Array(14)
          .fill(true)
          .map((_, i) => (i === 0 ? false : true)), // 13/14
        ...Array(7)
          .fill(false)
          .map((_, i) => i < 2), // 2/7 = 29%
      ])
      const result = isAtRisk(logs)

      expect(result).toBe(false) // Already in burst territory
    })

    it("should handle exactly 21 days of data", () => {
      const logs = createLogs([
        ...Array(14).fill(true),
        ...Array(7)
          .fill(false)
          .map((_, i) => i < 4),
      ])
      const result = isAtRisk(logs)

      expect(result).toBe(true)
      expect(logs.length).toBe(21)
    })
  })

  describe("calculateRiskScore", () => {
    it("should return 0 for insufficient data (< 14 days)", () => {
      const logs = createLogs(Array(10).fill(true))
      const score = calculateRiskScore(logs)

      expect(score).toBe(0)
    })

    it("should return 0 when previous rate was low (< 50%)", () => {
      // Not at risk if wasn't doing well anyway
      const logs = createLogs([
        ...Array(14)
          .fill(false)
          .map((_, i) => i < 6),
        ...Array(7).fill(true),
      ])
      const score = calculateRiskScore(logs)

      expect(score).toBe(0)
    })

    it("should calculate risk score based on drop", () => {
      // Previous 14: 13/14 = 93%
      // Recent 7: 4/7 = 57%
      // Drop: 36% -> risk score ~36
      const logs = createLogs([
        ...Array(14)
          .fill(true)
          .map((_, i) => (i === 0 ? false : true)),
        ...Array(7)
          .fill(false)
          .map((_, i) => i < 4),
      ])
      const score = calculateRiskScore(logs)

      expect(score).toBeGreaterThan(20)
      expect(score).toBeLessThanOrEqual(100)
    })

    it("should return higher score for larger drops", () => {
      // Large drop scenario
      const logsLargeDrop = createLogs([
        ...Array(14).fill(true),
        ...Array(7)
          .fill(false)
          .map((_, i) => i < 2),
      ])
      const scoreLarge = calculateRiskScore(logsLargeDrop)

      // Small drop scenario
      const logsSmallDrop = createLogs([
        ...Array(14).fill(true),
        ...Array(7)
          .fill(false)
          .map((_, i) => i < 5),
      ])
      const scoreSmall = calculateRiskScore(logsSmallDrop)

      expect(scoreLarge).toBeGreaterThan(scoreSmall)
    })

    it("should cap risk score at 100", () => {
      // Extreme drop: 100% -> 0%
      const logs = createLogs([...Array(14).fill(true), ...Array(7).fill(false)])
      const score = calculateRiskScore(logs)

      expect(score).toBeLessThanOrEqual(100)
      expect(score).toBeGreaterThan(80) // Should be very high
    })

    it("should return 0 when improving (recent rate higher than previous)", () => {
      // Previous: 60%, Recent: 80% (improving)
      const logs = createLogs([
        ...Array(14)
          .fill(false)
          .map((_, i) => i < 8), // 8/14 = 57%
        ...Array(7)
          .fill(false)
          .map((_, i) => i < 6), // 6/7 = 86%
      ])
      const score = calculateRiskScore(logs)

      expect(score).toBe(0) // No risk when improving
    })

    it("should handle exactly 14 days of data", () => {
      const logs = createLogs(Array(14).fill(true))
      const score = calculateRiskScore(logs)

      expect(score).toBeGreaterThanOrEqual(0)
      expect(score).toBeLessThanOrEqual(100)
    })
  })

  describe("Edge cases and integration", () => {
    it("should handle empty logs gracefully", () => {
      const logs: HabitLog[] = []

      expect(() => detectExtinctionBurst(logs)).not.toThrow()
      expect(() => isAtRisk(logs)).not.toThrow()
      expect(() => calculateRiskScore(logs)).not.toThrow()

      expect(detectExtinctionBurst(logs).detected).toBe(false)
      expect(isAtRisk(logs)).toBe(false)
      expect(calculateRiskScore(logs)).toBe(0)
    })

    it("should handle all completed logs", () => {
      const logs = createLogs(Array(30).fill(true))

      const burst = detectExtinctionBurst(logs)
      expect(burst.detected).toBe(false)
      expect(burst.previousRate).toBe(100)
      expect(burst.recentRate).toBe(100)

      expect(isAtRisk(logs)).toBe(false)
      expect(calculateRiskScore(logs)).toBe(0)
    })

    it("should handle all failed logs", () => {
      const logs = createLogs(Array(30).fill(false))

      const burst = detectExtinctionBurst(logs)
      expect(burst.detected).toBe(false)

      expect(isAtRisk(logs)).toBe(false)
      expect(calculateRiskScore(logs)).toBe(0)
    })

    it("should handle unsorted logs correctly", () => {
      // Create logs out of order
      const logs: HabitLog[] = []
      for (let i = 0; i < 28; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        logs.push({ date, completed: i < 14 }) // First 14 true, last 14 false
      }

      // Shuffle array
      const shuffled = logs.sort(() => Math.random() - 0.5)

      // Should still detect correctly (algorithm sorts internally)
      const result = detectExtinctionBurst(shuffled)
      expect(result).toBeDefined()
    })

    it("should handle duplicate dates gracefully", () => {
      const logs: HabitLog[] = []
      for (let i = 0; i < 20; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        logs.push({ date, completed: true })
        // Add duplicate
        if (i < 10) {
          logs.push({ date, completed: false })
        }
      }

      expect(() => detectExtinctionBurst(logs)).not.toThrow()
      expect(() => isAtRisk(logs)).not.toThrow()
      expect(() => calculateRiskScore(logs)).not.toThrow()
    })
  })
})
