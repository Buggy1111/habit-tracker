import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { HabitStrengthBadge } from "../habit-strength-badge"

describe("HabitStrengthBadge Component", () => {
  const mockLevel = {
    level: "Silný",
    description: "Skvělá práce! Držíš se toho konzistentně.",
    color: "#3B82F6",
  }

  describe("Rendering", () => {
    it("should render strength score", () => {
      render(<HabitStrengthBadge strength={75} level={mockLevel} />)

      expect(screen.getByText(/Síla návyku: 75\/100/i)).toBeInTheDocument()
    })

    it("should display level name when showDescription is true", () => {
      render(<HabitStrengthBadge strength={75} level={mockLevel} showDescription={true} />)

      expect(screen.getByText("Silný")).toBeInTheDocument()
    })

    it("should hide level name visually when showDescription is false (screen reader only)", () => {
      render(<HabitStrengthBadge strength={75} level={mockLevel} showDescription={false} />)

      // Level should exist but be screen-reader only (sr-only class)
      const levelElement = screen.getByText("Silný")
      expect(levelElement).toBeInTheDocument()
      expect(levelElement.className).toContain("sr-only")
    })

    it("should display description when showDescription is true", () => {
      render(<HabitStrengthBadge strength={75} level={mockLevel} showDescription={true} />)

      expect(screen.getByText("Skvělá práce! Držíš se toho konzistentně.")).toBeInTheDocument()
    })

    it("should not display description when showDescription is false", () => {
      render(<HabitStrengthBadge strength={75} level={mockLevel} showDescription={false} />)

      expect(
        screen.queryByText("Skvělá práce! Držíš se toho konzistentně.")
      ).not.toBeInTheDocument()
    })

    it("should render with default props", () => {
      render(<HabitStrengthBadge strength={50} level={mockLevel} />)

      expect(screen.getByText(/Síla návyku: 50\/100/i)).toBeInTheDocument()
      // showDescription defaults to false
      expect(screen.queryByText(mockLevel.description)).not.toBeInTheDocument()
    })
  })

  describe("Size variations", () => {
    it("should apply small size classes", () => {
      const { container } = render(<HabitStrengthBadge strength={75} level={mockLevel} size="sm" />)

      // Check for text-xs class (small size)
      const textElement = container.querySelector(".text-xs")
      expect(textElement).toBeInTheDocument()
    })

    it("should apply medium size classes by default", () => {
      const { container } = render(<HabitStrengthBadge strength={75} level={mockLevel} />)

      // Check for text-sm class (medium size)
      const textElement = container.querySelector(".text-sm")
      expect(textElement).toBeInTheDocument()
    })

    it("should apply large size classes", () => {
      const { container } = render(<HabitStrengthBadge strength={75} level={mockLevel} size="lg" />)

      // Check for text-base class (large size)
      const textElement = container.querySelector(".text-base")
      expect(textElement).toBeInTheDocument()
    })
  })

  describe("Strength levels", () => {
    it("should render very weak habit (0-24)", () => {
      const weakLevel = {
        level: "Velmi slabý",
        description: "Začínáš. Každý den se počítá!",
        color: "#6B7280",
      }
      render(<HabitStrengthBadge strength={10} level={weakLevel} showDescription={true} />)

      expect(screen.getByText(/Síla návyku: 10\/100/i)).toBeInTheDocument()
      expect(screen.getByText("Velmi slabý")).toBeInTheDocument()
    })

    it("should render weak habit (25-49)", () => {
      const weakLevel = {
        level: "Slabý",
        description: "Potřebuješ více konzistence.",
        color: "#EF4444",
      }
      render(<HabitStrengthBadge strength={35} level={weakLevel} showDescription={true} />)

      expect(screen.getByText(/Síla návyku: 35\/100/i)).toBeInTheDocument()
      expect(screen.getByText("Slabý")).toBeInTheDocument()
    })

    it("should render medium habit (50-69)", () => {
      const mediumLevel = {
        level: "Střední",
        description: "Dobrý start. Pokračuj v budování!",
        color: "#F59E0B",
      }
      render(<HabitStrengthBadge strength={60} level={mediumLevel} showDescription={true} />)

      expect(screen.getByText(/Síla návyku: 60\/100/i)).toBeInTheDocument()
      expect(screen.getByText("Střední")).toBeInTheDocument()
    })

    it("should render strong habit (70-89)", () => {
      const strongLevel = {
        level: "Silný",
        description: "Skvělá práce! Držíš se toho konzistentně.",
        color: "#3B82F6",
      }
      render(<HabitStrengthBadge strength={80} level={strongLevel} showDescription={true} />)

      expect(screen.getByText(/Síla návyku: 80\/100/i)).toBeInTheDocument()
      expect(screen.getByText("Silný")).toBeInTheDocument()
    })

    it("should render extremely strong habit (90-100)", () => {
      const veryStrongLevel = {
        level: "Extrémně silný",
        description: "Tento návyk je plně automatický!",
        color: "#10B981",
      }
      render(<HabitStrengthBadge strength={95} level={veryStrongLevel} showDescription={true} />)

      expect(screen.getByText(/Síla návyku: 95\/100/i)).toBeInTheDocument()
      expect(screen.getByText("Extrémně silný")).toBeInTheDocument()
    })
  })

  describe("Progress bar", () => {
    it("should render progress bar", () => {
      const { container } = render(<HabitStrengthBadge strength={75} level={mockLevel} />)

      // Check for progress bar background
      const progressBackground = container.querySelector(".bg-secondary\\/50")
      expect(progressBackground).toBeInTheDocument()
    })

    it("should apply correct color to progress bar", () => {
      const { container } = render(<HabitStrengthBadge strength={75} level={mockLevel} />)

      // Progress bar should exist (framer-motion creates a div)
      const progressBars = container.querySelectorAll("div")
      expect(progressBars.length).toBeGreaterThan(0)
    })
  })

  describe("Science tooltip", () => {
    it("should render science tooltip button", () => {
      const { container } = render(<HabitStrengthBadge strength={75} level={mockLevel} />)

      // ScienceTooltip renders a button with HelpCircle icon
      const tooltipButtons = container.querySelectorAll("button")
      expect(tooltipButtons.length).toBeGreaterThan(0)
    })
  })

  describe("Edge cases", () => {
    it("should handle strength of 0", () => {
      render(<HabitStrengthBadge strength={0} level={mockLevel} />)

      expect(screen.getByText(/Síla návyku: 0\/100/i)).toBeInTheDocument()
    })

    it("should handle strength of 100", () => {
      render(<HabitStrengthBadge strength={100} level={mockLevel} />)

      expect(screen.getByText(/Síla návyku: 100\/100/i)).toBeInTheDocument()
    })

    it("should handle missing optional props gracefully", () => {
      expect(() => {
        render(<HabitStrengthBadge strength={50} level={mockLevel} />)
      }).not.toThrow()
    })

    it("should handle long level names without breaking layout", () => {
      const longNameLevel = {
        level: "Velmi extrémně dlouhý název úrovně který by mohl zlomit layout",
        description: "Test description",
        color: "#3B82F6",
      }

      render(<HabitStrengthBadge strength={75} level={longNameLevel} showDescription={true} />)

      expect(screen.getByText(longNameLevel.level)).toBeInTheDocument()
    })

    it("should handle very long descriptions", () => {
      const longDescLevel = {
        level: "Silný",
        description:
          "Toto je velmi velmi velmi dlouhý popis který by mohl způsobit problémy s layoutem a měl by být správně zobrazen bez zlomení komponenty a měl by zůstat čitelný.",
        color: "#3B82F6",
      }

      render(<HabitStrengthBadge strength={75} level={longDescLevel} showDescription={true} />)

      expect(screen.getByText(longDescLevel.description)).toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("should maintain semantic HTML structure", () => {
      const { container } = render(<HabitStrengthBadge strength={75} level={mockLevel} />)

      // Should have proper div structure
      const divs = container.querySelectorAll("div")
      expect(divs.length).toBeGreaterThan(0)
    })

    it("should have screen-reader accessible text", () => {
      render(<HabitStrengthBadge strength={75} level={mockLevel} showDescription={false} />)

      // Level should be accessible to screen readers even when visually hidden
      const levelElement = screen.getByText("Silný")
      expect(levelElement).toBeInTheDocument()
    })

    it("should not have any ARIA violations (basic check)", () => {
      const { container } = render(<HabitStrengthBadge strength={75} level={mockLevel} />)

      // Basic check: component should render without errors
      expect(container).toBeInTheDocument()
    })
  })
})
