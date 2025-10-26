import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { apiLogger } from "@/lib/logger"

const updateHabitSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
  frequency: z.string().optional(),
  goal: z.number().optional(),
  trigger: z.string().optional(),
  action: z.string().optional(),
  context: z.string().optional(),
})

// DELETE /api/habits/[habitId] - Soft delete (archive) habit
export async function DELETE(req: Request, { params }: { params: Promise<{ habitId: string }> }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { habitId } = await params

    // Verify habit belongs to user
    const habit = await prisma.habit.findFirst({
      where: {
        id: habitId,
        userId: session.user.id,
      },
    })

    if (!habit) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 })
    }

    // Soft delete - set isActive to false
    await prisma.habit.update({
      where: { id: habitId },
      data: { isActive: false },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    apiLogger.error("Error deleting habit:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PATCH /api/habits/[habitId] - Update habit
export async function PATCH(req: Request, { params }: { params: Promise<{ habitId: string }> }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { habitId } = await params
    const body = await req.json()
    const validatedData = updateHabitSchema.parse(body)

    // Verify habit belongs to user
    const habit = await prisma.habit.findFirst({
      where: {
        id: habitId,
        userId: session.user.id,
      },
    })

    if (!habit) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 })
    }

    // Update habit
    const updatedHabit = await prisma.habit.update({
      where: { id: habitId },
      data: validatedData,
    })

    return NextResponse.json(updatedHabit)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.issues }, { status: 400 })
    }
    apiLogger.error("Error updating habit:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
