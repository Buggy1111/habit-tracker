import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { apiLogger } from "@/lib/logger"

// Validation schema
const logSchema = z.object({
  date: z.string().datetime().optional(), // ISO 8601 date string
  completed: z.boolean().default(true),
  note: z.string().optional(),
})

// POST /api/habits/[habitId]/logs - Create or update habit log
export async function POST(req: Request, { params }: { params: Promise<{ habitId: string }> }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { habitId } = await params
    const body = await req.json()

    // Validate request body
    const validation = logSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: validation.error.issues },
        { status: 400 }
      )
    }

    const { date: dateString, completed, note } = validation.data

    // Parse date or use today
    const logDate = dateString ? new Date(dateString) : new Date()
    logDate.setHours(0, 0, 0, 0)

    // Check if habit belongs to user
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    })

    if (!habit || habit.userId !== session.user.id) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 })
    }

    // Create or update log using upsert
    const log = await prisma.habitLog.upsert({
      where: {
        habitId_userId_date: {
          habitId,
          userId: session.user.id,
          date: logDate,
        },
      },
      update: {
        completed,
        note,
      },
      create: {
        habitId,
        userId: session.user.id,
        date: logDate,
        completed,
        note,
      },
    })

    return NextResponse.json(log, { status: 201 })
  } catch (error) {
    apiLogger.error("Error logging habit:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/habits/[habitId]/logs?date=2025-01-01 - Delete habit log
export async function DELETE(req: Request, { params }: { params: Promise<{ habitId: string }> }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { habitId } = await params
    const { searchParams } = new URL(req.url)
    const dateString = searchParams.get("date")

    if (!dateString) {
      return NextResponse.json({ error: "Date parameter required" }, { status: 400 })
    }

    const logDate = new Date(dateString)
    logDate.setHours(0, 0, 0, 0)

    // Check if habit belongs to user
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    })

    if (!habit || habit.userId !== session.user.id) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 })
    }

    // Delete log
    await prisma.habitLog.delete({
      where: {
        habitId_userId_date: {
          habitId,
          userId: session.user.id,
          date: logDate,
        },
      },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    apiLogger.error("Error deleting habit log:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
