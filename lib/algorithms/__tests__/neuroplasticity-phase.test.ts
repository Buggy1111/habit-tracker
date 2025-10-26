import { describe, it, expect } from "vitest"
import {
  getNeuroplasticityPhase,
  getPhaseColor,
  daysUntilNextPhase,
  getMilestoneAchievement,
} from "../neuroplasticity-phase"

describe("Neuroplasticity Phase Tracker", () => {
  describe("getNeuroplasticityPhase", () => {
    it("should return Phase 1 for days 0-21", () => {
      expect(getNeuroplasticityPhase(0).phase).toBe(1)
      expect(getNeuroplasticityPhase(10).phase).toBe(1)
      expect(getNeuroplasticityPhase(21).phase).toBe(1)
    })

    it("should return Phase 2 for days 22-42", () => {
      expect(getNeuroplasticityPhase(22).phase).toBe(2)
      expect(getNeuroplasticityPhase(30).phase).toBe(2)
      expect(getNeuroplasticityPhase(42).phase).toBe(2)
    })

    it("should return Phase 3 for days 43-66", () => {
      expect(getNeuroplasticityPhase(43).phase).toBe(3)
      expect(getNeuroplasticityPhase(55).phase).toBe(3)
      expect(getNeuroplasticityPhase(66).phase).toBe(3)
    })

    it("should return Phase 4 for days 67+", () => {
      expect(getNeuroplasticityPhase(67).phase).toBe(4)
      expect(getNeuroplasticityPhase(100).phase).toBe(4)
      expect(getNeuroplasticityPhase(365).phase).toBe(4)
    })

    it("should calculate progress correctly for Phase 1", () => {
      // Day 0: 0% progress
      expect(getNeuroplasticityPhase(0).progress).toBe(0)
      // Day 10: ~48% progress (10/21)
      expect(getNeuroplasticityPhase(10).progress).toBeCloseTo(48, 0)
      // Day 21: 100% progress
      expect(getNeuroplasticityPhase(21).progress).toBe(100)
    })

    it("should calculate progress correctly for Phase 2", () => {
      // Day 22: 0% progress in Phase 2 (just started)
      expect(getNeuroplasticityPhase(22).progress).toBeCloseTo(5, 0) // (22-21)/21 * 100
      // Day 32: ~52% progress
      expect(getNeuroplasticityPhase(32).progress).toBeCloseTo(52, 0)
      // Day 42: 100% progress
      expect(getNeuroplasticityPhase(42).progress).toBe(100)
    })

    it("should calculate progress correctly for Phase 3", () => {
      // Day 43: ~4% progress
      expect(getNeuroplasticityPhase(43).progress).toBeCloseTo(4, 0)
      // Day 54: ~50% progress
      expect(getNeuroplasticityPhase(54).progress).toBeCloseTo(50, 0)
      // Day 66: 100% progress
      expect(getNeuroplasticityPhase(66).progress).toBe(100)
    })

    it("should have 100% progress for Phase 4", () => {
      expect(getNeuroplasticityPhase(67).progress).toBe(100)
      expect(getNeuroplasticityPhase(1000).progress).toBe(100)
    })

    it("should include all required fields", () => {
      const phase = getNeuroplasticityPhase(10)
      expect(phase).toHaveProperty("phase")
      expect(phase).toHaveProperty("title")
      expect(phase).toHaveProperty("description")
      expect(phase).toHaveProperty("progress")
      expect(phase).toHaveProperty("emoji")
      expect(phase).toHaveProperty("motivationalMessage")
      expect(phase).toHaveProperty("scienceInsight")

      expect(phase.title).toBeTruthy()
      expect(phase.description).toBeTruthy()
      expect(phase.emoji).toBeTruthy()
      expect(phase.motivationalMessage).toBeTruthy()
      expect(phase.scienceInsight).toBeTruthy()
    })

    it("should have different content for each phase", () => {
      const phase1 = getNeuroplasticityPhase(10)
      const phase2 = getNeuroplasticityPhase(30)
      const phase3 = getNeuroplasticityPhase(55)
      const phase4 = getNeuroplasticityPhase(100)

      expect(phase1.title).not.toBe(phase2.title)
      expect(phase2.title).not.toBe(phase3.title)
      expect(phase3.title).not.toBe(phase4.title)

      expect(phase1.emoji).not.toBe(phase2.emoji)
      expect(phase2.emoji).not.toBe(phase3.emoji)
      expect(phase3.emoji).not.toBe(phase4.emoji)
    })
  })

  describe("getPhaseColor", () => {
    it("should return correct colors for each phase", () => {
      expect(getPhaseColor(1)).toBe("#F59E0B") // amber
      expect(getPhaseColor(2)).toBe("#3B82F6") // blue
      expect(getPhaseColor(3)).toBe("#8B5CF6") // violet
      expect(getPhaseColor(4)).toBe("#10B981") // green
    })

    it("should return default color for invalid phase", () => {
      expect(getPhaseColor(0)).toBe("#6B7280")
      expect(getPhaseColor(5)).toBe("#6B7280")
      expect(getPhaseColor(-1)).toBe("#6B7280")
    })

    it("should return valid hex colors", () => {
      const hexRegex = /^#[0-9A-F]{6}$/i
      expect(getPhaseColor(1)).toMatch(hexRegex)
      expect(getPhaseColor(2)).toMatch(hexRegex)
      expect(getPhaseColor(3)).toMatch(hexRegex)
      expect(getPhaseColor(4)).toMatch(hexRegex)
    })
  })

  describe("daysUntilNextPhase", () => {
    it("should calculate days to Phase 2 when in Phase 1", () => {
      expect(daysUntilNextPhase(0)).toBe(22)
      expect(daysUntilNextPhase(10)).toBe(12)
      expect(daysUntilNextPhase(21)).toBe(1)
    })

    it("should calculate days to Phase 3 when in Phase 2", () => {
      expect(daysUntilNextPhase(22)).toBe(21)
      expect(daysUntilNextPhase(30)).toBe(13)
      expect(daysUntilNextPhase(42)).toBe(1)
    })

    it("should calculate days to Phase 4 when in Phase 3", () => {
      expect(daysUntilNextPhase(43)).toBe(24)
      expect(daysUntilNextPhase(55)).toBe(12)
      expect(daysUntilNextPhase(66)).toBe(1)
    })

    it("should return null when in Phase 4 (no next phase)", () => {
      expect(daysUntilNextPhase(67)).toBeNull()
      expect(daysUntilNextPhase(100)).toBeNull()
      expect(daysUntilNextPhase(1000)).toBeNull()
    })
  })

  describe("getMilestoneAchievement", () => {
    it("should return milestone for day 7", () => {
      const milestone = getMilestoneAchievement(7)
      expect(milestone).not.toBeNull()
      expect(milestone?.title).toContain("První týden")
      expect(milestone?.achieved).toBe(true)
    })

    it("should return milestone for day 14", () => {
      const milestone = getMilestoneAchievement(14)
      expect(milestone).not.toBeNull()
      expect(milestone?.title).toContain("Dvou-týdenní")
    })

    it("should return milestone for day 21", () => {
      const milestone = getMilestoneAchievement(21)
      expect(milestone).not.toBeNull()
      expect(milestone?.title).toContain("FÁZE 1")
    })

    it("should return milestone for day 30", () => {
      const milestone = getMilestoneAchievement(30)
      expect(milestone).not.toBeNull()
      expect(milestone?.title).toContain("MĚSÍC")
    })

    it("should return milestone for day 43", () => {
      const milestone = getMilestoneAchievement(43)
      expect(milestone).not.toBeNull()
      expect(milestone?.title).toContain("FÁZE 2")
    })

    it("should return milestone for day 50", () => {
      const milestone = getMilestoneAchievement(50)
      expect(milestone).not.toBeNull()
      expect(milestone?.title).toContain("50")
    })

    it("should return milestone for day 66", () => {
      const milestone = getMilestoneAchievement(66)
      expect(milestone).not.toBeNull()
      expect(milestone?.title).toContain("AUTOMATICITY")
      expect(milestone?.description).toContain("vědecky")
    })

    it("should return milestone for day 100", () => {
      const milestone = getMilestoneAchievement(100)
      expect(milestone).not.toBeNull()
      expect(milestone?.title).toContain("100")
    })

    it("should return null for non-milestone days", () => {
      expect(getMilestoneAchievement(1)).toBeNull()
      expect(getMilestoneAchievement(5)).toBeNull()
      expect(getMilestoneAchievement(20)).toBeNull()
      expect(getMilestoneAchievement(67)).toBeNull()
      expect(getMilestoneAchievement(99)).toBeNull()
    })

    it("should have title and description for all milestones", () => {
      const milestoneDays = [7, 14, 21, 30, 43, 50, 66, 100]
      milestoneDays.forEach((day) => {
        const milestone = getMilestoneAchievement(day)
        expect(milestone).not.toBeNull()
        expect(milestone?.title).toBeTruthy()
        expect(milestone?.description).toBeTruthy()
      })
    })
  })

  describe("Edge cases", () => {
    it("should handle negative days gracefully", () => {
      expect(() => getNeuroplasticityPhase(-1)).not.toThrow()
      expect(() => getPhaseColor(-1)).not.toThrow()
      expect(() => daysUntilNextPhase(-1)).not.toThrow()
      expect(() => getMilestoneAchievement(-1)).not.toThrow()
    })

    it("should handle very large day numbers", () => {
      const phase = getNeuroplasticityPhase(10000)
      expect(phase.phase).toBe(4)
      expect(phase.progress).toBe(100)
      expect(daysUntilNextPhase(10000)).toBeNull()
    })

    it("should handle boundary days correctly", () => {
      // Boundary between Phase 1 and 2
      expect(getNeuroplasticityPhase(21).phase).toBe(1)
      expect(getNeuroplasticityPhase(22).phase).toBe(2)

      // Boundary between Phase 2 and 3
      expect(getNeuroplasticityPhase(42).phase).toBe(2)
      expect(getNeuroplasticityPhase(43).phase).toBe(3)

      // Boundary between Phase 3 and 4
      expect(getNeuroplasticityPhase(66).phase).toBe(3)
      expect(getNeuroplasticityPhase(67).phase).toBe(4)
    })
  })
})
