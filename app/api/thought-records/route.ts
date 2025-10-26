import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { apiLogger } from "@/lib/logger"

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
    } = body

    if (!adversity || !belief || !consequence) {
      return NextResponse.json(
        { error: "Adversity, belief, and consequence are required" },
        { status: 400 }
      )
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
