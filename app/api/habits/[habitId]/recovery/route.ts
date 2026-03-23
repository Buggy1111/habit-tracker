import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { apiLogger } from "@/lib/logger"
import { verifyHabitOwnership } from "@/lib/auth-helpers"
import { z } from "zod"

export async function POST(req: NextRequest, { params }: { params: Promise<{ habitId: string }> }) {
  try {
    const { habitId } = await params

    // Verify ownership
    const verification = await verifyHabitOwnership(habitId)
    if (!verification.success) {
      return verification.error
    }

    const body = await req.json()

    const recoverySchema = z.object({
      selfCompassionNote: z.string().max(2000).optional(),
    })

    const validation = recoverySchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.issues },
        { status: 400 }
      )
    }

    const { selfCompassionNote } = validation.data

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
          userId: verification.userId!,
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
