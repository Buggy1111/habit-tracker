import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options"
import prisma from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { weekStart, weekEnd, difficultyRatings, reflection, insights } = await req.json()

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
        data: difficultyRatings.map((rating: { habitId: string; rating: number; note?: string }) => ({
          habitId: rating.habitId,
          weeklyReviewId: weeklyReview.id,
          weekStart: new Date(weekStart),
          rating: rating.rating,
          note: rating.note || null,
        })),
        skipDuplicates: true,
      })
    }

    return NextResponse.json({
      success: true,
      weeklyReview,
    })
  } catch (error) {
    console.error("Error in weekly review:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

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
    console.error("Error fetching weekly review:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
