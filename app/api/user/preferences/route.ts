import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { partialPreferencesSchema } from "@/lib/validations/settings"
import { apiLogger } from "@/lib/logger"
import { z } from "zod"

// GET /api/user/preferences - Get user preferences
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get or create preferences
    let preferences = await prisma.userPreferences.findUnique({
      where: { userId: session.user.id },
    })

    // Auto-create if not exists
    if (!preferences) {
      preferences = await prisma.userPreferences.create({
        data: {
          userId: session.user.id,
        },
      })
    }

    return NextResponse.json(preferences)
  } catch (error) {
    apiLogger.error("Error fetching user preferences:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PATCH /api/user/preferences - Update user preferences (auto-save)
export async function PATCH(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = partialPreferencesSchema.parse(body)

    // Upsert preferences (create if not exists, update if exists)
    const updatedPreferences = await prisma.userPreferences.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        ...validatedData,
      },
      update: validatedData,
    })

    // Update user's last activity
    await prisma.user.update({
      where: { id: session.user.id },
      data: { lastActivityAt: new Date() },
    })

    // Log the action in audit log (only for significant changes)
    const significantChanges = ["theme", "language", "analyticsEnabled", "dataCollectionConsent"]
    const changedSignificantFields = Object.keys(validatedData).filter((key) =>
      significantChanges.includes(key)
    )

    if (changedSignificantFields.length > 0) {
      await prisma.auditLog.create({
        data: {
          userId: session.user.id,
          action: "preferences.update",
          resource: "user_preferences",
          resourceId: updatedPreferences.id,
          metadata: {
            updatedFields: changedSignificantFields,
          },
        },
      })
    }

    return NextResponse.json(updatedPreferences)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.issues }, { status: 400 })
    }
    apiLogger.error("Error updating user preferences:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
