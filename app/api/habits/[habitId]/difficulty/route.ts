import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { apiLogger } from "@/lib/logger"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ habitId: string }> }) {
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

    // Get difficulty logs for this habit
    const difficultyLogs = await prisma.habitDifficultyLog.findMany({
      where: {
        habitId: habitId,
      },
      orderBy: {
        weekStart: "desc",
      },
    })

    return NextResponse.json(difficultyLogs)
  } catch (error) {
    apiLogger.error("Error fetching difficulty logs:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
