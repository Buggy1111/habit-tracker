import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { apiLogger } from "@/lib/logger"

// GET /api/identities - Fetch all identities for current user
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

    const identities = await prisma.identity.findMany({
      where: { userId: user.id },
      include: {
        habits: {
          select: {
            id: true,
            name: true,
            icon: true,
            color: true,
          },
        },
        milestones: {
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(identities)
  } catch (error) {
    apiLogger.error("Error fetching identities:", error)
    return NextResponse.json({ error: "Failed to fetch identities" }, { status: 500 })
  }
}

// POST /api/identities - Create new identity
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
    const { title, description } = body

    if (!title || title.trim() === "") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const identity = await prisma.identity.create({
      data: {
        userId: user.id,
        title: title.trim(),
        description: description?.trim() || null,
      },
      include: {
        habits: true,
        milestones: true,
      },
    })

    return NextResponse.json(identity, { status: 201 })
  } catch (error) {
    apiLogger.error("Error creating identity:", error)
    return NextResponse.json({ error: "Failed to create identity" }, { status: 500 })
  }
}
