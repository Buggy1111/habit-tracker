import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { apiLogger } from "@/lib/logger"
import { verifyHabitOwnership } from "@/lib/auth-helpers"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ habitId: string }> }) {
  try {
    const { habitId } = await params

    // Verify ownership
    const verification = await verifyHabitOwnership(habitId)
    if (!verification.success) {
      return verification.error
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
