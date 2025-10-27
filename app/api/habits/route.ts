import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import {
  calculateHabitStrength,
  calculateCurrentStreak,
  calculateLongestStreak,
  getStrengthLevel,
} from "@/lib/algorithms/habit-strength"
import { getNeuroplasticityPhase, daysUntilNextPhase } from "@/lib/algorithms/neuroplasticity-phase"
import { detectExtinctionBurst } from "@/lib/algorithms/extinction-burst"
import { analyzeHabitDifficulty } from "@/lib/algorithms/difficulty-adaptation"
import { apiLogger } from "@/lib/logger"

const createHabitSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  color: z.string().default("#3B82F6"),
  icon: z.string().default("target"),
  frequency: z.string().default("daily"),
  goal: z.number().default(1),
  // Implementation Intention (IF-THEN)
  trigger: z.string().optional(), // When
  action: z.string().optional(), // I will
  context: z.string().optional(), // In
})

// Helper: Calculate days since start
function daysSinceStart(startDate: Date): number {
  const today = new Date()
  const start = new Date(startDate)
  const diffTime = Math.abs(today.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// GET /api/habits - Get all habits for current user
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // ✅ FIXED N+1 QUERY: Fetch ALL logs in a SINGLE query
    const habits = await prisma.habit.findMany({
      where: {
        userId: session.user.id,
        isActive: true,
      },
      include: {
        logs: {
          orderBy: {
            date: "desc",
          },
          take: 100, // Limit to last 100 logs for performance (covers ~3 months of daily habits)
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Fetch difficulty logs for all habits in a single query
    const habitIds = habits.map((h) => h.id)
    const allDifficultyLogs = await prisma.habitDifficultyLog.findMany({
      where: {
        habitId: {
          in: habitIds,
        },
      },
      orderBy: {
        weekStart: "desc",
      },
    })

    // ✅ OPTIMIZED: Calculate ALL metrics on server (runs ONCE instead of N times on client)
    const habitsWithMetrics = habits.map((habit) => {
      const todayLog = habit.logs.find((log) => {
        const logDate = new Date(log.date)
        const today = new Date()
        return (
          logDate.getDate() === today.getDate() &&
          logDate.getMonth() === today.getMonth() &&
          logDate.getFullYear() === today.getFullYear()
        )
      })

      // Calculate science-based metrics ONCE on server
      const days = daysSinceStart(habit.startDate)
      const habitStrength = calculateHabitStrength(habit.logs)
      const strengthLevel = getStrengthLevel(habitStrength)
      const neuroplasticityPhase = getNeuroplasticityPhase(days)
      const nextPhase = daysUntilNextPhase(days)
      const extinctionBurst = detectExtinctionBurst(habit.logs)
      const currentStreak = calculateCurrentStreak(habit.logs)
      const longestStreak = calculateLongestStreak(habit.logs)

      // Get difficulty logs for this habit
      const habitDifficultyLogs = allDifficultyLogs.filter((log) => log.habitId === habit.id)

      // Analyze if habit needs adaptation (BJ Fogg Behavior Model)
      const adaptationAnalysis = analyzeHabitDifficulty(habitDifficultyLogs, habit.name)

      return {
        ...habit,
        completed: todayLog?.completed || false,
        streak: currentStreak,
        // Science-based metrics (pre-computed on server)
        habitStrength,
        strengthLevel,
        neuroplasticityPhase,
        daysUntilNextPhase: nextPhase,
        extinctionBurst,
        longestStreak,
        // Difficulty tracking & adaptation coaching
        difficultyLogs: habitDifficultyLogs,
        adaptationAnalysis,
        // logs are already included from the query above
      }
    })

    return NextResponse.json(habitsWithMetrics)
  } catch (error) {
    apiLogger.error("Error fetching habits:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/habits - Create new habit
export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = createHabitSchema.parse(body)

    const habit = await prisma.habit.create({
      data: {
        ...validatedData,
        userId: session.user.id,
      },
    })

    return NextResponse.json(habit, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.issues }, { status: 400 })
    }
    apiLogger.error("Error creating habit:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
