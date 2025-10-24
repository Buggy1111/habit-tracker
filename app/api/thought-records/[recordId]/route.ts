import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// DELETE /api/thought-records/[recordId] - Delete thought record
export async function DELETE(
  request: NextRequest,
  { params }: { params: { recordId: string } }
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

    const { recordId } = params

    // Verify record belongs to user
    const existingRecord = await prisma.thoughtRecord.findUnique({
      where: { id: recordId },
    })

    if (!existingRecord || existingRecord.userId !== user.id) {
      return NextResponse.json(
        { error: "Thought record not found" },
        { status: 404 }
      )
    }

    await prisma.thoughtRecord.delete({
      where: { id: recordId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting thought record:", error)
    return NextResponse.json(
      { error: "Failed to delete thought record" },
      { status: 500 }
    )
  }
}
