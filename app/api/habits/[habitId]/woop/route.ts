import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { apiLogger } from "@/lib/logger"

const createWoopSchema = z.object({
  wish: z.string().min(1, "Wish is required"),
  outcome: z.string().min(1, "Outcome is required"),
  obstacle: z.string().min(1, "Obstacle is required"),
  plan: z.string().min(1, "Plan is required"),
})

// GET /api/habits/[habitId]/woop - Get all WOOP plans for a habit
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ habitId: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { habitId } = await params

    // Verify habit belongs to user
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    })

    if (!habit || habit.userId !== user.id) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 })
    }

    // Get all WOOP plans for this habit
    const woopPlans = await prisma.woopPlan.findMany({
      where: { habitId },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(woopPlans)
  } catch (error) {
    apiLogger.error("Error fetching WOOP plans:", error)
    return NextResponse.json({ error: "Failed to fetch WOOP plans" }, { status: 500 })
  }
}

// POST /api/habits/[habitId]/woop - Create a new WOOP plan
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ habitId: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { habitId } = await params

    // Verify habit belongs to user
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    })

    if (!habit || habit.userId !== user.id) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 })
    }

    const body = await request.json()
    const validatedData = createWoopSchema.parse(body)

    // Create WOOP plan
    const woopPlan = await prisma.woopPlan.create({
      data: {
        habitId,
        ...validatedData,
      },
    })

    return NextResponse.json(woopPlan, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      )
    }

    apiLogger.error("Error creating WOOP plan:", error)
    return NextResponse.json({ error: "Failed to create WOOP plan" }, { status: 500 })
  }
}
