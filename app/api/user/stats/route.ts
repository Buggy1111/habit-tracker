import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { apiLogger } from "@/lib/logger"

// GET /api/user/stats - Get user data statistics
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { createdAt: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Calculate start of current month
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    // Parallel queries for all statistics
    const [
      totalHabits,
      activeHabits,
      archivedHabits,
      totalLogs,
      logsThisMonth,
      totalIdentities,
      totalWoopPlans,
      totalThoughtRecords,
    ] = await Promise.all([
      prisma.habit.count({
        where: { userId },
      }),
      prisma.habit.count({
        where: { userId, isActive: true },
      }),
      prisma.habit.count({
        where: { userId, isActive: false },
      }),
      prisma.habitLog.count({
        where: { userId },
      }),
      prisma.habitLog.count({
        where: {
          userId,
          date: {
            gte: startOfMonth,
          },
        },
      }),
      prisma.identity.count({
        where: { userId },
      }),
      prisma.woopPlan.count({
        where: {
          habit: {
            userId,
          },
        },
      }),
      prisma.thoughtRecord.count({
        where: { userId },
      }),
    ])

    // Calculate approximate data size (rough estimation)
    const dataSize = calculateDataSize({
      habits: totalHabits,
      logs: totalLogs,
      identities: totalIdentities,
      woopPlans: totalWoopPlans,
      thoughtRecords: totalThoughtRecords,
    })

    const stats = {
      habits: {
        total: totalHabits,
        active: activeHabits,
        archived: archivedHabits,
      },
      logs: {
        total: totalLogs,
        thisMonth: logsThisMonth,
      },
      identities: {
        total: totalIdentities,
      },
      woopPlans: {
        total: totalWoopPlans,
      },
      thoughtRecords: {
        total: totalThoughtRecords,
      },
      dataSize,
      memberSince: user.createdAt,
    }

    return NextResponse.json(stats)
  } catch (error) {
    apiLogger.error("Error fetching user stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Helper function to estimate data size
function calculateDataSize(counts: {
  habits: number
  logs: number
  identities: number
  woopPlans: number
  thoughtRecords: number
}): string {
  // Rough estimates in bytes
  const habitSize = 500 // Average habit record
  const logSize = 200 // Average log entry
  const identitySize = 300 // Average identity
  const woopPlanSize = 1000 // Average WOOP plan
  const thoughtRecordSize = 800 // Average thought record

  const totalBytes =
    counts.habits * habitSize +
    counts.logs * logSize +
    counts.identities * identitySize +
    counts.woopPlans * woopPlanSize +
    counts.thoughtRecords * thoughtRecordSize

  // Convert to human-readable format
  if (totalBytes < 1024) {
    return `${totalBytes} B`
  } else if (totalBytes < 1024 * 1024) {
    return `${(totalBytes / 1024).toFixed(1)} KB`
  } else {
    return `${(totalBytes / (1024 * 1024)).toFixed(1)} MB`
  }
}
