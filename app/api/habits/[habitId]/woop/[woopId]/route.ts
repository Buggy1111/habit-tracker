import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { apiLogger } from "@/lib/logger"
import { verifyHabitOwnership } from "@/lib/auth-helpers"

const updateWoopSchema = z.object({
  wish: z.string().min(1, "Wish is required").optional(),
  outcome: z.string().min(1, "Outcome is required").optional(),
  obstacle: z.string().min(1, "Obstacle is required").optional(),
  plan: z.string().min(1, "Plan is required").optional(),
})

// PATCH /api/habits/[habitId]/woop/[woopId] - Update WOOP plan
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ habitId: string; woopId: string }> }
) {
  try {
    const { habitId, woopId } = await params

    // Verify ownership
    const verification = await verifyHabitOwnership(habitId)
    if (!verification.success) {
      return verification.error
    }

    // Verify WOOP plan exists and belongs to this habit
    const existingWoop = await prisma.woopPlan.findUnique({
      where: { id: woopId },
    })

    if (!existingWoop || existingWoop.habitId !== habitId) {
      return NextResponse.json({ error: "WOOP plan not found" }, { status: 404 })
    }

    const body = await request.json()
    const validatedData = updateWoopSchema.parse(body)

    // Update WOOP plan
    const updatedWoop = await prisma.woopPlan.update({
      where: { id: woopId },
      data: validatedData,
    })

    return NextResponse.json(updatedWoop)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      )
    }

    apiLogger.error("Error updating WOOP plan:", error)
    return NextResponse.json({ error: "Failed to update WOOP plan" }, { status: 500 })
  }
}

// DELETE /api/habits/[habitId]/woop/[woopId] - Delete WOOP plan
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ habitId: string; woopId: string }> }
) {
  try {
    const { habitId, woopId } = await params

    // Verify ownership
    const verification = await verifyHabitOwnership(habitId)
    if (!verification.success) {
      return verification.error
    }

    // Verify WOOP plan exists and belongs to this habit
    const existingWoop = await prisma.woopPlan.findUnique({
      where: { id: woopId },
    })

    if (!existingWoop || existingWoop.habitId !== habitId) {
      return NextResponse.json({ error: "WOOP plan not found" }, { status: 404 })
    }

    // Delete WOOP plan
    await prisma.woopPlan.delete({
      where: { id: woopId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    apiLogger.error("Error deleting WOOP plan:", error)
    return NextResponse.json({ error: "Failed to delete WOOP plan" }, { status: 500 })
  }
}
