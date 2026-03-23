import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { apiLogger } from "@/lib/logger"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { weekStart, weekEnd, reflection, insights } = body
    let difficultyRatings = body.difficultyRatings as { habitId: string; rating: number; note?: string }[] | undefined

    // Verify all habit IDs belong to user
    if (difficultyRatings && difficultyRatings.length > 0) {
      const habitIds = difficultyRatings.map(r => r.habitId)
      const userHabits = await prisma.habit.findMany({
        where: { id: { in: habitIds }, userId: session.user.id },
        select: { id: true },
      })
      const validIds = new Set(userHabits.map(h => h.id))
      difficultyRatings = difficultyRatings.filter(r => validIds.has(r.habitId))
    }

    // Create weekly review
    const weeklyReview = await prisma.weeklyReview.create({
      data: {
        userId: session.user.id,
        weekStart: new Date(weekStart),
        weekEnd: new Date(weekEnd),
        completionRate: insights.completionRate,
        improvement: insights.improvement,
        insights: insights,
        reflection: reflection || null,
      },
    })

    // Create difficulty ratings
    if (difficultyRatings && difficultyRatings.length > 0) {
      await prisma.habitDifficultyLog.createMany({
        data: difficultyRatings.map(
          (rating: { habitId: string; rating: number; note?: string }) => ({
            habitId: rating.habitId,
            weeklyReviewId: weeklyReview.id,
            weekStart: new Date(weekStart),
            rating: rating.rating,
            note: rating.note || null,
          })
        ),
        skipDuplicates: true,
      })
    }

    return NextResponse.json({
      success: true,
      weeklyReview,
    })
  } catch (error) {
    apiLogger.error("Error in weekly review:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get latest weekly review
    const latestReview = await prisma.weeklyReview.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        weekStart: "desc",
      },
      include: {
        difficultyRatings: true,
      },
    })

    return NextResponse.json(latestReview)
  } catch (error) {
    apiLogger.error("Error fetching weekly review:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
