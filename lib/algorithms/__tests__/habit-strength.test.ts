import { describe, it, expect, beforeEach } from "vitest"
import {
  calculateHabitStrength,
  getStrengthLevel,
  calculateCurrentStreak,
  calculateLongestStreak,
  type HabitLog,
} from "../habit-strength"

describe("Habit Strength Algorithm", () => {
  let today: Date
  let startDate: Date

  beforeEach(() => {
    today = new Date()
    today.setHours(0, 0, 0, 0)
    startDate = new Date(today)
    startDate.setDate(today.getDate() - 30)
  })

  describe("calculateHabitStrength", () => {
    it("should return 0 for empty logs", () => {
      const strength = calculateHabitStrength([], startDate)
      expect(strength).toBe(0)
    })

    it("should return 100 for perfect consistency (all completed)", () => {
      const logs: HabitLog[] = []
      for (let i = 0; i < 30; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        logs.push({ date, completed: true })
      }
      const strength = calculateHabitStrength(logs, startDate)
      expect(strength).toBe(100)
    })

    it("should return 0 for all missed days", () => {
      const logs: HabitLog[] = []
      for (let i = 0; i < 30; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        logs.push({ date, completed: false })
      }
      const strength = calculateHabitStrength(logs, startDate)
      expect(strength).toBe(0)
    })

    it("should weigh recent completions more heavily", () => {
      // Create baseline: 30 days with some misses
      const createLogsWithCompletions = (completedIndices: number[]) => {
        const logs: HabitLog[] = []
        for (let i = 0; i < 30; i++) {
          const date = new Date(today)
          date.setDate(today.getDate() - i)
          logs.push({ date, completed: completedIndices.includes(i) })
        }
        return logs
      }

      // 7 recent days completed (days 0-6), rest missed
      const recentLogs = createLogsWithCompletions([0, 1, 2, 3, 4, 5, 6])
      const recentStrength = calculateHabitStrength(recentLogs, startDate)

      // 7 old days completed (days 20-26), rest missed
      const oldLogs = createLogsWithCompletions([20, 21, 22, 23, 24, 25, 26])
      const oldStrength = calculateHabitStrength(oldLogs, startDate)

      // Recent completions should result in higher strength due to exponential decay
      expect(recentStrength).toBeGreaterThan(oldStrength)
    })

    it("should be forgiving of occasional misses", () => {
      // 28 out of 30 days completed (93% success rate)
      const logs: HabitLog[] = []
      for (let i = 0; i < 30; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        // Miss days 10 and 20
        const completed = i !== 10 && i !== 20
        logs.push({ date, completed })
      }
      const strength = calculateHabitStrength(logs, startDate)

      // Should still have high strength (90+)
      expect(strength).toBeGreaterThanOrEqual(90)
    })

    it("should handle mixed completion patterns", () => {
      const logs: HabitLog[] = []
      // First 15 days: 50% completion
      for (let i = 0; i < 15; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        logs.push({ date, completed: i % 2 === 0 })
      }
      const strength = calculateHabitStrength(logs, startDate)

      // Should be around 50% (allowing for some variance due to weighting)
      expect(strength).toBeGreaterThanOrEqual(40)
      expect(strength).toBeLessThanOrEqual(60)
    })

    it("should handle exponential decay correctly", () => {
      // 30 days with: recent 15 completed, old 15 missed
      const recentHeavyLogs: HabitLog[] = []
      for (let i = 0; i < 30; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        // Complete first 15 days (recent), miss last 15
        recentHeavyLogs.push({ date, completed: i < 15 })
      }
      const recentHeavyStrength = calculateHabitStrength(recentHeavyLogs, startDate)

      // 30 days with: recent 15 missed, old 15 completed
      const oldHeavyLogs: HabitLog[] = []
      for (let i = 0; i < 30; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        // Miss first 15 days (recent), complete last 15
        oldHeavyLogs.push({ date, completed: i >= 15 })
      }
      const oldHeavyStrength = calculateHabitStrength(oldHeavyLogs, startDate)

      // Recent completions should result in significantly higher strength
      // due to exponential decay favoring recent days
      expect(recentHeavyStrength).toBeGreaterThan(oldHeavyStrength)
      // Recent should be at least 1.5x higher
      expect(recentHeavyStrength).toBeGreaterThanOrEqual(oldHeavyStrength * 1.5)
    })
  })

  describe("getStrengthLevel", () => {
    it("should return 'Extrémně silný' for score >= 90", () => {
      expect(getStrengthLevel(90).level).toBe("Extrémně silný")
      expect(getStrengthLevel(95).level).toBe("Extrémně silný")
      expect(getStrengthLevel(100).level).toBe("Extrémně silný")
    })

    it("should return 'Silný' for score 70-89", () => {
      expect(getStrengthLevel(70).level).toBe("Silný")
      expect(getStrengthLevel(80).level).toBe("Silný")
      expect(getStrengthLevel(89).level).toBe("Silný")
    })

    it("should return 'Střední' for score 50-69", () => {
      expect(getStrengthLevel(50).level).toBe("Střední")
      expect(getStrengthLevel(60).level).toBe("Střední")
      expect(getStrengthLevel(69).level).toBe("Střední")
    })

    it("should return 'Slabý' for score 25-49", () => {
      expect(getStrengthLevel(25).level).toBe("Slabý")
      expect(getStrengthLevel(35).level).toBe("Slabý")
      expect(getStrengthLevel(49).level).toBe("Slabý")
    })

    it("should return 'Velmi slabý' for score < 25", () => {
      expect(getStrengthLevel(0).level).toBe("Velmi slabý")
      expect(getStrengthLevel(10).level).toBe("Velmi slabý")
      expect(getStrengthLevel(24).level).toBe("Velmi slabý")
    })

    it("should include description and color for each level", () => {
      const result = getStrengthLevel(95)
      expect(result).toHaveProperty("level")
      expect(result).toHaveProperty("description")
      expect(result).toHaveProperty("color")
      expect(result.description).toBeTruthy()
      expect(result.color).toMatch(/^#[0-9A-F]{6}$/i)
    })
  })

  describe("calculateCurrentStreak", () => {
    it("should return 0 for empty logs", () => {
      const streak = calculateCurrentStreak([])
      expect(streak).toBe(0)
    })

    it("should calculate streak correctly for consecutive days", () => {
      const logs: HabitLog[] = []
      for (let i = 0; i < 7; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        logs.push({ date, completed: true })
      }
      const streak = calculateCurrentStreak(logs)
      expect(streak).toBe(7)
    })

    it("should stop streak at first missed day", () => {
      const logs: HabitLog[] = []
      // Days 0-4: completed
      for (let i = 0; i < 5; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        logs.push({ date, completed: true })
      }
      // Day 5: missed
      const missedDate = new Date(today)
      missedDate.setDate(today.getDate() - 5)
      logs.push({ date: missedDate, completed: false })

      // Days 6-10: completed (should not count)
      for (let i = 6; i < 11; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        logs.push({ date, completed: true })
      }

      const streak = calculateCurrentStreak(logs)
      expect(streak).toBe(5)
    })

    it("should handle non-consecutive logs correctly", () => {
      const logs: HabitLog[] = []
      // Today and yesterday
      const todayLog = { date: new Date(today), completed: true }
      const yesterdayDate = new Date(today)
      yesterdayDate.setDate(today.getDate() - 1)
      const yesterdayLog = { date: yesterdayDate, completed: true }

      // Skip day 2, add day 3
      const day3Date = new Date(today)
      day3Date.setDate(today.getDate() - 3)
      const day3Log = { date: day3Date, completed: true }

      logs.push(todayLog, yesterdayLog, day3Log)

      const streak = calculateCurrentStreak(logs)
      expect(streak).toBe(2) // Only today and yesterday count
    })

    it("should return 1 for single completed day today", () => {
      const logs: HabitLog[] = [{ date: new Date(today), completed: true }]
      const streak = calculateCurrentStreak(logs)
      expect(streak).toBe(1)
    })

    it("should return 0 if today is not completed", () => {
      const logs: HabitLog[] = []
      // Yesterday completed
      const yesterdayDate = new Date(today)
      yesterdayDate.setDate(today.getDate() - 1)
      logs.push({ date: yesterdayDate, completed: true })

      // Today not in logs (or not completed)
      const streak = calculateCurrentStreak(logs)
      expect(streak).toBe(0)
    })
  })

  describe("calculateLongestStreak", () => {
    it("should return 0 for empty logs", () => {
      const longest = calculateLongestStreak([])
      expect(longest).toBe(0)
    })

    it("should find longest streak in continuous completion", () => {
      const logs: HabitLog[] = []
      for (let i = 0; i < 10; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)
        logs.push({ date, completed: true })
      }
      const longest = calculateLongestStreak(logs)
      expect(longest).toBe(10)
    })

    it("should find longest streak across multiple streaks", () => {
      const logs: HabitLog[] = []

      // First streak: 5 days
      for (let i = 0; i < 5; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)
        logs.push({ date, completed: true })
      }

      // Gap: 2 days missed
      for (let i = 5; i < 7; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)
        logs.push({ date, completed: false })
      }

      // Second streak: 8 days (longest!)
      for (let i = 7; i < 15; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)
        logs.push({ date, completed: true })
      }

      // Gap: 1 day missed
      const missedDate = new Date(startDate)
      missedDate.setDate(startDate.getDate() + 15)
      logs.push({ date: missedDate, completed: false })

      // Third streak: 3 days
      for (let i = 16; i < 19; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)
        logs.push({ date, completed: true })
      }

      const longest = calculateLongestStreak(logs)
      expect(longest).toBe(8)
    })

    it("should handle scattered completions correctly", () => {
      const logs: HabitLog[] = []
      for (let i = 0; i < 20; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)
        // Complete every other day
        logs.push({ date, completed: i % 2 === 0 })
      }

      const longest = calculateLongestStreak(logs)
      expect(longest).toBe(1) // No consecutive days
    })

    it("should handle all missed days", () => {
      const logs: HabitLog[] = []
      for (let i = 0; i < 10; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)
        logs.push({ date, completed: false })
      }

      const longest = calculateLongestStreak(logs)
      expect(longest).toBe(0)
    })

    it("should return 1 for single completed day", () => {
      const logs: HabitLog[] = [{ date: new Date(today), completed: true }]
      const longest = calculateLongestStreak(logs)
      expect(longest).toBe(1)
    })

    it("should handle unsorted logs correctly", () => {
      const logs: HabitLog[] = []

      // Add logs in random order
      const day1 = new Date(startDate)
      const day2 = new Date(startDate)
      day2.setDate(startDate.getDate() + 1)
      const day3 = new Date(startDate)
      day3.setDate(startDate.getDate() + 2)

      // Add out of order
      logs.push({ date: day2, completed: true })
      logs.push({ date: day1, completed: true })
      logs.push({ date: day3, completed: true })

      const longest = calculateLongestStreak(logs)
      expect(longest).toBe(3)
    })
  })

  describe("Edge cases and integration", () => {
    it("should handle same-day multiple logs gracefully", () => {
      const logs: HabitLog[] = [
        { date: new Date(today), completed: true },
        { date: new Date(today), completed: false }, // Duplicate
      ]

      // Should not crash
      expect(() => calculateHabitStrength(logs, startDate)).not.toThrow()
      expect(() => calculateCurrentStreak(logs)).not.toThrow()
      expect(() => calculateLongestStreak(logs)).not.toThrow()
    })

    it("should handle future dates gracefully", () => {
      const futureDate = new Date(today)
      futureDate.setDate(today.getDate() + 10)
      const logs: HabitLog[] = [{ date: futureDate, completed: true }]

      // Should not crash
      expect(() => calculateHabitStrength(logs, startDate)).not.toThrow()
      expect(() => calculateCurrentStreak(logs)).not.toThrow()
      expect(() => calculateLongestStreak(logs)).not.toThrow()
    })

    it("should handle very old logs", () => {
      const veryOldDate = new Date(today)
      veryOldDate.setDate(today.getDate() - 365)
      const logs: HabitLog[] = [{ date: veryOldDate, completed: true }]

      const strength = calculateHabitStrength(logs, veryOldDate)

      // Very old completion should have minimal impact (due to exponential decay)
      expect(strength).toBeLessThanOrEqual(100)
      expect(strength).toBeGreaterThanOrEqual(0)
    })
  })
})
