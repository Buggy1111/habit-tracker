import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// POST /api/habits/[habitId]/logs - Log habit completion
export async function POST(
  req: Request,
  { params }: { params: { habitId: string } }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { habitId } = params
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Check if habit belongs to user
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    })

    if (!habit || habit.userId !== session.user.id) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 })
    }

    // Check if already logged today
    const existingLog = await prisma.habitLog.findUnique({
      where: {
        habitId_date: {
          habitId,
          date: today,
        },
      },
    })

    if (existingLog) {
      return NextResponse.json(
        { error: "Habit already logged today" },
        { status: 400 }
      )
    }

    // Create log
    const log = await prisma.habitLog.create({
      data: {
        habitId,
        userId: session.user.id,
        date: today,
        completed: true,
      },
    })

    return NextResponse.json(log, { status: 201 })
  } catch (error) {
    console.error("Error logging habit:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
