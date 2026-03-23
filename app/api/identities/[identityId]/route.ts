import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { apiLogger } from "@/lib/logger"
import { z } from "zod"

// PATCH /api/identities/[identityId] - Update identity
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ identityId: string }> }
) {
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

    const { identityId } = await params
    const body = await request.json()

    const updateIdentitySchema = z.object({
      title: z.string().min(1).max(100).optional(),
      description: z.string().max(500).optional(),
    })

    const validation = updateIdentitySchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.issues },
        { status: 400 }
      )
    }

    // Verify identity belongs to user
    const existingIdentity = await prisma.identity.findUnique({
      where: { id: identityId },
    })

    if (!existingIdentity || existingIdentity.userId !== user.id) {
      return NextResponse.json({ error: "Identity not found" }, { status: 404 })
    }

    const identity = await prisma.identity.update({
      where: { id: identityId },
      data: {
        title: validation.data.title?.trim() || existingIdentity.title,
        description: validation.data.description?.trim() || existingIdentity.description,
      },
      include: {
        habits: true,
        milestones: true,
      },
    })

    return NextResponse.json(identity)
  } catch (error) {
    apiLogger.error("Error updating identity:", error)
    return NextResponse.json({ error: "Failed to update identity" }, { status: 500 })
  }
}

// DELETE /api/identities/[identityId] - Delete identity
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ identityId: string }> }
) {
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

    const { identityId } = await params

    // Verify identity belongs to user
    const existingIdentity = await prisma.identity.findUnique({
      where: { id: identityId },
    })

    if (!existingIdentity || existingIdentity.userId !== user.id) {
      return NextResponse.json({ error: "Identity not found" }, { status: 404 })
    }

    await prisma.identity.delete({
      where: { id: identityId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    apiLogger.error("Error deleting identity:", error)
    return NextResponse.json({ error: "Failed to delete identity" }, { status: 500 })
  }
}
