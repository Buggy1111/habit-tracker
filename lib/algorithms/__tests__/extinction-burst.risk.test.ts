import { describe, it, expect, beforeEach } from "vitest"
import { isAtRisk, calculateRiskScore } from "../extinction-burst"
import { createLogs, resetToday } from "./extinction-burst.test-utils"

describe("Extinction Burst Detection Algorithm", () => {
  beforeEach(() => {
    resetToday()
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
})
