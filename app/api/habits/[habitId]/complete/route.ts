import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  { params }: { params: Promise<{ habitId: string }> }
) {
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

    // Get today's date (start of day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Create or update today's log
    const log = await prisma.habitLog.upsert({
      where: {
        habitId_userId_date: {
          habitId,
          userId: session.user.id,
          date: today,
        },
      },
      update: {
        completed: true,
      },
      create: {
        habitId,
        userId: session.user.id,
        date: today,
        completed: true,
      },
    })

    return NextResponse.json(log)
  } catch (error) {
    console.error("Error completing habit:", error)
    return NextResponse.json(
      { error: "Failed to complete habit" },
      { status: 500 }
    )
  }
}
