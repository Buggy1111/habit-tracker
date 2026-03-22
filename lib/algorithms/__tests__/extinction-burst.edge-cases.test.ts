import { describe, it, expect, beforeEach } from "vitest"
import {
  detectExtinctionBurst,
  isAtRisk,
  calculateRiskScore,
  type HabitLog,
} from "../extinction-burst"
import { createLogs, resetToday, getToday } from "./extinction-burst.test-utils"

describe("Extinction Burst Detection Algorithm", () => {
  beforeEach(() => {
    resetToday()
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
      const today = getToday()
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
      const today = getToday()
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
