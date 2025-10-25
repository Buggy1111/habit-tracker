import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options"
import prisma from "@/lib/prisma"

export async function POST(req: NextRequest, { params }: { params: { habitId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { selfCompassionNote } = await req.json()

    // Verify habit belongs to user
    const habit = await prisma.habit.findFirst({
      where: {
        id: params.habitId,
        userId: session.user.id,
      },
    })

    if (!habit) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 })
    }

    // Mark the most recent extinction burst as addressed
    await prisma.extinctionBurstEvent.updateMany({
      where: {
        habitId: params.habitId,
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
          habitId: params.habitId,
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
    console.error("Error in recovery flow:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
