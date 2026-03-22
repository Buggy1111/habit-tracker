import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { deleteAccountSchema } from "@/lib/validations/settings"
import { apiLogger } from "@/lib/logger"
import { z } from "zod"
import bcrypt from "bcryptjs"

// DELETE /api/user - Delete user account (GDPR compliance)
export async function DELETE(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = deleteAccountSchema.parse(body)

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, email: true, password: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Verify password (OAuth users don't have a password)
    if (!user.password) {
      return NextResponse.json({ error: "Use your OAuth provider to manage this account" }, { status: 400 })
    }
    const passwordMatch = await bcrypt.compare(validatedData.password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ error: "Nesprávné heslo" }, { status: 401 })
    }

    // Log the deletion action BEFORE deleting
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "account.delete",
        resource: "user",
        resourceId: session.user.id,
        metadata: {
          email: user.email,
          deletedAt: new Date().toISOString(),
        },
      },
    })

    // Delete all user data (CASCADE will handle related records)
    // Thanks to onDelete: Cascade in Prisma schema, this will:
    // - Delete all habits
    // - Delete all habit logs
    // - Delete all identities and milestones
    // - Delete all thought records
    // - Delete all weekly reviews
    // - Delete all preferences
    // - Delete all sessions
    // - Delete all audit logs
    await prisma.user.delete({
      where: { id: session.user.id },
    })

    // Return success (session will be invalidated by the client)
    return NextResponse.json({
      success: true,
      message: "Váš účet byl úspěšně smazán",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.issues }, { status: 400 })
    }
    apiLogger.error("Error deleting user account:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
