import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const createHabitSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  color: z.string().default("#3B82F6"),
  icon: z.string().default("target"),
  frequency: z.string().default("daily"),
  goal: z.number().default(1),
  // Implementation Intention (IF-THEN)
  trigger: z.string().optional(),  // When
  action: z.string().optional(),   // I will
  context: z.string().optional(),  // In
})

// Helper: Calculate streak
function calculateStreak(logs: any[]): number {
  if (logs.length === 0) return 0

  // Sort logs by date descending
  const sortedLogs = logs
    .filter((log) => log.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (sortedLogs.length === 0) return 0

  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Check each day going backwards from today
  for (let i = 0; i < sortedLogs.length; i++) {
    const logDate = new Date(sortedLogs[i].date)
    logDate.setHours(0, 0, 0, 0)

    const expectedDate = new Date(today)
    expectedDate.setDate(today.getDate() - streak)

    if (logDate.getTime() === expectedDate.getTime()) {
      streak++
    } else {
      break
    }
  }

  return streak
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

    // Calculate metrics in a single pass (no additional queries)
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

      return {
        ...habit,
        completed: todayLog?.completed || false,
        streak: calculateStreak(habit.logs),
        // logs are already included from the query above
      }
    })

    return NextResponse.json(habitsWithMetrics)
  } catch (error) {
    console.error("Error fetching habits:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
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
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Error creating habit:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
