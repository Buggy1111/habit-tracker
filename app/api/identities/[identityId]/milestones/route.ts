import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/identities/[identityId]/milestones - Get all milestones for identity
export async function GET(
  request: NextRequest,
  { params }: { params: { identityId: string } }
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

    const { identityId } = params

    // Verify identity belongs to user
    const identity = await prisma.identity.findUnique({
      where: { id: identityId },
    })

    if (!identity || identity.userId !== user.id) {
      return NextResponse.json({ error: "Identity not found" }, { status: 404 })
    }

    const milestones = await prisma.identityMilestone.findMany({
      where: { identityId },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(milestones)
  } catch (error) {
    console.error("Error fetching milestones:", error)
    return NextResponse.json(
      { error: "Failed to fetch milestones" },
      { status: 500 }
    )
  }
}

// POST /api/identities/[identityId]/milestones - Create new milestone
export async function POST(
  request: NextRequest,
  { params }: { params: { identityId: string } }
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

    const { identityId } = params
    const body = await request.json()
    const { title } = body

    if (!title || title.trim() === "") {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      )
    }

    // Verify identity belongs to user
    const identity = await prisma.identity.findUnique({
      where: { id: identityId },
    })

    if (!identity || identity.userId !== user.id) {
      return NextResponse.json({ error: "Identity not found" }, { status: 404 })
    }

    const milestone = await prisma.identityMilestone.create({
      data: {
        identityId,
        title: title.trim(),
      },
    })

    return NextResponse.json(milestone, { status: 201 })
  } catch (error) {
    console.error("Error creating milestone:", error)
    return NextResponse.json(
      { error: "Failed to create milestone" },
      { status: 500 }
    )
  }
}
