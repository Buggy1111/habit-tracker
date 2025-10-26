import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { apiLogger } from "@/lib/logger"

export async function POST(req: NextRequest, { params }: { params: Promise<{ habitId: string }> }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { habitId } = await params
    const { selfCompassionNote } = await req.json()

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

    // Mark the most recent extinction burst as addressed
    await prisma.extinctionBurstEvent.updateMany({
      where: {
        habitId: habitId,
        addressedAt: null,
      },
      data: {
        addressedAt: new Date(),
      },
    })

    // Could optionally save self-compassion note to ThoughtRecord
    if (selfCompassionNote && selfCompassionNote.trim()) {
      await prisma.thoughtRecord.create({
        data: {
          userId: session.user.id,
          habitId: habitId,
          adversity: "Extinction burst - pokles v úspěšnosti návyku",
          belief: "Automatická myšlenka během extinction burst",
          consequence: "Pocity frustrace nebo selhání",
          alternative: selfCompassionNote,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: "Recovery flow completed",
    })
  } catch (error) {
    apiLogger.error("Error in recovery flow:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
