import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { apiLogger } from "@/lib/logger"
import { z } from "zod"

// GET /api/thought-records - Get all thought records for current user
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const thoughtRecords = await prisma.thoughtRecord.findMany({
      where: { userId: user.id },
      include: {
        habit: {
          select: {
            id: true,
            name: true,
            icon: true,
            color: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(thoughtRecords)
  } catch (error) {
    apiLogger.error("Error fetching thought records:", error)
    return NextResponse.json({ error: "Failed to fetch thought records" }, { status: 500 })
  }
}

// POST /api/thought-records - Create new thought record
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await request.json()

    const createThoughtRecordSchema = z.object({
      habitId: z.string().optional(),
      adversity: z.string().min(1).max(1000),
      belief: z.string().min(1).max(1000),
      consequence: z.string().min(1).max(1000),
      evidence: z.string().max(1000).optional(),
      alternative: z.string().max(1000).optional(),
      permanence: z.string().max(500).optional(),
      pervasiveness: z.string().max(500).optional(),
      personalization: z.string().max(500).optional(),
    })

    const validation = createThoughtRecordSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.issues },
        { status: 400 }
      )
    }

    const {
      habitId,
      adversity,
      belief,
      consequence,
      evidence,
      alternative,
      permanence,
      pervasiveness,
      personalization,
    } = validation.data

    if (habitId) {
      const habit = await prisma.habit.findFirst({
        where: { id: habitId, userId: user.id },
      })
      if (!habit) {
        return NextResponse.json({ error: "Habit not found" }, { status: 404 })
      }
    }

    const thoughtRecord = await prisma.thoughtRecord.create({
      data: {
        userId: user.id,
        habitId: habitId || null,
        adversity: adversity.trim(),
        belief: belief.trim(),
        consequence: consequence.trim(),
        evidence: evidence?.trim() || null,
        alternative: alternative?.trim() || null,
        permanence: permanence?.trim() || null,
        pervasiveness: pervasiveness?.trim() || null,
        personalization: personalization?.trim() || null,
      },
      include: {
        habit: {
          select: {
            id: true,
            name: true,
            icon: true,
            color: true,
          },
        },
      },
    })

    return NextResponse.json(thoughtRecord, { status: 201 })
  } catch (error) {
    apiLogger.error("Error creating thought record:", error)
    return NextResponse.json({ error: "Failed to create thought record" }, { status: 500 })
  }
}
