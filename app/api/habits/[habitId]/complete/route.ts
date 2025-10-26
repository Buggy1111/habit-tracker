import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { apiLogger } from "@/lib/logger"
import { verifyHabitOwnership } from "@/lib/auth-helpers"

export async function POST(req: Request, { params }: { params: Promise<{ habitId: string }> }) {
  try {
    const { habitId } = await params

    // Verify ownership
    const verification = await verifyHabitOwnership(habitId)
    if (!verification.success) {
      return verification.error
    }

    // Get today's date (start of day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Create or update today's log
    const log = await prisma.habitLog.upsert({
      where: {
        habitId_userId_date: {
          habitId,
          userId: verification.userId!,
          date: today,
        },
      },
      update: {
        completed: true,
      },
      create: {
        habitId,
        userId: verification.userId!,
        date: today,
        completed: true,
      },
    })

    return NextResponse.json(log)
  } catch (error) {
    apiLogger.error("Error completing habit:", error)
    return NextResponse.json({ error: "Failed to complete habit" }, { status: 500 })
  }
}
