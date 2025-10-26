import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { apiLogger } from "@/lib/logger"
import { NextResponse } from "next/server"

/**
 * Verify that the current user owns the specified habit
 * @param habitId - The habit ID to verify ownership
 * @returns Object with success status and optional error response
 */
export async function verifyHabitOwnership(habitId: string) {
  try {
    // Get current session
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      }
    }

    // Check if habit exists and belongs to user
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
      select: { userId: true },
    })

    if (!habit) {
      return {
        success: false,
        error: NextResponse.json({ error: "Habit not found" }, { status: 404 }),
      }
    }

    if (habit.userId !== session.user.id) {
      apiLogger.warn(
        `User ${session.user.id} attempted to access habit ${habitId} owned by ${habit.userId}`
      )
      return {
        success: false,
        error: NextResponse.json(
          { error: "Forbidden - you do not own this habit" },
          { status: 403 }
        ),
      }
    }

    return {
      success: true,
      userId: session.user.id,
    }
  } catch (error) {
    apiLogger.error("Error verifying habit ownership:", error)
    return {
      success: false,
      error: NextResponse.json({ error: "Internal server error" }, { status: 500 }),
    }
  }
}

/**
 * Verify that the current user owns the specified identity
 * @param identityId - The identity ID to verify ownership
 * @returns Object with success status and optional error response
 */
export async function verifyIdentityOwnership(identityId: string) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      }
    }

    const identity = await prisma.identity.findUnique({
      where: { id: identityId },
      select: { userId: true },
    })

    if (!identity) {
      return {
        success: false,
        error: NextResponse.json({ error: "Identity not found" }, { status: 404 }),
      }
    }

    if (identity.userId !== session.user.id) {
      apiLogger.warn(
        `User ${session.user.id} attempted to access identity ${identityId} owned by ${identity.userId}`
      )
      return {
        success: false,
        error: NextResponse.json(
          { error: "Forbidden - you do not own this identity" },
          { status: 403 }
        ),
      }
    }

    return {
      success: true,
      userId: session.user.id,
    }
  } catch (error) {
    apiLogger.error("Error verifying identity ownership:", error)
    return {
      success: false,
      error: NextResponse.json({ error: "Internal server error" }, { status: 500 }),
    }
  }
}

/**
 * Get current authenticated user session
 * @returns Object with success status and user data or error response
 */
export async function getCurrentUser() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      }
    }

    return {
      success: true,
      user: session.user,
    }
  } catch (error) {
    apiLogger.error("Error getting current user:", error)
    return {
      success: false,
      error: NextResponse.json({ error: "Internal server error" }, { status: 500 }),
    }
  }
}
