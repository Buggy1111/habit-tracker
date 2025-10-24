import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// PATCH /api/identities/[identityId]/milestones/[milestoneId] - Toggle milestone achievement
export async function PATCH(
  request: NextRequest,
  { params }: { params: { identityId: string; milestoneId: string } }
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

    const { identityId, milestoneId } = params
    const body = await request.json()
    const { achieved } = body

    // Verify identity belongs to user
    const identity = await prisma.identity.findUnique({
      where: { id: identityId },
    })

    if (!identity || identity.userId !== user.id) {
      return NextResponse.json({ error: "Identity not found" }, { status: 404 })
    }

    // Verify milestone belongs to identity
    const existingMilestone = await prisma.identityMilestone.findUnique({
      where: { id: milestoneId },
    })

    if (!existingMilestone || existingMilestone.identityId !== identityId) {
      return NextResponse.json({ error: "Milestone not found" }, { status: 404 })
    }

    const milestone = await prisma.identityMilestone.update({
      where: { id: milestoneId },
      data: {
        achieved: achieved === true,
        achievedAt: achieved === true ? new Date() : null,
      },
    })

    return NextResponse.json(milestone)
  } catch (error) {
    console.error("Error updating milestone:", error)
    return NextResponse.json(
      { error: "Failed to update milestone" },
      { status: 500 }
    )
  }
}

// DELETE /api/identities/[identityId]/milestones/[milestoneId] - Delete milestone
export async function DELETE(
  request: NextRequest,
  { params }: { params: { identityId: string; milestoneId: string } }
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

    const { identityId, milestoneId } = params

    // Verify identity belongs to user
    const identity = await prisma.identity.findUnique({
      where: { id: identityId },
    })

    if (!identity || identity.userId !== user.id) {
      return NextResponse.json({ error: "Identity not found" }, { status: 404 })
    }

    // Verify milestone belongs to identity
    const existingMilestone = await prisma.identityMilestone.findUnique({
      where: { id: milestoneId },
    })

    if (!existingMilestone || existingMilestone.identityId !== identityId) {
      return NextResponse.json({ error: "Milestone not found" }, { status: 404 })
    }

    await prisma.identityMilestone.delete({
      where: { id: milestoneId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting milestone:", error)
    return NextResponse.json(
      { error: "Failed to delete milestone" },
      { status: 500 }
    )
  }
}
