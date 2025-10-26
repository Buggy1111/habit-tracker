import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { apiLogger } from "@/lib/logger"
import { verifyHabitOwnership } from "@/lib/auth-helpers"

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
    const { habitId } = await params

    // Verify ownership
    const verification = await verifyHabitOwnership(habitId)
    if (!verification.success) {
      return verification.error
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
    const { habitId } = await params

    // Verify ownership
    const verification = await verifyHabitOwnership(habitId)
    if (!verification.success) {
      return verification.error
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
